const testimonials = [
  {
    quote: "I was constantly refreshing Zillow with no luck. Zach sent me the perfect home and we went under contract the next day.",
    author: "LORI H., WESTLAKE BUYER"
  },
  {
    quote: "Zach found our dream home, represented us, and saved us over $60,000.",
    author: "SUNNY K., TARRYTOWN"
  },
  {
    quote: "We were moving to Austin from out of state and limited on options and timing. Zach found our forever home and handled everything for us.",
    author: "AMANDA R., AUSTIN"
  }
];

export default function Testimonials() {
  return (
    <section className="bg-[#1A1A1A] py-32 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="border border-white/20 p-12 hover:border-[#C5A572] transition-colors"
          >
            <p className="font-serif text-xl text-white italic mb-8 leading-relaxed">
              "{testimonial.quote}"
            </p>
            <p className="text-[#C5A572] text-xs tracking-widest uppercase">
              {testimonial.author}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
