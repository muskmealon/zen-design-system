import { useEffect, useState, type CSSProperties } from 'react';

function getCSSVar(name: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/* ── Color swatch ─────────────────────────────────────────────────────────── */
export function ColorSwatch({ token, label }: { token: string; label?: string }) {
  const [value, setValue] = useState('');
  useEffect(() => { setValue(getCSSVar(token)); }, [token]);

  const style: CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: 6,
    background: `var(${token})`,
    border: '1px solid rgba(0,0,0,0.08)',
    flexShrink: 0,
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0' }}>
      <div style={style} />
      <div>
        <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>
          {label ?? token.replace('--', '')}
        </div>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>
          {token} · {value}
        </div>
      </div>
    </div>
  );
}

/* ── Color group ──────────────────────────────────────────────────────────── */
export function ColorGroup({ title, tokens }: { title: string; tokens: string[] }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
        marginBottom: 8,
        paddingBottom: 6,
        borderBottom: '1px solid var(--color-border-light)',
      }}>
        {title}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 4 }}>
        {tokens.map((t) => <ColorSwatch key={t} token={t} />)}
      </div>
    </div>
  );
}

/* ── Palette row (base colors) ───────────────────────────────────────────── */
export function PaletteRow({ name, shades }: { name: string; shades: number[] }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 4, textTransform: 'capitalize' }}>
        {name}
      </div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {shades.map((shade) => {
          const token = `--color-${name}-${shade}`;
          return (
            <div key={shade} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 44, height: 44, borderRadius: 6, background: `var(${token})`, border: '1px solid rgba(0,0,0,0.08)' }} />
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: 'var(--color-text-muted)' }}>{shade}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Type specimen ────────────────────────────────────────────────────────── */
export function TypeSpecimen({
  token, size, lineHeight, weight, label, sample = 'The quick brown fox',
}: {
  token: string; size: string; lineHeight: string; weight: string; label: string; sample?: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, padding: '10px 0', borderBottom: '1px solid var(--color-border-light)' }}>
      <div style={{ width: 160, flexShrink: 0 }}>
        <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>{label}</div>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: 'var(--color-text-muted)', marginTop: 2 }}>
          {size} / {lineHeight} · {weight}
        </div>
      </div>
      <div style={{
        fontFamily: 'var(--font-family-primary)',
        fontSize: `var(${token}-size)`,
        lineHeight: `var(${token}-line-height)`,
        fontWeight: weight === 'Bold' ? 700 : weight === 'SemiBold' ? 600 : weight === 'Medium' ? 500 : 400,
        color: 'var(--color-text-primary)',
      }}>
        {sample}
      </div>
    </div>
  );
}

/* ── Spacing swatch ───────────────────────────────────────────────────────── */
export function SpacingSwatch({ value }: { value: number }) {
  const token = `--space-${value}`;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '6px 0', borderBottom: '1px solid var(--color-border-light)' }}>
      <div style={{ width: 48, fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--color-text-muted)', textAlign: 'right', flexShrink: 0 }}>
        {value}px
      </div>
      <div style={{ height: 24, width: `var(${token})`, minWidth: 2, background: 'var(--color-surface-brand-primary)', borderRadius: 2, flexShrink: 0 }} />
      <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--color-text-muted)' }}>{token}</div>
    </div>
  );
}

/* ── Radius swatch ────────────────────────────────────────────────────────── */
export function RadiusSwatch({ name, value }: { name: string; value: string }) {
  const token = `--radius-${name}`;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 64, height: 64,
        background: 'var(--color-surface-brand-primary-subtle)',
        border: '2px solid var(--color-border-brand-primary)',
        borderRadius: `var(${token})`,
      }} />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--color-text-primary)', fontWeight: 500 }}>{value}</div>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: 'var(--color-text-muted)', marginTop: 2 }}>{token}</div>
      </div>
    </div>
  );
}

/* ── Section wrapper ──────────────────────────────────────────────────────── */
export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 32px', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 24, paddingBottom: 12, borderBottom: '2px solid var(--color-border-brand-primary-subtle)' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
