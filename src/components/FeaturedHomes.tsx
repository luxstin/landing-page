import { useState } from 'react';
import { supabase } from '../lib/supabase';

import austinHome2 from '../assets/Austin Home 2.jpg';
import austinHome3 from '../assets/Austin Home 3.jpg';
import austinHome6 from '../assets/Austin Home 6.jpg';

const featuredHomes = [
  austinHome2,
  austinHome3,
  austinHome6
];

export default function FeaturedHomes() {
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
        .insert([{ email, source: 'featured' }]);

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
    <section className="bg-[#FAFAF8] py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#C5A572] text-xs tracking-widest uppercase mb-4">
            This Week's Preview
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A]">
            A taste of what subscribers see first.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {featuredHomes.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden aspect-[4/3] cursor-pointer"
            >
              <img
                src={image}
                alt={`Featured luxury home ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#C5A572]/0 group-hover:bg-[#C5A572]/90 transition-all duration-300 flex items-center justify-center">
                <p className="text-[#1A1A1A] text-xl font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Join to See Full Details
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading'}
                className="flex-1 px-6 py-4 text-lg bg-white text-[#2B2B2B] border border-[#C5A572]/20 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C5A572] disabled:opacity-50"
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
              <p className={`text-sm ${status === 'success' ? 'text-[#C5A572]' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </form>

          <p className="text-[#2B2B2B] text-base">
            Members get full addresses, photos, and insights every Friday.
          </p>
        </div>
      </div>
    </section>
  );
}
