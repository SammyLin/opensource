// Regenerates the program tables in README.md from public/data/programs.json.
// Run: node update-readme.js  (or: npm run readme)
const fs = require('fs');
const path = require('path');

const README = path.join(__dirname, 'README.md');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'data', 'programs.json'), 'utf-8'));

const TYPES = ['direct_activation', 'application_required', 'high_bar'];
const L = {
    'zh-Hant': { head: ['', '方案', 'CNCF 分類', '門檻', '對你的專案有什麼幫助'], type: { direct_activation: '直接開通', application_required: '要申請', high_bar: '門檻高' } },
    'zh-Hans': { head: ['', '方案', 'CNCF 分类', '门槛', '对你的项目有什么帮助'], type: { direct_activation: '直接开通', application_required: '要申请', high_bar: '门槛高' } },
    'en': { head: ['', 'Program', 'CNCF category', 'Bar', 'How it helps your project'], type: { direct_activation: 'Direct activation', application_required: 'Application required', high_bar: 'High bar' } },
};

const cell = s => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
// Group by CNCF category (in the order of data.categories), then by how hard it is to get.
const CATS = Object.keys(data.categories);
const programs = [...data.programs].sort((a, b) =>
    (CATS.indexOf(a.category[0]) - CATS.indexOf(b.category[0])) || (TYPES.indexOf(a.type) - TYPES.indexOf(b.type)));
const cncf = c => {
    const x = data.categories[c] && data.categories[c].cncf;
    return x ? [x.category, x.subcategory].filter(Boolean).join(' › ') : c;
};

let readme = fs.readFileSync(README, 'utf-8');
for (const [lang, l] of Object.entries(L)) {
    const rows = programs.map(p => [
        p.logo ? `<img src="public${p.logo}" alt="" width="20" height="20">` : '',
        `[${cell(p.name)}](${p.link})`,
        p.category.map(c => lang === 'en'
            ? cell(cncf(c))
            : `${cell(data.categories[c] ? data.categories[c][lang] : c)}<br><sub>${cell(cncf(c))}</sub>`).join('<br>'),
        l.type[p.type],
        cell(p.whyItHelps ? p.whyItHelps[lang] : p.whatYouGet[lang]),
    ]);
    const table = [
        `| ${l.head.join(' | ')} |`,
        `| ${l.head.map(() => '---').join(' | ')} |`,
        ...rows.map(r => `| ${r.join(' | ')} |`),
    ].join('\n');
    const start = `<!-- programs:${lang}:start -->`;
    const end = `<!-- programs:${lang}:end -->`;
    const re = new RegExp(`${start}[\\s\\S]*?${end}`);
    if (!re.test(readme)) {
        console.error(`ERROR: markers for ${lang} not found in README.md`);
        process.exit(1);
    }
    readme = readme.replace(re, `${start}\n${table}\n${end}`);
}
fs.writeFileSync(README, readme);
console.log(`README.md updated: ${programs.length} programs × ${Object.keys(L).length} languages.`);
