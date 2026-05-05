import type { SubscriptionStatus } from '../types'
const STATUS_CONFIG: Record<SubscriptionStatus, { label: string; color: string }> = {
  ACTIVE: { label: 'Active', color: '#166534' },
  PAUSED: { label: 'Paused', color: '#854d0e' },
  CANCELLED: { label: 'Cancelled', color: '#991b1b' },
  FAILED: { label: 'Failed', color: '#7c3aed' },
  EXPIRED: { label: 'Expired', color: '#374151' },
};

const STATUS_BG: Record<SubscriptionStatus, string> = {
  ACTIVE: '#dcfce7',
  PAUSED: '#fef9c3',
  CANCELLED: '#fee2e2',
  FAILED: '#ede9fe',
  EXPIRED: '#f3f4f6',
};

interface StatusBadgeProps {
  status: SubscriptionStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      style={{
        background: STATUS_BG[status],
        color: config.color,
        padding: '2px 10px',
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.02em',
      }}
    >
      {config.label}
    </span>
  );
}
