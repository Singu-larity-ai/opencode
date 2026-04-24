---
title: GitHub
source: https://opencode.ai/docs/github
description: Use OpenCode in GitHub issues and pull-requests
---

# GitHub

Use OpenCode in GitHub issues and pull-requests.

## Installation

```bash
opencode github install
```

Or manually:
1. Install GitHub App from github.com/apps/opencode-agent
2. Add workflow to `.github/workflows/opencode.yml`
3. Store API keys in secrets

## Usage

Comment on issues/PRs with `/oc` or `/opencode`:

```
/opencode explain this issue
/opencode fix this
```

## Configuration

```yaml
jobs:
  opencode:
    steps:
      - uses: anomalyco/opencode/github@latest
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        with:
          model: anthropic/claude-sonnet-4-20250514
```

## Supported Events

- `issue_comment` - Comment on issues/PRs
- `pull_request_review_comment` - Comment on code lines
- `issues` - Issue opened/edited
- `pull_request` - PR opened/updated
- `schedule` - Cron-based schedule
- `workflow_dispatch` - Manual trigger

## Examples

```bash
/opencode explain this issue
/opencode fix this
/oc add error handling here
```
