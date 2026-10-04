import {render, screen} from '@testing-library/react';
import { describe, it, expect, vi} from 'vitest';
import userEvent from '@testing-library/user-event';
import RadioBtn from './RadioBtn';
import styles from './RadioBtn.module.scss';

const spacings = ['lg', 'md', 'sm'] as ('lg' | 'md' | 'sm')[];

describe('RadioBtn Component', () => {
  it('should render all options and change value when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const options = [
      { label: 'Radio 1', value: 'radio1' },
      { label: 'Radio 2', value: 'radio2' }
    ];

    render(<RadioBtn options={options} onValueChange={onChange} />);

    const radio1 = screen.getByRole('radio', { name: /radio 1/i });
    const radio2 = screen.getByRole('radio', { name: /radio 2/i });
    
    expect(radio1).toBeInTheDocument();
    expect(radio2).toBeInTheDocument();

    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();

    await user.click(screen.getByLabelText('Radio 2'));

    expect(onChange).toHaveBeenCalledWith("radio2", "Radio 2");
    expect(radio2).toBeChecked();
    expect(radio1).not.toBeChecked();
  });

  it('should be vertical on vertical orientation', async () => {
    const onChange = vi.fn();
    const options = [
      { label: 'Radio 1', value: 'radio1' },
      { label: 'Radio 2', value: 'radio2' }
    ];

    render(<RadioBtn data-testid="radiobtn" orientation='vertical' options={options} onValueChange={onChange} />);

    const radioBtn = screen.getByTestId('radiobtn');
    expect(radioBtn.children[1]).toHaveClass(styles['c-radio-btn__container--vertical'])
  });

  it('should be vertical on horizontal orientation', async () => {
    const onChange = vi.fn();
    const options = [
      { label: 'Radio 1', value: 'radio1' },
      { label: 'Radio 2', value: 'radio2' }
    ];

    render(<RadioBtn data-testid="radiobtn" orientation='horizontal' options={options} onValueChange={onChange} />);

    const radioBtn = screen.getByTestId('radiobtn');
    expect(radioBtn.children[0]).not.toHaveClass('c-radio-btn__container--vertical')
  });

  it.each(spacings)('should have gap', gap => {
    const onChange = vi.fn();
    const options = [
      { label: 'Radio 1', value: 'radio1' },
      { label: 'Radio 2', value: 'radio2' }
    ];

    render(<RadioBtn data-testid="radiobtn" gap={gap} options={options} onValueChange={onChange} />);

    const radioBtn = screen.getByTestId('radiobtn');
    expect(radioBtn.children[1]).toHaveClass(styles[`c-radio-btn__container--${gap}`])
  })

  it('should have ghost class on radio inputs when variant is ghost', async () => {
    const options = [{ label: 'Radio 1', value: 'radio1' }];

    render(<RadioBtn variant="ghost" options={options} />);

    const radio = screen.getByRole('radio', { name: /radio 1/i });

    expect(radio).toHaveClass(styles['c-radio-btn__item-input--ghost']);
    expect(radio).toHaveClass(styles['c-radio-btn__item-input']);
  });

  it('should not have ghost class on radio inputs when variant is ghost', async () => {
    const options = [{ label: 'Radio 1', value: 'radio1' }];

    render(<RadioBtn variant="standard" options={options} />);

    const radio = screen.getByRole('radio', { name: /radio 1/i });

    expect(radio).not.toHaveClass(styles['c-radio-btn__item-input--ghost']);
    expect(radio).toHaveClass(styles['c-radio-btn__item-input']);
  });

  it('should render change on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const options = [
      { label: 'Radio 1', value: 'radio1' },
      { label: 'Radio 2', value: 'radio2' }
    ];

    render(<RadioBtn variant="ghost" options={options} onValueChange={onChange} />);

    await user.click(screen.getByLabelText('Radio 2'));
    const radio1 = screen.getByRole('radio', { name: /radio 1/i });
    const radio2 = screen.getByRole('radio', { name: /radio 2/i });

    expect(onChange).toHaveBeenCalledWith("radio2", "Radio 2");
    expect(radio2).toBeChecked();
    expect(radio1).not.toBeChecked();
  })

  it('should select defaultValue initially', () => {
    const options = [
      { label: 'Radio 1', value: 'radio1' },
      { label: 'Radio 2', value: 'radio2' },
    ];

    render(
      <RadioBtn
        options={options}
        defaultValue="radio2"
      />
    );

    const radio1 = screen.getByRole('radio', { name: /radio 1/i });
    const radio2 = screen.getByRole('radio', { name: /radio 2/i });

    expect(radio2).toBeChecked();
    expect(radio1).not.toBeChecked();
  });

  it('should respect controlled value prop', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const options = [
      { label: 'Radio 1', value: 'radio1' },
      { label: 'Radio 2', value: 'radio2' },
    ];

    const { rerender } = render(
      <RadioBtn
        options={options}
        value="radio1"
        onValueChange={onChange}
      />
    );

    const radio1 = screen.getByRole('radio', { name: /radio 1/i });
    const radio2 = screen.getByRole('radio', { name: /radio 2/i });

    expect(radio1).toBeChecked();

    await user.click(radio2);

    expect(onChange).toHaveBeenCalledWith("radio2", "Radio 2");
    expect(radio1).toBeChecked();

    rerender(
      <RadioBtn
        options={options}
        value="radio2"
        onValueChange={onChange}
      />
    );

    expect(radio2).toBeChecked();
  });

});