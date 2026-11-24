# CLAUDE.md

OSS Perks｜開源福利社（https://opensource.3mi.ai/）：收錄給開源專案／維護者的免費或優惠方案。純靜態網站，部署在 Cloudflare Pages（直接發佈 `public/`）。

欄位規格、分類規則、寫作原則以 `CONTRIBUTING.md` 為準。這份檔案只補充 agent 容易做錯的地方。

## 資料放在哪

- `data/programs/<id>.json`：一個方案一個檔案，**檔名必須等於 `id`**，開頭是 `"$schema": "../schemas/program.schema.json"`。新增方案時複製一個現有檔案再改。
- `data/categories.json`：類別 id → 三語名稱 + `cncf`（依 CNCF Landscape 官方英文名稱）。真的沒有合適類別才新增。
- `data/schemas/`：JSON schema。
- `public/logos/<id>.svg`：選填的 logo（Simple Icons 或官方 SVG）。
- `lib/data.js`：所有腳本都透過它讀 `data/`。

## 自動產生的檔案：PR 裡不要動

下面這些檔案會在合併到 `main` 後，由 `.github/workflows/build.yml` 重新產生並 commit：

- `public/data/programs.json`：網站讀取的合併檔，由 `scripts/bundle-data.js` 產生
- `public/**/index.html`、`public/og/`、`sitemap.xml`、`robots.txt`

PR 裡不要執行 `npm run data`、`npm run build`，也不要 commit 上述檔案。以前每個 PR 都重新產生這些檔案，同時開著的 PR 一定互相衝突。`validate.yml` 會擋下改到合併檔的 PR。README 刻意保持精簡，不放方案列表，新增方案不需要改 README。

只想在本機看結果的話，跑完用 `git checkout -- public && git clean -fd public` 還原。

新增方案的 PR 通常只該包含 `data/programs/*.json` 和 `public/logos/*.svg`，必要時加 `data/categories.json`。commit 前用 `git status` 確認。

## 檢查

- `node validate.js`：必須通過。它會檢查欄位、三語、類別 id、logo 檔案，以及檔名是否等於 `id`。
- 改到 `src/index.html`、`build.js` 或 `lib/` 時，加跑 `npm install --no-save --no-package-lock jsdom@31 && node build.js`，確認頁面還能產生，然後照上面的方式還原輸出。

## 撰寫方案的原則

- 每個方案都要親自打開官方頁面確認：提供什麼、申請條件、申請或開通連結。`link` 一定要指向官方來源。
- `whatYouGet`、`whyItHelps`、`requirements` 都要寫三語：
  - `zh-Hant`：台灣用詞（程式碼、軟體、儲存庫）
  - `zh-Hans`：大陸用詞（代码、软件、仓库），不是單純繁簡轉換
  - `en`
- 客觀描述條款，不加推薦語氣。
- `type` 依實際流程選擇：
  - `direct_activation`：不用申請
  - `application_required`：要申請
  - `high_bar`：有篩選、門檻高
- `lastVerified` 填驗證當天（台灣時間）。
- 官方頁面無法確認的條件寫進選填的 `pending`（三語＋`link`），不要臆造。
- `id` 會出現在網址 `/p/<id>/`，建立後不要改。

## 舊格式分支

還在改單一 `public/data/programs.json` 的分支，要先轉成新格式：

1. 執行 `node scripts/split-programs.js`，把方案拆成 `data/programs/*.json`。
2. 用 `git checkout origin/main -- public/data/programs.json README.md` 還原自動產生的檔案和 README。

## 本機預覽與 PR 截圖

- `npm install && npm run data && npm run build`，再用 `npx wrangler pages dev public --port 8788` 啟動本機站。
- PR 截圖：`npx playwright install chromium`（首次），然後 `npm run screenshots -- before pr-media/pr<N>`、`npm run screenshots -- after pr-media/pr<N>`（`take-screenshots.js`）。
- 看完照上面的方式還原 `public/`。

## Git / PR

- 不推 `main`、不 merge。一律開分支，再 PR 到 `main`。
- 分支有衝突時，把 main merge 進分支，不要 rebase 別人的分支。
