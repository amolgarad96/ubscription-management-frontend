import { gql } from '@apollo/client';

export const CONTRACT_FIELDS = gql`
  fragment ContractFields on SubscriptionContract {
    id
    status
    nextBillingDate
    createdAt
    updatedAt
    billingFrequency {
      intervalCount
      interval
    }
    lineItems {
      id
      title
      variantTitle
      quantity
      unitPrice { amount currencyCode }
      totalPrice { amount currencyCode }
      sku
    }
    shippingAddress {
      firstName lastName address1 address2
      city province zip country
    }
  }
`;

export const GET_SUBSCRIPTIONS = gql`
  ${CONTRACT_FIELDS}
  query GetSubscriptions($customerId: ID!) {
    subscriptions(customerId: $customerId) {
      ...ContractFields
    }
  }
`;

export const GET_SUBSCRIPTION = gql`
  ${CONTRACT_FIELDS}
  query GetSubscription($id: ID!) {
    subscription(id: $id) {
      ...ContractFields
    }
  }
`;
