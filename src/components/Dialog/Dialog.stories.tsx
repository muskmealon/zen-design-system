import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from './Dialog';
import { Button } from '../Button/Button';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Modal dialog rendered via React portal to document.body. Supports focus trapping, Escape to close, overlay click to close, and body scroll lock.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

/* ── Default ────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogHeader
            title="Confirm action"
            subtitle="This action cannot be undone. Please review before continuing."
            onClose={() => setOpen(false)}
          />
          <DialogBody>
            <p>
              Are you sure you want to proceed? All associated data will be permanently removed from
              the system and cannot be recovered.
            </p>
          </DialogBody>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Confirm Delete
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};

/* ── Sizes ──────────────────────────────────────────────────── */
export const Sizes: Story = {
  render: () => {
    const [activeSize, setActiveSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(null);
    return (
      <>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <Button key={size} variant="secondary" onClick={() => setActiveSize(size)}>
              Open {size.toUpperCase()}
            </Button>
          ))}
        </div>
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <Dialog key={size} open={activeSize === size} onClose={() => setActiveSize(null)} size={size}>
            <DialogHeader
              title={`${size.toUpperCase()} Dialog`}
              subtitle={`Max-width: ${size === 'sm' ? '400px' : size === 'md' ? '560px' : size === 'lg' ? '720px' : '900px'}`}
              onClose={() => setActiveSize(null)}
            />
            <DialogBody>
              <p>
                This is the <strong>{size}</strong> size variant of the Dialog component. Each size
                maps to a different max-width using design system size tokens.
              </p>
            </DialogBody>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setActiveSize(null)}>
                Cancel
              </Button>
              <Button onClick={() => setActiveSize(null)}>OK</Button>
            </DialogFooter>
          </Dialog>
        ))}
      </>
    );
  },
};

/* ── Scrollable Body ────────────────────────────────────────── */
export const WithScrollableBody: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Scrollable Dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogHeader
            title="Terms and Conditions"
            subtitle="Please read carefully before accepting."
            onClose={() => setOpen(false)}
          />
          <DialogBody scrollable>
            {Array.from({ length: 12 }, (_, i) => (
              <p key={i} style={{ marginTop: i === 0 ? 0 : '12px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            ))}
          </DialogBody>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Decline
            </Button>
            <Button onClick={() => setOpen(false)}>Accept</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};

/* ── No overlay close ───────────────────────────────────────── */
export const WithoutOverlayClose: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open (no overlay close)</Button>
        <Dialog open={open} onClose={() => setOpen(false)} closeOnOverlayClick={false}>
          <DialogHeader
            title="Required action"
            subtitle="You must choose an option to continue."
            onClose={() => setOpen(false)}
          />
          <DialogBody>
            <p>
              Clicking outside this dialog will not close it. Use the buttons below or the X icon to
              dismiss. This is useful for critical confirmation flows where accidental dismissal
              should be prevented.
            </p>
          </DialogBody>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};
