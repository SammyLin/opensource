// Loads the program data from its source files:
//   data/categories.json        category id → three-language labels + CNCF mapping
//   data/programs/<id>.json     one file per program (file name must match its id)
// Each PR that adds a program only adds new files, so parallel PRs don't conflict.
// public/data/programs.json is a generated bundle (scripts/bundle-data.js) that the site fetches.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const PROGRAMS_DIR = path.join(DATA_DIR, 'programs');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const BUNDLE_FILE = path.join(ROOT, 'public', 'data', 'programs.json');

const readJSON = file => JSON.parse(fs.readFileSync(file, 'utf-8'));
const strip = ({ $schema, ...rest }) => rest;

// Returns { categories, programs, files } — programs sorted by id; files maps id → source file.
// Throws on unreadable / invalid JSON so callers fail loudly.
function loadData() {
    const categories = strip(readJSON(CATEGORIES_FILE));
    const files = {};
    const programs = fs.readdirSync(PROGRAMS_DIR)
        .filter(f => f.endsWith('.json'))
        .sort()
        .map(f => {
            const file = path.join(PROGRAMS_DIR, f);
            let p;
            try { p = readJSON(file); } catch (err) { throw new Error(`data/programs/${f}: ${err.message}`); }
            files[p.id] = `data/programs/${f}`;
            return Object.assign(strip(p), { __file: f });
        });
    return { categories, programs, files };
}

// The bundle the site and the build scripts read: { categories, programs } without helper fields.
function bundle(data = loadData()) {
    return {
        categories: data.categories,
        programs: data.programs.map(({ __file, ...p }) => p),
    };
}

module.exports = { ROOT, DATA_DIR, PROGRAMS_DIR, CATEGORIES_FILE, BUNDLE_FILE, loadData, bundle };
