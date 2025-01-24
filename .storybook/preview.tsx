import React from 'react';
import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';
import { Geist, Geist_Mono as GeistMono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = GeistMono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});


const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
