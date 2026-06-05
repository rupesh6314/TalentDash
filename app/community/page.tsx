import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const revalidate = 300;

async function getCommunityData() {
  try {
    const trendingPosts = await prisma.communityPost.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const popularCommunities = [
      { name: 'Software Engineering', members: 128000, slug: 'software-engineering' },
      { name: 'Product Management', members: 51000, slug: 'product-management' },
      { name: 'Data Science', members: 78000, slug: 'data-science' },
      { name: 'Startups', members: 42000, slug: 'startups' },
    ];

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
  } catch (error) {
    return { 
      trendingPosts: [
        {
          id: 'mock-1', title: 'Are AI engineers now overpaid?', content: 'Seeing crazy salaries for junior AI roles recently...',
          authorName: 'TechLead', company: 'Google', replies: 245, likes: 1840, createdAt: new Date()
        },
        {
          id: 'mock-2', title: 'Layoffs 2026: What to expect?', content: 'Are we seeing another wave of mass layoffs?',
          authorName: 'DevRelGuy', company: '', replies: 89, likes: 520, createdAt: new Date(Date.now() - 86400000)
        },
        {
          id: 'mock-3', title: 'Remote work vs RTO mandates', content: 'My company just announced 5 days a week RTO...',
          authorName: 'CodeMonkey', company: 'Amazon', replies: 312, likes: 2100, createdAt: new Date(Date.now() - 172800000)
        }
      ], 
      popularCommunities: [
        { name: 'Software Engineering', members: 128000, slug: 'software-engineering' },
        { name: 'Product Management', members: 51000, slug: 'product-management' },
        { name: 'Data Science', members: 78000, slug: 'data-science' }
      ], 
      topContributors: [
        { authorName: 'AlexTheDev', totalLikes: 15400 },
        { authorName: 'SarahCodes', totalLikes: 12100 },
        { authorName: 'MikePM', totalLikes: 9800 }
      ] 
    };
  }
}

export default async function CommunityPage() {
  const { trendingPosts, popularCommunities, topContributors } = await getCommunityData();

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs tracking-wider mb-2 uppercase">
              <span className="w-5 h-5 rounded bg-blue-100 text-blue-600 flex items-center justify-center">💬</span>
              COMMUNITY
            </div>
            <h1 className="text-[36px] font-bold text-deep-text mb-2">Real conversations. Real insights.</h1>
            <p className="text-body-text text-lg">Join the discussion with tech professionals worldwide.</p>
          </div>
          <Button href="/community/new" variant="primary" className="font-bold hidden md:flex">
            Start a discussion +
          </Button>
        </div>

        {/* Horizontal Trending Cards */}
        <div className="mb-8">
          <h2 className="font-bold text-sm text-muted mb-4">Trending right now</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {trendingPosts.slice(0, 4).map((post) => (
              <Card key={post.id} hover className="p-4 min-w-[280px] md:min-w-[320px] shrink-0 border-primary/20 bg-gradient-to-br from-white to-[#F2F7F5]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded">Trending 🔥</span>
                  <span className="text-xs text-muted">{post.likes} likes</span>
                </div>
                <h3 className="font-bold text-deep-text mb-1 line-clamp-2">{post.title}</h3>
                <p className="text-xs text-body-text line-clamp-1">{post.content}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main feed */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-bold text-xl text-deep-text mb-4 border-b border-border pb-2">Latest Discussions</h2>
            {trendingPosts.length === 0 ? (
              <Card className="p-8 text-center bg-surface">
                <p className="text-body-text">No discussions yet. Be the first to start a conversation!</p>
              </Card>
            ) : (
              trendingPosts.map((post) => (
                <Card key={post.id} hover className="p-6">
                  <Link href={`/community/${post.id}`} className="block">
                    <h3 className="text-lg font-bold text-deep-text hover:text-primary transition">{post.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2 mb-3 text-xs text-muted">
                      <span className="font-medium text-body-text">by {post.authorName}</span>
                      {post.company && <Badge variant="info">{post.company}</Badge>}
                      <span>· {post.replies} replies</span>
                      <span>· {post.likes} likes</span>
                      <span>· {new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-body-text text-sm line-clamp-2">{post.content}</p>
                  </Link>
                </Card>
              ))
            )}
            {trendingPosts.length > 0 && (
              <div className="text-center pt-4">
                <Button href="?page=2" variant="outline" className="w-full">Load more discussions</Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-sm mb-4 text-muted uppercase tracking-wider flex items-center gap-2">Popular communities</h3>
              <div className="space-y-2">
                {popularCommunities.map((c) => (
                  <Link key={c.slug} href={`/community/${c.slug}`} className="flex justify-between items-center p-3 rounded-lg hover:bg-hover transition-colors border border-transparent hover:border-border">
                    <span className="font-medium text-deep-text text-sm">{c.name}</span>
                    <span className="text-xs text-muted">{c.members.toLocaleString('en-US')}</span>
                  </Link>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-surface">
              <h3 className="font-bold text-sm mb-4 text-muted uppercase tracking-wider flex items-center gap-2">Top contributors</h3>
              <div className="space-y-4">
                {topContributors.length === 0 ? (
                  <p className="text-muted text-sm p-2">No contributors yet.</p>
                ) : (
                  topContributors.map((contributor, idx) => (
                    <div key={contributor.authorName} className="flex justify-between items-center px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="font-bold text-deep-text text-sm">{contributor.authorName}</div>
                          <div className="text-[10px] text-muted">{contributor.totalLikes} likes</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}