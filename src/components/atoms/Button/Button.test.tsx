import {render, screen} from '@testing-library/react';
import { describe, it, expect, vi} from 'vitest';
import userEvent from '@testing-library/user-event';
import Button from './Button';
import styles from './Button.module.scss';

describe('Button Component', () => {
  it('rendered with only label', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button', { name: /test button/i });

    expect(button).toBeInTheDocument();

    expect(button).toHaveClass(styles['c-button']);
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn(); 

    render(<Button onClick={handleClick} >Test Button</Button>);

    const button = screen.getByRole('button', { name: /test button/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled and not clickable when disabled prop is true', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(<Button onClick={handleClick} disabled>Disabled Button</Button>);

    const button = screen.getByRole('button', { name: /disabled button/i });

    expect(button).toBeDisabled();

    expect(button).toHaveClass(styles['c-button--disabled']);

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it.each([
    { color: 'primary', expectedClass: 'c-button--primary' },
    { color: 'secondary', expectedClass: 'c-button--secondary' },
  ])('applies %s class when color prop is %s', ({ color, expectedClass }) => {

    render(<Button color={color as "primary" | "secondary"}>Test Button</Button>);

    const button = screen.getByRole('button', { name: /test button/i });
    
    expect(button).toHaveClass(styles[expectedClass]);
  });

  it('applies rounded class when rounded prop is true', () => {
    render(<Button rounded>Rounded Button</Button>);
    const button = screen.getByRole('button', { name: /rounded button/i });
    expect(button).toHaveClass(styles['c-button--rounded']);
  });
});