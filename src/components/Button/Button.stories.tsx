import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus, Trash2, ArrowRight, Download } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Core action trigger. Variants map directly to Figma semantic tokens — no hardcoded colours.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Danger: Story = { args: { variant: 'danger' } };
export const Neutral: Story = { args: { variant: 'neutral' } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <Button leadingIcon={<Plus size={16} />}>Add item</Button>
      <Button variant="secondary" trailingIcon={<ArrowRight size={16} />}>Continue</Button>
      <Button variant="ghost" leadingIcon={<Download size={16} />}>Export</Button>
      <Button variant="danger" leadingIcon={<Trash2 size={16} />}>Delete</Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button iconOnly size="sm" aria-label="Add"><Plus size={14} /></Button>
      <Button iconOnly size="md" aria-label="Add"><Plus size={16} /></Button>
      <Button iconOnly size="lg" aria-label="Add"><Plus size={18} /></Button>
      <Button iconOnly variant="secondary" aria-label="Delete"><Trash2 size={16} /></Button>
      <Button iconOnly variant="danger" aria-label="Delete"><Trash2 size={16} /></Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button disabled>Primary</Button>
      <Button disabled variant="secondary">Secondary</Button>
      <Button disabled variant="ghost">Ghost</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['primary', 'secondary', 'ghost', 'danger', 'neutral'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant={variant} size="sm">{variant}</Button>
          <Button variant={variant} size="md">{variant}</Button>
          <Button variant={variant} size="lg">{variant}</Button>
        </div>
      ))}
    </div>
  ),
};
