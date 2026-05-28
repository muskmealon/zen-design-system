import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Status label for surfaces, tags, and counts. Variant colours reference semantic surface + text tokens.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'brand', 'success', 'warning', 'error', 'info', 'accent', 'brandFilled', 'successFilled', 'errorFilled'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    dot: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: { children: 'Badge', variant: 'default', size: 'md', dot: false },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
      {(['default', 'brand', 'success', 'warning', 'error', 'info', 'accent'] as const).map((v) => (
        <Badge key={v} variant={v}>{v}</Badge>
      ))}
    </div>
  ),
};

export const FilledVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge variant="brandFilled">Active</Badge>
      <Badge variant="successFilled">Paid</Badge>
      <Badge variant="errorFilled">Overdue</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge variant="brand" size="sm">Small</Badge>
      <Badge variant="brand" size="md">Medium</Badge>
      <Badge variant="brand" size="lg">Large</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="error" dot>Failed</Badge>
      <Badge variant="info" dot>Processing</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge variant="success" icon={<CheckCircle size={12} />}>Approved</Badge>
      <Badge variant="error" icon={<AlertCircle size={12} />}>Rejected</Badge>
    </div>
  ),
};
