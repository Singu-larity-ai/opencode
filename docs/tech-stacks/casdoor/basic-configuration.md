---
title: Configuration
source: https://casdoor.org/docs/basic/configuration
description: Casdoor is configured through separate files for the backend and frontend.
---

# Configuration

Casdoor is configured through separate files for the backend and frontend.

## Backend configuration (app.conf)

The backend reads a single config file: **conf/app.conf**. Key parameters include:

| Parameter | Default Value | Description |
|-----------|--------------|-------------|
| `appname` | `casdoor` | Application name |
| `httpport` | `8000` | Port that the backend listens on |
| `runmode` | `dev` | Running mode: `dev` or `prod` |
| `driverName` | `mysql` | Database driver |
| `dataSourceName` | `root:123456@tcp(localhost:3306)/` | Database connection string |
| `dbName` | `casdoor` | Database name |
| `redisEndpoint` | (empty) | Redis endpoint for session storage |
| `defaultStorageProvider` | (empty) | Default storage provider for file uploads |
| `authState` | `"casdoor"` | Authorization application name |
| `verificationCodeTimeout` | `10` | Verification code expiration in minutes |

### Environment variables

Every Casdoor option in `app.conf` can be overridden with an environment variable of the same name.

## Frontend configuration (Conf.js)

The frontend is configured in **web/src/Conf.js**. Key parameters include:

| Parameter | Default Value | Description |
|-----------|--------------|-------------|
| `DefaultApplication` | `"app-built-in"` | Default application for login |
| `CasvisorUrl` | `""` | URL for Casvisor integration |
| `ShowGithubCorner` | `false` | Show GitHub corner link |
| `IsDemoMode` | `false` | Demo mode restrictions |
| `ForceLanguage` | `""` | Force specific language |
| `DefaultLanguage` | `"en"` | Default UI language |
| `InitThemeAlgorithm` | `true` | Enable theme algorithm |
| `ThemeDefault` | `{themeType: "default", colorPrimary: "#5734d3", borderRadius: 6, isCompact: false}` | Default theme settings |
