import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadiusSwatch, Section } from './TokenDocs';

const meta: Meta = {
  title: 'Atoms/Radius & Shape',
  parameters: { layout: 'fullscreen', controls: { disable: true }, actions: { disable: true } },
};
export default meta;

const radii = [
  { name: '0',       value: '0px' },
  { name: '2',       value: '2px' },
  { name: '4',       value: '4px' },
  { name: '6',       value: '6px' },
  { name: '8',       value: '8px' },
  { name: '10',      value: '10px' },
  { name: '12',      value: '12px' },
  { name: '16',      value: '16px' },
  { name: '20',      value: '20px' },
  { name: '24',      value: '24px' },
  { name: 'rounded', value: '9999px' },
];

export const RadiusScale: StoryObj = {
  name: 'Radius Scale',
  render: () => (
    <Section title="Border Radius">
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 32 }}>
        Border radius tokens used across components. <code style={{ fontFamily: 'monospace', fontSize: 12 }}>--radius-rounded</code> produces a full pill/circle shape.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
        {radii.map((r) => <RadiusSwatch key={r.name} name={r.name} value={r.value} />)}
      </div>
    </Section>
  ),
};
