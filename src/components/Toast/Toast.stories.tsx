import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast, ToastProvider, useToast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Notification toasts for info, success, warning and error feedback. Supports auto-dismiss, actions, and programmatic usage via `ToastProvider` + `useToast`.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
    dismissible: { control: 'boolean' },
    duration: { control: 'number' },
  },
  args: {
    variant: 'info',
    title: 'Heads up',
    description: 'This is an informational notification.',
    dismissible: true,
    duration: 0,
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// ─── Info ─────────────────────────────────────────────────────────────────────

export const InfoToast: Story = {
  name: 'Info',
  args: {
    variant: 'info',
    title: 'New update available',
    description: 'Version 2.4.0 is ready to install.',
  },
};

// ─── Success ──────────────────────────────────────────────────────────────────

export const SuccessToast: Story = {
  name: 'Success',
  args: {
    variant: 'success',
    title: 'Changes saved',
    description: 'Your profile has been updated successfully.',
  },
};

// ─── Warning ──────────────────────────────────────────────────────────────────

export const WarningToast: Story = {
  name: 'Warning',
  args: {
    variant: 'warning',
    title: 'Storage almost full',
    description: 'You have used 90% of your allocated storage.',
  },
};

// ─── Error ────────────────────────────────────────────────────────────────────

export const ErrorToast: Story = {
  name: 'Error',
  args: {
    variant: 'error',
    title: 'Upload failed',
    description: 'The file could not be uploaded. Please try again.',
  },
};

// ─── With action ──────────────────────────────────────────────────────────────

export const WithAction: Story = {
  name: 'With action',
  args: {
    variant: 'info',
    title: 'Invitation sent',
    description: 'An invitation was sent to team@example.com.',
    duration: 0,
    action: {
      label: 'Undo',
      onClick: () => alert('Undo clicked'),
    },
  },
};

// ─── All variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '400px' }}>
      <Toast
        variant="info"
        title="Info notification"
        description="Informational message for the user."
        duration={0}
      />
      <Toast
        variant="success"
        title="Success notification"
        description="The action completed successfully."
        duration={0}
      />
      <Toast
        variant="warning"
        title="Warning notification"
        description="Something needs your attention."
        duration={0}
      />
      <Toast
        variant="error"
        title="Error notification"
        description="An error occurred. Please try again."
        duration={0}
      />
    </div>
  ),
};

// ─── Auto-dismiss (useToast) ──────────────────────────────────────────────────

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <button
        type="button"
        onClick={() =>
          toast({ variant: 'info', title: 'Info', description: 'This will dismiss in 4s.', duration: 4000 })
        }
        style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #748FA1' }}
      >
        Show Info
      </button>
      <button
        type="button"
        onClick={() =>
          toast({ variant: 'success', title: 'Success!', description: 'Operation completed.', duration: 4000 })
        }
        style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #748FA1' }}
      >
        Show Success
      </button>
      <button
        type="button"
        onClick={() =>
          toast({ variant: 'warning', title: 'Warning', description: 'Proceed with caution.', duration: 4000 })
        }
        style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #748FA1' }}
      >
        Show Warning
      </button>
      <button
        type="button"
        onClick={() =>
          toast({ variant: 'error', title: 'Error', description: 'Something went wrong.', duration: 4000 })
        }
        style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #748FA1' }}
      >
        Show Error
      </button>
    </div>
  );
}

export const AutoDismiss: Story = {
  name: 'Auto-dismiss (useToast)',
  parameters: { layout: 'centered' },
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};
