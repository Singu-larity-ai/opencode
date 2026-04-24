---
title: File I/O
source: https://bun.com/docs/runtime/file-io.md
description: Bun provides optimized APIs for reading and writing files
---

## Reading files (Bun.file())

Create a BunFile instance with `Bun.file(path)`. A BunFile represents a lazily-loaded file.

```ts
const foo = Bun.file("foo.txt");
foo.size;
foo.type;
```

Read contents in various formats:

```ts
const foo = Bun.file("foo.txt");
await foo.text();
await foo.json();
await foo.stream();
await foo.arrayBuffer();
await foo.bytes();
```

### Deleting files

```ts
await Bun.file("logs.json").delete();
```

## Writing files (Bun.write())

`Bun.write(destination, data)` writes payloads to disk.

```ts
const data = `It was the best of times`;
await Bun.write("output.txt", data);

const input = Bun.file("input.txt");
const output = Bun.file("output.txt");
await Bun.write(output, input);

const response = await fetch("https://bun.com");
await Bun.write("index.html", response);
```

## Incremental writing with FileSink

```ts
const file = Bun.file("output.txt");
const writer = file.writer();

writer.write("it was the best of times\n");
writer.write("it was the worst of times\n");

writer.flush();
writer.end();
```

## Directories

### Reading directories

```ts
import { readdir } from "node:fs/promises";

const files = await readdir(import.meta.dir);
const filesRecursive = await readdir("../", { recursive: true });
```

### Creating directories

```ts
import { mkdir } from "node:fs/promises";

await mkdir("path/to/dir", { recursive: true });
```

## Reference

```ts
interface Bun {
  stdin: BunFile;
  stdout: BunFile;
  stderr: BunFile;
  file(path: string | number | URL, options?: { type?: string }): BunFile;
  write(destination: string | number | BunFile | URL, input: string | Blob | ArrayBuffer | TypedArray | Response): Promise<number>;
}

interface BunFile {
  readonly size: number;
  readonly type: string;
  text(): Promise<string>;
  stream(): ReadableStream;
  arrayBuffer(): Promise<ArrayBuffer>;
  json(): Promise<any>;
  writer(params: { highWaterMark?: number }): FileSink;
  exists(): Promise<boolean>;
}
```
