---
title: Bun Runtime
source: https://bun.com/docs/runtime/
description: Execute JavaScript/TypeScript files, package.json scripts, and executable packages with Bun's fast runtime.
---

# Bun Runtime

> Execute JavaScript/TypeScript files, package.json scripts, and executable packages with Bun's fast runtime.

The Bun Runtime is designed to start fast and run fast.

Under the hood, Bun uses the [JavaScriptCore engine](https://developer.apple.com/documentation/javascriptcore), which is developed by Apple for Safari. In most cases, the startup and running performance is faster than V8, the engine used by Node.js and Chromium-based browsers. Its transpiler and runtime are written in Zig, a modern, high-performance language. On Linux, this translates into startup times [4x faster](https://twitter.com/jarredsumner/status/1499225725492076544) than Node.js.

| Command         | Time     |
| --------------- | -------- |
| `bun hello.js`  | `5.2ms`  |
| `node hello.js` | `25.1ms` |

This benchmark is based on running a Hello World script on Linux

## Run a file

Use `bun run` to execute a source file.

```bash
bun run index.js
```

Bun supports TypeScript and JSX out of the box. Every file is transpiled on the fly by Bun's fast native transpiler before being executed.

```bash
bun run index.js
bun run index.jsx
bun run index.ts
bun run index.tsx
```

Alternatively, you can omit the `run` keyword and use the "naked" command; it behaves identically.

```bash
bun index.tsx
bun index.js
```

### `--watch`

To run a file in watch mode, use the `--watch` flag.

```bash
bun --watch run index.tsx
```

## Run a `package.json` script

Your `package.json` can define a number of named `"scripts"` that correspond to shell commands.

```json
{
  // ... other fields
  "scripts": {
    "clean": "rm -rf dist && echo 'Done.'",
    "dev": "bun server.ts"
  }
}
```

Use `bun run <script>` to execute these scripts.

```bash
bun run clean
```

Bun executes the script command in a subshell. On Linux & macOS, it checks for the following shells in order, using the first one it finds: `bash`, `sh`, `zsh`. On Windows, it uses [bun shell](/runtime/shell) to support bash-like syntax and many common commands.

Scripts can also be run with the shorter command `bun <script>`, however if there is a built-in bun command with the same name, the built-in command takes precedence. In this case, use the more explicit `bun run <script>` command to execute your package script.

```bash
bun run dev
```

To see a list of available scripts, run `bun run` without any arguments.

## `bun run -` to pipe code from stdin

`bun run -` lets you read JavaScript, TypeScript, TSX, or JSX from stdin and execute it without writing to a temporary file first.

```bash
echo "console.log('Hello')" | bun run -
```

## CLI Usage

```bash
bun run <file or script>
```

### General Execution Options

- `--silent` - Don't print the script command
- `--if-present` - Exit without an error if the entrypoint does not exist
- `--eval` - Evaluate argument as a script
- `--print` - Evaluate argument as a script and print the result
- `--help` - Display this menu and exit

### Workspace Management

- `--filter` - Run a script in all workspace packages matching the pattern
- `--workspaces` - Run a script in all workspace packages
- `--parallel` - Run multiple scripts concurrently with prefixed output
- `--sequential` - Run multiple scripts one after another with prefixed output

### Runtime & Process Control

- `--bun` - Force a script or package to use Bun's runtime instead of Node.js
- `--smol` - Use less memory, but run garbage collection more often
- `--expose-gc` - Expose `gc()` on the global object
- `--watch` - Automatically restart the process on file change
- `--hot` - Enable auto reload in the Bun runtime, test runner, or bundler

### Development Workflow

- `--watch` - Automatically restart the process on file change
- `--hot` - Enable auto reload
- `--no-clear-screen` - Disable clearing the terminal screen on reload

### Debugging

- `--inspect` - Activate Bun's debugger
- `--inspect-wait` - Activate Bun's debugger, wait for a connection before executing
- `--inspect-brk` - Activate Bun's debugger, set breakpoint on first line of code and wait

### Dependency & Module Resolution

- `--preload` - Import a module before other modules are loaded
- `--no-install` - Disable auto install in the Bun runtime
- `--install` - Configure auto-install behavior (auto, fallback, force)
- `-i` - Auto-install dependencies during execution

### Transpilation & Language Features

- `--tsconfig-override` - Specify custom tsconfig.json
- `--define` - Substitute K:V while parsing
- `--drop` - Remove function calls
- `--loader` - Parse files with .ext:loader
- `--jsx-factory` - Changes the function called when compiling JSX elements
- `--jsx-fragment` - Changes the function called when compiling JSX fragments
- `--jsx-import-source` - Declares the module specifier for jsx and jsxs factory functions
- `--jsx-runtime` - automatic or classic

### Networking & Security

- `--port` - Set the default port for `Bun.serve`
- `--dns-result-order` - Set the default order of DNS lookup results
- `--use-system-ca` - Use the system's trusted certificate authorities
- `--use-openssl-ca` - Use OpenSSL's default CA store
- `--use-bundled-ca` - Use bundled CA store

### Global Configuration & Context

- `--env-file` - Load environment variables from the specified file(s)
- `--cwd` - Absolute path to resolve files & entry points from
- `--config` - Specify path to Bun config file (bunfig.toml)
