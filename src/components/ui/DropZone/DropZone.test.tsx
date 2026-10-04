import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DropZone from './DropZone';

describe('DropZone Component', () => {
  const mockHandleFiles = vi.fn();
  const labelText = "Trascina qui il tuo file .eml";

  it('Should renders dropzone', () => {
    render(<DropZone label={labelText} handleFiles={mockHandleFiles} />);
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  it('should call handleFile when file is selected', () => {
    render(<DropZone label={labelText} handleFiles={mockHandleFiles} />);
    const input = screen.getByLabelText(labelText) as HTMLInputElement;

    const file = new File(['content'], 'test.eml', { type: 'text/plain' });
    
    fireEvent.change(input, {
      target: { files: [file] },
    });

    expect(mockHandleFiles).toHaveBeenCalled();
  });

  it('should calls handleFiles at dropping', () => {
    render(<DropZone label={labelText} handleFiles={mockHandleFiles} />);
    const dropzone = screen.getByText(labelText).parentElement!;

    const file = new File(['content'], 'test.eml', { type: 'text/plain' });

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    expect(mockHandleFiles).toHaveBeenCalled();
  });

  it('should prevent default', () => {
    render(<DropZone label={labelText} handleFiles={mockHandleFiles} />);
    const dropzone = screen.getByText(labelText).parentElement!;

    const dragOverEvent = fireEvent.dragOver(dropzone);
    expect(dragOverEvent).toBe(false); 
  });
});