# eBay API Documentation

This directory contains OpenAPI specifications and documentation for the eBay APIs.

Last updated: **November 11, 2025**

## Directory Structure

```
docs/
├── auth/                           # Authentication documentation
│   ├── manual-token-config.md     # Manual token configuration guide
│   └── oauth_custom.json          # OAuth custom configuration
├── buy-apps/                       # eBay Buy APIs (coming soon)
│   └── readme.md
├── sell-apps/                      # eBay Sell APIs OpenAPI specs
│   ├── account-management/
│   │   └── sell_account_v1_oas3.json
│   ├── analytics-and-report/
│   │   └── sell_analytics_v1_oas3.json
│   ├── communication/
│   │   ├── commerce_feedback_v1_beta_oas3.json
│   │   ├── commerce_message_v1_oas3.json
│   │   ├── commerce_notification_v1_oas3.json
│   │   └── sell_negotiation_v1_oas3.json
│   ├── listing-management/
│   │   └── sell_inventory_v1_oas3.json
│   ├── listing-metadata/
│   │   └── sell_metadata_v1_oas3.json
│   ├── markeitng-and-promotions/
│   │   ├── endpoints-analysis.json
│   │   ├── sell_marketing_v1_oas3.json
│   │   └── sell_recommendation_v1_oas3.json
│   ├── order-management/
│   │   └── sell_fulfillment_v1_oas3.json
│   └── other-apis/
│       ├── commerce_identity_v1_oas3.json
│       ├── commerce_translation_v1_beta_oas3.json
│       ├── commerce_vero_v1_oas3.json
│       ├── sell_compliance_v1_oas3.json
│       ├── sell_edelivery_international_shipping_oas3.json
│       ├── sell_marketing_v1_oas3.json
│       └── sell_recommendation_v1_oas3.json
└── README.md                       # This file
```

## OpenAPI Specifications by Category

All specifications were downloaded from the [eBay Developer Program](https://developer.ebay.com/).

### Account Management
Location: `sell-apps/account-management/`
- `sell_account_v1_oas3.json` - Seller account configuration and policies

### Analytics and Report
Location: `sell-apps/analytics-and-report/`
- `sell_analytics_v1_oas3.json` - Sales analytics and traffic reports

### Communication
Location: `sell-apps/communication/`
- `commerce_feedback_v1_beta_oas3.json` - Buyer-seller feedback system
- `commerce_message_v1_oas3.json` - Buyer-seller messaging
- `commerce_notification_v1_oas3.json` - Notification preferences and settings
- `sell_negotiation_v1_oas3.json` - Offer negotiation (Best Offers)

### Listing Management
Location: `sell-apps/listing-management/`
- `sell_inventory_v1_oas3.json` - Inventory items, offers, and publishing

### Listing Metadata
Location: `sell-apps/listing-metadata/`
- `sell_metadata_v1_oas3.json` - Marketplace policies and compatibility metadata

### Marketing and Promotions
Location: `sell-apps/markeitng-and-promotions/`
- `sell_marketing_v1_oas3.json` - Marketing campaigns and promotions
- `sell_recommendation_v1_oas3.json` - Listing recommendations
- `endpoints-analysis.json` - Marketing endpoints analysis

### Order Management
Location: `sell-apps/order-management/`
- `sell_fulfillment_v1_oas3.json` - Order fulfillment and shipping

### Other APIs
Location: `sell-apps/other-apis/`
- `commerce_identity_v1_oas3.json` - User identity information
- `commerce_translation_v1_beta_oas3.json` - Content translation services
- `commerce_vero_v1_oas3.json` - IP rights enforcement (VERO)
- `sell_compliance_v1_oas3.json` - Listing compliance violations
- `sell_edelivery_international_shipping_oas3.json` - International shipping quotes

## Related Documentation

- **Authentication Setup**: See `auth/manual-token-config.md` for OAuth token configuration
- **OAuth Configuration**: See `auth/oauth_custom.json` for custom OAuth settings
- **Buy APIs**: Coming soon in `buy-apps/`

## Resources

- [eBay Developer Portal](https://developer.ebay.com/)
- [eBay API Documentation](https://developer.ebay.com/docs)
- [OpenAPI Specification](https://swagger.io/specification/)
