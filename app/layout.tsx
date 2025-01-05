import type { Metadata } from 'next';
import { LanguageProvider } from '../translations/LanguageContext';

export const metadata: Metadata = {
  title: 'Heidi & Kareem',
  description: 'Join us in celebrating our special weekend with the rest of our loved ones on the weekend of September 25th 2025. RSVP on our website.',
  openGraph: {
    type: 'website',
    url: 'https://heidiandkareem.com',
    title: 'Heidi & Kareem',
    description: 'Join us in celebrating our special weekend with the rest of our loved ones on the weekend of September 25th 2025. RSVP on our website.',
    siteName: 'Heidi & Kareem',
    images: [{
      url: 'https://heidiandkareem.com/share.jpg',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heidi & Kareem',
    description: 'Join us in celebrating our special weekend with the rest of our loved ones on the weekend of September 25th 2025. RSVP on our website.',
    images: ['https://heidiandkareem.com/share.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/share.jpg',
  },
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="theme-light">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
