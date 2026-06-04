import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400 py-12 border-t border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-4">TalentDash</h3>
          <p className="text-sm">Real data. Real people. Real career growth.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/companies" className="hover:text-white transition">Companies</Link></li>
            <li><Link href="/salaries" className="hover:text-white transition">Salaries</Link></li>
            <li><Link href="/interviews" className="hover:text-white transition">Interviews</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Community</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/community" className="hover:text-white transition">Discussions</Link></li>
            <li><Link href="/reviews" className="hover:text-white transition">Company Reviews</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-sm text-center">
        © {new Date().getFullYear()} TalentDash. All rights reserved.
      </div>
    </footer>
  );
}