import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function MidCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const { error } = await supabase
        .from('email_signups')
        .insert([{ email, source: 'mid' }]);

      if (error) {
        if (error.code === '23505') {
          setMessage('You\'re already on the list.');
          setStatus('success');
        } else {
          throw error;
        }
      } else {
        setMessage('Welcome to the list. Check your inbox Friday.');
        setStatus('success');
        setEmail('');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section className="bg-[#C5A572] py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-8">
          Get Friday's list in your inbox.
        </h2>

        <p className="text-xl text-[#2B2B2B] mb-12 max-w-lg mx-auto">
          No cost. No spam. Just Austin's finest luxury homes, curated weekly.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={status === 'loading'}
              className="flex-1 px-6 py-4 text-lg bg-white text-[#2B2B2B] rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-4 bg-[#1A1A1A] text-[#C5A572] text-lg font-medium rounded-sm hover:bg-[#2B2B2B] transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:hover:translate-y-0 whitespace-nowrap"
            >
              {status === 'loading' ? 'Joining...' : 'Join the Luxstin List — Free →'}
            </button>
          </div>
          {message && (
            <p className={`text-sm ${status === 'success' ? 'text-[#1A1A1A]' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </form>

        <p className="text-[#1A1A1A] text-base">
          Next list drops Friday — join before it sends.
        </p>
      </div>
    </section>
  );
}
