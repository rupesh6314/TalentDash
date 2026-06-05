import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata = { title: 'Sign Up | TalentDash' };

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center py-12 px-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-deep-text text-center mb-6">Create an account</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-deep-text mb-1">Full Name</label>
            <input type="text" className="w-full border border-border rounded-lg px-4 py-2 bg-surface text-body-text focus:outline-none focus:border-primary" placeholder="Jane Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-deep-text mb-1">Email</label>
            <input type="email" className="w-full border border-border rounded-lg px-4 py-2 bg-surface text-body-text focus:outline-none focus:border-primary" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-deep-text mb-1">Password</label>
            <input type="password" className="w-full border border-border rounded-lg px-4 py-2 bg-surface text-body-text focus:outline-none focus:border-primary" placeholder="••••••••" />
          </div>
          <Button variant="primary" className="w-full font-bold py-2.5">Sign up</Button>
        </form>
        <div className="mt-6 text-center text-sm text-muted">
          Already have an account? <a href="/login" className="text-primary font-bold hover:underline">Log in</a>
        </div>
      </Card>
    </div>
  );
}
