const testimonials = [
  {
    quote: "I was constantly refreshing Zillow. Now I just wait for Zach's Friday email — always the best homes, no noise.",
    author: "JENNIFER K., WESTLAKE BUYER"
  },
  {
    quote: "Luxstin gives me early access to listings before they get picked over. It's like having an insider advantage.",
    author: "MICHAEL R., TARRYTOWN"
  },
  {
    quote: "Simple, curated, and actually useful. This is the only real estate email I open every week.",
    author: "SARAH L., BARTON CREEK"
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
