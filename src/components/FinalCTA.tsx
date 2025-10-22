import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function FinalCTA() {
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
        .insert([{ email, source: 'final' }]);

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
    <section className="bg-[#1A1A1A] py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
          Ready to stop searching and start finding?
        </h2>

        <p className="text-xl text-[#F5F5F3] font-light leading-relaxed mb-12 max-w-xl mx-auto">
          Join 3,000+ discerning Austin buyers who get the best luxury listings delivered every Friday. No fluff. No Zillow fatigue. Just homes worth seeing.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={status === 'loading'}
              className="flex-1 px-6 py-4 text-lg bg-white text-[#2B2B2B] rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C5A572] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-4 bg-[#C5A572] text-[#1A1A1A] text-lg font-medium rounded-sm hover:bg-[#B89562] transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:hover:translate-y-0 whitespace-nowrap"
            >
              {status === 'loading' ? 'Joining...' : 'Join the Luxstin List — Free'}
            </button>
          </div>
          {message && (
            <p className={`text-sm ${status === 'success' ? 'text-[#C5A572]' : 'text-red-400'}`}>
              {message}
            </p>
          )}
        </form>

        <p className="text-[#C5A572] text-base">
          Next list drops Friday — join before it sends.
        </p>
      </div>
    </section>
  );
}
