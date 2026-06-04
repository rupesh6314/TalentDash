import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const revalidate = 3600;

async function getReviews() {
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
}

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Company Reviews</h1>
      <p className="text-gray-600 mb-8">Honest reviews from real employees. See pros, cons, and advice.</p>

      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} hover className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">
                  <a href={`/companies/${review.companySlug}`} className="hover:text-blue-600">
                    {review.companyName}
                  </a>
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <Badge variant="info">{review.rating}/5</Badge>
                </div>
                <div className="mt-3">
                  <p className="text-gray-700"><strong>Pros:</strong> {review.pros}</p>
                  <p className="text-gray-700 mt-1"><strong>Cons:</strong> {review.cons}</p>
                  {review.advice && <p className="text-gray-700 mt-1"><strong>Advice to management:</strong> {review.advice}</p>}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-4">
              Posted {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </Card>
        ))}

        {reviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </div>
  );
}