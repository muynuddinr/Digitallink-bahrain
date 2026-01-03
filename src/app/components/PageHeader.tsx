'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';
import { FaCheck } from 'react-icons/fa';

interface Slide {
  title: string;
  subtitle: string;
  headingPart1: string;
  headingPart2: string;
}

interface Feature {
  icon: IconType;
  title: string;
  desc: string;
}

interface PageHeaderProps {
  slides: Slide[];
  benefits: string[];
  features: Feature[];
  ctaText?: string;
  ctaIcon?: IconType;
}

export default function PageHeader({
  slides,
  benefits,
  features,
  ctaText = "Get Started",
  ctaIcon: CtaIcon
}: PageHeaderProps) {
  const [currentFeature, setCurrentFeature] = useState<number>(0);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length, features.length]);

  // Prevent hydration mismatch by using useEffect for browser-only code
  if (!isMounted) {
    return (
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 overflow-hidden">
        <div className="relative container mx-auto px-6 py-16 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-400/30 mb-6">
                <span className="text-blue-300 text-sm font-semibold">{slides[activeSlide].title}</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                {slides[activeSlide].headingPart1}
                <span className="block mt-2">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {slides[activeSlide].headingPart2}
                  </span>
                </span>
              </h1>
              <p className="text-lg text-blue-100 mb-8">
                {slides[activeSlide].subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large animated circles */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-blue-500/10 blur-2xl"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-300"
              style={{
                left: `${(i % 10) * 10}%`,
                top: `${Math.floor(i / 10) * 20}%`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Flowing lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <motion.path
              key={i}
              d={`M 0,${100 + i * 150} Q 400,${50 + i * 150} 800,${100 + i * 150} T 1600,${100 + i * 150}`}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </svg>
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-6 py-16 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Dynamic headline with slide content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-400/30 mb-6">
                  <span className="text-blue-300 text-sm font-semibold">{slides[activeSlide].title}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h1
                key={activeSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
              >
                {slides[activeSlide].headingPart1}
                <span className="block mt-2">
                  <motion.span
                    className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    {slides[activeSlide].headingPart2}
                  </motion.span>
                </span>
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={activeSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-lg text-blue-100 mb-8"
              >
                {slides[activeSlide].subtitle}
              </motion.p>
            </AnimatePresence>

            {/* Benefits list */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-2 text-blue-200"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <FaCheck className="text-white text-xs" />
                  </div>
                  <span className="text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all"
              suppressHydrationWarning
            >
              {ctaText}
              {CtaIcon && <CtaIcon />}
            </motion.button>

          </motion.div>

          {/* Right content - Interactive feature showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main feature card */}
            <div className="relative bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-xl rounded-3xl p-8 border border-blue-400/30 shadow-2xl">
              {/* Static border effect */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.3), transparent 70%)",
                }}
              />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6">Our Core Services</h3>

                {/* Features grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                          currentFeature === index
                            ? 'bg-blue-500/40 border-2 border-blue-300'
                            : 'bg-blue-900/20 border border-blue-500/20 hover:bg-blue-800/30'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setCurrentFeature(index)}
                      >
                        <Icon className={`text-3xl mb-2 ${
                          currentFeature === index ? 'text-blue-200' : 'text-blue-400'
                        }`} />
                        <h4 className="text-sm font-bold text-white mb-1">{feature.title}</h4>
                        <p className="text-xs text-blue-200/70">{feature.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Progress indicators */}
                <div className="flex gap-2">
                  {features.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-1 flex-1 rounded-full ${
                        currentFeature === index ? 'bg-blue-400' : 'bg-blue-800/50'
                      }`}
                      animate={{
                        scaleX: currentFeature === index ? [0, 1] : 1,
                      }}
                      transition={{
                        duration: 3,
                        ease: "linear",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 bg-blue-400/30 rounded-full blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-600/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}