import type { Meta, StoryObj } from '@storybook/react-vite';
import { Settings, User, Bell, FileText } from 'lucide-react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Accessible tab navigation with line and pill variants. Built with React context and ARIA roles.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'pill'],
    },
    defaultValue: { control: 'text' },
  },
  args: {
    variant: 'line',
    defaultValue: 'account',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// ─── Line variant ─────────────────────────────────────────────────────────────

export const LineVariant: Story = {
  name: 'Line variant',
  args: { variant: 'line', defaultValue: 'account' },
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Account settings">
        <Tab value="account">Account</Tab>
        <Tab value="security">Security</Tab>
        <Tab value="notifications">Notifications</Tab>
      </TabList>
      <TabPanel value="account">
        <p>Manage your account details, name and email address.</p>
      </TabPanel>
      <TabPanel value="security">
        <p>Update your password and two-factor authentication settings.</p>
      </TabPanel>
      <TabPanel value="notifications">
        <p>Choose which notifications you would like to receive.</p>
      </TabPanel>
    </Tabs>
  ),
};

// ─── Pill variant ─────────────────────────────────────────────────────────────

export const PillVariant: Story = {
  name: 'Pill variant',
  args: { variant: 'pill', defaultValue: 'overview' },
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Dashboard sections">
        <Tab value="overview">Overview</Tab>
        <Tab value="analytics">Analytics</Tab>
        <Tab value="reports">Reports</Tab>
      </TabList>
      <TabPanel value="overview">
        <p>High-level overview of your workspace activity.</p>
      </TabPanel>
      <TabPanel value="analytics">
        <p>Detailed analytics and usage charts.</p>
      </TabPanel>
      <TabPanel value="reports">
        <p>Download and schedule automated reports.</p>
      </TabPanel>
    </Tabs>
  ),
};

// ─── With icons ───────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'With icons',
  args: { variant: 'line', defaultValue: 'profile' },
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Settings">
        <Tab value="profile" icon={<User size={15} />}>Profile</Tab>
        <Tab value="notifications" icon={<Bell size={15} />}>Notifications</Tab>
        <Tab value="documents" icon={<FileText size={15} />}>Documents</Tab>
        <Tab value="settings" icon={<Settings size={15} />}>Settings</Tab>
      </TabList>
      <TabPanel value="profile">
        <p>Update your profile picture, display name, and bio.</p>
      </TabPanel>
      <TabPanel value="notifications">
        <p>Configure your notification preferences.</p>
      </TabPanel>
      <TabPanel value="documents">
        <p>View and manage your uploaded documents.</p>
      </TabPanel>
      <TabPanel value="settings">
        <p>Application-wide settings and preferences.</p>
      </TabPanel>
    </Tabs>
  ),
};

// ─── Disabled tab ─────────────────────────────────────────────────────────────

export const DisabledTab: Story = {
  name: 'Disabled tab',
  args: { variant: 'line', defaultValue: 'active' },
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Feature tabs">
        <Tab value="active">Active</Tab>
        <Tab value="beta" disabled>Beta (disabled)</Tab>
        <Tab value="archived">Archived</Tab>
      </TabList>
      <TabPanel value="active">
        <p>This tab is active and fully accessible.</p>
      </TabPanel>
      <TabPanel value="beta">
        <p>Beta content (unreachable while disabled).</p>
      </TabPanel>
      <TabPanel value="archived">
        <p>Archived items are read-only.</p>
      </TabPanel>
    </Tabs>
  ),
};

// ─── Pill with icons ──────────────────────────────────────────────────────────

export const PillWithIcons: Story = {
  name: 'Pill with icons',
  args: { variant: 'pill', defaultValue: 'profile' },
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="User area">
        <Tab value="profile" icon={<User size={14} />}>Profile</Tab>
        <Tab value="notifications" icon={<Bell size={14} />}>Alerts</Tab>
        <Tab value="settings" icon={<Settings size={14} />}>Settings</Tab>
      </TabList>
      <TabPanel value="profile"><p>Profile panel content.</p></TabPanel>
      <TabPanel value="notifications"><p>Alerts panel content.</p></TabPanel>
      <TabPanel value="settings"><p>Settings panel content.</p></TabPanel>
    </Tabs>
  ),
};
