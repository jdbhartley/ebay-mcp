import type {
  CreateCampaignRequest,
  ItemPromotion,
} from '../../types/ebay/sell/marketing-and-promotions/marketing-api-types.js';
import type {
  BaseResponse,
  Campaign,
  CampaignPagedCollectionResponse,
  ItemPromotionsPagedCollection,
} from '../../types/ebay/sell/marketing-and-promotions/marketing-response-types.js';
import { EbayApiClient } from '../client.js';

/**
 * Marketing API - Marketing campaigns and promotions
 * Based on: docs/sell-apps/marketing-and-promotions/sell_marketing_v1_oas3.json
 */
export class MarketingApi {
  private readonly basePath = '/sell/marketing/v1';

  constructor(private client: EbayApiClient) {}

  /**
   * Get campaigns
   */
  async getCampaigns(
    campaignStatus?: string,
    marketplaceId?: string,
    limit?: number
  ): Promise<CampaignPagedCollectionResponse> {
    const params: Record<string, string | number> = {};
    if (campaignStatus) params.campaign_status = campaignStatus;
    if (marketplaceId) params.marketplace_id = marketplaceId;
    if (limit) params.limit = limit;
    return this.client.get<CampaignPagedCollectionResponse>(`${this.basePath}/ad_campaign`, params);
  }

  /**
   * Get a specific campaign
   */
  async getCampaign(campaignId: string): Promise<Campaign> {
    return this.client.get<Campaign>(`${this.basePath}/ad_campaign/${campaignId}`);
  }

  /**
   * Create a campaign
   */
  async createCampaign(campaign: CreateCampaignRequest): Promise<BaseResponse> {
    return this.client.post<BaseResponse>(`${this.basePath}/ad_campaign`, campaign);
  }

  /**
   * Get promotions
   */
  async getPromotions(marketplaceId?: string, limit?: number): Promise<ItemPromotionsPagedCollection> {
    const params: Record<string, string | number> = {};
    if (marketplaceId) params.marketplace_id = marketplaceId;
    if (limit) params.limit = limit;
    return this.client.get<ItemPromotionsPagedCollection>(`${this.basePath}/promotion`, params);
  }

  /**
   * Create a promotion (item promotion)
   */
  async createPromotion(promotion: ItemPromotion): Promise<BaseResponse> {
    return this.client.post<BaseResponse>(`${this.basePath}/item_promotion`, promotion);
  }
}
