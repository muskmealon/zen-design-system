import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Multi-line text input with label, helper text, error state, character count, and resize control. Forwarded ref compatible.',
      },
    },
  },
  argTypes: {
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'both'],
    },
    rows: { control: 'number' },
    disabled: { control: 'boolean' },
    showCount: { control: 'boolean' },
    maxLength: { control: 'number' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
    placeholder: { control: 'text' },
  },
  args: {
    placeholder: 'Enter text…',
    rows: 4,
    resize: 'vertical',
    disabled: false,
    showCount: false,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    placeholder: 'Start typing…',
  },
  render: (args) => (
    <div style={{ maxWidth: '480px' }}>
      <Textarea {...args} />
    </div>
  ),
};

// ─── With label ───────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  name: 'With label',
  args: {
    label: 'Description',
    placeholder: 'Write a short description…',
    helperText: 'Describe the item in a few sentences.',
  },
  render: (args) => (
    <div style={{ maxWidth: '480px' }}>
      <Textarea {...args} />
    </div>
  ),
};

// ─── Error ────────────────────────────────────────────────────────────────────

export const Error: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Share your feedback…',
    errorText: 'This field is required.',
    defaultValue: '',
  },
  render: (args) => (
    <div style={{ maxWidth: '480px' }}>
      <Textarea {...args} />
    </div>
  ),
};

// ─── With character count ─────────────────────────────────────────────────────

export const WithCharCount: Story = {
  name: 'With character count',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ maxWidth: '480px' }}>
        <Textarea
          label="Bio"
          placeholder="Tell us about yourself…"
          helperText="Keep it brief."
          showCount
          maxLength={200}
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
      </div>
    );
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    label: 'Notes',
    placeholder: 'No notes available.',
    helperText: 'This field is read-only.',
    disabled: true,
    defaultValue: 'These notes have been locked by an administrator.',
  },
  render: (args) => (
    <div style={{ maxWidth: '480px' }}>
      <Textarea {...args} />
    </div>
  ),
};

// ─── No resize ────────────────────────────────────────────────────────────────

export const NoResize: Story = {
  name: 'No resize',
  args: {
    label: 'Fixed textarea',
    placeholder: 'This textarea cannot be resized.',
    resize: 'none',
    rows: 5,
  },
  render: (args) => (
    <div style={{ maxWidth: '480px' }}>
      <Textarea {...args} />
    </div>
  ),
};

// ─── All states ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '480px' }}>
      <Textarea
        label="Default"
        placeholder="Default state"
      />
      <Textarea
        label="With helper"
        placeholder="With helper text"
        helperText="This is a helpful hint below the field."
      />
      <Textarea
        label="Error state"
        placeholder="Error state"
        errorText="This field has an error."
        defaultValue="Some invalid content here"
      />
      <Textarea
        label="With character count"
        placeholder="Type to see count…"
        showCount
        maxLength={150}
        defaultValue="Hello world"
      />
      <Textarea
        label="Disabled"
        disabled
        defaultValue="Disabled content that cannot be edited."
      />
    </div>
  ),
};
