'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import {
  FaVideo, FaVolumeUp, FaDesktop, FaProjectDiagram, FaArrowRight,
  FaPlug, FaUsers, FaChartLine, FaLightbulb, FaBullhorn,
  FaBrain, FaShieldAlt, FaCogs
} from 'react-icons/fa';
import PageHeader from '../../components/PageHeader';
import SolutionFAQ from '../../components/SolutionFAQ';
import StickyContactBar from '../../components/StickyContactBar';

import Command from "../../../../public/images/CommandControlRoom.webp";
import Digital from "../../../../public/images/DigitalSignageSytem.webp";
import Discussion from "../../../../public/images/DiscussionVotingSystem.webp";
import Integrated from "../../../../public/images/IntegratedControlSystems.webp";
import LoudSpeaker from "../../../../public/images/LoudSpeakers.webp";
import ProjectSystem from "../../../../public/images/ProjectSystems.webp";

import MobileCommand from "../../../../public/images/CommandControlRoom.webp";
import MobileDigital from "../../../../public/images/DigitalSignageSytem.webp";
import MobileDiscussion from "../../../../public/images/DiscussionVotingSystem.webp";
import MobileIntegrated from "../../../../public/images/IntegratedControlSystems.webp";
import MobileLoudSpeaker from "../../../../public/images/LoudSpeakers.webp";
import MobileProjectSystem from "../../../../public/images/ProjectSystems.webp";

import video from "@/assets/Building.jpg";
import mobilevideo from "@/assets/Building.jpg";
import advanced from "@/assets/Building.jpg";
import mobileadvanced from "@/assets/Building.jpg";

// Types
interface Service {
  icon: React.ReactElement;
  title: string;
  description: string;
  features: string[];
}

interface ProjectType {
  title: string;
  icon: React.ReactElement;
}

interface Technology {
  title: string;
  description: string;
  icon: React.ReactElement;
}

interface Solution {
  icon: React.ReactElement;
  title: string;
  description: string;
}

interface Capability {
  title: string;
  image: any;
  mobileImage: any;
}

// Constants outside component
const SERVICES: Service[] = [
  {
    icon: <FaVideo className="text-3xl" />,
    title: '4K Video Conferencing',
    description: 'Crystal-clear video solutions for seamless communication',
    features: [
      'Zoom/Teams integration',
      '4K Logitech webcams',
      'USB/HDMI connectivity',
      'Multi-platform support'
    ]
  },
  {
    icon: <FaVolumeUp className="text-3xl" />,
    title: 'Advanced Audio Systems',
    description: 'Immersive sound experiences for any environment',
    features: [
      'Noise cancellation',
      '360° coverage',
      'Wireless solutions',
      'Acoustic optimization'
    ]
  },
  {
    icon: <FaDesktop className="text-3xl" />,
    title: 'Smart Displays',
    description: 'Interactive screens for dynamic presentations',
    features: [
      'Touch capabilities',
      'Wireless casting',
      'Multi-screen setups',
      'Real-time collaboration'
    ]
  },
  {
    icon: <FaProjectDiagram className="text-3xl" />,
    title: 'System Integration',
    description: 'Seamless connection of all AV components',
    features: [
      'Unified control',
      'IoT compatibility',
      'Cloud management',
      'Custom interfaces'
    ]
  }
];

const SOLUTIONS: Solution[] = [
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
];

const PROJECT_TYPES: ProjectType[] = [
  { title: "Operations Centers", icon: <FaChartLine /> },
  { title: "Classrooms", icon: <FaLightbulb /> },
  { title: "Auditoriums", icon: <FaUsers /> },
  { title: "Boardrooms", icon: <FaDesktop /> },
  { title: "Museums", icon: <FaPlug /> },
  { title: "Courtrooms", icon: <FaProjectDiagram /> },
  { title: "Theaters", icon: <FaUsers /> },
  { title: "Control Rooms", icon: <FaDesktop /> },
  { title: "Broadcast Studios", icon: <FaVideo /> },
  { title: "Worship Centers", icon: <FaVolumeUp /> },
  { title: "Exhibition Centers", icon: <FaPlug /> },
  { title: "Sports Arenas", icon: <FaUsers /> }
];

const CAPABILITIES: Capability[] = [
  { title: "Projection Systems", image: ProjectSystem, mobileImage: MobileProjectSystem },
  { title: "Loud Speakers & Microphones", image: LoudSpeaker, mobileImage: MobileLoudSpeaker },
  { title: "Integrated Control Systems", image: Integrated, mobileImage: MobileIntegrated },
  { title: "Discussion & Voting Systems", image: Discussion, mobileImage: MobileDiscussion },
  { title: "Digital Signage Systems", image: Digital, mobileImage: MobileDigital },
  { title: "Command & Control Rooms", image: Command, mobileImage: MobileCommand }
];

const TECHNOLOGIES: Technology[] = [
  {
    title: "Smart Displays",
    description: "High-definition interactive displays with intuitive touch control and exceptional image quality",
    icon: <FaDesktop className="text-2xl" />
  },
  {
    title: "Interactive Whiteboards",
    description: "Transform presentations with real-time collaboration and idea sharing capabilities",
    icon: <FaLightbulb className="text-2xl" />
  },
  {
    title: "Advanced Audio",
    description: "Crystal-clear sound with conference systems, public address, and professional equipment",
    icon: <FaBullhorn className="text-2xl" />
  }
];

const HEADER_SLIDES = [
  {
    title: "Professional AV Solutions",
    subtitle: "Elevate your business with cutting-edge audio-visual technology from Digitallink Bahrain",
    headingPart1: "Transform Your",
    headingPart2: "Audio-Visual Experience"
  }
];

const HEADER_BENEFITS = [
  "Crystal Clear Communication",
  "Seamless Integration",
  "Expert Installation",
  "24/7 Support",
  "Future-Ready Technology"
];

const HEADER_FEATURES = [
  { icon: FaVideo, title: "Video Solutions", desc: "4K quality" },
  { icon: FaVolumeUp, title: "Audio Systems", desc: "Immersive sound" },
  { icon: FaDesktop, title: "Smart Displays", desc: "Interactive" },
  { icon: FaPlug, title: "Integration", desc: "Seamless" }
];

const VIDEO_FEATURES = [
  'Plug-and-play USB connectivity for instant setup',
  'Premium 4K Pan/Tilt/Zoom cameras with built-in audio',
  'Flexible solutions for group rooms and meeting spaces',
  'Simple laptop-to-TV connection via USB and HDMI'
];

// Animation variants with proper TypeScript typing
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

// Card shuffle animation variant - MUCH SLOWER
const cardShuffle: Variants = {
  hidden: {
    opacity: 0,
    rotateY: -45,
    x: -100,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 3.0,
      ease: [0.34, 1.56, 0.64, 1],
      type: "spring",
      stiffness: 30
    }
  }
};

// Much slower stagger container for capabilities section only
const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8
    }
  }
};

export default function AVSolutionPage() {
  const [activeCard, setActiveCard] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);

  // Memoized event handlers
  const nextCard = useCallback(() => {
    setActiveCard((prev) => (prev + 1) % SERVICES.length);
  }, []);

  const prevCard = useCallback(() => {
    setActiveCard((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  }, []);

  const openModal = useCallback((imageSrc: string, isMobile?: boolean) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  }, []);

  // Memoized service cards for mobile/tablet
  const mobileServiceCards = useMemo(() => (
    SERVICES.map((service, index) => (
      <motion.div
        key={index}
        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        variants={scaleIn}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center text-white mb-4">
            {service.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
          <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
          <ul className="space-y-2 mb-4 text-left w-full">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center text-sm text-gray-700">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    ))
  ), []);

  // Memoized capability cards with separate mobile/desktop images
  const capabilityCards = useMemo(() => (
    CAPABILITIES.map((capability, index) => (
      <motion.div
        key={index}
        className="relative group cursor-pointer"
        variants={cardShuffle}
        whileHover={{
          y: -8,
          scale: 1.02,
          rotateY: 5,
          transition: { duration: 0.3 }
        }}
        onClick={() => openModal(capability.image.src)}
      >
        <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
          <div className="aspect-[4/3] overflow-hidden">
            <motion.div
              className="w-full h-full"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.5, ease: "easeOut" }
              }}
            >
              {/* Desktop Image */}
              <div className="hidden md:block w-full h-full relative">
                <Image
                  src={capability.image}
                  alt={capability.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              
              {/* Mobile Image */}
              <div className="md:hidden w-full h-full relative">
                <Image
                  src={capability.mobileImage}
                  alt={capability.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-20px] group-hover:translate-x-0">
              <h3 className="text-xl font-bold text-white">{capability.title}</h3>
            </div>
          </div>
        </div>
      </motion.div>
    ))
  ), [openModal]);

  // Memoized solution cards
  const solutionCards = useMemo(() => (
    SOLUTIONS.map((solution, index) => (
      <motion.div
        key={index}
        className="relative"
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: index * 0.1 }}
        onHoverStart={() => setHoveredSolution(index)}
        onHoverEnd={() => setHoveredSolution(null)}
      >
        <motion.div 
          className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100 relative overflow-hidden h-full flex flex-col"
          animate={{ 
            y: hoveredSolution === index ? -20 : 0,
            rotateY: hoveredSolution === index ? 5 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Floating effect elements */}
          <motion.div 
            className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-r from-blue-200/30 to-indigo-200/30"
            animate={{ 
              scale: hoveredSolution === index ? 1.2 : 1,
              rotate: hoveredSolution === index ? 15 : 0
            }}
            transition={{ duration: 0.5 }}
          />
          
          <motion.div 
            className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-r from-indigo-200/30 to-blue-200/30"
            animate={{ 
              scale: hoveredSolution === index ? 1.3 : 1,
              rotate: hoveredSolution === index ? -20 : 0
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
    ))
  ), [hoveredSolution]);

  // Memoized project type items
  const projectTypeItems = useMemo(() => (
    PROJECT_TYPES.map((project, index) => (
      <motion.div
        key={index}
        className="px-4 md:px-6 py-2 md:py-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-indigo-200 group cursor-pointer"
        variants={scaleIn}
        whileHover={{
          scale: 1.05,
          backgroundColor: "rgba(99, 102, 241, 0.05)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center">
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center text-white mr-2 group-hover:scale-110 transition-transform duration-300 text-xs md:text-sm">
            {project.icon}
          </div>
          <span className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 text-sm md:text-base">
            {project.title}
          </span>
        </div>
      </motion.div>
    ))
  ), []);

  // Memoized technology items
  const technologyItems = useMemo(() => (
    TECHNOLOGIES.map((tech, index) => (
      <motion.div
        key={index}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl group"
        whileHover={{ x: 10 }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform">
            {tech.icon}
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {tech.title}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {tech.description}
            </p>
          </div>
        </div>
      </motion.div>
    ))
  ), []);

  // Memoized video features
  const videoFeatures = useMemo(() => (
    VIDEO_FEATURES.map((feature, i) => (
      <motion.div
        key={i}
        className="flex items-start"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.1 * i }}
      >
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center mr-3 mt-0.5">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-gray-300">{feature}</p>
      </motion.div>
    ))
  ), []);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <PageHeader
        slides={HEADER_SLIDES}
        benefits={HEADER_BENEFITS}
        features={HEADER_FEATURES}
        ctaText="Get AV Solution"
        ctaIcon={FaArrowRight}
      />

      {/* Services Section - Responsive Card Carousel */}
      <section id="services" className="pt-16 pb-8 bg-gray-50 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="text-center mb-12"
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Premium AV Services
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Cutting-edge solutions designed to transform how you communicate and collaborate
              </p>
            </motion.div>

            {/* Desktop 3D Carousel (hidden on mobile/tablet) */}
            <div className="hidden lg:block">
              <div className="relative h-[500px] flex items-center justify-center" style={{ perspective: '2000px' }}>
                {SERVICES.map((service, index) => {
                  const position = (index - activeCard + SERVICES.length) % SERVICES.length;
                  let transform = '';
                  let zIndex = 0;
                  let opacity = 0.5;

                  if (position === 0) {
                    transform = 'translateX(0) translateZ(0) scale(1)';
                    zIndex = 30;
                    opacity = 1;
                  } else if (position === 1) {
                    transform = 'translateX(350px) translateZ(-200px) scale(0.85)';
                    zIndex = 20;
                    opacity = 0.7;
                  } else if (position === SERVICES.length - 1) {
                    transform = 'translateX(-350px) translateZ(-200px) scale(0.85)';
                    zIndex = 20;
                    opacity = 0.7;
                  } else {
                    transform = 'translateX(0) translateZ(-400px) scale(0.7)';
                    zIndex = 10;
                    opacity = 0;
                  }

                  return (
                    <motion.div
                      key={index}
                      className="absolute w-[350px] bg-white rounded-2xl shadow-xl p-8 border border-gray-100 cursor-pointer"
                      initial={{ opacity: 0, rotateY: 45, translateZ: -200 }}
                      whileInView={{
                        opacity: opacity,
                        rotateY: 0,
                        translateZ: 0,
                        transform: transform
                      }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.7, delay: index * 0.2, ease: 'easeInOut' }}
                      style={{
                        zIndex: zIndex,
                        pointerEvents: position === 0 ? 'auto' : 'none'
                      }}
                      whileHover={position === 0 ? {
                        scale: 1.02,
                        transition: { duration: 0.3 }
                      } : {}}
                    >
                      <div className="flex flex-col items-center text-center h-full">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center text-white mb-6">
                          {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                        <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                        <ul className="space-y-2 mb-6 text-left w-full">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-700">
                              <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex justify-center items-center mt-12 space-x-6">
                <button
                  onClick={prevCard}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-lg"
                >
                  ←
                </button>
                <div className="flex space-x-2">
                  {SERVICES.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCard(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeCard ? 'bg-blue-800 w-8' : 'bg-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextCard}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-lg"
                >
                  →
                </button>
              </div>
            </div>

            {/* Mobile/Tablet Grid (visible on mobile/tablet) */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
              {mobileServiceCards}
            </div>
          </motion.div>
        </div>
      </section>

      {/* System Integration Capabilities - WITH MUCH SLOWER SHUFFLE ANIMATION */}
      <section className="pt-10 pb-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-blue-50/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ perspective: '1500px' }}>
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Audio Visual Systems Integration
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Complete AV solutions designed and deployed by Digitallink Bahrain
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilityCards}
            </div>
          </motion.div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={closeModal}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="bg-transparent rounded-2xl overflow-hidden">
                <div className="w-full h-full overflow-hidden flex items-center justify-center">
                  {selectedImage && (
                    <Image
                      src={selectedImage}
                      alt="Enlarged View"
                      width={800}
                      height={600}
                      className="w-auto h-auto max-w-full max-h-[80vh] object-contain"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Video Conferencing Solutions */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="inline-block px-4 py-2 text-sm font-semibold text-indigo-300 uppercase tracking-wider bg-indigo-900/50 rounded-full mb-6">
                Video Conferencing
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Professional 4K Video Solutions
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Digitallink Bahrain delivers professional 4K Logitech USB webcams compatible with your laptop and favorite conferencing apps including Zoom, Microsoft Teams, and Skype for Business.
              </p>

              <div className="space-y-4 mb-8">
                {videoFeatures}
              </div>

            </motion.div>

            <motion.div
              className="relative"
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3]">
                  {/* Desktop Video Image */}
                  <div className="hidden md:block w-full h-full relative">
                    <Image 
                      src={video} 
                      alt="4K Video Conferencing Setup" 
                      fill
                      className="object-cover" 
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  
                  {/* Mobile Video Image */}
                  <div className="md:hidden w-full h-full relative">
                    <Image 
                      src={mobilevideo} 
                      alt="4K Video Conferencing Setup" 
                      fill
                      className="object-cover" 
                      priority
                      sizes="100vw"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent flex items-end p-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">4K Conferencing Setup</h3>
                    <p className="text-indigo-200">Enterprise-grade video collaboration</p>
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute -top-6 -right-6 bg-white text-indigo-900 px-6 py-3 rounded-full shadow-xl font-bold"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                4K Quality
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Technologies */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-indigo-50 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="text-center mb-10"
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Advanced Technologies for Future-Ready Infrastructure
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
                Digitallink Bahrain provides state-of-the-art audio and visual solutions that help businesses stay ahead in an increasingly competitive digital landscape
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8 ">
              <motion.div
                className="relative"
                variants={fadeInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 h-full border border-indigo-100">
                  <div className="aspect-video rounded-xl mb-6 overflow-hidden">
                    {/* Desktop Advanced Image */}
                    <div className="hidden md:block w-full h-full relative">
                      <Image 
                        src={advanced} 
                        alt="Advanced Technologies" 
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    
                    {/* Mobile Advanced Image */}
                    <div className="md:hidden w-full h-full relative">
                      <Image 
                        src={mobileadvanced} 
                        alt="Advanced Technologies" 
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete System Architecture</h3>
                  <p className="text-gray-600 ">
                    Our portfolio includes cutting-edge technologies from camera inputs to display outputs, with seamless integration of converters, matrix switches, streaming servers, and control systems.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="space-y-6"
                variants={fadeInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {technologyItems}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Types Section */}
      <section className="pt-16 pb-8 bg-gradient-to-br from-indigo-50 to-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="text-center mb-12"
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                AV Solutions for Every Space
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                We design and implement audio-visual systems for diverse environments across Bahrain
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
              {projectTypeItems}
            </div>
          </motion.div>
        </div>
      </section>

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
            {solutionCards}
          </motion.div>
        </div>
      </div>

      <SolutionFAQ />
      <StickyContactBar />
    </div>
  );
}