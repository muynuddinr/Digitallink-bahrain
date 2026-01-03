'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import OurTeam from '../components/OurTeam';
import OurJourney from "../components/OurJourney";
import aboutus from '@/assets/hikvision.webp';

// Import your banner images (you'll need to add these or update the paths)
import Contactus from '../../assets/remaining/Aboutus.jpg';
import mobileBanner from '../../assets/remaining/AboutMobile.jpg';

// Constants outside component

const SECURITY_OFFERINGS = [
  'Security Cameras (IP, Dome, Bullet, PTZ)',
  'DVR & NVR Systems',
  'Thermal & AI-Enhanced Cameras',
  'Comprehensive Security Installation & Support'
];

const WHY_CHOOSE_US = [
  'High-definition (HD) cameras that capture every detail',
  'Night vision and smart motion detection for round-the-clock security',
  'Sturdy indoor and outdoor cameras suitable for any setting',
  'PTZ, thermal, and advanced surveillance options'
];



// Hero section animation variants
const heroVariants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.4, 0.25, 1] as const
    }
  }
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.4, 0.25, 1] as const,
      delay: 0.2
    }
  }
};

const subtitleVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
      delay: 0.6
    }
  }
};

// Animation variants with proper TypeScript typing
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.4, 0.25, 1] 
    }
  }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.4, 0.25, 1] 
    }
  }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.4, 0.25, 1] 
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 0.2, 
    scale: 1,
    transition: { 
      duration: 0.6 
    }
  }
};

const statsAnimation: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.4, 0.25, 1] 
    }
  }
};

// AboutPage component
export default function AboutPage() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = useCallback((key: string) => {
    setImageErrors(prev => ({
      ...prev,
      [key]: true
    }));
  }, []);

  // Hero section scroll effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 150]);

 

  const securityOfferingsList = useMemo(() => (
    SECURITY_OFFERINGS.map((offering, index) => (
      <motion.div
        key={index}
        variants={slideInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: (index + 1) * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      >
        - {offering}<br />
      </motion.div>
    ))
  ), []);

  const whyChooseUsList = useMemo(() => (
    WHY_CHOOSE_US.map((reason, index) => (
      <motion.div
        key={index}
        variants={slideInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: (index + 1) * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      >
        ✅ {reason}<br />
      </motion.div>
    ))
  ), []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* PageHeader section */}
      {/* Hero Banner - With Mobile Banner Support */}
      <div className="relative h-[35vh] sm:h-[45vh] md:h-[60vh] lg:h-[60vh] bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 overflow-hidden hero-banner">
        <motion.div className="absolute inset-0" style={{ y }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
          <div className="w-full h-full bg-gradient-to-br from-blue-600/40 to-indigo-800/40 opacity-60"></div>
          {/* Desktop Image */}
          <Image
            src={Contactus}
            alt="About Digitallink Bahrain background"
            fill
            className="object-cover opacity-30 hidden sm:block"
            sizes="100vw"
            priority
          />
          {/* Mobile Image */}
          <Image
            src={mobileBanner}
            alt="About Digitallink Bahrain background mobile"
            fill
            className="object-cover opacity-30 block sm:hidden"
            sizes="100vw"
            priority
          />
        </motion.div>

        <div className="relative h-full flex items-center justify-center py-12">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-4 px-4 sm:px-6 lg:px-8"
          >
            <motion.h1
              variants={titleVariants}
              className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight pt-8 sm:pt-0"
            >
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Us
              </span>
            </motion.h1>
            <motion.p
              variants={subtitleVariants}
              className="text-xl sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
            >
              Your trusted partner for comprehensive technology and security solutions in Bahrain
            </motion.p>
          </motion.div>
        </div>
        
        <style jsx>{`
          @media only screen and (min-width: 768px) and (max-width: 1024px),
                only screen and (min-width: 834px) and (max-width: 1194px) {
            .hero-banner {
              height: 35vh !important;
            }
          }
        `}</style>
      </div>

      {/* DigitalLink Bahrain Section - FIXED MOBILE LAYOUT */}
      <section id="our-story" className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          
          {/* 1. STRAIGHT HEADING */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center md:mb-8"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              
              className="text-[40px] sm:text-4xl lg:text-5xl font-black text-gray-900 ">
              <span className="block sm:inline">DigitalLink</span>{' '}
              <span className="block sm:inline  bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 bg-clip-text text-transparent">Bahrain</span>
            </motion.h2>
          </motion.div>

          {/* 2. ABOUT CONTENT BELOW HEADING */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            {/* Desktop/Tablet Content */}
            <p className="hidden sm:block text-lg leading-relaxed text-gray-700">
              Are you on the hunt for top-notch security solutions in Bahrain?
              Look no further! As a <span className="font-bold text-blue-800">premier technology provider</span> in Bahrain,
              we specialize in delivering exceptional security and surveillance
              solutions, including DVRs, NVRs, IP cameras, and cutting-edge
              security systems.
            </p>
            
            {/* Mobile Content - Shorter version */}
            <p className="block sm:hidden text-base leading-relaxed text-gray-700">
              Looking for top-notch security solutions in Bahrain? As a{' '}
              <span className="font-bold text-blue-800">premier technology provider</span>, we deliver exceptional 
              security and surveillance solutions.
            </p>
          </motion.div>

          {/* FIXED LAYOUT: On mobile, show image first, then content */}
          <div className="block lg:hidden mb-12">
            {/* MOBILE: IMAGE FIRST */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative z-20 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={aboutus}
                  alt="DigitalLink Bahrain Team"
                  width={600}
                  height={400}
                  className="w-full h-auto block"
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* 3. LEFT SIDE: SECURITY OFFERINGS & WHY CHOOSE US | RIGHT SIDE: IMAGE (Desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* LEFT SIDE CONTENT - On mobile this comes after image */}
            <div className="space-y-10 order-2 lg:order-1">
              
              {/* Our Security Offerings in Bahrain */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-800 pl-4">
                  Our Security Offerings in Bahrain
                </h3>
                
                <div className="space-y-3">
                  {SECURITY_OFFERINGS.map((offering, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-800 flex-shrink-0" />
                      <span>{offering}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Why Choose Us */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="bg-gradient-to-br from-blue-950 to-blue-800 rounded-2xl shadow-xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Why Choose Us?
                </h3>
                
                <div className="space-y-4">
                  {WHY_CHOOSE_US.map((reason, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-3 text-white"
                    >
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base leading-relaxed">{reason}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDE - IMAGE (Desktop only - hidden on mobile) */}
            <div className="hidden lg:block lg:sticky lg:top-24 order-1 lg:order-2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                {/* Main image container */}
                <div className="relative z-20 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={aboutus}
                    alt="DigitalLink Bahrain Team"
                    width={600}
                    height={400}
                    className="w-full h-auto block"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-800 via-blue-900 to-blue-950 bg-clip-text text-transparent mb-4">About Our Team</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet our dedicated team of educators who are committed to providing the best learning experience for every student.
            </p>
          </motion.div>

          {/* Team Section */}
          <OurTeam />
          <OurJourney />
        </div>
      </div>
    </div>
  );
}