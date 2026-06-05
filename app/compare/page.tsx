import { prisma } from '@/lib/prisma';
import OfferComparator from '@/components/compare/OfferComparator';

export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: 'Compare Companies & Salaries | TalentDash',
    description: 'Compare tech company salaries, benefits, and workplace culture side-by-side.',
    alternates: { canonical: '/compare' }
  };
}

export default async function ComparePage() {
  let companiesRaw = [];
  try {
    companiesRaw = await prisma.company.findMany({
      select: { slug: true, name: true },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    companiesRaw = [
      { slug: 'google', name: 'Google' },
      { slug: 'meta', name: 'Meta' },
      { slug: 'amazon', name: 'Amazon' },
      { slug: 'microsoft', name: 'Microsoft' },
      { slug: 'apple', name: 'Apple' },
      { slug: 'netflix', name: 'Netflix' },
      { slug: 'stripe', name: 'Stripe' }
    ];
  }

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-deep-text mb-4">Compare Offers</h1>
          <p className="text-lg text-body-text max-w-2xl mx-auto">
            Deciding between two companies? Compare median compensation, negotiate better, and make the right career move.
          </p>
        </div>
        
        <OfferComparator companies={companiesRaw} />
      </div>
    </div>
  );
}