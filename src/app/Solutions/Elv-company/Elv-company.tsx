'use client';

import { memo, useState, useMemo, useCallback } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  FaBuilding, FaTools, FaCog, FaComments, FaArrowRight, 
  FaShieldAlt, FaCheck, FaBrain, FaBullhorn, FaCogs 
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';

// Components
import PageHeader from '../../components/PageHeader';
import SolutionFAQ from "../../components/SolutionFAQ";
import StickyContactBar from '../../components/StickyContactBar';

// Assets
import rightimage from "@/assets/Building.jpg";
import mobilerightimage from "@/assets/Building.jpg";
import leftimage from "@/assets/Solution.jpg";
import mobileleftimage from "@/assets/Solution.jpg";

// Types
interface Service {
  readonly icon: ReactElement;
  readonly title: string;
  readonly description: string;
}

interface Solution {
  readonly icon: ReactElement;
  readonly title: string;
  readonly description: string;
}

interface WhyChooseItem {
  readonly title: string;
  readonly description: string;
}

// Animation variants - moved outside component to prevent recreation
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
      staggerChildren: 0.1
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.4, 0.25, 1] 
    }
  }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
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
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.4, 0.25, 1] 
    }
  }
};

// Memoized components to prevent unnecessary re-renders
const ServiceItem = memo(({ service, index }: { service: Service; index: number }) => (
  <motion.div
    className="flex items-center overflow-hidden"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.6 + index * 0.1 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <FaCheck className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0" />
    <span className="text-sm md:text-base text-gray-700">
      <strong>{service.title}:</strong> {service.description}
    </span>
  </motion.div>
));

ServiceItem.displayName = 'ServiceItem';

const WhyChooseItem = memo(({ item, index }: { item: WhyChooseItem; index: number }) => (
  <motion.div
    className="flex items-center overflow-hidden"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.6 + index * 0.1 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <FaCheck className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0" />
    <span className="text-sm md:text-base text-gray-700">
      <strong>{item.title}:</strong> {item.description}
    </span>
  </motion.div>
));

WhyChooseItem.displayName = 'WhyChooseItem';

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
      {/* Floating effect elements */}
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
));

SolutionCard.displayName = 'SolutionCard';

export default function ELVCompanyPage() {
  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);

  // Memoized data to prevent recreation on re-renders
  const services = useMemo<Service[]>(() => [
    {
      icon: <FaBuilding className="text-3xl" />,
      title: 'Elevator Installation',
      description: 'Complete installations for residential, commercial, and industrial projects.'
    },
    {
      icon: <FaTools className="text-3xl" />,
      title: 'Maintenance & Repairs',
      description: '24/7 dedicated support to minimize downtime and ensure operations.'
    },
    {
      icon: <FaCog className="text-3xl" />,
      title: 'Modernization',
      description: 'Upgrade older systems to current technology and safety standards.'
    },
    {
      icon: <FaComments className="text-3xl" />,
      title: 'Consultation',
      description: 'Expert guidance for optimal elevator system selection and performance.'
    }
  ], []);

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

  const whyChooseItems = useMemo<WhyChooseItem[]>(() => [
    {
      title: "Unparalleled Expertise",
      description: "Years of experience ensuring precision and dedication"
    },
    {
      title: "Cutting-Edge Technology",
      description: "Latest elevator technology for smooth transportation"
    },
    {
      title: "Safety First",
      description: "International and local safety standards prioritized"
    },
    {
      title: "Customized Solutions",
      description: "Bespoke elevator systems tailored to each project"
    },
    {
      title: "Reliable After-sales Service",
      description: "Robust maintenance ensuring seamless operations"
    }
  ], []);

  const headerSlides = useMemo(() => [
    {
      title: "Professional ELV Solutions",
      subtitle: "Complete Extra Low Voltage solutions for modern building infrastructure and vertical transportation",
      headingPart1: "Elevate Your",
      headingPart2: "Building Infrastructure"
    }
  ], []);

  const headerBenefits = useMemo(() => [
    "Unparalleled Expertise",
    "Cutting-Edge Technology",
    "Safety First",
    "Customized Solutions",
    "Reliable After-sales Service"
  ], []);

  const headerFeatures = useMemo(() => [
    { icon: FaBuilding, title: "Installation", desc: "Professional setup" },
    { icon: FaTools, title: "Maintenance", desc: "Reliable service" },
    { icon: FaCog, title: "Modernization", desc: "System upgrades" },
    { icon: FaComments, title: "Consultation", desc: "Expert advice" }
  ], []);

  // Optimized event handlers
  const handleSolutionHoverStart = useCallback((index: number) => () => {
    setHoveredSolution(index);
  }, []);

  const handleSolutionHoverEnd = useCallback(() => {
    setHoveredSolution(null);
  }, []);

  return (
    <>
      {/* Dynamic PageHeader Section */}
      <PageHeader 
        slides={headerSlides}
        benefits={headerBenefits}
        features={headerFeatures}
        ctaText="Get Started Today"
        ctaIcon={FaArrowRight}
      />

      {/* Professional Communication Section - Image Left, Content Right */}
      <section className="py-8 md:py-12 lg:py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="overflow-hidden"
          >
            <motion.div
              className="text-center mb-8 md:mb-12 overflow-hidden"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-4">
                Our Services
              </h2> 
            </motion.div>

            <div className="space-y-8 md:space-y-12 lg:space-y-16 overflow-hidden">
              <motion.div
                className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center overflow-hidden"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Image on Left */}
                <motion.div
                  className="overflow-hidden"
                  initial="hidden"
                  whileInView="visible"
                  variants={slideInLeft}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    {/* Desktop Image */}
                    <div className="hidden md:block w-full h-48 md:h-64 lg:h-80 relative">
                      <Image 
                        src={leftimage}
                        alt="Professional Elevator Services"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority
                        placeholder="blur"
                      />
                    </div>
                    
                    {/* Mobile Image */}
                    <div className="md:hidden w-full h-48 relative">
                      <Image 
                        src={mobileleftimage}
                        alt="Professional Elevator Services"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                        placeholder="blur"
                      />
                    </div>
                    {/* Overlay gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </motion.div>

                {/* Content on Right */}
                <motion.div
                  className="space-y-4 md:space-y-6 overflow-hidden"
                  initial="hidden"
                  whileInView="visible"
                  variants={slideInRight}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="overflow-hidden">
                    <motion.h3
                      className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      Ascend with Our Expertise
                    </motion.h3>
                    <motion.p
                      className="text-sm md:text-base lg:text-lg text-gray-600"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      Professional 4K video conferencing solutions from desk setups to large meeting rooms.
                    </motion.p>
                  </div>

                  <motion.div
                    className="space-y-2 md:space-y-3 overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {services.map((service, index) => (
                      <ServiceItem 
                        key={service.title} 
                        service={service} 
                        index={index} 
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section - Content Left, Image Right */}
      <section className="py-8 md:py-12 lg:py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="overflow-hidden"
          >
            <div className="space-y-8 md:space-y-12 lg:space-y-16 overflow-hidden">
              <motion.div
                className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center overflow-hidden"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Content on Left */}
                <motion.div
                  className="space-y-4 md:space-y-6 overflow-hidden order-2 lg:order-1"
                  initial="hidden"
                  whileInView="visible"
                  variants={slideInLeft}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="overflow-hidden">
                    <motion.h3
                      className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      Why Choose Digitallink Bahrain
                    </motion.h3>
                    <motion.p
                      className="text-sm md:text-base lg:text-lg text-gray-600"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      At Digitallink, we pride ourselves on delivering exceptional elevator solutions that combine innovation, safety, and reliability.
                    </motion.p>
                  </div>

                  <motion.div
                    className="space-y-2 md:space-y-3 overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {whyChooseItems.map((item, index) => (
                      <WhyChooseItem 
                        key={item.title} 
                        item={item} 
                        index={index} 
                      />
                    ))}
                  </motion.div>
                </motion.div>

                {/* Image on Right */}
                <motion.div
                  className="overflow-hidden order-1 lg:order-2"
                  initial="hidden"
                  whileInView="visible"
                  variants={slideInRight}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    {/* Desktop Image */}
                    <div className="hidden md:block w-full h-48 md:h-64 lg:h-80 relative">
                      <Image 
                        src={rightimage}
                        alt="Why Choose Digitallink"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority
                        placeholder="blur"
                      />
                    </div>
                    
                    {/* Mobile Image */}
                    <div className="md:hidden w-full h-48 relative">
                      <Image 
                        src={mobilerightimage}
                        alt="Why Choose Digitallink"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                        placeholder="blur"
                      />
                    </div>
                    {/* Overlay gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
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

      {/* FAQ Section */}
      <SolutionFAQ />

      {/* Sticky Contact Bar */}
      <StickyContactBar />
    </>
  );
}