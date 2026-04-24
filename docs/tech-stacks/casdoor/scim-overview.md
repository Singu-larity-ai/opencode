---
title: SCIM Overview
source: https://casdoor.org/docs/scim/overview
description: SCIM is an HTTP-based standard for provisioning and managing identity data. Casdoor can act as a SCIM service provider.
---

# SCIM Overview

[SCIM](https://datatracker.ietf.org/doc/html/rfc7644) is an HTTP-based standard for provisioning and managing identity data. Casdoor can act as a **SCIM service provider** so external systems can create, read, update, and delete users via SCIM.

## Supported resources

Casdoor currently supports the **User** resource only.

### Endpoints

| Endpoint | Method | Description |
|---------|--------|-------------|
| `/scim/ServiceProviderConfig` | GET | Supported SCIM features |
| `/scim/Schemas` | GET | Service provider schemas |
| `/scim/ResourceTypes` | GET | Resource type metadata |
| `/scim/Users/:id` | GET | Get user by id |
| `/scim/Users` | GET | List users |
| `/scim/Users` | POST | Create user |
| `/scim/Users/:id` | PUT | Replace user |
| `/scim/Users/:id` | PATCH | Partial update |
| `/scim/Users/:id` | DELETE | Delete user |

## User attribute mapping

| SCIM User | Casdoor User |
|-----------|-------------|
| id | Id |
| meta.created | CreatedTime |
| userName | Name |
| password | Password |
| displayName | DisplayName |
| emails[0].value | Email |
| phoneNumbers[0].value | Phone |
| photos[0].value | Avatar |
| addresses[0].locality | Location |
| name.givenName | FirstName |
| name.familyName | LastName |

The `organization` attribute should be passed in the Enterprise User Schema Extension (`urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`).
