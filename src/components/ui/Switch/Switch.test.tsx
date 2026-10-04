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

const isChecked = (
  toggle: HTMLElement,
  value: boolean | null,
  classNames: string[],
  negativeClasses: string[]
) => {
  const wrapper = toggle.closest('label') as HTMLLabelElement;
  const expectedAriaChecked = value === null ? 'mixed' : String(!!value);

  expect(toggle.getAttribute('aria-checked')).toBe(expectedAriaChecked);
  classNames.forEach(cn => expect(wrapper.className.includes(styles[cn])).toBeTruthy())
  negativeClasses.forEach(ncn => expect(wrapper.className.includes(styles[ncn])).toBeFalsy())
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
    const toggle = screen.getByRole('switch');

    isChecked(toggle, false, ['c-switch'], ['c-switch--indeterminate', 'c-switch--checked'])

    await user.click(toggle);
    isChecked(toggle, true, ['c-switch', 'c-switch--checked'], ['c-switch--indeterminate'])

    await user.click(toggle);
    isChecked(toggle, false, ['c-switch'], ['c-switch--indeterminate', 'c-switch--checked'])
  });

  it('switch value should change on three states with allowIndeterminate', async () => {
    const user = userEvent.setup();
    render(<SwitchWrapper allowIndeterminate/>);
    const toggle = screen.getByRole('switch');

    isChecked(toggle, null, ['c-switch', 'c-switch--indeterminate'], ['c-switch--checked'])

    await user.click(toggle);
    isChecked(toggle, true, ['c-switch', 'c-switch--checked'], ['c-switch--indeterminate'])

    await user.click(toggle);
    isChecked(toggle, false, ['c-switch'], ['c-switch--indeterminate', 'c-switch--checked'])

    await user.click(toggle);
    isChecked(toggle, null, ['c-switch', 'c-switch--indeterminate'], ['c-switch--checked'])
  });

  it('switch value should change on keyboard activation', async () => {
    const user = userEvent.setup();
    render(<SwitchWrapper />);
    const toggle = screen.getByRole('switch');

    await user.tab();
    expect(toggle).toHaveFocus();

    await user.keyboard('[Space]');
    isChecked(toggle, true, ['c-switch', 'c-switch--checked'], ['c-switch--indeterminate'])
  });

  it("should have additional class name", () => {
    const onChange = vi.fn();
    render(<Switch additionalClassName="c-test" dataTestid="switch-example" label="test" onChange={onChange} />);

    const wrapper = screen.getByTestId('switch-example');

    expect(wrapper.className.includes("c-test")).toBeTruthy()
  })
});

