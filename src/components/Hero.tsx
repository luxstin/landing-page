import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Hero() {
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
        .insert([{ email, source: 'hero' }]);

      if (error) {
        if (error.code === '23505') {
          setMessage('You\'re already on the list.');
          setStatus('success');
        } else {
          throw error;
        }
      } else {
        setMessage('Welcome to the list. Check your inbox.');
        setStatus('success');
        setEmail('');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0">
      <div className="absolute inset-0 bg-[#1A1A1A]">
        <img
          src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Luxury Austin Home"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">
          Most scroll Zillow. Some get ahead
        </h1>

        <p className="text-xl md:text-2xl text-[#F5F5F3] font-light mb-12 max-w-2xl mx-auto leading-relaxed">
          We find Austin's most desirable homes the moment they hit the market - chosen for architecture, quality, and speed to sell. Don't miss the next one
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

        <p className="text-[#C5A572] text-base mb-8">
          Next list drops Friday — join before it sends.
        </p>

        <p className="text-[#F5F5F3] text-sm">
          Trusted by 100+ Austin buyers & sellers · $60M+ closed · Former appraiser
        </p>
      </div>

      <div className="absolute bottom-8 right-8 text-[#C5A572] text-sm italic max-w-xs text-right hidden md:block">
        A preview of the caliber of homes we send every Friday.
      </div>
    </section>
  );
}
