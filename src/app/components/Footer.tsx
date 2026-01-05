'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope
} from 'react-icons/fa';
import { FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/newsletter-enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const aboutLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/team', label: 'Our Team' },
    { href: '/mission', label: 'Mission & Vision' },
    { href: '/values', label: 'Our Values' },
  ];

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const services = [
    { href: '/services/web', label: 'Web Development' },
    { href: '/services/mobile', label: 'Mobile Apps' },
    { href: '/services/cloud', label: 'Cloud Solutions' },
    { href: '/services/marketing', label: 'Digital Marketing' },
  ];

  const contactInfo = [
    { href: '/contact', label: 'Get in Touch' },
    { href: '/quote', label: 'Get a Quote' },
    { href: '/support', label: 'Support' },
    { href: '/consultation', label: 'Free Consultation' },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, href: 'https://www.facebook.com/', label: 'Facebook', color: 'hover:bg-blue-600 hover:text-white' },
    { icon: <FaXTwitter />, href: 'https://x.com/', label: 'X', color: 'hover:bg-gray-900 hover:text-white' },
    { icon: <FaInstagram />, href: 'https://www.instagram.com/', label: 'Instagram', color: 'hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:text-white' },
    { icon: <FaWhatsapp />, href: 'https://wa.me/+971552929644', label: 'WhatsApp', color: 'hover:bg-green-500 hover:text-white' },
  ];

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <footer className="relative bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 text-gray-800 overflow-hidden">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Loading skeleton */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="col-span-12 lg:col-span-3 animate-pulse">
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-300 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 text-gray-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-800/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 -left-20 w-96 h-96 rounded-full bg-blue-900/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        {/* Decorative dots pattern */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-800 rounded-full"
              style={{
                left: `${(i % 6) * 20}%`,
                top: `${Math.floor(i / 6) * 20}%`,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Footer Content - FIXED: Better responsive padding */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* About - FIXED: Better spacing without affecting other devices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-12 md:col-span-6 lg:col-span-3"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50">
                <span className="text-white font-bold text-xl">DL</span>
              </div>
              <span className="text-xl font-bold">Digital Link</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Transforming businesses through innovative digital solutions. Your trusted partner in the digital age, 
              delivering cutting-edge web development, mobile applications, and cloud solutions.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={`w-11 h-11 rounded-full bg-gray-200/80 backdrop-blur-sm border border-gray-300/50 flex items-center justify-center text-gray-600 ${social.color} hover:border-transparent transition-all duration-300`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links - FIXED: Consistent spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-6 sm:col-span-3 md:col-span-3 lg:col-span-2"
          >
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center group"
                  >
                    <motion.span
                      className="w-0 group-hover:w-6 h-0.5 bg-gradient-to-r from-blue-900 to-blue-800 mr-0 group-hover:mr-2 transition-all duration-300"
                    />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services - FIXED: Consistent spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-6 sm:col-span-3 md:col-span-3 lg:col-span-2"
          >
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center group"
                  >
                    <motion.span
                      className="w-0 group-hover:w-6 h-0.5 bg-gradient-to-r from-blue-900 to-blue-800 mr-0 group-hover:mr-2 transition-all duration-300"
                    />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Us - FIXED: Better responsive behavior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-2"
          >
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <motion.li 
                className="flex items-start group"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="mr-4 mt-1 w-8 h-8 bg-gradient-to-br from-blue-900/20 to-blue-800/20 backdrop-blur-sm rounded-xl border border-gray-300/50 flex items-center justify-center group-hover:border-blue-800 transition-all duration-300">
                  <FaMapMarkerAlt className="text-blue-800 text-sm" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 mb-1">Location</h4>
                  <p className="text-gray-600 text-sm">Manama, Bahrain</p>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-start group"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="mr-4 mt-1 w-8 h-8 bg-gradient-to-br from-blue-900/20 to-blue-800/20 backdrop-blur-sm rounded-xl border border-gray-300/50 flex items-center justify-center group-hover:border-blue-800 transition-all duration-300">
                  <FaPhone className="text-blue-800 text-sm" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                  <a href="tel:+97312345678" className="text-gray-600 text-sm hover:text-blue-800 transition-colors">
                    +973 1234 5678
                  </a>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-start group"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="mr-4 mt-1 w-8 h-8 bg-gradient-to-br from-blue-900/20 to-blue-800/20 backdrop-blur-sm rounded-xl border border-gray-300/50 flex items-center justify-center group-hover:border-blue-800 transition-all duration-300">
                  <FaEnvelope className="text-blue-800 text-sm" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                  <a href="mailto:info@digitallink.bh" className="text-gray-600 text-sm hover:text-blue-800 transition-colors break-all">
                    info@digitallink.bh
                  </a>
                </div>
              </motion.li>
            </ul>
          </motion.div>

          {/* Newsletter - FIXED: Better responsive width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-3"
          >
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent">
              Newsletter
            </h3>
            <p className="text-gray-600 mb-4">
              Stay updated with our latest news and offers. Subscribe to our newsletter.
            </p>
            <div className="space-y-4">
              <form onSubmit={handleNewsletterSubmit}>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-300/50 rounded-lg text-gray-800 placeholder-gray-500/50 focus:outline-none focus:border-blue-800 transition-all"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50 hover:shadow-xl hover:shadow-blue-900/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  {!isSubmitting && (
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  )}
                </motion.button>
              </form>
              {submitStatus === 'success' && (
                <p className="text-green-600 text-sm mt-2">
                  ✅ Successfully subscribed to our newsletter!
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 text-sm mt-2">
                  ❌ Failed to subscribe. Please try again.
                </p>
              )}
            </div>
            <p className="text-gray-500 text-xs mt-3">
              Get the latest updates on digital trends, exclusive offers, and expert insights delivered to your inbox.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar - FIXED: Better responsive padding */}
      <div className="relative z-10 border-t border-gray-300/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-500 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Digital Link Bahrain. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-blue-800 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-blue-800 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-blue-800 transition-colors">
                Cookies
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}