import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const CURRENCY_OPTIONS = [
  { value: 'usd', label: 'USD — US Dollar' },
  { value: 'eur', label: 'EUR — Euro' },
  { value: 'gbp', label: 'GBP — British Pound' },
  { value: 'jpy', label: 'JPY — Japanese Yen' },
  { value: 'aud', label: 'AUD — Australian Dollar' },
];

const PLAN_OPTIONS = [
  { value: 'free', label: 'Free' },
  { value: 'starter', label: 'Starter' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise', disabled: true },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible custom-styled select built on a native `<select>` element with a `ChevronDown` icon overlay. Supports label, helper text, error state, placeholder, and three sizes.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
  },
  args: {
    options: CURRENCY_OPTIONS,
    size: 'md',
    disabled: false,
  },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    defaultValue: 'usd',
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Select a currency…',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Currency',
    placeholder: 'Select currency…',
    id: 'currency-select',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Plan',
    options: PLAN_OPTIONS,
    defaultValue: 'starter',
    helperText: 'You can upgrade or downgrade at any time.',
    id: 'plan-select',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Payment method',
    options: [
      { value: 'card', label: 'Credit card' },
      { value: 'bank', label: 'Bank transfer' },
    ],
    placeholder: 'Select method…',
    errorText: 'Please select a valid payment method.',
    id: 'payment-select',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Region',
    options: [{ value: 'us-east', label: 'US East' }],
    defaultValue: 'us-east',
    disabled: true,
    id: 'region-select',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 280 }}>
      <Select
        size="sm"
        options={CURRENCY_OPTIONS}
        defaultValue="usd"
        placeholder="Small"
      />
      <Select
        size="md"
        options={CURRENCY_OPTIONS}
        defaultValue="eur"
        placeholder="Medium"
      />
      <Select
        size="lg"
        options={CURRENCY_OPTIONS}
        defaultValue="gbp"
        placeholder="Large"
      />
    </div>
  ),
};

export const WithDisabledOption: Story = {
  args: {
    label: 'Subscription plan',
    options: PLAN_OPTIONS,
    defaultValue: 'pro',
    helperText: 'Enterprise plans require a custom quote.',
    id: 'subscription-select',
  },
};
