import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DisputeApi } from '../../../src/api/order-management/dispute.js';
import { TaxonomyApi } from '../../../src/api/listing-metadata/taxonomy.js';
import { RecommendationApi } from '../../../src/api/marketing-and-promotions/recommendation.js';
import { ComplianceApi } from '../../../src/api/other/compliance.js';
import { VeroApi } from '../../../src/api/other/vero.js';
import { TranslationApi } from '../../../src/api/other/translation.js';
import { EDeliveryApi } from '../../../src/api/other/edelivery.js';
import { IdentityApi } from '../../../src/api/other/identity.js';
import type { EbayApiClient } from '../../../src/api/client.js';

describe('Other APIs', () => {
  let client: EbayApiClient;

  beforeEach(() => {
    client = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn()
    } as unknown as EbayApiClient;
  });

  describe('DisputeApi', () => {
    let api: DisputeApi;

    beforeEach(() => {
      api = new DisputeApi(client);
    });

    it('should get disputes with filter', async () => {
      const mockResponse = { disputes: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getDisputes('filter:test', 10);

      expect(client.get).toHaveBeenCalledWith('/sell/fulfillment/v1/order/dispute', {
        filter: 'filter:test',
        limit: 10
      });
    });

    it('should get dispute by ID', async () => {
      const mockResponse = { disputeId: 'DISPUTE123' };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getDispute('DISPUTE123');

      expect(client.get).toHaveBeenCalledWith('/sell/fulfillment/v1/order/dispute/DISPUTE123');
    });

    it('should throw error when disputeId is missing', async () => {
      await expect(api.getDispute('')).rejects.toThrow('disputeId is required');
    });

    it('should update dispute', async () => {
      vi.mocked(client.put).mockResolvedValue(undefined);

      await api.updateDispute('DISPUTE123', { evidence: {}, submit: true });

      expect(client.put).toHaveBeenCalledWith(
        '/sell/fulfillment/v1/order/dispute/DISPUTE123',
        { evidence: {}, submit: true }
      );
    });

    it('should throw error when update data is missing', async () => {
      await expect(api.updateDispute('DISPUTE123', undefined as any)).rejects.toThrow(
        'disputeData is required'
      );
    });
  });

  describe('TaxonomyApi', () => {
    let api: TaxonomyApi;

    beforeEach(() => {
      api = new TaxonomyApi(client);
    });

    it('should get default category tree ID', async () => {
      const mockResponse = { categoryTreeId: '0' };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getDefaultCategoryTreeId('EBAY_US');

      expect(client.get).toHaveBeenCalledWith(
        '/commerce/taxonomy/v1/get_default_category_tree_id',
        { marketplace_id: 'EBAY_US' }
      );
    });

    it('should throw error when marketplace ID is missing', async () => {
      await expect(api.getDefaultCategoryTreeId('')).rejects.toThrow(
        'marketplaceId is required'
      );
    });

    it('should get category tree', async () => {
      const mockResponse = { rootCategoryNode: {} };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getCategoryTree('0');

      expect(client.get).toHaveBeenCalledWith('/commerce/taxonomy/v1/category_tree/0');
    });

    it('should get category suggestions', async () => {
      const mockResponse = { categorySuggestions: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getCategorySuggestions('0', 'iPhone');

      expect(client.get).toHaveBeenCalledWith(
        '/commerce/taxonomy/v1/category_tree/0/get_category_suggestions',
        { q: 'iPhone' }
      );
    });

    it('should get item aspects for category', async () => {
      const mockResponse = { aspects: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getItemAspectsForCategory('0', '123');

      expect(client.get).toHaveBeenCalledWith(
        '/commerce/taxonomy/v1/category_tree/0/get_item_aspects_for_category/123'
      );
    });
  });

  describe('RecommendationApi', () => {
    let api: RecommendationApi;

    beforeEach(() => {
      api = new RecommendationApi(client);
    });

    it('should find listing recommendations', async () => {
      const mockResponse = { listingRecommendations: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.findListingRecommendations('filter:test', 10, 0);

      expect(client.get).toHaveBeenCalledWith('/sell/recommendation/v1/find', {
        filter: 'filter:test',
        limit: 10,
        offset: 0
      });
    });
  });

  describe('ComplianceApi', () => {
    let api: ComplianceApi;

    beforeEach(() => {
      api = new ComplianceApi(client);
    });

    it('should get listing violations', async () => {
      const mockResponse = { listingViolations: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getListingViolations('PRODUCT_ADOPTION', 10, 0);

      expect(client.get).toHaveBeenCalledWith(
        '/sell/compliance/v1/listing_violation',
        {
          compliance_type: 'PRODUCT_ADOPTION',
          limit: 10,
          offset: 0
        }
      );
    });

    it('should throw error when compliance type is missing', async () => {
      await expect(api.getListingViolations('', 10, 0)).rejects.toThrow(
        'complianceType is required'
      );
    });

    it('should get listing violations summary', async () => {
      const mockResponse = { violationSummaries: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getListingViolationsSummary('PRODUCT_ADOPTION');

      expect(client.get).toHaveBeenCalledWith(
        '/sell/compliance/v1/listing_violation_summary',
        { compliance_type: 'PRODUCT_ADOPTION' }
      );
    });

    it('should suppress violation', async () => {
      vi.mocked(client.post).mockResolvedValue(undefined);

      await api.suppressViolation('VIOLATION123');

      expect(client.post).toHaveBeenCalledWith(
        '/sell/compliance/v1/suppress_violation',
        { listing_violation_id: 'VIOLATION123' }
      );
    });

    it('should throw error when violation ID is missing', async () => {
      await expect(api.suppressViolation('')).rejects.toThrow(
        'listingViolationId is required'
      );
    });
  });

  describe('VeroApi', () => {
    let api: VeroApi;

    beforeEach(() => {
      api = new VeroApi(client);
    });

    it('should report infringement', async () => {
      const mockResponse = { reportId: 'REPORT123' };
      const infringementData = {
        itemId: 'ITEM123',
        reportingReason: 'TRADEMARK'
      };
      vi.mocked(client.post).mockResolvedValue(mockResponse);

      await api.reportInfringement(infringementData);

      expect(client.post).toHaveBeenCalledWith(
        '/sell/compliance/v1/vero_report_items',
        infringementData
      );
    });

    it('should throw error when infringement data is missing', async () => {
      await expect(api.reportInfringement(undefined as any)).rejects.toThrow(
        'infringementData is required'
      );
    });

    it('should get reported items', async () => {
      const mockResponse = { items: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getReportedItems('filter:test', 10, 0);

      expect(client.get).toHaveBeenCalledWith('/sell/compliance/v1/vero_report_items', {
        filter: 'filter:test',
        limit: 10,
        offset: 0
      });
    });
  });

  describe('TranslationApi', () => {
    let api: TranslationApi;

    beforeEach(() => {
      api = new TranslationApi(client);
    });

    it('should translate text', async () => {
      const mockResponse = { translations: [] };
      vi.mocked(client.post).mockResolvedValue(mockResponse);

      await api.translate('en', 'es', 'ITEM_TITLE', ['Hello']);

      expect(client.post).toHaveBeenCalledWith('/commerce/translation/v1_beta/translate', {
        from: 'en',
        to: 'es',
        translationContext: 'ITEM_TITLE',
        text: ['Hello']
      });
    });

    it('should throw error when from language is missing', async () => {
      await expect(api.translate('', 'es', 'ITEM_TITLE', ['Hello'])).rejects.toThrow(
        'from is required'
      );
    });

    it('should throw error when to language is missing', async () => {
      await expect(api.translate('en', '', 'ITEM_TITLE', ['Hello'])).rejects.toThrow(
        'to is required'
      );
    });

    it('should throw error when translation context is missing', async () => {
      await expect(api.translate('en', 'es', '', ['Hello'])).rejects.toThrow(
        'translationContext is required'
      );
    });

    it('should throw error when text is missing', async () => {
      await expect(api.translate('en', 'es', 'ITEM_TITLE', [])).rejects.toThrow(
        'text array is required'
      );
    });
  });

  describe('EDeliveryApi', () => {
    let api: EDeliveryApi;

    beforeEach(() => {
      api = new EDeliveryApi(client);
    });

    it('should create shipping quote', async () => {
      const mockResponse = { quoteId: 'QUOTE123' };
      const shippingQuoteRequest = {
        packageDetails: { weight: { value: 1, unit: 'kg' } },
        shipFrom: { country: 'US' },
        shipTo: { country: 'CA' }
      };
      vi.mocked(client.post).mockResolvedValue(mockResponse);

      await api.createShippingQuote(shippingQuoteRequest);

      expect(client.post).toHaveBeenCalledWith(
        '/sell/logistics/v1/shipping_quote',
        shippingQuoteRequest
      );
    });

    it('should get shipping quote', async () => {
      const mockResponse = { quoteId: 'QUOTE123' };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getShippingQuote('QUOTE123');

      expect(client.get).toHaveBeenCalledWith('/sell/logistics/v1/shipping_quote/QUOTE123');
    });
  });

  describe('IdentityApi', () => {
    let api: IdentityApi;

    beforeEach(() => {
      api = new IdentityApi(client);
    });

    it('should get user identity', async () => {
      const mockResponse = { userId: 'USER123' };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getUser();

      expect(client.get).toHaveBeenCalledWith('/commerce/identity/v1/user');
    });

    it('should handle errors when getting user', async () => {
      vi.mocked(client.get).mockRejectedValue(new Error('Unauthorized'));

      await expect(api.getUser()).rejects.toThrow('Unauthorized');
    });
  });
});
