import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import { siteConfig } from '@/shared/config';
import { JsonLd, organizationSchema, websiteSchema } from '@/shared/lib/seo';
import './globals.css';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-ibm-plex-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — медицинские цифровые сервисы, экспертиза и инвестиции`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'медицинские цифровые сервисы',
    'MedTech',
    'Digital Health',
    'инвестиции в медицину',
    'экспертиза проектов',
    'Сеченовский Университет',
  ],
  authors: [{ name: siteConfig.organization.name, url: siteConfig.organization.url }],
  creator: siteConfig.organization.name,
  publisher: siteConfig.organization.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
};

export const viewport: Viewport = {
  themeColor: '#387184',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={ibmPlexSans.variable}>
      <body>
        {children}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
