import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  safelist: [{ pattern: /(grid|col|row|order|flex|basis|grow|shrink)-./ }],
  plugins: [daisyui],
  daisyui: {
    logs: false,
    themes: [
      {
        'lumea-light': {
          'color-scheme': 'light',
          primary: '#171717',
          secondary: '#FFFFFF',
          info: '#2563EB',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
          'base-100': '#FFFFFF',
          'base-200': '#F2F2F2',
          'base-300': '#E5E6E6',
          'base-content': '#171717',
        },
      },
    ],
  },
} satisfies Config;
