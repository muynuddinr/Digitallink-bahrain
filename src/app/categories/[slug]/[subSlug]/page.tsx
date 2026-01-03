'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCubes } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{subCategory.name}</h1>
          <p className="text-purple-100 text-lg max-w-2xl">
            {subCategory.description || `Explore our ${subCategory.name} products`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link 
            href={`/categories/${subCategory.category.slug}`}
            className="hover:text-indigo-600 transition-colors"
          >
            {subCategory.category.name}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{subCategory.name}</span>
        </nav>

        {/* Super Sub Categories Grid */}
        {subCategory.superSubCategories.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Browse Product Categories
              </h2>
              <p className="text-gray-600">
                Select a category to view available products
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subCategory.superSubCategories.map((superSub, index) => (
                <motion.div
                  key={superSub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/categories/${categorySlug}/${subSlug}/${superSub.slug}`}
                    className="group block h-full"
                  >
                    <div className="h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-indigo-300">
                      {/* Image */}
                      <div className="h-40 bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden flex items-center justify-center">
                        {superSub.image_url ? (
                          <img
                            src={superSub.image_url}
                            alt={superSub.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <FaCubes className="w-12 h-12 text-indigo-300" />
                        )}
                      </div>
                      {/* Content */}
                      <div className="p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                          {superSub.name}
                        </h3>
                        {superSub.description && (
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {superSub.description}
                          </p>
                        )}
                        <div className="flex items-center text-indigo-600 font-medium group-hover:translate-x-2 transition-transform">
                          <span>View Products</span>
                          <FaArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
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
  );
}
