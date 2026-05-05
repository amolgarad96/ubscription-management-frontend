import { gql } from '@apollo/client';
import { CONTRACT_FIELDS } from './queries';

export const PAUSE_SUBSCRIPTION = gql`
  ${CONTRACT_FIELDS}
  mutation PauseSubscription($input: PauseSubscriptionInput!) {
    pauseSubscription(input: $input) {
      contract { ...ContractFields }
      userErrors { field message code }
    }
  }
`;

export const RESUME_SUBSCRIPTION = gql`
  ${CONTRACT_FIELDS}
  mutation ResumeSubscription($subscriptionId: ID!) {
    resumeSubscription(subscriptionId: $subscriptionId) {
      contract { ...ContractFields }
      userErrors { field message code }
    }
  }
`;

export const SKIP_DELIVERY = gql`
  ${CONTRACT_FIELDS}
  mutation SkipNextDelivery($subscriptionId: ID!) {
    skipNextDelivery(subscriptionId: $subscriptionId) {
      contract { ...ContractFields }
      userErrors { field message code }
    }
  }
`;

export const CANCEL_SUBSCRIPTION = gql`
  ${CONTRACT_FIELDS}
  mutation CancelSubscription($input: CancelSubscriptionInput!) {
    cancelSubscription(input: $input) {
      contract { ...ContractFields }
      userErrors { field message code }
    }
  }
`;
