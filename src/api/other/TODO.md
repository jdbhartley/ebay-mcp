# TODO for src/api/other

This file tracks the implementation status of the APIs in `src/api/other`.

## Missing Endpoints

### eDelivery API (`edelivery.ts`)
- [ ] `getActualCosts`
- [ ] `getAddressPreferences`
- [ ] `createAddressPreference`
- [ ] `getAgents`
- [ ] `getBatteryQualifications`
- [ ] `cancelBundle`
- [ ] `createBundle`
- [ ] `getBundle`
- [ ] `getBundleLabel`
- [ ] `createComplaint`
- [ ] `getConsignPreferences`
- [ ] `createConsignPreference`
- [ ] `getDropoffSites`
- [ ] `getHandoverSheet`
- [ ] `getLabels`
- [ ] `bulkCancelPackages`
- [ ] `bulkConfirmPackages`
- [ ] `bulkDeletePackages`
- [ ] `cancelPackage`
- [ ] `clonePackage`
- [ ] `confirmPackage`
- [ ] `createPackage`
- [ ] `getPackage`
- [ ] `updateCodValue`
- [ ] `updateInsurance`
- [ ] `updateLabelFormat`
- [ ] `updatePackageWeight`
- [ ] `updatePickupSlot`
- [ ] `updateReturnAddress`
- [ ] `updateShippingService`
- [ ] `getPickupAccounts`
- [ ] `getPickupSlots`
- [ ] `getRdc`
- [ ] `getServiceOptions`
- [ ] `getShippingServices`
- [ ] `getTracking`
- [ ] `getTrackingEvents`
- [ ] `getWallets`

### VERO API (`vero.ts`)
- [ ] `getVeroReasonCode`
- [ ] `getVeroReasonCodes`
- [ ] `getVeroReport`

## Implemented Endpoints

### Compliance API (`compliance.ts`)
- `getListingViolations`
- `getListingViolationsSummary`
- `suppressViolation` (Note: not found in the OpenAPI spec)

### eDelivery API (`edelivery.ts`)
- `createShippingQuote`
- `getShippingQuote`

### Identity API (`identity.ts`)
- `getUser`

### Translation API (`translation.ts`)
- `translate`

### VERO API (`vero.ts`)
- `reportInfringement` (corresponds to `createVeroReport`)
- `getReportedItems` (corresponds to `getVeroReportItems`)

## Improvements
- Input Validation
- Error Handling
- Testing
