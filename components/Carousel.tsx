import React, { useState, useEffect } from 'react';
import type { CarouselSlide } from '../types';

interface CarouselProps {
  slides: CarouselSlide[];
  language: 'en' | 'ar';
  onSlideClick: (slide: CarouselSlide) => void;
}

const Carousel: React.FC<CarouselProps> = ({ slides, language, onSlideClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3500);
    return () => clearTimeout(timer);
  }, [currentIndex, slides.length]);
  
  const currentSlide = slides[currentIndex];

  return (
    <div 
      className="relative w-full aspect-[2/1] max-h-[50vh] rounded-xl overflow-hidden shadow-lg group cursor-pointer"
      onClick={() => onSlideClick(currentSlide)}
    >
      <div className="w-full h-full flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <img key={index} src={slide.image} alt={slide.title} className="w-full h-full object-cover flex-shrink-0" />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      
      <div className={`absolute bottom-0 p-4 md:p-6 text-white w-full ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h2 className={`text-2xl md:text-4xl font-bold transition-opacity duration-500 ${language === 'ar' ? 'font-cairo' : ''}`}>{currentSlide.title}</h2>
        <p className={`mt-1 md:mt-2 text-md md:text-lg transition-opacity duration-500 ${language === 'ar' ? 'font-cairo' : ''}`}>{currentSlide.subtitle}</p>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering onSlideClick
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white w-4' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
