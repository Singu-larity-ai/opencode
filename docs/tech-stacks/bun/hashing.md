---
title: Hashing
source: https://bun.sh/docs/runtime/hashing
description: Bun provides a set of utility functions for hashing and verifying passwords with various cryptographically secure algorithms
---

# Hashing

> Bun provides a set of utility functions for hashing and verifying passwords with various cryptographically secure algorithms

## Bun.password

`Bun.password` is a collection of utility functions for hashing and verifying passwords with various cryptographically secure algorithms.

```ts
const password = "super-secure-pa$$word";

const hash = await Bun.password.hash(password);
// => $argon2id$v=19$m=65536,t=2,p=1$...

const isMatch = await Bun.password.verify(password, hash);
// => true
```

Supported algorithms: `argon2id`, `argon2i`, `argon2d`, `bcrypt`

## Bun.hash

`Bun.hash` is a collection of utilities for *non-cryptographic* hashing optimized for speed.

```ts
Bun.hash("some data here");
// 11562320457524636935n
```

Supported algorithms: Wyhash, CRC32, Adler32, CityHash, xxHash, MurmurHash, RapidHash

## Bun.CryptoHasher

`Bun.CryptoHasher` is a general-purpose utility class for incrementally computing cryptographic hashes.

```ts
const hasher = new Bun.CryptoHasher("sha256");
hasher.update("hello world");
hasher.digest();
// Uint8Array(32) [ <byte>, <byte>, ... ]
```

Supported algorithms: blake2b, md4, md5, ripemd160, sha1, sha224, sha256, sha384, sha512, sha3-*, shake128, shake256
