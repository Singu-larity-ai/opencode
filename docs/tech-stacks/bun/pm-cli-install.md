---
title: Bun Install (Package Manager)
source: https://bun.com/docs/pm/cli/install/
description: Install packages with Bun's fast package manager.
---

# bun install

> Install packages with Bun's fast package manager

## Basic Usage

```bash
bun install react
bun install react@19.1.1 # specific version
bun install react@latest # specific tag
```

The `bun` CLI contains a Node.js-compatible package manager designed to be a dramatically faster replacement for `npm`, `yarn`, and `pnpm`. It's a standalone tool that will work in pre-existing Node.js projects.

To install all dependencies of a project:

```bash
bun install
```

Running `bun install` will:

* **Install** all `dependencies`, `devDependencies`, and `optionalDependencies`. Bun will install `peerDependencies` by default.
* **Run** your project's `{pre|post}install` and `{pre|post}prepare` scripts at the appropriate time.
* **Write** a `bun.lock` lockfile to the project root.

## Logging

```bash
bun install --verbose # debug logging
bun install --silent  # no logging
```

## Lifecycle scripts

Unlike other npm clients, Bun does not execute arbitrary lifecycle scripts like `postinstall` for installed dependencies. To tell Bun to allow lifecycle scripts for a particular package, add the package to `trustedDependencies` in your package.json.

```json
{
  "name": "my-app",
  "trustedDependencies": ["my-trusted-package"]
}
```

## Workspaces

Bun supports `"workspaces"` in package.json.

```json
{
  "name": "my-app",
  "workspaces": ["packages/*"],
  "dependencies": {
    "preact": "^10.5.13"
  }
}
```

## Global packages

To install a package globally:

```bash
bun install --global cowsay
cowsay "Bun!"
```

## Production mode

To install in production mode (without devDependencies):

```bash
bun install --production
```

For reproducible installs:

```bash
bun install --frozen-lockfile
```

## Omitting dependencies

To omit dev, peer, or optional dependencies:

```bash
bun install --omit dev
bun install --omit=dev --omit=peer --omit=optional
```

## Dry run

```bash
bun install --dry-run
```

## Installation strategies

### Hoisted installs

The traditional npm/Yarn approach:

```bash
bun install --linker hoisted
```

### Isolated installs

A pnpm-like approach that creates strict dependency isolation:

```bash
bun install --linker isolated
```

## Configuration with bunfig.toml

```toml
[install]
optional = true
dev = true
peer = true
production = false
frozenLockfile = false
dryRun = false
linker = "hoisted"
minimumReleaseAge = 259200 # seconds
```

## Platform-specific dependencies

Override the target platform for package selection:

```bash
bun install --cpu=x64 --os=linux
```

## CLI Usage

```bash
bun install <name>@<version>
```

### Dependency Scope & Management

- `--production` - Don't install devDependencies
- `--no-save` - Don't update package.json or save a lockfile
- `--omit` - Exclude 'dev', 'optional', or 'peer' dependencies
- `--dev` - Add dependency to "devDependencies"
- `--optional` - Add dependency to "optionalDependencies"
- `--peer` - Add dependency to "peerDependencies"
- `--exact` - Add the exact version instead of the ^range

### Lockfile Control

- `--yarn` - Write a yarn.lock file (yarn v1)
- `--frozen-lockfile` - Disallow changes to lockfile
- `--save-text-lockfile` - Save a text-based lockfile
- `--lockfile-only` - Generate a lockfile without installing dependencies

### Network & Registry Settings

- `--registry` - Use a specific registry by default

### Installation Process Control

- `--dry-run` - Don't install anything
- `--force` - Always request the latest versions from the registry
- `--global` - Install globally
- `--backend` - Platform-specific optimizations: "clonefile", "hardlink", "symlink", "copyfile"
- `--filter` - Install packages for the matching workspaces

### Caching Options

- `--cache-dir` - Store & load cached data from a specific directory path
- `--no-cache` - Ignore manifest cache entirely

### Output & Logging

- `--silent` - Don't log anything
- `--verbose` - Excessively verbose logging
- `--no-progress` - Disable the progress bar
- `--no-summary` - Don't print a summary

### Security & Integrity

- `--no-verify` - Skip verifying integrity of newly downloaded packages
- `--trust` - Add to trustedDependencies

### Concurrency & Performance

- `--concurrent-scripts` - Maximum number of concurrent jobs for lifecycle scripts
- `--network-concurrency` - Maximum number of concurrent network requests
