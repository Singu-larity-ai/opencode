---
title: Casdoor SDKs
source: https://casdoor.org/docs/how-to-connect/sdk
description: Casdoor SDKs extend standard OIDC with user management, resource uploads, and other features. Available for frontend and backend in multiple languages.
---

# Casdoor SDKs

## Overview

Casdoor SDKs extend standard OIDC with user management, resource uploads, and other features.

**Frontend SDKs** — For web (JavaScript, React, Vue, etc.) and mobile (Android, iOS, React Native, Flutter).

**Backend SDKs** — For Go, Java, Node.js, Python, PHP, .NET, Rust, C++, and more.

## Mobile SDKs

| SDK | Description | SDK code | Example code |
|----|-------------|----------|-------------|
| Android SDK | For Android apps | [casdoor-android-sdk](https://github.com/casdoor/casdoor-android-sdk) | [casdoor-android-example](https://github.com/casdoor/casdoor-android-example) |
| iOS SDK | For iOS apps | [casdoor-ios-sdk](https://github.com/casdoor/casdoor-ios-sdk) | [casdoor-ios-example](https://github.com/casdoor/casdoor-ios-example) |
| React Native SDK | For React Native apps | [casdoor-react-native-sdk](https://github.com/casdoor/casdoor-react-native-sdk) | [casdoor-react-native-example](https://github.com/casdoor/casdoor-react-native-example) |
| Flutter SDK | For Flutter apps | [casdoor-flutter-sdk](https://github.com/casdoor/casdoor-flutter-sdk) | [casdoor-flutter-example](https://github.com/casdoor/casdoor-flutter-example) |

## Web frontend SDKs

| SDK | Description | SDK code | Example code |
|----|-------------|----------|-------------|
| Javascript SDK | For traditional non-SPA websites | [casdoor-js-sdk](https://github.com/casdoor/casdoor-js-sdk) | [casdoor-raw-js-example](https://github.com/casdoor/casdoor-raw-js-example) |
| React SDK | For React websites | [casdoor-react-sdk](https://github.com/casdoor/casdoor-react-sdk) | [casdoor-nodejs-react-example](https://github.com/casdoor/casdoor-nodejs-react-example) |
| Vue SDK | For Vue websites | [casdoor-vue-sdk](https://github.com/casdoor/casdoor-vue-sdk) | [casdoor-python-vue-sdk-example](https://github.com/casdoor/casdoor-python-vue-sdk-example) |
| Angular SDK | For Angular websites | [casdoor-angular-sdk](https://github.com/casdoor/casdoor-angular-sdk) | [casdoor-nodejs-angular-example](https://github.com/casdoor/casdoor-nodejs-angular-example) |
| Next.js SDK | For Next.js websites | [nextjs-auth](https://github.com/casdoor/nextjs-auth) | - |
| Nuxt SDK | For Nuxt websites | [nuxt-auth](https://github.com/casdoor/nuxt-auth) | - |

## Web backend SDKs

| SDK | Description | SDK code | Example code |
|----|-------------|----------|-------------|
| Go SDK | For Go backends | [casdoor-go-sdk](https://github.com/casdoor/casdoor-go-sdk) | [casdoor-go-react-sdk-example](https://github.com/casdoor/casdoor-go-react-sdk-example) |
| Java SDK | For Java backends | [casdoor-java-sdk](https://github.com/casdoor/casdoor-java-sdk) | [casdoor-spring-boot-starter](https://github.com/casdoor/casdoor-spring-boot-starter) |
| Node.js SDK | For Node.js backends | [casdoor-nodejs-sdk](https://github.com/casdoor/casdoor-nodejs-sdk) | [casdoor-nodejs-react-example](https://github.com/casdoor/casdoor-nodejs-react-example) |
| Python SDK | For Python backends | [casdoor-python-sdk](https://github.com/casdoor/casdoor-python-sdk) | Flask: [casdoor-python-vue-sdk-example](https://github.com/casdoor/casdoor-python-vue-sdk-example) |
| PHP SDK | For PHP backends | [casdoor-php-sdk](https://github.com/casdoor/casdoor-php-sdk) | [wordpress-casdoor-plugin](https://github.com/casdoor/wordpress-casdoor-plugin) |
| .NET SDK | For ASP.NET backends | [casdoor-dotnet-sdk](https://github.com/casdoor/casdoor-dotnet-sdk) | [casdoor-dotnet-sdk-example](https://github.com/casdoor/casdoor-dotnet-sdk-example) |
| Rust SDK | For Rust backends | [casdoor-rust-sdk](https://github.com/casdoor/casdoor-rust-sdk) | [casdoor-rust-example](https://github.com/casdoor/casdoor-rust-example) |

## Using the SDK

### 1. Backend SDK configuration

On startup, call the SDK's init function with your Casdoor endpoint, client ID, client secret, and public key.

Example with **casdoor-go-sdk**:

```go
var CasdoorEndpoint = "https://door.casdoor.com"
var ClientId = "541738959670d221d59d"
var ClientSecret = "66863369a64a5863827cf949bab70ed560ba24bf"
var CasdoorOrganization = "casbin"
var CasdoorApplication = "app-casnode"

auth.InitConfig(CasdoorEndpoint, ClientId, ClientSecret, JwtPublicKey, CasdoorOrganization, CasdoorApplication)
```

### 2. Frontend configuration

Install `casdoor-js-sdk` via NPM or Yarn:

```
npm install casdoor-js-sdk
```

Then initialize with config:

```js
const config = {
  serverUrl: "https://door.casdoor.com",
  clientId: "014ae4bd048734ca2dea",
  organizationName: "casbin",
  appName: "app-casnode",
  redirectPath: "/callback",
};
xxx.initCasdoorSdk(config);
```

### 3. Get login URLs

Show "Sign up" and "Sign in" buttons or links to users.

### 4. Get and verify access token

1. User clicks login URL and is redirected to Casdoor's login page
2. User enters credentials and clicks Sign In
3. User is redirected back with authorization code
4. Exchange code for access token via backend SDK

### 5. Identify user with access token

Use `ParseJwtToken()` to verify token and get user information.
