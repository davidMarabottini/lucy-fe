import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HamSpamTable from './HamSpamTable';

vi.mock('lucide-react', () => ({
  ShieldCheck: () => <svg data-testid="shield-check-icon" />,
  ShieldAlert: () => <svg data-testid="shield-alert-icon" />,
}));

describe('HamSpamTable', () => {
  it('should render children content', () => {
    render(
      <HamSpamTable ham={10} spam={2}>
        <h3>Table Title</h3>
      </HamSpamTable>
    );

    expect(screen.getByText('Table Title')).toBeInTheDocument();
  });

  it('should display ham and spam values with labels', () => {
    render(
      <HamSpamTable ham={5} spam={3}>
        <span>Header</span>
      </HamSpamTable>
    );

    expect(screen.getByText(/5 Ham/i)).toBeInTheDocument();
    expect(screen.getByText(/3 Spam/i)).toBeInTheDocument();

    expect(screen.getByTestId('shield-check-icon')).toBeInTheDocument();
    expect(screen.getByTestId('shield-alert-icon')).toBeInTheDocument();
  });
});
