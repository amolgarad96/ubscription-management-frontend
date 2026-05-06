import { useSubscriptions } from '../hooks/useSubscriptions';
import { SubscriptionCard } from '../Component/Subscription/SubscriptionCard';
import { SubscriptionCardSkeleton } from '../Component/Subscription/SubscriptionCardSkeleton';

export function Subscriptions() {
  const { data, loading, error } = useSubscriptions();

  if (loading) return <SubscriptionCardSkeleton />
  if (error) return <p>Error: {error.message}</p>;

  const contracts = data?.subscriptions ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Subscriptions</h1>

      <div className="flex flex-col gap-5">
        {contracts.map((contract) => (
          <SubscriptionCard key={contract.id} contract={contract} />
        ))}
      </div>
    </div>
  );
}