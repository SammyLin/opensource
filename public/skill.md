---
name: oss-perks
description: Find free plans, credits and licenses that companies offer to open source projects, and check which ones the current repository qualifies for. Use when a maintainer asks what free tools, sponsorships or OSS programs their project can apply for.
---

# OSS Perks: what can this repository apply for?

OSS Perks (https://opensource.3mi.ai) lists free programs for open source projects and maintainers: CI/CD, testing, security scanning, monitoring, hosting, docs, translation, AI coding tools and more. Each program includes what you get, who qualifies, and an official link to apply.

Follow these steps inside the user's repository.

## 1. Get the program list

Fetch `https://opensource.3mi.ai/data/programs.json`. It has:

- `programs`: one entry per program, with
  - `name` and `link` (the official page)
  - `whatYouGet.en`, `whyItHelps.en` and `requirements.en`
  - `type`:
    - `direct_activation`: no application needed
    - `application_required`: you have to apply
    - `high_bar`: selective
  - `category`: ids from `categories`
  - `lastVerified` (YYYY-MM-DD)
  - `pending.en` (optional): terms that are not yet confirmed
- `categories`: category id → name (`en`)

Each program's page on the site is `https://opensource.3mi.ai/p/<id>/`.

## 2. Look at the repository

Collect the facts that most requirements depend on. Use the files, `git log` and the hosting platform (for example the GitHub API or `gh`) when available:

- license, and whether it is OSI-approved or permissive
- whether the repository is public, and where it is hosted
- project age, and recent commit and release activity
- stars, forks, downloads or dependents
- number of maintainers, and whether the user is a core maintainer
- whether the project is backed by a company, has revenue or has venture funding
- what the project uses or would use: CI, tests, docs site, translations, hosting, package or container registry, error monitoring, security scanning, secrets, AI coding tools

## 3. Match

For every program that fits the project's stack, compare the facts with `requirements.en` and put it in one group:

- **Likely eligible**: every requirement is met.
- **Possibly eligible**: name the facts that are missing or unclear.
- **Not eligible**: give the reason.

Treat anything in `pending` as unknown. Don't guess: if a requirement depends on something you can't find in the repository, ask the user or mark it as unknown.

## 4. Report

Show the likely and possibly eligible programs first. Order them direct activation → application required → high bar. For each one, give:

- the name, linked to its official `link`
- one line on what the project would get
- what the user needs to do next: just sign up, or apply, and with which details

End with a short list of programs that don't apply and why. Remind the user that terms change and that the official page is the final word (each entry shows its `lastVerified` date).

## Contributing

Know a program that isn't listed, or see one that's out of date? Each program is one file, `data/programs/<id>.json`, in https://github.com/SammyLin/opensource. Copy an existing file, edit it, and open a PR in English.
