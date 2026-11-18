# OSS Perks｜開源福利社

[繁體中文](#繁體中文) | [简体中文](#简体中文) | [English](#english)

---

## 繁體中文

### 關於本專案

**開源福利社** 是一個靜態網站，收集並展示開源專案維護者可以免費獲得的各種工具與服務方案。

🌐 **網站**：[opensource.3mi.ai](https://opensource.3mi.ai)

### 如何編輯資料

所有方案資料存放在 `public/data/programs.json`（`categories` 類別名稱 + `programs` 方案陣列）。每個條目包含以下欄位：

```json
{
  "name": "方案名稱",
  "whatYouGet": {
    "zh-Hant": "繁體中文說明",
    "zh-Hans": "简体中文说明",
    "en": "English description"
  },
  "requirements": {
    "zh-Hant": "繁體中文申請條件",
    "zh-Hans": "简体中文申请条件",
    "en": "English requirements"
  },
  "type": "direct_activation | application_required | high_bar",
  "category": ["ide", "containers", "monitoring", "security_scanning", "code_quality", "password_management", "ai_tools"],
  "link": "https://official-link.com",
  "lastVerified": "YYYY-MM-DD"
}
```

### 本地執行

本專案是純靜態網站，無需建置步驟：

```bash
# 方法 1: 使用 Wrangler Pages 本地開發伺服器（推薦，唯一支援 /zh-hans/、/en/ 語言路徑）
npx wrangler pages dev public

# 方法 2: 使用 Python 的內建伺服器
cd public && python3 -m http.server 8000

# 方法 3: 使用 Node.js 的 http-server
npx http-server public

# 方法 4: 直接用瀏覽器開啟 public/index.html
```

然後在瀏覽器中開啟顯示的 URL（通常是 `http://localhost:8787` 或 `http://localhost:8000`）

### 部署

網站部署在 Cloudflare Pages，使用 Cloudflare 的 GitHub 集成（自動部署）。

推送到 `main` 分支會自動觸發 Cloudflare Pages 重新建置和部署。

### 資料驗證

執行驗證腳本確保 JSON 格式正確：

```bash
node validate.js
# 或
npm run validate
```

### 截圖（PR 用）

先用 `npx wrangler pages dev public --port 8788` 啟動本機站（一般靜態伺服器不支援語言路徑），再執行：

```bash
npx playwright install chromium   # 首次需要
npm run screenshots -- before pr-media/pr2
npm run screenshots -- after pr-media/pr2
```

腳本見根目錄 `take-screenshots.js`。

### 授權

- **程式碼**（網站、腳本、文件等）：[MIT](./LICENSE)（Copyright © 2026 Sammy Lin）
- **方案資料**（`public/data/programs.json`）：[CC BY 4.0](./public/data/LICENSE) — https://creativecommons.org/licenses/by/4.0/

### 貢獻方式

歡迎提交 Pull Request！請參閱 [CONTRIBUTING.md](CONTRIBUTING.md) 了解詳細的貢獻指南。

---

## 简体中文

### 关于本项目

**开源福利社** 是一个静态网站，收集并展示开源项目维护者可以免费获得的各种工具与服务方案。

🌐 **网站**：[opensource.3mi.ai](https://opensource.3mi.ai)

### 如何编辑数据

所有方案数据存放在 `public/data/programs.json`（`categories` 类别名称 + `programs` 方案数组）。每个条目包含以下字段：

```json
{
  "name": "方案名称",
  "whatYouGet": {
    "zh-Hant": "繁體中文說明",
    "zh-Hans": "简体中文说明",
    "en": "English description"
  },
  "requirements": {
    "zh-Hant": "繁體中文申請條件",
    "zh-Hans": "简体中文申请条件",
    "en": "English requirements"
  },
  "type": "direct_activation | application_required | high_bar",
  "category": ["ide", "containers", "monitoring", "security_scanning", "code_quality", "password_management", "ai_tools"],
  "link": "https://official-link.com",
  "lastVerified": "YYYY-MM-DD"
}
```

### 本地运行

本项目是纯静态网站，无需构建步骤：

```bash
# 方法 1: 使用 Wrangler Pages 本地开发服务器（推荐，唯一支持 /zh-hans/、/en/ 语言路径）
npx wrangler pages dev public

# 方法 2: 使用 Python 的内置服务器
cd public && python3 -m http.server 8000

# 方法 3: 使用 Node.js 的 http-server
npx http-server public

# 方法 4: 直接用浏览器打开 public/index.html
```

然后在浏览器中打开显示的 URL（通常是 `http://localhost:8787` 或 `http://localhost:8000`）

### 部署

网站部署在 Cloudflare Pages，使用 Cloudflare 的 GitHub 集成（自动部署）。

推送到 `main` 分支会自动触发 Cloudflare Pages 重新构建和部署。

### 数据验证

运行验证脚本确保 JSON 格式正确：

```bash
node validate.js
# 或
npm run validate
```

### 截图（PR 用）

先用 `npx wrangler pages dev public --port 8788` 启动本地站（一般静态服务器不支持语言路径），再执行：

```bash
npx playwright install chromium   # 首次需要
npm run screenshots -- before pr-media/pr2
npm run screenshots -- after pr-media/pr2
```

脚本见根目录 `take-screenshots.js`。

### 许可

- **代码**（网站、脚本、文档等）：[MIT](./LICENSE)（Copyright © 2026 Sammy Lin）
- **方案数据**（`public/data/programs.json`）：[CC BY 4.0](./public/data/LICENSE) — https://creativecommons.org/licenses/by/4.0/

### 贡献方式

欢迎提交 Pull Request！请参阅 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详细的贡献指南。

---

## English

### About This Project

**OSS Perks** is a static website that collects and showcases free tools and services available to open source project maintainers.

🌐 **Website**: [opensource.3mi.ai](https://opensource.3mi.ai)

### How to Edit Data

All program data is stored in the `data/programs.json` file. Each entry contains the following fields:

```json
{
  "name": "Program Name",
  "whatYouGet": {
    "zh-Hant": "繁體中文說明",
    "zh-Hans": "简体中文说明",
    "en": "English description"
  },
  "requirements": {
    "zh-Hant": "繁體中文申請條件",
    "zh-Hans": "简体中文申请条件",
    "en": "English requirements"
  },
  "type": "direct_activation | application_required | high_bar",
  "category": ["ide", "containers", "monitoring", "security_scanning", "code_quality", "password_management", "ai_tools"],
  "link": "https://official-link.com",
  "lastVerified": "YYYY-MM-DD"
}
```

### Running Locally

This is a plain static website with no build step required:

```bash
# Method 1: Wrangler Pages local dev server (recommended; the only option that serves /zh-hans/ and /en/)
npx wrangler pages dev public

# Method 2: Using Python's built-in server
cd public && python3 -m http.server 8000

# Method 3: Using Node.js http-server
npx http-server public

# Method 4: Open public/index.html directly in browser
```

Then open the displayed URL in your browser (usually `http://localhost:8787` or `http://localhost:8000`)

### Deployment

The site is deployed on Cloudflare Pages using Cloudflare's GitHub integration (automatic deployment).

Pushing to the `main` branch automatically triggers Cloudflare Pages to rebuild and deploy.

### Data Validation

Run the validation script to ensure JSON is properly formatted:

```bash
node validate.js
# or
npm run validate
```

### Screenshots (for PRs)

Serve the site locally first (use `npx wrangler pages dev public --port 8788`; plain static servers do not handle the language paths), then:

```bash
npx playwright install chromium   # first time only
npm run screenshots -- before pr-media/pr2
npm run screenshots -- after pr-media/pr2
```

See `take-screenshots.js` in the repo root.

### License

- **Code** (site, scripts, docs, etc.): [MIT](./LICENSE) (Copyright © 2026 Sammy Lin)
- **Program data** (`public/data/programs.json`): [CC BY 4.0](./public/data/LICENSE) — https://creativecommons.org/licenses/by/4.0/

### Contributing

Pull requests are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.
