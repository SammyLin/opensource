# OSS Perks｜開源福利社

[繁體中文](#繁體中文) | [简体中文](#简体中文) | [English](#english)

---

## 繁體中文

### 關於本專案

**開源福利社** 是一個靜態網站，收集並展示開源專案維護者可以免費獲得的各種工具與服務方案。

🌐 **網站**：[opensource.3mi.ai](https://opensource.3mi.ai)

### 如何編輯資料

所有方案資料存放在 `data/programs.json` 檔案中。每個條目包含以下欄位：

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
# 方法 1: 使用 Python 的內建伺服器
python3 -m http.server 8000

# 方法 2: 使用 Node.js 的 http-server
npx http-server

# 方法 3: 直接用瀏覽器開啟 index.html
```

然後在瀏覽器中開啟 `http://localhost:8000`

### 資料驗證

執行驗證腳本確保 JSON 格式正確：

```bash
node validate.js
```

### 貢獻方式

歡迎提交 Pull Request！請參閱 [CONTRIBUTING.md](CONTRIBUTING.md) 了解詳細的貢獻指南。

---

## 简体中文

### 关于本项目

**开源福利社** 是一个静态网站，收集并展示开源项目维护者可以免费获得的各种工具与服务方案。

🌐 **网站**：[opensource.3mi.ai](https://opensource.3mi.ai)

### 如何编辑数据

所有方案数据存放在 `data/programs.json` 文件中。每个条目包含以下字段：

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
# 方法 1: 使用 Python 的内置服务器
python3 -m http.server 8000

# 方法 2: 使用 Node.js 的 http-server
npx http-server

# 方法 3: 直接用浏览器打开 index.html
```

然后在浏览器中打开 `http://localhost:8000`

### 数据验证

运行验证脚本确保 JSON 格式正确：

```bash
node validate.js
```

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
# Method 1: Using Python's built-in server
python3 -m http.server 8000

# Method 2: Using Node.js http-server
npx http-server

# Method 3: Open index.html directly in browser
```

Then open `http://localhost:8000` in your browser

### Data Validation

Run the validation script to ensure JSON is properly formatted:

```bash
node validate.js
```

### Contributing

Pull requests are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.
