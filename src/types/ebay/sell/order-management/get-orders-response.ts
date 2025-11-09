/**
 * GET /sell/fulfillment/v1/order
 * Response types for getting orders
 */

import type { SimpleAmount } from './fulfillment-api-types.js';

/**
 * Error container for API responses
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
 * Buyer information
 */
export interface Buyer {
  /**
   * The eBay user ID of the buyer
   */
  username?: string;
  /**
   * The tax address of the buyer (for tax calculations)
   */
  taxAddress?: TaxAddress;
  /**
   * Tax identifier of the buyer
   */
  taxIdentifier?: TaxIdentifier;
}

/**
 * Tax address
 */
export interface TaxAddress {
  /**
   * City
   */
  city?: string;
  /**
   * Two-letter ISO 3166-1 country code
   */
  countryCode?: string;
  /**
   * County
   */
  county?: string;
  /**
   * Postal code
   */
  postalCode?: string;
  /**
   * State or province
   */
  stateOrProvince?: string;
}

/**
 * Tax identifier
 */
export interface TaxIdentifier {
  /**
   * The taxpayer ID
   */
  taxpayerId?: string;
  /**
   * The tax identifier type
   */
  taxIdentifierType?: string;
  /**
   * The issuing authority
   */
  issuingCountry?: string;
}

/**
 * Order line item
 */
export interface LineItem {
  /**
   * Unique identifier of the line item
   */
  lineItemId?: string;
  /**
   * Legacy item ID (for compatibility)
   */
  legacyItemId?: string;
  /**
   * Legacy transaction ID
   */
  legacyTransactionId?: string;
  /**
   * SKU associated with the line item
   */
  sku?: string;
  /**
   * Title of the item
   */
  title?: string;
  /**
   * Line item cost breakdown
   */
  lineItemCost?: LineItemCost;
  /**
   * Quantity purchased
   */
  quantity?: number;
  /**
   * Fulfillment status of the line item
   */
  lineItemFulfillmentStatus?: string;
  /**
   * Listing marketplace ID
   */
  listingMarketplaceId?: string;
  /**
   * Item location
   */
  itemLocation?: ItemLocation;
  /**
   * Properties of the item
   */
  properties?: NameValuePair[];
  /**
   * Taxes applied to the line item
   */
  taxes?: Tax[];
  /**
   * eBay collect and remit tax
   */
  ebayCollectAndRemitTaxes?: EbayCollectAndRemitTax[];
  /**
   * Delivery cost
   */
  deliveryCost?: DeliveryCost;
  /**
   * Applied promotions
   */
  appliedPromotions?: AppliedPromotion[];
  /**
   * Gift details
   */
  giftDetails?: GiftDetails;
}

/**
 * Line item cost
 */
export interface LineItemCost {
  /**
   * Subtotal for the line item
   */
  subtotal?: SimpleAmount;
  /**
   * Total cost for the line item
   */
  total?: SimpleAmount;
  /**
   * Discounts applied
   */
  discountAmount?: SimpleAmount;
}

/**
 * Item location
 */
export interface ItemLocation {
  /**
   * Two-letter ISO 3166-1 country code
   */
  countryCode?: string;
  /**
   * Location description
   */
  location?: string;
  /**
   * Postal code
   */
  postalCode?: string;
}

/**
 * Name-value pair
 */
export interface NameValuePair {
  /**
   * Name
   */
  name?: string;
  /**
   * Value
   */
  value?: string;
}

/**
 * Tax
 */
export interface Tax {
  /**
   * Tax amount
   */
  amount?: SimpleAmount;
  /**
   * Tax type
   */
  taxType?: string;
}

/**
 * eBay collect and remit tax
 */
export interface EbayCollectAndRemitTax {
  /**
   * Tax amount
   */
  amount?: SimpleAmount;
  /**
   * eBay reference
   */
  ebayReference?: EbayTaxReference;
  /**
   * Tax type
   */
  taxType?: string;
  /**
   * Collection method
   */
  collectionMethod?: string;
}

/**
 * eBay tax reference
 */
export interface EbayTaxReference {
  /**
   * Name of the tax
   */
  name?: string;
  /**
   * Value/ID of the tax
   */
  value?: string;
}

/**
 * Delivery cost
 */
export interface DeliveryCost {
  /**
   * Shipping cost
   */
  shippingCost?: SimpleAmount;
  /**
   * Shipping intermediation fee
   */
  shippingIntermediationFee?: SimpleAmount;
  /**
   * Import charges
   */
  importCharges?: SimpleAmount;
}

/**
 * Applied promotion
 */
export interface AppliedPromotion {
  /**
   * Description of the promotion
   */
  description?: string;
  /**
   * Discount amount
   */
  discountAmount?: SimpleAmount;
  /**
   * Promotion ID
   */
  promotionId?: string;
}

/**
 * Gift details
 */
export interface GiftDetails {
  /**
   * Gift message
   */
  message?: string;
  /**
   * Recipient email
   */
  recipientEmail?: string;
  /**
   * Sender name
   */
  senderName?: string;
}

/**
 * Payment summary
 */
export interface PaymentSummary {
  /**
   * Payments made
   */
  payments?: Payment[];
  /**
   * Refunds issued
   */
  refunds?: OrderRefund[];
  /**
   * Total due from buyer
   */
  totalDueSeller?: SimpleAmount;
}

/**
 * Payment
 */
export interface Payment {
  /**
   * Amount paid
   */
  amount?: SimpleAmount;
  /**
   * Payment date
   */
  paymentDate?: string;
  /**
   * Payment method
   */
  paymentMethod?: string;
  /**
   * Payment reference ID
   */
  paymentReferenceId?: string;
  /**
   * Payment status
   */
  paymentStatus?: string;
}

/**
 * Order refund
 */
export interface OrderRefund {
  /**
   * Refund amount
   */
  amount?: SimpleAmount;
  /**
   * Refund date
   */
  refundDate?: string;
  /**
   * Refund ID
   */
  refundId?: string;
  /**
   * Refund reference ID
   */
  refundReferenceId?: string;
  /**
   * Refund status
   */
  refundStatus?: string;
}

/**
 * Pricing summary
 */
export interface PricingSummary {
  /**
   * Adjustment amount
   */
  adjustment?: SimpleAmount;
  /**
   * Delivery cost
   */
  deliveryCost?: SimpleAmount;
  /**
   * Delivery discount
   */
  deliveryDiscount?: SimpleAmount;
  /**
   * Fee amount
   */
  fee?: SimpleAmount;
  /**
   * Price discount subtotal
   */
  priceDiscountSubtotal?: SimpleAmount;
  /**
   * Price subtotal
   */
  priceSubtotal?: SimpleAmount;
  /**
   * Tax amount
   */
  tax?: SimpleAmount;
  /**
   * Total amount
   */
  total?: SimpleAmount;
}

/**
 * Fulfillment start instructions
 */
export interface FulfillmentStartInstruction {
  /**
   * eBay supported fulfillment
   */
  ebaySupportedFulfillment?: boolean;
  /**
   * Final destination address
   */
  finalDestinationAddress?: Address;
  /**
   * Fulfillment instructions type
   */
  fulfillmentInstructionsType?: string;
  /**
   * Maximum wait time for pickup
   */
  maxEstimatedDeliveryDate?: string;
  /**
   * Minimum estimated delivery date
   */
  minEstimatedDeliveryDate?: string;
  /**
   * Shipping step
   */
  shippingStep?: ShippingStep;
}

/**
 * Address
 */
export interface Address {
  /**
   * Address line 1
   */
  addressLine1?: string;
  /**
   * Address line 2
   */
  addressLine2?: string;
  /**
   * City
   */
  city?: string;
  /**
   * Two-letter ISO 3166-1 country code
   */
  countryCode?: string;
  /**
   * County
   */
  county?: string;
  /**
   * Postal code
   */
  postalCode?: string;
  /**
   * Recipient name
   */
  fullName?: string;
  /**
   * State or province
   */
  stateOrProvince?: string;
  /**
   * Primary phone
   */
  primaryPhone?: Phone;
}

/**
 * Phone
 */
export interface Phone {
  /**
   * Country calling code
   */
  countryCode?: string;
  /**
   * Phone number
   */
  number?: string;
}

/**
 * Shipping step
 */
export interface ShippingStep {
  /**
   * Ship to address
   */
  shipTo?: Address;
  /**
   * Shipping carrier code
   */
  shippingCarrierCode?: string;
  /**
   * Shipping service code
   */
  shippingServiceCode?: string;
}

/**
 * Program information
 */
export interface Program {
  /**
   * Program type
   */
  programType?: string;
}

/**
 * Cancel status
 */
export interface CancelStatus {
  /**
   * Cancelled date
   */
  cancelledDate?: string;
  /**
   * Cancel reason
   */
  cancelReason?: string;
  /**
   * Cancel state
   */
  cancelState?: string;
  /**
   * Cancel requests
   */
  cancelRequests?: CancelRequest[];
}

/**
 * Cancel request
 */
export interface CancelRequest {
  /**
   * Cancel completion date
   */
  cancelCompletedDate?: string;
  /**
   * Cancel initiator
   */
  cancelInitiator?: string;
  /**
   * Cancel reason
   */
  cancelReason?: string;
  /**
   * Cancel request ID
   */
  cancelRequestId?: string;
  /**
   * Cancel request state
   */
  cancelRequestState?: string;
}

/**
 * eBay collect and remit tax for order
 */
export interface EbayCollectAndRemitTaxOrder {
  /**
   * Amount
   */
  amount?: SimpleAmount;
  /**
   * eBay reference
   */
  ebayReference?: EbayTaxReference;
  /**
   * Tax type
   */
  taxType?: string;
  /**
   * Collection method
   */
  collectionMethod?: string;
}

/**
 * Order entity
 */
export interface Order {
  /**
   * Buyer information
   */
  buyer?: Buyer;
  /**
   * Buyer checkout notes
   */
  buyerCheckoutNotes?: string;
  /**
   * Cancel status
   */
  cancelStatus?: CancelStatus;
  /**
   * Order creation date (ISO 8601 format)
   */
  creationDate?: string;
  /**
   * eBay collect and remit taxes
   */
  ebayCollectAndRemitTax?: boolean;
  /**
   * Array of fulfillment HREFs
   */
  fulfillmentHrefs?: string[];
  /**
   * Fulfillment start instructions
   */
  fulfillmentStartInstructions?: FulfillmentStartInstruction[];
  /**
   * Last modified date (ISO 8601 format)
   */
  lastModifiedDate?: string;
  /**
   * Line items in the order
   */
  lineItems?: LineItem[];
  /**
   * Order fulfillment status
   */
  orderFulfillmentStatus?: string;
  /**
   * Unique eBay order ID
   */
  orderId?: string;
  /**
   * Order payment status
   */
  orderPaymentStatus?: string;
  /**
   * Payment summary
   */
  paymentSummary?: PaymentSummary;
  /**
   * Pricing summary
   */
  pricingSummary?: PricingSummary;
  /**
   * Program information
   */
  program?: Program;
  /**
   * Sales record reference (legacy)
   */
  salesRecordReference?: string;
  /**
   * Seller's eBay user ID
   */
  sellerId?: string;
  /**
   * Total fee basis amount
   */
  totalFeeBasisAmount?: SimpleAmount;
  /**
   * Total marketplace fee
   */
  totalMarketplaceFee?: SimpleAmount;
}

/**
 * Paged collection of orders
 */
export interface OrderSearchPagedCollection {
  /**
   * The URI of the getOrders call request that produced the current page
   */
  href?: string;
  /**
   * Maximum number of orders returned per page (default: 50)
   */
  limit?: number;
  /**
   * URI to view the next page of results
   */
  next?: string;
  /**
   * Number of results skipped before listing the first result (zero-based)
   */
  offset?: number;
  /**
   * Array of orders in the current result set
   */
  orders?: Order[];
  /**
   * URI for the previous result set
   */
  prev?: string;
  /**
   * Total number of orders matching the input criteria
   */
  total?: number;
  /**
   * Warnings or errors
   */
  warnings?: Error[];
}
