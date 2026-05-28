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

export const Default: Story = {};

export const Selected: Story = {
  args: {
    checked: true,
    label: 'Selected option',
    value: 'selected',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Unavailable option',
    value: 'disabled',
  },
};

export const DisabledSelected: Story = {
  args: {
    disabled: true,
    checked: true,
    label: 'Pre-selected and locked',
    value: 'disabled-selected',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    label: 'Small radio',
    value: 'small',
  },
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
