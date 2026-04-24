---
title: WebAuthn
source: https://casdoor.org/docs/how-to-connect/webauthn
description: WebAuthn support in Casdoor for passwordless authentication using security keys, fingerprint, face, or Windows Hello.
---

# WebAuthn

Casdoor supports **WebAuthn** so users can sign in with built-in authenticators (fingerprint, face, Windows Hello) or security keys (e.g. YubiKey) instead of (or in addition to) a password.

## What is WebAuthn?[​](#what-is-webauthn "Direct link to What is WebAuthn?")

WebAuthn (Web Authentication API) is a W3C/FIDO standard that uses public-key cryptography for registration and sign-in. The server stores a public key; the private key stays on the user's device. Sign-in works by proving possession of the private key (e.g. via biometrics or a security key). Credentials are bound to the user, the authenticator, and the site origin.

For more detail: [webauthn.guide](https://webauthn.guide/).

## Enable WebAuthn in Casdoor[​](#enable-webauthn-in-casdoor "Direct link to Enable WebAuthn in Casdoor")

### Step 0: Configuration[​](#step-0-configuration "Direct link to Step 0: Configuration")

1.  In `conf/app.conf`, set **origin** to the exact URL of your Casdoor site:

    ```
    origin = "http://localhost:8000"
    ```

    > WebAuthn requires **HTTPS** in production; `localhost` is allowed for development.

2.  As an admin, open the application edit page and turn on **Enable WebAuthn signin** (off by default).

### Step 1: Register a credential[​](#step-1-register-a-credential "Direct link to Step 1: Register a credential")

Go to **My Account**. Use **Add WebAuthn Credential** and follow your device's prompt to register a new credential. You can delete credentials from the list.

### Step 2: Sign in with WebAuthn[​](#step-2-sign-in-with-webauthn "Direct link to Step 2: Sign in with WebAuthn")

Sign out, then on the login page select the WebAuthn method, enter your username, and click sign in. Complete the authenticator step (e.g. fingerprint or Windows Hello).
