
import { useSubscriptions } from '../hooks/useSubscriptions';
import { SubscriptionCard } from '../Component/SubscriptionCard';

export function Dashboard() {
  const { data, loading, error } = useSubscriptions();
console.log("dataaaaa",data)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500"
        aria-live="polite" aria-busy="true">
        <p className="text-base animate-pulse">Loading your subscriptions…</p>
      </div>
    )
  }

  if (error != null) {
    return (
      <div role="alert" className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-base">
          ⚠️ Failed to load subscriptions: {error.message}
        </p>
      </div>
    );
  }

  const contracts = data?.subscriptions ?? [];

  return (
    <main className="max-w-2xl mx-auto px-5 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Subscriptions</h1>
        <p className="mt-1.5 text-sm text-gray-500">
          {contracts.length === 0
            ? 'No subscriptions found.'
            : `${contracts.length} subscription${contracts.length !== 1 ? 's' : ''}`}
        </p>
      </header>

      {contracts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <p className="text-base">You don't have any active subscriptions yet.</p>
        </div>
      ) : (
        <section className="flex flex-col gap-5" aria-label="Subscription list">
          {contracts.map((contract) => (
            <SubscriptionCard key={contract.id} contract={contract} />
          ))}
        </section>
      )}
    </main>
  );
}