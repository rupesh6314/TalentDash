import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export const revalidate = 3600;

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 bg-gradient-to-b from-[#F2F7F5] to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[48px] md:text-[64px] font-bold tracking-tight mb-4 text-deep-text">
            Explore. Compare. <span className="text-primary">Grow.</span>
          </h1>
          <p className="text-[18px] text-body-text mb-10 max-w-2xl mx-auto">
            Explore salaries, read real reviews, prepare for interviews,
            and find the right opportunities — all in one place.
          </p>

          {/* Search Box */}
          <div className="bg-surface rounded-2xl shadow-lg p-2 max-w-4xl mx-auto border border-border">
            <div className="flex gap-6 px-6 py-3 border-b border-border text-sm font-medium text-muted mb-2">
              <button className="text-deep-text border-b-2 border-deep-text pb-2 px-1 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-100 text-success flex items-center justify-center text-[10px]">$</span> Salaries
              </button>
              <button className="pb-2 px-1 flex items-center gap-2 hover:text-deep-text">☆ Reviews</button>
              <button className="pb-2 px-1 flex items-center gap-2 hover:text-deep-text">💬 Interviews</button>
              <button className="pb-2 px-1 flex items-center gap-2 hover:text-deep-text">👥 Forum</button>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-2 p-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-2 border-r border-border w-full">
                <span className="text-muted text-lg">🔍</span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-deep-text">Search by job title, skill or company</span>
                  <input type="text" placeholder="e.g. Software Engineer, Data Analyst" className="text-sm outline-none text-body-text w-full" />
                </div>
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-2 border-r border-border w-full">
                <span className="text-muted text-lg">📍</span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-deep-text">Location</span>
                  <input type="text" placeholder="e.g. New York, Remote" className="text-sm outline-none text-body-text w-full" />
                </div>
              </div>
              <div className="w-48 flex items-center gap-3 px-4 py-2 w-full">
                <span className="text-muted text-lg">🏢</span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-deep-text">Experience</span>
                  <select className="text-sm outline-none text-body-text bg-transparent w-full">
                    <option>e.g. 0-2 years</option>
                  </select>
                </div>
              </div>
              <button className="bg-primary text-white font-bold rounded-xl px-8 py-4 w-full md:w-auto hover:brightness-110 transition">
                Search
              </button>
            </div>
          </div>

          <div className="flex gap-4 items-center justify-center mt-6 text-sm">
            <span className="text-muted">Trending searches:</span>
            <span className="px-3 py-1 bg-white border border-border rounded-full text-body-text">Software Engineer</span>
            <span className="px-3 py-1 bg-white border border-border rounded-full text-body-text">Data Scientist</span>
            <span className="px-3 py-1 bg-white border border-border rounded-full text-body-text">Product Manager</span>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 border-y border-border bg-surface">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left divide-x divide-border">
          <div className="px-4 flex items-center gap-4">
            <span className="text-2xl">✓</span>
            <div>
              <div className="font-bold text-deep-text">Verified & Trusted</div>
              <div className="text-xs text-muted">Real data. Real people.</div>
            </div>
          </div>
          <div className="px-4 flex items-center gap-4">
            <span className="text-2xl">👥</span>
            <div>
              <div className="font-bold text-deep-text">10M+ Users</div>
              <div className="text-xs text-muted">Across the globe</div>
            </div>
          </div>
          <div className="px-4 flex items-center gap-4">
            <span className="text-2xl">🏢</span>
            <div>
              <div className="font-bold text-deep-text">500K+ Companies</div>
              <div className="text-xs text-muted">Researched & reviewed</div>
            </div>
          </div>
          <div className="px-4 flex items-center gap-4">
            <span className="text-2xl">🔓</span>
            <div>
              <div className="font-bold text-deep-text">100% Free</div>
              <div className="text-xs text-muted">No hidden charges</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hubs */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-[28px] font-bold text-deep-text mb-8">Explore the world of work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-success font-bold text-sm">
                <span className="w-5 h-5 rounded bg-green-100 flex items-center justify-center">$</span>
                MOST EXPLORED
              </div>
              <h3 className="text-xl font-bold mb-2">Compensation Intelligence</h3>
              <p className="text-sm text-body-text mb-6">Explore real salary data and compensation trends across roles, companies and cities.</p>
              <div className="bg-background rounded-lg p-4 mb-4">
                <div className="text-xs text-muted">Average Salary (India)</div>
                <div className="text-2xl font-bold text-success">₹28.4 <span className="text-sm text-body-text font-normal">LPA</span></div>
              </div>
            </div>
            <Link href="/salaries" className="text-primary font-medium hover:underline text-sm mt-4 inline-block">
              Explore salaries →
            </Link>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span className="text-warning text-xl">☆</span> Company Reviews & Culture
            </h3>
            <p className="text-sm text-body-text mb-6">Read honest reviews and discover real workplace culture.</p>
            <div className="flex items-center gap-4 mb-6">
              <div>
                <div className="text-xl font-bold">4.1 <span className="text-warning text-sm">★★★★☆</span></div>
                <div className="text-xs text-muted">Overall rating</div>
              </div>
            </div>
            <Link href="/reviews" className="text-primary font-medium hover:underline text-sm">
              Explore reviews →
            </Link>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span className="text-purple-600 text-xl">💬</span> Interview Experiences
            </h3>
            <p className="text-sm text-body-text mb-6">Practice with real interview questions shared by candidates.</p>
            <div className="space-y-3 mb-6">
              <div className="bg-background p-3 rounded text-sm font-medium">Meta PM interview difficulty</div>
            </div>
            <Link href="/interviews" className="text-primary font-medium hover:underline text-sm">
              Explore interviews →
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}