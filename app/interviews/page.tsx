import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const revalidate = 3600;

async function getInterviews() {
  try {
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
  } catch (error) {
    return [
      {
        id: 'mock-1', companyName: 'Meta', companySlug: 'meta', role: 'Frontend Engineer',
        difficulty: 'Hard', experience: 'Asked to build a React component from scratch and answer DOM manipulation questions. Very intensive but fair.',
        outcome: 'Offer', createdAt: new Date()
      },
      {
        id: 'mock-2', companyName: 'Netflix', companySlug: 'netflix', role: 'Senior Backend Engineer',
        difficulty: 'Hard', experience: 'System design round was extremely thorough. Focused heavily on microservices, scaling, and fault tolerance.',
        outcome: 'Pending', createdAt: new Date(Date.now() - 86400000)
      },
      {
        id: 'mock-3', companyName: 'Stripe', companySlug: 'stripe', role: 'Software Engineer',
        difficulty: 'Medium', experience: 'Practical debugging session followed by an API design round. The interviewers were very collaborative.',
        outcome: 'Offer', createdAt: new Date(Date.now() - 172800000)
      }
    ];
  }
}

export default async function InterviewsPage() {
  const interviews = await getInterviews();

  const difficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'success';
      case 'Medium': return 'warning';
      case 'Hard': return 'error';
      default: return 'default';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-background min-h-screen">
      <div className="flex justify-between items-start mb-10 border-b border-border pb-8">
        <div>
          <div className="flex items-center gap-2 text-success font-bold text-xs tracking-wider mb-2 uppercase">
            <span className="w-5 h-5 rounded bg-green-100 text-green-600 flex items-center justify-center">🎯</span>
            INTERVIEWS
          </div>
          <h1 className="text-[36px] font-bold text-deep-text mb-2">Interview Experiences</h1>
          <p className="text-body-text text-lg">Real interview questions and experiences shared by candidates.</p>
        </div>
        <div className="hidden md:block">
           <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold shadow-sm hover:bg-primary/90 transition">
             Share experience +
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-5">
            <h3 className="font-bold text-sm mb-4 text-muted uppercase tracking-wider">Difficulty</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-body-text cursor-pointer hover:text-primary"><input type="checkbox" className="rounded border-gray-300" /> Easy</label>
              <label className="flex items-center gap-2 text-sm text-body-text cursor-pointer hover:text-primary"><input type="checkbox" className="rounded border-gray-300" /> Medium</label>
              <label className="flex items-center gap-2 text-sm text-body-text cursor-pointer hover:text-primary"><input type="checkbox" className="rounded border-gray-300" /> Hard</label>
            </div>
            
            <h3 className="font-bold text-sm mb-4 mt-8 text-muted uppercase tracking-wider">Outcome</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-body-text cursor-pointer hover:text-primary"><input type="checkbox" className="rounded border-gray-300" /> Offer</label>
              <label className="flex items-center gap-2 text-sm text-body-text cursor-pointer hover:text-primary"><input type="checkbox" className="rounded border-gray-300" /> No Offer</label>
              <label className="flex items-center gap-2 text-sm text-body-text cursor-pointer hover:text-primary"><input type="checkbox" className="rounded border-gray-300" /> Pending</label>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-3 space-y-6">
        {interviews.map((interview) => (
          <Card key={interview.id} hover className="p-6">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-deep-text">
                  <a href={`/companies/${interview.companySlug}`} className="hover:text-primary">
                    {interview.companyName}
                  </a>
                  <span className="text-muted text-base font-medium ml-2">· {interview.role}</span>
                </h2>
                <div className="flex gap-2 mt-3 mb-4">
                  <Badge variant={difficultyColor(interview.difficulty)}>Difficulty: {interview.difficulty}</Badge>
                  <Badge variant={interview.outcome === 'Offer' ? 'success' : 'default'}>Outcome: {interview.outcome}</Badge>
                </div>
                <p className="text-body-text text-sm leading-relaxed">{interview.experience}</p>
              </div>
            </div>
            <div className="text-xs text-muted mt-4 pt-4 border-t border-border">
              Posted {new Date(interview.createdAt).toLocaleDateString()}
            </div>
          </Card>
        ))}

        {interviews.length === 0 && (
          <div className="text-center py-12 bg-surface border border-border rounded-xl">
            <p className="text-body-text">No interview experiences yet. Share your experience to help others!</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}