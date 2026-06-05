import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 300;

const popularCommunities = [
  { name: 'Software Engineering', members: 128000, slug: 'software-engineering' },
  { name: 'Product Management', members: 51000, slug: 'product-management' },
  { name: 'Data Science', members: 78000, slug: 'data-science' },
  { name: 'Startups', members: 42000, slug: 'startups' },
];

export default async function CommunityDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Check if it's a community slug
  const community = popularCommunities.find((c) => c.slug === slug);
  
  if (community) {
    let posts: any[] = [];
    try {
      posts = await prisma.communityPost.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20,
      });
    } catch (error) {}

    return (
      <div className="max-w-7xl mx-auto px-4 py-12 bg-background min-h-screen">
        <div className="mb-10 border-b border-border pb-8">
          <Link href="/community" className="text-primary hover:underline mb-4 inline-block font-bold">← Back to Community</Link>
          <h1 className="text-[36px] font-bold text-deep-text">{community.name}</h1>
          <p className="text-body-text text-lg mt-2">{community.members.toLocaleString('en-US')} members</p>
        </div>
        
        <div className="space-y-4">
          {posts.length === 0 ? (
            <Card className="p-8 text-center bg-surface">
              <p className="text-body-text">No discussions yet in {community.name}.</p>
              <Button href={`/community/new?topic=${community.slug}`} variant="primary" className="mt-4">Start a discussion →</Button>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} hover className="p-6">
                <Link href={`/community/${post.id}`} className="block">
                  <h3 className="text-xl font-bold text-deep-text hover:text-primary transition">{post.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted">
                    <span className="font-medium text-body-text">by {post.authorName}</span>
                    {post.company && <Badge variant="info">{post.company}</Badge>}
                    <span>· {post.replies} replies</span>
                    <span>· {post.likes} likes</span>
                    <span>· {new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-3 text-body-text line-clamp-2">{post.content}</p>
                </Link>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  }

  // Otherwise, it must be a post ID
  let post = null;
  try {
    post = await prisma.communityPost.findUnique({
      where: { id: slug },
    });
  } catch(error) {
    // Return a mock post so it doesn't crash or 404
    if (slug === 'mock-1' || slug === 'mock-2' || slug === 'mock-3') {
      post = {
        id: slug,
        title: 'Mock Discussion Title',
        content: 'This is a mock discussion content. It appears because the database is currently unreachable.',
        authorName: 'MockUser',
        authorRole: 'Member',
        createdAt: new Date(),
        likes: 156,
        replies: 342
      }
    }
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-background min-h-screen">
      <Link href="/community" className="text-primary hover:underline mb-6 inline-block font-bold">← Back to Community</Link>
      
      <Card className="p-8">
        <h1 className="text-[36px] font-bold text-deep-text mb-6 leading-tight">{post.title}</h1>
        
        <div className="flex flex-wrap gap-4 items-center text-sm text-body-text mb-8 border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
              {post.authorName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-bold text-deep-text text-base">{post.authorName}</div>
              <div className="text-xs text-muted font-medium">{post.authorRole || 'Member'}</div>
            </div>
          </div>
          {post.company && <Badge variant="info">{post.company}</Badge>}
          <span className="ml-auto text-muted font-medium">{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="prose max-w-none text-body-text text-lg leading-relaxed whitespace-pre-wrap mb-8">
          {post.content}
        </div>

        <div className="flex items-center gap-4 border-t border-border pt-6">
          <Button variant="outline" className="flex items-center gap-2 font-bold">
            👍 {post.likes} Likes
          </Button>
          <Button variant="outline" className="flex items-center gap-2 font-bold">
            💬 {post.replies} Replies
          </Button>
          <Button variant="outline" className="ml-auto font-bold">
            Share
          </Button>
        </div>
      </Card>
      
      {/* Mock Replies Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-deep-text mb-4">Replies ({post.replies})</h3>
        {post.replies > 0 ? (
          <Card className="p-8 text-center text-muted bg-surface">
            Replies are not fully implemented yet in this demo.
          </Card>
        ) : (
          <Card className="p-8 text-center text-muted bg-surface">
            No replies yet. Be the first to reply!
          </Card>
        )}
      </div>
    </div>
  );
}
