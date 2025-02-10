import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import { breakpoints, light } from './src/utilities/themes';

const themeScreens = Object.fromEntries(
  Object.entries(breakpoints).map(([key, value]) => [key, `${value}px`]),
);

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: themeScreens,
  },
  plugins: [daisyui],
  daisyui: {
    logs: false,
    themes: [{ light }],
  },
} satisfies Config;
