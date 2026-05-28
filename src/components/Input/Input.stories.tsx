import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search, Mail, Eye } from 'lucide-react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Text input with label, helper text, error state, and icon slot support. Sized via a `size` prop.',
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
    placeholder: 'Enter value…',
    size: 'md',
    disabled: false,
    id: 'demo-input',
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: 'Email address', placeholder: 'name@company.com', id: 'email' },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: '••••••••',
    helperText: 'Must be at least 8 characters.',
    id: 'password',
    type: 'password',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Invoice number',
    placeholder: 'INV-001',
    errorText: 'Invoice number already exists.',
    id: 'invoice',
    defaultValue: 'INV-001',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 320 }}>
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <Search size={16} />,
    placeholder: 'Search invoices…',
    id: 'search',
  },
};

export const WithBothIcons: Story = {
  args: {
    leadingIcon: <Mail size={16} />,
    trailingIcon: <Eye size={16} />,
    placeholder: 'Email',
    id: 'email-icon',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Account ID',
    defaultValue: 'ACC-00123',
    disabled: true,
    id: 'account-id',
  },
};
