import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Paradise Trip Viagens — Experiências pela América do Sul',
  description:
    'Passeios, transfers, pacotes e roteiros para descobrir os destinos mais incríveis da América do Sul. Atacama, Machu Picchu, Uyuni e muito mais.',
  keywords: ['viagens', 'América do Sul', 'Atacama', 'Machu Picchu', 'Uyuni', 'passeios', 'pacotes', 'transfers'],
  openGraph: {
    title: 'Paradise Trip Viagens',
    description: 'Vitrine digital de experiências turísticas pela América do Sul.',
    url: 'https://paradisetripviagens.com',
    siteName: 'Paradise Trip Viagens',
    locale: 'pt_BR',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/logo002.png', sizes: 'any' },
      { url: '/logo002.png', type: 'image/png' },
    ],
    shortcut: '/logo002.png',
    apple: '/logo002.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body className={`${outfit.variable} ${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
