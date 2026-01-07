'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, animate, useMotionValue, useMotionTemplate } from 'framer-motion';
import { FaBox } from 'react-icons/fa';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface SubCategory {
  id: string;
  name: string;
  slug: string;
  category: Category;
}

interface SuperSubCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sub_category: SubCategory;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_1: string | null;
  image_2?: string | null;
  image_3?: string | null;
  image_4?: string | null;
  status: string;
  is_featured: boolean;
}

interface SuperSubCategoryWithProducts extends SuperSubCategory {
  products: Product[];
}

export default function SuperSubCategoryPage() {
  const params = useParams();
  const categorySlug = params.slug as string;
  const subSlug = params.subSlug as string;
  const superSlug = params.superSlug as string;
  const [superSubCategory, setSuperSubCategory] = useState<SuperSubCategoryWithProducts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Aurora hero animation
  const COLORS_TOP = ["#2E5AC2", "#183067"];
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    if (!loading && superSubCategory) {
      animate(color, COLORS_TOP, {
        ease: "easeInOut",
        duration: 10,
        repeat: Infinity,
        repeatType: "mirror",
      });
    }
  }, [color, loading, superSubCategory]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #ffffff 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  useEffect(() => {
    const fetchSuperSubCategory = async () => {
      try {
        const response = await fetch(`/api/super-sub-categories/${superSlug}`);
        if (!response.ok) {
          throw new Error('Category not found');
        }
        const data = await response.json();
        setSuperSubCategory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load category');
      } finally {
        setLoading(false);
      }
    };

    fetchSuperSubCategory();
  }, [superSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !superSubCategory) {
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
        <div className="relative z-10 flex flex-col items-center px-4">
          <h1 className="max-w-3xl bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
            {superSubCategory?.name || 'Loading...'}
          </h1>
          <p className="my-6 max-w-xl text-center text-base leading-relaxed text-gray-600 md:text-lg md:leading-relaxed">
            {superSubCategory?.products?.length ? `${superSubCategory.products.length} Products Available` : 'Explore our products'}
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
      <div className="min-h-screen bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-16 flex-wrap">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link 
              href={`/categories/${superSubCategory.sub_category.category.slug}`}
              className="hover:text-indigo-600 transition-colors"
            >
              {superSubCategory.sub_category.category.name}
            </Link>
            <span>/</span>
            <Link 
              href={`/categories/${categorySlug}/${superSubCategory.sub_category.slug}`}
              className="hover:text-indigo-600 transition-colors"
            >
              {superSubCategory.sub_category.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{superSubCategory.name}</span>
          </nav>
        {superSubCategory.products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {superSubCategory.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1
                }}
              >
                <Link href={`/categories/${categorySlug}/${subSlug}/${superSlug}/${product.slug}`}>
                  <motion.div
                    className="group relative"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Card */}
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
                      
                      {/* Image Container */}
                      <div className="relative h-64 overflow-hidden">
                        {/* Image */}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="h-full w-full"
                        >
                          {product.image_1 ? (
                            <img
                              src={product.image_1}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                              <FaBox className="w-16 h-16 text-indigo-300" />
                            </div>
                          )}
                        </motion.div>

                        {/* Blue gradient from bottom */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-900/50 to-transparent"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 0.7 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        {/* Featured Badge */}
                        {product.is_featured && (
                          <div className="mb-3">
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                              Featured
                            </span>
                          </div>
                        )}

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:via-blue-600 group-hover:to-indigo-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2">
                          {product.name}
                        </h3>

                        {/* Description */}
                        {product.description && (
                          <p className="text-gray-600 text-sm mb-5 leading-relaxed line-clamp-2">
                            {product.description}
                          </p>
                        )}

                        {/* CTA */}
                        <div className="flex items-center justify-between">
                          <motion.span
                            className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent font-semibold text-sm"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            Explore →
                          </motion.span>

                          {/* Animated circles */}
                          <div className="flex gap-1.5">
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 rounded-full"
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Corner decoration */}
                      <motion.div
                        className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 opacity-10 rounded-tl-full"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>

                    {/* Shadow effect */}
                    <motion.div
                      className="absolute inset-0 -z-10 bg-indigo-950/10 blur-xl rounded-2xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FaBox className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Products Available
            </h3>
            <p className="text-gray-600 mb-8">
              Products will appear here once they are added to this category.
            </p>
            <Link
              href={`/categories/${categorySlug}/${subSlug}`}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to {superSubCategory.sub_category.name}
            </Link>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
