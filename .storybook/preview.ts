import type { Preview } from '@storybook/nextjs-vite';

// @ts-expect-error - Storybook에서 글로벌 CSS를 불러올 때 발생하는 타입 오류 무시
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
