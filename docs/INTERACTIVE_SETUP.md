# Interactive Setup Wizard Guide

## Overview

The eBay API MCP Server includes a beautiful interactive CLI setup wizard that makes configuration a breeze. No more manually editing `.env` files or worrying about formatting!

## Features

- 🎨 **Beautiful eBay-branded ASCII logo** with colors
- 📝 **Step-by-step guided prompts** for all configuration values
- ✅ **Real-time input validation** to catch errors early
- 🔄 **Reconfigure anytime** - run the command again to update settings
- 💾 **Automatic .env generation** with proper formatting and comments
- 🚀 **MCP client auto-detection** (Claude Desktop, Gemini, ChatGPT)
- 🔐 **Password masking** for sensitive values
- 🌈 **Color-coded interface** for better readability

## Quick Start

### First-Time Setup

```bash
# 1. Clone and install
git clone https://github.com/YosefHayim/ebay-api-mcp-server.git
cd ebay-api-mcp-server
npm install

# 2. Run the interactive setup
npm run setup
```

### Reconfiguring

To update your configuration at any time:

```bash
npm run setup
```

The wizard will detect your existing configuration and allow you to update values.

## Wizard Steps

### Step 1: Welcome Screen

The wizard starts with a beautiful eBay logo and welcome message explaining what you'll need:

- eBay Client ID & Secret
- Redirect URI (RuName)
- Optional: User access & refresh tokens

Press Enter to continue or Ctrl+C to cancel.

### Step 2: Basic eBay API Credentials

You'll be prompted for:

1. **eBay Client ID** (required)
   - Get from: https://developer.ebay.com/my/keys
   - Validated: Must not be empty

2. **eBay Client Secret** (required)
   - Masked as you type for security
   - Get from: https://developer.ebay.com/my/keys
   - Validated: Must not be empty

3. **Environment** (required)
   - Choose between:
     - 🧪 Sandbox (Testing)
     - 🚀 Production (Live eBay)
   - Use arrow keys to select

4. **Redirect URI / RuName** (required)
   - Get from: eBay Developer Portal > User Tokens
   - Validated: Must not be empty

### Step 3: User OAuth Tokens (Optional)

These provide higher rate limits (10k-50k requests/day vs 1k/day).

1. **Do you have user tokens?**
   - Yes: Enter access & refresh tokens
   - No: Skip to next step (can add later)

2. If yes, enter:
   - **User Access Token**
     - Format: `v^1.1#...`
     - Validated: Must start with `v^1.1#`

   - **User Refresh Token**
     - Format: `v^1.1#...`
     - Validated: Must start with `v^1.1#`

💡 **Tip:** If you don't have these yet, the wizard will remind you to use the `ebay_get_oauth_url` tool later.

### Step 4: App Access Token (Optional)

The server can auto-generate this using client credentials flow.

1. **Do you have a pre-generated app token?**
   - Yes: Enter the token
   - No: Skip (auto-generated on startup)

2. If yes, enter:
   - **App Access Token**
     - Format: `v^1.1#...`
     - Validated: Must start with `v^1.1#`

### Step 5: Review Configuration

The wizard displays a summary of your configuration:

```
📋 Review Configuration

Basic Credentials:
  Client ID: App-YourAppID-PRD-a12...
  Client Secret: ••••••••••••••••••••
  Environment: Production
  Redirect URI: Your_RuName_Here

User Tokens:
  Access Token: ✓ Set
  Refresh Token: ✓ Set

App Token:
  Access Token: Will auto-generate
```

Confirm to save or cancel to start over.

### Step 6: Finalize

1. Configuration is saved to `.env` file
2. MCP clients are detected (if any)
3. Optional: Run auto-setup to configure MCP clients

### Success Screen

The wizard ends with:
- ✨ Confirmation of successful setup
- 📋 Next steps (build, restart clients, test)
- 📚 Links to documentation and resources
- 🎉 Happy coding message!

## Validation Rules

The wizard validates all inputs before saving:

| Field | Validation |
|-------|-----------|
| Client ID | Must not be empty |
| Client Secret | Must not be empty |
| Environment | Must be "sandbox" or "production" |
| Redirect URI | Must not be empty |
| User Access Token | Optional, but must start with `v^1.1#` if provided |
| User Refresh Token | Optional, but must start with `v^1.1#` if provided |
| App Access Token | Optional, but must start with `v^1.1#` if provided |

## Keyboard Controls

- **Enter** - Confirm selection or input
- **Arrow Keys** - Navigate select menus
- **Type** - Enter text values
- **Ctrl+C** - Cancel wizard at any time
- **Backspace** - Edit input

## Output: .env File Format

The wizard generates a properly formatted `.env` file with:

```env
###############################################################################
# eBay API MCP Server - Environment Configuration
# Generated: 2025-01-13T12:34:56.789Z
###############################################################################

# ═══════════════════════════════════════════════════════════════════════════
# REQUIRED: eBay API Credentials
# ═══════════════════════════════════════════════════════════════════════════

EBAY_CLIENT_ID=your_value_here
EBAY_CLIENT_SECRET=your_value_here
EBAY_ENVIRONMENT=sandbox
EBAY_REDIRECT_URI=your_value_here

# ═══════════════════════════════════════════════════════════════════════════
# OPTIONAL: User OAuth Tokens (Recommended for high rate limits)
# ═══════════════════════════════════════════════════════════════════════════

EBAY_USER_ACCESS_TOKEN=v^1.1#...
EBAY_USER_REFRESH_TOKEN=v^1.1#...

# ═══════════════════════════════════════════════════════════════════════════
# OPTIONAL: App OAuth Token (Auto-generated if not provided)
# ═══════════════════════════════════════════════════════════════════════════

# EBAY_APP_ACCESS_TOKEN=
```

## Reconfiguration

### Updating Existing Configuration

When you run `npm run setup` with an existing `.env` file:

1. Wizard detects existing configuration
2. Shows warning: "⚠️ Existing configuration detected"
3. Prompts: "Do you want to reconfigure?"
   - **Yes**: Loads existing values as defaults, allows editing
   - **No**: Exits without changes

### Preserving Values

When reconfiguring:
- All existing values are pre-filled in prompts
- Press Enter to keep current value
- Type new value to update
- Token values remain masked for security

## MCP Client Auto-Configuration

After saving configuration, the wizard:

1. **Detects installed MCP clients:**
   - Claude Desktop (macOS, Windows, Linux)
   - Gemini
   - ChatGPT

2. **Offers to run auto-setup:**
   - If clients found: "Run auto-setup to configure MCP clients?"
   - If yes: Automatically runs `npm run auto-setup`
   - If no: Shows manual instructions

3. **Updates client configurations:**
   - Reads your `.env` values
   - Generates proper MCP server configs
   - Updates client config files automatically

## Troubleshooting

### "Setup cancelled by user"

**Cause:** You pressed Ctrl+C during the wizard.

**Solution:** Run `npm run setup` again to restart.

### "Environment validation failed"

**Cause:** Required fields are missing or invalid.

**Solution:** Check error messages and provide valid values.

### "Token should start with v^1.1#"

**Cause:** Invalid token format.

**Solution:** Ensure you copied the complete token from eBay, including the `v^1.1#` prefix.

### "No MCP clients detected"

**Cause:** No supported MCP clients are installed on your system.

**Solution:**
1. Install Claude Desktop, Gemini, or ChatGPT
2. Run `npm run auto-setup` after installation

### Configuration not working

**Cause:** Build directory may be outdated.

**Solution:**
```bash
npm run build
npm run auto-setup
```

## Advanced Usage

### Skip MCP Auto-Setup

If you want to configure MCP clients manually:

1. Select "No" when asked to run auto-setup
2. Follow instructions in [README.md](../README.md#manual-configuration)

### Using with CI/CD

The interactive wizard requires user input, so it's not suitable for CI/CD.

For automated deployments, use environment variables or config management tools to create `.env` file directly, then run:

```bash
npm run auto-setup
```

### Multiple Environments

To manage multiple environments (sandbox, production):

```bash
# Create environment-specific configs
npm run setup  # For primary environment
mv .env .env.production

npm run setup  # For secondary environment
mv .env .env.sandbox

# Use with environment variable
cp .env.production .env
npm run build
```

## Related Documentation

- [OAuth Setup Guide](../OAUTH-SETUP.md) - Detailed OAuth 2.0 setup instructions
- [README.md](../README.md) - Complete project documentation
- [CLAUDE.md](../CLAUDE.md) - Development guide for Claude Code

## Support

If you encounter issues with the interactive setup:

1. Check [Troubleshooting](#troubleshooting) section above
2. Review [GitHub Issues](https://github.com/YosefHayim/ebay-api-mcp-server/issues)
3. Open a new issue with:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node version)

## Contributing

To improve the interactive setup wizard:

1. Source code: `src/scripts/interactive-setup.ts`
2. Follow [Contributing Guidelines](../CONTRIBUTING.md)
3. Test thoroughly before submitting PR

---

**Happy configuring! 🎉**
