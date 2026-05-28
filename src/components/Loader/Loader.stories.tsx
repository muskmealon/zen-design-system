import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Animated loading indicator with three variants: spinner, dots, and bar. All sizes and colors map to design tokens.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['spinner', 'dots', 'bar'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['brand', 'white', 'muted'],
    },
    label: { control: 'text' },
  },
  args: {
    variant: 'spinner',
    size: 'md',
    color: 'brand',
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {};

export const SpinnerSizes: Story = {
  name: 'Spinner — Sizes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <Loader variant="spinner" size="sm" />
      <Loader variant="spinner" size="md" />
      <Loader variant="spinner" size="lg" />
    </div>
  ),
};

export const Dots: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <Loader variant="dots" size="sm" />
      <Loader variant="dots" size="md" />
      <Loader variant="dots" size="lg" />
    </div>
  ),
};

export const Bar: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
      <Loader variant="bar" size="sm" />
      <Loader variant="bar" size="md" />
      <Loader variant="bar" size="lg" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <Loader variant="spinner" color="brand" />
        <Loader variant="dots" color="brand" />
        <Loader variant="bar" color="brand" />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          backgroundColor: '#36454F',
          padding: '16px',
          borderRadius: '8px',
        }}
      >
        <Loader variant="spinner" color="white" />
        <Loader variant="dots" color="white" />
        <Loader variant="bar" color="white" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <Loader variant="spinner" color="muted" />
        <Loader variant="dots" color="muted" />
        <Loader variant="bar" color="muted" />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '40px' }}>
      <Loader variant="spinner" label="Loading..." />
      <Loader variant="dots" label="Please wait" />
      <Loader variant="bar" label="Fetching data" />
    </div>
  ),
};
