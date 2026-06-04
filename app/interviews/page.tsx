import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const revalidate = 3600;

async function getInterviews() {
  const interviews = await prisma.interview.findMany({
    include: { company: true },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  return interviews.map((i) => ({
    id: i.id,
    companyName: i.company.name,
    companySlug: i.company.slug,
    role: i.role,
    difficulty: i.difficulty,
    experience: i.experience,
    outcome: i.outcome,
    createdAt: i.createdAt,
  }));
}

export default async function InterviewsPage() {
  const interviews = await getInterviews();

  const difficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'success';
      case 'Medium': return 'warning';
      case 'Hard': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Interview Experiences</h1>
      <p className="text-gray-600 mb-8">Real interview questions and experiences shared by candidates.</p>

      <div className="space-y-6">
        {interviews.map((interview) => (
          <Card key={interview.id} hover className="p-6">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  <a href={`/companies/${interview.companySlug}`} className="hover:text-blue-600">
                    {interview.companyName}
                  </a>
                  <span className="text-gray-500 text-lg ml-2">· {interview.role}</span>
                </h2>
                <div className="flex gap-2 mt-2">
                  <Badge variant={difficultyColor(interview.difficulty)}>Difficulty: {interview.difficulty}</Badge>
                  <Badge variant={interview.outcome === 'Offer' ? 'success' : 'default'}>Outcome: {interview.outcome}</Badge>
                </div>
                <p className="text-gray-700 mt-3">{interview.experience}</p>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-4">
              Posted {new Date(interview.createdAt).toLocaleDateString()}
            </div>
          </Card>
        ))}

        {interviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No interview experiences yet. Share your experience to help others!</p>
          </div>
        )}
      </div>
    </div>
  );
}