import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Needle Weekly',
  description: 'A personal music radar. Every Sunday, the albums worth your attention.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#ffffff' }}>
        {children}
      </body>
    </html>
  )
}
