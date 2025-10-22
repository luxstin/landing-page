export default function About() {
  return (
    <section className="bg-[#FAFAF8] py-32 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-2 flex justify-center">
          <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl">
            <img
              src="/assets/IMG_2991.jpg"
              alt="Zach Williams"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="text-[#C5A572] text-xs tracking-widest uppercase mb-4">
            Who Curates Your List
          </p>

          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-8">
            Meet Zach Williams
          </h2>

          <div className="text-[#2B2B2B] text-lg leading-relaxed space-y-6 max-w-xl">
            <p>
              I'm a Realtor and former appraiser who's closed over $60M in Austin luxury real estate. I know what separates a true gem from an overpriced listing.
            </p>

            <p>
              Every Friday, I hand-pick the best homes hitting the market — the ones my clients ask about first. No algorithm. No spam. Just the properties worth your attention.
            </p>

            <p>
              If you're serious about finding your next home in Austin, this is the simplest way to stay ahead.
            </p>

            <div className="pt-4">
              <p className="font-serif text-3xl text-[#2B2B2B] italic">— Zach</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
