import type { Meta, StoryObj } from '@storybook/react-vite';

import Card from '@components/atoms/Card/Card';

const meta = {
  title: 'atoms/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: "prova",
  },
};

