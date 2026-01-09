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
  const [selectedImage, setSelectedImage] = useState('');

  const productSlug = params.productSlug as string;
  const superSlug = params.superSlug as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const superRes = await fetch(`/api/super-sub-categories/${superSlug}`);
        if (!superRes.ok) throw new Error('Failed to fetch super subcategory');
        const superData = await superRes.json();
        setSuperSubCategory(superData);

        const foundProduct = superData.products?.find(
          (p: Product) => p.slug === productSlug
        );

        if (!foundProduct) {
          setError('Product not found');
          return;
        }

        setProduct(foundProduct);
        setSelectedImage(foundProduct.image_1 || '');
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex space-x-2 justify-center mb-4">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <p className="text-gray-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product || !superSubCategory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-5xl">❌</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            {error || 'The product you are looking for does not exist.'}
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const category = superSubCategory.sub_category.category;
  const subCategory = superSubCategory.sub_category;
  const images = [
    product.image_1,
    product.image_2,
    product.image_3,
    product.image_4,
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to {superSubCategory.name}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-400">•</span>
            <Link href={`/categories/${category.slug}`} className="text-blue-600 hover:underline">{category.name}</Link>
            <span className="text-gray-400">•</span>
            <Link href={`/categories/${category.slug}/${subCategory.slug}`} className="text-blue-600 hover:underline">{subCategory.name}</Link>
            <span className="text-gray-400">•</span>
            <Link href={`/categories/${category.slug}/${subCategory.slug}/${superSubCategory.slug}`} className="text-blue-600 hover:underline">{superSubCategory.name}</Link>
            <span className="text-gray-400">•</span>
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Mobile Title & Description - Visible only on mobile, appears before image */}
        <div className="lg:hidden mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
            {product.name}
          </h1>
          {product.description && (
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
            </div>
          )}
        </div>

        {/* Product Grid - Thumbnails + Image + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Left - Thumbnails */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === image
                      ? 'border-blue-600 shadow-lg'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Center - Main Image */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="aspect-square bg-gray-100 flex items-center justify-center p-4">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-8xl mb-4 opacity-30">📦</div>
                    <p className="text-gray-400 text-lg font-medium">{product.name}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="lg:col-span-6 order-3">
            <div className="space-y-6">
              {/* Product Name - Hidden on mobile, visible on desktop */}
              <div className="hidden lg:block">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                  {product.name}
                </h1>
                
                {/* Description */}
                {product.description && (
                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
                  </div>
                )}
              </div>

              {/* Features Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Features</h3>
                
                {/* Specifications */}
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <div className="bg-gray-100 rounded-lg p-4 space-y-2 mb-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 font-medium capitalize">{key}:</span>
                        <span className="text-gray-900 font-semibold">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <p className="text-gray-600 text-sm">No specifications available for this product.</p>
                  </div>
                )}

                {/* Product Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center text-sm py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Product ID</span>
                    <span className="text-gray-900 font-mono text-xs">{product.id}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Category</span>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                    >
                      {category.name}
                    </Link>
                  </div>
                  <div className="flex justify-between items-center text-sm py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Sub Category</span>
                    <Link
                      href={`/categories/${category.slug}/${subCategory.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                    >
                      {subCategory.name}
                    </Link>
                  </div>
                  <div className="flex justify-between items-center text-sm py-2">
                    <span className="text-gray-600 font-medium">Super Sub Category</span>
                    <Link
                      href={`/categories/${category.slug}/${subCategory.slug}/${superSubCategory.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                    >
                      {superSubCategory.name}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Contact Button */}
              <div className="border-t border-gray-200 pt-6">
                <button
                  className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                  onClick={() => {
                    // Add your contact logic here
                    window.location.href = '/contact';
                  }}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section - Full Width Below */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wide">Description</h2>
          {product.description ? (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
            </div>
          ) : (
            <p className="text-gray-500 italic">No description available for this product.</p>
          )}
        </div>
      </div>
    </div>
  );
}