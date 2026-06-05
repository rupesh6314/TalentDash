import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

const inter = Inter({ subsets: ['latin'] });
export const metadata = { title: { default: 'TalentDash', template: '%s | TalentDash' }, description: 'Real salaries, reviews, and career insights' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}