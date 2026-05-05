// import {
//   GET_SUBSCRIPTIONS,
//   GET_SUBSCRIPTION,
// } from '../graphql/queries.js';
// import {
//   PAUSE_SUBSCRIPTION,
//   RESUME_SUBSCRIPTION,
//   SKIP_DELIVERY,
//   CANCEL_SUBSCRIPTION,
// } from '../graphql/mutation.js';
// import type { SubscriptionContract } from '../types.js';
// import { useMutation, useQuery } from '@apollo/client/react';

// const CUSTOMER_ID = import.meta.env['VITE_CUSTOMER_ID'] as string ?? 'cust_001';

// // Helper to extract userErrors and throw if any
// function assertNoUserErrors(
//   errors: Array<{ field: string | null; message: string; code: string }>,
// ): void {
//   if (errors.length > 0) {
//     throw new Error(errors.map((e) => e.message).join(', '));
//   }
// }

// export function useSubscriptions() {
//   return useQuery<{ subscriptions: SubscriptionContract[] }>(GET_SUBSCRIPTIONS, {
//     variables: { customerId: CUSTOMER_ID },
//   });
// }

// export function useSubscription(id: string) {
//   return useQuery<{ subscription: SubscriptionContract | null }>(GET_SUBSCRIPTION, {
//     variables: { id },
//   });
// }

// export function usePauseSubscription() {
//   const [mutate, state] = useMutation(PAUSE_SUBSCRIPTION);
//   const pause = async (subscriptionId: string, resumeDate?: string) => {
//     const { data } = await mutate({
//       variables: { input: { subscriptionId, resumeDate: resumeDate ?? null } },
//     });
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     assertNoUserErrors(data?.pauseSubscription?.userErrors ?? []);
//   };
//   return { pause, ...state };
// }

// export function useResumeSubscription() {
//   const [mutate, state] = useMutation(RESUME_SUBSCRIPTION);
//   const resume = async (subscriptionId: string) => {
//     const { data } = await mutate({ variables: { subscriptionId } });
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     assertNoUserErrors(data?.resumeSubscription?.userErrors ?? []);
//   };
//   return { resume, ...state };
// }

// export function useSkipDelivery() {
//   const [mutate, state] = useMutation(SKIP_DELIVERY);
//   const skip = async (subscriptionId: string) => {
//     const { data } = await mutate({ variables: { subscriptionId } });
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     assertNoUserErrors(data?.skipNextDelivery?.userErrors ?? []);
//   };
//   return { skip, ...state };
// }

// export function useCancelSubscription() {
//   const [mutate, state] = useMutation(CANCEL_SUBSCRIPTION);
//   const cancel = async (subscriptionId: string, reason?: string) => {
//     const { data } = await mutate({
//       variables: { input: { subscriptionId, reason: reason ?? null } },
//     });
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     assertNoUserErrors(data?.cancelSubscription?.userErrors ?? []);
//   };
//   return { cancel, ...state };
// }

import { useMutation, useQuery } from '@apollo/client/react';
import { GET_SUBSCRIPTIONS, GET_SUBSCRIPTION } from '../graphql/queries';
import { PAUSE_SUBSCRIPTION, RESUME_SUBSCRIPTION, SKIP_DELIVERY, CANCEL_SUBSCRIPTION } from '../graphql/mutation';
import type { SubscriptionContract } from '../types';

const CUSTOMER_ID = import.meta.env['VITE_CUSTOMER_ID'] as string ?? 'cust_001';

interface UserError {
  field: string | null;
  message: string;
  code: string;
}

interface ContractMutationResult {
  contract: SubscriptionContract;
  userErrors: UserError[];
}

interface PauseResult    { pauseSubscription:    ContractMutationResult }
interface ResumeResult   { resumeSubscription:   ContractMutationResult }
interface SkipResult     { skipNextDelivery:      ContractMutationResult }
interface CancelResult   { cancelSubscription:   ContractMutationResult }

function assertNoUserErrors(errors: UserError[]): void {
  if (errors.length > 0) {
    throw new Error(errors.map((e) => e.message).join(', '));
  }
}

export function useSubscriptions() {
  return useQuery<{ subscriptions: SubscriptionContract[] }>(GET_SUBSCRIPTIONS, {
    variables: { customerId: CUSTOMER_ID },
  });
}

export function useSubscription(id: string) {
  return useQuery<{ subscription: SubscriptionContract | null }>(GET_SUBSCRIPTION, {
    variables: { id },
  });
}

export function usePauseSubscription() {
  const [mutate, state] = useMutation<PauseResult>(PAUSE_SUBSCRIPTION);
  const pause = async (subscriptionId: string, resumeDate?: string) => {
    const { data } = await mutate({
      variables: { input: { subscriptionId, resumeDate: resumeDate ?? null } },
    });
    assertNoUserErrors(data?.pauseSubscription?.userErrors ?? []);
  };
  return { pause, ...state };
}

export function useResumeSubscription() {
  const [mutate, state] = useMutation<ResumeResult>(RESUME_SUBSCRIPTION);
  const resume = async (subscriptionId: string) => {
    const { data } = await mutate({ variables: { subscriptionId } });
    assertNoUserErrors(data?.resumeSubscription?.userErrors ?? []);
  };
  return { resume, ...state };
}

export function useSkipDelivery() {
  const [mutate, state] = useMutation<SkipResult>(SKIP_DELIVERY);
  const skip = async (subscriptionId: string) => {
    const { data } = await mutate({ variables: { subscriptionId } });
    assertNoUserErrors(data?.skipNextDelivery?.userErrors ?? []);
  };
  return { skip, ...state };
}

export function useCancelSubscription() {
  const [mutate, state] = useMutation<CancelResult>(CANCEL_SUBSCRIPTION);
  const cancel = async (subscriptionId: string, reason?: string) => {
    const { data } = await mutate({
      variables: { input: { subscriptionId, reason: reason ?? null } },
    });
    assertNoUserErrors(data?.cancelSubscription?.userErrors ?? []);
  };
  return { cancel, ...state };
}