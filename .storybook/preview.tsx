import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../src/tokens/tokens.css';
import theme from '../src/theme/theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
    options: {
      storySort: {
        order: ['Atoms', 'Components'],
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'surface-light', value: '#F5F6F7' },
        { name: 'dark', value: '#141B1F' },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const colorMode = context.globals['theme'] as string;
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div data-theme={colorMode === 'dark' ? 'dark' : undefined}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;