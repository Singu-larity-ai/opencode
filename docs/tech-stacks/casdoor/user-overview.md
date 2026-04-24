---
title: User Overview
source: https://casdoor.org/docs/user/overview
description: Casdoor manages user accounts with properties like Owner, Name, Email, Phone, Avatar, and more.
---

# User Overview

## User properties

Casdoor manages user accounts. Each user has the following properties:

- `Owner`: The organization that owns the user
- `Name`: The unique username for the user
- `CreatedTime`: Timestamp when the user account was created
- `Id`: Unique identifier (UUID) for each user
- `Type`: The type of user account (e.g., normal-user, guest-user)
- `Password`: The user's encrypted password
- `DisplayName`: The user's display name
- `Avatar`: URL to the user's avatar image
- `Email`: The user's email address
- `Phone`: The user's phone number
- `Location`: The user's geographical location
- `Affiliation`: The user's organization or institutional affiliation
- `Title`: The user's professional title
- `IsAdmin`: Whether the user is an administrator of their organization
- `IsGlobalAdmin`: Whether the user has permission to manage Casdoor
- `IsForbidden`: Whether the user account has been banned
- `IsDeleted`: Soft-deleted users cannot sign in
- `Roles`: An array of the user's roles
- `Permissions`: An array of the user's permissions

## Identity verification

Casdoor supports identity verification via ID Verification providers. When a user completes identity verification, `IsVerified` is set to `true` and verified fields become read-only.

## Email normalization

Casdoor normalizes all email addresses to lowercase for uniqueness, complying with RFC 5321 standards.

## Roles and permissions (extended fields)

The `Roles` and `Permissions` fields on the User object are **extended**: they are filled when user data is fetched, not stored on the User table.

## Importing users from XLSX

Add or update users by uploading an XLSX file. On the **Users** page:

- **Download template**: Generates an XLSX template with all available user fields
- **Upload (.xlsx)**: Opens the upload dialog to import users

## Organization admin privileges

Users with `IsAdmin` enabled are administrators of their organization:

- Full access to manage users, applications, and resources within their organization
- Ability to configure organization-level settings and policies
