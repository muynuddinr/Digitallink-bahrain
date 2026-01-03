'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import Demo1 from '../../assets/remaining/demo1.webp';
import Demo2 from '../../assets/remaining/demo2.webp';
import Demo3 from '../../assets/remaining/demo3.webp';
import Demo4 from '../../assets/remaining/demo4.webp';

interface OurBrand {
  id: number;
  name: string;
  description: string;
  features: string[];
  color: string;
  image: any;
}

const OUR_BRANDS: OurBrand[] = [
  {
    id: 1,
    name: "Demo1",
    description: "Advanced security systems for growing businesses. Ideal for medium-sized businesses, warehouses, and educational campuses requiring comprehensive surveillance.",
    features: [
      "8 Channel NVR",
      "8 Dome Cameras (4MP)",
      "2TB Storage",
      "AI Detection",
    ],
    color: "from-blue-950 via-blue-900 to-blue-800",
    image: Demo1
  },
  {
    id: 2,
    name: "Demo2",
    description: "Essential surveillance solutions for small businesses. Perfect for retail stores, small offices, and residential properties needing reliable security monitoring.",
    features: [
      "4 Channel NVR",
      "4 Bullet Cameras (2MP)",
      "1TB Storage",
      "Mobile App Access",
    ],
    color: "from-blue-800 via-blue-900 to-blue-950",
    image: Demo2
  },
  {
    id: 3,
    name: "Demo3",
    description: "Advanced security systems for growing businesses. Ideal for medium-sized businesses, warehouses, and educational campuses requiring comprehensive surveillance.",
    features: [
      "8 Channel NVR",
      "8 Dome Cameras (4MP)",
      "2TB Storage",
      "AI Detection",
    ],
    color: "from-blue-950 via-blue-900 to-blue-800",
    image: Demo3
  },
  {
    id: 4,
    name: "Demo4",
    description: "Essential surveillance solutions for small businesses. Perfect for retail stores, small offices, and residential properties needing reliable security monitoring.",
    features: [
      "4 Channel NVR",
      "4 Bullet Cameras (2MP)",
      "1TB Storage",
      "Mobile App Access",
    ],
    color: "from-blue-800 via-blue-900 to-blue-950",
    image: Demo4
  }
];

export default function PricingSection() {
  const [selectedBrand, setSelectedBrand] = useState<string>('Demo1');
  const [mobileProductIndex, setMobileProductIndex] = useState<number>(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  
  const activeBrand = OUR_BRANDS.find(b => b.name === selectedBrand) || OUR_BRANDS[0];

  // Handle mobile product image scroll
  const handleMobileScroll = useCallback(() => {
    if (!mobileScrollRef.current) return;
    
    const container = mobileScrollRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.clientWidth;
    
    const index = Math.round(scrollLeft / itemWidth);
    
    if (index >= 0 && index < OUR_BRANDS.length && index !== mobileProductIndex) {
      setMobileProductIndex(index);
      setSelectedBrand(OUR_BRANDS[index].name);
    }
  }, [mobileProductIndex]);

  // Add scroll event listener for mobile
  useEffect(() => {
    const container = mobileScrollRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleMobileScroll);
    handleMobileScroll();

    return () => container.removeEventListener('scroll', handleMobileScroll);
  }, [handleMobileScroll]);

  return (
    <section className="relative py-12 bg-white overflow-hidden">
      {/* Diagonal Light Beam Effect */}
      <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${activeBrand.color} opacity-5 transition-all duration-1000 transform rotate-12 scale-150`} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Brand Selector */}
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 tracking-tight">
              <span className={`bg-gradient-to-r ${activeBrand.color} bg-clip-text text-transparent transition-all duration-700`}>
                Security Products
              </span>
            </h2>
          </motion.div>

          {/* Brand Selector - Tablet and Desktop (sm and above) */}
          <div className="mb-20">
            {/* Desktop/Tablet View - Hidden on mobile only */}
            <div className="hidden sm:flex justify-center items-center gap-8 md:gap-16">
              {OUR_BRANDS.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, type: 'spring', stiffness: 200 }}
                  className="relative"
                >
                  <button
                    onClick={() => setSelectedBrand(brand.name)}
                    className="relative group flex flex-col items-center gap-4"
                  >
                    {/* Logo Without Shape */}
                    <div className="relative w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24">
                      <Image 
                        src={brand.image}
                        alt={`${brand.name} Logo`}
                        width={160}
                        height={96}
                        className={`w-full h-full object-contain transition-all duration-500 ${
                          selectedBrand === brand.name ? 'opacity-100 scale-110' : 'opacity-50 group-hover:opacity-80'
                        }`}
                      />
                    </div>

                    {/* Brand Name Below */}
                    <motion.div
                      className="text-center"
                      animate={{
                        scale: selectedBrand === brand.name ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className={`text-base sm:text-lg font-bold transition-all duration-500 ${
                        selectedBrand === brand.name 
                          ? `bg-gradient-to-r ${brand.color} bg-clip-text text-transparent` 
                          : 'text-gray-400 group-hover:text-gray-600'
                      }`}>
                        {brand.name}
                      </span>
                    </motion.div>

                    {/* Outer Glow for Selected */}
                    {selectedBrand === brand.name && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${brand.color} opacity-20 blur-2xl -z-10`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.5 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Product Image Display - Mobile Only (below sm breakpoint) - Scrollable */}
          <div className="sm:hidden mb-12">
            <div 
              ref={mobileScrollRef}
              className="flex overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide pb-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {OUR_BRANDS.map((brand, index) => (
                <div 
                  key={brand.id}
                  className="relative flex-shrink-0 w-full h-48 rounded-2xl overflow-hidden border border-gray-200 snap-center"
                >
                  <Image 
                    src={brand.image}
                    alt={`${brand.name} Product Display`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {OUR_BRANDS.map((brand, index) => (
                <button
                  key={brand.id}
                  onClick={() => {
                    const container = mobileScrollRef.current;
                    if (container) {
                      container.scrollTo({
                        left: index * container.clientWidth,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="p-1"
                >
                  <div 
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      mobileProductIndex === index ? `bg-gradient-to-r ${brand.color} w-8` : 'bg-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Content Display Area - Asymmetric Layout */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBrand}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              {/* Zigzag Content Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-12 items-start">
                {/* Description - Takes 7 columns on tablet+ */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="sm:col-span-7 space-y-8"
                >
                  {/* Description Box with Diagonal Cut */}
                  <div className="relative transform -skew-y-2">
  <div className={`absolute inset-0 bg-gradient-to-br ${activeBrand.color} opacity-10`} />
  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-950" />
  <div className="relative p-10 transform skew-y-2">
                      <p className="text-lg sm:text-2xl leading-relaxed text-gray-700 font-light">
                        {activeBrand.description}
                      </p>
                    </div>
                  </div>

                  {/* CTA Button - Diagonal */}
                  <motion.button
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r ${activeBrand.color} text-white font-bold text-lg sm:text-xl overflow-hidden group transform -skew-x-6`}
                  >
                    <span className="relative z-10 flex items-center gap-4 skew-x-6">
                      Explore Products
                      <motion.svg 
                        className="w-5 h-5 sm:w-6 sm:h-6" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                    </span>
                    <div className="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  </motion.button>
                </motion.div>

                {/* Features - Takes 5 columns on tablet+ */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="sm:col-span-5 space-y-4"
                >
                  {activeBrand.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="relative group"
                    >
                      {/* Parallelogram Shape */}
                      <div className={`relative bg-gradient-to-r ${activeBrand.color} p-[2px] transform skew-x-6 hover:skew-x-3 transition-all duration-300`}>
                        <div className="bg-white px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
                          <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${activeBrand.color} flex items-center justify-center transform -skew-x-6`}>
                            <span className="text-white font-bold text-xs sm:text-sm">{idx + 1}</span>
                          </div>
                          <span className="text-gray-800 font-semibold text-base sm:text-lg transform -skew-x-6">
                            {feature}
                          </span>
                        </div>
                      </div>

                      {/* Hover Line Effect */}
                      <motion.div
                        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${activeBrand.color}`}
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Hidden style for scrollbar */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}