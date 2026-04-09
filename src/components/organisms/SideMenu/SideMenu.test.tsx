import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SideMenu } from './SideMenu';
import { MemoryRouter } from 'react-router-dom';
import { structuredMenu } from '@constants/routes';

vi.mock('@/auth/useAuth', () => ({
  useAuth: vi.fn(),
}));
import { useAuth } from '@/auth/useAuth';

vi.mock('@/zustand/menuState', () => ({
  useMenuStore: vi.fn(),
}));
import { useMenuStore } from '@/zustand/menuState';
import { AUTH_DOMAINS } from '@/constants/configuration';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SideMenu Component', () => {
  const closeMenuMock = vi.fn();

  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({ 
      isAuthenticated: true,
    user: 'JohnDoe',
    domain: 'private',
    id: 1,
    role: [],
    isLoading: false,
     });
    vi.mocked(useMenuStore).mockReturnValue({ menuOpen: true, closeMenu: closeMenuMock });
    mockNavigate.mockReset();
    closeMenuMock.mockReset();
  });

  it('renders menu items based on domain', () => {
    render(
      <MemoryRouter>
        <SideMenu />
      </MemoryRouter>
    );

    const menuItems = structuredMenu.main?.[AUTH_DOMAINS.PRIVATE] || [];
    menuItems.forEach(({ handle: { label } }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  // it('calls navigate and closeMenu when item clicked', () => {
  //   render(
  //     <MemoryRouter>
  //       <SideMenu />
  //     </MemoryRouter>
  //   );

  //   const firstItem = structuredMenu.main?.[AUTH_DOMAINS.PRIVATE]?.[0];
  //   const link = screen.getByText(firstItem?.handle.label || '');
  //   fireEvent.click(link);

  //   expect(mockNavigate).toHaveBeenCalledWith(firstItem?.path, { replace: false });
  //   expect(closeMenuMock).toHaveBeenCalled();
  // });

  it('renders menu closed state correctly', () => {
    vi.mocked(useMenuStore).mockReturnValue({ menuOpen: false, closeMenu: closeMenuMock });
    render(
      <MemoryRouter>
        <SideMenu />
      </MemoryRouter>
    );

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });
});
