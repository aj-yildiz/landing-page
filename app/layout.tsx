// layout.tsx
import type { Metadata } from 'next'
import './globals.css' // Ensure globals.css is present

// ✅ UPDATED METADATA BELOW
export const metadata: Metadata = {
  title: 'Vastis',
  description: 'Join the waitlist for Vastis, your personalized AI companion for managing healthcare effectively.',
  generator: 'Next.js',
  metadataBase: new URL('https://vastis.app'),
  openGraph: {
    title: 'Bridging the Gap Between Practitioners and Patients',
    description: 'Empowering allied health practitioners to launch their own practice, without the clinic overhead. We connect practitioners to fully equipped spaces and support them in setting up their businesses.',
    url: 'https://vastis.app',
    siteName: 'Vastis',
    images: [
      {
        url: '/og-image.png', // Ensure this image exists in /public
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
    images: ['/og-image.png'], // Ensure this image exists in /public
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* You can add additional head elements here if needed */}
      </head>
      <body>{children}</body>
    </html>
  )
}
