import { createTheme } from '@mui/material/styles'
import paletteTokens from '../tokens/figma-tokens/palette.json' with { type: 'json' }

// Unwrap Style Dictionary { value, type } token objects into plain values
function unwrap(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => {
      if (v && typeof v === 'object' && 'value' in v) return [k, (v as { value: unknown }).value]
      if (v && typeof v === 'object') return [k, unwrap(v as Record<string, unknown>)]
      return [k, v]
    })
  )
}

const p = unwrap(paletteTokens.palette as Record<string, unknown>)

const theme = createTheme({
  palette: {
    primary:    p.primary    as object,
    secondary:  p.secondary  as object,
    error:      p.error      as object,
    warning:    p.warning    as object,
    success:    p.success    as object,
    info:       p.info       as object,
    text:       p.text       as object,
    background: p.background as object,
    divider:    p.divider    as string,
    action:     p.action     as object,
  },
  typography: {
    fontFamily: '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium:  500,
    fontWeightBold:    700,
  },
  shape: {
    borderRadius: 6,
  },
  spacing: 4,
})

export default theme
