---
title: LDAP Overview
source: https://casdoor.org/docs/ldap/overview
description: Casdoor can sync users from an LDAP server into Casdoor and use the LDAP server to authenticate them.
---

# LDAP Overview

## How Casdoor works with LDAP

1. **Sync:** Casdoor connects to the LDAP server and reads user attributes. It creates corresponding Casdoor accounts and stores them in the database.

2. **Authentication:** Casdoor does not store or sync LDAP passwords. When a synced user signs in, Casdoor checks the password against the LDAP server.

3. **Identity:** Casdoor uses `uid` as the unique user identifier.

After sync, Casdoor user records are independent: changes in Casdoor do not update LDAP, and changes in LDAP (except password) do not automatically update the Casdoor user. Password checks always go to LDAP.

## Supported attributes

Casdoor reads these LDAP attributes:
- `uidNumber`
- `uid`
- `cn`
- `gidNumber`
- `mail`
- `email`
- `telephoneNumber`
- `mobile`
- `registeredAddress`
- `postalAddress`
