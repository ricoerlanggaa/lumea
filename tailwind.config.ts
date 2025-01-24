import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import { light } from 'daisyui/src/theming/themes';

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    logs: false,
    themes: [
      {
        'lumea-light': {
          ...light,
          primary: '#171717',
          secondary: '#FFFFFF',
          info: '#2563EB',
          success: '#15803D',
          warning: '#F59E0B',
          error: '#DC2626',
          accent: '#9333EA',
          neutral: '#2B3440',

          'primary-content': '#FFFFFF',
          'secondary-content': '#171717',
          'info-content': '#FFFFFF',
          'success-content': '#FFFFFF',
          'warning-content': '#FFFFFF',
          'error-content': '#FFFFFF',
          'accent-content': '#FFFFFF',
          'neutral-content': '#D7DDE4',

          'base-100': '#FFFFFF',
          'base-200': '#F3F4F6',
          'base-300': '#E5E7EB',
          'base-content': '#171717',
        },
      },
    ],
  },
} satisfies Config;
