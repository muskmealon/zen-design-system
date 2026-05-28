import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorGroup, PaletteRow, Section } from './TokenDocs';

const meta: Meta = {
  title: 'Atoms/Colors',
  parameters: { layout: 'fullscreen', controls: { disable: true }, actions: { disable: true } },
};
export default meta;

/* ── Base Palette ─────────────────────────────────────────────────────────── */
export const BasePalette: StoryObj = {
  name: 'Base Palette',
  render: () => (
    <Section title="Base Palette">
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 24 }}>
        Raw color scales. Use semantic tokens in components, not these directly.
      </p>
      {[
        { name: 'teal', shades: [50,100,200,300,400,500,600,700,800,900] },
        { name: 'grey', shades: [50,100,200,300,400,500,600,700,800,900] },
        { name: 'indigo', shades: [50,100,200,300,400,500,600,700,800,900] },
        { name: 'blue', shades: [50,100,200,300,400,500,600,700,800,900] },
        { name: 'green', shades: [50,100,200,300,400,500,600,700,800,900] },
        { name: 'red', shades: [50,100,200,300,400,500,600,700,800,900] },
        { name: 'yellow', shades: [50,100,200,300,400,500,600,700,800,900] },
        { name: 'orange', shades: [50,100,200,300,400,500,600,700,800,900] },
        { name: 'purple', shades: [50,100,200,300,400,500,600,700,800,900] },
      ].map((p) => <PaletteRow key={p.name} name={p.name} shades={p.shades} />)}
    </Section>
  ),
};

/* ── Surface Tokens ───────────────────────────────────────────────────────── */
export const SurfaceTokens: StoryObj = {
  name: 'Surface Tokens',
  render: () => (
    <Section title="Surface Tokens">
      <ColorGroup title="Brand" tokens={[
        '--color-surface-brand-primary',
        '--color-surface-brand-primary-extra-bold',
        '--color-surface-brand-primary-semi-bold',
        '--color-surface-brand-primary-medium',
        '--color-surface-brand-primary-subtle',
        '--color-surface-brand-secondary',
        '--color-surface-brand-secondary-extra-bold',
        '--color-surface-brand-secondary-medium',
        '--color-surface-brand-secondary-subtle',
      ]} />
      <ColorGroup title="Neutral" tokens={[
        '--color-surface-default',
        '--color-surface-subtle',
        '--color-surface-light',
        '--color-surface-medium',
        '--color-surface-muted',
        '--color-surface-bold',
        '--color-surface-semi-bold',
        '--color-surface-extra-bold',
        '--color-surface-dark',
        '--color-surface-extra-dark',
      ]} />
      <ColorGroup title="Semantic" tokens={[
        '--color-surface-success-subtle',
        '--color-surface-success-medium',
        '--color-surface-success-bold',
        '--color-surface-error-subtle',
        '--color-surface-error-medium',
        '--color-surface-error-bold',
        '--color-surface-warning-subtle',
        '--color-surface-warning-medium',
        '--color-surface-warning-bold',
        '--color-surface-info-subtle',
        '--color-surface-info-medium',
        '--color-surface-info-bold',
        '--color-surface-accent-subtle',
        '--color-surface-accent-medium',
        '--color-surface-accent-bold',
      ]} />
      <ColorGroup title="Disabled" tokens={[
        '--color-surface-disabled-light',
        '--color-surface-disabled',
        '--color-surface-disabled-medium',
        '--color-surface-disabled-bold',
        '--color-surface-disabled-semi-bold',
        '--color-surface-disabled-extra-bold',
      ]} />
    </Section>
  ),
};

/* ── Text Tokens ──────────────────────────────────────────────────────────── */
export const TextTokens: StoryObj = {
  name: 'Text Tokens',
  render: () => (
    <Section title="Text Tokens">
      <ColorGroup title="Neutral" tokens={[
        '--color-text-primary',
        '--color-text-secondary',
        '--color-text-tertiary',
        '--color-text-muted',
        '--color-text-light',
        '--color-text-on-surface-bold',
        '--color-text-on-surface-subtle',
      ]} />
      <ColorGroup title="Brand" tokens={[
        '--color-text-brand-primary',
        '--color-text-brand-primary-extra-bold',
        '--color-text-brand-primary-medium',
        '--color-text-brand-primary-subtle',
        '--color-text-brand-secondary',
        '--color-text-brand-secondary-extra-bold',
      ]} />
      <ColorGroup title="Semantic" tokens={[
        '--color-text-success-bold',
        '--color-text-success-semi-bold',
        '--color-text-error-bold',
        '--color-text-error-semi-bold',
        '--color-text-warning-bold',
        '--color-text-warning-semi-bold',
        '--color-text-info-bold',
        '--color-text-info-semi-bold',
        '--color-text-accent-bold',
      ]} />
      <ColorGroup title="Disabled" tokens={[
        '--color-text-disabled',
        '--color-text-disabled-bold',
        '--color-text-disabled-light',
        '--color-text-disabled-semi-bold',
      ]} />
    </Section>
  ),
};

/* ── Border Tokens ────────────────────────────────────────────────────────── */
export const BorderTokens: StoryObj = {
  name: 'Border Tokens',
  render: () => (
    <Section title="Border Tokens">
      <ColorGroup title="Neutral" tokens={[
        '--color-border-default',
        '--color-border-subtle',
        '--color-border-light',
        '--color-border-medium',
        '--color-border-semi-bold',
        '--color-border-bold',
        '--color-border-extra-bold',
        '--color-border-dark',
        '--color-border-extra-dark',
        '--color-border-white',
      ]} />
      <ColorGroup title="Brand" tokens={[
        '--color-border-brand-primary',
        '--color-border-brand-primary-extra-bold',
        '--color-border-brand-primary-semi-bold',
        '--color-border-brand-primary-medium',
        '--color-border-brand-primary-subtle',
        '--color-border-brand-secondary',
        '--color-border-brand-secondary-medium',
      ]} />
      <ColorGroup title="Semantic" tokens={[
        '--color-border-success-bold',
        '--color-border-success-medium',
        '--color-border-success-subtle',
        '--color-border-error-bold',
        '--color-border-error-medium',
        '--color-border-error-subtle',
        '--color-border-warning-bold',
        '--color-border-warning-medium',
        '--color-border-warning-subtle',
        '--color-border-info-bold',
        '--color-border-info-medium',
        '--color-border-info-subtle',
      ]} />
    </Section>
  ),
};
