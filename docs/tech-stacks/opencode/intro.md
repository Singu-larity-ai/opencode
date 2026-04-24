---
title: Intro
source: https://opencode.ai/docs
description: Get started with OpenCode - install, configure, and usage guide
---

# Intro

Get started with OpenCode.

**OpenCode** is an open source AI coding agent. It's available as a terminal-based interface, desktop app, or IDE extension.

## Prerequisites

To use OpenCode in your terminal, you'll need:

1. A modern terminal emulator like:
   - WezTerm, cross-platform
   - Alacritty, cross-platform
   - Ghostty, Linux and macOS
   - Kitty, Linux and macOS
2. API keys for the LLM providers you want to use.

## Install

The easiest way to install OpenCode is through the install script.

```bash
curl -fsSL https://opencode.ai/install | bash
```

You can also install it with the following commands:

- **Using Node.js** (npm, Bun, pnpm, Yarn)
- **Using Homebrew** on macOS and Linux
- **Using Pacman** on Arch Linux
- **Using Chocolatey** on Windows
- **Using Scoop** on Windows
- **Using Docker**

## Configure

With OpenCode you can use any LLM provider by configuring their API keys. If you are new to using LLM providers, we recommend using OpenCode Zen.

1. Run the `/connect` command in the TUI
2. Sign in and copy your API key
3. Paste your API key

## Initialize

Navigate to your project directory and run OpenCode:

```bash
cd /path/to/project
opencode
```

Then initialize OpenCode for the project:

```
/init
```

This will analyze your project and create an `AGENTS.md` file.

## Usage

### Ask questions

Use the `@` key to fuzzy search for files:

```
How is authentication handled in @packages/functions/src/api/index.ts
```

### Add features

1. Create a plan using Plan mode (Tab key)
2. Iterate on the plan with feedback
3. Build the feature (Tab key again)

### Make changes

```
We need to add authentication to the /settings route.
```

### Undo changes

```
/undo
```

## Share

```
/share
```

Creates a link to the current conversation.

## Customize

- Picking a theme
- Customizing keybinds
- Configuring code formatters
- Creating custom commands
