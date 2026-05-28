import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Horizontal progress indicator supporting determinate, indeterminate, and animated stripe modes. All colors and sizes use design tokens.',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: { type: 'number' } },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'brand'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showLabel: { control: 'boolean' },
    label: { control: 'text' },
    animated: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
  args: {
    value: 65,
    max: 100,
    variant: 'default',
    size: 'md',
    showLabel: false,
    animated: false,
    indeterminate: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      {(['default', 'brand', 'success', 'warning', 'error'] as const).map((variant) => (
        <ProgressBar key={variant} value={65} variant={variant} label={variant} showLabel />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
      <ProgressBar value={65} size="sm" label="Small (4px)" showLabel />
      <ProgressBar value={65} size="md" label="Medium (8px)" showLabel />
      <ProgressBar value={65} size="lg" label="Large (12px)" showLabel />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <ProgressBar value={40} showLabel />
      <ProgressBar value={72} label="Uploading files..." showLabel />
      <ProgressBar value={100} variant="success" label="Complete" showLabel />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <ProgressBar value={0} indeterminate label="Loading data..." />
      <ProgressBar value={0} indeterminate variant="brand" size="lg" label="Processing..." />
    </div>
  ),
};

export const Animated: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <ProgressBar value={55} animated label="Uploading..." showLabel />
      <ProgressBar value={80} animated variant="success" size="lg" label="Installing..." showLabel />
      <ProgressBar value={30} animated variant="warning" label="Syncing..." showLabel />
    </div>
  ),
};
