const testimonials = [
  {
    quote:
      "I did not know where to start. I had all these memories but could not put them into words. This helped me say exactly what I wanted to say.",
    author: 'Sarah M.',
    relation: 'Daughter',
  },
  {
    quote:
      "We used it for my dad's service. I gave it a few stories and it came back with something that felt completely like him. I only changed a couple of lines.",
    author: 'James T.',
    relation: 'Son',
  },
  {
    quote:
      "My mum passed suddenly and I had three days to prepare. This took so much pressure off. I was able to focus on my family instead of staring at a blank page.",
    author: 'Linda R.',
    relation: 'Daughter',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#F7F6F3] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#180026] mb-4">
            Families who have been through it
          </h2>
          <p className="text-lg text-[#807388] max-w-xl mx-auto">
            The words that matter most are often the hardest to find on your own.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white p-8 flex flex-col gap-4 border border-[#D4E9CA]"
            >
              {/* Quote mark */}
              <span className="text-4xl text-[#D4E9CA] font-serif leading-none select-none">"</span>
              <p className="text-[#180026] leading-relaxed flex-1">{t.quote}</p>
              <div>
                <p className="font-semibold text-[#180026]">{t.author}</p>
                <p className="text-sm text-[#807388]">{t.relation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
