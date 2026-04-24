---
title: Standard OIDC Client
source: https://casdoor.org/docs/how-to-connect/oidc-client
description: Casdoor is a full OIDC implementation. If your app already uses a standard OIDC client against another IdP, you can switch to Casdoor.
---

# Standard OIDC Client

## OIDC discovery

Casdoor is a full OIDC implementation. If your app already uses a standard OIDC client against another IdP, you can switch to Casdoor by pointing the client at Casdoor's discovery URL.

### Discovery endpoints

**OpenID Connect discovery:**

```
<your-casdoor-backend-host>/.well-known/openid-configuration
```

**OAuth 2.0 authorization server metadata (RFC 8414):**

```
<your-casdoor-backend-host>/.well-known/oauth-authorization-server
```

### Example response

```json
{
  "issuer": "https://door.casdoor.com",
  "authorization_endpoint": "https://door.casdoor.com/login/oauth/authorize",
  "token_endpoint": "https://door.casdoor.com/api/login/oauth/access_token",
  "userinfo_endpoint": "https://door.casdoor.com/api/userinfo",
  "jwks_uri": "https://door.casdoor.com/.well-known/jwks",
  "response_types_supported": ["code", "token", "id_token", "code token", "code id_token"],
  "grant_types_supported": ["authorization_code", "implicit", "password", "client_credentials", "refresh_token"],
  "code_challenge_methods_supported": ["S256"]
}
```

## Application-Specific OIDC Endpoints

Application-specific OIDC discovery endpoints are available:

```
<your-casdoor-backend-host>/.well-known/<application-name>/openid-configuration
<your-casdoor-backend-host>/.well-known/<application-name>/oauth-authorization-server
```

The main difference is that the `issuer` and `jwks_uri` fields contain the application path.

## OIDC UserInfo Fields

| Casdoor User Field | OIDC UserInfo Field |
|-------------------|---------------------|
| Id | sub |
| Name | preferred_username |
| DisplayName | name |
| Email | email |
| Avatar | picture |
| Location | address |
| Phone | phone |
