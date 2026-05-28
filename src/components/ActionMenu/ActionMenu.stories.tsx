import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  MoreHorizontal,
  Edit2,
  Copy,
  Download,
  Share2,
  Trash2,
  Archive,
  Star,
} from 'lucide-react';
import { ActionMenu } from './ActionMenu';

const meta: Meta<typeof ActionMenu> = {
  title: 'Components/ActionMenu',
  component: ActionMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A dropdown menu triggered by any custom element. Supports icons, danger items, dividers, disabled items, and left/right alignment.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionMenu>;

const EllipsisButton = () => (
  <button
    type="button"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      borderRadius: 6,
      border: '1px solid #748FA1',
      background: 'transparent',
      cursor: 'pointer',
      color: '#36454F',
    }}
    aria-label="Open menu"
  >
    <MoreHorizontal size={16} />
  </button>
);

export const Default: Story = {
  render: () => (
    <ActionMenu
      trigger={<EllipsisButton />}
      items={[
        { label: 'Edit' },
        { label: 'Duplicate' },
        { label: 'Archive' },
        { label: 'Delete' },
      ]}
    />
  ),
};

export const WithIcons: Story = {
  name: 'With icons',
  render: () => (
    <ActionMenu
      trigger={<EllipsisButton />}
      items={[
        { icon: <Edit2 size={14} />, label: 'Edit' },
        { icon: <Copy size={14} />, label: 'Duplicate' },
        { icon: <Download size={14} />, label: 'Download' },
        { icon: <Share2 size={14} />, label: 'Share' },
        { icon: <Archive size={14} />, label: 'Archive' },
      ]}
    />
  ),
};

export const WithDangerItem: Story = {
  name: 'With danger item',
  render: () => (
    <ActionMenu
      trigger={<EllipsisButton />}
      items={[
        { icon: <Edit2 size={14} />, label: 'Edit' },
        { icon: <Copy size={14} />, label: 'Duplicate' },
        { icon: <Star size={14} />, label: 'Mark as favourite' },
        {
          icon: <Trash2 size={14} />,
          label: 'Delete',
          variant: 'danger',
          dividerAbove: true,
        },
      ]}
    />
  ),
};

export const WithDisabledItem: Story = {
  name: 'With disabled item',
  render: () => (
    <ActionMenu
      trigger={<EllipsisButton />}
      items={[
        { icon: <Edit2 size={14} />, label: 'Edit' },
        { icon: <Download size={14} />, label: 'Export (unavailable)', disabled: true },
        { icon: <Share2 size={14} />, label: 'Share' },
        {
          icon: <Trash2 size={14} />,
          label: 'Delete',
          variant: 'danger',
          dividerAbove: true,
        },
      ]}
    />
  ),
};

export const AlignedRight: Story = {
  name: 'Aligned right',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: 300 }}>
      <ActionMenu
        align="right"
        trigger={<EllipsisButton />}
        items={[
          { icon: <Edit2 size={14} />, label: 'Edit' },
          { icon: <Copy size={14} />, label: 'Duplicate' },
          { icon: <Archive size={14} />, label: 'Archive' },
          {
            icon: <Trash2 size={14} />,
            label: 'Delete',
            variant: 'danger',
            dividerAbove: true,
          },
        ]}
      />
    </div>
  ),
};
