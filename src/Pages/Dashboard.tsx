// import { useSubscriptions } from '../hooks/useSubscriptions.js';
// import { SubscriptionCard } from '../components/SubscriptionCard.js';

// export function Dashboard() {
//   const { data, loading, error } = useSubscriptions();

//   if (loading) {
//     return (
      
//       <div style={{ textAlign: 'center', padding: 60, color: '#6b7280' }} aria-live="polite" aria-busy="true">
//         <p>Loading your subscriptions…</p>
//       </div>
//     );
//   }

//   if (error != null) {
//     return (
//       <div role="alert" style={{ textAlign: 'center', padding: 60, color: '#dc2626' }}>
//         <p>⚠️ Failed to load subscriptions: {error.message}</p>
//       </div>
//     );
//   }

//   const contracts = data?.subscriptions ?? [];

//   return (
//     <main style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
//       <header style={{ marginBottom: 32 }}>
//         <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>My Subscriptions</h1>
//         <p style={{ margin: '6px 0 0', color: '#6b7280' }}>
//           {contracts.length === 0 ? 'No subscriptions found.' : `${contracts.length} subscription${contracts.length !== 1 ? 's' : ''}`}
//         </p>
//       </header>

//       {contracts.length === 0 ? (
//         <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
//           <p style={{ fontSize: 16 }}>You don't have any active subscriptions yet.</p>
//         </div>
//       ) : (
//         <section
//           aria-label="Subscription list"
//           style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
//         >
//           {contracts.map((contract) => (
//             <SubscriptionCard key={contract.id} contract={contract} />
//           ))}
//         </section>
//       )}
//     </main>
//   );
// }

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