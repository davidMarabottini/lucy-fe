import { describe, it, expect, vi } from 'vitest';
import TextArea from './TextArea';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TextArea Component', () => {
   it('renders', () => {
    render(<TextArea data-testid="textarea" />);
    const textAreaId = screen.getByTestId('textarea');
    expect(textAreaId).toBeInTheDocument();
  });

  it('renders correctly with label', () => {
    render(<TextArea name="text" label="Inserisci testo" />);
    const input = screen.getByLabelText(/Inserisci testo/i);

    expect(input).toBeInTheDocument();
  });


  it('renders correctly with error', () => {
    render(<TextArea label="Inserisci testo" error="errore" />);
    const errorSpan = screen.getByText(/errore/i)
    const input = screen.getByRole('textbox');

    expect(errorSpan).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-describedby', errorSpan.id);
  });

  it('calls onValueChange when user types', async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();
    
    render(<TextArea onValueChange={handleValueChange} />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'ciao');

    expect(handleValueChange).toHaveBeenCalledWith('ciao');
    expect(handleValueChange).toHaveBeenCalledTimes(4);
  });
  
});