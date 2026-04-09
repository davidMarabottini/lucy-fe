import type { Meta, StoryObj } from '@storybook/react';
import Typography from '@components/atoms/Typography/Typography';

const meta: Meta<typeof Typography> = {
  title: 'atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'body', 'small'],
    },
    color: {
      control: 'select',
      options: ['text', 'muted', 'primary', 'success', 'error'],
    },
    as: { control: 'text' }
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'Questo è un testo body di default',
    variant: 'body',
    color: 'text',
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography {...args} variant="h1">Titolo H1</Typography>
      <Typography {...args} variant="h2">Titolo H2</Typography>
      <Typography {...args} variant="h3">Titolo H3</Typography>
      <Typography {...args} variant="h4">Titolo H4</Typography>
      <Typography {...args} variant="body">Testo Body</Typography>
      <Typography {...args} variant="small">Testo Small</Typography>
    </div>
  ),
};

export const AllColors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Typography {...args} color="text">Colore Text (Default)</Typography>
      <Typography {...args} color="primary">Colore Primary</Typography>
      <Typography {...args} color="secondary">Colore Secondary</Typography>
      <Typography {...args} color="muted">Colore Muted</Typography>
      <Typography {...args} color="success">Colore Success</Typography>
      <Typography {...args} color="error">Colore Error</Typography>
    </div>
  ),
};

export const CustomTag: Story = {
  args: {
    as: 'span',
    variant: 'h1',
    children: 'Questo è uno <span> stilizzato come H1',
  },
};