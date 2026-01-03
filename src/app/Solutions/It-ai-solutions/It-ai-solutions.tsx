'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  FaLaptopCode, FaMobileAlt, FaChartLine, FaPaintBrush, FaShoppingCart, 
  FaSearch, FaArrowRight, FaCogs, FaBullhorn, FaShieldAlt, FaCheck, 
  FaLightbulb, FaRocket, FaHandshake, FaBrain, FaChartBar, FaGlobe 
} from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { ReactElement } from 'react';
import about from '@/assets/Building.jpg';
import mobileabout from '@/assets/Building.jpg';

// Import the dynamic PageHeader component
import PageHeader from '../../components/PageHeader';
// Import the SolutionFAQ component
import SolutionFAQ from "../../components/SolutionFAQ";
import StickyContactBar from '../../components/StickyContactBar';

interface Service {
  icon: ReactElement;
  title: string;
  description: string;
  features: string[];
}

interface Solution {
  icon: ReactElement;
  title: string;
  description: string;
}

interface ProcessStep {
  icon: ReactElement;
  title: string;
  description: string;
}

// FIX: Use IconType from react-icons
import { IconType } from 'react-icons';

interface HeaderFeature {
  icon: IconType; // CHANGED TO IconType
  title: string;
  desc: string;
}

// Constants outside component
const SERVICES: Service[] = [
  {
    icon: <FaLaptopCode className="text-3xl" />,
    title: 'Cutting-Edge App Development',
    description: 'Custom applications built with the latest technologies to meet your specific business needs.',
    features: ['Cross-platform compatibility', 'Scalable architecture', 'Modern UI/UX design']
  },
  {
    icon: <FaMobileAlt className="text-3xl" />,
    title: 'Responsive Web Development',
    description: 'Websites that perform flawlessly across all devices with engaging user experiences.',
    features: ['Mobile-first design', 'Fast loading times', 'SEO optimized']
  },
  {
    icon: <FaChartLine className="text-3xl" />,
    title: 'SEO & Digital Marketing',
    description: 'Strategic marketing solutions to boost your online presence and drive conversions.',
    features: ['Keyword research', 'Content optimization', 'Performance analytics']
  },
  {
    icon: <FaPaintBrush className="text-3xl" />,
    title: 'UI/UX Design',
    description: 'Intuitive and visually appealing interfaces that enhance user engagement.',
    features: ['User research', 'Wireframing', 'Prototyping']
  },
  {
    icon: <FaShoppingCart className="text-3xl" />,
    title: 'E-commerce Solutions',
    description: 'Complete online store setups with secure payment gateways and inventory management.',
    features: ['Shopping cart integration', 'Payment processing', 'Order management']
  },
  {
    icon: <FaSearch className="text-3xl" />,
    title: 'AI-Powered Search',
    description: 'Intelligent search capabilities that deliver accurate results and improve user experience.',
    features: ['Natural language processing', 'Personalized results', 'Voice search']
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


const HEADER_SLIDES = [
  {
    title: "IT & AI Solutions",
    subtitle: "Transform your business with cutting-edge technology and artificial intelligence solutions",
    headingPart1: "Transform Your",
    headingPart2: "Digital Business"
  }
];

const HEADER_BENEFITS = [
  "Cutting-Edge App Development",
  "Responsive Web Development",
  "Comprehensive SEO Strategy",
  "Reliable Networking Solutions",
  "AI-Driven Innovation",
  "UAE Strategic Partnership"
];

const HEADER_FEATURES: HeaderFeature[] = [
  { icon: FaLaptopCode, title: "App Development", desc: "Custom solutions" },
  { icon: FaMobileAlt, title: "Web Design", desc: "Responsive experiences" },
  { icon: FaChartLine, title: "SEO & Marketing", desc: "Data-driven strategies" },
  { icon: FaBrain, title: "AI Solutions", desc: "Intelligent automation" }
];

const EXPERTISE_ITEMS = [
  "Custom website development",
  "SEO optimization and strategy",
  "Multi-platform expertise",
  "Keyword research and implementation",
  "Conversion-focused design"
];

// Animation variants with proper TypeScript typing
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.4, 0.25, 1] 
    }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const cardVariant: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.85,
    y: 40
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.4, 0.25, 1] 
    }
  }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.4, 0.25, 1] 
    }
  }
};

export default function ITAISolutions() {
  // State for tracking hovered service
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  // State for tracking hovered solution
  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);

  // Memoized event handlers
  const handleServiceHover = useCallback((index: number | null) => {
    setHoveredService(index);
  }, []);

  const handleSolutionHover = useCallback((index: number | null) => {
    setHoveredSolution(index);
  }, []);

  // Memoized content sections
  const expertiseSection = useMemo(() => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 mb-8">
      <h3 className="font-bold text-blue-900 mb-4 text-lg">Our Expertise Includes:</h3>
      <div className="grid grid-cols-2 gap-3">
        {EXPERTISE_ITEMS.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mr-3 flex-shrink-0">
              <FaCheck className="text-white text-xs" />
            </div>
            <span className="text-gray-700 text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  ), []);

  // Memoized service cards
  const serviceCards = useMemo(() => (
    SERVICES.map((service, index) => (
      <motion.div
        key={index}
        className="relative group h-full"
        variants={cardVariant}
        onHoverStart={() => handleServiceHover(index)}
        onHoverEnd={() => handleServiceHover(null)}
      >
        {/* Background Glow Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-0"
          animate={{ 
            scale: hoveredService === index ? 1.1 : 1,
            opacity: hoveredService === index ? 1 : 0
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Service Card */}
        <div className="relative bg-white rounded-2xl p-1 shadow-lg overflow-hidden h-full">
          <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 relative z-10 flex flex-col">
            {/* Icon Container without hover effect */}
            <div 
              className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg mb-6 mx-auto"
            >
              {service.icon}
            </div>
            
            <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">{service.title}</h3>
            <p className="text-gray-700 mb-6 text-center">{service.description}</p>
            
            <div className="bg-white rounded-xl p-4 shadow-sm mt-auto">
              <h4 className="font-bold text-blue-900 mb-3 text-sm">Key Features:</h4>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    </div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    ))
  ), [hoveredService, handleServiceHover]);

  // Memoized solution cards
  const solutionCards = useMemo(() => (
    SOLUTIONS.map((solution, index) => (
      <motion.div
        key={index}
        className="relative h-full"
        variants={cardVariant}
        onHoverStart={() => handleSolutionHover(index)}
        onHoverEnd={() => handleSolutionHover(null)}
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
            className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-200/30 to-blue-200/30"
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
              <Link 
                href="/contact" 
                className="text-blue-900 font-bold inline-flex items-center group"
                prefetch={false}
              >
                LEARN MORE
                <FaArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    ))
  ), [hoveredSolution, handleSolutionHover]);

  return (
    <>
      {/* Dynamic PageHeader Section */}
      <PageHeader 
        slides={HEADER_SLIDES}
        benefits={HEADER_BENEFITS}
        features={HEADER_FEATURES}
        ctaText="Get Started Today"
        ctaIcon={FaArrowRight}
      />

      {/* About Section */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                {/* Desktop Image */}
                <div className="hidden md:block">
                  <Image
                    src={about}
                    alt="Enhance Your Online Presence"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                    placeholder="blur"
                  />
                </div>
                
                {/* Mobile Image */}
                <div className="md:hidden">
                  <Image
                    src={mobileabout}
                    alt="Enhance Your Online Presence"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                    placeholder="blur"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white mr-3">
                    <FaGlobe className="text-xl" />
                  </div>
                  <h3 className="font-bold text-blue-900">Online Presence</h3>
                </div>
                <p className="text-gray-700 text-sm">Boost your visibility and reach with our expert SEO and web development services.</p>
              </div>
            </motion.div>
            
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-blue-900 mb-6"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                Enhance Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Online Presence</span>
              </motion.h2>
              
              <motion.p 
                className="text-gray-700 mb-6 text-lg"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                Our SEO & Web Development Experts help you create a strong digital footprint with custom websites and effective SEO strategies. We specialize in developing tailored solutions across multiple platforms including WordPress.
              </motion.p>
              
              <motion.p 
                className="text-gray-700 mb-8 text-lg"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                Through comprehensive keyword research and optimization techniques, we drive organic traffic to your site and improve your search engine rankings.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {expertiseSection}
              </motion.div>
              
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center text-blue-900 font-bold group"
                  prefetch={false}
                >
                  Learn more about our services
                  <FaArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Our Core Services</h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">Comprehensive IT & AI solutions designed to transform your business</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {serviceCards}
          </motion.div>
        </div>
      </div>

      {/* Solutions Section with Uniform Cards */}
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
            viewport={{ once: true, amount: 0.1 }}
          >
            {solutionCards}
          </motion.div>
        </div>
      </div>
      
      <SolutionFAQ />
      <StickyContactBar />
    </>
  );
}