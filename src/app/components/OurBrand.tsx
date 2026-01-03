'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, Variants, useInView } from 'framer-motion';
import Image from 'next/image';
import { Check, ChevronRight, Shield, Zap, Camera, Server, Video, Eye, Thermometer, Monitor } from 'lucide-react';

// Import brand images from public folder
import dahuaLogo from "../../../public/images/brands/dahuva.jpg";
import unvLogo from "../../../public/images/brands/unv.png";

interface OurBrand {
  id: number;
  name: string;
  tagline: string;
  description: string;
  categories: string[];
  color: string;
}

const OUR_BRANDS: OurBrand[] = [
  {
    id: 1,
    name: "Uniview",
    tagline: "Smart & Efficient",
    description: "Essential surveillance solutions for small businesses. Perfect for retail stores, small offices, and residential properties needing reliable security monitoring.",
    categories: ["IP Camera", "Analog Camera", "PTZ Camera", "NVR", "DVR"],
    color: "from-blue-900 to-blue-700"
  },
  {
    id: 2,
    name: "Dahua",
    tagline: "Professional & Advanced",
    description: "Advanced security systems for growing businesses. Ideal for medium-sized businesses, warehouses, and educational campuses requiring comprehensive surveillance.",
    categories: ["Network Cameras", "HDCVI Cameras", "Network Recorders", "Display & Control", "Accessories"],
    color: "from-blue-950 to-blue-800"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.6
    }
  }
};

const cardVariants: Variants = {
  hidden: { scale: 0.95, opacity: 0, y: 20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.7
    }
  },
  hover: {
    y: -10,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

// Updated category icon function with darker blue colors
const getCategoryIcon = (categoryName: string) => {
  const iconMap: { [key: string]: React.ReactElement } = {
    'IP Camera': <Camera className="w-5 h-5 text-blue-800" />,
    'Analog Camera': <Video className="w-5 h-5 text-blue-700" />,
    'PTZ Camera': <Eye className="w-5 h-5 text-blue-900" />,
    'NVR': <Server className="w-5 h-5 text-blue-950" />,
    'DVR': <Monitor className="w-5 h-5 text-blue-900" />,
    'Network Cameras': <Camera className="w-5 h-5 text-blue-800" />,
    'HDCVI Cameras': <Video className="w-5 h-5 text-blue-700" />,
    'Network Recorders': <Server className="w-5 h-5 text-blue-950" />,
    'Display & Control': <Eye className="w-5 h-5 text-blue-900" />,
    'Accessories': <Zap className="w-5 h-5 text-blue-800" />
  };
  return iconMap[categoryName] || <Camera className="w-5 h-5 text-blue-800" />;
};

export default function BrandShowcaseSection() {
  const [selectedBrand, setSelectedBrand] = useState<number>(1); // Changed to 1 for Uniview as default
  const [viewMode, setViewMode] = useState<'overview' | 'categories'>('overview');

  // Refs for useInView hooks
  const headerRef = useRef(null);
  const brandsContainerRef = useRef(null);
  const sidebarRef = useRef(null);

  // useInView hooks with once: true so animation plays only once
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const brandsInView = useInView(brandsContainerRef, { once: true, amount: 0.2 });
  const sidebarInView = useInView(sidebarRef, { once: true, amount: 0.3 });

  const selectedBrandData = useMemo(() => 
    OUR_BRANDS.find(brand => brand.id === selectedBrand), 
    [selectedBrand]
  );

  const handleBrandSelect = useCallback((brandId: number) => {
    setSelectedBrand(brandId);
  }, []);

  const getGradient = useCallback((color: string) => {
    return `bg-gradient-to-br ${color}`;
  }, []);

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section with scroll animation */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/10 to-blue-800/10 mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={headerInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Shield className="w-4 h-4 text-blue-900" />
            <span className="text-sm font-medium text-blue-900">Professional Security Solutions</span>
          </motion.div> */}
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Choose Your{' '}
            <span className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 bg-clip-text text-transparent">
              Security System
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Select between our reliable Uniview and advanced Dahua systems. Both offer professional-grade 
            surveillance tailored to different business needs and budgets.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Brand Cards */}
          <motion.div 
            ref={brandsContainerRef}
            className="lg:col-span-2 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={brandsInView ? "visible" : "hidden"}
          >
            {OUR_BRANDS.map((brand, index) => (
              <motion.div
                key={brand.id}
                variants={itemVariants}
                custom={index}
                whileHover="hover"
                className="relative"
              >
                <motion.div
                  variants={cardVariants}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    selectedBrand === brand.id 
                      ? 'ring-2 ring-blue-800 shadow-xl' 
                      : 'shadow-lg hover:shadow-xl'
                  }`}
                  onClick={() => handleBrandSelect(brand.id)}
                >
                  {/* Background Pattern */}
                  <div className={`absolute inset-0 ${getGradient(brand.color)} opacity-10`} />
                  
                  {/* Card Content */}
                  <div className="relative p-8 bg-white">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      {/* Brand Logo */}
                      <motion.div 
                        className="relative w-40 h-24 flex-shrink-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={brandsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                      >
                        <Image 
                          src={brand.name === "Uniview" ? unvLogo : dahuaLogo}
                          alt={`${brand.name} Logo`}
                          fill
                          className="object-contain"
                          priority
                        />
                      </motion.div>
                      
                      {/* Brand Info */}
                      <div className="flex-grow">
                        <motion.div 
                          className="flex items-center gap-3 mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={brandsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                        >
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{brand.name}</h3>
                            <p className="text-gray-500">{brand.tagline}</p>
                          </div>
                        </motion.div>
                        
                        <motion.p 
                          className="text-gray-600 mb-6"
                          initial={{ opacity: 0 }}
                          animate={brandsInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                        >
                          {brand.description}
                        </motion.p>

                        {/* Categories Section */}
                        <motion.div 
                          className="mt-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={brandsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Camera className="w-4 h-4 text-blue-800" />
                            <h4 className="text-sm font-medium text-gray-700">Product Categories</h4>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            {brand.categories.map((category, catIndex) => (
                              <motion.div 
                                key={catIndex} 
                                className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={brandsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: 0.7 + index * 0.2 + catIndex * 0.05 }}
                              >
                                <div className="flex-shrink-0">
                                  {getCategoryIcon(category)}
                                </div>
                                <span className="text-xs font-medium text-gray-700 truncate">
                                  {category}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Selection Indicator */}
                      <motion.div 
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 ${
                          selectedBrand === brand.id 
                            ? 'border-blue-800 bg-blue-800' 
                            : 'border-gray-300'
                        }`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={brandsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.2 }}
                      >
                        {selectedBrand === brand.id && (
                          <div className="w-full h-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - Detailed View (Hidden on mobile and tablet) */}
          <motion.div
            ref={sidebarRef}
            initial={{ opacity: 0, x: 30 }}
            animate={sidebarInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:block lg:col-span-1"
          >
            <div className="sticky top-8">
              {/* View Mode Toggle */}
              <motion.div 
                className="flex gap-2 p-2 bg-gray-100 rounded-2xl mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={sidebarInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button
                  onClick={() => setViewMode('overview')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    viewMode === 'overview'
                      ? 'bg-white shadow-sm text-blue-800'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setViewMode('categories')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    viewMode === 'categories'
                      ? 'bg-white shadow-sm text-blue-800'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Categories
                </button>
              </motion.div>

              {/* Detailed Panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${viewMode}-${selectedBrand}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={sidebarInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                >
                  {/* Panel Header */}
                  <div className={`p-8 ${getGradient(selectedBrandData?.color || 'from-blue-950 to-blue-800')}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-white">
                        <h3 className="text-2xl font-bold">{selectedBrandData?.name}</h3>
                        <p className="text-blue-100">{selectedBrandData?.tagline}</p>
                      </div>
                    </div>
                    <div className="relative h-16">
                      <Image
                        src={selectedBrandData?.name === "Uniview" ? unvLogo : dahuaLogo}
                        alt="Brand Logo"
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  </div>

                  {/* Panel Content */}
                  <div className="p-8">
                    <AnimatePresence mode="wait">
                      {viewMode === 'overview' ? (
                        <motion.div
                          key="overview"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div>
                            <h4 className="text-lg font-semibold mb-3 text-gray-900">System Description</h4>
                            <p className="text-gray-600">
                              {selectedBrandData?.description}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-gray-100">
                            <h4 className="text-lg font-semibold mb-3 text-gray-900">Ideal For</h4>
                            <ul className="space-y-2">
                              {selectedBrandData?.name === "Uniview" ? (
                                <>
                                  <li className="flex items-center gap-2 text-gray-700">
                                    <Check className="w-4 h-4 text-blue-800" />
                                    Small retail stores
                                  </li>
                                  <li className="flex items-center gap-2 text-gray-700">
                                    <Check className="w-4 h-4 text-blue-800" />
                                    Small offices
                                  </li>
                                  <li className="flex items-center gap-2 text-gray-700">
                                    <Check className="w-4 h-4 text-blue-800" />
                                    Residential properties
                                  </li>
                                </>
                              ) : (
                                <>
                                  <li className="flex items-center gap-2 text-gray-700">
                                    <Check className="w-4 h-4 text-blue-800" />
                                    Medium-sized businesses
                                  </li>
                                  <li className="flex items-center gap-2 text-gray-700">
                                    <Check className="w-4 h-4 text-blue-800" />
                                    Warehouses & storage facilities
                                  </li>
                                  <li className="flex items-center gap-2 text-gray-700">
                                    <Check className="w-4 h-4 text-blue-800" />
                                    Educational campuses
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="categories"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <h4 className="text-lg font-semibold mb-4 text-gray-900">
                            All Product Categories
                          </h4>
                          <div className="space-y-2">
                            {selectedBrandData?.categories.map((category, index) => (
                              <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group border border-gray-100"
                              >
                                <div className="p-1.5 rounded-md bg-white shadow-sm">
                                  {getCategoryIcon(category)}
                                </div>
                                <div className="flex-1">
                                  <span className="text-sm font-medium text-gray-900">{category}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-800 transition-colors" />
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}