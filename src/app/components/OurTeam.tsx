'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import human from '@/assets/human.jpg'

export interface TeamMember {
  name: string;
  imageUrl: string;
  alt: string;
}

type Position = 'left2' | 'left1' | 'middle' | 'right1' | 'right2';

interface VisibleTeamMember extends TeamMember {
  index: number;
  position: Position;
}

export default function OurTeam() {
  const teamMembers: TeamMember[] = [
    {
      name: 'Team Member One',
      imageUrl: human.src,
      alt: 'Team Member One',
    },
    {
      name: 'John Carvan',
      imageUrl: human.src,
      alt: 'John Carvan',
    },
    {
      name: 'Miss Smith Ellen',
      imageUrl: human.src,
      alt: 'Miss Smith Ellen',
    },
    {
      name: 'Team Member Name',
      imageUrl: human.src,
      alt: 'Team Member',
    },
    {
      name: 'Team Member Five',
      imageUrl: human.src,
      alt: 'Team Member Five',
    },
  ];

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [currentIndex, setCurrentIndex] = useState(2);

  const handleImageError = (key: string) => {
    setImageErrors(prev => ({
      ...prev,
      [key]: true
    }));
  };

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex => (prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1));
  };

  const handleTeamMemberClick = (index: number) => {
    setCurrentIndex(index);
  };

  const getVisibleTeamMembers = (): VisibleTeamMember[] => {
    const total = teamMembers.length;
    const visibleTeamMembers: VisibleTeamMember[] = [];
    
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + total) % total;
      const position: Position = 
        i === 0 ? 'middle' : 
        i === -2 ? 'left2' : 
        i === -1 ? 'left1' : 
        i === 1 ? 'right1' : 'right2';
      
      visibleTeamMembers.push({
        ...teamMembers[index],
        index,
        position
      });
    }
    
    return visibleTeamMembers;
  };

  const visibleTeamMembers = getVisibleTeamMembers();

  const ImageFallback = ({ width = 150, height = 150, text = 'Image' }: { 
    width?: number; 
    height?: number; 
    text?: string; 
  }) => (
    <div 
      className="flex items-center justify-center bg-gray-200 border-2 border-dashed border-gray-300 rounded-full"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <span className="text-gray-500 text-sm">{text}</span>
    </div>
  );

  const SmallNavButton = ({ direction, onClick }: { 
    direction: 'left' | 'right'; 
    onClick: () => void; 
  }) => (
    <button 
      onClick={onClick}
      className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
      aria-label={`Scroll ${direction}`}
    >
      {direction === 'left' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );

  const TeamMemberCard = ({ teamMember, position, index, onClick }: { 
    teamMember: TeamMember; 
    position: Position;
    index: number;
    onClick: () => void;
  }) => {
    const getCardStyle = () => {
      switch(position) {
        case 'middle':
          return {
            size: 'w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64',
            border: 'border-4 border-white',
            scale: 'transform scale-110',
            opacity: 'opacity-100',
            zIndex: 'z-20',
            order: 2,
            textSize: 'text-lg md:text-xl lg:text-2xl text-gray-900'
          };
        case 'left1':
        case 'right1':
          return {
            size: 'w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56',
            border: 'border-2 border-white',
            scale: 'transform scale-100',
            opacity: 'opacity-95',
            zIndex: 'z-10',
            order: position === 'left1' ? 1 : 3,
            textSize: 'text-base md:text-lg lg:text-lg text-gray-800'
          };
        case 'left2':
        case 'right2':
          return {
            size: 'w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48',
            border: 'border-2 border-white',
            scale: 'transform scale-90',
            opacity: 'opacity-80',
            zIndex: 'z-0',
            order: position === 'left2' ? 0 : 4,
            textSize: 'text-sm md:text-base lg:text-base text-gray-700'
          };
        default:
          const exhaustiveCheck: never = position;
          return exhaustiveCheck;
      }
    };
    
    const style = getCardStyle();
    
    return (
      <div 
        className={`flex flex-col items-center transition-all duration-700 ease-in-out cursor-pointer ${style.scale} ${style.opacity} ${style.zIndex}`}
        style={{ order: style.order }}
        onClick={onClick}
      >
        <div 
          className={`relative rounded-full overflow-hidden shadow-lg mb-4 transition-all duration-700 ease-in-out ${style.size} ${style.border}`}
        >
          {imageErrors[`teamMember-${index}`] ? (
            <ImageFallback 
              width={position === 'middle' ? 192 : 160} 
              height={position === 'middle' ? 192 : 160} 
              text={teamMember.name} 
            />
          ) : (
            <Image
              src={teamMember.imageUrl}
              alt={teamMember.alt}
              className="w-full h-full object-cover"
              fill
              onError={() => handleImageError(`teamMember-${index}`)}
            />
          )}
        </div>
        <h3 className={`font-semibold transition-all duration-700 ease-in-out text-center px-1 ${style.textSize}`}>
          {teamMember.name}
        </h3>
      </div>
    );
  };

  return (
    <div className="mb-20">
      <motion.h2 
        initial={{ opacity: 0.3 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-3xl font-bold text-center mb-10"
      >
        Our Team
      </motion.h2>
      
      {/* Mobile View Only - 2x2 Grid */}
      <div className="block md:hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center gap-10 max-w-2xl mx-auto px-6"
        >
          {/* Top team member - Main person */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 1.4, 
              delay: 0.3, 
              ease: [0.22, 0.61, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center"
          >
            <motion.div 
              className="relative rounded-full overflow-hidden shadow-lg mb-4 w-44 h-44 border-4 border-white"
            >
              {imageErrors[`teamMember-0`] ? (
                <ImageFallback 
                  width={176} 
                  height={176} 
                  text={teamMembers[0].name} 
                />
              ) : (
                <Image
                  src={teamMembers[0].imageUrl}
                  alt={teamMembers[0].alt}
                  className="w-full h-full object-cover"
                  fill
                  onError={() => handleImageError(`teamMember-0`)}
                />
              )}
            </motion.div>
            <motion.h3 
              className="font-semibold text-xl text-center text-gray-900 px-2"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {teamMembers[0].name}
            </motion.h3>
          </motion.div>

          {/* First row - 2 team members */}
          <div className="flex justify-center gap-12 w-full">
            {teamMembers.slice(1, 3).map((member, index) => (
              <motion.div 
                key={index + 1}
                initial={{ opacity: 0, scale: 0.6, y: 60 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 1.1, 
                  delay: 0.8 + (index * 0.2), 
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col items-center"
              >
                <motion.div 
                  className="relative rounded-full overflow-hidden shadow-lg mb-4 w-36 h-36 border-3 border-white"
                >
                  {imageErrors[`teamMember-${index + 1}`] ? (
                    <ImageFallback 
                      width={144} 
                      height={144} 
                      text={member.name} 
                    />
                  ) : (
                    <Image
                      src={member.imageUrl}
                      alt={member.alt}
                      className="w-full h-full object-cover"
                      fill
                      onError={() => handleImageError(`teamMember-${index + 1}`)}
                    />
                  )}
                </motion.div>
                <motion.h3 
                  className="font-semibold text-lg text-center text-gray-900 max-w-36 px-2"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 + (index * 0.15) }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {member.name}
                </motion.h3>
              </motion.div>
            ))}
          </div>

          {/* Second row - Next 2 team members */}
          <div className="flex justify-center gap-12 w-full">
            {teamMembers.slice(3, 5).map((member, index) => (
              <motion.div 
                key={index + 3}
                initial={{ opacity: 0, scale: 0.6, y: 60 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 1.1, 
                  delay: 1.0 + (index * 0.2), 
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col items-center"
              >
                <motion.div 
                  className="relative rounded-full overflow-hidden shadow-lg mb-4 w-36 h-36 border-3 border-white"
                >
                  {imageErrors[`teamMember-${index + 3}`] ? (
                    <ImageFallback 
                      width={144} 
                      height={144} 
                      text={member.name} 
                    />
                  ) : (
                    <Image
                      src={member.imageUrl}
                      alt={member.alt}
                      className="w-full h-full object-cover"
                      fill
                      onError={() => handleImageError(`teamMember-${index + 3}`)}
                    />
                  )}
                </motion.div>
                <motion.h3 
                  className="font-semibold text-lg text-center text-gray-900 max-w-36 px-2"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.3 + (index * 0.15) }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {member.name}
                </motion.h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tablet, iPad, and Desktop View - Original Pyramid Layout */}
      <div className="hidden md:block xl:hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center gap-8 md:gap-12 max-w-2xl mx-auto px-4"
        >
          {/* Top team member - Main person */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 1.4, 
              delay: 0.3, 
              ease: [0.22, 0.61, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center"
          >
            <motion.div 
              className="relative rounded-full overflow-hidden shadow-lg mb-4 w-40 h-40 md:w-48 md:h-48 border-4 border-white"
            >
              {imageErrors[`teamMember-0`] ? (
                <ImageFallback 
                  width={160} 
                  height={160} 
                  text={teamMembers[0].name} 
                />
              ) : (
                <Image
                  src={teamMembers[0].imageUrl}
                  alt={teamMembers[0].alt}
                  className="w-full h-full object-cover"
                  fill
                  onError={() => handleImageError(`teamMember-0`)}
                />
              )}
            </motion.div>
            <motion.h3 
              className="font-semibold text-lg md:text-xl text-center text-gray-900"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {teamMembers[0].name}
            </motion.h3>
          </motion.div>

          {/* Bottom row - Last four team members in single row */}
          <div className="flex justify-center gap-4 md:gap-8 w-full flex-wrap">
            {teamMembers.slice(1, 5).map((member, index) => (
              <motion.div 
                key={index + 1}
                initial={{ opacity: 0, scale: 0.6, y: 60 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 1.1, 
                  delay: 0.8 + (index * 0.2), 
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col items-center"
              >
                <motion.div 
                  className="relative rounded-full overflow-hidden shadow-lg mb-3 w-24 h-24 md:w-32 md:h-32 border-2 border-white"
                >
                  {imageErrors[`teamMember-${index + 1}`] ? (
                    <ImageFallback 
                      width={96} 
                      height={96} 
                      text={member.name} 
                    />
                  ) : (
                    <Image
                      src={member.imageUrl}
                      alt={member.alt}
                      className="w-full h-full object-cover"
                      fill
                      onError={() => handleImageError(`teamMember-${index + 1}`)}
                    />
                  )}
                </motion.div>
                <motion.h3 
                  className="font-semibold text-sm md:text-base text-center text-gray-900 max-w-24 md:max-w-32 truncate"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 + (index * 0.15) }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {member.name}
                </motion.h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Desktop Carousel View with Scroll Functionality */}
      <div className="hidden xl:block">
        <motion.div 
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-center items-center relative h-80"
        >
          {/* Background decoration */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="absolute inset-0 flex justify-center items-center"
          >
            <div className="w-64 h-64 bg-blue-100 rounded-full blur-xl"></div>
          </motion.div>
          
          <div className="flex items-end justify-center gap-4 relative z-10 w-full max-w-5xl px-2">
            {visibleTeamMembers.map((teamMember, idx) => {
              const getInitialPosition = () => {
                switch(teamMember.position) {
                  case 'left2':
                    return { x: -60, opacity: 0.5, scale: 0.85 };
                  case 'left1':
                    return { x: -30, opacity: 0.7, scale: 0.92 };
                  case 'middle':
                    return { y: -20, opacity: 0.8, scale: 0.95 };
                  case 'right1':
                    return { x: 30, opacity: 0.7, scale: 0.92 };
                  case 'right2':
                    return { x: 60, opacity: 0.5, scale: 0.85 };
                }
              };

              return (
                <motion.div
                  key={teamMember.index}
                  initial={getInitialPosition()}
                  whileInView={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 1, 
                    delay: 0.1 + (idx * 0.08),
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <TeamMemberCard 
                    teamMember={teamMember} 
                    position={teamMember.position} 
                    index={teamMember.index} 
                    onClick={() => handleTeamMemberClick(teamMember.index)} 
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        
        {/* Small Navigation Buttons at Bottom - Only for Desktop */}
        <motion.div 
          initial={{ opacity: 0.4, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-center items-center mt-12 space-x-6"
        >
          <SmallNavButton direction="left" onClick={handlePrevClick} />
          <SmallNavButton direction="right" onClick={handleNextClick} />
        </motion.div>
      </div>
    </div>
  );
}