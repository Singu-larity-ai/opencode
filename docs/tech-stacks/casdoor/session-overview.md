---
title: Session Overview
source: https://casdoor.org/docs/session/overview
description: Casdoor manages authentication through sessions, which represent active login states across applications.
---

# Session Overview

## What is a session?

A session represents an authenticated user state. When a user signs in to an application, Casdoor creates a session record that includes:

- **Session ID**: A unique identifier for each login instance
- **User information**: The authenticated user's identity
- **Application context**: Which application the user logged into
- **Creation time**: When the session was established
- **Expiration**: When the session will automatically terminate

## Session lifecycle

**Creation**: When a user authenticates successfully, Casdoor creates a new session.

**Active**: While active, the session grants access without re-authenticating.

**Expiration**: Sessions expire after a configurable period of inactivity.

**Termination**: Sessions can be ended by logout. When terminated, all associated session IDs are invalidated immediately.

## Multi-session support

Casdoor supports multiple concurrent sessions per user. This is useful when:

- Users access applications from multiple devices
- Users maintain separate sessions in different browsers
- Backend services need to manage sessions for different instances

Each session is tracked separately with its own session ID, allowing users to selectively terminate specific sessions.

## Session storage

Session data is stored in Casdoor's database and is associated with:

- The user who created the session
- The application through which they authenticated
- The organization context

## Related topics

- [Session management](/docs/session/management)
- [Single sign-on](/docs/session/single-sign-on)
- [Single sign-out](/docs/session/single-sign-out)
- [Tokens](/docs/token/overview)
