---
title: Single Sign-On (SSO)
source: https://casdoor.org/docs/session/single-sign-on
description: With multiple applications in one organization, enable single sign-on (SSO) so users sign in once and are automatically signed in for other apps.
---

# Single Sign-On (SSO)

## Overview

With multiple applications in one organization, enable **single sign-on (SSO)** so users sign in once and are automatically signed in for other apps in the same org.

## Configuration

1. Set **Home** to your application's home page or login URL
2. Enable **Auto Sign-In** on the application

## Silent sign-in

SSO works by opening your app's home URL with a query parameter. Your app must detect that and trigger login. The `SilentSignin` component from casdoor-react-sdk handles this.

**Flow:** The link to your home page includes `silentSignin=1`. On load, if `silentSignin === 1`, render the `SilentSignin` component so it starts the login; with auto sign-in enabled, the user is signed in without extra clicks.

## Popup sign-in

**Popup sign-in** opens a small window for Casdoor login; after success it posts the auth result to the opener and closes. Use `popupSignin()` from casdoor-js-sdk.

## Using SSO

Open the profile page and go to **Home**. The application list for the organization is shown there. Click on a tile to jump to that application's homepage with `?silentSignin=1`, which automatically logs in the user if SSO is configured.

## SSO Logout

When using SSO, you might need to log a user out from all applications simultaneously. Casdoor provides an SSO logout endpoint that terminates all active sessions and expires all tokens for a user.

Make a request to `/api/sso-logout` endpoint.
