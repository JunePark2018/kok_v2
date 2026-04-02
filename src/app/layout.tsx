import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StorefrontLayoutWrapper from '@/components/StorefrontLayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kokkok Garden',
  description: 'Premium Skincare featuring Heartleaf, Jericho Rose, and Sedum.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-white text-neutral-950 font-sans antialiased min-h-screen`}>
        <StorefrontLayoutWrapper>
          {children}
        </StorefrontLayoutWrapper>
      </body>
    </html>
  );
}
