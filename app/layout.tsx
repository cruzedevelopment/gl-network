import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Growth Language',
  description: 'Created by the Growth Language team',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
