---
title: Core Concepts
source: https://casdoor.org/docs/basic/core-concepts
description: Casdoor is built around four core concepts: Organization, User, Application, and Provider. Understanding these will help you configure and operate Casdoor effectively.
---

# Core Concepts

Casdoor is built around four core concepts: **Organization**, **User**, **Application**, and **Provider**. Understanding these will help you configure and operate Casdoor effectively.

## Organization

An **organization** is a container for users and applications—for example, a company's employees or a product's customers.

## User

A **user** can sign in to applications. Each user belongs to exactly one organization but can sign in to any application in that organization. Casdoor has two user types:

- **Built-in users** (e.g. `built-in/admin`): Global administrators with full control over the Casdoor instance.
- **Organization users** (e.g. `my-company/alice`): Regular users who can sign up, sign in, sign out, and manage their own profile.

## Application

An **application** is a web service that uses Casdoor for authentication—for example, a forum, an internal OA system, or a CRM.

## Provider

Casdoor acts as a federated SSO platform: it supports multiple identity providers (OIDC, OAuth, SAML) and can send verification codes and notifications via email or SMS. All such integrations are represented as **providers**.

## How Casdoor manages itself

On first run, Casdoor creates default objects:

- **Organization:** `built-in`
- **User:** `admin` in `built-in`
- **Application:** `app-built-in` (the Casdoor UI), owned by `built-in`

All users in the `built-in` organization (including `admin`) have full admin rights.
