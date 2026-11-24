// Writes public/data/programs.json (what the site fetches) from data/categories.json + data/programs/*.json.
// Generated file — don't edit it or commit it in PRs; the "Build static pages" workflow commits it on main.
// Run: node scripts/bundle-data.js  (or: npm run data)
const fs = require('fs');
const path = require('path');
const { BUNDLE_FILE, bundle } = require('../lib/data');

const data = bundle();
fs.mkdirSync(path.dirname(BUNDLE_FILE), { recursive: true });
fs.writeFileSync(BUNDLE_FILE, JSON.stringify(data, null, 2) + '\n');
console.log(`public/data/programs.json written: ${data.programs.length} programs, ${Object.keys(data.categories).length} categories.`);
