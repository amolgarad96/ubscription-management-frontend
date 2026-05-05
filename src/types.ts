// src/types.ts

export type SubscriptionStatus = 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'FAILED' | 'EXPIRED';

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface LineItem {
  id: string;
  title: string;
  variantTitle: string | null;
  quantity: number;
  unitPrice: MoneyV2;
  totalPrice: MoneyV2;
  sku: string | null;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string | null;
  city: string;
  province: string;
  zip: string;
  country: string;
}

export interface BillingFrequency {
  intervalCount: number;
  interval: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
}

export interface SubscriptionContract {
  id: string;
  status: SubscriptionStatus;
  nextBillingDate: string | null;
  createdAt: string;
  updatedAt: string;
  billingFrequency: BillingFrequency;
  lineItems: LineItem[];
  shippingAddress: ShippingAddress;
}