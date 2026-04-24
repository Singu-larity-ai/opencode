---
title: Public API
source: https://casdoor.org/docs/basic/public-api
description: The Casdoor Public API allows programmatic access to all Casdoor functionality. Anything the UI does can be done via HTTP.
---

# Public API

The Casdoor web UI is a React SPA that talks to the same REST API as your code. That API is the **Casdoor Public API**: anything the UI does can be done via HTTP.

**API reference:** [https://door.casdoor.com/swagger](https://door.casdoor.com/swagger)

## Response language

Responses can be localized. Send the `Accept-Language` header to get error messages in that language.

## Machine-to-machine (M2M) authentication

M2M authentication is for services or scripts that call the API **without a user present**. Use it for:

- Backend services calling Casdoor programmatically
- CLI tools using access tokens
- B2B: per-organization apps with their own client credentials

Casdoor supports M2M via:
1. **Client Credentials Grant (OAuth 2.0)** — Recommended
2. **Client ID + Client Secret on each request**

## How to authenticate

### 1. Access token (user context)

Use the access token obtained after a user signs in. API calls run with that user's permissions.

Send the token:
- Query parameter: `/page?access_token=<token>`
- Bearer header: `Authorization: Bearer <token>`

### 2. Client ID and Client Secret (M2M)

Use for machine-to-machine calls (no user). Permissions are those of the application.

Send credentials:
- Query parameters: `/page?clientId=<clientId>&clientSecret=<clientSecret>`
- HTTP Basic Auth header

### 3. Access key and Access secret

API authentication via **access key / access secret** pairs managed through the Keys page.

### 4. Username and password

**Not recommended.** Credentials sent as query parameters may be logged.

## SSO logout

The `/api/sso-logout` endpoint logs a user out from all applications or only the current session.

```
GET or POST /api/sso-logout?logoutAll=<true|false>
```

## CORS

Casdoor sets CORS headers so browsers can call the API from your frontend. Allowed origins include your application's Redirect URIs and the Casdoor server hostname.
