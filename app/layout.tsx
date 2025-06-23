// layout.tsx
import type { Metadata } from 'next'
import './globals.css'

// ✅ UPDATED METADATA BELOW
export const metadata: Metadata = {
  title: 'Vastis – AI-Powered Healthcare Assistant',
  description: 'Join the waitlist for Vastis, your personalized AI companion for managing healthcare effectively.',
  generator: 'Next.js',
  metadataBase: new URL('https://vastis.app'),
  openGraph: {
    title: 'Bridging the Gap Between Practitioners and Patients',
    description: 'Join the waitlist for Vastis as a gym or practicioner to get access to the platform.',
    url: 'https://vastis.app',
    siteName: 'Vastis',
    images: [
      {
        url: '/og-image.png', // 🔁 Make sure this image exists in /public
        width: 1200,
        height: 630,
        alt: 'Vastis Logo or Preview Image',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vastis',
    description: 'Join the waitlist for Vastis.',
    //images: ['/og-image.png'], // 🔁 This image should be inside the /public folder
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
