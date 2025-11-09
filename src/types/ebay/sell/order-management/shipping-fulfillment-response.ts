/**
 * Shipping fulfillment response types
 * Based on: docs/sell-apps/order-management/sell_fulfillment_v1_oas3.json
 */

import type { Error } from './get-orders-response.js';
import type { LineItemReference } from './fulfillment-api-types.js';

/**
 * Shipping fulfillment details
 */
export interface ShippingFulfillment {
  /**
   * The unique identifier of the fulfillment
   */
  fulfillmentId?: string;
  /**
   * Line items included in this fulfillment
   */
  lineItems?: LineItemReference[];
  /**
   * The tracking number provided by the shipping carrier
   */
  shipmentTrackingNumber?: string;
  /**
   * The date and time the fulfillment package was shipped (ISO 8601 format)
   */
  shippedDate?: string;
  /**
   * The unique identifier of the shipping carrier
   */
  shippingCarrierCode?: string;
}

/**
 * Paged collection of shipping fulfillments
 */
export interface ShippingFulfillmentPagedCollection {
  /**
   * Array of fulfillments for the order
   */
  fulfillments?: ShippingFulfillment[];
  /**
   * Total number of fulfillments in the order
   */
  total?: number;
  /**
   * Warnings or errors
   */
  warnings?: Error[];
}

/**
 * Refund response
 */
export interface Refund {
  /**
   * The unique identifier of the order refund
   */
  refundId?: string;
  /**
   * The status of the refund operation (PENDING, FAILED, etc.)
   */
  refundStatus?: string;
}
