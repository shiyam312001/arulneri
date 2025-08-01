"use client";
import React, { useState, useEffect } from "react";

export default function Testimonial() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const allTestimonials = [
    {
      text: "After trying foot reflexology, I experienced immediate relief from stress and chronic pain. The therapist's skillful pressure on my feet brought a sense of deep relaxation and rejuvenation. My sleep quality improved, and I felt more energized throughout the day. Reflexology has become a regular part of my wellness routine. It's not just about physical relief, but also emotional balance and clarity.",
      author: "Mani",
      designation: "Photographer",
    },
    {
      text: "After trying foot reflexology, I experienced immediate relief from stress and chronic pain. The therapist's skillful pressure on my feet brought a sense of deep relaxation and rejuvenation. My sleep quality improved, and I felt more energized throughout the day. Reflexology has become a regular part of my wellness routine. It's not just about physical relief, but also emotional balance and clarity.",
      author: "Priya",
      designation: "Yoga Instructor",
    },
    {
      text: "After trying foot reflexology, I experienced immediate relief from stress and chronic pain. The therapist's skillful pressure on my feet brought a sense of deep relaxation and rejuvenation. My sleep quality improved, and I felt more energized throughout the day. Reflexology has become a regular part of my wellness routine. It's not just about physical relief, but also emotional balance and clarity.",
      author: "Ravi",
      designation: "Entrepreneur",
    },
    {
      text: "After trying foot reflexology, I experienced immediate relief from stress and chronic pain. The therapist's skillful pressure on my feet brought a sense of deep relaxation and rejuvenation. My sleep quality improved, and I felt more energized throughout the day. Reflexology has become a regular part of my wellness routine. It's not just about physical relief, but also emotional balance and clarity.",
      author: "Anjali",
      designation: "Designer",
    },
  ];

  // Split into slides based on screen size
  const getSlides = () => {
    const perSlide = isMobile ? 1 : 2;
    const slides = [];
    for (let i = 0; i < allTestimonials.length; i += perSlide) {
      slides.push(allTestimonials.slice(i, i + perSlide));
    }
    return slides;
  };

  const [slides, setSlides] = useState(getSlides());
  const totalSlides = slides.length;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSlides(() => {
        const perSlide = mobile ? 1 : 2;
        const newSlides = [];
        for (let i = 0; i < allTestimonials.length; i += perSlide) {
          newSlides.push(allTestimonials.slice(i, i + perSlide));
        }
        return newSlides;
      });
      setCurrentSlide(0); // reset to first slide on screen resize
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="py-12 testi-contain">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-1">
          <h2 className="word-title">Words of Our Loved Ones </h2>
          <p className="word-testimonial">Testimonials</p>
        </div>
        <div className="container">
          <div className="relative col-md-12">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slideTestimonials, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="flex flex-wrap -mx-4 p-6">
                      {slideTestimonials.map((testimonial, index) => (
                        <div
                          key={index}
                          className="w-full md:w-1/2 mb-6"
                        >
                          <div className="testimonial-box">
                            <div className="flex flex-col h-full">
                              <div className="flex-1">
                                <p className="testimonial-text">
                                  &quot;{testimonial.text}&quot;
                                </p>
                              </div>
                              <div>
                                <p className="testimonial-author">
                                  - {testimonial.author}
                                </p>
                                <p className="testimonial-desgination">
                                  {testimonial.designation}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center testi-dots-mb mt-6 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-1 mx-1 h-1 rounded-full transition-all duration-200 ${
                    currentSlide === index
                      ? "bg-indigo-600 scale-110"
                      : "bg-gray-300 hover:bg-indigo-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
