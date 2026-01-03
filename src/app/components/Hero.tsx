'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
// Imported images
import camera1 from '../../assets/remaining/demo1.webp'; 
import camera2 from '../../assets/remaining/demo3.webp'; 
import camera3 from '../../assets/remaining/demo1.webp'; 
import camera4 from '../../assets/remaining/demo3.webp'; 

import mobilecamera1 from '../../assets/remaining/demo1.webp'; 
import mobilecamera2 from '../../assets/remaining/demo3.webp'; 
import mobilecamera3 from '../../assets/remaining/demo1.webp'; 
import mobilecamera4 from '../../assets/remaining/demo3.webp'; 

interface HeroSlide {
  id: number;
  title: string;
  description: string;
  desktopImage: string;
  mobileImage: string;
}

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const SLIDE_DURATION = 5000; // 5 seconds per slide

  const slides: HeroSlide[] = [
    {
      id: 1,
      title: 'Expand your horizon',
      description: 'See further in any condition with a high-performance camera offering precise thermal views.',
      desktopImage: camera1.src,
      mobileImage: mobilecamera1.src,
    },
    {
      id: 2,
      title: 'Advanced Security',
      description: 'State-of-the-art surveillance technology for comprehensive monitoring and protection.',
      desktopImage: camera2.src,
      mobileImage: mobilecamera2.src,
    },
    {
      id: 3,
      title: 'Precision Monitoring',
      description: 'Achieve exceptional clarity and detail in every surveillance scenario imaginable.',
      desktopImage: camera3.src,
      mobileImage: mobilecamera3.src,
    },
    {
      id: 4,
      title: 'Enhanced Visibility',
      description: 'Experience superior performance in low-light and challenging weather conditions.',
      desktopImage: camera4.src,
      mobileImage: mobilecamera4.src,
    },
  ];

  // --- Auto-Play and Progress Bar Logic ---
  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      const newProgress = Math.min(100, (elapsed / SLIDE_DURATION) * 100);
      
      setProgress(newProgress);

      if (newProgress >= 100) {
        setCurrentSlide((curr) => (curr + 1) % slides.length);
      } else {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentSlide, slides.length]);

  // Navigation handlers
  const goToPrevious = () => {
    setProgress(0);
    setCurrentSlide((curr) => (curr - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setProgress(0);
    setCurrentSlide((curr) => (curr + 1) % slides.length);
  };

  const goToSlide = (index: number) => {
    setProgress(0);
    setCurrentSlide(index);
  };

  return (
    <section className="w-full flex items-center bg-gray-50 py-8 lg:py-6">
      <div className="w-full px-4 md:px-8 lg:px-16 ">
        <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-2">
            {/* Left Content - Slides Container */}
            <div className="w-full lg:w-1/2 order-1 lg:order-1">
              <div className="relative overflow-hidden">
                {/* Content Slides */}
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`transition-all duration-700 ease-in-out ${
                      index === currentSlide
                        ? 'opacity-100 translate-y-0 relative'
                        : 'opacity-0 translate-y-full absolute inset-0 pointer-events-none'
                    }`}
                  >
                    {/* Title with Gradient */}
                    <h1 
                      className="font-bold mb-5 md:mb-6 leading-tight"
                      style={{
                        fontSize: 'clamp(2.5rem, 3vw, 3.5rem)',
                        backgroundImage: 'linear-gradient(90.23deg, #2E5AC2 18.75%, #183067 52%, #000000 119.5%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      {slide.title}
                    </h1>
                    
                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed max-w-lg">
                      {slide.description}
                    </p>
                    
                    {/* CTA Button */}
                    <div className="mb-8 lg:mb-12">
                      <button className="bg-[#2E5AC2] hover:bg-[#254a9f] text-white font-medium text-base px-8 py-3 rounded-md transition duration-300 ease-in-out">
                        See more
                      </button>
                    </div>
                  </div>
                ))}

                {/* Navigation Controls - Hidden on mobile, shown on desktop */}
                <div className="hidden lg:flex items-center gap-4">
                  {/* Previous Button */}
                  <button
                    onClick={goToPrevious}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-200 transition-colors flex-shrink-0"
                    aria-label="Previous slide"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 18L9 12L15 6"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Dot Indicators with Progress */}
                  <div className="flex items-center gap-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className="relative"
                        aria-label={`Go to slide ${index + 1}`}
                      >
                        {index === currentSlide ? (
                          // Active slide - circular progress indicator
                          <div className="relative w-10 h-10 flex items-center justify-center">
                            {/* Background circle */}
                            <svg className="absolute" width="40" height="40" viewBox="0 0 40 40">
                              <circle
                                cx="20"
                                cy="20"
                                r="8"
                                fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="2"
                              />
                            </svg>
                            {/* Progress circle */}
                            <svg 
                              className="absolute -rotate-90" 
                              width="40" 
                              height="40" 
                              viewBox="0 0 40 40"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="8"
                                fill="none"
                                stroke="#2E5AC2"
                                strokeWidth="2"
                                strokeDasharray={`${2 * Math.PI * 8}`}
                                strokeDashoffset={`${2 * Math.PI * 8 * (1 - progress / 100)}`}
                                strokeLinecap="round"
                                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                              />
                            </svg>
                            {/* Center dot */}
                            <div className="w-2 h-2 rounded-full bg-[#2E5AC2]"></div>
                          </div>
                        ) : (
                          // Inactive slides - small dots
                          <div className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"></div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={goToNext}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-200 transition-colors flex-shrink-0"
                    aria-label="Next slide"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Image Slider */}
            <div className="w-full lg:w-1/2 order-2 lg:order-2">
              {/* Image Container */}
              <div className="relative w-full h-[300px] sm:h-[350px] md:h-[500px] lg:h-[550px] overflow-hidden">
                {/* Image Slides */}
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === currentSlide
                        ? 'opacity-100 translate-y-0 z-10'
                        : 'opacity-0 translate-y-full z-0'
                    }`}
                  >
                    {/* Desktop Image - Hidden on mobile */}
                    <div className="hidden md:block w-full h-full relative">
                      <Image
                        src={slide.desktopImage}
                        alt={`Camera Product ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
                        className="object-contain"
                        priority={index === currentSlide}
                      />
                    </div>
                    
                    {/* Mobile Image - Hidden on desktop */}
                    <div className="md:hidden w-full h-full relative">
                      <Image
                        src={slide.mobileImage}
                        alt={`Camera Product ${index + 1}`}
                        fill
                        sizes="100vw"
                        className="object-contain"
                        priority={index === currentSlide}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls - Shown on mobile below image, order-3 */}
            <div className="w-full lg:hidden flex items-center justify-center gap-4 order-3">
              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-200 transition-colors flex-shrink-0"
                aria-label="Previous slide"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Dot Indicators with Progress */}
              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="relative"
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {index === currentSlide ? (
                      // Active slide - circular progress indicator
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        {/* Background circle */}
                        <svg className="absolute" width="40" height="40" viewBox="0 0 40 40">
                          <circle
                            cx="20"
                            cy="20"
                            r="8"
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth="2"
                          />
                        </svg>
                        {/* Progress circle */}
                        <svg 
                          className="absolute -rotate-90" 
                          width="40" 
                          height="40" 
                          viewBox="0 0 40 40"
                        >
                          <circle
                            cx="20"
                            cy="20"
                            r="8"
                            fill="none"
                            stroke="#2E5AC2"
                            strokeWidth="2"
                            strokeDasharray={`${2 * Math.PI * 8}`}
                            strokeDashoffset={`${2 * Math.PI * 8 * (1 - progress / 100)}`}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                          />
                        </svg>
                        {/* Center dot */}
                        <div className="w-2 h-2 rounded-full bg-[#2E5AC2]"></div>
                      </div>
                    ) : (
                      // Inactive slides - small dots
                      <div className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-200 transition-colors flex-shrink-0"
                aria-label="Next slide"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;