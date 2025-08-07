"use client";
import React, { useState, useEffect } from "react";

export default function Testimonial() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const totalSlides = 2;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

 const testimonials = [
    [
      {
        text: "After trying foot reflexology, I experienced immediate relief from stress and chronic pain. The therapist's skillful pressure on my feet brought a relaxation and rejuvenation. My sleep quality improved, and I felt more energized throughout the day. Reflexology has become a regular part of my wellness routine. It's not just about physical relief, but also emotional balance and clarity.",
        author: "Mani",
        designation: "Photographer"
      },
      {
        text: "Foot reflexology has been a game changer for me! After just a few sessions, my stress levels dropped, and my body felt more relaxed. The targeted pressure on my feet helped alleviate my chronic pain and improved my energy. I'm sleeping better and feeling more balanced overall. It's an incredibly soothing and effective treatment. I highly recommend it to anyone looking to enhance their well-being!",
        author: "Priya",
        designation: "Yoga Instructor"
      }
    ],
    [
      {
        text: "Foot reflexology has been a game changer for me! After just a few sessions, my stress levels dropped, and my body felt more relaxed. The targeted pressure on my feet helped alleviate my chronic pain and improved my energy. I'm sleeping better and feeling more balanced overall. It's an incredibly soothing and effective treatment. I highly recommend it to their well-being!",
        author: "Ravi",
        designation: "Entrepreneur"
      },
      {
        text: "It's emotional and physical healing. Reflexology eased my migraines and boosted clarity.",
        author: "Anjali",
        designation: "Designer"
      }
    ]
  ];

  return (
    <div className="py-12 testi-contain">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-1">
          <h2 className="word-title">Words of Our Loved Ones <span className='welcome-red'></span></h2>
          <p className="word-testimonial">Testimonials</p>
        </div>
        <div className="container">
          <div className="relative col-md-12">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((slideTestimonials, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="flex flex-wrap -mx-4 p-3">
                      {(isMobile
                        ? [slideTestimonials[0]] // show only the first on mobile
                        : slideTestimonials
                      ).map((testimonial, index) => (
                        <div key={index} className="w-full md:w-1/2 mb-6">
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
            <div className="flex justify-center mt-6 testi-dots-mb space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-1 h-1 mx-1 rounded-full transition-all duration-200 ${
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
