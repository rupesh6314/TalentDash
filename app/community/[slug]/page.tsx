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
    // Render community page (listing posts, just showing all for now since no category field)
    const posts = await prisma.communityPost.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/community" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">← Back to Community</Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{community.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{community.members.toLocaleString('en-US')} members</p>
        </div>
        
        <div className="space-y-4">
          {posts.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">No discussions yet in {community.name}.</p>
              <Button href={`/community/new?topic=${community.slug}`} variant="primary" className="mt-4">Start a discussion →</Button>
            </Card>
          ) : (
            posts.map((post) => (
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
        </div>
      </div>
    );
  }

  // Otherwise, it must be a post ID
  const post = await prisma.communityPost.findUnique({
    where: { id: slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/community" className="text-blue-600 hover:underline mb-6 inline-block">← Back to Community</Link>
      
      <Card className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap gap-4 items-center text-sm text-gray-600 dark:text-gray-300 mb-8 border-b dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {post.authorName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">{post.authorName}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{post.authorRole || 'Member'}</div>
            </div>
          </div>
          {post.company && <Badge variant="info">{post.company}</Badge>}
          <span className="ml-auto text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="prose max-w-none text-gray-800 dark:text-gray-200 whitespace-pre-wrap mb-8">
          {post.content}
        </div>

        <div className="flex items-center gap-4 border-t dark:border-gray-800 pt-4">
          <Button variant="outline" className="flex items-center gap-2">
            👍 {post.likes} Likes
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            💬 {post.replies} Replies
          </Button>
          <Button variant="outline" className="ml-auto">
            Share
          </Button>
        </div>
      </Card>
      
      {/* Mock Replies Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Replies ({post.replies})</h3>
        {post.replies > 0 ? (
          <Card className="p-6 text-center text-gray-500">
            Replies are not fully implemented yet in this demo.
          </Card>
        ) : (
          <Card className="p-6 text-center text-gray-500">
            No replies yet. Be the first to reply!
          </Card>
        )}
      </div>
    </div>
  );
}
