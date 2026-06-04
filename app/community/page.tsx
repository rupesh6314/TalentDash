import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const revalidate = 300;

async function getCommunityData() {
  // Safe query: just get the latest posts (no groupBy)
  const trendingPosts = await prisma.communityPost.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  // Popular communities – static for now (can be replaced with real aggregation later)
  const popularCommunities = [
    { name: 'Software Engineering', members: 128000, slug: 'software-engineering' },
    { name: 'Product Management', members: 51000, slug: 'product-management' },
    { name: 'Data Science', members: 78000, slug: 'data-science' },
    { name: 'Startups', members: 42000, slug: 'startups' },
  ];

  // Top contributors – simplified: group by authorName using manual aggregation (safer than Prisma groupBy)
  const allPosts = await prisma.communityPost.findMany({
    select: { authorName: true, likes: true },
  });
  const contributorMap = new Map<string, number>();
  for (const post of allPosts) {
    const current = contributorMap.get(post.authorName) || 0;
    contributorMap.set(post.authorName, current + post.likes);
  }
  const topContributors = Array.from(contributorMap.entries())
    .map(([authorName, totalLikes]) => ({ authorName, totalLikes }))
    .sort((a, b) => b.totalLikes - a.totalLikes)
    .slice(0, 5);

  return { trendingPosts, popularCommunities, topContributors };
}

export default async function CommunityPage() {
  const { trendingPosts, popularCommunities, topContributors } = await getCommunityData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Community</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">What professionals are discussing – real conversations, real insights.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main feed */}
        <div className="lg:col-span-2 space-y-4">
          {trendingPosts.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">No discussions yet. Be the first to start a conversation!</p>
              <Button variant="primary" className="mt-4">Start a discussion →</Button>
            </Card>
          ) : (
            trendingPosts.map((post) => (
              <Card key={post.id} hover className="p-5">
                <Link href={`/community/${post.id}`} className="block">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">{post.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>by {post.authorName}</span>
                    {post.company && <Badge variant="info">{post.company}</Badge>}
                    <span>· {post.replies} replies</span>
                    <span>· {post.likes} likes</span>
                    <span>· {new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-3 text-gray-700 dark:text-gray-300 line-clamp-2">{post.content}</p>
                </Link>
              </Card>
            ))
          )}
          {trendingPosts.length > 0 && (
            <div className="text-center pt-4">
              <Button variant="outline">Load more discussions</Button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">🔥 Popular communities</h3>
            <div className="space-y-3">
              {popularCommunities.map((c) => (
                <Link key={c.slug} href={`/community/${c.slug}`} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <span className="font-medium text-gray-900 dark:text-gray-100">{c.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{c.members.toLocaleString('en-US')} members</span>
                </Link>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">🏆 Top contributors</h3>
            <div className="space-y-3">
              {topContributors.length === 0 ? (
                <p className="text-gray-400 text-sm">No contributors yet.</p>
              ) : (
                topContributors.map((contributor, idx) => (
                  <div key={contributor.authorName} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{contributor.authorName}</span>
                      <div className="text-xs text-gray-400">Top {idx + 1}%</div>
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">{contributor.totalLikes} likes</div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Button variant="primary" className="w-full">Start a discussion →</Button>
        </div>
      </div>
    </div>
  );
}