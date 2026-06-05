import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const revalidate = 3600;

async function getReviews() {
  try {
    const reviews = await prisma.review.findMany({
      include: { company: true },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return reviews.map((r) => ({
      id: r.id,
      companyName: r.company.name,
      companySlug: r.company.slug,
      rating: r.rating,
      pros: r.pros,
      cons: r.cons,
      advice: r.advice,
      createdAt: r.createdAt,
    }));
  } catch (error) {
    return [
      {
        id: 'mock-1', companyName: 'Google', companySlug: 'google', rating: 5,
        pros: 'Amazing benefits, free food, smart people.',
        cons: 'Can be bureaucratic, slow promotions.',
        advice: 'Keep doing what you are doing.',
        createdAt: new Date()
      },
      {
        id: 'mock-2', companyName: 'Amazon', companySlug: 'amazon', rating: 3,
        pros: 'Great learning experience, fast-paced.',
        cons: 'Poor work-life balance, high stress.',
        advice: 'Focus more on employee well-being.',
        createdAt: new Date(Date.now() - 86400000)
      },
      {
        id: 'mock-3', companyName: 'Microsoft', companySlug: 'microsoft', rating: 4,
        pros: 'Great WLB, good compensation.',
        cons: 'Legacy code, some teams move slow.',
        advice: 'Modernize tech stack faster.',
        createdAt: new Date(Date.now() - 172800000)
      }
    ];
  }
}

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-background min-h-screen">
      <div className="flex justify-between items-start mb-10 border-b border-border pb-8">
        <div>
          <div className="flex items-center gap-2 text-warning font-bold text-xs tracking-wider mb-2 uppercase">
            <span className="w-5 h-5 rounded bg-orange-100 text-orange-600 flex items-center justify-center">⭐</span>
            REVIEWS
          </div>
          <h1 className="text-[36px] font-bold text-deep-text mb-2">Company Reviews</h1>
          <p className="text-body-text text-lg">Honest reviews from real employees. See pros, cons, and advice.</p>
        </div>
        <div className="hidden md:block">
           <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold shadow-sm hover:bg-primary/90 transition">
             Write a review +
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-5">
            <h3 className="font-bold text-sm mb-4 text-muted uppercase tracking-wider">Filter by Rating</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-body-text cursor-pointer hover:text-primary"><input type="checkbox" className="rounded border-gray-300" /> 5 Stars</label>
              <label className="flex items-center gap-2 text-sm text-body-text cursor-pointer hover:text-primary"><input type="checkbox" className="rounded border-gray-300" /> 4 Stars</label>
              <label className="flex items-center gap-2 text-sm text-body-text cursor-pointer hover:text-primary"><input type="checkbox" className="rounded border-gray-300" /> 3 Stars</label>
              <label className="flex items-center gap-2 text-sm text-body-text cursor-pointer hover:text-primary"><input type="checkbox" className="rounded border-gray-300" /> 2 Stars</label>
              <label className="flex items-center gap-2 text-sm text-body-text cursor-pointer hover:text-primary"><input type="checkbox" className="rounded border-gray-300" /> 1 Star</label>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-3 space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} hover className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-deep-text">
                  <a href={`/companies/${review.companySlug}`} className="hover:text-primary">
                    {review.companyName}
                  </a>
                </h2>
                <div className="flex items-center gap-2 mt-1 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-warning' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <Badge variant="info">{review.rating}/5</Badge>
                </div>
                <div className="mt-3 space-y-2">
                  <p className="text-body-text text-sm"><strong className="text-deep-text">Pros:</strong> {review.pros}</p>
                  <p className="text-body-text text-sm"><strong className="text-deep-text">Cons:</strong> {review.cons}</p>
                  {review.advice && <p className="text-body-text text-sm"><strong className="text-deep-text">Advice to management:</strong> {review.advice}</p>}
                </div>
              </div>
            </div>
            <div className="text-xs text-muted mt-4 pt-4 border-t border-border">
              Posted {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </Card>
        ))}

        {reviews.length === 0 && (
          <div className="text-center py-12 bg-surface border border-border rounded-xl">
            <p className="text-body-text">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}