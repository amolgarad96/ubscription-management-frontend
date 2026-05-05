import { useState, useRef, useEffect } from 'react';

interface CancelModalProps {
  contractId: string;
  onConfirm: (reason: string) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}

export function CancelModal({ contractId: _contractId, onConfirm, onClose, isLoading }: CancelModalProps) {
  const [reason, setReason] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);

  // Trap focus inside modal for accessibility
  useEffect(() => {
    const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
      'button, textarea, [tabindex]',
    );
    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cancel-modal-title"
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={dialogRef}
        style={{
          background: '#fff', borderRadius: 12, padding: 32,
          maxWidth: 440, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}
      >
        <h2 id="cancel-modal-title" style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700 }}>
          Cancel subscription?
        </h2>
        <p style={{ color: '#6b7280', margin: '0 0 20px', fontSize: 14 }}>
          This action cannot be undone. You'll lose access to your subscription benefits.
        </p>

        <label htmlFor="cancel-reason" style={{ fontSize: 14, fontWeight: 500, display: 'block', marginBottom: 6 }}>
          Reason (optional)
        </label>
        <textarea
          id="cancel-reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Tell us why you're cancelling..."
          rows={3}
          style={{
            width: '100%', boxSizing: 'border-box', borderRadius: 8,
            border: '1px solid #d1d5db', padding: '8px 12px',
            fontSize: 14, resize: 'vertical', marginBottom: 20, fontFamily: 'inherit',
          }}
        />

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            disabled={isLoading}
            style={{
              padding: '8px 18px', borderRadius: 8, border: '1px solid #d1d5db',
              background: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 500,
            }}
          >
            Keep subscription
          </button>
          <button
            onClick={() => void onConfirm(reason)}
            disabled={isLoading}
            aria-label="Confirm cancellation"
            style={{
              padding: '8px 18px', borderRadius: 8, border: 'none',
              background: '#dc2626', color: '#fff', cursor: 'pointer',
              fontSize: 14, fontWeight: 600, opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? 'Cancelling…' : 'Yes, cancel it'}
          </button>
        </div>
      </div>
    </div>
  );
}
