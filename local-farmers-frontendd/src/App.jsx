import { useCallback, useEffect, useMemo, useState } from 'react';

const buildApiBase = () => {
  const raw = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  return raw.replace(/\/$/, '');
};

const initialStatus = {
  state: 'idle',
  label: 'API status not checked',
  checkedAt: null,
};

const marketHighlights = [
  {
    title: 'Weekly harvest box',
    description: 'Curated produce from farms within 50km. Reserve by Friday noon.',
  },
  {
    title: 'Cold storage availability',
    description: 'Shared lockers for dairy and greens, bookable by the hour.',
  },
  {
    title: 'Bulk order requests',
    description: 'Coordinate restaurants and co-ops for seasonal volume deals.',
  },
];

const communitySignals = [
  { label: 'Open farm stands', value: '12' },
  { label: 'Active growers', value: '48' },
  { label: 'Pickup points', value: '7' },
];

function App() {
  const apiBase = useMemo(() => buildApiBase(), []);
  const [status, setStatus] = useState(initialStatus);

  const runHealthCheck = useCallback(async (signal) => {
    setStatus({
      state: 'loading',
      label: 'Checking API connectivity',
      checkedAt: null,
    });

    try {
      const response = await fetch(`${apiBase}/health`, {
        signal,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const label = data.status === 'ok' ? 'API online' : 'API degraded';

      setStatus({
        state: 'ok',
        label,
        checkedAt: new Date().toLocaleTimeString(),
      });
    } catch (error) {
      if (signal?.aborted) {
        return;
      }

      setStatus({
        state: 'error',
        label: 'API offline',
        checkedAt: new Date().toLocaleTimeString(),
      });
    }
  }, [apiBase]);

  useEffect(() => {
    const controller = new AbortController();
    runHealthCheck(controller.signal);
    return () => controller.abort();
  }, [runHealthCheck]);

  const handleRefresh = () => {
    const controller = new AbortController();
    runHealthCheck(controller.signal);
  };

  const statusClass =
    status.state === 'ok'
      ? 'status status-ok'
      : status.state === 'error'
      ? 'status status-error'
      : 'status status-loading';

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-content">
          <p className="eyebrow">Seasonal, traceable, neighbor-grown</p>
          <h1>Local Farmers Collective</h1>
          <p className="lead">
            A curated network for fresh produce, transparent supply, and direct
            connections between growers and customers.
          </p>
          <div className="cta-row">
            <a className="button primary" href="#markets">
              Browse markets
            </a>
            <a className="button ghost" href="#partners">
              Become a vendor
            </a>
          </div>
        </div>
        <div className="hero-card">
          <div className={statusClass} aria-live="polite">
            {status.label}
          </div>
          <p className="muted">API base: {apiBase}</p>
          <p className="muted">
            {status.checkedAt
              ? `Last checked at ${status.checkedAt}`
              : 'Running first health check'}
          </p>
          <button
            className="button secondary"
            type="button"
            onClick={handleRefresh}
            disabled={status.state === 'loading'}
          >
            {status.state === 'loading' ? 'Checking...' : 'Refresh status'}
          </button>
        </div>
      </header>

      <section className="grid" id="markets">
        {communitySignals.map((signal) => (
          <article className="card" key={signal.label}>
            <p className="card-value">{signal.value}</p>
            <p className="card-label">{signal.label}</p>
          </article>
        ))}
      </section>

      <section className="split">
        <div>
          <h2>Today&apos;s market highlights</h2>
          <p className="muted">
            Keep buyers informed and growers aligned with a single source of
            truth for local availability.
          </p>
        </div>
        <div className="stack">
          {marketHighlights.map((highlight, index) => (
            <article
              className="list-card"
              key={highlight.title}
              style={{ '--delay': `${index * 120}ms` }}
            >
              <h3>{highlight.title}</h3>
              <p className="muted">{highlight.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel" id="partners">
        <div>
          <h2>Built for grower success</h2>
          <p>
            Manage pickups, send updates to loyal customers, and keep product
            availability synchronized across channels.
          </p>
        </div>
        <div className="panel-grid">
          <div>
            <p className="panel-label">Response time</p>
            <p className="panel-value">&lt; 2 hours</p>
          </div>
          <div>
            <p className="panel-label">Order accuracy</p>
            <p className="panel-value">98%</p>
          </div>
          <div>
            <p className="panel-label">Pickup windows</p>
            <p className="panel-value">3 per day</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Local Farmers Collective - Built for community-powered food systems.</p>
      </footer>
    </div>
  );
}

export default App;
