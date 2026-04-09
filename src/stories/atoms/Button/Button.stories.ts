import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import Button from '@components/atoms/Button/Button';

const meta = {
  title: 'atoms/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: 'Button',
  },
};

export const Custom: Story = {
  args: {
    color: 'custom',
    children: 'Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Button',
  },
};

export const Rounded: Story = {
  args: {
    rounded: true,
    children: 'Button',
  },
};

export const CustomBtn: Story = {
  args: {
    children: 'Button',
    color: 'custom',
    additionalClassName: 'sb-custom-test'
  },
};
