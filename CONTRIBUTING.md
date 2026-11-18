# Contributing Guide | 貢獻指南 | 贡献指南

[繁體中文](#繁體中文) | [简体中文](#简体中文) | [English](#english)

---

## 繁體中文

### 如何新增一個方案

感謝您願意為開源福利社貢獻！以下是新增方案的步驟：

#### 1. Fork 並 Clone 專案

```bash
git clone https://github.com/YOUR_USERNAME/opensource.git
cd opensource
```

#### 2. 編輯 `public/data/programs.json`

在 `programs` 陣列中新增一個條目。檔案開頭的 `$schema` 會讓 VS Code 等編輯器自動補完欄位、即時標出錯誤。必要欄位：

```json
{
  "name": "方案的正式名稱",
  "logo": "/logos/方案代號.svg",
  "whatYouGet": {
    "zh-Hant": "繁體中文：說明這個方案提供什麼內容",
    "zh-Hans": "简体中文：说明这个方案提供什么内容",
    "en": "English: What this program offers"
  },
  "whyItHelps": {
    "zh-Hant": "繁體中文：一兩句話說明這個工具在做什麼、對開源專案有什麼幫助",
    "zh-Hans": "简体中文：一两句话说明这个工具在做什么、对开源项目有什么帮助",
    "en": "English: one or two sentences on what the tool does and how it helps"
  },
  "requirements": {
    "zh-Hant": "繁體中文：申請條件與門檻",
    "zh-Hans": "简体中文：申请条件与门槛",
    "en": "English: Requirements and eligibility criteria"
  },
  "type": "選擇其中之一",
  "category": ["至少選擇一個類別"],
  "link": "https://官方來源連結",
  "lastVerified": "YYYY-MM-DD",
  "pending": {
    "zh-Hant": "待確認",
    "zh-Hans": "待确认",
    "en": "To be confirmed",
    "link": "https://官方來源連結"
  }
}
```

`pending` 為**選填**：僅在某項申請條件暫時無法從官方來源確認時使用；網站會顯示「待確認」徽章。

#### 欄位說明

- **name**: 方案的正式英文名稱
- **whatYouGet**: 三種語言的內容說明
  - **zh-Hant**: 繁體中文，使用台灣用詞（程式碼、軟體、儲存庫等）
  - **zh-Hans**: 简体中文，使用大陆用词（代码、软件、仓库等）
  - **en**: 英文說明
- **whyItHelps**: 三種語言，一兩句話說明這個工具在做什麼、對開源專案有什麼幫助（網站卡片會優先顯示這段）
- **logo**（選填）: `public/logos/` 底下的 SVG 路徑，例如 `/logos/sentry.svg`；建議用品牌官方 SVG 或 [Simple Icons](https://simpleicons.org)。沒有的話網站會顯示名稱縮寫
- **requirements**: 三種語言的申請條件說明
- **type**: 必須是以下其中之一
  - `direct_activation` - 直接開通（無需申請）
  - `application_required` - 要申請
  - `high_bar` - 門檻高
- **category**: 陣列，填檔案上方 `categories` 裡的 id（一個或多個）。需要新類別時，先在 `categories` 加一筆三語名稱，網站篩選會自動出現
  分類依照 [CNCF Cloud Native Landscape](https://landscape.cncf.io)：先在 CNCF Landscape 找這個產品（或同類工具）被放在哪一格，再選對應的 id。新類別要在 `categories` 加三語名稱和 `cncf` 欄位（照官方英文名稱）
  - `container_registry` - 容器映像倉庫 (Provisioning › Container Registry)
  - `security_compliance` - 安全與合規 (Provisioning › Security & Compliance)
  - `key_management` - 金鑰與機密管理 (Provisioning › Key Management)
  - `app_definition_image_build` - 應用定義與開發環境 (App Definition and Development › Application Definition & Image Build)
  - `ci_cd` - 持續整合與交付 (App Definition and Development › Continuous Integration & Delivery)
  - `observability` - 可觀測性 (Observability and Analysis › Observability)
  - `ai_agent` - AI Agent (AI Agent)
- **link**: 申請／開通頁面（必填），網站的「前往申請」按鈕會連到這裡
- **lastVerified**: 最後驗證日期，格式 YYYY-MM-DD（如 2026-11-18）
- **pending**（選填）：尚未確認的說明，需含 `zh-Hant` / `zh-Hans` / `en`；可選 `link` 指向官方來源

#### 3. 執行驗證

```bash
node validate.js
npm run readme   # 更新 README 裡的方案列表
```

確保所有欄位都正確，且通過驗證。

#### 4. 提交 Pull Request

```bash
git add public/data/programs.json
git commit -m "Add [方案名稱]"
git push origin main
```

然後在 GitHub 上開啟 Pull Request。

### 授權條款

提交貢獻即表示您同意：

- **程式碼／網站／文件**貢獻以 [MIT](./LICENSE) 授權
- **`public/data/programs.json` 資料**貢獻以 [CC BY 4.0](./public/data/LICENSE) 授權

### 重要原則

- ✅ 每個條目必須包含**官方來源連結**
- ✅ 說明文字應**客觀描述**方案本身的條款，不添加個人意見或推薦
- ✅ 簡體中文必須使用**大陸用詞**，而非僅做繁簡轉換
- ✅ 在提交前請訪問官方頁面**驗證資訊正確性**
- ✅ 將 `lastVerified` 設為您驗證的日期
- ✅ 無法確認的條件請用選填 `pending` 標明，勿臆造

---

## 简体中文

### 如何新增一个方案

感谢您愿意为开源福利社贡献！以下是新增方案的步骤：

#### 1. Fork 并 Clone 项目

```bash
git clone https://github.com/YOUR_USERNAME/opensource.git
cd opensource
```

#### 2. 编辑 `public/data/programs.json`

在 `programs` 数组中新增一个条目。文件开头的 `$schema` 会让 VS Code 等编辑器自动补全字段、实时标出错误。必要字段：

```json
{
  "name": "方案的正式名称",
  "logo": "/logos/方案代号.svg",
  "whatYouGet": {
    "zh-Hant": "繁體中文：說明這個方案提供什麼內容",
    "zh-Hans": "简体中文：说明这个方案提供什么内容",
    "en": "English: What this program offers"
  },
  "whyItHelps": {
    "zh-Hant": "繁體中文：一兩句話說明這個工具在做什麼、對開源專案有什麼幫助",
    "zh-Hans": "简体中文：一两句话说明这个工具在做什么、对开源项目有什么帮助",
    "en": "English: one or two sentences on what the tool does and how it helps"
  },
  "requirements": {
    "zh-Hant": "繁體中文：申請條件與門檻",
    "zh-Hans": "简体中文：申请条件与门槛",
    "en": "English: Requirements and eligibility criteria"
  },
  "type": "选择其中之一",
  "category": ["至少选择一个类别"],
  "link": "https://官方来源链接",
  "lastVerified": "YYYY-MM-DD",
  "pending": {
    "zh-Hant": "待確認",
    "zh-Hans": "待确认",
    "en": "To be confirmed",
    "link": "https://官方来源链接"
  }
}
```

`pending` 为**选填**：仅在某项申请条件暂时无法从官方来源确认时使用；网站会显示「待确认」徽章。

#### 字段说明

- **name**: 方案的正式英文名称
- **whatYouGet**: 三种语言的内容说明
  - **zh-Hant**: 繁體中文，使用台灣用詞（程式碼、軟體、儲存庫等）
  - **zh-Hans**: 简体中文，使用大陆用词（代码、软件、仓库等）
  - **en**: 英文说明
- **whyItHelps**: 三种语言，一两句话说明这个工具在做什么、对开源项目有什么帮助（网站卡片会优先显示这段）
- **logo**（选填）: `public/logos/` 下的 SVG 路径，例如 `/logos/sentry.svg`；建议使用品牌官方 SVG 或 [Simple Icons](https://simpleicons.org)。没有的话网站会显示名称首字母
- **requirements**: 三种语言的申请条件说明
- **type**: 必须是以下其中之一
  - `direct_activation` - 直接开通（无需申请）
  - `application_required` - 要申请
  - `high_bar` - 门槛高
- **category**: 数组，填文件上方 `categories` 里的 id（一个或多个）。需要新类别时，先在 `categories` 加一条三语名称，网站筛选会自动出现
  分类依照 [CNCF Cloud Native Landscape](https://landscape.cncf.io)：先在 CNCF Landscape 找这个产品（或同类工具）被放在哪一格，再选对应的 id。新类别要在 `categories` 加三语名称和 `cncf` 字段（照官方英文名称）
  - `container_registry` - 容器镜像仓库 (Provisioning › Container Registry)
  - `security_compliance` - 安全与合规 (Provisioning › Security & Compliance)
  - `key_management` - 密钥与机密管理 (Provisioning › Key Management)
  - `app_definition_image_build` - 应用定义与开发环境 (App Definition and Development › Application Definition & Image Build)
  - `ci_cd` - 持续集成与交付 (App Definition and Development › Continuous Integration & Delivery)
  - `observability` - 可观测性 (Observability and Analysis › Observability)
  - `ai_agent` - AI Agent (AI Agent)
- **link**: 申请／开通页面（必填），网站的「前往申请」按钮会链接到这里
- **lastVerified**: 最后验证日期，格式 YYYY-MM-DD（如 2026-11-18）
- **pending**（选填）：尚未确认的说明，需含 `zh-Hant` / `zh-Hans` / `en`；可选 `link` 指向官方来源

#### 3. 运行验证

```bash
node validate.js
npm run readme   # 更新 README 里的方案列表
```

确保所有字段都正确，且通过验证。

#### 4. 提交 Pull Request

```bash
git add public/data/programs.json
git commit -m "Add [方案名称]"
git push origin main
```

然后在 GitHub 上开启 Pull Request。

### 许可条款

提交贡献即表示您同意：

- **代码／网站／文档**贡献以 [MIT](./LICENSE) 授权
- **`public/data/programs.json` 数据**贡献以 [CC BY 4.0](./public/data/LICENSE) 授权

### 重要原则

- ✅ 每个条目必须包含**官方来源链接**
- ✅ 说明文字应**客观描述**方案本身的条款，不添加个人意见或推荐
- ✅ 简体中文必须使用**大陆用词**，而非仅做繁简转换
- ✅ 在提交前请访问官方页面**验证信息正确性**
- ✅ 将 `lastVerified` 设为您验证的日期
- ✅ 无法确认的条件请用选填 `pending` 标明，勿臆造

---

## English

### How to Add a Program

Thank you for contributing to OSS Perks! Here's how to add a new program:

#### 1. Fork and Clone the Project

```bash
git clone https://github.com/YOUR_USERNAME/opensource.git
cd opensource
```

#### 2. Edit `public/data/programs.json`

Add a new entry to the `programs` array. The `$schema` at the top of the file gives VS Code and other editors autocomplete and inline errors. Required fields:

```json
{
  "name": "Official Program Name",
  "logo": "/logos/program-slug.svg",
  "whatYouGet": {
    "zh-Hant": "繁體中文：說明這個方案提供什麼內容",
    "zh-Hans": "简体中文：说明这个方案提供什么内容",
    "en": "English: What this program offers"
  },
  "whyItHelps": {
    "zh-Hant": "繁體中文：一兩句話說明這個工具在做什麼、對開源專案有什麼幫助",
    "zh-Hans": "简体中文：一两句话说明这个工具在做什么、对开源项目有什么帮助",
    "en": "English: one or two sentences on what the tool does and how it helps"
  },
  "requirements": {
    "zh-Hant": "繁體中文：申請條件與門檻",
    "zh-Hans": "简体中文：申请条件与门槛",
    "en": "English: Requirements and eligibility criteria"
  },
  "type": "one of the allowed values",
  "category": ["at least one category"],
  "link": "https://official-source-link",
  "lastVerified": "YYYY-MM-DD",
  "pending": {
    "zh-Hant": "待確認",
    "zh-Hans": "待确认",
    "en": "To be confirmed",
    "link": "https://official-source-link"
  }
}
```

`pending` is **optional**: use it only when a requirement cannot yet be confirmed from an official source. The site shows a “To be confirmed” badge.

#### Field Descriptions

- **name**: Official name of the program (in English)
- **whatYouGet**: Description in three languages
  - **zh-Hant**: Traditional Chinese, using Taiwan terminology (程式碼, 軟體, 儲存庫, etc.)
  - **zh-Hans**: Simplified Chinese, using mainland China terminology (代码, 软件, 仓库, etc.)
  - **en**: English description
- **whyItHelps**: One or two sentences, in three languages, on what the tool does and how it helps an open source project (shown prominently on the card)
- **logo** (optional): path to an SVG in `public/logos/`, e.g. `/logos/sentry.svg`; use the official brand SVG or [Simple Icons](https://simpleicons.org). Without one the site shows the name's initial
- **requirements**: Requirements in three languages
- **type**: Must be one of the following
  - `direct_activation` - Direct Activation (no application needed)
  - `application_required` - Application Required
  - `high_bar` - High Bar
- **category**: Array of ids from the `categories` map at the top of the file (one or more). For a new category, add it to `categories` with three-language labels first; the site filter picks it up automatically
  Categories follow the [CNCF Cloud Native Landscape](https://landscape.cncf.io): find where the product (or a similar tool) sits in the landscape and pick the matching id. New categories need three-language labels plus a `cncf` field using the official English names
  - `container_registry` - Provisioning › Container Registry
  - `security_compliance` - Provisioning › Security & Compliance
  - `key_management` - Provisioning › Key Management
  - `app_definition_image_build` - App Definition and Development › Application Definition & Image Build
  - `ci_cd` - App Definition and Development › Continuous Integration & Delivery
  - `observability` - Observability and Analysis › Observability
  - `ai_agent` - AI Agent
- **link**: Official source link (required)
- **lastVerified**: Last verified date in YYYY-MM-DD format (e.g., 2026-11-18)
- **pending** (optional): Unconfirmed note with `zh-Hant` / `zh-Hans` / `en`; optional `link` to the official source

#### 3. Run Validation

```bash
node validate.js
npm run readme   # refresh the program tables in README
```

Ensure all fields are correct and pass validation.

#### 4. Submit a Pull Request

```bash
git add public/data/programs.json
git commit -m "Add [Program Name]"
git push origin main
```

Then open a Pull Request on GitHub.

### Licensing

By contributing, you agree that:

- **Code / site / documentation** contributions are licensed under [MIT](./LICENSE)
- **`public/data/programs.json` data** contributions are licensed under [CC BY 4.0](./public/data/LICENSE)

### Important Guidelines

- ✅ Every entry must include an **official source link**
- ✅ Descriptions should **objectively state** what the program offers, without personal opinions or recommendations
- ✅ Simplified Chinese must use **mainland China terminology**, not just character conversion
- ✅ Visit the official page to **verify accuracy** before submitting
- ✅ Set `lastVerified` to the date you verified the information
- ✅ Mark unconfirmed requirements with optional `pending`; do not invent details
