import type { Meta, StoryObj } from '@storybook/react';
import Select from '@/components/molecules/Select/Select';

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    onValueChange: { action: 'value changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const defaultOptions = [
  { label: 'Male', value: 'M' },
  { label: 'Female', value: 'F' },
  { label: 'Other', value: 'O' },
  { label: 'Prefer not to say', value: 'N' },
];

export const Default: Story = {
  args: {
    name: 'gender',
    label: 'Gender',
    options: defaultOptions,
  },
};

export const WithManyOptions: Story = {
  args: {
    name: 'country',
    label: 'Country',
    options: [
      { label: 'Italy', value: 'IT' },
      { label: 'France', value: 'FR' },
      { label: 'Germany', value: 'DE' },
      { label: 'Spain', value: 'ES' },
      { label: 'United States', value: 'US' },
      { label: 'Japan', value: 'JP' },
      { label: 'China', value: 'CN' },
    ],
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'This field is required',
  },
};