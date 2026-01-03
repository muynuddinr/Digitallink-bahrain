'use client';

import { memo, useState, useMemo, useCallback } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  FaLaptopCode, FaMobileAlt, FaChartLine, FaPaintBrush, FaShoppingCart, 
  FaSearch, FaArrowRight, FaUsers, FaCogs, FaBullhorn, FaShieldAlt, 
  FaQuoteLeft, FaQuestionCircle, FaCheck, FaLightbulb, FaRocket, 
  FaHandshake, FaChevronDown, FaPlus, FaMinus 
} from 'react-icons/fa';
import Link from 'next/link';
import type { ReactElement } from 'react';

import PageHeader from '../components/PageHeader';

// Types
interface Solution {
  readonly icon: ReactElement;
  readonly title: string;
  readonly description: string;
  readonly features: readonly string[];
}

interface ProcessStep {
  readonly icon: ReactElement;
  readonly title: string;
  readonly description: string;
}

interface Testimonial {
  readonly name: string;
  readonly role: string;
  readonly company: string;
  readonly content: string;
}

interface FAQItem {
  readonly question: string;
  readonly answer: string;
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

// Memoized components
const SolutionCard = memo(({ 
  solution, 
  index 
}: { 
  solution: Solution; 
  index: number;
}) => (
  <motion.div
    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100"
    variants={scaleIn}
    whileHover={{ 
      y: -10,
      transition: { duration: 0.3 }
    }}
  >
    <div className="p-8">
      <motion.div 
        className="mb-6 flex justify-center"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white shadow-lg shadow-blue-900/50">
          {solution.icon}
        </div>
      </motion.div>
      <h3 className="text-xl font-bold mb-4 text-center text-blue-900">{solution.title}</h3>
      <p className="text-gray-700 mb-6 text-center">{solution.description}</p>
      <ul className="space-y-3 mb-8">
        {solution.features.map((feature, idx) => (
          <motion.li 
            key={feature} 
            className="flex items-center"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1 * idx }}
          >
            <div className="w-2 h-2 rounded-full mr-3 bg-blue-900"></div>
            <span className="text-gray-600">{feature}</span>
          </motion.li>
        ))}
      </ul>
      <div className="text-center">
        <Link 
          href="/contact" 
          className="text-blue-900 font-medium inline-flex items-center group hover:opacity-80 transition-opacity"
          prefetch={false}
        >
          Learn more 
          <FaArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  </motion.div>
));

SolutionCard.displayName = 'SolutionCard';

const ProcessStepCard = memo(({ 
  step, 
  index 
}: { 
  step: ProcessStep; 
  index: number;
}) => (
  <motion.div
    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center"
    variants={fadeInUp}
    whileHover={{ 
      y: -10,
      transition: { duration: 0.3 }
    }}
  >
    <motion.div 
      className="mb-6 flex justify-center"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white shadow-lg relative">
        {step.icon}
        <motion.div 
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
        >
          {index + 1}
        </motion.div>
      </div>
    </motion.div>
    <h3 className="text-xl font-bold mb-3 text-blue-900">{step.title}</h3>
    <p className="text-gray-700">{step.description}</p>
  </motion.div>
));

ProcessStepCard.displayName = 'ProcessStepCard';

const FAQItem = memo(({ 
  faq, 
  index, 
  isActive, 
  onToggle 
}: { 
  faq: FAQItem; 
  index: number;
  isActive: boolean;
  onToggle: () => void;
}) => (
  <motion.div
    key={index}
    className="mb-6"
    variants={fadeInUp}
  >
    <motion.div
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 shadow-xl' 
          : 'bg-white shadow-md hover:shadow-lg'
      }`}
      whileHover={{ 
        y: isActive ? 0 : -3,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div 
        className={`absolute top-0 left-0 w-1 h-full ${
          isActive 
            ? 'bg-gradient-to-b from-blue-900 to-blue-600' 
            : 'bg-transparent'
        }`}
        initial={{ scaleY: 0 }}
        whileInView={{ 
          scaleY: isActive ? 1 : 0,
          originY: "top"
        }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      
      <motion.button
        className="flex justify-between items-center w-full p-6 text-left focus:outline-none relative z-10"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <motion.div
            className={`mr-4 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              isActive 
                ? 'bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-500'
            }`}
            animate={{ 
              rotate: isActive ? 360 : 0,
              scale: isActive ? 1.1 : 1
            }}
            transition={{ 
              duration: 0.5, 
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ 
              scale: isActive ? 1.15 : 1.05,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <FaQuestionCircle className="text-xl" />
          </motion.div>
          <span className={`text-lg font-medium ${
            isActive ? 'text-blue-900' : 'text-gray-800'
          }`}>{faq.question}</span>
        </div>
        
        <motion.div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isActive 
              ? 'bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white shadow-md' 
              : 'bg-gray-100 text-gray-500'
          }`}
          animate={{ 
            rotate: isActive ? 180 : 0,
          }}
          transition={{ duration: 0.3 }}
          whileHover={{ 
            scale: 1.1,
            transition: { type: "spring", stiffness: 300 }
          }}
        >
          {isActive ? (
            <FaMinus className="text-sm" />
          ) : (
            <FaPlus className="text-sm" />
          )}
        </motion.div>
      </motion.button>
      
      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{ 
          height: isActive ? 'auto' : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ 
          duration: 0.4,
          ease: [0.25, 0.4, 0.25, 1]
        }}
      >
        <div className="p-6 pt-0 px-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ 
              opacity: isActive ? 1 : 0, 
              y: isActive ? 0 : 10 
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              delay: isActive ? 0.1 : 0,
              duration: 0.3
            }}
            className="text-gray-700"
          >
            {faq.answer}
          </motion.div>
          
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                delay: 0.2,
                type: "spring",
                stiffness: 200
              }}
              className="mt-4 flex items-center text-green-600 font-medium"
            >
              <FaCheck className="mr-2" />
              <span>Answer provided</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  </motion.div>
));

FAQItem.displayName = 'FAQItem';

const TrustedIcon = memo(({ 
  icon: Icon, 
  bgColor 
}: { 
  icon: typeof FaUsers; 
  bgColor: string;
}) => (
  <motion.div 
    className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center border-2 border-white`}
    whileHover={{ scale: 1.2 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Icon className="text-blue-200" />
  </motion.div>
));

TrustedIcon.displayName = 'TrustedIcon';

export default function Solutions() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Memoized event handlers
  const toggleFAQ = useCallback((index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  }, [activeIndex]);

  // Memoized data
  const solutions = useMemo<Solution[]>(() => [
    {
      icon: <FaLaptopCode className="text-3xl" />,
      title: 'IT & AI Solutions',
      description: 'Custom marketing ensuring real measurable ROI through advanced technology and AI-driven strategies.',
      features: ['Custom Development', 'AI Integration', 'Data Analytics', 'Process Automation']
    },
    {
      icon: <FaCogs className="text-3xl" />,
      title: 'System Integrations',
      description: 'Optimizing search results to attract new customers and retain existing ones through seamless integrations.',
      features: ['API Development', 'Workflow Automation', 'Data Migration', 'Legacy System Modernization']
    },
    {
      icon: <FaBullhorn className="text-3xl" />,
      title: 'Audio & Visual Solutions',
      description: 'Reaching your target audience directly through personalized multimedia experiences.',
      features: ['Video Production', 'Podcast Creation', 'Interactive Media', 'Brand Storytelling']
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: 'Surveillance Solutions',
      description: 'Custom security solutions ensuring real measurable ROI through advanced monitoring systems.',
      features: ['24/7 Monitoring', 'Threat Detection', 'Access Control', 'Security Analytics']
    }
  ], []);

  const processSteps = useMemo<ProcessStep[]>(() => [
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: 'Discovery',
      description: 'We analyze your business needs and challenges to develop a tailored strategy.'
    },
    {
      icon: <FaRocket className="text-3xl" />,
      title: 'Implementation',
      description: 'Our team executes the plan with precision using cutting-edge technology.'
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: 'Optimization',
      description: 'We continuously refine solutions to maximize performance and ROI.'
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: 'Support',
      description: 'Ongoing assistance ensures your solutions evolve with your business.'
    }
  ], []);

  const testimonials = useMemo<Testimonial[]>(() => [
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      company: 'Tech Innovations Inc.',
      content: 'The AI solutions implemented by this team transformed our operations, resulting in a 40% increase in efficiency.'
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Director',
      company: 'Global Retail Group',
      content: 'Their audio-visual solutions helped us create a brand identity that resonates with our target audience.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Security Manager',
      company: 'SecureBank Ltd.',
      content: 'The surveillance system they designed gives us peace of mind with its advanced threat detection capabilities.'
    }
  ], []);

  const faqs = useMemo<FAQItem[]>(() => [
    {
      question: 'How long does implementation typically take?',
      answer: 'Implementation timelines vary based on project complexity, but most solutions are deployed within 4-12 weeks.'
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, we offer comprehensive support packages including 24/7 monitoring, regular updates, and dedicated account managers.'
    },
    {
      question: 'Can your solutions integrate with existing systems?',
      answer: 'Absolutely. Our solutions are designed for seamless integration with your current infrastructure and legacy systems.'
    },
    {
      question: 'What industries do you specialize in?',
      answer: 'We have expertise across multiple industries including finance, healthcare, retail, manufacturing, and technology.'
    }
  ], []);

  // Data for PageHeader component
  const headerSlides = useMemo(() => [
    { 
      title: "Our Comprehensive Solutions", 
      subtitle: "Complete technology solutions tailored for every industry and business need",
      headingPart1: "Discover Our",
      headingPart2: "Complete Solutions"
    }
  ], []);

  const headerBenefits = useMemo(() => [
    "Custom AI-driven strategies",
    "Seamless system integrations",
    "Advanced security solutions",
    "Multimedia brand experiences"
  ], []);

  const headerFeatures = useMemo(() => [
    { 
      icon: FaLaptopCode, 
      title: 'IT & AI Solutions', 
      desc: 'AI-driven' 
    },
    { 
      icon: FaCogs, 
      title: 'System Integrations', 
      desc: 'Seamless connections' 
    },
    { 
      icon: FaBullhorn, 
      title: 'Audio & Visual Solutions', 
      desc: 'Immersive media' 
    },
    { 
      icon: FaShieldAlt, 
      title: 'Surveillance Solutions', 
      desc: 'Advanced security' 
    }
  ], []);

  // Memoized trusted icons data
  const trustedIcons = useMemo(() => [
    { icon: FaUsers, bgColor: 'bg-blue-800' },
    { icon: FaCogs, bgColor: 'bg-blue-700' },
    { icon: FaChartLine, bgColor: 'bg-blue-600' }
  ], []);

  return (
    <>
      {/* Page Header Component */}
      <PageHeader 
        slides={headerSlides}
        benefits={headerBenefits}
        features={headerFeatures}
        ctaText="Learn More"
        ctaIcon={FaArrowRight}
      />

      {/* Solutions Content */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Subtitle Section */}
          <div className="text-center mb-20">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              We Lead With <span className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 bg-clip-text text-transparent">Customer-First</span> Strategies
            </motion.h1>
            <motion.p 
              className="text-gray-700 max-w-3xl mx-auto text-xl"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2 }}
            >
              Driving growth through personalized experiences for truly end-to-end business building
            </motion.p>
          </div>

          {/* Solutions Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {solutions.map((solution, index) => (
              <SolutionCard 
                key={solution.title}
                solution={solution}
                index={index}
              />
            ))}
          </motion.div>

          {/* Process Flow Section */}
          <div className="mb-24">
            <motion.div 
              className="text-center mb-16"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Solution Process</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">A streamlined approach to delivering exceptional results for your business</p>
            </motion.div>
            
            <div className="relative">
              {/* Process line for desktop */}
              <motion.div 
                className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 to-blue-600 z-0"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {processSteps.map((step, index) => (
                  <ProcessStepCard 
                    key={step.title}
                    step={step}
                    index={index}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-24">
            <motion.div 
              className="text-center mb-16"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">Find answers to common questions about our solutions</p>
            </motion.div>
            
            <motion.div 
              className="max-w-3xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {faqs.map((faq, index) => (
                <FAQItem 
                  key={faq.question}
                  faq={faq}
                  index={index}
                  isActive={activeIndex === index}
                  onToggle={() => toggleFAQ(index)}
                />
              ))}
            </motion.div>
          </div>

          {/* Commitment Section */}
          <motion.div 
            className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl overflow-hidden"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                className="md:w-2/3 mb-8 md:mb-0 pr-0 md:pr-8"
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className="text-3xl font-bold mb-4">We Are Committed To Your Strategy</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Our team is dedicated to understanding your unique business challenges and crafting tailored solutions that drive measurable results. We combine industry expertise with innovative technology to help you achieve your strategic goals.
                </p>
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="flex -space-x-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.5 }}
                  >
                    {trustedIcons.map((item, index) => (
                      <TrustedIcon 
                        key={index}
                        icon={item.icon}
                        bgColor={item.bgColor}
                      />
                    ))}
                  </motion.div>
                  <span className="text-blue-100">Trusted by industry leaders</span>
                </div>
              </motion.div>
              <motion.div 
                className="md:w-1/3 md:text-right"
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <Link
                  href="/about"
                  className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transition-all duration-300 inline-flex items-center shadow-lg group"
                  prefetch={false}
                >
                  More About Our Company 
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}