'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { 
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane, 
  FaArrowRight, FaBuilding, FaGlobe, FaHeadset, FaFacebook, 
  FaInstagram, FaLinkedin, FaWhatsapp 
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Contactus from '../../assets/remaining/Contactus.jpg';
import mobileBanner from '../../assets/remaining/ContactMobile.jpg';

interface ContactInfo {
  icon: React.ReactElement;
  title: string;
  details: string;
  link?: string;
}

interface SocialLink {
  icon: React.ReactElement;
  url: string;
  name: string;
  color: string;
}

// Constants outside component
const CONTACT_INFO: ContactInfo[] = [
  {
    icon: <FaMapMarkerAlt className="text-3xl" />,
    title: 'Our Location',
    details: 'Manama, Bahrain',
    link: 'https://maps.google.com'
  },
  {
    icon: <FaPhone className="text-3xl" />,
    title: 'Phone Number',
    details: '+973 1234 5678',
    link: 'tel:+97312345678'
  },
  {
    icon: <FaEnvelope className="text-3xl" />,
    title: 'Email Address',
    details: 'info@digitallink.bh',
    link: 'mailto:info@digitallink.bh'
  },
  {
    icon: <FaClock className="text-3xl" />,
    title: 'Working Hours',
    details: 'Mon-Fri: 9am-6pm'
  }
];

const SOCIAL_LINKS: SocialLink[] = [
  { icon: <FaFacebook className="text-xl" />, url: '#', name: 'Facebook', color: 'bg-[#1877F2]' },
  { icon: <FaXTwitter className="text-xl" />, url: '#', name: 'X', color: 'bg-black' },
  { icon: <FaInstagram className="text-xl" />, url: '#', name: 'Instagram', color: 'bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af]' },
  { icon: <FaLinkedin className="text-xl" />, url: '#', name: 'LinkedIn', color: 'bg-[#0A66C2]' },
  { icon: <FaWhatsapp className="text-xl" />, url: '#', name: 'WhatsApp', color: 'bg-[#25D366]' }
];






const INFO_CARDS = [
  {
    icon: FaBuilding,
    title: "Our Offices",
    description: "With offices in Manama, we serve clients across Bahrain and the GCC region."
  },
  {
    icon: FaGlobe,
    title: "Global Reach",
    description: "Our solutions are designed to scale with your business, wherever you operate."
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    description: "Our dedicated team is always ready to assist you with any questions or issues."
  }
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Hero section scroll effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 150]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/auth/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Memoized social links
  const socialLinks = useMemo(() => (
    SOCIAL_LINKS.map((social, index) => (
      <motion.a
        key={index}
        href={social.url}
        aria-label={social.name}
        className={`w-12 h-12 rounded-full ${social.color} text-white flex items-center justify-center shadow-md`}
        variants={scaleIn}
        whileHover={{ 
          y: -5,
          transition: { type: "spring", stiffness: 300 }
        }}
      >
        {social.icon}
      </motion.a>
    ))
  ), []);

  // Memoized contact info items
  const contactInfoItems = useMemo(() => (
    CONTACT_INFO.map((info, index) => (
      <motion.div
        key={index}
        className="flex items-start"
        variants={fadeInUp}
        whileHover={{ x: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="mr-5 mt-1 w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          {info.icon}
        </div>
        <div>
          <h3 className="font-bold text-lg">{info.title}</h3>
          {info.link ? (
            <a 
              href={info.link} 
              className="text-blue-100 hover:text-white transition-colors duration-300"
            >
              {info.details}
            </a>
          ) : (
            <p className="text-blue-100">{info.details}</p>
          )}
        </div>
      </motion.div>
    ))
  ), []);

  // Memoized info cards
  const infoCards = useMemo(() => (
    INFO_CARDS.map((card, index) => (
      <motion.div
        key={index}
        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center"
        variants={scaleIn}
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
          <card.icon className="text-blue-800 text-2xl" />
        </div>
        <h3 className="text-xl font-bold text-blue-900 mb-4">{card.title}</h3>
        <p className="text-gray-600">{card.description}</p>
      </motion.div>
    ))
  ), []);

  if (!isMounted) {
    return (
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white min-h-screen overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <form className="space-y-4">
            <div className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-32 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Page Hero section */}
      <div className="relative h-[35vh] sm:h-[45vh] md:h-[60vh] lg:h-[60vh] bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 overflow-hidden hero-banner">
        <motion.div className="absolute inset-0" style={{ y }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
          <div className="w-full h-full bg-gradient-to-br from-blue-600/40 to-indigo-800/40 opacity-60"></div>
          {/* Desktop Image */}
          <Image
            src={Contactus}
            alt="Solutions background"
            fill
            className="object-cover opacity-30 hidden sm:block"
            sizes="100vw"
            priority
          />
          {/* Mobile Image */}
          <Image
            src={mobileBanner}
            alt="Building background"
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
              Contact{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Us
              </span>
            </motion.h1>
            <motion.p
              variants={subtitleVariants}
              className="text-xl sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
            >
              Reach out to Digital Link for all your product inquiries,
              assistance, and support. Contact us via email, phone, or visit our
              office in Bahrain.
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

      {/* Contact Content */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white min-h-screen overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Form */}
            <motion.div 
              className="space-y-8"
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Contact Form Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
                <div className="flex items-center mb-8">
                  <motion.div 
                    className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white shadow-lg mr-5"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FaPaperPlane className="text-xl" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-blue-900">Send Us a Message</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block mb-2 font-medium text-gray-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                      required
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <FaPaperPlane className="ml-2" />
                      </>
                    )}
                  </button>
                  
                  {submitStatus === 'success' && (
                    <motion.div 
                      className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Your message has been sent successfully! We'll get back to you soon.
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div 
                      className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      An error occurred. Please try again later.
                    </motion.div>
                  )}
                </form>
              </div>

              {/* Social Media Section */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-blue-900 mb-6">Connect With Us</h3>
                <p className="text-gray-600 mb-6">Follow us on social media for updates and insights</p>
                
                <motion.div 
                  className="flex flex-wrap gap-4"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {socialLinks}
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Map and Contact Info */}
            <motion.div 
              className="space-y-8"
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Map Section */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-blue-900">Our Location</h2>
                </div>
                <div className="h-80 relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.6151309753886!2d77.56900557484181!3d12.996450387321195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17dd1d2920d9%3A0xf9161994ff8c9f5d!2sQatar%2C%20Uae%2C%20Kuwait%2C%20Bahrain%20Embassy%20Attestation%20services%20in%20Bangalore!5e0!3m2!1sen!2sin!4v1761203625483!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map showing our location"
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <a 
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-900 font-medium hover:text-blue-700 transition-colors"
                  >
                    View on Google Maps <FaArrowRight className="ml-2 text-sm" />
                  </a>
                </div>
              </div>

              {/* Contact Information Card */}
              <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center mb-8">
                  <motion.div 
                    className="w-14 h-14 rounded-full flex items-center justify-center bg-white bg-opacity-20 mr-5"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FaHeadset className="text-xl" />
                  </motion.div>
                  <h2 className="text-2xl font-bold">Get In Touch</h2>
                </div>
                <p className="mb-8 text-blue-100">
                  We're here to help and answer any question you might have. We look forward to hearing from you.
                </p>
                
                <motion.div 
                  className="space-y-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {contactInfoItems}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Additional Info Cards */}
          <motion.div 
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {infoCards}
          </motion.div>

          {/* CTA Section */}
          {/* <motion.div 
            className="mt-24 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl overflow-hidden"
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
                <h3 className="text-3xl font-bold mb-4">Ready To Transform Your Business?</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Let's discuss how our solutions can help you achieve your business goals. Our team is ready to assist you.
                </p>
              </motion.div>
              <motion.div 
                className="md:w-1/3 md:text-right"
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <a
                  href="#contact-form"
                  className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transition-all duration-300 inline-flex items-center shadow-lg group"
                >
                  Start Your Project 
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </motion.div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </>
  );
}