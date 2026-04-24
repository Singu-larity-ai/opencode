---
title: Agents
source: https://opencode.ai/docs/agents
description: Configure and use specialized agents in OpenCode
---

# Agents

Configure and use specialized agents.

Agents are specialized AI assistants configured for specific tasks and workflows.

## Types

### Primary Agents
Main agents you interact with directly. Switch using **Tab** key.

- **Build** - Default agent with all tools enabled
- **Plan** - Restricted agent for planning/analysis (no edits by default)

### Subagents
Specialized assistants invoked by primary agents or via **@ mentioning**.

- **General** - General-purpose for complex tasks
- **Explore** - Fast, read-only for exploring codebases

## Usage

- Primary agents: Use **Tab** key to cycle
- Subagents: Use **@agentname** to invoke
- Navigate child sessions with `session_child_cycle` keybind

## Configure (JSON)

```json
{
  "agent": {
    "build": {
      "mode": "primary",
      "model": "anthropic/claude-sonnet-4-20250514",
      "tools": { "write": true, "edit": true, "bash": true }
    },
    "plan": {
      "mode": "primary",
      "tools": { "write": false, "edit": false, "bash": false }
    },
    "code-reviewer": {
      "description": "Reviews code for best practices",
      "mode": "subagent",
      "model": "anthropic/claude-sonnet-4-20250514",
      "tools": { "write": false, "edit": false }
    }
  }
}
```

## Configure (Markdown)

Place in `~/.config/opencode/agents/` or `.opencode/agents/`:

```markdown
---
description: Code review agent
mode: subagent
model: anthropic/claude-sonnet-4-20250514
temperature: 0.1
tools:
  write: false
  edit: false
  bash: false
---
You are in code review mode...
```

## Options

- `description` - Brief description (required)
- `temperature` - Randomness (0.0-1.0, lower = more focused)
- `steps` - Max agentic iterations
- `model` - Override default model
- `mode` - `primary`, `subagent`, or `all`
- `hidden` - Hide from @ autocomplete
- `permission` - Tool permissions (`allow`, `deny`, `ask`)
- `color` - UI color (hex or theme color)
- `top_p` - Response diversity alternative to temperature
