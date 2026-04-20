import type { Metadata } from 'next';
import { ReactNode } from 'react';

import Providers from '@/components/common/Providers';

import './globals.css';
import Header from '@/components/common/Header/Header';

export const metadata: Metadata = {
  title: 'SpaceX Explorer',
  description: 'Frontend explorer for SpaceX launches',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
