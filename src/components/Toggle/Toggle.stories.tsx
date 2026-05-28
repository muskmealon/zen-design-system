import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'On/off switch rendered as a `<button role="switch">`. Supports controlled and uncontrolled modes, three sizes, and label placement.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    labelPosition: { control: 'select', options: ['left', 'right'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    size: 'md',
    disabled: false,
    labelPosition: 'right',
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const DefaultOff: Story = {
  args: { defaultChecked: false },
};

export const DefaultOn: Story = {
  args: { defaultChecked: true },
};

export const Controlled: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <Toggle checked={on} onChange={setOn} label={on ? 'Enabled' : 'Disabled'} />
        <span style={{ fontFamily: 'var(--font-family-primary)', fontSize: '12px', color: 'var(--color-text-muted)' }}>
          State: {on ? 'ON' : 'OFF'}
        </span>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <Toggle size="sm" defaultChecked label="Small" />
      <Toggle size="md" defaultChecked label="Medium" />
      <Toggle size="lg" defaultChecked label="Large" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      <Toggle disabled label="Disabled off" />
      <Toggle disabled defaultChecked label="Disabled on" />
    </div>
  ),
};

export const WithLabelLeft: Story = {
  args: {
    label: 'Dark mode',
    labelPosition: 'left',
    defaultChecked: true,
  },
};

export const WithLabelRight: Story = {
  args: {
    label: 'Email notifications',
    labelPosition: 'right',
    defaultChecked: false,
  },
};
