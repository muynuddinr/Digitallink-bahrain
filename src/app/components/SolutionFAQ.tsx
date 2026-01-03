import { memo, useState, useCallback, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { FaQuestionCircle, FaPlus, FaMinus, FaCheck } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const SolutionFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Memoized FAQ data
  const faqs: FAQItem[] = useMemo(() => [
    {
      question: 'What types of CCTV systems do you offer?',
      answer: 'We offer a variety of CCTV systems including analog, digital, IP, wireless CCTV cameras, as well as NVR and DVR systems.'
    },
    {
      question: 'What are your specialties in IT and AI?',
      answer: 'We specialize in IT solutions, web development, and SEO services to help businesses grow and succeed in the digital landscape.'
    },
    {
      question: 'Which monitoring system brands do you offer?',
      answer: 'We provide monitoring system brands such as UNV, Hikvision, Dahua, and other leading manufacturers in the security industry.'
    },
    {
      question: 'Do you provide technical support?',
      answer: 'Yes, we offer comprehensive technical support for all our products and solutions to ensure they function optimally.'
    },
    {
      question: 'Do you offer discounts for bulk purchases?',
      answer: 'Yes, we provide discounts for bulk orders. Please contact our sales team for more information on volume pricing.'
    },
    {
      question: 'How can I place an order?',
      answer: 'You can place orders through our website, via email, or by calling our sales team directly. We offer multiple convenient ordering options.'
    }
  ], []);

  // Optimized toggle function
  const toggleFAQ = useCallback((index: number) => {
    setActiveIndex(current => current === index ? null : index);
  }, []);

  // Animation variants with proper TypeScript types
  const headerVariants: Variants = {
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

  const decorativeLineVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: { 
      scaleY: 1,
      originY: "top" as const
    }
  };

  const iconContainerVariants: Variants = {
    hover: { 
      scale: 1.1,
      transition: { 
        type: "spring" as const, 
        stiffness: 300 
      }
    },
    activeHover: {
      scale: 1.15,
      transition: { 
        type: "spring" as const, 
        stiffness: 300 
      }
    }
  };

  const answerVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0 
    }
  };

  const checkMarkVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1 
    }
  };

  // Single return statement
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* FAQ Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 bg-clip-text text-transparent mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={headerVariants}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            className="text-gray-700 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={headerVariants}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            Find answers to common questions about our solutions
          </motion.p>
        </div>
        
        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.25, 0.4, 0.25, 1]
                }}
                variants={fadeInUp}
                className="mb-6"
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
                  {/* Decorative elements */}
                  <motion.div 
                    className={`absolute top-0 left-0 w-1 h-full ${
                      isActive 
                        ? 'bg-gradient-to-b from-blue-900 to-blue-600' 
                        : 'bg-transparent'
                    }`}
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                    variants={decorativeLineVariants}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  
                  <motion.button
                    className="flex justify-between items-center w-full p-6 text-left focus:outline-none relative z-10"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isActive}
                    aria-controls={`faq-answer-${index}`}
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
                        whileHover={isActive ? "activeHover" : "hover"}
                        variants={iconContainerVariants}
                        transition={{ 
                          duration: 0.5, 
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        <FaQuestionCircle className="text-xl" />
                      </motion.div>
                      <span className={`text-lg font-medium ${
                        isActive ? 'text-blue-900' : 'text-gray-800'
                      }`}>
                        {faq.question}
                      </span>
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
                      whileHover="hover"
                      variants={iconContainerVariants}
                      transition={{ duration: 0.3 }}
                    >
                      {isActive ? (
                        <FaMinus className="text-sm" />
                      ) : (
                        <FaPlus className="text-sm" />
                      )}
                    </motion.div>
                  </motion.button>
                  
                  <motion.div
                    id={`faq-answer-${index}`}
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
                        initial="hidden"
                        animate={isActive ? "visible" : "hidden"}
                        variants={answerVariants}
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
                          initial="hidden"
                          animate="visible"
                          variants={checkMarkVariants}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(SolutionFAQ);