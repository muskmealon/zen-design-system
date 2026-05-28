import type { Meta, StoryObj } from '@storybook/react-vite';
import { SpacingSwatch, Section } from './TokenDocs';

const meta: Meta = {
  title: 'Atoms/Spacing',
  parameters: { layout: 'fullscreen', controls: { disable: true }, actions: { disable: true } },
};
export default meta;

export const SpacingScale: StoryObj = {
  name: 'Spacing Scale',
  render: () => (
    <Section title="Spacing">
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 24 }}>
        All spacing values are based on a 4px base unit. Use these tokens for padding, margin, and gap.
      </p>
      <div style={{ maxWidth: 560 }}>
        {[0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80].map((v) => (
          <SpacingSwatch key={v} value={v} />
        ))}
      </div>
    </Section>
  ),
};

export const SizeScale: StoryObj = {
  name: 'Size Scale',
  render: () => (
    <Section title="Size Scale">
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 24 }}>
        Fixed pixel sizes for component heights, icon sizes, and fixed-dimension elements.
      </p>
      <div>
        {[0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80, 160, 240, 320, 640].map((v) => {
          const token = `--size-${v}`;
          return (
            <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '6px 0', borderBottom: '1px solid var(--color-border-light)' }}>
              <div style={{ width: 48, fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--color-text-muted)', textAlign: 'right', flexShrink: 0 }}>
                {v}px
              </div>
              <div style={{ height: 8, width: `min(var(${token}), 600px)`, minWidth: v === 0 ? 0 : 2, background: 'var(--color-surface-brand-secondary-subtle)', borderRadius: 2, flexShrink: 0 }} />
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--color-text-muted)' }}>{token}</div>
            </div>
          );
        })}
      </div>
    </Section>
  ),
};
