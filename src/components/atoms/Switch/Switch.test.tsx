import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Switch from './Switch';
import { useState } from 'react';
import styles from './Switch.module.scss';

const SwitchWrapper = ({allowIndeterminate}: {allowIndeterminate?: boolean}) => {
  const [value, setValue] = useState<boolean | null>(null);
  return <Switch dataTestid="switch-example" allowIndeterminate={allowIndeterminate} label="Test switch" value={value} onChange={setValue} />;
}
//TODO: aggiungere controlli su classi, sui valori ecc per il checked

const isChecked = (input: HTMLInputElement, value: boolean | null, classNames: string[], negativeClasses: string[]) => {
  expect(input.querySelector("input").checked).toBe(!!value)
  classNames.forEach(cn => expect(input.className.includes(styles[cn])).toBeTruthy())
  negativeClasses.forEach(ncn => expect(input.className.includes(styles[ncn])).toBeFalsy())
}

describe('Switch Component', () => {
  it('should render switch', async () => {
    const onChange = vi.fn();

    render(<Switch onChange={onChange} label="Test switch" />);

    const s = screen.getByLabelText("Test switch");
    expect(s).toBeInTheDocument();
  });

  it('switch value should change on click', async () => {
    const user = userEvent.setup();
    render(<SwitchWrapper />);
    const input = screen.getByTestId('switch-example') as HTMLInputElement;

    isChecked(input, false, ['c-switch'], ['c-switch--indeterminate', 'c-switch--checked'])

    await user.click(input);
    isChecked(input, true, ['c-switch', 'c-switch--checked'], ['c-switch--indeterminate'])

    await user.click(input);
    isChecked(input, false, ['c-switch'], ['c-switch--indeterminate', 'c-switch--checked'])
  });

  it('switch value should change on three states with allowIndeterminate', async () => {
    const user = userEvent.setup();
    render(<SwitchWrapper allowIndeterminate/>);
    const input = screen.getByTestId('switch-example') as HTMLInputElement;

    isChecked(input, null, ['c-switch', 'c-switch--indeterminate'], ['c-switch--checked'])

    await user.click(input);
    isChecked(input, true, ['c-switch', 'c-switch--checked'], ['c-switch--indeterminate'])

    await user.click(input);
    isChecked(input, false, ['c-switch'], ['c-switch--indeterminate', 'c-switch--checked'])

    await user.click(input);
    isChecked(input, null, ['c-switch', 'c-switch--indeterminate'], ['c-switch--checked'])
  });

  it("should have additional class name", () => {
    const onChange = vi.fn();
    render(<Switch additionalClassName="c-test" dataTestid="switch-example" label="test" onChange={onChange} />);

    const input = screen.getByTestId('switch-example') as HTMLInputElement;

    expect(input.className.includes("c-test")).toBeTruthy()
  })
});
