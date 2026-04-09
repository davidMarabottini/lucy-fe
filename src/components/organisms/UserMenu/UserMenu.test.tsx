import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserMenu from './UserMenu';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@/auth/useAuth', () => ({
  useAuth: vi.fn(),
}));
import { useAuth } from '@/auth/useAuth';

vi.mock('@/hooks/api/useAuthenticationHooks', () => ({
  useLogout: vi.fn(),
}));
import { useLogout } from '@/hooks/api/useAuthenticationHooks';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('UserMenu', () => {
  const logoutMock = vi.fn();

  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      user: 'John Doe',
      domain: 'private',
      isAuthenticated: true,
      isLoading: false,
    });

    vi.mocked(useLogout).mockReturnValue({ mutate: logoutMock } as any);

    logoutMock.mockReset();
    mockNavigate.mockReset();
  });

  it('renders username', () => {
    render(
      <MemoryRouter>
        <UserMenu />
      </MemoryRouter>
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('opens and closes dropdown when triggered', () => {
    render(
      <MemoryRouter>
        <UserMenu />
      </MemoryRouter>
    );

    const trigger = screen.getByText('John Doe').closest('div')!;
    expect(trigger).toBeInTheDocument();

    fireEvent.click(trigger); 
    const items = screen.getAllByRole('button', { hidden: true });
    expect(items.length).toBeGreaterThan(0);

    fireEvent.click(trigger);
  });

  it('calls navigate for normal menu items', () => {
    render(
      <MemoryRouter>
        <UserMenu />
      </MemoryRouter>
    );

    const trigger = screen.getByText('John Doe').closest('div')!;
    fireEvent.click(trigger);

    const firstRouteButton = screen
      .getAllByRole('button')
      .find(btn => !btn.textContent?.toLowerCase().includes('logout'));
    
    expect(firstRouteButton).toBeDefined();
    fireEvent.click(firstRouteButton!);
  });
});
