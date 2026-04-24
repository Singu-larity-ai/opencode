---
title: Network
source: https://opencode.ai/docs/network
description: Configure proxies and custom certificates for OpenCode
---

# Network

Configure proxies and custom certificates.

## Proxy

OpenCode respects standard proxy environment variables:

```bash
export HTTPS_PROXY=https://proxy.example.com:8080
export HTTP_PROXY=http://proxy.example.com:8080
export NO_PROXY=localhost,127.0.0.1
```

Caution: TUI uses local HTTP server - bypass proxy to prevent routing loops.

### Authentication

```bash
export HTTPS_PROXY=http://username:password@proxy.example.com:8080
```

## Custom Certificates

For enterprise custom CAs:

```bash
export NODE_EXTRA_CA_CERTS=/path/to/ca-cert.pem
```

Works for both proxy connections and direct API access.
