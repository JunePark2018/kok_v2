'use client';

import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Lang } from '@/lib/i18n/types';
import type { CarouselSlide } from '@/lib/api/carousel';

const FALLBACK_SLIDES: Record<Lang, Array<{ id: string; badge: string; title: string; subtitle: string; image: string; bgColor: string }>> = {
  kr: [
    { id: 'f1', badge: '수분천재 크림', title: '강력한 고보습 케어\nPDRN 속광 수분 크림', subtitle: '사계절 + 속수분 + 수분광 + 모공쫀쫀', image: 'https://plus.unsplash.com/premium_photo-1681996500858-ff9cc3f28203?q=80&w=1587&auto=format&fit=crop', bgColor: '#eef4f7' },
    { id: 'f2', badge: '뷰티 유튜버 PICK', title: '빛나는 결 보습\n비타민 글로우 세럼', subtitle: '미백 + 매끈결 + 투명광채 + 생기충전', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1587&auto=format&fit=crop', bgColor: '#f4ebe6' },
  ],
  en: [
    { id: 'f1', badge: 'Hydration Genius Cream', title: 'Intense Moisture Care\nPDRN Glow Hydration Cream', subtitle: 'All-Season • Deep Moisture • Glow Skin • Pore Care', image: 'https://plus.unsplash.com/premium_photo-1681996500858-ff9cc3f28203?q=80&w=1587&auto=format&fit=crop', bgColor: '#eef4f7' },
    { id: 'f2', badge: 'Beauty Youtuber PICK', title: 'Luminous Skin Moisture\nVitamin Glow Serum', subtitle: 'Brightening • Smooth Texture • Radiance • Vitality Boost', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1587&auto=format&fit=crop', bgColor: '#f4ebe6' },
  ],
};

interface HeroSliderProps {
  lang?: Lang;
  slides?: CarouselSlide[];
}

export default function HeroSlider({ lang = 'kr', slides: dbSlides }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Map DB slides to display format, or fallback to hardcoded
  const slides = dbSlides && dbSlides.length > 0
    ? dbSlides.map(s => ({
        id: s.id,
        badge: s.badge?.[lang] || s.badge?.kr || s.badge?.en || '',
        title: s.title?.[lang] || s.title?.kr || s.title?.en || '',
        subtitle: s.subtitle?.[lang] || s.subtitle?.kr || s.subtitle?.en || '',
        image: s.image_url || '',
        bgColor: s.bg_color || '#eef4f7',
      }))
    : FALLBACK_SLIDES[lang] ?? FALLBACK_SLIDES['en'];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full h-[500px] sm:h-[600px] overflow-hidden group">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 h-full relative" style={{ backgroundColor: slide.bgColor }}>
              <div className="max-w-[1400px] mx-auto h-full px-8 flex items-center justify-between">

                {/* Text Content */}
                <div className="z-10 max-w-lg mb-10 sm:mb-0">
                  <span className="inline-block bg-[#333333] text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6 relative">
                    {slide.badge}
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-[1.3] whitespace-pre-line mb-4 relative">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 relative">
                    {slide.subtitle}
                  </p>
                </div>

                {/* Image */}
                <div className="absolute right-0 bottom-0 top-0 w-1/2 flex justify-end items-center sm:relative sm:w-auto h-full p-4 sm:p-12 opacity-80 sm:opacity-100">
                  <div className="relative h-[80%] aspect-[5/6] mr-8 shadow-2xl overflow-hidden rounded-md">
                    {slide.image ? (
                      <img
                        src={slide.image}
                        alt={slide.title.replace('\n', ' ')}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">No Image</div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-black transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-30"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-10 h-10 stroke-[1.5]" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-black transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-30"
        onClick={scrollNext}
      >
        <ChevronRight className="w-10 h-10 stroke-[1.5]" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex ? 'bg-black w-6' : 'bg-gray-300'
            }`}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
