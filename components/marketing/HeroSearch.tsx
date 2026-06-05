'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type TabType = 'Salaries' | 'Reviews' | 'Interviews' | 'Forum';

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState<TabType>('Salaries');
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('location', location);
    if (experience && experience !== 'e.g. 0-2 years') params.set('exp', experience);
    
    let path = '/salaries';
    if (activeTab === 'Reviews') path = '/reviews';
    if (activeTab === 'Interviews') path = '/interviews';
    if (activeTab === 'Forum') path = '/community';
    
    router.push(`${path}?${params.toString()}`);
  };

  return (
    <div className="bg-surface rounded-2xl shadow-xl p-2 max-w-4xl mx-auto border border-border mt-8">
      <div className="flex gap-6 px-6 py-3 border-b border-border text-sm font-medium text-muted mb-2 overflow-x-auto whitespace-nowrap">
        <button 
          onClick={() => setActiveTab('Salaries')}
          className={`pb-2 px-1 flex items-center gap-2 transition-colors ${activeTab === 'Salaries' ? 'text-deep-text border-b-2 border-deep-text' : 'hover:text-deep-text'}`}
        >
          <span className="w-5 h-5 rounded-full bg-green-100 text-success flex items-center justify-center text-[10px] font-bold">$</span> 
          Salaries
        </button>
        <button 
          onClick={() => setActiveTab('Reviews')}
          className={`pb-2 px-1 flex items-center gap-2 transition-colors ${activeTab === 'Reviews' ? 'text-deep-text border-b-2 border-deep-text' : 'hover:text-deep-text'}`}
        >
          <span className="text-lg">☆</span> Reviews
        </button>
        <button 
          onClick={() => setActiveTab('Interviews')}
          className={`pb-2 px-1 flex items-center gap-2 transition-colors ${activeTab === 'Interviews' ? 'text-deep-text border-b-2 border-deep-text' : 'hover:text-deep-text'}`}
        >
          <span className="text-lg">💬</span> Interviews
        </button>
        <button 
          onClick={() => setActiveTab('Forum')}
          className={`pb-2 px-1 flex items-center gap-2 transition-colors ${activeTab === 'Forum' ? 'text-deep-text border-b-2 border-deep-text' : 'hover:text-deep-text'}`}
        >
          <span className="text-lg">👥</span> Forum
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-4 p-4">
        <div className="flex-1 flex items-center gap-3 w-full border-b md:border-b-0 md:border-r border-border pb-4 md:pb-0 md:pr-4">
          <span className="text-muted text-xl">🔍</span>
          <div className="flex flex-col text-left w-full">
            <span className="text-xs font-bold text-deep-text">Search by job title, skill or company</span>
            <input 
              type="text" 
              placeholder="e.g. Software Engineer, Data Analyst" 
              className="text-sm outline-none text-body-text w-full bg-transparent placeholder-gray-400" 
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>
        <div className="flex-1 flex items-center gap-3 w-full border-b md:border-b-0 md:border-r border-border pb-4 md:pb-0 md:px-4">
          <span className="text-muted text-xl">📍</span>
          <div className="flex flex-col text-left w-full">
            <span className="text-xs font-bold text-deep-text">Location</span>
            <input 
              type="text" 
              placeholder="e.g. New York, Remote" 
              className="text-sm outline-none text-body-text w-full bg-transparent placeholder-gray-400" 
              value={location}
              onChange={e => setLocation(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>
        <div className="w-full md:w-48 flex items-center gap-3 pb-4 md:pb-0 md:px-4">
          <span className="text-muted text-xl">🏢</span>
          <div className="flex flex-col text-left w-full">
            <span className="text-xs font-bold text-deep-text">Experience</span>
            <select 
              className="text-sm outline-none text-body-text bg-transparent w-full"
              value={experience}
              onChange={e => setExperience(e.target.value)}
            >
              <option value="">e.g. 0-2 years</option>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6-9">6-9 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>
        </div>
        <button 
          onClick={handleSearch}
          className="bg-primary text-white font-bold rounded-xl px-8 py-4 w-full md:w-auto hover:brightness-110 transition flex-shrink-0"
        >
          Search
        </button>
      </div>
    </div>
  );
}
