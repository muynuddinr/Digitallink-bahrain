 'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, animate, useMotionValue, useMotionTemplate } from 'framer-motion';
import { FaLayerGroup } from 'react-icons/fa';
import { ChevronRight } from 'lucide-react';
import heroimage from '../../../assets/Solution.jpg';
import mobilehero from '../../../assets/Building.jpg';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
}

interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  category_id: string;
}

interface CategoryWithSubs extends Category {
  subCategories: SubCategory[];
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [category, setCategory] = useState<CategoryWithSubs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Aurora hero animation
  const COLORS_TOP = ["#2E5AC2", "#183067"];
  const color = useMotionValue(COLORS_TOP[0]);

  // Ref for scrolling to subcategories
  const subcategoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && category) {
      animate(color, COLORS_TOP, {
        ease: "easeInOut",
        duration: 10,
        repeat: Infinity,
        repeatType: "mirror",
      });
    }
  }, [color, loading, category]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #ffffff 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  // Function to scroll to subcategories
  const scrollToSubcategories = () => {
    if (subcategoriesRef.current) {
      subcategoriesRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/categories/${slug}`);
        if (!response.ok) {
          throw new Error('Category not found');
        }
        const data = await response.json();
        setCategory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load category');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The category you are looking for does not exist.'}</p>
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
    <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      {/* Aurora Hero Section */}
      <motion.section
        style={{
          backgroundImage,
        }}
        className="relative py-24 overflow-hidden"
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          {/* Desktop Image */}
          <Image
            src={heroimage}
            alt="Solutions background"
            fill
            className="object-cover opacity-20 hidden sm:block"
            sizes="100vw"
            priority
          />
          {/* Mobile Image */}
          <Image
            src={mobilehero}
            alt="Building background"
            fill
            className="object-cover opacity-20 block sm:hidden"
            sizes="100vw"
            priority
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/30 via-white/20 to-transparent" />
        
        <div className="relative z-10 flex flex-col items-center px-4">
          <motion.h1 
            className="max-w-3xl bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-700 bg-clip-text text-center text-3xl font-extrabold leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {category?.name || 'Loading...'}
          </motion.h1>
          <motion.p 
            className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-clip-text text-transparent font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {category?.description || `Explore our ${category?.name} products`}
          </motion.p>
          <motion.button
            onClick={scrollToSubcategories}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-gray-900 transition-colors hover:bg-white/50 cursor-pointer"
          >
            Explore Products
            <ChevronRight className="w-4 h-4 transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
          </motion.button>
        </div>
      </motion.section>

      {/* Subcategories Section with ref */}
      <div ref={subcategoriesRef} className="container max-w-7xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{category.name}</span>
        </nav>

        {/* Sub Categories Grid */}
        {category.subCategories.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Browse Sub Categories
              </h2>
              <p className="text-gray-600">
                Select a subcategory to explore more specific products
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.subCategories.map((subCategory, index) => (
                <motion.div
                  key={subCategory.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1
                  }}
                >
                  <Link href={`/categories/${category.slug}/${subCategory.slug}`}>
                    <motion.div
                      className="group relative"
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Card */}
                      <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
                        
                        {/* Image Container */}
                        <div className="relative h-72 overflow-hidden">
                          {/* Image */}
                          {subCategory.image_url ? (
                            <motion.div
                              whileHover={{ scale: 1.12 }}
                              transition={{ duration: 0.7 }}
                              className="h-full w-full relative"
                            >
                              <Image
                                src={subCategory.image_url}
                                alt={subCategory.name}
                                fill
                                className="object-cover"
                              />
                            </motion.div>
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                              <FaLayerGroup className="w-20 h-20 text-indigo-300" />
                            </div>
                          )}

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

                          {/* Blue circle decoration - animated */}
                          <motion.div
                            className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600 rounded-full opacity-20 blur-2xl"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.2, 0.3, 0.2]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: index * 0.5
                            }}
                          />

                          {/* Bottom content on image */}
                          <div className="absolute bottom-5 left-5 right-5">
                            <motion.h3
                              className="text-2xl font-bold text-white mb-1"
                              initial={{ y: 10 }}
                              whileHover={{ y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {subCategory.name}
                            </motion.h3>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 bg-white">
                          {/* Description */}
                          {subCategory.description && (
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                              {subCategory.description}
                            </p>
                          )}

                          {/* CTA Section */}
                          <div className="flex items-center justify-between">
                            <motion.div
                              className="text-blue-600 font-bold text-sm flex items-center gap-2"
                              whileHover={{ gap: "12px" }}
                              transition={{ duration: 0.3 }}
                            >
                              <span>Explore</span>
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </svg>
                            </motion.div>

                            {/* Progress bar */}
                            <div className="flex gap-1">
                              <motion.div
                                className="h-1 bg-blue-600 rounded-full"
                                initial={{ width: "20px" }}
                                whileHover={{ width: "30px" }}
                                transition={{ duration: 0.3 }}
                              />
                              <div className="h-1 w-1 bg-gray-300 rounded-full" />
                              <div className="h-1 w-1 bg-gray-300 rounded-full" />
                            </div>
                          </div>
                        </div>

                        {/* Border glow effect */}
                        <motion.div
                          className="absolute inset-0 border-2 border-blue-600 rounded-xl opacity-0 pointer-events-none"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <FaLayerGroup className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Subcategories Yet
            </h3>
            <p className="text-gray-600">
              Subcategories will appear here once they are added.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}