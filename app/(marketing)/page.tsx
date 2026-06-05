import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

import HeroSearch from '@/components/marketing/HeroSearch';

export const revalidate = 3600;

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 bg-gradient-to-br from-[#E8F3EC] via-[#F2F7F5] to-surface relative overflow-hidden">
        {/* Subtle decorative background shapes matching design */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-40 -right-20 w-[30rem] h-[30rem] bg-teal-50 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-[48px] md:text-[64px] font-bold tracking-tight mb-4 text-deep-text">
            Explore. Compare. <span className="text-primary">Grow.</span>
          </h1>
          <p className="text-[18px] text-body-text mb-10 max-w-2xl mx-auto">
            Explore salaries, read real reviews, prepare for interviews,
            and find the right opportunities — all in one place.
          </p>

          {/* Search Box */}
          <HeroSearch />

          <div className="flex flex-wrap gap-3 items-center justify-center mt-8 text-sm">
            <span className="text-muted font-medium">Trending searches:</span>
            <Link href="/salaries?role=Software+Engineer" className="px-4 py-2 bg-surface/80 backdrop-blur-sm border border-border rounded-full text-deep-text font-medium hover:bg-surface cursor-pointer shadow-sm">Software Engineer</Link>
            <Link href="/salaries?role=Data+Scientist" className="px-4 py-2 bg-surface/80 backdrop-blur-sm border border-border rounded-full text-deep-text font-medium hover:bg-surface cursor-pointer shadow-sm">Data Scientist</Link>
            <Link href="/salaries?role=Product+Manager" className="px-4 py-2 bg-surface/80 backdrop-blur-sm border border-border rounded-full text-deep-text font-medium hover:bg-surface cursor-pointer shadow-sm">Product Manager</Link>
            <Link href="/salaries?role=Marketing+Manager" className="px-4 py-2 bg-surface/80 backdrop-blur-sm border border-border rounded-full text-deep-text font-medium hover:bg-surface cursor-pointer shadow-sm">Marketing Manager</Link>
            <Link href="/jobs?location=Remote" className="px-4 py-2 bg-surface/80 backdrop-blur-sm border border-border rounded-full text-deep-text font-medium hover:bg-surface cursor-pointer shadow-sm">Remote Jobs</Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl mx-auto">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-deep-text mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div>
                <div className="font-bold text-deep-text">Verified & Trusted</div>
                <div className="text-xs text-muted font-medium mt-1">Real data. Real people.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-deep-text mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <div>
                <div className="font-bold text-deep-text">10M+ Users</div>
                <div className="text-xs text-muted font-medium mt-1">Across the globe</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-deep-text mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              <div>
                <div className="font-bold text-deep-text">500K+ Companies</div>
                <div className="text-xs text-muted font-medium mt-1">Researched & reviewed</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-deep-text mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <div>
                <div className="font-bold text-deep-text">100% Free</div>
                <div className="text-xs text-muted font-medium mt-1">No hidden charges</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hubs */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs tracking-wider mb-2 uppercase">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2l2.5 5h5.5l-4 4 1.5 5.5-5-3-5 3 1.5-5.5-4-4h5.5z"/></svg>
            Career Intelligence Hub
          </div>
          <h2 className="text-[36px] font-bold text-deep-text mb-3">Explore the world of work</h2>
          <p className="text-body-text max-w-3xl text-lg">Real salary data, honest reviews, interview experiences and insider insights from millions of professionals worldwide.</p>
        </div>

        {/* Live Stats Row */}
        <div className="bg-surface rounded-2xl p-6 mb-8 border border-border shadow-sm flex flex-wrap lg:flex-nowrap items-center justify-between gap-6">
          <div className="flex gap-8 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-success font-bold">$</div>
              <div><div className="font-bold text-xl text-deep-text">12M+</div><div className="text-xs font-medium text-muted">Salaries</div></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">☆</div>
              <div><div className="font-bold text-xl text-deep-text">4.8M+</div><div className="text-xs font-medium text-muted">Reviews</div></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">💬</div>
              <div><div className="font-bold text-xl text-deep-text">950K+</div><div className="text-xs font-medium text-muted">Interviews</div></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">💼</div>
              <div><div className="font-bold text-xl text-deep-text">210K+</div><div className="text-xs font-medium text-muted">Offers</div></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">👥</div>
              <div><div className="font-bold text-xl text-deep-text">120K+</div><div className="text-xs font-medium text-muted">Active discussions</div></div>
            </div>
          </div>
          <div className="w-full lg:w-px h-px lg:h-12 bg-border"></div>
          <div className="flex items-center justify-between w-full lg:w-auto gap-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              <span className="font-medium text-success">Live updates</span>
              <span className="text-muted ml-2">3,428 contributions added in the last 24h</span>
            </div>
            <Link href="/community" className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:underline">
              Join the community →
            </Link>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Compensation */}
          <Card className="col-span-1 md:col-span-1 p-6 flex flex-col justify-between bg-gradient-to-br from-[#F5FBF7] to-white border border-[#E0F0E6]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-success font-bold text-[10px] uppercase tracking-wider bg-white px-2 py-1 rounded shadow-sm">
                  <span className="text-success">$</span> MOST EXPLORED
                </div>
                <span className="text-muted">•••</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-deep-text">Compensation Intelligence</h3>
              <p className="text-sm text-body-text mb-6">Explore real salary data and compensation trends across roles, companies and cities.</p>
              
              <div className="flex gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 border border-border shadow-sm flex-1">
                  <div className="flex items-center gap-2 text-success font-bold text-sm mb-1">▲ 18%</div>
                  <div className="text-xs text-muted">YoY growth</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-border shadow-sm flex-1">
                  <div className="text-xs font-medium text-deep-text">AI Engineer salaries in Bangalore this year</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-border shadow-sm mb-4 relative overflow-hidden">
                <div className="text-xs text-muted font-medium mb-1">Average Salary (India)</div>
                <div className="text-2xl font-bold text-success mb-1">₹28.4 <span className="text-sm text-body-text font-normal">LPA</span></div>
                <div className="text-xs text-success font-medium">▲ 12% vs last year</div>
                
                {/* Mock Chart Line */}
                <svg className="absolute bottom-0 left-0 w-full h-16 text-success opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,100 L0,50 Q25,30 50,60 T100,20 L100,100 Z" fill="currentColor" />
                  <path d="M0,50 Q25,30 50,60 T100,20" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </div>
              
              <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-border">
                <div className="text-xs font-bold text-muted">Top paying companies</div>
                <div className="flex gap-2 text-lg">
                  <span>G</span><span className="text-blue-500">∞</span><span className="text-red-500">❖</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded text-muted">+15</span>
                </div>
              </div>
            </div>
            <Link href="/salaries" className="text-success font-bold hover:underline text-sm mt-6 flex items-center gap-1">
              Explore salaries →
            </Link>
          </Card>

          <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 2: Reviews */}
            <Card className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-deep-text">
                    <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-sm">☆</span> 
                    Company Reviews & Culture
                  </h3>
                  <span className="text-muted">•••</span>
                </div>
                <p className="text-sm text-body-text mb-6">Read honest reviews and discover real workplace culture.</p>
                <div className="flex items-center gap-8 mb-6">
                  <div>
                    <div className="text-2xl font-bold text-orange-500 flex items-center gap-2">4.1 <span className="text-sm">★★★★☆</span></div>
                    <div className="text-xs text-muted font-medium mt-1">Overall rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-deep-text">72%</div>
                    <div className="text-xs text-muted font-medium mt-1">Recommend to a friend</div>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 text-sm">
                  <div className="font-bold text-orange-600 flex items-center gap-1 mb-1"><span>🔥</span> Amazon WLB discussions trending ↑</div>
                  <div className="text-xs text-muted">1.2K reviews this week</div>
                </div>
              </div>
              <Link href="/reviews" className="text-orange-500 font-bold hover:underline text-sm mt-4">
                Explore reviews →
              </Link>
            </Card>

            {/* Card 3: Interviews */}
            <Card className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-deep-text">
                    <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm">💬</span> 
                    Interview Experiences
                  </h3>
                  <span className="text-muted">•••</span>
                </div>
                <p className="text-sm text-body-text mb-6">Practice with real interview questions shared by candidates.</p>
                
                <div className="bg-surface rounded-lg p-3 border border-border mb-4">
                  <div className="text-xs font-bold text-deep-text mb-1">Meta PM interview difficulty</div>
                  <div className="text-xs text-muted flex justify-between">
                    Increased this month
                    <svg className="w-12 h-4 text-purple-500" viewBox="0 0 50 20" fill="none" stroke="currentColor"><path d="M0 15 Q10 5 25 10 T50 0" strokeWidth="2"/></svg>
                  </div>
                </div>

                <div className="text-xs font-bold text-muted mb-2">Latest questions</div>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">System Design</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">SQL</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">Product Sense</span>
                </div>
              </div>
              <Link href="/interviews" className="text-purple-600 font-bold hover:underline text-sm mt-4">
                Explore interviews →
              </Link>
            </Card>

            {/* Card 4: Offers */}
            <Card className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-deep-text">
                    <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm">💼</span> 
                    Offers & Negotiations
                  </h3>
                  <span className="text-muted">•••</span>
                </div>
                <p className="text-sm text-body-text mb-6">See real offers and learn negotiation strategies that work.</p>
                
                <div className="flex items-center gap-8 mb-4">
                  <div>
                    <div className="text-xl font-bold text-pink-600">₹42 LPA</div>
                    <div className="text-xs text-muted font-medium mt-1">Median offer — SDE II</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-deep-text">63%</div>
                    <div className="text-xs text-muted font-medium mt-1">Negotiate successfully</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-success font-medium bg-green-50 p-2 rounded">
                  <span className="w-4 h-4 rounded-full bg-success text-white flex items-center justify-center text-[8px]">✓</span> 
                  15 new offers verified today
                </div>
              </div>
              <Link href="/offers" className="text-pink-600 font-bold hover:underline text-sm mt-4">
                Explore offers →
              </Link>
            </Card>

            {/* Card 5: Community */}
            <Card className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-deep-text">
                    <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">👥</span> 
                    Community Discussions
                  </h3>
                  <span className="text-muted">•••</span>
                </div>
                <p className="text-sm text-body-text mb-4">Join conversations, ask questions and get advice from the community.</p>
                
                <div className="bg-surface rounded-lg p-3 border border-border hover:border-blue-300 transition cursor-pointer mb-4">
                  <div className="font-bold text-sm text-deep-text mb-1">"Are AI engineers now overpaid?"</div>
                  <div className="text-xs text-muted flex justify-between items-center">
                    <span>2.4K replies • 12h ago</span>
                    <span className="text-blue-500">↗</span>
                  </div>
                </div>

                <div className="text-xs font-bold text-muted mb-2">Trending topics</div>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">Layoffs 2025</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">Career Switch</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">Remote Jobs</span>
                </div>
              </div>
              <Link href="/community" className="text-blue-600 font-bold hover:underline text-sm mt-4">
                Explore discussions →
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}