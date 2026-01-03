'use client';

import { memo, useState, useMemo, useCallback } from 'react';
import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  FaVideo, FaShieldAlt, FaNetworkWired, FaCloud, FaMobileAlt,  
  FaArrowRight, FaLightbulb as FaBulb,
  FaBrain, FaBullhorn, FaCogs
} from 'react-icons/fa';
import PageHeader from '../../components/PageHeader';
import SolutionFAQ from '../../components/SolutionFAQ';
import StickyContactBar from '../../components/StickyContactBar';

// Surveillance images - Static imports (Next.js auto-generates blurDataURL)
import companyImage from "@/assets/Solution.jpg";
import mobilecompanyImage from "@/assets/Solution.jpg";

import demoImage from "@/assets/Solution.jpg";
import mobiledemoImage from "@/assets/Solution.jpg";

import analyticsImage from "@/assets/Building.jpg";
import mobileanalyticsImage from "@/assets/Building.jpg";

import remoteImage from "@/assets/hikvision.webp";
import mobileremoteImage from "@/assets/hikvision.webp";

import aiImage from "@/assets/Building.jpg";
import mobileaiImage from "@/assets/Building.jpg";


// Types
interface Feature {
  readonly icon: React.ReactElement;
  readonly title: string;
  readonly description: string;
}

interface Solution {
  readonly icon: React.ReactElement;
  readonly title: string;
  readonly description: string;
}

interface TabContent {
  readonly title: string;
  readonly description: string;
  readonly features: readonly string[];
}

interface CaseStudy {
  readonly title: string;
  readonly challenge: string;
  readonly solution: string;
  readonly results: readonly string[];
  readonly image: typeof companyImage;
}

// Animation variants - moved outside component to prevent recreation
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.8,
      ease: [0.22, 0.61, 0.36, 1]
    }
  }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 2.0,
      ease: [0.22, 0.61, 0.36, 1]
    }
  }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 2.0,
      ease: [0.22, 0.61, 0.36, 1]
    }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.22, 0.61, 0.36, 1]
    }
  }
};

const tabContentVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.22, 0.61, 0.36, 1]
    }
  }
};

const tabImageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: [0.22, 0.61, 0.36, 1]
    }
  }
};

const caseStudyTitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      delay: 0.2,
      ease: [0.22, 0.61, 0.36, 1]
    }
  }
};

const caseStudySectionVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 0.61, 0.36, 1]
    }
  }
};

const resultItemVariants: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1]
    }
  }
};

const resultStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Memoized components
const FeatureItem = memo(({ feature, index }: { feature: Feature; index: number }) => (
  <motion.div
    className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-indigo-200 transition-all duration-500 hover:shadow-xl"
    variants={{
      hidden: {
        opacity: 0,
        y: 30
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.22, 0.61, 0.36, 1]
        }
      }
    }}
    whileHover={{
      y: -8,
      transition: {
        duration: 0.4,
        ease: [0.22, 0.61, 0.36, 1]
      }
    }}
  >
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center text-white mb-4 mx-auto">
      {feature.icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
    <p className="text-gray-600 text-center">{feature.description}</p>
  </motion.div>
));

FeatureItem.displayName = 'FeatureItem';

const TabButton = memo(({ 
  tab, 
  index, 
  isActive, 
  onClick 
}: { 
  tab: TabContent; 
  index: number; 
  isActive: boolean; 
  onClick: () => void; 
}) => (
  <motion.button
    className={`px-6 py-4 font-medium text-sm md:text-base transition-colors duration-300 ${
      isActive
        ? 'text-indigo-600 border-b-2 border-indigo-600'
        : 'text-gray-500 hover:text-gray-700'
    }`}
    onClick={onClick}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ 
      duration: 0.6, 
      delay: 0.3 + (index * 0.1),
      ease: [0.25, 0.4, 0.25, 1]
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {tab.title}
  </motion.button>
));

TabButton.displayName = 'TabButton';

const FeatureListItem = memo(({ feature, index }: { feature: string; index: number }) => (
  <motion.li
    className="flex items-start"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.3 + index * 0.15, ease: [0.22, 0.61, 0.36, 1] }}
  >
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-0.5">
      <svg className="w-3 h-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="text-gray-700">{feature}</span>
  </motion.li>
));

FeatureListItem.displayName = 'FeatureListItem';

const ResultItem = memo(({ result, index }: { result: string; index: number }) => (
  <motion.li
    className="flex items-start"
    variants={resultItemVariants}
  >
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center mr-3 mt-0.5">
      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="text-gray-700">{result}</span>
  </motion.li>
));

ResultItem.displayName = 'ResultItem';

const SolutionCard = memo(({ 
  solution, 
  index, 
  isHovered, 
  onHoverStart, 
  onHoverEnd 
}: { 
  solution: Solution; 
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) => (
  <motion.div
    className="relative"
    variants={scaleIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    transition={{ delay: index * 0.1 }}
    onHoverStart={onHoverStart}
    onHoverEnd={onHoverEnd}
  >
    <motion.div 
      className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100 relative overflow-hidden h-full flex flex-col"
      animate={{ 
        y: isHovered ? -20 : 0,
        rotateY: isHovered ? 5 : 0
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-r from-blue-200/30 to-indigo-200/30"
        animate={{ 
          scale: isHovered ? 1.2 : 1,
          rotate: isHovered ? 15 : 0
        }}
        transition={{ duration: 0.5 }}
      />
      
      <motion.div 
        className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-r from-indigo-200/30 to-blue-200/30"
        animate={{ 
          scale: isHovered ? 1.3 : 1,
          rotate: isHovered ? -20 : 0
        }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg mb-6 mx-auto">
          {solution.icon}
        </div>
        <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">{solution.title}</h3>
        <p className="text-gray-700 mb-6 text-center flex-grow">{solution.description}</p>
        
        <div className="text-center mt-auto">
          <button 
            className="text-blue-900 font-bold inline-flex items-center group"
          >
            LEARN MORE
            <FaArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
));

SolutionCard.displayName = 'SolutionCard';

export default function SurveillancePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);

  // Memoized data
  const solutions = useMemo<Solution[]>(() => [
    {
      icon: <FaBrain className="text-4xl" />,
      title: "IT & AI Solutions",
      description: "Advanced technology solutions to streamline your business operations"
    },
    {
      icon: <FaBullhorn className="text-4xl" />,
      title: "Audio & Visual Solution",
      description: "Integrated communication systems for enhanced connectivity"
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Surveillance Solutions",
      description: "Comprehensive security systems to protect your assets"
    },
    {
      icon: <FaCogs className="text-4xl" />,
      title: "ELV Company",
      description: "Complete ELV solutions for modern building infrastructure and vertical transportation"
    }
  ], []);

  const tabContent = useMemo<TabContent[]>(() => [
    {
      title: "IP Surveillance Systems",
      description: "Digitallink Bahrain provides modern IP monitoring systems that deliver high-quality video recording with exceptional reliability and performance for businesses across the region.",
      features: [
        "High-definition video recording capabilities",
        "Easy system scalability for growing businesses",
        "Fast integration with existing security infrastructure",
        "Remote viewing & mobile access for real-time monitoring",
        "Flexible infrastructure adaptation to various environments"
      ]
    },
    {
      title: "Advanced Analytics",
      description: "Our intelligent video analytics solutions from Digitallink Bahrain provide real-time insights and automated threat detection for enhanced security monitoring.",
      features: [
        "Real-time monitoring & intelligent alerts system",
        "Advanced behavioral analysis for threat prediction",
        "Precise object detection & tracking capabilities",
        "Anomaly detection for unusual activities",
        "Automated incident response for immediate action"
      ]
    },
    {
      title: "Remote Access Solutions",
      description: "Digitallink Bahrain's remote surveillance access solutions allow you to monitor your premises from anywhere using our cutting-edge technology.",
      features: [
        "Smartphone & tablet access for on-the-go monitoring",
        "Thermal imaging technology for low-light conditions",
        "Weather-resistant performance in all environments",
        "Multi-location management from a single interface",
        "Secure encrypted connections for data protection"
      ]
    },
    {
      title: "AI-Powered Security",
      description: "Enhance your surveillance with Digitallink Bahrain's artificial intelligence solutions for smarter, more proactive security measures.",
      features: [
        "Intelligent perimeter protection with intrusion detection",
        "Advanced facial recognition for access control",
        "Privacy protection features with intelligent masking",
        "License plate recognition for vehicle management",
        "Crowd analysis & management for large gatherings"
      ]
    }
  ], []);

  const features = useMemo<Feature[]>(() => [
    {
      icon: <FaVideo className="text-3xl" />,
      title: 'High-Quality Video',
      description: 'Crystal-clear recording for detailed monitoring and evidence collection'
    },
    {
      icon: <FaNetworkWired className="text-3xl" />,
      title: 'Easy Integration',
      description: 'Seamlessly connect with existing infrastructure and security systems'
    },
    {
      icon: <FaCloud className="text-3xl" />,
      title: 'Cloud Storage',
      description: 'Secure, scalable storage with anytime access to surveillance footage'
    },
    {
      icon: <FaMobileAlt className="text-3xl" />,
      title: 'Remote Access',
      description: 'Monitor your property from anywhere using mobile devices'
    }
  ], []);

  // const caseStudy = useMemo<CaseStudy>(() => ({
  //   title: "Bahrain District Security Enhancement",
  //   challenge: "The Bahrain Financial District needed a comprehensive surveillance upgrade to enhance security across multiple buildings while maintaining aesthetic appeal and minimizing disruption to daily operations.",
  //   solution: "Digitallink Bahrain designed and implemented an integrated IP surveillance system with AI-powered analytics, facial recognition, and centralized management platform. The solution included 300+ high-definition cameras with thermal imaging capabilities.",
  //   results: [
  //     "40% reduction in security incidents",
  //     "Improved response time by 60%",
  //     "Centralized monitoring of all facilities",
  //     "Enhanced investigation capabilities with searchable video analytics"
  //   ],
  //   image: caseImage  // Using the static import directly
  // }), []);

  const headerSlides = useMemo(() => [
    {
      title: "Surveillance Solutions",
      subtitle: "Leading provider of advanced surveillance systems in Bahrain and the Middle East",
      headingPart1: "Advanced",
      headingPart2: "Surveillance Solutions"
    }
  ], []);

  const headerBenefits = useMemo(() => [
    "High-Quality Video Recording",
    "Easy Scalability",
    "Fast Integration",
    "Remote Access",
    "Mobile Operation"
  ], []);

  const headerFeatures = useMemo(() => [
    { icon: FaVideo, title: "IP Systems", desc: "Modern technology" },
    { icon: FaNetworkWired, title: "Integration", desc: "Seamless" },
    { icon: FaMobileAlt, title: "Remote Access", desc: "Anytime, anywhere" },
    { icon: FaShieldAlt, title: "Security", desc: "Advanced protection" }
  ], []);

  // Memoized event handlers
  const openModal = useCallback((imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  }, []);

  const handleTabClick = useCallback((index: number) => {
    setActiveTab(index);
  }, []);

  const handleSolutionHoverStart = useCallback((index: number) => () => {
    setHoveredSolution(index);
  }, []);

  const handleSolutionHoverEnd = useCallback(() => {
    setHoveredSolution(null);
  }, []);

  // Memoized company features
  const companyFeatures = useMemo(() => [
    'Official distributor of UNV, Dahua and other leading brands',
    'Modern, reliable surveillance technology solutions',
    'High-quality video recording systems for all environments',
    'Solutions designed for current and future security needs'
  ], []);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        slides={headerSlides}
        benefits={headerBenefits}
        features={headerFeatures}
        ctaText="Get Surveillance Solution"
        ctaIcon={FaArrowRight}
      />

      {/* Company Introduction */}
      <section className="pt-16 pb-12 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative order-1 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInRight}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] relative">
                  {/* Desktop Image */}
                  <div className="hidden md:block w-full h-full relative">
                    <Image 
                      src={companyImage}  // Using static import
                      alt="Surveillance solutions leader" 
                      fill
                      className="object-cover" 
                      placeholder="blur"  // Next.js auto-generates blurDataURL
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  
                  {/* Mobile Image */}
                  <div className="md:hidden w-full h-full relative">
                    <Image 
                      src={mobilecompanyImage}  // Using static import
                      alt="Surveillance solutions leader" 
                      fill
                      className="object-cover" 
                      placeholder="blur"  // Next.js auto-generates blurDataURL
                      sizes="100vw"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="order-2 lg:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInLeft}
            >
              {/* <motion.span
                className="inline-block px-4 py-2 text-sm font-semibold text-indigo-600 uppercase tracking-wider bg-white rounded-full mb-4 shadow-sm"
                variants={fadeInUp}
              >
                Industry Leader
              </motion.span> */}
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                variants={fadeInUp}
              >
                Surveillance Solutions Leader in Bahrain and the Middle East
              </motion.h2>
              <motion.p
                className="text-lg text-gray-700 mb-6 leading-relaxed"
                variants={fadeInUp}
              >
                As the leading surveillance solutions provider in Bahrain and the Middle East, Digitallink Bahrain is the official distributor of industry-leading brands like UNV and Dahua. Our commitment is to deliver modern, reliable surveillance technology that meets the highest security standards for our clients.
              </motion.p>
              <motion.div
                className="space-y-4"
                variants={staggerContainer}
              >
                {companyFeatures.map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start"
                    variants={fadeInUp}
                    custom={i}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">{feature}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* IP System Features */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3
                }
              }
            }}
          >
            <motion.div
              className="text-center mb-12"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 1.0,
                    ease: [0.22, 0.61, 0.36, 1]
                  }
                }
              }}
            >
              {/* <span className="inline-block px-4 py-2 text-sm font-semibold text-indigo-600 uppercase tracking-wider bg-indigo-50 rounded-full mb-4">
                Key Features
              </span> */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Advanced IP Surveillance Systems
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Digitallink Bahrain's IP monitoring systems are designed to deliver exceptional performance with modern security requirements
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FeatureItem 
                  key={feature.title} 
                  feature={feature} 
                  index={index} 
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabbed Content Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-indigo-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* <span className="inline-block px-4 py-2 text-sm font-semibold text-indigo-600 uppercase tracking-wider bg-white rounded-full mb-4 shadow-sm">
              Our Solutions
            </span> */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comprehensive Surveillance Technologies
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Digitallink Bahrain offers a range of advanced surveillance solutions designed to meet diverse security needs
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.div 
              className="flex flex-wrap border-b border-gray-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {tabContent.map((tab, index) => (
                <TabButton
                  key={tab.title}
                  tab={tab}
                  index={index}
                  isActive={activeTab === index}
                  onClick={() => handleTabClick(index)}
                />
              ))}
            </motion.div>

            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 20, transition: { duration: 0.5 } }}
                  variants={tabContentVariants}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  <motion.div
                    variants={tabImageVariants}
                    className="flex justify-center order-1 md:order-2"
                  >
                    <div className="relative rounded-xl overflow-hidden shadow-lg w-full max-w-md aspect-[4/3]">
                      {/* Desktop Images */}
                      <div className="hidden md:block w-full h-full relative">
                        {activeTab === 0 && (
                          <Image 
                            src={demoImage}  // Using static import
                            alt="IP Surveillance Systems" 
                            fill
                            className="object-cover" 
                            placeholder="blur"  // Next.js auto-generates blurDataURL
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        )}
                        {activeTab === 1 && (
                          <Image 
                            src={analyticsImage}  // Using static import
                            alt="Advanced Analytics" 
                            fill
                            className="object-cover" 
                            placeholder="blur"  // Next.js auto-generates blurDataURL
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        )}
                        {activeTab === 2 && (
                          <Image 
                            src={remoteImage}  // Using static import
                            alt="Remote Access Solutions" 
                            fill
                            className="object-cover" 
                            placeholder="blur"  // Next.js auto-generates blurDataURL
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        )}
                        {activeTab === 3 && (
                          <Image 
                            src={aiImage}  // Using static import
                            alt="AI-Powered Security" 
                            fill
                            className="object-cover" 
                            placeholder="blur"  // Next.js auto-generates blurDataURL
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        )}
                      </div>
                      
                      {/* Mobile Images */}
                      <div className="md:hidden w-full h-full relative">
                        {activeTab === 0 && (
                          <Image 
                            src={mobiledemoImage}  // Using static import
                            alt="IP Surveillance Systems" 
                            fill
                            className="object-cover" 
                            placeholder="blur"  // Next.js auto-generates blurDataURL
                            sizes="100vw"
                          />
                        )}
                        {activeTab === 1 && (
                          <Image 
                            src={mobileanalyticsImage}  // Using static import
                            alt="Advanced Analytics" 
                            fill
                            className="object-cover" 
                            placeholder="blur"  // Next.js auto-generates blurDataURL
                            sizes="100vw"
                          />
                        )}
                        {activeTab === 2 && (
                          <Image 
                            src={mobileremoteImage}  // Using static import
                            alt="Remote Access Solutions" 
                            fill
                            className="object-cover" 
                            placeholder="blur"  // Next.js auto-generates blurDataURL
                            sizes="100vw"
                          />
                        )}
                        {activeTab === 3 && (
                          <Image 
                            src={mobileaiImage}  // Using static import
                            alt="AI-Powered Security" 
                            fill
                            className="object-cover" 
                            placeholder="blur"  // Next.js auto-generates blurDataURL
                            sizes="100vw"
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <div className="order-2 md:order-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{tabContent[activeTab].title}</h3>
                    <p className="text-gray-600 mb-6">{tabContent[activeTab].description}</p>
                    <ul className="space-y-3">
                      {tabContent[activeTab].features.map((feature, i) => (
                        <FeatureListItem 
                          key={feature} 
                          feature={feature} 
                          index={i} 
                        />
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Section */}
      {/* <section className="py-16 bg-gradient-to-br from-gray-50 to-indigo-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              className="text-center mb-12"
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Featured Case Study
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover how our surveillance solutions transformed security for a major financial district
              </p>
            </motion.div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8">
                <motion.div
                  variants={fadeInLeft}
                  className="relative min-h-[300px] lg:min-h-[500px]"
                >
                  <Image 
                    src={caseStudy.image}  // Using static import
                    alt={caseStudy.title} 
                    className="w-full h-full object-cover" 
                    fill
                    placeholder="blur"  // Next.js auto-generates blurDataURL
                  />
                </motion.div>

                <motion.div
                  variants={fadeInRight}
                  className="p-8"
                >
                  <motion.h3
                    className="text-2xl font-bold text-gray-900 mb-6"
                    variants={caseStudyTitleVariants}
                  >
                    {caseStudy.title}
                  </motion.h3>

                  <motion.div
                    className="mb-6"
                    variants={caseStudySectionVariants}
                  >
                    <h4 className="text-lg font-bold text-indigo-600 mb-2">Challenge</h4>
                    <p className="text-gray-700">{caseStudy.challenge}</p>
                  </motion.div>

                  <motion.div
                    className="mb-6"
                    variants={caseStudySectionVariants}
                  >
                    <h4 className="text-lg font-bold text-indigo-600 mb-2">Solution</h4>
                    <p className="text-gray-700">{caseStudy.solution}</p>
                  </motion.div>

                  <motion.div variants={caseStudySectionVariants}>
                    <h4 className="text-lg font-bold text-indigo-600 mb-2">Results</h4>
                    <motion.ul
                      className="space-y-2"
                      variants={resultStagger}
                    >
                      {caseStudy.results.map((result, index) => (
                        <ResultItem 
                          key={result} 
                          result={result} 
                          index={index} 
                        />
                      ))}
                    </motion.ul>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Our More Solutions Section */}
      <div className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Our More Solutions</h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {solutions.map((solution, index) => (
              <SolutionCard
                key={solution.title}
                solution={solution}
                index={index}
                isHovered={hoveredSolution === index}
                onHoverStart={handleSolutionHoverStart(index)}
                onHoverEnd={handleSolutionHoverEnd}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <SolutionFAQ />
      <StickyContactBar />
    </div>
  );
}