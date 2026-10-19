import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';

const fonts = await readFile('scripts/share-fonts.css', 'utf8');
const browser = await chromium.launch();
try {
  for (const locale of ['en', 'pl']) {
    const pl = locale === 'pl';
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    await page.setContent(`
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0;
          padding: 42px 48px;
          background: #f5f3ed;
          color: #20231f;
          font-family: Sans, sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 630px;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #d3d6c9;
          padding-bottom: 22px;
        }
        .logo {
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -2.4px;
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .logo i {
          color: #e7471b;
          font-style: normal;
          font-size: 13px;
          transform: translateY(-14px);
        }
        .logo span {
          font-family: monospace;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #b63113;
          border: 1px solid #858c7c;
          background: #fffef9;
          padding: 5px 9px;
          margin-left: 8px;
          transform: translateY(-4px);
        }
        .domain {
          font-family: monospace;
          font-size: 14px;
          color: #62675d;
        }
        main {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 42px;
          align-items: center;
        }
        h1 {
          font: 400 66px/0.98 Display, serif;
          margin: 0 0 18px;
          letter-spacing: -2px;
        }
        h1 em {
          display: block;
          font-style: italic;
          color: #b63113;
        }
        p {
          font-size: 17px;
          line-height: 1.55;
          color: #62675d;
          margin: 0;
        }
        .tracks {
          background: #20231f;
          color: #fffef9;
          padding: 24px 26px;
          border: 1px solid #20231f;
          display: grid;
          gap: 12px;
        }
        .tracks-head {
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: #ff8e6e;
          padding-bottom: 10px;
          border-bottom: 1px solid #3b4336;
        }
        .track-row {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          font-size: 13px;
          padding-bottom: 10px;
          border-bottom: 1px solid #2f352e;
        }
        .track-row:last-child {
          border-bottom: 0;
          padding-bottom: 0;
        }
        .track-row code {
          color: #ff8e6e;
          font-family: monospace;
          font-size: 11px;
        }
        footer {
          display: flex;
          justify-content: space-between;
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #62675d;
          border-top: 1px solid #d3d6c9;
          padding-top: 18px;
        }
      </style>
      <header>
        <div class="logo">mumro<i>●</i><span>academy</span></div>
        <div class="domain">academy.mumro.io</div>
      </header>
      <main>
        <div>
          <h1>${pl ? 'Systemy marki. Inżynieria treści.' : 'Brand Systems. Content Ops.'}<em>${pl ? 'Agenci AI i MCP.' : 'Agentic AI & MCP.'}</em></h1>
          <p>${
            pl
              ? '4 ścieżki, 12 pogłębionych lekcji i gotowe playbooki o strategii, wielokanałowych treściach, technicznym SEO i kontrolowanej autonomii AI.'
              : '4 tracks, 12 deep-dive lessons, and copy-ready playbooks on versioned strategy, multi-channel content, technical SEO, and governed AI agents.'
          }</p>
        </div>
        <div class="tracks">
          <div class="tracks-head">${pl ? 'PROGRAM AKADEMII (12 LEKCJI)' : 'ACADEMY CURRICULUM (12 LESSONS)'}</div>
          <div class="track-row"><span>${pl ? 'Żywe systemy marki i Brand Voice' : 'Living Brand Systems & Voice'}</span><code>01–03</code></div>
          <div class="track-row"><span>${pl ? 'Jedna historia, 4 kanały i karuzele' : 'One Story, 4 Channels & Carousels'}</span><code>04–06</code></div>
          <div class="track-row"><span>${pl ? 'Strona WWW, SEO, czatbot i kohorty' : 'Website, SEO, Assistant & Cohorts'}</span><code>07–09</code></div>
          <div class="track-row"><span>${pl ? 'Agenci MCP, Prepare→Confirm i kontrola' : 'MCP Agents, Prepare→Confirm & Control'}</span><code>10–12</code></div>
        </div>
      </main>
      <footer>
        <span>${pl ? 'OTWARTY PODRĘCZNIK OD MUMRO · EN / PL' : 'OPEN HANDBOOK BY MUMRO · EN / PL'}</span>
        <span>mumro.io</span>
      </footer>
    `);
    await page.addStyleTag({ content: fonts });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `public/media/share-${locale}.png` });
    await page.close();
  }
  console.log('Generated 1200×630 EN/PL Open Graph share cards for MUMRO Academy.');
} finally {
  await browser.close();
}
