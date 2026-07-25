import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <div className="glass-panel loading-skeleton" style={{ height: '50px', borderRadius: '30px' }} />
      <div className="glass-panel loading-skeleton" style={{ height: '180px', borderRadius: '24px' }} />
      <div className="glass-panel loading-skeleton" style={{ height: '220px', borderRadius: '24px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div className="glass-panel loading-skeleton" style={{ height: '80px', borderRadius: '16px' }} />
        <div className="glass-panel loading-skeleton" style={{ height: '80px', borderRadius: '16px' }} />
        <div className="glass-panel loading-skeleton" style={{ height: '80px', borderRadius: '16px' }} />
        <div className="glass-panel loading-skeleton" style={{ height: '80px', borderRadius: '16px' }} />
      </div>
    </div>
  );
}
