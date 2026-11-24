<p align="center">
  <a href="https://opensource.3mi.ai">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/brand/logo-wordmark-dark.png">
      <img src="public/brand/logo-wordmark.png" alt="OSS Perks" width="420">
    </picture>
  </a>
</p>

<p align="center">
  <strong>Free tools and services for open source maintainers — what you get, who qualifies, and how to apply, on one page.</strong>
</p>

<p align="center">
  <a href="https://opensource.3mi.ai"><img alt="Website" src="https://img.shields.io/badge/website-opensource.3mi.ai-10b981?style=flat-square"></a>
  <a href="./LICENSE"><img alt="Code license: MIT" src="https://img.shields.io/badge/code-MIT-blue?style=flat-square"></a>
  <a href="./data/LICENSE"><img alt="Data license: CC BY 4.0" src="https://img.shields.io/badge/data-CC%20BY%204.0-lightgrey?style=flat-square"></a>
  <a href="CONTRIBUTING.md"><img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square"></a>
</p>

Many companies offer free plans for open source projects, but the details are scattered across their websites. **[OSS Perks](https://opensource.3mi.ai)** puts them on one page: what you get, who qualifies, and how hard it is to get (direct activation / application required / high bar), each with an official link and a last-verified date. Filter by [CNCF Landscape](https://landscape.cncf.io) category. The site is in English, Traditional Chinese and Simplified Chinese, and follows your browser's language.

For AI assistants and agents: [`/llms.txt`](https://opensource.3mi.ai/llms.txt) (index) and [`/llms-full.txt`](https://opensource.3mi.ai/llms-full.txt) (every program's details), generated from the data on each build.

## Contributing

**To add or fix a program, edit one file:** `data/programs/<id>.json`. Copy an existing file, change it, and open a PR — the site updates automatically after merge. See [CONTRIBUTING.md](CONTRIBUTING.md#english) for the fields.

Please write PR titles and descriptions in English.

## License

Code: [MIT](./LICENSE). Program data (`data/`): [CC BY 4.0](./data/LICENSE).
