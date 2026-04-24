---
title: Casdoor as MCP Auth Provider
source: https://casdoor.org/docs/mcp-auth/overview
description: Casdoor provides all the OAuth 2.1 infrastructure your MCP server needs. Point your server's Protected Resource Metadata to Casdoor, and it handles user authentication, consent, token issuance, and validation.
---

# Casdoor as MCP Auth Provider

The Model Context Protocol (MCP) specification requires servers to implement OAuth 2.1 for secure authentication. **Casdoor solves this problem.** As a full-featured, open-source identity platform, Casdoor provides all the OAuth 2.1 infrastructure your MCP server needs.

## Why use Casdoor for MCP auth?

Building a compliant authorization server from scratch—with Dynamic Client Registration, PKCE, consent screens, JWKS endpoints, and token issuance—is a significant engineering burden. Casdoor provides it out of the box.

## What Casdoor Provides

### Standards Compliance

- RFC 8414: OAuth 2.0 Authorization Server Metadata
- OIDC Discovery
- RFC 7591: Dynamic Client Registration (DCR)
- RFC 7636: PKCE support
- RFC 8707: Resource Indicators
- RFC 7517: JWKS endpoint for token validation

### Built-in Features

- User authentication (Password, SSO, MFA, WebAuthn, Face ID)
- User management (Organizations, roles, permissions)
- Consent screens
- Token management (JWT issuance, refresh tokens)
- Custom scopes per application
- Multi-tenancy
- Audit logs

## What Your MCP Server Needs to Do

1. Serve Protected Resource Metadata at `/.well-known/oauth-protected-resource`
2. Return 401 challenges with `WWW-Authenticate: Bearer` headers
3. Validate JWT tokens using Casdoor's JWKS endpoint
4. Check audience matches your server's resource URI
5. Enforce scopes for each tool

## Comparison

| Feature | Casdoor | Auth0 | Keycloak |
|---------|---------|-------|----------|
| Open Source | Apache 2.0 | Proprietary | Apache 2.0 |
| Self-Hosted | Full control | Cloud only | Full control |
| DCR | RFC 7591 | RFC 7591 | RFC 7591 |
| Resource Indicators | RFC 8707 | RFC 8707 | Limited |
| MCP-Specific Docs | Dedicated | Generic | None |

## Getting Started

1. [Deploy Casdoor](/docs/basic/server-installation) or use [Casdoor Cloud](https://door.casdoor.com)
2. [Configure your application](/docs/mcp-auth/setup) in Casdoor with MCP category
3. [Integrate your MCP server](/docs/mcp-auth/third-party-integration)

## Next Steps

- [Auth Provider Setup](/docs/mcp-auth/setup)
- [Integration Examples](/docs/mcp-auth/third-party-integration)
- [Dynamic Client Registration](/docs/application/dynamic-client-registration)
