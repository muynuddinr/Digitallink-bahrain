'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, animate, useMotionValue, useMotionTemplate } from 'framer-motion';
import { FaArrowRight, FaCubes } from 'react-icons/fa';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';


interface Category {
  id: string;
  name: string;
  slug: string;
}

interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  category: Category;
}

interface SuperSubCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sub_category_id: string;
}

interface SubCategoryWithSuper extends SubCategory {
  superSubCategories: SuperSubCategory[];
}

export default function SubCategoryPage() {
  const params = useParams();
  const categorySlug = params.slug as string;
  const subSlug = params.subSlug as string;
  const [subCategory, setSubCategory] = useState<SubCategoryWithSuper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Aurora hero animation
  const COLORS_TOP = ["#2E5AC2", "#183067"];
  const color = useMotionValue(COLORS_TOP[0]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #ffffff 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  useEffect(() => {
    if (!loading && subCategory) {
      animate(color, COLORS_TOP, {
        ease: "easeInOut",
        duration: 10,
        repeat: Infinity,
        repeatType: "mirror",
      });
    }
  }, [color, loading, subCategory]);

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const response = await fetch(`/api/sub-categories/${subSlug}`);
        if (!response.ok) {
          throw new Error('Subcategory not found');
        }
        const data = await response.json();
        setSubCategory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load subcategory');
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategory();
  }, [subSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !subCategory) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Subcategory Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The subcategory you are looking for does not exist.'}</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Aurora Hero Section */}
      <motion.section
        style={{
          backgroundImage,
        }}
        className="relative py-24 overflow-hidden"
      >
        <div className="relative z-10 flex flex-col items-center px-4">
          <h1 className="max-w-3xl bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
            {subCategory?.name || 'Loading...'}
          </h1>
          <p className="my-6 max-w-xl text-center text-base leading-relaxed text-gray-600 md:text-lg md:leading-relaxed">
            {subCategory?.description || `Explore our ${subCategory?.name} products`}
          </p>
          <motion.button
            style={{
              border,
              boxShadow,
            }}
            whileHover={{
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.985,
            }}
            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-gray-900 transition-colors hover:bg-white/50"
          >
            Explore Products
            <ChevronRight className="w-4 h-4 transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
          </motion.button>
        </div>
      </motion.section>

      {/* CONTENT SECTION */}
      <div className="bg-gradient-to-b from-blue-50/50 to-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Super Sub Categories Grid */}
          {subCategory.superSubCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subCategory.superSubCategories.map((superSub, index) => (
              <motion.div
                key={superSub.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <Link href={`/categories/${categorySlug}/${subSlug}/${superSub.slug}`}>
                  <motion.div
                    className="group relative cursor-pointer"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Card Container */}
                    <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
                      
                      {/* Image Section */}
                      <div className="relative h-64 overflow-hidden">
                        {/* Image */}
                        <motion.div
                          className="h-full w-full"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                          {superSub.image_url ? (
                            <img
                              src={superSub.image_url}
                              alt={superSub.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                              <FaCubes className="w-16 h-16 text-indigo-300" />
                            </div>
                          )}
                        </motion.div>

                        {/* Blue Overlay - Fades in on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-indigo-900 to-blue-800 mix-blend-multiply"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 0.2 }}
                          transition={{ duration: 0.4 }}
                        />

                        {/* Dark Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />

                        {/* Bottom - Content on Image */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <motion.div
                            initial={{ y: 10, opacity: 0.9 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <h3 className="text-2xl font-bold text-white mb-1">
                              {superSub.name}
                            </h3>
                          </motion.div>
                        </div>
                      </div>

                      {/* Bottom White Section */}
                      <div className="bg-white p-5">
                        {superSub.description && (
                          <p className="text-gray-600 text-sm mb-4">
                            {superSub.description}
                          </p>
                        )}

                        {/* CTA Button */}
                        <motion.div
                          className="flex items-center justify-between group/btn"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-blue-800 bg-clip-text text-transparent font-bold text-sm">
                            View Products
                          </span>
                          
                          {/* Arrow Circle */}
                          <motion.div
                            className="relative w-10 h-10 bg-gradient-to-r from-indigo-950 via-indigo-900 to-blue-800 rounded-full flex items-center justify-center overflow-hidden"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.svg
                              className="w-5 h-5 text-white relative z-10"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              whileHover={{ rotate: 60 }}
                              transition={{ duration: 0.3 }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </motion.svg>
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Decorative Blue Line */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-950 via-indigo-900 to-blue-800"
                        initial={{ width: "0%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FaCubes className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Product Categories Yet
            </h3>
            <p className="text-gray-600">
              Product categories will appear here once they are added.
            </p>
          </div>
        )}
        </div>
      </div>
    </>
  );
}
