/**
 * Marketing API Response Types
 * Based on: docs/sell-apps/markeitng-and-promotions/sell_marketing_v1_oas3.json
 */

import type {
  CampaignBudgetRequest,
  CampaignCriterion,
  FundingStrategy,
  ItemPromotion,
} from './marketing-api-types.js';

/**
 * Error container
 */
export interface Error {
  /**
   * The category of the error
   */
  category?: string;
  /**
   * The domain of the error
   */
  domain?: string;
  /**
   * The error ID
   */
  errorId?: number;
  /**
   * Input parameters related to the error
   */
  inputRefIds?: string[];
  /**
   * The long message describing the error
   */
  longMessage?: string;
  /**
   * The short message describing the error
   */
  message?: string;
  /**
   * Output reference IDs
   */
  outputRefIds?: string[];
  /**
   * Parameters associated with the error
   */
  parameters?: ErrorParameter[];
  /**
   * The subdomain of the error
   */
  subdomain?: string;
}

/**
 * Error parameter
 */
export interface ErrorParameter {
  /**
   * The name of the parameter
   */
  name?: string;
  /**
   * The value of the parameter
   */
  value?: string;
}

/**
 * Base response with warnings
 */
export interface BaseResponse {
  /**
   * Warning error messages (non-fatal)
   */
  warnings?: Error[];
}

/**
 * Campaign alert
 */
export interface Alert {
  /**
   * Alert message
   */
  alertMessage?: string;
  /**
   * Alert severity (INFO, WARNING, ERROR)
   */
  alertSeverity?: string;
}

/**
 * Campaign entity
 */
export interface Campaign {
  /**
   * Alerts associated with the campaign
   */
  alerts?: Alert[];
  /**
   * Budget allocated for the campaign
   */
  budget?: CampaignBudgetRequest;
  /**
   * Campaign selection criterion
   */
  campaignCriterion?: CampaignCriterion;
  /**
   * Unique identifier of the campaign
   */
  campaignId?: string;
  /**
   * Seller-defined name of the campaign
   */
  campaignName?: string;
  /**
   * Campaign status (RUNNING, PAUSED, ENDED, etc.)
   */
  campaignStatus?: string;
  /**
   * Targeting type (MANUAL or SMART)
   */
  campaignTargetingType?: string;
  /**
   * Channels where the campaign runs (ON_SITE, OFF_SITE)
   */
  channels?: string[];
  /**
   * Campaign end date (ISO 8601 format)
   */
  endDate?: string;
  /**
   * Funding strategy for the campaign
   */
  fundingStrategy?: FundingStrategy;
  /**
   * Marketplace ID where the campaign is hosted
   */
  marketplaceId?: string;
  /**
   * Campaign start date (ISO 8601 format)
   */
  startDate?: string;
}

/**
 * Paged collection of campaigns
 */
export interface CampaignPagedCollectionResponse {
  /**
   * Array of campaigns
   */
  campaigns?: Campaign[];
  /**
   * URI of the current page
   */
  href?: string;
  /**
   * Maximum number of campaigns per page
   */
  limit?: number;
  /**
   * URI to the next page
   */
  next?: string;
  /**
   * Number of results skipped
   */
  offset?: number;
  /**
   * URI to the previous page
   */
  prev?: string;
  /**
   * Total number of campaigns
   */
  total?: number;
}

/**
 * Item promotion response (extends ItemPromotion)
 */
export interface ItemPromotionResponse extends ItemPromotion {
  /**
   * Unique identifier of the promotion
   */
  promotionId?: string;
  /**
   * Promotion href
   */
  promotionHref?: string;
}

/**
 * Paged collection of item promotions
 */
export interface ItemPromotionsPagedCollection {
  /**
   * Array of item promotions
   */
  itemPromotions?: ItemPromotionResponse[];
  /**
   * URI of the current page
   */
  href?: string;
  /**
   * Maximum number of promotions per page
   */
  limit?: number;
  /**
   * URI to the next page
   */
  next?: string;
  /**
   * Number of results skipped
   */
  offset?: number;
  /**
   * URI to the previous page
   */
  prev?: string;
  /**
   * Total number of promotions
   */
  total?: number;
}
