import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Typography primitive. Variant controls scale; color and weight are independent props sourced from semantic tokens.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1','h2','h3','h4','h5','h6','body1','body2','caption','overline','label','code'],
    },
    color: {
      control: 'select',
      options: ['primary','secondary','tertiary','muted','brand','error','success','warning','info','inverse','disabled'],
    },
    weight: {
      control: 'select',
      options: [undefined,'regular','medium','semiBold','bold'],
    },
    truncate: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: { variant: 'body1', color: 'primary', children: 'The quick brown fox jumps over the lazy dog.' },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const HeadingScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text variant="h1">Heading 1 — 44px</Text>
      <Text variant="h2">Heading 2 — 36px</Text>
      <Text variant="h3">Heading 3 — 28px</Text>
      <Text variant="h4">Heading 4 — 24px</Text>
      <Text variant="h5">Heading 5 — 20px</Text>
      <Text variant="h6">Heading 6 — 18px</Text>
    </div>
  ),
};

export const BodyScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text variant="body1">Body 1 — 16px Regular</Text>
      <Text variant="body2">Body 2 — 14px Regular</Text>
      <Text variant="caption">Caption — 12px</Text>
      <Text variant="label">Label — 14px Medium</Text>
      <Text variant="overline">Overline — Uppercase 11px</Text>
      <Text variant="code">code.snippet — monospace 13px</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {(['primary','secondary','tertiary','muted','brand','error','success','warning','info','disabled'] as const).map((c) => (
        <Text key={c} color={c}>{c} — The quick brown fox</Text>
      ))}
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text weight="regular">Regular 400</Text>
      <Text weight="medium">Medium 500</Text>
      <Text weight="semiBold">Semi Bold 600</Text>
      <Text weight="bold">Bold 700</Text>
    </div>
  ),
};
