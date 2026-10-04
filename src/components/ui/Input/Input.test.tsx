import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Input from './Input';
import styles from './Input.module.scss';

describe('Input Component', () => {
  it('renders correctly with label', () => {
    render(<Input label="Username" />);
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it('calls onValueChange when user types', async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();
    
    render(<Input onValueChange={handleValueChange} />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'ciao');

    expect(handleValueChange).toHaveBeenCalledWith('ciao');
    expect(handleValueChange).toHaveBeenCalledTimes(4);
  });

  it('shows error message and applies error class', () => {
    const errorMessage = 'Campo obbligatorio';
    render(<Input error={errorMessage} />);

    const container = screen.getByText(errorMessage).closest(`.${styles['c-input']}`);
    expect(container).toHaveClass(styles['c-input--error']);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });


  it('is disabled when disabled prop is passed', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});