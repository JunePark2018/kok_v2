export default function ShortsFeed({ shorts }: { shorts: string[] }) {
  if (!shorts || shorts.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-neutral-900 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10 pl-2">
          <h2 className="text-white text-[15px] font-bold tracking-widest uppercase">
            BRAND SHORTS
          </h2>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-8 snap-x no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {shorts.map((url, index) => {
            return (
              <div key={index} className="flex-none w-[260px] h-[460px] rounded-[24px] overflow-hidden bg-black snap-center relative shadow-2xl ring-1 ring-white/10">
                <iframe
                  src={url}
                  className="w-[260px] h-[460px] object-cover pointer-events-auto"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
