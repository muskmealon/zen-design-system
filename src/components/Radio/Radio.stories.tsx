import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Custom-styled radio button. Use inside a `RadioGroup` for automatic value management via React context.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    value: 'option-a',
    label: 'Option A',
    size: 'md',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup>
      <Radio {...args} />
    </RadioGroup>
  ),
};

export const Selected: Story = {
  render: () => (
    <RadioGroup value="selected">
      <Radio value="selected" label="Selected option" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Unavailable option',
    value: 'disabled',
  },
  render: (args) => (
    <RadioGroup>
      <Radio {...args} />
    </RadioGroup>
  ),
};

export const DisabledSelected: Story = {
  render: () => (
    <RadioGroup value="disabled-selected">
      <Radio value="disabled-selected" label="Pre-selected and locked" disabled />
    </RadioGroup>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <RadioGroup>
      <Radio size="sm" value="small" label="Small radio" />
    </RadioGroup>
  ),
};

export const GroupVertical: Story = {
  render: () => {
    const [value, setValue] = useState('monthly');
    return (
      <RadioGroup label="Billing cycle" orientation="vertical" value={value} onChange={setValue}>
        <Radio value="monthly" label="Monthly" />
        <Radio value="quarterly" label="Quarterly" />
        <Radio value="annually" label="Annually (save 20%)" />
        <Radio value="custom" label="Custom period" disabled />
      </RadioGroup>
    );
  },
};

export const GroupHorizontal: Story = {
  render: () => {
    const [value, setValue] = useState('card');
    return (
      <RadioGroup label="Payment method" orientation="horizontal" value={value} onChange={setValue}>
        <Radio value="card" label="Credit card" />
        <Radio value="bank" label="Bank transfer" />
        <Radio value="crypto" label="Crypto" disabled />
      </RadioGroup>
    );
  },
};
