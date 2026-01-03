'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_1?: string;
  image_2?: string;
  image_3?: string;
  image_4?: string;
  is_featured: boolean;
  status: string;
  specifications?: Record<string, any>;
  category_id: string;
  sub_category_id: string;
  super_sub_category_id: string;
}

interface SuperSubCategory {
  id: string;
  name: string;
  slug: string;
  sub_category: {
    id: string;
    name: string;
    slug: string;
    category: {
      id: string;
      name: string;
      slug: string;
    };
  };
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [superSubCategory, setSuperSubCategory] = useState<SuperSubCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  const productSlug = params.productSlug as string;
  const superSlug = params.superSlug as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch super sub category with full hierarchy
        const superRes = await fetch(`/api/super-sub-categories/${superSlug}`);
        if (!superRes.ok) throw new Error('Failed to fetch super subcategory');
        const superData = await superRes.json();
        setSuperSubCategory(superData);

        // Find product in the super sub category
        const foundProduct = superData.products?.find(
          (p: Product) => p.slug === productSlug
        );
        if (!foundProduct) {
          setError('Product not found');
          return;
        }

        setProduct(foundProduct);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (productSlug && superSlug) {
      fetchData();
    }
  }, [productSlug, superSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading product...</div>
      </div>
    );
  }

  if (error || !product || !superSubCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center px-4">
        <div className="text-white text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-300 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const category = superSubCategory.sub_category.category;
  const subCategory = superSubCategory.sub_category;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-900 border-b border-slate-700 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href={`/categories/${category.slug}`} className="hover:text-white transition">
              {category.name}
            </Link>
            <span>/</span>
            <Link href={`/categories/${category.slug}/${subCategory.slug}`} className="hover:text-white transition">
              {subCategory.name}
            </Link>
            <span>/</span>
            <Link 
              href={`/categories/${category.slug}/${subCategory.slug}/${superSubCategory.slug}`}
              className="hover:text-white transition"
            >
              {superSubCategory.name}
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images Gallery */}
          <div>
            <div className="space-y-4">
              {/* Main Image (Image 1) */}
              <div className="w-full aspect-square bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg overflow-hidden flex items-center justify-center">
                {product.image_1 ? (
                  <img src={product.image_1} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-4">📦</div>
                    <p className="text-white font-semibold">{product.name}</p>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {(product.image_2 || product.image_3 || product.image_4) && (
                <div className="grid grid-cols-3 gap-2">
                  {product.image_2 && (
                    <div className="w-full aspect-square bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition">
                      <img src={product.image_2} alt="Image 2" className="w-full h-full object-cover" />
                    </div>
                  )}
                  {product.image_3 && (
                    <div className="w-full aspect-square bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition">
                      <img src={product.image_3} alt="Image 3" className="w-full h-full object-cover" />
                    </div>
                  )}
                  {product.image_4 && (
                    <div className="w-full aspect-square bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition">
                      <img src={product.image_4} alt="Image 4" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="text-white">
            {product.is_featured && (
              <div className="inline-block bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold mb-4">
                ⭐ Featured
              </div>
            )}

            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <p className="text-gray-300 text-sm mb-2">Description</p>
                <p className="text-gray-100 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mb-6">
                <p className="text-gray-300 text-sm mb-3">Specifications</p>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-400">{key}:</span>
                      <span className="text-gray-100">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Back Button */}
            <Link
              href={`/categories/${category.slug}/${subCategory.slug}/${superSubCategory.slug}`}
              className="inline-block text-blue-400 hover:text-blue-300 transition"
            >
              ← Back to {superSubCategory.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
