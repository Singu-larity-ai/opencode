---
title: Casdoor Documentation Index
source: https://casdoor.org/docs
description: Comprehensive index of Casdoor documentation - a UI-first Identity Access Management (IAM) / Single-Sign-On (SSO) platform.
---

# Casdoor Documentation

[Casdoor](https://casdoor.org) is a UI-first Identity Access Management (IAM) / Single-Sign-On (SSO) platform with support for OAuth 2.0, OIDC, SAML, CAS, LDAP, SCIM, WebAuthn, TOTP, MFA, RADIUS, and more.

## Overview

- [Overview](index.md) - Introduction to Casdoor, features, architecture, and how it works

## The Basics

- [Core Concepts](basic-core-concepts.md) - Organization, User, Application, and Provider
- [Server Installation](basic-server-installation.md) - Requirements, download, configuration, and running Casdoor
- [Configuration](basic-configuration.md) - Backend and frontend configuration
- [Try with Docker](basic-try-with-docker.md) - Run Casdoor using Docker containers
- [Try with Helm](basic-try-with-helm.md) - Deploy Casdoor on Kubernetes
- [Public API](basic-public-api.md) - Programmatic access to all Casdoor functionality
- [Tutorials](basic-tutorials.md) - Integration guides and articles

## Connecting Applications

- [Casdoor SDKs](how-to-connect-sdk.md) - SDKs for frontend and backend in multiple languages
- [Single Sign-On (SSO)](session-single-sign-on.md) - Enable SSO across applications
- [Single Sign-Out (SSO Logout)](session-single-sign-out.md) - Logout from all applications at once
- [OAuth 2.0](how-to-connect-oauth.md) - Get and verify access tokens
- [Standard OIDC Client](how-to-connect-oidc-client.md) - Use Casdoor with standard OIDC clients
- [WebAuthn](how-to-connect-webauthn.md) - Passwordless authentication with security keys

## Core Concepts

- [Application Overview](application-overview.md) - Protected services as Applications
- [Organization Overview](organization-overview.md) - Primary unit for managing users and applications
- [Permission Overview](permission-overview.md) - Casbin-powered access control
- [Provider Overview](provider-overview.md) - Connectors to third-party services
- [OAuth Provider Overview](provider-oauth-overview.md) - 50+ OAuth providers (Google, GitHub, etc.)
- [User Overview](user-overview.md) - User account management
- [Session Overview](session-overview.md) - Authentication session management
- [Token Overview](token-overview.md) - Access tokens and ID tokens

## Deployment

- [Deploying with Docker](deployment-docker.md) - Docker and Docker Compose deployment
- [Deploying behind Nginx](deployment-nginx.md) - Nginx reverse proxy configuration
- [Deploying to Kubernetes](deployment-k8s.md) - Kubernetes deployment with Ingress

## Advanced Features

- [MCP Auth Overview](mcp-auth-overview.md) - Casdoor as MCP Auth Provider
- [Multi-Factor Authentication](user-multi-factor-authentication.md) - MFA/2FA with TOTP, SMS, email, RADIUS
- [LDAP Overview](ldap-overview.md) - Sync users from LDAP servers
- [SCIM Overview](scim-overview.md) - SCIM service provider
- [Webhooks Overview](webhooks-overview.md) - Event notifications via HTTP

---

*All documentation sourced from [casdoor.org/docs](https://casdoor.org/docs)*
