---
title: Token Overview
source: https://casdoor.org/docs/token/overview
description: Casdoor is built on OAuth and uses tokens for user authentication and authorization. In Casdoor, access_token and id_token are the same.
---

# Token Overview

## Access token and ID token

In Casdoor, **`access_token` and `id_token` are the same**. Both contain the same JWT payload (user info and claims). This design keeps token handling simple.

## Token fields

Casdoor tokens include:

- `Owner`
- `Name`
- `CreatedTime`
- `Application`
- `Organization`
- `User`
- `Code`
- `AccessToken`
- `ExpireIn`
- `Scope`
- `TokenType`

## Token lifecycle and invalidation

When a user signs in, Casdoor issues an access token and a refresh token. On SSO logout, Casdoor invalidates tokens by setting `ExpiresIn` to 0 or negative value.

## Token format options

When issuing JWTs, choose among four formats:

- **JWT**: includes all User fields
- **JWT-Empty**: includes only non-empty User fields
- **JWT-Custom**: includes custom User Token fields you select
- **JWT-Standard**: includes standard OIDC claims in OIDC-compliant format

## OIDC Address Claim

The `address` claim is formatted differently based on token format:

- **JWT-Standard**: Returns proper OIDC address object
- **JWT/JWT-Empty/JWT-Custom**: Returns raw array of strings

## Custom Token Attributes

With JWT-Custom format, define custom attributes with types:

- **Array**: Returns attribute as array
- **String**: Returns attribute as single string
