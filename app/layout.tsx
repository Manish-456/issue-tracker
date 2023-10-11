import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './nav-bar'
import { Theme } from '@radix-ui/themes';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Issue tracker',
  description: 'Issue Tracker - Track your day-to-day issue',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
      <Theme appearance="light" accentColor="violet">
        <Navbar/>
        <main className='p-5'>
        {children}
        </main>
        </Theme>
        </body>
    </html>
        )
      }

