import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home, Settings, FileText, Users, FolderOpen, ChevronRight, Slash } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Navigation breadcrumb. Supports links, icons, custom separators, and middle-item collapse via maxItems. Last item always renders as the current-page indicator.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

/* ── Default ────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Settings', href: '/settings' },
        { label: 'Account', href: '/settings/account' },
        { label: 'Security' },
      ]}
    />
  ),
};

/* ── With icons ─────────────────────────────────────────────── */
export const WithIcons: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/', icon: <Home size={14} /> },
        { label: 'Users', href: '/users', icon: <Users size={14} /> },
        { label: 'Documents', href: '/users/documents', icon: <FolderOpen size={14} /> },
        { label: 'Report Q4', icon: <FileText size={14} /> },
      ]}
    />
  ),
};

/* ── Collapsed (maxItems) ───────────────────────────────────── */
export const Collapsed: Story = {
  name: 'Collapsed (maxItems=3)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '13px', color: '#526B7B' }}>
          6 items, maxItems=3 — click &hellip; to expand
        </p>
        <Breadcrumb
          maxItems={3}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Organization', href: '/org' },
            { label: 'Projects', href: '/org/projects' },
            { label: 'Alpha', href: '/org/projects/alpha' },
            { label: 'Design', href: '/org/projects/alpha/design' },
            { label: 'Tokens' },
          ]}
        />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '13px', color: '#526B7B' }}>
          4 items, maxItems=3
        </p>
        <Breadcrumb
          maxItems={3}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Settings', href: '/settings' },
            { label: 'Permissions', href: '/settings/permissions' },
            { label: 'Roles' },
          ]}
        />
      </div>
    </div>
  ),
};

/* ── No links ───────────────────────────────────────────────── */
export const NoLinks: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Dashboard' },
        { label: 'Analytics' },
        { label: 'Revenue' },
        { label: 'Monthly Report' },
      ]}
    />
  ),
};

/* ── Custom separator ───────────────────────────────────────── */
export const CustomSeparator: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Breadcrumb
        separator={<Slash size={14} />}
        items={[
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Breadcrumb' },
        ]}
      />
      <Breadcrumb
        separator={<ChevronRight size={12} />}
        items={[
          { label: 'Home', href: '/' },
          { label: 'Settings', href: '/settings' },
          { label: 'Profile' },
        ]}
      />
      <Breadcrumb
        separator={<span style={{ color: '#748FA1', fontSize: '14px' }}>/</span>}
        items={[
          { label: 'Home', href: '/' },
          { label: 'Library', href: '/lib' },
          { label: 'Icons' },
        ]}
      />
    </div>
  ),
};

/* ── Single item ────────────────────────────────────────────── */
export const SingleItem: Story = {
  render: () => (
    <Breadcrumb items={[{ label: 'Dashboard' }]} />
  ),
};

/* ── With settings icon ─────────────────────────────────────── */
export const SettingsFlow: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/', icon: <Home size={14} /> },
        { label: 'Settings', href: '/settings', icon: <Settings size={14} /> },
        { label: 'Security' },
      ]}
    />
  ),
};
