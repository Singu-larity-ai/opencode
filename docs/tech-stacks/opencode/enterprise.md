---
title: Enterprise
source: https://opencode.ai/docs/enterprise
description: Using OpenCode securely in your organization
---

# Enterprise

Using OpenCode securely in organizations.

## Trial

OpenCode is open source and does not store code/context data by default.

### Data Handling

- All processing happens locally or via direct API calls
- Only risk: optional `/share` feature

### Disable Sharing

```json
{ "share": "disabled" }
```

## Deployment Options

### Central Config

Single config for entire organization with SSO integration.

### SSO Integration

Integrated with organization's SSO provider for authentication.

### Internal AI Gateway

Configure to use only internal AI gateway, disable external providers.

### Self-hosting

Can self-host share pages on your infrastructure.

## Private NPM Registry

Uses Bun's native `.npmrc` support:

```bash
npm login --registry=https://your-company.jfrog.io/api/npm/npm-virtual/
```

Or manually configure `~/.npmrc`:

```
registry=https://your-company.jfrog.io/api/npm/npm-virtual/
```

## Pricing

Per-seat model. No token charges if using your own LLM gateway.

Contact: contact@anoma.ly
