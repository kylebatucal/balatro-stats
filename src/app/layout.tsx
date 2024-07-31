import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import '@/app/styles/colors.css'

const balatroFont = localFont({
  src: './styles/m6x11plus.ttf',
})

export const metadata: Metadata = {
  title: 'Balatro Stats',
  description: 'View and share your stats in Balatro!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={balatroFont.className}>{children}</body>
    </html>
  )
}
