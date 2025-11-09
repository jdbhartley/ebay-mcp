# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is an MCP (Model Context Protocol) server that provides AI assistants with access to eBay's Sell APIs. The server exposes 50+ MCP tools covering inventory management, order fulfillment, marketing campaigns, analytics, and more.

## Commands

### Building and Running

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Type checking (no emit)
npm run typecheck

# Development mode with hot reload
npm run dev

# Production mode
npm start

# Watch mode for development
npm run watch

# Clean build artifacts
npm run clean
```

### Testing with MCP

To test the server locally, run it in dev mode and connect through an MCP client (Claude Desktop, Claude Code, etc.). The server communicates via stdio.

## Architecture

### High-Level Structure

The codebase follows a layered architecture:

1. **MCP Server Layer** (`src/index.ts`): Entry point that implements the MCP protocol, handling tool listing and execution
2. **API Facade** (`src/api/index.ts`): `EbaySellerApi` class that provides a unified interface to all eBay API categories
3. **API Category Handlers** (`src/api/*`): Specialized classes for each eBay API domain (Account, Inventory, Fulfillment, etc.)
4. **HTTP Client** (`src/api/client.ts`): Base `EbayApiClient` with automatic OAuth token management via request interceptors
5. **Tool Definitions** (`src/tools/`): MCP tool schemas and execution logic that map to API methods
6. **Authentication** (`src/auth/oauth.ts`): OAuth 2.0 client credentials flow with automatic token refresh

### Key Design Patterns

**Automatic OAuth Token Management**: The `EbayApiClient` uses axios interceptors to automatically inject fresh access tokens into every request. Tokens are cached and refreshed 60 seconds before expiry.

**API Facade Pattern**: The `EbaySellerApi` class aggregates all API category handlers (account, inventory, fulfillment, etc.) into a single interface, initialized once with shared client configuration.

**Tool-to-API Mapping**: The `executeTool()` function in `src/tools/index.ts` acts as a central dispatcher, mapping MCP tool names to API method calls with argument transformation.

### Environment Configuration

Environment variables are loaded via dotenv and accessed through `src/config/environment.ts`:

- `EBAY_CLIENT_ID` (required): Application client ID from eBay Developer Portal
- `EBAY_CLIENT_SECRET` (required): Application client secret
- `EBAY_ENVIRONMENT` (default: sandbox): Either "sandbox" or "production"
- `EBAY_REDIRECT_URI` (optional): OAuth redirect URI

The server will fail to start if required credentials are missing.

### Type Organization

TypeScript types are organized to mirror eBay's API structure:

- `src/types/ebay.ts`: Core types (EbayConfig, EbayApiError, etc.)
- `src/types/ebay/sell/*`: Organized by eBay API category and operation
  - Account Management policies (fulfillment, payment, return, custom)
  - Inventory API types (inventory items, offers, locations)
  - Order Management types (fulfillment, orders)
  - Marketing and Promotions types
  - Analytics and reporting types

Many types are auto-generated from eBay's OpenAPI specs located in the `docs/` directory.

### API Categories

The codebase implements handlers for these eBay API categories:

**Core Selling**:
- Account (`AccountApi`): Fulfillment, payment, return, and custom policies
- Inventory (`InventoryApi`): Inventory items, offers, publishing
- Fulfillment (`FulfillmentApi`): Orders, shipping fulfillments
- Marketing (`MarketingApi`): Campaigns and promotions
- Recommendation (`RecommendationApi`): Listing improvement recommendations
- Analytics (`AnalyticsApi`): Traffic reports, seller standards, customer service metrics

**Supporting**:
- Metadata (`MetadataApi`): Category and item condition policies
- Taxonomy (`TaxonomyApi`): Category trees, suggestions, item aspects
- Negotiation (`NegotiationApi`): Best Offers to buyers
- Message (`MessageApi`): Buyer-seller messaging
- Notification (`NotificationApi`): Notification configuration
- Feedback (`FeedbackApi`): Transaction feedback
- Identity (`IdentityApi`): User verification
- Compliance (`ComplianceApi`): Listing violations
- Vero (`VeroApi`): IP protection/infringement reporting
- Translation (`TranslationApi`): Multi-language support
- EDelivery (`EDeliveryApi`): International shipping quotes

### MCP Tool Execution Flow

1. AI client calls MCP tool (e.g., `ebay_get_inventory_items`)
2. MCP server receives request in `src/index.ts` via `CallToolRequestSchema` handler
3. `executeTool()` is called with the API facade, tool name, and arguments
4. Tool dispatcher maps to appropriate API method (e.g., `api.inventory.getInventoryItems()`)
5. API handler constructs eBay API endpoint and calls `client.get/post/put/delete`
6. `EbayApiClient` interceptor injects OAuth token before request
7. Response or error is formatted and returned to AI client

### Error Handling

- **Authentication errors**: Caught at OAuth client level and wrapped with descriptive messages
- **eBay API errors**: Response interceptor extracts `longMessage` or `message` from eBay's error format
- **MCP errors**: Wrapped in `McpError` with appropriate error codes (InvalidRequest for auth, InternalError for others)

## Development Notes

### Adding New eBay API Endpoints

1. Add method to appropriate API category handler (e.g., `src/api/listing-management/inventory.ts`)
2. Add corresponding types to `src/types/ebay/sell/...`
3. Add tool definition to `src/tools/tool-definitions.ts` in the appropriate category array
4. Add case to the switch statement in `src/tools/index.ts` `executeTool()` function

### TypeScript Configuration

The project uses strict TypeScript with:
- ES2022 target and lib
- Node16 module resolution (ESM with .js extensions in imports)
- Strict mode enabled with all strict checks
- Source maps and declarations generated

All imports must include `.js` extension (TypeScript ESM convention), even for `.ts` files.

### OAuth Scopes

The server uses client credentials flow with the base scope `https://api.ebay.com/oauth/api_scope`. Ensure your eBay application has the required scopes enabled in the Developer Portal:
- `sell.account` for account management
- `sell.inventory` for inventory operations
- `sell.fulfillment` for order management
- Additional scopes as needed per API category
