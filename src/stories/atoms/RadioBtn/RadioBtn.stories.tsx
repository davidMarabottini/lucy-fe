import type { Meta, StoryObj } from '@storybook/react-vite';

import RadioBtn from '@components/atoms/RadioBtn/RadioBtn';
import Button from '@/components/atoms/Button/Button';
import { ICON_PRESET } from '@/components/atoms/RadioBtn/presets/icon.presets';
import { Mars, Transgender, Venus } from 'lucide-react';

const meta = {
  title: 'atoms/RadioBtn',
  component: RadioBtn,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    name: 'radiobtntest',
    children: (opt, isChecked) => <Button color={isChecked ? 'primary' : 'secondary'} asChild rounded><div>{opt.label}</div></Button>,
    options: [{
      label: 'lab1',
      value: 'val1',
    }, {
      label: 'lab2',
      value: 'val2',
    }]
  },
};

export const IconPreset: Story = {
  args: {
    name: 'gender',
    label: 'Gender:',
    children: ICON_PRESET.children,
    variant: ICON_PRESET.variant,
    className: ICON_PRESET.classBase,
    options: [{
      label: 'Male',
      value: 'm',
      Icon: Mars
    }, {
      label: 'Female',
      value: 'f',
      Icon: Venus
    }, {
      label: 'Other',
      value: '',
      Icon: Transgender
    }],
    gap: 'lg'
  },
};

