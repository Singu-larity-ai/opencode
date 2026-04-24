---
title: Models
source: https://opencode.ai/docs/models
description: Configuring an LLM provider and model in OpenCode
---

# Models

Configuring an LLM provider and model.

OpenCode uses the AI SDK and Models.dev to support **75+ LLM providers** and supports running local models.

## Select a Model

Once configured, select model with:

```
/models
```

## Recommended Models

- GPT 5.2
- GPT 5.1 Codex
- Claude Opus 4.5
- Claude Sonnet 4.5
- Minimax M2.1
- Gemini 3 Pro

## Set a Default

```json
{
  "model": "anthropic/claude-sonnet-4-20250514"
}
```

## Configure Models

```json
{
  "provider": {
    "openai": {
      "models": {
        "gpt-5": {
          "options": {
            "reasoningEffort": "high"
          }
        }
      }
    }
  }
}
```

## Variants

Many models support multiple variants:

**Anthropic**:
- `high` - High thinking budget (default)
- `max` - Maximum thinking budget

**OpenAI**:
- `none`, `minimal`, `low`, `medium`, `high`, `xhigh`

**Google**:
- `low`, `high`

Use `variant_cycle` keybind to switch between variants.

## Loading Models (Priority Order)

1. `--model` / `-m` command line flag
2. Model in OpenCode config
3. Last used model
4. Internal priority fallback
