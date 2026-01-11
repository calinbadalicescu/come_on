import { render, screen } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

import App from '../App.jsx';

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ status: 'ok' })
    })));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the hero headline', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /local farmers collective/i })
    ).toBeInTheDocument();
  });

  it('shows API status after health check', async () => {
    render(<App />);

    expect(await screen.findByText(/api online/i)).toBeInTheDocument();
  });
});
