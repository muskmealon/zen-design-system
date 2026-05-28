import type { Preview } from '@storybook/react-vite';
import '../src/tokens/tokens.css';

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
      const theme = context.globals['theme'] as string;
      return (
        <div data-theme={theme === 'dark' ? 'dark' : undefined}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;