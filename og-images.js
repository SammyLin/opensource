// Generates a 1200×630 share image for every program in every language:
// public/og/<id>-<lang>.png, used as og:image on the program pages (/p/<id>/).
// Run: node og-images.js  (or: npm run og)   Add --force to redraw everything.
//
// Images are only redrawn when their inputs change (tracked in public/og/manifest.json),
// so rebuilding doesn't churn binary files. Needs Playwright's Chromium and the
// Noto Sans CJK fonts (`apt-get install fonts-noto-cjk` on Ubuntu). To use an existing
// Chromium binary instead of Playwright's, set CHROMIUM_PATH.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { chromium } = require('playwright');

const ROOT = __dirname;
const PUBLIC = path.join(ROOT, 'public');
const OUT = path.join(PUBLIC, 'og');
const MANIFEST = path.join(OUT, 'manifest.json');
const VERSION = 1; // bump to redraw every image after changing the design below
const FORCE = process.argv.includes('--force');

const data = JSON.parse(fs.readFileSync(path.join(PUBLIC, 'data', 'programs.json'), 'utf-8'));
const wordmark = fs.readFileSync(path.join(PUBLIC, 'brand', 'logo-wordmark.png')).toString('base64');

const LANGS = {
    'zh-Hant': { font: 'Noto Sans CJK TC', type: { direct_activation: '直接開通', application_required: '要申請', high_bar: '門檻高' } },
    'zh-Hans': { font: 'Noto Sans CJK SC', type: { direct_activation: '直接开通', application_required: '要申请', high_bar: '门槛高' } },
    'en': { font: 'Noto Sans CJK TC', type: { direct_activation: 'Direct activation', application_required: 'Application required', high_bar: 'High bar' } },
};
const BADGE = {
    direct_activation: ['#d1fae5', '#065f46'],
    application_required: ['#fef3c7', '#92400e'],
    high_bar: ['#fee2e2', '#991b1b'],
};

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function inputs(p, lang) {
    const logo = p.logo ? fs.readFileSync(path.join(PUBLIC, p.logo), 'utf-8') : '';
    const cats = p.category.map(c => {
        const x = data.categories[c] || {};
        return { label: x[lang] || c, cncf: x.cncf ? [x.cncf.category, x.cncf.subcategory].filter(Boolean).join(' › ') : '' };
    });
    return { VERSION, name: p.name, why: p.whyItHelps[lang], type: p.type, typeLabel: LANGS[lang].type[p.type], cats, logo, font: LANGS[lang].font };
}

function html(x) {
    const [bg, fg] = BADGE[x.type];
    const logo = x.logo
        ? `<img src="data:image/svg+xml;base64,${Buffer.from(x.logo).toString('base64')}" alt="">`
        : `<span class="mono">${esc(x.name.charAt(0))}</span>`;
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
        * { margin: 0; box-sizing: border-box; }
        body { width: 1200px; height: 630px; background: #f8f9fa; font-family: "${x.font}", sans-serif; color: #1a1a1a; position: relative; overflow: hidden; }
        .bar { position: absolute; inset: 0 0 auto 0; height: 10px; background: #10b981; }
        header { position: absolute; top: 52px; left: 72px; right: 72px; display: flex; justify-content: space-between; align-items: center; }
        header img { height: 50px; }
        header span { font-size: 24px; font-weight: 500; color: #059669; }
        main { position: absolute; top: 158px; left: 72px; right: 72px; }
        .row { display: flex; gap: 32px; align-items: center; }
        .tile { width: 128px; height: 128px; flex: none; display: grid; place-items: center; background: #fff; border: 2px solid #e5e7eb; border-radius: 28px; }
        .tile img { width: 72px; height: 72px; }
        .mono { font-size: 64px; font-weight: 700; color: #555; }
        h1 { font-size: 56px; line-height: 1.22; padding-bottom: 4px; font-weight: 700; letter-spacing: -0.01em;
             display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        p { margin-top: 32px; font-size: 30px; line-height: 1.5; color: #374151;
            display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        footer { position: absolute; left: 72px; right: 72px; bottom: 48px; display: flex; gap: 12px; align-items: center; flex-wrap: nowrap; }
        .badge { padding: 6px 18px; border-radius: 10px; font-size: 24px; font-weight: 700; background: ${bg}; color: ${fg}; white-space: nowrap; }
        .tag { padding: 6px 18px; border-radius: 10px; font-size: 24px; background: #fff; border: 2px solid #e5e7eb; color: #374151; white-space: nowrap; }
        .cncf { font-size: 20px; color: #6b6b6b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    </style></head><body>
        <div class="bar"></div>
        <header><img src="data:image/png;base64,${wordmark}" alt=""><span>opensource.3mi.ai</span></header>
        <main>
            <div class="row"><div class="tile">${logo}</div><h1>${esc(x.name)}</h1></div>
            <p>${esc(x.why)}</p>
        </main>
        <footer>
            <span class="badge">${esc(x.typeLabel)}</span>
            ${x.cats.map(c => `<span class="tag">${esc(c.label)}</span>`).join('')}
            <span class="cncf">${esc(x.cats.map(c => c.cncf ? 'CNCF › ' + c.cncf : '').filter(Boolean).join(' · '))}</span>
        </footer>
    </body></html>`;
}

(async () => {
    fs.mkdirSync(OUT, { recursive: true });
    const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf-8')) : {};
    const next = {};
    const todo = [];
    for (const p of data.programs) {
        for (const lang of Object.keys(LANGS)) {
            const file = `${p.id}-${lang.toLowerCase()}.png`;
            const x = inputs(p, lang);
            const hash = crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex').slice(0, 16);
            next[file] = hash;
            if (FORCE || manifest[file] !== hash || !fs.existsSync(path.join(OUT, file))) todo.push({ file, x });
        }
    }

    if (todo.length) {
        const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
        const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
        for (const { file, x } of todo) {
            await page.setContent(html(x), { waitUntil: 'load' });
            await page.evaluate(() => document.fonts.ready);
            await page.screenshot({ path: path.join(OUT, file), type: 'png' });
            console.log(`public/og/${file}`);
        }
        await browser.close();
    }

    // Drop images for programs that were removed.
    for (const f of fs.readdirSync(OUT)) {
        if (f.endsWith('.png') && !(f in next)) { fs.rmSync(path.join(OUT, f)); console.log(`removed public/og/${f}`); }
    }
    const sorted = Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b)));
    fs.writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2) + '\n');
    console.log(`${todo.length} drawn, ${Object.keys(next).length - todo.length} up to date.`);
})().catch(err => {
    console.error(err);
    process.exit(1);
});
