"use client";
import React, { useState, useEffect } from 'react';

export default function Testimonial() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [slides, setSlides] = useState([]);

  const allTestimonials = [
    {
      text: "After trying foot reflexology, I experienced immediate relief from stress and chronic pain...",
      author: "Mani",
      designation: "Photographer"
    },
    {
      text: "Foot reflexology has been a game changer for me! After just a few sessions...",
      author: "Priya",
      designation: "Yoga Instructor"
    },
    {
      text: "I feel more focused and refreshed after each session. It's truly healing.",
      author: "Ravi",
      designation: "Entrepreneur"
    },
    {
      text: "It's emotional and physical healing. Reflexology eased my migraines and boosted clarity.",
      author: "Anjali",
      designation: "Designer"
    }
  ];

  // Group testimonials into slides
  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const chunks = chunkArray(allTestimonials, mobile ? 1 : 2);
      setSlides(chunks);
      setCurrentSlide(0); // reset to first slide on resize
    };

    handleResize(); // initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  return (
    <div className="py-12 testi-contain">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="word-title">Words of Our Loved Ones</h2>
          <p className="word-testimonial">Testimonials</p>
        </div>

        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)`, width: `${slides.length * 100}%` }}
          >
            {slides.map((group, i) => (
              <div key={i} className="w-full flex-shrink-0 px-4">
                <div className="flex flex-wrap -mx-4">
                  {group.map((testimonial, j) => (
                    <div key={j} className="w-full md:w-1/2 px-4 mb-6">
                      <div className="testimonial-box h-full">
                        <div className="flex flex-col h-full">
                          <div className="flex-1">
                            <p className="testimonial-text">"{testimonial.text}"</p>
                          </div>
                          <div className="mt-4">
                            <p className="testimonial-author">- {testimonial.author}</p>
                            <p className="testimonial-desgination">{testimonial.designation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentSlide === index
                    ? 'bg-indigo-600 scale-110'
                    : 'bg-gray-300 hover:bg-indigo-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
