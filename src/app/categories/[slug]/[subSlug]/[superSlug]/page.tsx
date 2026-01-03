'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaBox, FaInfoCircle } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{superSubCategory.name}</h1>
          <p className="text-indigo-100 text-lg max-w-2xl">
            {superSubCategory.description || `Browse our ${superSubCategory.name} products`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8 flex-wrap">
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

        {/* Products Grid */}
        {superSubCategory.products.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Available Products
              </h2>
              <p className="text-gray-600">
                {superSubCategory.products.length} product{superSubCategory.products.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {superSubCategory.products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/categories/${categorySlug}/${subSlug}/${superSlug}/${product.slug}`}>
                    <div className="group h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-indigo-300 cursor-pointer">
                      {/* Product Image */}
                      <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center group-hover:from-indigo-200 group-hover:to-purple-200 transition-colors">
                        {product.image_1 ? (
                          <img 
                            src={product.image_1} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                          />
                        ) : (
                          <FaBox className="w-12 h-12 text-gray-500 group-hover:text-indigo-600 transition-colors" />
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-6 relative">

                        {/* Badges */}
                        <div className="flex gap-2 mb-3">
                          {product.is_featured && (
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                              Featured
                            </div>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        
                        {product.description && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {product.description}
                          </p>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <FaShoppingCart className="w-4 h-4" />
                            <span className="text-sm font-medium">View</span>
                          </button>
                          <div
                            className="bg-gray-100 group-hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <FaInfoCircle className="w-4 h-4" />
                          </div>
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
  );
}
