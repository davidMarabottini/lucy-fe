import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

// =================== MOCKS ===================

vi.mock('@/zustand/menuState', async () => {
  const actual = await vi.importActual('@/zustand/menuState');
  return {
    ...actual,
    useMenuStore: vi.fn(),
  };
});
import { useMenuStore } from '@/zustand/menuState';

vi.mock('@/auth/useAuth', () => ({
  useAuth: vi.fn(),
}));
import { useAuth } from '@/auth/useAuth';

vi.mock('@/hooks/api/useAuthenticationHooks', () => ({
  useLogout: () => ({ mutate: vi.fn() }),
}));

// =================== UTILITY ===================
const mockUseAuth = (authState: Partial<ReturnType<typeof useAuth>> = {}) => {
  (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
    isAuthenticated: false,
    user: null,
    domain: 'public',
    id: 0,
    role: [],
    isLoading: false,
    ...authState,
  });
};

const mockUseMenuStore = (state: { menuOpen: boolean; openMenu: () => void }) => {
  (useMenuStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(state);
};

// =================== TESTS ===================
describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('OpenMenuBtn renders and calls openMenu on click', () => {
    const openMenuMock = vi.fn();
    mockUseMenuStore({ menuOpen: false, openMenu: openMenuMock });
    mockUseAuth();

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /common:header.actions.openMenu/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(openMenuMock).toHaveBeenCalled();
  });

  it('does NOT render UserMenu when not authenticated', () => {
    mockUseMenuStore({ menuOpen: false, openMenu: vi.fn() });
    mockUseAuth();

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument();
  });

  it('renders UserMenu when authenticated', () => {
    mockUseMenuStore({ menuOpen: false, openMenu: vi.fn() });
    mockUseAuth({ isAuthenticated: true, user: 'John Doe', domain: 'private' });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});


vi.mock('@/zustand/menuState', async () => {
  const actual = await vi.importActual('@/zustand/menuState');
  return {
    ...actual,
    useMenuStore: vi.fn(),
  };
});

describe('OpenMenuBtn', () => {
  it('renders and calls openMenu on click', () => {
    const openMenuMock = vi.fn();
    const closeMenuMock = vi.fn();
    const toggleMenuMock = vi.fn();
    (useMenuStore).mockReturnValue({ menuOpen: false, openMenu: openMenuMock, closeMenu: closeMenuMock, toggleMenu: toggleMenuMock });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /common:header.actions.openMenu/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(openMenuMock).toHaveBeenCalled();
  });
});
