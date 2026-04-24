---
title: Testing
source: https://docs.solidjs.com/guides/testing
description: Testing your Solid applications is important to inspiring confidence in your codebase through preventing regressions.
---

# Testing

Testing your Solid applications is important to inspiring confidence in your codebase through preventing regressions.

## Getting started

### Testing packages explanations

- `vitest` - testing framework
- `jsdom` - a virtual DOM for node
- `@solidjs/testing-library` - a library to simplify testing components
- `@testing-library/user-event` - used to simulate user events
- `@testing-library/jest-dom` - augments expect with helpful matchers

### Adding testing packages

The recommended testing framework for Solid applications is vitest.

```bash
npm i vitest jsdom @solidjs/testing-library @testing-library/user-event @testing-library/jest-dom -D
```

## Writing tests

### Components testing

Testing components involves three main things:
- Rendering the component
- Interacting with the component
- Validating assertions

```javascript
test("increments value", async () => {
  const { getByRole } = render(() => <Counter />);
  const counter = getByRole("button");
  expect(counter).toHaveTextContent("1");
  await user.click(counter);
  expect(counter).toHaveTextContent("2");
});
```

### Directive testing

Directives are reusable behaviors for elements.

### Primitive testing

Parts of state and logic can be put into reusable hooks or primitives.

### Testing effects

Since effects may happen asynchronously, it can be difficult to test them.

### Benchmarks

Vitest offers an experimental `bench` function to run benchmarks.

### Test coverage

Vitest supports coverage collection with `@vitest/coverage-v8`.

### Integration/E2E testing

Integration and end-to-end tests are agnostic to frameworks.
