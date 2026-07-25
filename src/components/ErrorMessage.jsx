import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-card">
      <AlertCircle size={28} style={{ flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.2rem' }}>
          Unable to Load Weather
        </div>
        <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>{message}</div>
      </div>
      {onRetry && (
        <button
          className="unit-btn active"
          onClick={onRetry}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
        >
          <RotateCcw size={14} /> Retry
        </button>
      )}
    </div>
  );
}
