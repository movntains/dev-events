import type { Metadata } from 'next';
import { Martian_Mono, Schibsted_Grotesk } from 'next/font/google';
import './globals.css';
import type { ReactNode } from 'react';

const schibstedGrotesk = Schibsted_Grotesk({
  variable: '--font-schibsted-grotesk',
  subsets: ['latin'],
});

const martianMono = Martian_Mono({
  variable: '--font-martian-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DevEvents',
  description: "The hub for every dev event you mustn't miss.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
