# Rotary in China 1919–1952

An interactive historical web application documenting the organizational history of Rotary International in Republican China.

**Live demo:** open `index.html` in any modern browser — no build step or server required.

---

## About

Based on the research paper"[The Rotary Districts and Governors in the Republic of China 1919–1951](https://rotaryinchina.org/the-rotary-districts-and-governors-in-the-republic-of-china-1919-1951-%E4%B8%AD%E8%8F%AF%E6%B0%91%E5%9C%8B%E7%9A%84%E6%89%B6%E8%BC%AA%E5%9C%B0%E5%8D%80%E8%88%87%E6%AD%B7%E4%BB%BB%E7%B8%BD/)" by **Herbert K. Lau (劉敬恒)**, Rotary China Historian (1 July 2015).

The application covers:
- Three clubs in 1919 → 25 clubs at the 1940 peak → 4 survivors in 1952
- 16 district governors and commissioners
- 28 cities across mainland China, Hong Kong, Macau, and Taiwan
- Key events: 1st Civil War, Sino-Japanese War, WWII, 2nd Civil War, Korean War

---

## Features

| Section | Description |
|---------|-------------|
| **Timeline** | Seven organizational eras with expandable event lists |
| **Map** | Schematic SVG map — toggle between 1937, 1947, and 1951 snapshots |
| **Club Directory** | All 28 club cities, filterable by district or survival status |
| **Governors** | Profiles of all 16 governors and commissioners |

---

## Structure

```
rotary-china/
├── index.html   # Page structure and layout
├── style.css    # All styles (archival/editorial aesthetic)
├── data.js      # Historical data (eras, clubs, governors)
└── app.js       # Application logic (rendering, interactivity)
```

No external runtime dependencies. Google Fonts are loaded via CDN for typography only (Playfair Display + Source Sans 3).

---

## Usage

### Run locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/rotary-china.git
cd rotary-china

# Open directly in browser
open index.html
# or
python3 -m http.server 8000
```

### Deploy to GitHub Pages

1. Push to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch** → `main` → `/ (root)`
4. Your site will be live at `https://YOUR_USERNAME.github.io/rotary-china/`

---

## Extending the data

All historical content lives in `data.js`. The three arrays are:

- **`ERAS`** — organizational periods with events
- **`CLUBS`** — all 36 club entries (including HK, Macau, Taiwan)
- **`GOVERNORS`** — all 16 governor/commissioner profiles

Each entry is documented with inline comments.

---

## Credits

- Historical research: Herbert K. Lau (劉敬恒), Rotary China Historian
- Interactive application: built with vanilla HTML/CSS/JS, no framework dependencies
- Typography: Playfair Display (Google Fonts), Source Sans 3 (Google Fonts)
- Code: Claude Sonnet 4.6.

---

## License

Historical data is attributed to the original research by Herbert K. Lau. The application code is released under the MIT License.
