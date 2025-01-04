import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Geist, Geist_Mono as GeistMono } from 'next/font/google';
import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = GeistMono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lumea',
  description:
    'Lumea AI merupakan platform Customer Service berbasis AI yang bisa bantu handle leads dan chat yang masuk hingga closing dengan cepat dan mudah',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-theme="lumea-light">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
