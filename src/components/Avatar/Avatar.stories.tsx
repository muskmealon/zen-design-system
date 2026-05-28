import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'User identity component. Renders an image, generated initials with deterministic color, optional status indicator, and group stacking.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'busy', 'away'],
    },
  },
  args: {
    name: 'John Doe',
    size: 'md',
    shape: 'circle',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  name: 'With image',
  args: {
    src: 'https://i.pravatar.cc/150?img=47',
    alt: 'Jane Smith',
    name: 'Jane Smith',
  },
};

export const Initials: Story = {
  name: 'Initials (no image)',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar name="John Doe" />
      <Avatar name="Alice Wang" />
      <Avatar name="Bob" />
      <Avatar name="Carlos Ruiz" />
      <Avatar name="Diana Prince" />
      <Avatar name="Evan Hart" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar name="John Doe" size="xs" />
      <Avatar name="John Doe" size="sm" />
      <Avatar name="John Doe" size="md" />
      <Avatar name="John Doe" size="lg" />
      <Avatar name="John Doe" size="xl" />
    </div>
  ),
};

export const WithStatus: Story = {
  name: 'With status',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Avatar name="Alice Wang" status="online" />
        <span style={{ fontSize: 11, color: '#748FA1', fontFamily: 'IBM Plex Sans, sans-serif' }}>Online</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Avatar name="Bob Lee" status="offline" />
        <span style={{ fontSize: 11, color: '#748FA1', fontFamily: 'IBM Plex Sans, sans-serif' }}>Offline</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Avatar name="Carlos Ruiz" status="busy" />
        <span style={{ fontSize: 11, color: '#748FA1', fontFamily: 'IBM Plex Sans, sans-serif' }}>Busy</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Avatar name="Diana Prince" status="away" />
        <span style={{ fontSize: 11, color: '#748FA1', fontFamily: 'IBM Plex Sans, sans-serif' }}>Away</span>
      </div>
    </div>
  ),
};

export const SquareShape: Story = {
  name: 'Square shape',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar name="John Doe" shape="square" size="xs" />
      <Avatar name="John Doe" shape="square" size="sm" />
      <Avatar name="John Doe" shape="square" size="md" />
      <Avatar name="John Doe" shape="square" size="lg" />
      <Avatar name="John Doe" shape="square" size="xl" />
    </div>
  ),
};

export const AvatarGroupStory: Story = {
  name: 'Avatar group',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#748FA1', fontFamily: 'IBM Plex Sans, sans-serif' }}>
          Group — 4 members
        </p>
        <AvatarGroup>
          <Avatar name="Alice Wang" size="sm" />
          <Avatar name="Bob Lee" size="sm" />
          <Avatar name="Carlos Ruiz" size="sm" />
          <Avatar name="Diana Prince" size="sm" />
        </AvatarGroup>
      </div>

      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#748FA1', fontFamily: 'IBM Plex Sans, sans-serif' }}>
          Group — max 3 visible (+2 overflow)
        </p>
        <AvatarGroup max={3} size="sm">
          <Avatar name="Alice Wang" size="sm" />
          <Avatar name="Bob Lee" size="sm" />
          <Avatar name="Carlos Ruiz" size="sm" />
          <Avatar name="Diana Prince" size="sm" />
          <Avatar name="Evan Hart" size="sm" />
        </AvatarGroup>
      </div>

      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#748FA1', fontFamily: 'IBM Plex Sans, sans-serif' }}>
          Group with images
        </p>
        <AvatarGroup max={4} size="md">
          <Avatar src="https://i.pravatar.cc/150?img=1" alt="Person 1" size="md" />
          <Avatar src="https://i.pravatar.cc/150?img=2" alt="Person 2" size="md" />
          <Avatar src="https://i.pravatar.cc/150?img=3" alt="Person 3" size="md" />
          <Avatar name="Diana Prince" size="md" />
          <Avatar name="Evan Hart" size="md" />
          <Avatar name="Fiona Green" size="md" />
        </AvatarGroup>
      </div>
    </div>
  ),
};
