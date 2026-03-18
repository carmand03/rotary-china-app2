// ============================================================
// app.js — Application logic for Rotary in China 1919–1952
// ============================================================

// ── Utilities ────────────────────────────────────────────────
function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }
function svg(tag, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

// ── Stat counter animation ───────────────────────────────────
function animateCounters() {
  $$('[data-target]').forEach(el => {
    const target = +el.dataset.target;
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}

// ── Timeline ─────────────────────────────────────────────────
function buildTimeline() {
  const container = $('#timelineContainer');
  ERAS.forEach((era, i) => {
    const item = document.createElement('div');
    item.className = 'tl-item';
    item.innerHTML = `
      <div class="tl-marker" style="background:${era.color}"></div>
      <div class="tl-body">
        <div class="tl-header" data-idx="${i}">
          <div class="tl-meta">
            <span class="tl-years" style="color:${era.color}">${era.years}</span>
            <span class="tl-context">${era.context}</span>
          </div>
          <h3 class="tl-title">${era.label}</h3>
          <span class="tl-toggle">+</span>
        </div>
        <div class="tl-summary">${era.summary}</div>
        <div class="tl-events" style="display:none">
          <ul class="tl-event-list">
            ${era.events.map(e => `<li><span class="ev-year" style="color:${era.color}">${e.year}</span> ${e.text}</li>`).join('')}
          </ul>
        </div>
      </div>`;
    container.appendChild(item);

    item.querySelector('.tl-header').addEventListener('click', function () {
      const events = item.querySelector('.tl-events');
      const toggle = item.querySelector('.tl-toggle');
      const open = events.style.display !== 'none';
      events.style.display = open ? 'none' : 'block';
      toggle.textContent = open ? '+' : '−';
      item.classList.toggle('open', !open);
    });
  });
}

// ── Map (Leaflet) ─────────────────────────────────────────────
let leafletMap = null;
let markerLayer = null;
let provinceLayer = null;
let mapEra = 0;

// District → province name mapping for the 1937-1949 era
// District 96/57: Fujian, Guangdong, Guangxi, Guizhou, Yunnan + HK, Macau, Philippines
// District 97/58: Jiangsu, Zhejiang, Anhui, Hubei, Sichuan, Jiangxi, Hunan
// District 98/59: Hebei, Henan, Shandong, Shanxi, Shaanxi, Gansu (+ Liaoning from 1948)
const PROVINCE_DISTRICTS = {
  // District 96/57 — South
  'Fujian':    '96/57', 'Guangdong': '96/57', 'Guangxi':  '96/57',
  'Guizhou':   '96/57', 'Yunnan':    '96/57',
  // District 97/58 — Central
  'Jiangsu':   '97/58', 'Zhejiang':  '97/58', 'Anhui':    '97/58',
  'Hubei':     '97/58', 'Sichuan':   '97/58', 'Chongqing':'97/58',
  'Jiangxi':   '97/58', 'Hunan':     '97/58',
  // District 98/59 — North
  'Hebei':     '98/59', 'Henan':     '98/59', 'Shandong': '98/59',
  'Shanxi':    '98/59', 'Shaanxi':   '98/59', 'Gansu':    '98/59',
  'Liaoning':  '98/59', 'Beijing':   '98/59', 'Tianjin':  '98/59',
  // no district assignment for the rest — shown neutral
};

function initLeafletMap() {
  leafletMap = L.map('leafletMap', {
    center: [32, 108],
    zoom: 4,
    minZoom: 3,
    maxZoom: 8,
    zoomControl: true,
  });

  // Sepia / muted tile layer matching the app's archival aesthetic
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
    {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }
  ).addTo(leafletMap);

  // Province boundary layer (fetched from naturalearth via github CDN)
  loadProvinces();

  markerLayer = L.layerGroup().addTo(leafletMap);
  renderMapEra(0);
}

async function loadProvinces() {
  try {
    // China provinces from a reliable public GeoJSON source
    const url = 'https://cdn.jsdelivr.net/npm/china-geojson@1.0.0/china.json';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Province fetch failed');
    const geojson = await res.json();
    renderProvinces(geojson);
  } catch (e) {
    // Fallback: try alternative source
    try {
      const url2 = 'https://unpkg.com/china-geojson@1.0.0/china.json';
      const res2 = await fetch(url2);
      const geojson2 = await res2.json();
      renderProvinces(geojson2);
    } catch (e2) {
      console.warn('Province boundaries unavailable:', e2.message);
    }
  }
}

function renderProvinces(geojson) {
  if (provinceLayer) {
    provinceLayer.clearLayers();
  } else {
    provinceLayer = L.layerGroup().addTo(leafletMap);
    provinceLayer.setZIndex = () => {}; // keep below markers
  }

  const geoLayer = L.geoJSON(geojson, {
    style: feature => {
      const name = feature.properties.name || feature.properties.NAME_1 || '';
      const dist = PROVINCE_DISTRICTS[name];
      if (!dist || mapEra === 2) {
        return { color: '#b8a888', weight: 0.8, fillColor: '#e8e0cc', fillOpacity: 0.25, dashArray: '3 3' };
      }
      const col = DIST_COLORS[dist];
      return { color: col, weight: 1, fillColor: col, fillOpacity: 0.12, dashArray: null };
    },
    onEachFeature: (feature, layer) => {
      const name = feature.properties.name || feature.properties.NAME_1 || '';
      const dist = PROVINCE_DISTRICTS[name];
      if (dist && mapEra < 2) {
        const distLabel = mapEra === 0
          ? { '96/57': 'District 96', '97/58': 'District 97', '98/59': 'District 98' }[dist]
          : { '96/57': 'District 57', '97/58': 'District 58', '98/59': 'District 59' }[dist];
        layer.bindTooltip(`<strong>${name}</strong><br>${distLabel}`, { sticky: true, className: 'province-tooltip' });
      }
    }
  });

  provinceLayer.addLayer(geoLayer);
  // Ensure markers stay on top
  if (markerLayer) markerLayer.bringToFront();
}

function renderMapEra(era) {
  mapEra = era;
  markerLayer.clearLayers();

  // Re-style provinces if loaded
  if (provinceLayer) {
    provinceLayer.eachLayer(geoLayer => {
      if (geoLayer.setStyle) {
        geoLayer.setStyle(feature => {
          const name = feature.properties ? (feature.properties.name || feature.properties.NAME_1 || '') : '';
          const dist = PROVINCE_DISTRICTS[name];
          if (!dist || era === 2) {
            return { color: '#b8a888', weight: 0.8, fillColor: '#e8e0cc', fillOpacity: 0.25, dashArray: '3 3' };
          }
          const col = DIST_COLORS[dist];
          return { color: col, weight: 1, fillColor: col, fillOpacity: 0.12, dashArray: null };
        });
      }
    });
  }

  // Place club markers
  CLUBS.forEach(club => {
    const show = [club.e0, club.e1, club.e2][era];
    if (!show) return;

    const col = DIST_COLORS[club.dist] || '#888';
    const radius = club.survived && era === 2 ? 9 : 7;

    const marker = L.circleMarker([club.lat, club.lng], {
      radius,
      fillColor: col,
      fillOpacity: 0.88,
      color: club.survived ? '#fff' : col,
      weight: club.survived ? 2.5 : 1,
    });

    const distLabel = {
      '96/57': era === 0 ? 'District 96' : 'District 57',
      '97/58': era === 0 ? 'District 97' : 'District 58',
      '98/59': era === 0 ? 'District 98' : 'District 59',
      'HK': 'Hong Kong',
      'Macau': 'Macau',
      'Taiwan': 'Taiwan',
    }[club.dist] || club.dist;

    marker.bindPopup(`
      <div class="map-popup">
        <div class="mp-title">${club.city}${club.zh ? ` <span class="mp-zh">${club.zh}</span>` : ''}</div>
        <div class="mp-row"><span class="mp-label">District</span><span class="mp-val" style="color:${col}">${distLabel}</span></div>
        <div class="mp-row"><span class="mp-label">Founded</span><span class="mp-val">${club.founded}</span></div>
        ${club.survived ? '<div class="mp-badge">Active today</div>' : ''}
        ${club.note ? `<div class="mp-note">${club.note}</div>` : ''}
      </div>
    `, { maxWidth: 220 });

    // Tooltip on hover
    marker.bindTooltip(`<strong>${club.city}</strong> ${club.zh || ''}`, { direction: 'top', offset: [0, -6], className: 'city-tooltip' });

    markerLayer.addLayer(marker);
  });

  markerLayer.bringToFront();
  buildMapLegend();
}

function buildMapLegend() {
  const leg = $('#mapLegend');
  leg.innerHTML = '';
  const entries = mapEra < 2
    ? [
        { color: DIST_COLORS['96/57'], label: mapEra === 0 ? 'District 96 — South' : 'District 57 — South' },
        { color: DIST_COLORS['97/58'], label: mapEra === 0 ? 'District 97 — Central' : 'District 58 — Central' },
        { color: DIST_COLORS['98/59'], label: mapEra === 0 ? 'District 98 — North' : 'District 59 — North' },
        { color: DIST_COLORS['HK'],    label: 'Hong Kong' },
        { color: DIST_COLORS['Macau'], label: 'Macau' },
      ]
    : [
        { color: DIST_COLORS['HK'],    label: 'Hong Kong (2 clubs) — survived' },
        { color: DIST_COLORS['Macau'], label: 'Macau — survived' },
        { color: DIST_COLORS['Taiwan'],label: 'Taipei, Taiwan — survived' },
      ];
  entries.forEach(e => {
    const span = document.createElement('span');
    span.className = 'leg-item';
    span.innerHTML = `<span class="leg-dot" style="background:${e.color}"></span>${e.label}`;
    leg.appendChild(span);
  });
}

$$('.era-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    $$('.era-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    renderMapEra(+this.dataset.era);
  });
});

// ── Clubs grid ────────────────────────────────────────────────
let clubFilter = 'all';

function buildClubs() {
  // Filters
  const filtersEl = $('#clubsFilters');
  const filterOptions = [
    { val: 'all', label: 'All clubs' },
    { val: 'survived', label: 'Survived to 1952' },
    { val: 'pre1937', label: 'Founded before 1937' },
    { val: '96/57', label: 'District 96/57' },
    { val: '97/58', label: 'District 97/58' },
    { val: '98/59', label: 'District 98/59' },
  ];
  filterOptions.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (opt.val === 'all' ? ' active' : '');
    btn.textContent = opt.label;
    btn.dataset.filter = opt.val;
    btn.addEventListener('click', function () {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      clubFilter = this.dataset.filter;
      renderClubs();
    });
    filtersEl.appendChild(btn);
  });
  renderClubs();
}

function renderClubs() {
  const grid = $('#clubsGrid');
  grid.innerHTML = '';
  const filtered = CLUBS.filter(c => {
    if (clubFilter === 'all') return true;
    if (clubFilter === 'survived') return c.survived;
    if (clubFilter === 'pre1937') return c.founded < 1937;
    return c.dist === clubFilter;
  });
  filtered.forEach(club => {
    const col = DIST_COLORS[club.dist] || '#888';
    const card = document.createElement('div');
    card.className = 'club-card' + (club.survived ? ' survived' : '');
    card.innerHTML = `
      <div class="club-dot" style="background:${col}"></div>
      <div class="club-info">
        <div class="club-name">${club.city}${club.zh ? ` <span class="club-zh">${club.zh}</span>` : ''}</div>
        <div class="club-meta">
          <span class="club-dist" style="color:${col}">D${club.dist}</span>
          <span class="club-year">est. ${club.founded}</span>
        </div>
        ${club.note ? `<div class="club-note">${club.note}</div>` : ''}
        ${club.survived ? '<div class="club-badge">Survived</div>' : ''}
      </div>`;
    grid.appendChild(card);
  });
}

// ── Governors grid ────────────────────────────────────────────
function buildGovernors() {
  const grid = $('#governorsGrid');
  GOVERNORS.forEach(gov => {
    const card = document.createElement('div');
    card.className = 'gov-card';
    const initials = gov.name.replace(/[^A-Z]/g, '').slice(0, 2) || gov.name.slice(0, 2).toUpperCase();
    card.innerHTML = `
      <div class="gov-avatar">${initials}</div>
      <div class="gov-body">
        <div class="gov-name">${gov.name}${gov.zh ? ` <span class="gov-zh">${gov.zh}</span>` : ''}</div>
        <div class="gov-role">${gov.role}</div>
        <div class="gov-meta">
          <span class="gov-tenure">${gov.tenure}</span>
          <span class="gov-district">${gov.district}</span>
          <span class="gov-loc">📍 ${gov.location}</span>
        </div>
        ${gov.note ? `<div class="gov-note">${gov.note}</div>` : ''}
      </div>`;
    grid.appendChild(card);
  });
}

// ── Nav active section tracking ───────────────────────────────
function setupNav() {
  const sections = ['timeline', 'map', 'clubs', 'governors'];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $$('.nav-link').forEach(l => l.classList.remove('active'));
        const link = $(`.nav-link[data-section="${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

// ── Fade-in on scroll ─────────────────────────────────────────
function setupFadeIn() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  $$('.section').forEach(el => obs.observe(el));
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  buildTimeline();
  initLeafletMap();
  buildClubs();
  buildGovernors();
  setupNav();
  setupFadeIn();
});
