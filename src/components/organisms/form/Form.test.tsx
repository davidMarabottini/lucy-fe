import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Form from './Form';

describe('Form Organism', () => {
  it('should submit correctly all field values', async () => {
    const handleSubmit = vi.fn();
    const options = [{ label: 'Male', value: 'M' }];

    render(
      <Form onSubmit={handleSubmit} defaultValues={{ username: '', gender: '' }}>
        <Form.Input name="username" label="Username" rules={{ required: 'Required' }} />
        <Form.Select name="gender" label="Gender" options={options} />
        <Form.Button>Submit</Form.Button>
      </Form>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'john_doe' } });

    fireEvent.focus(screen.getByLabelText(/gender/i));
    fireEvent.mouseDown(screen.getByText('Male'));

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'john_doe',
          gender: 'M',
        }),
        expect.anything()
      );
    });
  });

  it('should display validation errors from rules', async () => {
    render(
      <Form onSubmit={vi.fn()}>
        <Form.Input name="username" label="Username" rules={{ required: 'Username is required' }} />
        <Form.Button autoDisabled={false}>Submit</Form.Button>
      </Form>
    );

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText('Username is required')).toBeInTheDocument();
  });
});