---
title: Single Sign-Out (SSO Logout)
source: https://casdoor.org/docs/session/single-sign-out
description: Single sign-out (SSO logout) logs a user out from every application in the organization with notifications and API support.
---

# Single sign-out (SSO logout)

## Overview[​](#overview "Direct link to Overview")

**Single sign-out (SSO logout)** logs a user out from every application in the organization in one go. When they sign out from one app, all other apps in the same SSO setup are signed out as well.

Use it for:

-   **Security incidents**: Immediately terminate all active sessions when a security breach is detected
-   **Organization-wide logout policies**: Enforce logout across all services when users leave the organization or change roles
-   **Compliance requirements**: Ensure users are completely logged out from all systems when required by regulations
-   **User-initiated logout**: Allow users to log out from all applications with a single action

## How it works[​](#how-it-works "Direct link to How it works")

The `logoutAll` parameter chooses the mode:

**Full SSO logout** (default, `logoutAll=true` or omitted):

1.  **Delete all active sessions**: All active sessions for the user across all applications in the organization are terminated
2.  **Expire all access tokens**: All access tokens that were issued to the user are immediately invalidated
3.  **Clear the current session**: The user's current session and authentication state are cleared
4.  **Send logout notifications**: Notification providers receive the logout event with all session IDs and token hashes

**Session-only logout** (`logoutAll=false`):

1.  **Delete current session**: Only the current session is terminated
2.  **Clear current authentication state**: The user's current session and token are cleared
3.  **Send targeted notification**: Notification providers receive the logout event with the current session ID and associated access token hashes

### Logout notifications[​](#logout-notifications "Direct link to Logout notifications")

On SSO logout, Casdoor sends a request to each notification provider configured for the application the user signed up with. The notifications include session IDs, access token hashes, and cryptographic signatures for secure, synchronized logout across all integrated systems.

## SSO Logout API[​](#sso-logout-api "Direct link to SSO Logout API")

### Endpoint[​](#endpoint "Direct link to Endpoint")

```
GET or POST /api/sso-logout?logoutAll=<true|false>
```

### Parameters[​](#parameters "Direct link to Parameters")

-   `logoutAll` (optional): Controls logout scope. Accepts `true`, `1`, or empty string (default: `true`)
    -   `true` or `1` or empty: Logout from all sessions across all applications
    -   Any other value (e.g., `false`, `0`): Logout from current session only

### Authentication[​](#authentication "Direct link to Authentication")

This endpoint requires the user to be authenticated. Use any authentication method supported by Casdoor:

-   **Access token**: Include the access token in the `Authorization` header
-   **Session cookie**: Use the session cookie that was set during login
-   **Client credentials**: Use the application's client ID and secret for machine-to-machine scenarios

### Request Examples[​](#request-examples "Direct link to Request Examples")

#### Logout from All Sessions (Default)[​](#logout-from-all-sessions-default "Direct link to Logout from All Sessions (Default)")

```
curl -X POST https://door.casdoor.com/api/sso-logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

#### Logout from Current Session Only[​](#logout-from-current-session-only "Direct link to Logout from Current Session Only")

```
curl -X POST "https://door.casdoor.com/api/sso-logout?logoutAll=false" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Response[​](#response "Direct link to Response")

```
{
  "status": "ok",
  "msg": "",
  "data": ""
}
```

## Security Considerations[​](#security-considerations "Direct link to Security Considerations")

1.  **Verify Logout Notification Signatures**: Always verify the HMAC-SHA256 signature of logout notifications
2.  **Check Notification Timestamp**: Implement timestamp validation to prevent replay attacks
3.  **Secure Communication**: Always use HTTPS when calling the SSO logout endpoint
4.  **Protect Client Secrets**: Keep your application's client secret secure

## Related Documentation[​](#related-documentation "Direct link to Related Documentation")

-   [Single Sign-On (SSO)](/docs/session/single-sign-on): Learn how to enable SSO for your applications
-   [Casdoor Public API](/docs/basic/public-api): Complete API reference including authentication methods
-   [Tokens](/docs/token/overview): Understand how Casdoor manages access tokens and sessions
