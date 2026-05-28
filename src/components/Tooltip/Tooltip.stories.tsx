import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Contextual tooltip shown on hover or focus. Supports four placements with an arrow indicator and configurable delay.',
      },
    },
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: { control: 'number' },
    disabled: { control: 'boolean' },
    content: { control: 'text' },
  },
  args: {
    content: 'This is a tooltip',
    placement: 'top',
    delay: 300,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const TriggerButton = ({ label }: { label: string }) => (
  <button
    type="button"
    style={{
      padding: '8px 20px',
      borderRadius: '6px',
      border: '1px solid #748FA1',
      cursor: 'pointer',
      fontFamily: 'inherit',
    }}
  >
    {label}
  </button>
);

// ─── Top ──────────────────────────────────────────────────────────────────────

export const Top: Story = {
  args: {
    placement: 'top',
    content: 'Tooltip on top',
  },
  render: (args) => (
    <div style={{ padding: '60px' }}>
      <Tooltip {...args}>
        <TriggerButton label="Hover me (top)" />
      </Tooltip>
    </div>
  ),
};

// ─── Bottom ───────────────────────────────────────────────────────────────────

export const Bottom: Story = {
  args: {
    placement: 'bottom',
    content: 'Tooltip on bottom',
  },
  render: (args) => (
    <div style={{ padding: '60px' }}>
      <Tooltip {...args}>
        <TriggerButton label="Hover me (bottom)" />
      </Tooltip>
    </div>
  ),
};

// ─── Left ─────────────────────────────────────────────────────────────────────

export const Left: Story = {
  args: {
    placement: 'left',
    content: 'Tooltip on left',
  },
  render: (args) => (
    <div style={{ padding: '60px' }}>
      <Tooltip {...args}>
        <TriggerButton label="Hover me (left)" />
      </Tooltip>
    </div>
  ),
};

// ─── Right ────────────────────────────────────────────────────────────────────

export const Right: Story = {
  args: {
    placement: 'right',
    content: 'Tooltip on right',
  },
  render: (args) => (
    <div style={{ padding: '60px' }}>
      <Tooltip {...args}>
        <TriggerButton label="Hover me (right)" />
      </Tooltip>
    </div>
  ),
};

// ─── Long content ─────────────────────────────────────────────────────────────

export const LongContent: Story = {
  name: 'Long content',
  args: {
    placement: 'top',
    content:
      'This tooltip contains a longer message that wraps across multiple lines to demonstrate the max-width and word-wrap behaviour of the tooltip container.',
    delay: 0,
  },
  render: (args) => (
    <div style={{ padding: '80px' }}>
      <Tooltip {...args}>
        <TriggerButton label="Hover me (long content)" />
      </Tooltip>
    </div>
  ),
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    placement: 'top',
    content: 'You will never see this',
    disabled: true,
  },
  render: (args) => (
    <div style={{ padding: '60px' }}>
      <Tooltip {...args}>
        <TriggerButton label="Tooltip disabled" />
      </Tooltip>
    </div>
  ),
};

// ─── All placements ───────────────────────────────────────────────────────────

export const AllPlacements: Story = {
  name: 'All placements',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        padding: '80px',
      }}
    >
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <Tooltip key={placement} placement={placement} content={`Placement: ${placement}`} delay={0}>
          <TriggerButton label={placement} />
        </Tooltip>
      ))}
    </div>
  ),
};
