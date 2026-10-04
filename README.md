# kayliehausknecht.github.io

Personal academic website for **Kaylie Hausknecht**, built with clean, zero-dependency HTML5, Vanilla CSS, and Vanilla JavaScript for instant deployment on **GitHub Pages** and full **Google Analytics 4 (GA4)** instrumentation.

## Site Structure

```text
kayliehausknecht.github.io/
├── index.html              # Page 1: Home (Bio, Research Themes, Recent News, Contact Links)
├── papers-and-talks.html   # Page 2: Papers & Talks (Interactive Filter, Search, Abstracts, BibTeX)
├── cv.html                 # Page 3: Curriculum Vitae (Web CV, Print-to-PDF, Download PDF button)
├── css/
│   └── styles.css          # Clean Academic Editorial design system (Light & Dark mode + Print CSS)
├── js/
│   ├── analytics.js        # Central Google Analytics 4 (gtag.js) config & custom event tracker
│   └── main.js             # Theme toggle, paper/talk filtering, BibTeX copy, GA4 live inspector
├── assets/
│   ├── profile-placeholder.jpg  # Replace with your portrait photo
│   └── cv.pdf                   # Place your compiled PDF CV here
└── .nojekyll               # Tells GitHub Pages to serve static assets directly
```

---

## Step 1: Connect Google Analytics 4 (GA4)

1. Open [Google Analytics](https://analytics.google.com/) and sign in.
2. Click **Admin** (gear icon at the bottom-left) &rarr; **Create** &rarr; **Property**:
   - **Property name**: `kayliehausknecht.github.io`
   - Choose your time zone and currency, then proceed to **Data Streams**.
3. Select **Web** as your platform:
   - **Website URL**: `https://kayliehausknecht.github.io`
   - **Stream name**: `Personal Website`
   - Click **Create stream**.
4. Copy your **Measurement ID** (it looks like `G-XXXXXXXXXX` in the top-right of the Web Stream Details panel).
5. Open [`js/analytics.js`](js/analytics.js) and replace `'G-XXXXXXXXXX'` on line 15:
   ```javascript
   window.SITE_ANALYTICS_CONFIG = {
     measurementId: 'G-YOURREALID', // <-- Paste your ID here
     enableDebugModeInLocal: true,
     siteDomain: 'kayliehausknecht.github.io'
   };
   ```

### Built-in Custom GA4 Events
In addition to standard GA4 Enhanced Measurement (`page_view`, scroll, outbound clicks), [`js/analytics.js`](js/analytics.js) automatically tracks:
- `paper_click` — Fires when a visitor clicks `PDF`, `arXiv`, `DOI`, or `Code` on any paper (`event_label` & `item_type` included).
- `talk_click` — Fires when a visitor clicks `Slides` or `Recording` on any talk.
- `bibtex_copy` — Fires when a visitor copies a BibTeX citation.
- `cv_download` / `cv_print_or_save_pdf` — Fires when a visitor downloads `assets/cv.pdf` or prints the CV page.
- `outbound_social_click` — Fires when a visitor clicks Email, Google Scholar, GitHub, or ORCID.

> **Tip**: Click the **GA4 Telemetry** button in the site footer (or visit `?debug_ga=1`) to open the live in-page event inspector and watch events fire in real time.

---

## Step 2: Deploy to `kayliehausknecht.github.io`

1. Create a new **Public** repository on GitHub named **`kayliehausknecht.github.io`** under the `kayliehausknecht` account.
2. Push this folder to the repository:
   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "Initial commit: personal academic website with GA4"
   git remote add origin https://github.com/kayliehausknecht/kayliehausknecht.github.io.git
   git push -u origin main
   ```
3. In your GitHub repository, go to **Settings &rarr; Pages** and verify that **Source** is set to **Deploy from a branch (`main` / `/ (root)`)**.
4. Within 1–2 minutes, your site will be live at **`https://kayliehausknecht.github.io`**.
