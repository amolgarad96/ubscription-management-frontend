import { useState } from 'react';
import type { SubscriptionContract } from '../../types.js';
import { StatusBadge } from './StatusBadge.js';
import { CancelModal } from './CancelModal.js';
import { usePauseSubscription, useResumeSubscription, useSkipDelivery, useCancelSubscription } from '../../hooks/useSubscriptions.js';

interface SubscriptionCardProps {
  contract: SubscriptionContract;
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatFrequency(freq: SubscriptionContract['billingFrequency']): string {
  const interval = freq.interval.toLowerCase();
  return freq.intervalCount === 1
    ? `Every ${interval}`
    : `Every ${freq.intervalCount} ${interval}s`;
}

export function SubscriptionCard({ contract }: SubscriptionCardProps) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const { pause, loading: pausing } = usePauseSubscription();
  const { resume, loading: resuming } = useResumeSubscription();
  const { skip, loading: skipping } = useSkipDelivery();
  const { cancel, loading: cancelling } = useCancelSubscription();

  const handleAction = async (action: () => Promise<void>) => {
    setActionError(null);
    try {
      await action();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const isAnyLoading = pausing || resuming || skipping || cancelling;

  return (
    <>
      <article
        aria-label={`Subscription ${contract.id}`}
        style={{
          background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12,
          padding: 24, display: 'flex', flexDirection: 'column', gap: 16,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
              {contract.lineItems.map((li) => li.title).join(', ')}
            </h3>
            <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: 13 }}>
              {formatFrequency(contract.billingFrequency)}
            </p>
          </div>
          <StatusBadge status={contract.status} />
        </div>

        {/* Line items */}
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {contract.lineItems.map((item) => (
            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#374151' }}>
              <span>{item.title}{item.variantTitle != null ? ` — ${item.variantTitle}` : ''} × {item.quantity}</span>
              <span style={{ fontWeight: 500 }}>{item.totalPrice.currencyCode} {item.totalPrice.amount}</span>
            </li>
          ))}
        </ul>

        {/* Billing info */}
        <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
          <dt style={{ fontSize: 12, color: '#9ca3af', gridColumn: 1 }}>Next billing</dt>
          <dd style={{ fontSize: 13, fontWeight: 500, margin: 0, gridColumn: 2 }}>{formatDate(contract.nextBillingDate)}</dd>
          <dt style={{ fontSize: 12, color: '#9ca3af', gridColumn: 1 }}>Shipping to</dt>
          <dd style={{ fontSize: 13, fontWeight: 500, margin: 0, gridColumn: 2 }}>
            {contract.shippingAddress.city}, {contract.shippingAddress.country}
          </dd>
        </dl>

        {/* Error */}
        {actionError != null && (
          <p role="alert" style={{ color: '#dc2626', fontSize: 13, margin: 0, padding: '8px 12px', background: '#fef2f2', borderRadius: 6 }}>
            {actionError}
          </p>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {contract.status === 'ACTIVE' && (
            <>
              <ActionButton
                onClick={() => handleAction(() => pause(contract.id))}
                disabled={isAnyLoading}
                loading={pausing}
                label="Pause"
              />
              <ActionButton
                onClick={() => handleAction(() => skip(contract.id))}
                disabled={isAnyLoading}
                loading={skipping}
                label="Skip next"
              />
              <ActionButton
                onClick={() => setShowCancelModal(true)}
                disabled={isAnyLoading}
                loading={false}
                label="Cancel"
                variant="danger"
              />
            </>
          )}
          {contract.status === 'PAUSED' && (
            <>
              <ActionButton
                onClick={() => handleAction(() => resume(contract.id))}
                disabled={isAnyLoading}
                loading={resuming}
                label="Resume"
                variant="primary"
              />
              <ActionButton
                onClick={() => setShowCancelModal(true)}
                disabled={isAnyLoading}
                loading={false}
                label="Cancel"
                variant="danger"
              />
            </>
          )}
        </div>
      </article>

      {showCancelModal && (
        <CancelModal
          contractId={contract.id}
          onConfirm={async (reason) => {
            await handleAction(() => cancel(contract.id, reason));
            setShowCancelModal(false);
          }}
          onClose={() => setShowCancelModal(false)}
          isLoading={cancelling}
        />
      )}
    </>
  );
}

interface ActionButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  label: string;
  variant?: 'default' | 'primary' | 'danger';
}

function ActionButton({ onClick, disabled, loading, label, variant = 'default' }: ActionButtonProps) {
  const styles: Record<string, React.CSSProperties> = {
    default: { background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' },
    primary: { background: '#16a34a', color: '#fff', border: 'none' },
    danger: { background: '#fff', color: '#dc2626', border: '1px solid #fca5a5' },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-busy={loading}
      style={{
        padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1,
        ...styles[variant],
      }}
    >
      {loading ? `${label}…` : label}
    </button>
  );
}
