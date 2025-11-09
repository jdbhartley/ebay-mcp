import type {
  EbayOfferDetailsWithKeys,
  InventoryItem,
} from '../../types/ebay/sell/listingManagement/inventoryAPI/inventory-api-global-types.js';
import type { GetInventoryItemResponse } from '../../types/ebay/sell/listingManagement/inventoryAPI/inventory-item/get-inventory-item.js';
import type { GetInventoryItemsResponse } from '../../types/ebay/sell/listingManagement/inventoryAPI/inventory-item/get-inventory-items.js';
import type { CreateOfferResponse } from '../../types/ebay/sell/listingManagement/inventoryAPI/offer/create-offer.js';
import type { GetOffersResponse } from '../../types/ebay/sell/listingManagement/inventoryAPI/offer/get-offers.js';
import type { PublishResponse } from '../../types/ebay/sell/listingManagement/inventoryAPI/offer/publish-offer.js';
import { EbayApiClient } from '../client.js';

/**
 * Inventory API - Manage listings and inventory
 * Based on: docs/sell-apps/listing-management/sell_inventory_v1_oas3.json
 */
export class InventoryApi {
  private readonly basePath = '/sell/inventory/v1';

  constructor(private client: EbayApiClient) {}

  /**
   * Get all inventory items
   */
  async getInventoryItems(limit?: number, offset?: number): Promise<GetInventoryItemsResponse> {
    const params: Record<string, number> = {};
    if (limit) params.limit = limit;
    if (offset) params.offset = offset;
    return this.client.get<GetInventoryItemsResponse>(`${this.basePath}/inventory_item`, params);
  }

  /**
   * Get a specific inventory item
   */
  async getInventoryItem(sku: string): Promise<GetInventoryItemResponse> {
    return this.client.get<GetInventoryItemResponse>(`${this.basePath}/inventory_item/${sku}`);
  }

  /**
   * Create or replace an inventory item
   */
  async createOrReplaceInventoryItem(sku: string, inventoryItem: InventoryItem): Promise<void> {
    return this.client.put<void>(`${this.basePath}/inventory_item/${sku}`, inventoryItem);
  }

  /**
   * Delete an inventory item
   */
  async deleteInventoryItem(sku: string): Promise<void> {
    return this.client.delete<void>(`${this.basePath}/inventory_item/${sku}`);
  }

  /**
   * Get all offers
   */
  async getOffers(sku?: string, marketplaceId?: string, limit?: number): Promise<GetOffersResponse> {
    const params: Record<string, string | number> = {};
    if (sku) params.sku = sku;
    if (marketplaceId) params.marketplace_id = marketplaceId;
    if (limit) params.limit = limit;
    return this.client.get<GetOffersResponse>(`${this.basePath}/offer`, params);
  }

  /**
   * Create an offer
   */
  async createOffer(offer: EbayOfferDetailsWithKeys): Promise<CreateOfferResponse> {
    return this.client.post<CreateOfferResponse>(`${this.basePath}/offer`, offer);
  }

  /**
   * Publish an offer
   */
  async publishOffer(offerId: string): Promise<PublishResponse> {
    return this.client.post<PublishResponse>(`${this.basePath}/offer/${offerId}/publish`);
  }
}
