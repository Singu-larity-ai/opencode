---
title: Troubleshooting
source: https://opencode.ai/docs/troubleshooting
description: Common issues and how to resolve them
---

# Troubleshooting

Common issues and resolutions.

## Logs

Log files at:
- macOS/Linux: `~/.local/share/opencode/log/`
- Windows: `%USERPROFILE%\.local\share\opencode`

Use `--log-level DEBUG` for debug info.

## Storage

Data at:
- macOS/Linux: `~/.local/share/opencode/`
- Windows: `%USERPROFILE%\.local\share\opencode`

## Common Issues

### OpenCode won't start
1. Check logs for errors
2. Try `--print-logs`
3. Update with `opencode upgrade`

### Authentication issues
1. Re-authenticate with `/connect`
2. Check API keys are valid
3. Check network access

### Model not available
1. Verify authentication
2. Check model name format: `<providerId>/<modelId>`
3. Run `opencode models`

### ProviderInitError
1. Clear stored config: `rm -rf ~/.local/share/opencode`
2. Re-authenticate with `/connect`

## Desktop App

- Disable plugins in config
- Clear cache: `rm -rf ~/.cache/opencode`
- Reset server connection in settings

## Getting Help

- GitHub: github.com/anomalyco/opencode/issues
- Discord: opencode.ai/discord
