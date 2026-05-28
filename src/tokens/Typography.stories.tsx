import type { Meta, StoryObj } from '@storybook/react-vite';
import { TypeSpecimen, Section } from './TokenDocs';

const meta: Meta = {
  title: 'Atoms/Typography',
  parameters: { layout: 'fullscreen', controls: { disable: true }, actions: { disable: true } },
};
export default meta;

export const TypeScale: StoryObj = {
  name: 'Type Scale',
  render: () => (
    <Section title="Typography">
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 12 }}>
          Font Family
        </div>
        <div style={{ fontFamily: 'var(--font-family-primary)', fontSize: 28, color: 'var(--color-text-primary)', fontWeight: 400 }}>
          IBM Plex Sans — Aa Bb Cc Dd Ee Ff 0123456789
        </div>
        <div style={{ fontFamily: 'var(--font-family-primary)', fontSize: 14, color: 'var(--color-text-muted)', marginTop: 4 }}>
          var(--font-family-primary)
        </div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 12 }}>
          Weights
        </div>
        {[
          { label: 'Regular', weight: 400, token: '--font-weight-regular' },
          { label: 'Medium', weight: 500, token: '--font-weight-medium' },
          { label: 'Semi Bold', weight: 600, token: '--font-weight-semi-bold' },
          { label: 'Bold', weight: 700, token: '--font-weight-bold' },
        ].map(({ label, weight, token }) => (
          <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 0', borderBottom: '1px solid var(--color-border-light)' }}>
            <div style={{ width: 120, fontFamily: 'monospace', fontSize: 11, color: 'var(--color-text-muted)' }}>{token}</div>
            <div style={{ fontFamily: 'var(--font-family-primary)', fontSize: 20, fontWeight: weight, color: 'var(--color-text-primary)' }}>
              {label} — The quick brown fox
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 12 }}>
          Heading Scale
        </div>
        <TypeSpecimen token="--font-heading-h44" size="44px" lineHeight="66px" weight="Bold"    label="Heading H44" sample="Display heading" />
        <TypeSpecimen token="--font-heading-h36" size="36px" lineHeight="40px" weight="Bold"    label="Heading H36" sample="Section title" />
        <TypeSpecimen token="--font-heading-h28" size="28px" lineHeight="32px" weight="SemiBold" label="Heading H28" sample="Page heading" />
        <TypeSpecimen token="--font-heading-h24" size="24px" lineHeight="34px" weight="SemiBold" label="Heading H24" sample="Card heading" />
        <TypeSpecimen token="--font-heading-h20" size="20px" lineHeight="30px" weight="SemiBold" label="Heading H20" sample="Panel title" />
        <TypeSpecimen token="--font-heading-h18" size="18px" lineHeight="28px" weight="SemiBold" label="Heading H18" sample="Section label" />
      </div>

      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 12 }}>
          Action / UI Scale
        </div>
        <TypeSpecimen token="--font-action-a16" size="16px" lineHeight="24px" weight="SemiBold" label="Action A16" sample="Large button label" />
        <TypeSpecimen token="--font-action-a14" size="14px" lineHeight="20px" weight="SemiBold" label="Action A14" sample="Default button label" />
        <TypeSpecimen token="--font-action-a12" size="12px" lineHeight="18px" weight="SemiBold" label="Action A12" sample="Small button label" />
      </div>
    </Section>
  ),
};
