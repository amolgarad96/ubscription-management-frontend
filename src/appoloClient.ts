import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: import.meta.env['VITE_API_URL'] as string ?? 'http://localhost:5173/graphql',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      SubscriptionContract: { keyFields: ['id'] },
    },
  }),
});
