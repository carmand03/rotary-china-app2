// ============================================================
// data.js — All historical data for Rotary in China 1919–1952
// Source: Herbert K. Lau (劉敬恒), Rotary China Historian, 2015
// ============================================================

const ERAS = [
  {
    id: 'pre-district',
    years: '1919–1927',
    label: 'Pre-district',
    color: '#8a8070',
    bg: '#f5f2ed',
    context: '1st Civil War begins',
    summary: 'Three clubs — Shanghai (1919), Tientsin (1919), Peking (1919) — supervised directly by Rotary International in Chicago. No district structure yet.',
    events: [
      { year: 1919, text: 'Shanghai, Tientsin, and Peking clubs chartered — the first in China' },
      { year: 1927, text: 'ROC capital established in Nanking (18 April)' },
    ]
  },
  {
    id: 'non-districted',
    years: '1927–1935',
    label: 'Non-districted',
    color: '#b07820',
    bg: '#fdf6e8',
    context: '1st Civil War',
    summary: 'Clubs remain non-districted. Honorary Special Commissioners in Shanghai provide loose oversight. Network grows from 3 to 11 clubs despite ongoing Civil War.',
    events: [
      { year: 1927, text: '"Peking Club" renamed "Peiping Club"' },
      { year: 1927, text: 'Luther M. Jee (朱神恩) appointed Honorary Special Commissioner, Shanghai' },
      { year: 1931, text: 'Hong Kong Rotary Club chartered (20 February)' },
      { year: 1931, text: 'Canton and Hangchow clubs chartered' },
      { year: 1932, text: 'Tsingtao and Tsinan clubs chartered' },
      { year: 1933, text: 'Ernest F. Harris appointed Honorary Special Commissioner; 4 new clubs: Amoy, Foochow, Hankow, Nanking' },
      { year: 1933, text: 'Dr. Fong Foo-Sec appointed RI Director (1933–34)' },
      { year: 1934, text: 'Joint commissioners: Dr. Wang Chengting and Harris' },
    ]
  },
  {
    id: 'district-81',
    years: '1935–1937',
    label: 'District 81',
    color: '#6355b0',
    bg: '#f0effe',
    context: '1st Civil War',
    summary: 'District 81 established (October 1935), covering the entire ROC, British Hong Kong, Portuguese Macao, and the US-administered Philippine Islands. Rapid club expansion: 18 clubs by 1936.',
    events: [
      { year: 1935, text: 'District 81 established — Dr. Wang Chengting (王正廷) first Governor, Shanghai' },
      { year: 1935, text: 'New clubs: Kaifeng, Swatow, Wuchow, Wuhu' },
      { year: 1936, text: 'Wang resigns August 1 to become ROC Ambassador to USA' },
      { year: 1936, text: 'Dr. Fong Foo-Sec (鄺富灼) fills vacancy as Governor' },
      { year: 1936, text: 'Seven new clubs: Changsha, Chinkiang, Kunming, Ningpo, Soochow, Wuchang, Wusih' },
    ]
  },
  {
    id: 'war-districts',
    years: '1937–1942',
    label: 'Districts 96/97/98',
    color: '#b84020',
    bg: '#fdf0eb',
    context: 'Sino-Japanese War',
    summary: 'Imperial Japan launches full-scale invasion. Three new districts (96, 97, 98) created to reflect China\'s geography. By 1940, only 12 of 25 clubs remain active; by 1941–42, just 5 survive in unoccupied territory.',
    events: [
      { year: 1937, text: 'Districts 96, 97, 98 created; Chungking and Sian clubs chartered' },
      { year: 1937, text: 'Dr. Fong Foo-Sec serves as Governor of all three districts' },
      { year: 1938, text: 'Philippines returned to District 81; Dr. James Henry becomes D96 Governor (Canton)' },
      { year: 1938, text: 'Dr. Fong Foo-Sec passes away, 3 October 1938' },
      { year: 1938, text: 'Dr. Yen Te-Ching (顏德慶) succeeds as D97-98 Governor; Chengtu club chartered' },
      { year: 1940, text: 'Tan Wei-Hsueh becomes D97-98 Governor; 25 clubs in China, 1 in HK — many suspended' },
      { year: 1941, text: 'No new governors elected in occupied territories; Tan Wei-Hsueh acts as representative for 5 active clubs' },
      { year: 1941, text: 'Pacific War erupts (December); Hong Kong falls; Dr. Henry arrested by Japanese' },
    ]
  },
  {
    id: 'wwii',
    years: '1942–1946',
    label: 'WWII Suspension',
    color: '#606060',
    bg: '#f2f2f2',
    context: 'World War II',
    summary: 'All governor positions vacant. Dr. Wang Chengting appointed RI Administrative Adviser for China, operating from Chungking. Dr. Henry released from concentration camp in September 1943. Victory in August 1945 allows gradual club reopening.',
    events: [
      { year: 1942, text: 'Dr. Wang Chengting appointed RI Administrative Adviser for China (Chungking)' },
      { year: 1943, text: 'Dr. James Henry released from Bao Gang concentration camp, repatriated to USA (30 September)' },
      { year: 1944, text: 'Wang appointed RI Director (1944–46), 2nd Vice-President (1945–46)' },
      { year: 1944, text: 'New clubs chartered: Lanchow, Kweilin, Kweiyang' },
      { year: 1945, text: 'Japan surrenders (August); clubs gradually reorganized and re-admitted' },
    ]
  },
  {
    id: 'recovery',
    years: '1946–1949',
    label: 'Post-war Recovery',
    color: '#0f6e56',
    bg: '#eaf6f2',
    context: '2nd Civil War',
    summary: '12 mainland clubs plus Hong Kong re-established. Three separate district governors active again for the first time since 1941. Macau club chartered 1947. New clubs in Nanchang and Mukden. Second Civil War intensifies.',
    events: [
      { year: 1946, text: 'Dr. Wang Chengting becomes Governor of D96-97-98 combined (Chungking)' },
      { year: 1947, text: 'Macau Rotary Club chartered (16 June), joins District 96' },
      { year: 1947, text: 'Separate governors for D96 (Li Shu-Fan, Hong Kong), D97 (Tan Wei-Hsueh, Shanghai), D98 (C.C. Lin, Peiping)' },
      { year: 1947, text: 'New clubs: Nanchang, Mukden; Liaoning Province added to D98' },
      { year: 1948, text: 'New governors: Huang Kuang (D96, Canton), Wei Tsen-Fu (D97, Shanghai), Keats Chu (D98, Tientsin)' },
      { year: 1948, text: 'New clubs: Shanghai West, Liuchow' },
    ]
  },
  {
    id: 'dissolution',
    years: '1949–1952',
    label: 'Districts 57/58/59 → Dissolution',
    color: '#a02828',
    bg: '#fdf0f0',
    context: 'Korean War / CCP',
    summary: 'RI renumbers all world districts (July 1949). CCP establishes government in Peking (October 1949). Korean War (June 1950) causes fatal political rupture. Districts dissolved July 1951. Only Hong Kong (×2), Macau, and Taipei survive.',
    events: [
      { year: 1949, text: 'RI renumbers all districts worldwide — 96/97/98 become 57/58/59 (1 July)' },
      { year: 1949, text: 'George Marden (D57, HK), Chen Yu-Hwa (D58, Nanking); D59 vacant' },
      { year: 1949, text: 'CCP establishes People\'s Republic (1 October); "Peiping" reverts to "Peking"' },
      { year: 1950, text: 'Pedro Lobato (D57, Macau); Chen Yu-Hwa (D58); Keats Chu (D59, Tientsin)' },
      { year: 1950, text: 'Korean War (June): Chu resigns D59 over political pressures, July 1950' },
      { year: 1950, text: 'RI Board merges D58 and D59 under Chen Yu-Hwa (December)' },
      { year: 1951, text: 'RI Board dissolves D57, D58-59 effective 1 July 1951' },
      { year: 1951, text: 'Dr. Arthur W. Woo (胡惠德) appointed Administrative Adviser; supervises HK, Kowloon, Macau, Taipei + 3 mainland clubs' },
      { year: 1952, text: 'Tientsin, Nanking, Shanghai West terminated (24 January). HK, Kowloon, Macau, Taipei continue.' },
    ]
  }
];

const CLUBS = [
  // [city_en, city_zh, district, founded, survived, lat, lng, era0, era1, era2, note]
  { city: 'Shanghai', zh: '上海', dist: '97/58', founded: 1919, survived: false, lat: 31.23, lng: 121.47, e0:true, e1:true, e2:false, note: 'First Rotary club in China' },
  { city: 'Tientsin', zh: '天津', dist: '98/59', founded: 1919, survived: false, lat: 39.08, lng: 117.20, e0:true, e1:true, e2:false, note: 'One of the original three clubs' },
  { city: 'Peking', zh: '北京', dist: '98/59', founded: 1919, survived: false, lat: 39.91, lng: 116.39, e0:true, e1:true, e2:false, note: 'Renamed Peiping 1927; reverted 1949' },
  { city: 'Canton', zh: '廣州', dist: '96/57', founded: 1931, survived: false, lat: 23.13, lng: 113.26, e0:true, e1:true, e2:false, note: 'District 96 governor base' },
  { city: 'Hangchow', zh: '杭州', dist: '97/58', founded: 1931, survived: false, lat: 30.25, lng: 120.15, e0:true, e1:false, e2:false, note: '' },
  { city: 'Tsingtao', zh: '青島', dist: '98/59', founded: 1932, survived: false, lat: 36.07, lng: 120.38, e0:true, e1:false, e2:false, note: '' },
  { city: 'Tsinan', zh: '濟南', dist: '98/59', founded: 1932, survived: false, lat: 36.65, lng: 117.00, e0:true, e1:false, e2:false, note: '' },
  { city: 'Amoy', zh: '廈門', dist: '96/57', founded: 1933, survived: false, lat: 24.48, lng: 118.09, e0:true, e1:false, e2:false, note: 'Two separate clubs chartered (1933 & 1935)' },
  { city: 'Foochow', zh: '福州', dist: '96/57', founded: 1933, survived: false, lat: 26.07, lng: 119.30, e0:true, e1:false, e2:false, note: '' },
  { city: 'Hankow', zh: '漢口', dist: '97/58', founded: 1933, survived: false, lat: 30.60, lng: 114.27, e0:true, e1:false, e2:false, note: '' },
  { city: 'Nanking', zh: '南京', dist: '97/58', founded: 1933, survived: false, lat: 32.06, lng: 118.79, e0:true, e1:true, e2:false, note: 'ROC capital; D97-98 governor base; terminated Jan 1952' },
  { city: 'Kaifeng', zh: '開封', dist: '98/59', founded: 1935, survived: false, lat: 34.80, lng: 114.31, e0:true, e1:false, e2:false, note: '' },
  { city: 'Swatow', zh: '汕頭', dist: '96/57', founded: 1935, survived: false, lat: 23.35, lng: 116.68, e0:true, e1:false, e2:false, note: '' },
  { city: 'Wuchow', zh: '梧州', dist: '96/57', founded: 1935, survived: false, lat: 23.48, lng: 111.28, e0:true, e1:false, e2:false, note: '' },
  { city: 'Wuhu', zh: '蕪湖', dist: '97/58', founded: 1935, survived: false, lat: 31.34, lng: 118.38, e0:true, e1:false, e2:false, note: '' },
  { city: 'Changsha', zh: '長沙', dist: '97/58', founded: 1936, survived: false, lat: 28.23, lng: 112.94, e0:true, e1:true, e2:false, note: 'One of 5 active clubs during occupation' },
  { city: 'Chinkiang', zh: '鎮江', dist: '97/58', founded: 1936, survived: false, lat: 32.19, lng: 119.43, e0:true, e1:false, e2:false, note: '' },
  { city: 'Kunming', zh: '昆明', dist: '96/57', founded: 1936, survived: false, lat: 25.05, lng: 102.71, e0:true, e1:false, e2:false, note: '' },
  { city: 'Ningpo', zh: '寧波', dist: '97/58', founded: 1936, survived: false, lat: 29.87, lng: 121.54, e0:true, e1:false, e2:false, note: '' },
  { city: 'Soochow', zh: '蘇州', dist: '97/58', founded: 1936, survived: false, lat: 31.30, lng: 120.62, e0:true, e1:false, e2:false, note: '' },
  { city: 'Wuchang', zh: '武昌', dist: '97/58', founded: 1936, survived: false, lat: 30.54, lng: 114.31, e0:true, e1:false, e2:false, note: '' },
  { city: 'Wusih', zh: '無錫', dist: '97/58', founded: 1936, survived: false, lat: 31.57, lng: 120.29, e0:true, e1:false, e2:false, note: '' },
  { city: 'Chungking', zh: '重慶', dist: '97/58', founded: 1937, survived: false, lat: 29.56, lng: 106.55, e0:true, e1:true, e2:false, note: 'WWII capital; base for Wang Chengting 1942–47' },
  { city: 'Sian', zh: '西安', dist: '98/59', founded: 1937, survived: false, lat: 34.27, lng: 108.95, e0:true, e1:true, e2:false, note: 'One of 5 active clubs during occupation' },
  { city: 'Chengtu', zh: '成都', dist: '97/58', founded: 1938, survived: false, lat: 30.66, lng: 104.07, e0:true, e1:true, e2:false, note: 'One of 5 active clubs during occupation' },
  { city: 'Lanchow', zh: '蘭州', dist: '98/59', founded: 1944, survived: false, lat: 36.06, lng: 103.83, e0:false, e1:true, e2:false, note: 'Chartered during reconstruction' },
  { city: 'Kweilin', zh: '桂林', dist: '96/57', founded: 1944, survived: false, lat: 25.27, lng: 110.29, e0:false, e1:true, e2:false, note: 'Chartered during reconstruction' },
  { city: 'Kweiyang', zh: '貴陽', dist: '96/57', founded: 1944, survived: false, lat: 26.65, lng: 106.63, e0:false, e1:true, e2:false, note: 'Chartered during reconstruction' },
  { city: 'Nanchang', zh: '南昌', dist: '97/58', founded: 1947, survived: false, lat: 28.68, lng: 115.86, e0:false, e1:true, e2:false, note: '' },
  { city: 'Mukden', zh: '瀋陽', dist: '98/59', founded: 1947, survived: false, lat: 41.80, lng: 123.43, e0:false, e1:true, e2:false, note: 'Liaoning Province added to D98' },
  { city: 'Shanghai West', zh: '滬西', dist: '97/58', founded: 1948, survived: false, lat: 31.24, lng: 121.40, e0:false, e1:true, e2:false, note: 'Terminated 24 January 1952' },
  { city: 'Liuchow', zh: '柳州', dist: '96/57', founded: 1948, survived: false, lat: 24.33, lng: 109.42, e0:false, e1:true, e2:false, note: '' },
  { city: 'Hong Kong', zh: '香港', dist: 'HK', founded: 1931, survived: true, lat: 22.31, lng: 114.16, e0:true, e1:true, e2:true, note: 'Suspended during Japanese occupation; revived 1945 — continues today' },
  { city: 'Kowloon', zh: '九龍', dist: 'HK', founded: 1948, survived: true, lat: 22.32, lng: 114.18, e0:false, e1:true, e2:true, note: 'Continues today' },
  { city: 'Macau', zh: '澳門', dist: 'Macau', founded: 1947, survived: true, lat: 22.20, lng: 113.54, e0:false, e1:true, e2:true, note: 'Chartered 16 June 1947 — continues today' },
  { city: 'Taipei', zh: '臺北', dist: 'Taiwan', founded: 1949, survived: true, lat: 25.05, lng: 121.53, e0:false, e1:false, e2:true, note: 'Continues today' },
];

const DIST_COLORS = {
  '96/57': '#c04828',
  '97/58': '#0f7a5a',
  '98/59': '#534ab7',
  'HK':    '#1a7ab8',
  'Macau': '#7a5aaa',
  'Taiwan':'#c08010',
};

const GOVERNORS = [
  {
    name: 'Luther M. Jee',
    zh: '朱神恩',
    role: 'Honorary Special Commissioner',
    location: 'Shanghai',
    tenure: '1927–1929',
    district: 'Non-districted',
    note: 'First oversight figure for Chinese clubs after Civil War began.'
  },
  {
    name: 'Ernest F. Harris',
    zh: null,
    role: 'Honorary Special Commissioner',
    location: 'Shanghai',
    tenure: '1933–1935',
    district: 'Non-districted',
    note: 'Also served as joint commissioner with Dr. Wang in 1934–35.'
  },
  {
    name: 'Dr. Chengting Thomas Wang',
    zh: '王正廷',
    role: 'Governor / Administrative Adviser',
    location: 'Shanghai → Chungking',
    tenure: '1934–1947',
    district: 'Dist. 81, then D96-97-98',
    note: 'The most prominent figure in Rotary China. Resigned D81 governorship to serve as ROC Ambassador to USA. Returned as RI Administrative Adviser during WWII; also RI Director and 2nd Vice-President 1944–46.'
  },
  {
    name: 'Dr. Fong Foo-Sec',
    zh: '鄺富灼',
    role: 'Governor',
    location: 'Shanghai',
    tenure: '1936–1938 †',
    district: 'Dist. 81, then D96/97/98',
    note: 'RI Director 1933–34. Filled vacancy in D81 in 1936; then governed all three new war districts. Died in office on 3 October 1938 after two months of illness.'
  },
  {
    name: 'Dr. James McClure Henry',
    zh: '香雅各博士',
    role: 'District Governor',
    location: 'Canton',
    tenure: '1938–1941',
    district: 'District 96',
    note: 'Arrested by Japanese forces after the fall of Hong Kong (December 1941). Held at Bao Gang concentration camp, Henan Province. Released 30 September 1943 and repatriated to USA.'
  },
  {
    name: 'Dr. Yen Te-Ching',
    zh: '顏德慶',
    role: 'District Governor',
    location: 'Nanking',
    tenure: '1938–1940',
    district: 'Districts 97–98',
    note: 'Succeeded Fong after his death. Also served as RI Director 1941–42.'
  },
  {
    name: 'Tan Wei-Hsueh',
    zh: '譚偉學',
    role: 'District Governor / Representative',
    location: 'Shanghai',
    tenure: '1940–1942 (repr.), 1947–48',
    district: 'Districts 97–98, then D97',
    note: 'Served two distinct terms. During 1941–42 occupation, acted informally as representative for the 5 remaining active clubs in unoccupied territory.'
  },
  {
    name: 'Dr. Li Shu-Fan',
    zh: '李樹芬',
    role: 'District Governor',
    location: 'Hong Kong',
    tenure: '1947–1948',
    district: 'District 96',
    note: 'Presided over District 96 during post-war reconstruction.'
  },
  {
    name: 'C. C. Lin',
    zh: '凌其峻',
    role: 'District Governor',
    location: 'Peiping',
    tenure: '1947–1948',
    district: 'District 98',
    note: 'Governed from Peiping (Beijing) as the 2nd Civil War intensified.'
  },
  {
    name: 'Huang Kuang',
    zh: '黃光',
    role: 'District Governor',
    location: 'Canton',
    tenure: '1948–1949',
    district: 'District 96',
    note: ''
  },
  {
    name: 'Wei Tsen-Fu ("Charlie")',
    zh: '韋增復',
    role: 'District Governor',
    location: 'Shanghai',
    tenure: '1948–1949',
    district: 'District 97',
    note: ''
  },
  {
    name: 'Keats S. Chu',
    zh: '朱繼聖',
    role: 'District Governor',
    location: 'Tientsin',
    tenure: '1948–1950 *',
    district: 'Districts 98/59',
    note: 'Resigned July 1950 over Korea War political pressures, citing support for Chinese government policy ("Resist America, Aid Korea"). His resignation triggered RI\'s decision to begin dissolving mainland Chinese districts.'
  },
  {
    name: 'George Ernest Marden ("Gem")',
    zh: '馬頓',
    role: 'District Governor',
    location: 'Hong Kong',
    tenure: '1949–1950',
    district: 'District 57',
    note: ''
  },
  {
    name: 'Chen Yu-Hwa',
    zh: '陳裕華',
    role: 'District Governor',
    location: 'Nanking',
    tenure: '1949–1951',
    district: 'Districts 58 / 58-59',
    note: 'Also supervised the merged District 58-59 from December 1950 through dissolution.'
  },
  {
    name: 'Pedro Guimaraes Lobato',
    zh: '洛巴托',
    role: 'District Governor',
    location: 'Macau',
    tenure: '1950–1951',
    district: 'District 57',
    note: 'Last District 57 Governor. Based in Portuguese Macau.'
  },
  {
    name: 'Dr. Arthur W. Woo',
    zh: '胡惠德',
    role: 'Administrative Adviser',
    location: 'Hong Kong',
    tenure: '1951–1952',
    district: 'Non-districted (final)',
    note: 'Appointed by RI President Frank E. Spain after district dissolution. Supervised 7 remaining clubs: HK, Kowloon, Macau, Taipei, and 3 mainland clubs (Tientsin, Nanking, Shanghai West). Mainland clubs terminated January 1952.'
  },
];
