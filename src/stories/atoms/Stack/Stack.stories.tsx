import type { Meta, StoryObj } from '@storybook/react-vite';
import './stack.css';
import { fn } from 'storybook/test';

import Stack from '@components/atoms/Stack/Stack';

const meta = {
  title: 'atoms/Stack',
  component: Stack,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {children: [<div>1</div>, <div>2</div>]},
};

export const SmallGap: Story = {
  args: {children: [<div>1</div>, <div>2</div>], spacing: 'sm' },
};

export const MediumGap: Story = {
  args: {children: [<div>1</div>, <div>2</div>], spacing: 'md'},
};

export const LargeGap: Story = {
  args: {children: [<div>1</div>, <div>2</div>], spacing: 'lg'},
};

export const ColumnDirection: Story = {
  args: {children: [<div>1</div>, <div>2</div>], direction: 'column'},
};

export const RowDirection: Story = {
  args: {children: [<div>1</div>, <div>2</div>],  direction: 'row'},
};

export const Red: Story = {
  args: {children: [<div>1</div>, <div>2</div>],  additionalClassName: 'c-test-red'},
};
