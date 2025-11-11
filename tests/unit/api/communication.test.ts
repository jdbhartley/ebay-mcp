import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NegotiationApi } from '../../../src/api/communication/negotiation.js';
import { MessageApi } from '../../../src/api/communication/message.js';
import { FeedbackApi } from '../../../src/api/communication/feedback.js';
import { NotificationApi } from '../../../src/api/communication/notification.js';
import type { EbayApiClient } from '../../../src/api/client.js';

describe('Communication APIs', () => {
  let client: EbayApiClient;

  beforeEach(() => {
    client = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn()
    } as unknown as EbayApiClient;
  });

  describe('NegotiationApi', () => {
    let api: NegotiationApi;

    beforeEach(() => {
      api = new NegotiationApi(client);
    });

    describe('getOffersToBuyers', () => {
      it('should get offers to buyers with filter', async () => {
        const mockResponse = { offers: [] };
        vi.mocked(client.get).mockResolvedValue(mockResponse);

        await api.getOffersToBuyers('filter:test', 10, 0);

        expect(client.get).toHaveBeenCalledWith('/sell/negotiation/v1/offer', {
          filter: 'filter:test',
          limit: 10,
          offset: 0
        });
      });

      it('should handle missing optional parameters', async () => {
        const mockResponse = { offers: [] };
        vi.mocked(client.get).mockResolvedValue(mockResponse);

        await api.getOffersToBuyers();

        expect(client.get).toHaveBeenCalledWith('/sell/negotiation/v1/offer', {});
      });
    });

    describe('sendOfferToInterestedBuyers', () => {
      it('should send offer to interested buyers', async () => {
        const mockResponse = { offerId: '123' };
        const offerData = {
          offeredItems: [{ offerId: '123', price: { value: '10.00', currency: 'USD' } }]
        };
        vi.mocked(client.post).mockResolvedValue(mockResponse);

        await api.sendOfferToInterestedBuyers('offer123', offerData);

        expect(client.post).toHaveBeenCalledWith(
          '/sell/negotiation/v1/offer/offer123/send_offer_to_interested_buyers',
          offerData
        );
      });

      it('should throw error when offerId is missing', async () => {
        await expect(
          api.sendOfferToInterestedBuyers('', {} as any)
        ).rejects.toThrow('offerId is required');
      });

      it('should throw error when offerData is missing', async () => {
        await expect(
          api.sendOfferToInterestedBuyers('offer123', undefined as any)
        ).rejects.toThrow('offerData is required');
      });
    });
  });

  describe('MessageApi', () => {
    let api: MessageApi;

    beforeEach(() => {
      api = new MessageApi(client);
    });

    describe('searchMessages', () => {
      it('should search messages with parameters', async () => {
        const mockResponse = { messages: [] };
        vi.mocked(client.get).mockResolvedValue(mockResponse);

        await api.searchMessages('filter:test', 10, 0);

        expect(client.get).toHaveBeenCalledWith('/commerce/message/v1/message/search', {
          filter: 'filter:test',
          limit: 10,
          offset: 0
        });
      });

      it('should handle missing optional parameters', async () => {
        const mockResponse = { messages: [] };
        vi.mocked(client.get).mockResolvedValue(mockResponse);

        await api.searchMessages();

        expect(client.get).toHaveBeenCalledWith('/commerce/message/v1/message/search', {});
      });
    });

    describe('getMessage', () => {
      it('should get message by ID', async () => {
        const mockResponse = { messageId: '123' };
        vi.mocked(client.get).mockResolvedValue(mockResponse);

        await api.getMessage('msg123');

        expect(client.get).toHaveBeenCalledWith('/commerce/message/v1/message/msg123');
      });

      it('should throw error when messageId is missing', async () => {
        await expect(api.getMessage('')).rejects.toThrow('messageId is required');
      });
    });

    describe('sendMessage', () => {
      it('should send message', async () => {
        const mockResponse = { messageId: '123' };
        const messageData = { messageText: 'Hello', otherPartyUsername: 'buyer123' };
        vi.mocked(client.post).mockResolvedValue(mockResponse);

        await api.sendMessage(messageData);

        expect(client.post).toHaveBeenCalledWith('/commerce/message/v1/message', messageData);
      });

      it('should throw error when messageData is missing', async () => {
        await expect(api.sendMessage(undefined as any)).rejects.toThrow(
          'messageData is required'
        );
      });
    });

    describe('replyToMessage', () => {
      it('should reply to message', async () => {
        const mockResponse = { messageId: '456' };
        vi.mocked(client.post).mockResolvedValue(mockResponse);

        await api.replyToMessage('msg123', 'Reply text');

        expect(client.post).toHaveBeenCalledWith('/commerce/message/v1/message/msg123', {
          messageText: 'Reply text'
        });
      });

      it('should throw error when messageId is missing', async () => {
        await expect(api.replyToMessage('', 'text')).rejects.toThrow(
          'messageId is required'
        );
      });

      it('should throw error when messageContent is missing', async () => {
        await expect(api.replyToMessage('msg123', '')).rejects.toThrow(
          'messageContent is required'
        );
      });
    });
  });

  describe('FeedbackApi', () => {
    let api: FeedbackApi;

    beforeEach(() => {
      api = new FeedbackApi(client);
    });

    describe('getFeedback', () => {
      it('should get feedback for transaction', async () => {
        const mockResponse = { feedback: [] };
        vi.mocked(client.get).mockResolvedValue(mockResponse);

        await api.getFeedback('txn123');

        expect(client.get).toHaveBeenCalledWith('/commerce/feedback/v1_beta/feedback/txn123');
      });

      it('should throw error when transactionId is missing', async () => {
        await expect(api.getFeedback('')).rejects.toThrow('transactionId is required');
      });
    });

    describe('leaveFeedbackForBuyer', () => {
      it('should leave feedback for buyer', async () => {
        const mockResponse = { feedbackId: '123' };
        const feedbackData = {
          orderLineItemId: 'order123',
          rating: 'POSITIVE' as const,
          feedbackText: 'Great buyer!'
        };
        vi.mocked(client.post).mockResolvedValue(mockResponse);

        await api.leaveFeedbackForBuyer(feedbackData);

        expect(client.post).toHaveBeenCalledWith(
          '/commerce/feedback/v1_beta/feedback',
          feedbackData
        );
      });

      it('should throw error when feedbackData is missing', async () => {
        await expect(api.leaveFeedbackForBuyer(undefined as any)).rejects.toThrow(
          'feedbackData is required'
        );
      });
    });

    describe('getFeedbackSummary', () => {
      it('should get feedback summary', async () => {
        const mockResponse = { positive: 100, negative: 0 };
        vi.mocked(client.get).mockResolvedValue(mockResponse);

        await api.getFeedbackSummary();

        expect(client.get).toHaveBeenCalledWith('/commerce/feedback/v1_beta/feedback/summary');
      });
    });
  });

  describe('NotificationApi', () => {
    let api: NotificationApi;

    beforeEach(() => {
      api = new NotificationApi(client);
    });

    describe('getNotificationConfig', () => {
      it('should get notification configuration', async () => {
        const mockResponse = { config: {} };
        vi.mocked(client.get).mockResolvedValue(mockResponse);

        await api.getNotificationConfig();

        expect(client.get).toHaveBeenCalledWith(
          '/commerce/notification/v1/notification_config'
        );
      });
    });

    describe('updateNotificationConfig', () => {
      it('should update notification configuration', async () => {
        const mockResponse = { success: true };
        const config = { deliveryConfigs: [] };
        vi.mocked(client.put).mockResolvedValue(mockResponse);

        await api.updateNotificationConfig(config);

        expect(client.put).toHaveBeenCalledWith(
          '/commerce/notification/v1/notification_config',
          config
        );
      });

      it('should throw error when config is missing', async () => {
        await expect(api.updateNotificationConfig(undefined as any)).rejects.toThrow(
          'config is required'
        );
      });
    });

    describe('createNotificationDestination', () => {
      it('should create notification destination', async () => {
        const mockResponse = { destinationId: '123' };
        const destination = {
          name: 'webhook',
          endpoint: 'https://example.com/webhook',
          verificationToken: 'token123'
        };
        vi.mocked(client.post).mockResolvedValue(mockResponse);

        await api.createNotificationDestination(destination);

        expect(client.post).toHaveBeenCalledWith(
          '/commerce/notification/v1/destination',
          destination
        );
      });

      it('should throw error when destination is missing', async () => {
        await expect(api.createNotificationDestination(undefined as any)).rejects.toThrow(
          'destination is required'
        );
      });
    });
  });
});
