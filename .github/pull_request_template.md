## Description | 描述

<!-- Briefly describe what this PR adds or changes -->
<!-- 简要描述此 PR 添加或修改的内容 -->

## Checklist for Adding a Program | 新增方案檢查清單

Please ensure all items are checked before submitting:

- [ ] I have verified the information on the **official source page**
- [ ] The `id` is a new lowercase slug (e.g. `sentry`) and the `name` field contains the official program name
- [ ] All three language fields (`zh-Hant`, `zh-Hans`, `en`) are filled in for `whatYouGet`, `whyItHelps` and `requirements`
- [ ] (Optional) Logo added to `public/logos/` and referenced in `logo`
- [ ] The program is a new file `data/programs/<id>.json` (file name = `id`); I did **not** commit `public/data/programs.json` (it is regenerated after merge)
- [ ] Simplified Chinese (`zh-Hans`) uses mainland China terminology (代码, 仓库, 服务器, 用户, etc.)
- [ ] The `type` field is one of: `direct_activation`, `application_required`, or `high_bar`
- [ ] The `category` follows the [CNCF Landscape](https://landscape.cncf.io) and uses an id from `data/categories.json` (e.g. `security_compliance`, `observability`, `ai_agent`)
- [ ] The `link` field contains a valid official URL
- [ ] The `lastVerified` field is in `YYYY-MM-DD` format with today's date
- [ ] I have run `node validate.js` and it passes
- [ ] The description is objective and factual (no personal opinions or recommendations)

---

请确保在提交前勾选所有项目：

- [ ] 我已在**官方來源頁面**驗證了資訊
- [ ] `id` 是新的小寫代號（例如 `sentry`），`name` 欄位包含官方方案名稱
- [ ] `whatYouGet`、`whyItHelps` 和 `requirements` 的三種語言欄位（`zh-Hant`、`zh-Hans`、`en`）都已填寫
- [ ] （選填）Logo 已放進 `public/logos/` 並填入 `logo` 欄位
- [ ] 方案是新檔案 `data/programs/<id>.json`（檔名等於 `id`）；**沒有**提交 `public/data/programs.json`（合併後會自動重新產生）
- [ ] 簡體中文（`zh-Hans`）使用大陸用詞（代码、仓库、服务器、用户 等）
- [ ] `type` 欄位是以下之一：`direct_activation`、`application_required` 或 `high_bar`
- [ ] `category` 依照 [CNCF Landscape](https://landscape.cncf.io) 分類，並使用 `data/categories.json` 裡的 id（例如 `security_compliance`、`observability`、`ai_agent`）
- [ ] `link` 欄位包含有效的官方 URL
- [ ] `lastVerified` 欄位為 `YYYY-MM-DD` 格式，日期為今天
- [ ] 我已執行 `node validate.js` 且通過驗證
- [ ] 描述客觀真實（無個人意見或推薦）
