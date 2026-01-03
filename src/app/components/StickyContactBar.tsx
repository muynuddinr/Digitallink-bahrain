// components/StickyContactBar.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaPhone } from 'react-icons/fa';
import Link from 'next/link';

interface StickyContactBarProps {
  phoneNumber?: string;
  contactLink?: string;
  message?: string;
}

export default function StickyContactBar({
  phoneNumber = "+1234567890",
  contactLink = "/contact",
  message = "Need assistance? Our experts are ready to help you"
}: StickyContactBarProps) {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      className={`fixed bottom-0 left-0 right-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-3 px-4 z-50 shadow-lg ${scrolled ? 'flex' : 'hidden'}`}
      initial={{ y: 100 }}
      animate={{ y: scrolled ? 0 : 100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center w-full">
        <div className="mb-2 sm:mb-0">
          <span className="font-bold">{message}</span>
        </div>
        <div className="flex space-x-3">
          <Link
            href={contactLink}
            className="bg-white text-blue-900 hover:bg-gray-100 px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 inline-flex items-center shadow-md"
          >
            Get a Quote
          </Link>
          <Link
            href={`tel:${phoneNumber}`}
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 inline-flex items-center"
          >
            <FaPhone className="mr-1" />
            Call Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}