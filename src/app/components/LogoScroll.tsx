'use client'
import React from 'react';
import Image from 'next/image';
import logo1 from '../../../public/images/logos/white-Logos-01.svg';
import logo2 from '../../../public/images/logos/white-Logos-02.svg';
import logo3 from '../../../public/images/logos/white-Logos-03.svg';
import logo4 from '../../../public/images/logos/white-Logos-04.svg';
import logo5 from '../../../public/images/logos/white-Logos-05.svg';
import logo6 from '../../../public/images/logos/white-Logos-06.svg';
import logo7 from '../../../public/images/logos/white-Logos-07.svg';
import logo8 from '../../../public/images/logos/white-Logos-08.svg';
import logo9 from '../../../public/images/logos/white-Logos-09.svg';
import logo10 from '../../../public/images/logos/white-Logos-10.svg';
import logo11 from '../../../public/images/logos/white-Logos-11.svg';
import logo12 from '../../../public/images/logos/white-Logos-12.svg';
import logo13 from '../../../public/images/logos/white-Logos-13.svg';
import logo14 from '../../../public/images/logos/white-Logos-14.svg';
import logo15 from '../../../public/images/logos/white-Logos-15.svg';
import logo16 from '../../../public/images/logos/white-Logos-16.svg';
import logo17 from '../../../public/images/logos/white-Logos-17.svg';
import logo18 from '../../../public/images/logos/white-Logos-18.svg';

const LogoScroll: React.FC = () => {
  const logos = [
    { src: logo1, alt: 'Logo 1' },
    { src: logo2, alt: 'Logo 2' },
    { src: logo3, alt: 'Logo 3' },
    { src: logo4, alt: 'Logo 4' },
    { src: logo5, alt: 'Logo 5' },
    { src: logo6, alt: 'Logo 6' },
    { src: logo7, alt: 'Logo 7' },
    { src: logo8, alt: 'Logo 8' },
    { src: logo9, alt: 'Logo 9' },
    { src: logo10, alt: 'Logo 10' },
    { src: logo11, alt: 'Logo 11' },
    { src: logo12, alt: 'Logo 12' },
    { src: logo13, alt: 'Logo 13' },
    { src: logo14, alt: 'Logo 14' },
    { src: logo15, alt: 'Logo 15' },
    { src: logo16, alt: 'Logo 16' },
    { src: logo17, alt: 'Logo 17' },
    { src: logo18, alt: 'Logo 18' }
  ];

  // Duplicate logos for seamless scrolling
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="flex justify-center mt-12 mb-12">
      {/* Desktop */}
      <div 
        className="hidden lg:block overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 rounded-l-2xl rounded-r-2xl" 
        style={{ width: '1300px', height: '90px' }}
      >
        <div className="flex h-full">
          {/* Left side text */}
          <div className="flex-shrink-0 flex items-center justify-center px-8">
            <div className="text-white text-xl font-semibold">
            TRUSTED<br />
            PARTNERS
            </div>
          </div>
          
          {/* Right side scrolling logos */}
          <div className="flex-1 overflow-hidden">
            <div className="flex animate-scroll-desktop items-center h-full">
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{ width: '100px', marginRight: '20px' }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={80}
                    height={40}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tablet */}
      <div 
        className="hidden md:block lg:hidden overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 rounded-l-2xl rounded-r-2xl" 
        style={{ width: '600px', height: '80px' }}
      >
        <div className="flex h-full">
          {/* Left side text */}
          <div className="flex-shrink-0 flex items-center justify-center px-4">
            <div className="text-white text-sm font-semibold">
            TRUSTED<br />
            PARTNERS
            </div>
          </div>
          
          {/* Right side scrolling logos */}
          <div className="flex-1 overflow-hidden">
            <div className="flex animate-scroll-tablet items-center h-full">
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{ width: '100px', marginRight: '20px' }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={70}
                    height={35}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile - Width increased from 320px to 360px */}
      <div 
        className="block md:hidden overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 rounded-l-2xl rounded-r-2xl" 
        style={{ width: '360px', height: '60px' }}
      >
        <div className="flex h-full">
          {/* Left side text */}
          <div className="flex-shrink-0 flex items-center justify-center px-2">
            <div className="text-white text-xs font-semibold">
            TRUSTED<br />
            PARTNERS
            </div>
          </div>
          
          {/* Right side scrolling logos */}
          <div className="flex-1 overflow-hidden">
            <div className="flex animate-scroll-mobile items-center h-full">
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{ width: '80px', marginRight: '15px' }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={60}
                    height={30}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
           
      <style jsx>{`
        @keyframes scroll-desktop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-2160px);
          }
        }
        
        @keyframes scroll-tablet {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-2160px);
          }
        }
        
        @keyframes scroll-mobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1710px);
          }
        }
                
        .animate-scroll-desktop {
          animation: scroll-desktop 40s linear infinite;
        }
        
        .animate-scroll-tablet {
          animation: scroll-tablet 40s linear infinite;
        }
        
        .animate-scroll-mobile {
          animation: scroll-mobile 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LogoScroll;