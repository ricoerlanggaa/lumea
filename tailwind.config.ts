import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import { breakpoints, light } from './src/utilities/themes';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      sm: `${breakpoints.sm}`,
      md: `${breakpoints.md}`,
      lg: `${breakpoints.lg}`,
      xl: `${breakpoints.xl}`,
      '2xl': `${breakpoints['2xl']}`,
    },
  },
  plugins: [daisyui],
  daisyui: {
    logs: false,
    themes: [{ light }],
  },
} satisfies Config;
