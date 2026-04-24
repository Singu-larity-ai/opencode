---
title: Shell
source: https://bun.sh/docs/runtime/shell
description: Use Bun's shell scripting API to run shell commands from JavaScript
---

# Shell

> Use Bun's shell scripting API to run shell commands from JavaScript

Bun Shell makes shell scripting with JavaScript & TypeScript fun.

```ts
import { $ } from "bun";

const response = await fetch("https://example.com");
await $`cat < ${response} | wc -c`; // 1256
```

## Features

- **Cross-platform**: works on Windows, Linux & macOS
- **Familiar**: bash-like syntax with redirection, pipes, environment variables
- **Globs**: `**`, `*`, `{expansion}` supported
- **Template literals**: Execute shell commands with template literals
- **JavaScript interop**: Use `Response`, `ArrayBuffer`, `Bun.file()` as stdin/stdout

## Basic usage

```ts
import { $ } from "bun";

// Simple command
await $`echo "Hello World!"`;

// Capture output
const result = await $`echo "Hello!"`.text();
console.log(result); // Hello!\n

// With variables (auto-escaped)
const file = "myfile.txt";
await $`cat ${file}`;
```

## Redirection

```ts
// Redirect output to file
await $`echo "Hello!" > greeting.txt`;

// Redirect file to input
await $`cat < input.txt`;

// Pipes
const result = await $`echo "Hello World!" | wc -w`.text();
```

## Error handling

```ts
try {
  await $`something-that-may-fail`;
} catch (err) {
  console.log(`Failed with code ${err.exitCode}`);
}
```

## Environment variables

```ts
// Set env var for command
await $`FOO=foo bun -e 'console.log(process.env.FOO)'`; // foo

// Change default env
$.env({ FOO: "bar" });
await $`echo $FOO`; // bar
```
