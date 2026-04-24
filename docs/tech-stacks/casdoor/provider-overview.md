---
title: Provider Overview
source: https://casdoor.org/docs/provider/overview
description: Providers in Casdoor are connectors to third-party services including OAuth, SMS, Email, Storage, Payment, Captcha, and more.
---

# Provider Overview

**Providers** in Casdoor are connectors to third-party services.

## Provider types

| Type | Purpose |
|------|---------|
| **OAuth** | Sign-in via external identity providers (e.g. GitHub, Google, QQ) |
| **SMS** | Send SMS verification codes |
| **Email** | Send email (verification codes, notifications) |
| **Storage** | Store files on local filesystem or cloud storage (S3, OSS) |
| **Payment** | Accept payments (Alipay, WeChat Pay, PayPal) |
| **Captcha** | Protect sign-in/sign-up with captcha |
| **Identity verification** | Verify user identity via third-party services |
| **MFA** | Second-factor authentication (e.g. RADIUS) |
| **Log** | Forward permission audit events to external logging |

## Scope and permissions

- **Global administrators**: Users in `built-in` organization. Providers they create can be used by **all** applications.
- **Organization administrators**: Users with `IsAdmin` enabled. Providers they create can be used **only** by applications in the same organization.

## Adding a provider to an application

1. Open the application edit page and add a new provider row
2. Choose the provider to attach
3. For **OAuth** and **Captcha** providers, further configure how they are used
4. **Save** the application
