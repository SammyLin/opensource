## Description

<!-- Briefly describe what this PR adds or changes. Please write the PR in English. -->

## Checklist for adding a program

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

