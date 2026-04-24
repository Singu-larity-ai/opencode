---
title: OAuth 2.0
source: https://casdoor.org/docs/how-to-connect/oauth
description: Casdoor issues access tokens for authenticating clients. This page describes how to get a token via the API, verify it, and use it.
---

# OAuth 2.0

Casdoor issues **access tokens** for authenticating clients.

**Supported grant types:**

| Grant Type | RFC | Use Case |
|------------|-----|----------|
| Authorization Code | RFC 6749 §4.1 | Default; web/mobile apps with a backend |
| Implicit | RFC 6749 §4.2 | Frontend-only apps without a backend |
| Resource Owner Password | RFC 6749 §4.3 | Apps with no frontend redirect |
| Client Credentials | RFC 6749 §4.4 | Service-to-service calls with no user |
| Refresh Token | RFC 6749 §6 | Renew access token without re-auth |
| Device Authorization | RFC 8628 | Devices with limited input |
| Token Exchange | RFC 8693 | Swap token for different scope/audience |
| JWT Bearer | RFC 7523 | Service auth using signed JWT assertion |

## Authorization code grant

Redirect the user to:

```
https://<CASDOOR_HOST>/login/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=code&scope=openid&state=STATE
```

### Scopes

| Scope | Description |
|-------|-------------|
| openid (default) | `sub`, `iss`, `aud` |
| profile | name, displayName, avatar |
| email | email address |
| address | address |
| phone | phone number |

Exchange code for tokens:

```
POST https://<CASDOOR_HOST>/api/login/oauth/access_token
{
    "grant_type": "authorization_code",
    "client_id": ClientId,
    "client_secret": ClientSecret,
    "code": Code
}
```

## Client Credentials Grant

For service-to-service calls:

```
POST https://<CASDOOR_HOST>/api/login/oauth/access_token
{
    "grant_type": "client_credentials",
    "client_id": ClientId,
    "client_secret": ClientSecret
}
```

## Token Exchange Grant

Swap an existing token for one with different scope:

```
POST https://<CASDOOR_HOST>/api/login/oauth/access_token
{
    "grant_type": "urn:ietf:params:oauth:grant-type:token-exchange",
    "client_id": ClientId,
    "client_secret": ClientSecret,
    "subject_token": SubjectToken,
    "subject_token_type": "urn:ietf:params:oauth:token-type:access_token",
    "scope": "openid email"
}
```

## JWT Bearer Grant

Obtain access token using signed JWT assertion instead of client secret:

```
POST https://<CASDOOR_HOST>/api/login/oauth/access_token
{
    "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    "client_assertion": "<signed-JWT>",
    "client_id": "CLIENT_ID"
}
```

## How to Verify Access Token

Casdoor supports token introspection endpoint:

```
POST /api/login/oauth/introspect
Authorization: Basic <base64(client_id:client_secret)>
token=ACCESS_TOKEN
```

## How to Use AccessToken

- Query parameter: `/page?access_token=<token>`
- Bearer header: `Authorization: Bearer <token>`
