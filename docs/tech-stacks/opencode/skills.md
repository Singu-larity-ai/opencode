---
title: Agent Skills
source: https://opencode.ai/docs/skills
description: Define reusable behavior via SKILL.md definitions
---

# Agent Skills

Define reusable behavior via SKILL.md definitions.

## Place Files

Create `.opencode/skills/<name>/SKILL.md`:

```
.opencode/skills/git-release/SKILL.md
```

Also loads from:
- `~/.config/opencode/skills/<name>/SKILL.md`
- `.claude/skills/<name>/SKILL.md`
- `.agents/skills/<name>/SKILL.md`

## Frontmatter

```yaml
---
name: git-release
description: Create consistent releases and changelogs
license: MIT
compatibility: opencode
metadata:
  audience: maintainers
  workflow: github
---
```

## Name Rules

- 1-64 characters
- Lowercase alphanumeric with single hyphen separators
- No leading/trailing hyphens
- Match directory name

## Permissions

```json
{
  "permission": {
    "skill": {
      "*": "allow",
      "pr-review": "allow",
      "internal-*": "deny"
    }
  }
}
```

Per agent:
```yaml
---
permission:
  skill:
    "documents-*": "allow"
---
```

## Tool

Agents use skill via:
```
skill({ name: "git-release" })
```
