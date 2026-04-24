---
title: Rules
source: https://opencode.ai/docs/rules
description: Set custom instructions for OpenCode via AGENTS.md
---

# Rules

Set custom instructions via `AGENTS.md` file.

## Initialize

Run `/init` to scan your repo and create AGENTS.md with:
- Build, lint, test commands
- Architecture and structure
- Project conventions
- Setup quirks

## Example AGENTS.md

```markdown
# Project Name

## Project Structure
- `packages/` - Workspace packages
- `infra/` - Infrastructure definitions
- `sst.config.ts` - SST configuration

## Code Standards
- Use TypeScript with strict mode
- Shared code goes in `packages/core/`
- Functions go in `packages/functions/`

## Monorepo Conventions
- Import using workspace names: `@my-app/core`
```

## Types

### Project Rules
`AGENTS.md` in project root — applies to this project

### Global Rules
`~/.config/opencode/AGENTS.md` — applies to all sessions

### Claude Code Compatibility
- `CLAUDE.md` fallback support
- `~/.claude/CLAUDE.md` fallback
- `~/.claude/skills/` directory

Disable with:
```bash
export OPENCODE_DISABLE_CLAUDE_CODE=1
```

## Precedence

1. Local `AGENTS.md` / `CLAUDE.md`
2. Global `~/.config/opencode/AGENTS.md`
3. Claude Code `~/.claude/CLAUDE.md`

## Custom Instructions

```json
{
  "instructions": [
    "CONTRIBUTING.md",
    "docs/guidelines.md",
    ".cursor/rules/*.md"
  ]
}
```

Or use remote URLs:

```json
{
  "instructions": [
    "https://raw.githubusercontent.com/org/rules/main/style.md"
  ]
}
```

## File References

Teach OpenCode to load external files:

```markdown
## Guidelines
For TypeScript: @docs/typescript-guidelines.md
For React: @docs/react-patterns.md
```

Tip: Use lazy loading — only load when needed.
