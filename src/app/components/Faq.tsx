'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

// Constants outside component
const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: "What types of CCTV systems do you offer?",
    answer: "We offer a comprehensive range of CCTV systems including IP cameras, analog cameras, wireless systems, PTZ (Pan-Tilt-Zoom) cameras, thermal cameras, and specialized solutions for various environments.",
    category: "products"
  },
  {
    id: 2,
    question: "What do we specialize in IT and AI?",
    answer: "Our specialization includes intelligent surveillance solutions with facial recognition, object detection, behavioral analysis, predictive maintenance, IT infrastructure support, and custom AI applications.",
    category: "technology"
  },
  {
    id: 3,
    question: "What Surveillance system brands do you offer?",
    answer: "We partner with leading brands including Hikvision, Dahua, Axis Communications, Bosch, Hanwha Techwin, and Avigilon for high-quality surveillance solutions.",
    category: "products"
  },
  {
    id: 4,
    question: "Do you provide installation services?",
    answer: "Yes, we provide professional installation services with certified technicians ensuring proper setup, configuration, and testing for optimal performance.",
    category: "services"
  },
  {
    id: 5,
    question: "What kind of support do you offer after installation?",
    answer: "We offer 24/7 technical assistance, maintenance checks, software updates, and remote troubleshooting for all our surveillance systems.",
    category: "services"
  }
];

const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Questions' },
  { id: 'products', name: 'Products' },
  { id: 'technology', name: 'Technology' },
  { id: 'services', name: 'Services' }
];

// Animation variants outside component
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.4, 0.25, 1] 
    }
  }
};

const slideInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.4, 0.25, 1] 
    }
  }
};

const itemAnimation: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

const FAQComponent: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Memoized event handlers
  const toggleFAQ = useCallback((index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  }, [activeIndex]);

  const handleFilterChange = useCallback((categoryId: string) => {
    setFilter(categoryId);
  }, []);

  // Memoized filtered items
  const filteredItems = useMemo(() => 
    filter === 'all' 
      ? FAQ_ITEMS 
      : FAQ_ITEMS.filter(item => item.category === filter),
    [filter]
  );

  // Memoized category buttons
  const categoryButtons = useMemo(() => (
    CATEGORIES.map((category, index) => (
      <motion.button
        key={category.id}
        variants={itemAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.15,
          ease: [0.25, 0.4, 0.25, 1]
        }}
        onClick={() => handleFilterChange(category.id)}
        className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
          filter === category.id 
            ? 'text-white' 
            : 'text-gray-600 hover:text-blue-900'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Background animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800"
          initial={{ x: '-100%' }}
          animate={{ 
            x: filter === category.id ? '0%' : '-100%'
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        />
        
        {/* Border */}
        <div className={`absolute inset-0 border-2 transition-colors duration-300 rounded-full ${
          filter === category.id 
            ? 'border-blue-900' 
            : 'border-gray-200'
        }`} />
        
        <span className="relative z-10">{category.name}</span>
      </motion.button>
    ))
  ), [filter, handleFilterChange]);

  // Memoized FAQ items
  const faqItems = useMemo(() => (
    filteredItems.map((faq, index) => (
      <motion.div 
        key={faq.id} 
        className="mb-6"
        variants={itemAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ 
          duration: 0.7,
          delay: index * 0.15,
          ease: [0.25, 0.4, 0.25, 1]
        }}
      >
        <motion.div
          className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
            activeIndex === index 
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 shadow-xl' 
              : 'bg-white shadow-md hover:shadow-lg'
          }`}
          whileHover={{ 
            y: activeIndex === index ? 0 : -3,
            transition: { duration: 0.2 }
          }}
        >
          {/* Decorative elements */}
          <motion.div 
            className={`absolute top-0 left-0 w-1 h-full ${
              activeIndex === index 
                ? 'bg-gradient-to-b from-blue-900 to-blue-600' 
                : 'bg-transparent'
            }`}
            initial={{ scaleY: 0 }}
            animate={{ 
              scaleY: activeIndex === index ? 1 : 0,
              originY: "top"
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          
          <motion.button
            className="flex justify-between items-center w-full p-6 text-left focus:outline-none relative z-10"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex items-center">
              {/* Removed number circle - just showing the question directly */}
              <div>
                <span className={`text-lg font-medium ${
                  activeIndex === index ? 'text-blue-900' : 'text-gray-800'
                }`}>{faq.question}</span>
              </div>
            </div>
            
            <motion.div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                activeIndex === index 
                  ? 'bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-500'
              }`}
              animate={{ 
                rotate: activeIndex === index ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
              whileHover={{ 
                scale: 1.1,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              {activeIndex === index ? (
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
              height: activeIndex === index ? 'auto' : 0,
              opacity: activeIndex === index ? 1 : 0,
            }}
            transition={{ 
              duration: 0.4,
              ease: [0.25, 0.4, 0.25, 1]
            }}
          >
            <div className="p-6 pt-0 px-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: activeIndex === index ? 1 : 0, 
                  y: activeIndex === index ? 0 : 10 
                }}
                transition={{ 
                  delay: activeIndex === index ? 0.1 : 0,
                  duration: 0.3
                }}
                className="text-gray-700"
              >
                {faq.answer}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    ))
  ), [filteredItems, activeIndex, toggleFAQ]);

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* FAQ Section Header */}
        <div className="text-center mb-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">Find answers to common questions about our solutions</p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={slideInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {categoryButtons}
        </motion.div>
        
        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          {faqItems}
        </div>
      </div>
    </div>
  );
};

export default FAQComponent;