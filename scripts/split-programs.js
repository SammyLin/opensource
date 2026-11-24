// Converts the old single-file format ({ categories, programs: [...] }) into
// data/categories.json + data/programs/<id>.json. Use it once for the migration, or to
// port a branch that still edits the old file:  node scripts/split-programs.js [path/to/programs.json]
// Existing program files are overwritten; categories are merged (existing ids keep their labels unless the input changes them).
const fs = require('fs');
const path = require('path');
const { ROOT, PROGRAMS_DIR, CATEGORIES_FILE } = require('../lib/data');

const input = path.resolve(process.argv[2] || path.join(ROOT, 'public', 'data', 'programs.json'));
const src = JSON.parse(fs.readFileSync(input, 'utf-8'));
if (!src.categories || !Array.isArray(src.programs)) {
    console.error(`ERROR: ${input} is not in the old { categories, programs: [] } format`);
    process.exit(1);
}
fs.mkdirSync(PROGRAMS_DIR, { recursive: true });

const old = fs.existsSync(CATEGORIES_FILE) ? JSON.parse(fs.readFileSync(CATEGORIES_FILE, 'utf-8')) : {};
const { $schema, ...oldCats } = old;
const categories = { $schema: './schemas/categories.schema.json', ...oldCats, ...src.categories };
fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2) + '\n');

for (const p of src.programs) {
    const { $schema: _, ...rest } = p;
    fs.writeFileSync(path.join(PROGRAMS_DIR, `${p.id}.json`), JSON.stringify({ $schema: '../schemas/program.schema.json', ...rest }, null, 2) + '\n');
}
console.log(`Wrote data/categories.json (${Object.keys(categories).length - 1} categories) and ${src.programs.length} files in data/programs/.`);
