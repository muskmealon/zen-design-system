import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionItem } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Vertically stacked set of interactive headings that each reveal a section of content. Supports single and multi-open modes.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <Accordion>
        <AccordionItem title="What is the Zen Design System?">
          The Zen Design System is a token-driven component library that ensures
          visual consistency across all Zen products. It provides reusable
          components, design tokens, and guidelines.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const MultipleItems: Story = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <Accordion>
        <AccordionItem title="Getting started" defaultOpen>
          Install the package and import the token stylesheet. All components
          consume CSS variables defined in <code>tokens.css</code>.
        </AccordionItem>
        <AccordionItem title="Design tokens">
          Tokens are organised into color, spacing, radius, and typography
          categories. They are available as CSS custom properties on{' '}
          <code>:root</code>.
        </AccordionItem>
        <AccordionItem title="Contributing">
          Open a pull request against the <code>main</code> branch. Make sure
          your component includes a <code>.tsx</code>, <code>.module.css</code>,
          and <code>.stories.tsx</code> file.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const AllowMultipleOpen: Story = {
  name: 'Allow multiple open',
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <Accordion allowMultiple>
        <AccordionItem title="Section A" defaultOpen>
          Content for section A. This accordion allows multiple items to be open
          at the same time.
        </AccordionItem>
        <AccordionItem title="Section B" defaultOpen>
          Content for section B. Both A and B start open.
        </AccordionItem>
        <AccordionItem title="Section C">
          Content for section C. Click to expand alongside A and B.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const SingleOpen: Story = {
  name: 'Single open (allowMultiple=false)',
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <Accordion allowMultiple={false}>
        <AccordionItem title="Item one" defaultOpen>
          Opening another item will close this one automatically.
        </AccordionItem>
        <AccordionItem title="Item two">
          Only one item can be open at a time.
        </AccordionItem>
        <AccordionItem title="Item three">
          Try opening all three — only the latest click stays open.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const WithDisabledItem: Story = {
  name: 'With disabled item',
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <Accordion>
        <AccordionItem title="Enabled item">
          This item can be toggled normally.
        </AccordionItem>
        <AccordionItem title="Disabled item — cannot be opened" disabled>
          This content is unreachable.
        </AccordionItem>
        <AccordionItem title="Another enabled item">
          This item can also be toggled.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#748FA1', fontFamily: 'IBM Plex Sans, sans-serif' }}>Small</p>
        <Accordion>
          <AccordionItem title="Small accordion item" size="sm">
            Compact padding, smaller font. Suitable for dense UIs.
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#748FA1', fontFamily: 'IBM Plex Sans, sans-serif' }}>Medium (default)</p>
        <Accordion>
          <AccordionItem title="Medium accordion item" size="md">
            Default size — balanced padding and typography.
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#748FA1', fontFamily: 'IBM Plex Sans, sans-serif' }}>Large</p>
        <Accordion>
          <AccordionItem title="Large accordion item" size="lg">
            More generous padding. Great for hero FAQ sections.
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};
