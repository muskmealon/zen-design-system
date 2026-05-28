import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, CheckboxGroup } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Custom-styled checkbox with support for indeterminate state, sizes, and grouping. Hides the native input and renders an accessible custom box.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
  },
  args: {
    label: 'Accept terms and conditions',
    size: 'md',
    disabled: false,
    indeterminate: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Receive email notifications',
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Select all items',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'This option is unavailable',
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    label: 'Pre-selected and locked',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'You can unsubscribe at any time from your account settings.',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    label: 'Small checkbox',
  },
};

export const GroupVertical: Story = {
  render: () => (
    <CheckboxGroup label="Notification preferences" orientation="vertical">
      <Checkbox label="Email" defaultChecked />
      <Checkbox label="SMS" />
      <Checkbox label="Push notifications" defaultChecked />
      <Checkbox label="In-app alerts" disabled />
    </CheckboxGroup>
  ),
};

export const GroupHorizontal: Story = {
  render: () => (
    <CheckboxGroup label="Filters" orientation="horizontal">
      <Checkbox label="Invoices" defaultChecked />
      <Checkbox label="Payments" defaultChecked />
      <Checkbox label="Refunds" />
      <Checkbox label="Disputes" disabled />
    </CheckboxGroup>
  ),
};
