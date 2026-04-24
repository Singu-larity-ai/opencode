---
title: MFA / 2FA
source: https://casdoor.org/docs/user/multi-factor-authentication
description: Multi-factor authentication in Casdoor supporting TOTP authenticator apps, SMS, email, and RADIUS as second factors.
---

# MFA / 2FA

## About multi-factor authentication[​](#about-multi-factor-authentication "Direct link to About multi-factor authentication")

MFA (Multi-Factor Authentication) is a security measure that can enhance the security of users and systems. It requires users to provide two or more factors of authentication to verify their identity when logging in or performing sensitive operations.

Casdoor supports multiple second-factor authentication methods including SMS codes, email codes, TOTP authenticator apps, and RADIUS authentication.

Once you enable MFA, Casdoor requires an authentication code every time someone attempts to sign in to your account. The only way someone can sign in to your account is if they know both your password and have access to the authentication code.

## Configuring MFA[​](#configuring-mfa "Direct link to Configuring MFA")

1.  On the user profile page, open the multi-factor authentication section. If it is missing, ensure the organization has added the MFA item in the account items table.

2.  Click the "setup" button.

3.  Type your password and click "Next Step".

### Configuring multi-factor authentication using a TOTP mobile app[​](#configuring-multi-factor-authentication-using-a-totp-mobile-app "Direct link to Configuring multi-factor authentication using a TOTP mobile app")

A time-based one-time password (TOTP) application automatically generates an authentication code that changes after a certain period of time. We recommend using:

-   [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US&gl=US)
-   [Microsoft Authenticator](https://play.google.com/store/apps/details?id=com.azure.authenticator&hl=en_US&gl=US).

1.  In the "Verify Code" step, do one of the following:

    -   Scan the QR code with your mobile device's app. After scanning, the app displays a six-digit code that you can enter on Casdoor.
    -   If the QR code cannot be scanned, copy the secret and enter it manually in the TOTP app.
2.  The TOTP mobile application saves your account on Casdoor and generates a new authentication code every few seconds. On Casdoor, type the code into the "Passcode" field and click "Next Step".

3.  Above the "Enable" button, copy your recovery codes and save them to your device. Save them to a secure location because your recovery codes can help you regain access to your account if you lose access.

### Configuring multi-factor authentication using text messages[​](#configuring-multi-factor-authentication-using-text-messages "Direct link to Configuring multi-factor authentication using text messages")

If you have added your mobile phone number, Casdoor will use it to send you a text message.

If you have not added your mobile phone number, add it in your account first.

1.  Select your country code and enter your mobile phone number.

2.  Check if your information is correct and click "Send Code".

3.  Enter the security code from the text message in **Enter your code** and click **Next Step**.

4.  Above the "Enable" button, copy your recovery codes and save them to your device. Save them to a secure location because your recovery codes can help you regain access to your account if you lose access.

### Configuring multi-factor authentication using email[​](#configuring-multi-factor-authentication-using-email "Direct link to Configuring multi-factor authentication using email")

Configuring email as your multi-factor authentication method is similar to using text messages.

1.  Use your current email or enter your email address and click "Send Code".

2.  Then enter the code into the "Enter your code" field and click "Next Step".

3.  Above the "Enable" button, copy your recovery codes and save them to your device. Save them to a secure location because your recovery codes can help you regain access to your account if you lose access.

### Configuring multi-factor authentication using RADIUS[​](#configuring-multi-factor-authentication-using-radius "Direct link to Configuring multi-factor authentication using RADIUS")

RADIUS MFA allows you to authenticate against an external RADIUS server for the second authentication factor. This is useful when integrating with existing authentication infrastructure.

Before using RADIUS MFA, your administrator must configure a RADIUS provider in the application. Once configured:

1.  Enter your RADIUS username when prompted during setup.

2.  Enter your RADIUS password to verify the setup. This password will be verified against the configured RADIUS server. During subsequent logins, you'll enter this same RADIUS password as your second factor.

3.  Above the "Enable" button, copy your recovery codes and save them to your device. Save them to a secure location because your recovery codes can help you regain access to your account if you lose access.

## Changing your preferred MFA method[​](#changing-your-preferred-mfa-method "Direct link to Changing your preferred MFA method")

Multiple MFA methods can be added; only the preferred one is used at sign-in.

If you want to set a preferred MFA method, click the "Set preferred" button.

A "Preferred" label will be displayed on your preferred method.

## Disabling multi-factor authentication[​](#disabling-multi-factor-authentication "Direct link to Disabling multi-factor authentication")

If you want to disable multi-factor authentication, click the "Disable" button. All your multi-factor authentication settings will be deleted.
