import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { getRepoStats } from '@/lib/github'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'MekongTunnel — Expose localhost in one command',
    template: '%s · MekongTunnel',
  },
  description:
    'Open-source SSH tunnel server. Expose your local server to the internet instantly — no signup, no config. Built by Ing Muyleang.',
  keywords: ['ssh tunnel', 'localhost tunnel', 'ngrok alternative', 'open source', 'go'],
  authors: [{ name: 'Ing Muyleang', url: 'https://github.com/MuyleangIng' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mekongtunnel.dev',
    siteName: 'MekongTunnel',
    title: 'MekongTunnel — Expose localhost in one command',
    description: 'Open-source SSH tunnel server. No signup, no config.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MekongTunnel',
    description: 'Open-source SSH tunnel server. No signup, no config.',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { stars } = await getRepoStats()

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-bg text-dim font-sans">
        <Navbar stars={stars} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
