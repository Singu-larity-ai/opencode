---
title: Server Installation
source: https://casdoor.org/docs/basic/server-installation
description: Requirements, download options, configuration, and running Casdoor server for development and production.
---

# Server Installation

## Requirements

### Operating system

Windows, Linux, and macOS are supported.

### Build environment

- [Go 1.21+](https://go.dev/dl/)
- [Node.js LTS (20)](https://nodejs.org)
- [Yarn 1.x](https://classic.yarnpkg.com/en/docs/install)

### Database

Casdoor uses [XORM](https://xorm.io/) and supports MySQL, MariaDB, PostgreSQL, CockroachDB, SQL Server, Oracle, SQLite 3, and TiDB.

## Download

### Pre-built binaries

[GitHub Releases](https://github.com/casdoor/casdoor/releases) provide binaries for Linux (x86_64, arm64), macOS (x86_64, arm64), and Windows (x86_64, arm64).

### Build from source

Repository: `https://github.com/casdoor/casdoor`

| Part | Description | Stack |
|------|-------------|-------|
| Frontend | Web UI | JavaScript + React |
| Backend | REST API | Go + Beego + XORM |

## Configuration

### Configure database

Casdoor supports MySQL, MariaDB, PostgreSQL, CockroachDB, SQL Server, Oracle, SQLite3, and TiDB. Default config uses MySQL.

Set the connection in `conf/app.conf`:

```
driverName = mysql
dataSourceName = root:123456@tcp(localhost:3306)/dbName = casdoor
```

## Run

### Development mode

Start the Go backend (default port 8000):

```
go run main.go
```

Then start the frontend:

```
cd web
yarn install
yarn start
```

Open [http://localhost:7001](http://localhost:7001) and sign in as **built-in/admin** / **123**.

### Production mode

Build and run the binary:

```
go build
./casdoor
```

Build static assets:

```
cd web
yarn install
yarn build
```

Open [http://localhost:8000](http://localhost:8000) and sign in as **built-in/admin** / **123**.
