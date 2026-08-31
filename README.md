# Sudeepa Wanigarathna — Cybersecurity Blog & Research Lab

[![Deploy Jekyll site to Pages](https://github.com/CerberusMrXi/sudeepawanigarathna.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/CerberusMrXi/sudeepawanigarathna.github.io/actions/workflows/deploy.yml)

Personal cybersecurity research blog and technical knowledge base for **Sudeepa Wanigarathna**.

Website: [sudeepawanigarathna.github.io](https://sudeepawanigarathna.github.io/)

---

## Features

- **Jekyll 4.x Static Architecture**: Zero server runtime, ultra-fast loading, fully responsive dark terminal theme.
- **Markdown Workflow**: Simply add `.md` files to `_posts/` with front matter to publish new articles.
- **Client-side Search**: Instant search using `Lunr.js` across titles, categories, tags, and content.
- **Interactive Terminal**: Terminal widget and CLI mode on the homepage.
- **Code Block Enhancements**: Syntax highlighting via Rouge and one-click code copy buttons.
- **Automated Deployment**: GitHub Actions workflow for building and deploying directly to GitHub Pages.

---

## Local Development

### Prerequisites

- Ruby 3.1+
- Bundler (`gem install bundler`)

### Steps

```bash
# 1. Clone repository
git clone https://github.com/CerberusMrXi/sudeepawanigarathna.github.io.git
cd sudeepawanigarathna.github.io

# 2. Install dependencies
bundle install

# 3. Start local development server
bundle exec jekyll serve --livereload
```

Open `http://localhost:4000` in your browser.

---

## Publishing a New Writeup

Create a file in `_posts/` named `YYYY-MM-DD-title.md`:

```yaml
---
layout: post
title: "HTB: Example Machine"
date: 2026-09-01
categories: [HTB, Web]
tags: [Linux, Enumeration, RCE]
platform: HTB
difficulty: Medium
os: Linux
description: "Walkthrough of HTB Machine covering RCE and privilege escalation."
---

Write your Markdown article content here...
```

Push to `main` branch to trigger automatic GitHub Pages deployment.
