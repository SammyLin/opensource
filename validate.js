// Validates the program data in data/categories.json + data/programs/<id>.json. Run: node validate.js
const fs = require('fs');
const path = require('path');
const { loadData } = require('./lib/data');

const TYPES = ['direct_activation', 'application_required', 'high_bar'];
const LANGS = ['zh-Hant', 'zh-Hans', 'en'];
const errors = [];

const isText = v => typeof v === 'string' && v.trim() !== '';
const checkI18n = (obj, where) => {
    if (!obj || typeof obj !== 'object') return errors.push(`${where}: missing`);
    LANGS.forEach(l => isText(obj[l]) || errors.push(`${where}.${l}: missing or empty`));
};

let data;
try {
    data = loadData();
} catch (err) {
    console.error(`ERROR: cannot read/parse program data: ${err.message}`);
    process.exit(1);
}

if (!data.categories || typeof data.categories !== 'object') errors.push("data/categories.json: must be an object");
if (!Array.isArray(data.programs)) errors.push("root: 'programs' must be an array");
const categories = data.categories || {};
const programs = Array.isArray(data.programs) ? data.programs : [];

Object.entries(categories).forEach(([id, label]) => {
    checkI18n(label, `categories.${id}`);
    // cncf is optional: categories outside the CNCF Landscape (e.g. collaboration) leave it out.
    if (label && label.cncf !== undefined && !isText(label.cncf.category)) errors.push(`categories.${id}.cncf.category: missing (see https://landscape.cncf.io)`);
});

const seen = new Set();
const seenIds = new Set();
programs.forEach((p, i) => {
    const id = `data/programs/${p.__file}`;
    if (p.id && p.__file !== `${p.id}.json`) errors.push(`${id}: file name must be '${p.id}.json' to match its id`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id || '')) errors.push(`${id}: 'id' must be lowercase letters, digits and dashes (used in the page URL /p/<id>/)`);
    else if (seenIds.has(p.id)) errors.push(`${id}: duplicate id '${p.id}'`);
    else seenIds.add(p.id);
    if (!isText(p.name)) errors.push(`${id}: missing 'name'`);
    else if (seen.has(p.name)) errors.push(`${id}: duplicate name`);
    else seen.add(p.name);
    checkI18n(p.whatYouGet, `${id}.whatYouGet`);
    checkI18n(p.whyItHelps, `${id}.whyItHelps`);
    if (p.logo !== undefined) {
        if (!/^\/logos\/[a-z0-9-]+\.svg$/.test(p.logo)) errors.push(`${id}: 'logo' must look like /logos/name.svg`);
        else if (!fs.existsSync(path.join(__dirname, 'public', p.logo))) errors.push(`${id}: logo file public${p.logo} not found`);
    }
    checkI18n(p.requirements, `${id}.requirements`);
    if (!TYPES.includes(p.type)) errors.push(`${id}: 'type' must be one of ${TYPES.join(', ')}`);
    if (!Array.isArray(p.category) || p.category.length === 0) {
        errors.push(`${id}: 'category' must be a non-empty array`);
    } else {
        p.category.filter(c => !(c in categories)).forEach(c =>
            errors.push(`${id}: unknown category '${c}' (add it to 'categories' first; known: ${Object.keys(categories).join(', ')})`));
    }
    if (!/^https?:\/\/.+/.test(p.link || '')) errors.push(`${id}: invalid 'link'`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.lastVerified || '') || isNaN(Date.parse(p.lastVerified))) {
        errors.push(`${id}: 'lastVerified' must be a valid YYYY-MM-DD date`);
    }
    if (p.pending !== undefined) {
        checkI18n(p.pending, `${id}.pending`);
        if (p.pending && p.pending.link !== undefined && !/^https?:\/\/.+/.test(p.pending.link)) {
            errors.push(`${id}: invalid 'pending.link'`);
        }
    }
});

if (errors.length) {
    errors.forEach(e => console.error(`ERROR: ${e}`));
    console.error(`\nValidation FAILED (${errors.length} error${errors.length > 1 ? 's' : ''}).`);
    process.exit(1);
}
console.log(`OK: ${programs.length} programs, ${Object.keys(categories).length} categories.`);
