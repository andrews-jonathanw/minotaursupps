import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Carousel({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleSlideChange = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  return (
    <div className="relative carousel">
      {slides.map((slide, index) => (
        <motion.img
          key={slide.id}
          src={slide.imageUrl}
          alt={`Slide ${index + 1}`}
          className={`absolute w-full h-full ${index !== currentSlide && 'hidden'}`}
          initial={{
            opacity: 0,
            x: index === currentSlide ? 0 : direction === 1 ? '100%' : '-100%',
          }}
          animate={{
            opacity: index === currentSlide ? 1 : 0,
            x: index === currentSlide ? 0 : direction === 1 ? '0%' : '0%',
          }}
          exit={{
            opacity: 0,
            x: direction === 1 ? '-100%' : '100%',
          }}
          transition={{ duration: 0.5 }}
        />
      ))}
      {/* Navigation Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-16 sm:w-28 h-2 bg-gray-500 cursor-pointer ${currentSlide === index ? 'bg-white' : ''}`}
            onClick={() => handleSlideChange(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
