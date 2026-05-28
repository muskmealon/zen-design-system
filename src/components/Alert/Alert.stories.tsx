import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Contextual feedback messages for the user. Supports info, success, warning, and error variants with optional title, dismiss, and action slots.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    title: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
  args: {
    variant: 'info',
    children: 'This is an informational alert message.',
    dismissible: false,
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Your session will expire in 10 minutes. Save your work.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'You are approaching your monthly usage limit.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Failed to connect to the server. Please try again.',
  },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
      <Alert variant="info">Your session will expire in 10 minutes. Save your work.</Alert>
      <Alert variant="success">Your changes have been saved successfully.</Alert>
      <Alert variant="warning">You are approaching your monthly usage limit.</Alert>
      <Alert variant="error">Failed to connect to the server. Please try again.</Alert>
    </div>
  ),
};

export const WithTitle: Story = {
  name: 'With title',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
      <Alert variant="info" title="New feature available">
        Explore the redesigned dashboard from your account settings.
      </Alert>
      <Alert variant="success" title="Payment received">
        Invoice #1042 has been paid. A receipt has been sent to your email.
      </Alert>
      <Alert variant="warning" title="Limit approaching">
        You have used 85% of your API quota for this billing period.
      </Alert>
      <Alert variant="error" title="Upload failed">
        The file exceeds the 10 MB limit. Please compress it and try again.
      </Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  name: 'Dismissible',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
      <Alert variant="info" title="Tip" dismissible>
        Click the X button to dismiss this alert. It will not reappear on refresh.
      </Alert>
      <Alert variant="warning" dismissible>
        Unsaved changes will be lost if you navigate away.
      </Alert>
      <Alert variant="error" title="Connection error" dismissible>
        Could not reach the API. Check your network and retry.
      </Alert>
    </div>
  ),
};

export const WithAction: Story = {
  name: 'With action button',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
      <Alert
        variant="info"
        title="Update available"
        action={
          <button
            type="button"
            style={{
              background: 'none',
              border: '1px solid currentColor',
              borderRadius: 6,
              padding: '4px 12px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: 600,
              color: 'inherit',
            }}
          >
            Install now
          </button>
        }
      >
        Version 2.4.0 is available with performance improvements.
      </Alert>
      <Alert
        variant="error"
        title="Sync failed"
        dismissible
        action={
          <button
            type="button"
            style={{
              background: 'none',
              border: '1px solid currentColor',
              borderRadius: 6,
              padding: '4px 12px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: 600,
              color: 'inherit',
            }}
          >
            Retry
          </button>
        }
      >
        We could not sync your data. Please retry or contact support.
      </Alert>
    </div>
  ),
};
