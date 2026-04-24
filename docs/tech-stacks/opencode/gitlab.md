---
title: GitLab
source: https://opencode.ai/docs/gitlab
description: Use OpenCode in GitLab issues and merge requests
---

# GitLab

Use OpenCode in GitLab issues and merge requests.

## GitLab CI

OpenCode works in GitLab CI/CD pipelines via CI component.

### Setup

1. Store OpenCode auth JSON as CI variable
2. Add to `.gitlab-ci.yml`:

```yaml
include:
  - component: $CI_SERVER_FQDN/nagyv/gitlab-opencode/opencode@2
    inputs:
      config_dir: ${CI_PROJECT_DIR}/opencode-config
      auth_json: $OPENCODE_AUTH_JSON
      command: optional-custom-command
      message: "Your prompt here"
```

## GitLab Duo

Integrates with GitLab workflow. Mention `@opencode` in comments.

### Setup

1. Configure GitLab environment
2. Set up CI/CD
3. Get AI model API key
4. Create service account
5. Configure CI/CD variables
6. Create flow config file

### Usage

```
@opencode explain this issue
@opencode fix this
@opencode review this merge request
```

OpenCode creates branches and opens merge requests automatically.
