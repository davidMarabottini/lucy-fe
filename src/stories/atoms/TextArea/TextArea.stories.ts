import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import TextArea from '@components/atoms/TextArea/TextArea';

const meta = {
  title: 'atoms/TextArea',
  component: TextArea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
  },
};

export const Labeled: Story = {
  args: {
    label: "Inserisci testo"
  },
};

export const Error: Story = {
  args: {
    label: "Inserisci testo",
    error: "Testo non valido"
  },
};
