import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';

vi.mock('@/auth/useAuth', () => ({
  useAuth: vi.fn(),
}));
import { useAuth } from '@/auth/useAuth';

const mockUseAuth = (isAuthenticated: boolean) => {
  (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
    isAuthenticated,
    user: isAuthenticated ? 'JohnDoe' : null,
    domain: 'private',
    id: 1,
    role: [],
    isLoading: false,
  });
};

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Breadcrumb />
    </MemoryRouter>
  );

describe('Breadcrumb Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when the user is not authenticated', () => {
    mockUseAuth(false);
    const { container } = renderAt('/');
    expect(container).toBeEmptyDOMElement();
  });

  it('shows only Home on the home page', () => {
    mockUseAuth(true);
    renderAt('/');
    expect(screen.getByText('labels.home')).toBeInTheDocument();
    expect(screen.queryByText('labels.contractList')).not.toBeInTheDocument();
  });

  it('builds Home > Section > Detail on a section view route', () => {
    mockUseAuth(true);
    renderAt('/contracts');
    expect(screen.getByText('labels.home')).toBeInTheDocument();
    expect(screen.getByText('labels.contractList')).toBeInTheDocument();
  });

  it('builds a nested trail for the contract set-details route', () => {
    mockUseAuth(true);
    renderAt('/contracts/42/set');
    expect(screen.getByText('labels.home')).toBeInTheDocument();
    expect(screen.getByText('labels.contractList')).toBeInTheDocument();
    expect(screen.getByText('labels.contractDetail')).toBeInTheDocument();
    expect(screen.getByText('labels.contractSetDetails')).toBeInTheDocument();
  });
});
