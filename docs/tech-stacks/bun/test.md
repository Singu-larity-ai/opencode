---
title: Bun Test Runner
source: https://bun.com/docs/test/
description: Bun's fast, built-in, Jest-compatible test runner with TypeScript support, lifecycle hooks, mocking, and watch mode.
---

# Test runner

> Bun's fast, built-in, Jest-compatible test runner with TypeScript support, lifecycle hooks, mocking, and watch mode

Bun ships with a fast, built-in, Jest-compatible test runner. Tests are executed with the Bun runtime, and support the following features.

* TypeScript and JSX
* Lifecycle hooks
* Snapshot testing
* UI & DOM testing
* Watch mode with `--watch`
* Script pre-loading with `--preload`

## Run tests

```bash
bun test
```

Tests are written in JavaScript or TypeScript with a Jest-like API.

```ts
import { expect, test } from "bun:test";

test("2 + 2", () => {
  expect(2 + 2).toBe(4);
});
```

The runner recursively searches the working directory for files that match the following patterns:

* `*.test.{js|jsx|ts|tsx}`
* `*_test.{js|jsx|ts|tsx}`
* `*.spec.{js|jsx|ts|tsx}`
* `*_spec.{js|jsx|ts|tsx}`

## Concurrent test execution

By default, Bun runs all tests sequentially within each test file. You can enable concurrent execution:

```bash
bun test --concurrent
```

### `--max-concurrency` flag

Control the maximum number of tests running simultaneously:

```bash
bun test --concurrent --max-concurrency 4
```

### `test.concurrent`

Mark individual tests to run concurrently:

```ts
test.concurrent("concurrent test 1", async () => {
  await fetch("/api/endpoint1");
  expect(true).toBe(true);
});
```

## Retry failed tests

Use the `--retry` flag to automatically retry failed tests:

```bash
bun test --retry 3
```

## Rerun tests

Use the `--rerun-each` flag to run each test multiple times:

```bash
bun test --rerun-each 100
```

## Randomize test execution order

Use the `--randomize` flag:

```bash
bun test --randomize
```

### Reproducible random order with `--seed`

```bash
bun test --seed 123456
```

## Bail out with `--bail`

Abort the test run after a pre-determined number of test failures:

```bash
bun test --bail
bun test --bail=10
```

## Watch mode

```bash
bun test --watch
```

## Lifecycle hooks

Bun supports the following lifecycle hooks:

| Hook         | Description                 |
| ------------ | --------------------------- |
| `beforeAll`  | Runs once before all tests. |
| `beforeEach` | Runs before each test.      |
| `afterEach`  | Runs after each test.      |
| `afterAll`   | Runs once after all tests. |

## Mocks

Create mock functions with the `mock` function.

```ts
import { test, expect, mock } from "bun:test";
const random = mock(() => Math.random());

test("random", () => {
  const val = random();
  expect(val).toBeGreaterThan(0);
  expect(random).toHaveBeenCalled();
  expect(random).toHaveBeenCalledTimes(1);
});
```

## Snapshot testing

```ts
import { test, expect } from "bun:test";

test("snapshot", () => {
  expect({ a: 1 }).toMatchSnapshot();
});
```

To update snapshots:

```bash
bun test --update-snapshots
```

## Timeouts

Use the `--timeout` flag to specify a per-test timeout in milliseconds:

```bash
bun test --timeout 20
```

## CLI Usage

```bash
bun test <patterns>
```

### Execution Control

- `--timeout` - Set the per-test timeout in milliseconds (default 5000)
- `--rerun-each` - Re-run each test file N times
- `--retry` - Default retry count for all tests
- `--concurrent` - Treat all tests as test.concurrent() tests
- `--randomize` - Run tests in random order
- `--seed` - Set the random seed for test randomization
- `--bail` - Exit the test suite after N failures
- `--max-concurrency` - Maximum number of concurrent tests (default 20)

### Test Filtering

- `--todo` - Include tests marked with test.todo()
- `--test-name-pattern` - Run only tests with a name that matches the given regex

### Reporting

- `--reporter` - Test output reporter format (junit, dots)
- `--reporter-outfile` - Output file path for the reporter format
- `--dots` - Enable dots reporter

### Coverage

- `--coverage` - Generate a coverage profile
- `--coverage-reporter` - Report coverage in text and/or lcov (default: text)
- `--coverage-dir` - Directory for coverage files (default: coverage)

### Snapshots

- `--update-snapshots` - Update snapshot files
