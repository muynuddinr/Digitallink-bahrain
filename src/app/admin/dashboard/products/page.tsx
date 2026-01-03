'use client';

import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category_id: string;
  sub_category_id?: string;
  super_sub_category_id?: string;
  image_1?: string;
  image_2?: string;
  image_3?: string;
  image_4?: string;
  is_featured: boolean;
  status: 'active' | 'inactive';
  created_at: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [superSubCategories, setSuperSubCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category_id: '',
    sub_category_id: '',
    super_sub_category_id: '',
    image_1: '',
    image_2: '',
    image_3: '',
    image_4: '',
    is_featured: false,
    status: 'active' as 'active' | 'inactive'
  });
  const [imageUploadLoading, setImageUploadLoading] = useState<{[key: string]: boolean}>({
    image_1: false,
    image_2: false,
    image_3: false,
    image_4: false
  });
  const [imagePreviews, setImagePreviews] = useState<{[key: string]: string}>({
    image_1: '',
    image_2: '',
    image_3: '',
    image_4: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, catRes, subCatRes, superRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
        fetch('/api/admin/sub-categories'),
        fetch('/api/admin/super-sub-categories')
      ]);
      setProducts(await productsRes.json());
      setCategories(await catRes.json());
      setSubCategories(await subCatRes.json());
      setSuperSubCategories(await superRes.json());
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.slug || !formData.category_id || !formData.super_sub_category_id || !formData.image_1) {
      alert('Please fill in all required fields (Name, Slug, Category, Super Sub Category, and at least Image 1)');
      return;
    }

    try {
      const url = editingItem 
        ? `/api/admin/products/${editingItem.id}`
        : '/api/admin/products';
      
      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchData();
        closeModal();
      } else {
        const error = await response.json();
        alert('Error saving product: ' + (error.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Error: ' + (error instanceof Error ? error.message : 'Failed to save product'));
    }
  };

  const handleEdit = (item: Product) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      slug: item.slug,
      description: item.description || '',
      category_id: item.category_id,
      sub_category_id: item.sub_category_id || '',
      super_sub_category_id: item.super_sub_category_id || '',
      image_1: item.image_1 || '',
      image_2: item.image_2 || '',
      image_3: item.image_3 || '',
      image_4: item.image_4 || '',
      is_featured: item.is_featured,
      status: item.status
    });
    setImagePreviews({
      image_1: item.image_1 || '',
      image_2: item.image_2 || '',
      image_3: item.image_3 || '',
      image_4: item.image_4 || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      category_id: '',
      sub_category_id: '',
      super_sub_category_id: '',
      image_1: '',
      image_2: '',
      image_3: '',
      image_4: '',
      is_featured: false,
      status: 'active'
    });
    setImagePreviews({
      image_1: '',
      image_2: '',
      image_3: '',
      image_4: ''
    });
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const getCategoryName = (id: string) => {
    return categories.find(c => c.id === id)?.name || 'N/A';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, imageNumber: 'image_1' | 'image_2' | 'image_3' | 'image_4') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploadLoading({ ...imageUploadLoading, [imageNumber]: true });
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({ ...formData, [imageNumber]: data.url });
        setImagePreviews({ ...imagePreviews, [imageNumber]: data.url });
      } else {
        alert('Failed to upload image: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setImageUploadLoading({ ...imageUploadLoading, [imageNumber]: false });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <p className="text-gray-600 mb-4">No products found</p>
                    <button
                      onClick={() => setShowModal(true)}
                      className="text-green-500 hover:text-green-600 font-medium"
                    >
                      Add your first product
                    </button>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold mr-3">
                          {product.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-600">{product.slug}</p>
                          {product.is_featured && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Featured</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{getCategoryName(product.category_id)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingItem ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value, sub_category_id: '', super_sub_category_id: '' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
                  <select
                    value={formData.sub_category_id}
                    onChange={(e) => setFormData({ ...formData, sub_category_id: e.target.value, super_sub_category_id: '' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    disabled={!formData.category_id}
                  >
                    <option value="">Select sub-category</option>
                    {subCategories
                      .filter(sub => sub.category_id === formData.category_id)
                      .map(sub => (
                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Super Sub Category *</label>
                  <select
                    value={formData.super_sub_category_id}
                    onChange={(e) => setFormData({ ...formData, super_sub_category_id: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                    disabled={!formData.sub_category_id}
                  >
                    <option value="">Select super sub-category</option>
                    {superSubCategories
                      .filter(super_sub => super_sub.sub_category_id === formData.sub_category_id)
                      .map(super_sub => (
                        <option key={super_sub.id} value={super_sub.id}>{super_sub.name}</option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    rows={4}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-4">Product Images (4 total - 1 required, 3 optional)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Image 1 - Required */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2">Image 1 * (Required)</label>
                      {imagePreviews.image_1 && (
                        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-300 mb-2">
                          <img src={imagePreviews.image_1} alt="Preview 1" className="w-full h-full object-cover" />
                          <button 
                            type="button" 
                            onClick={() => { 
                              setImagePreviews({ ...imagePreviews, image_1: '' }); 
                              setFormData({ ...formData, image_1: '' }); 
                            }} 
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                      <label className={`flex items-center justify-center w-full px-3 py-4 border-2 border-dashed border-green-300 rounded-lg cursor-pointer hover:border-green-500 transition ${imageUploadLoading.image_1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleImageUpload(e, 'image_1')} 
                          disabled={imageUploadLoading.image_1} 
                          className="hidden" 
                        />
                        <div className="text-center">
                          <p className="text-xs font-medium text-gray-700">
                            {imageUploadLoading.image_1 ? 'Uploading...' : 'Upload Image 1'}
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Image 2 - Optional */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2">Image 2 (Optional)</label>
                      {imagePreviews.image_2 && (
                        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-300 mb-2">
                          <img src={imagePreviews.image_2} alt="Preview 2" className="w-full h-full object-cover" />
                          <button 
                            type="button" 
                            onClick={() => { 
                              setImagePreviews({ ...imagePreviews, image_2: '' }); 
                              setFormData({ ...formData, image_2: '' }); 
                            }} 
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                      <label className={`flex items-center justify-center w-full px-3 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-500 transition ${imageUploadLoading.image_2 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleImageUpload(e, 'image_2')} 
                          disabled={imageUploadLoading.image_2} 
                          className="hidden" 
                        />
                        <div className="text-center">
                          <p className="text-xs font-medium text-gray-700">
                            {imageUploadLoading.image_2 ? 'Uploading...' : 'Upload Image 2'}
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Image 3 - Optional */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2">Image 3 (Optional)</label>
                      {imagePreviews.image_3 && (
                        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-300 mb-2">
                          <img src={imagePreviews.image_3} alt="Preview 3" className="w-full h-full object-cover" />
                          <button 
                            type="button" 
                            onClick={() => { 
                              setImagePreviews({ ...imagePreviews, image_3: '' }); 
                              setFormData({ ...formData, image_3: '' }); 
                            }} 
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                      <label className={`flex items-center justify-center w-full px-3 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-500 transition ${imageUploadLoading.image_3 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleImageUpload(e, 'image_3')} 
                          disabled={imageUploadLoading.image_3} 
                          className="hidden" 
                        />
                        <div className="text-center">
                          <p className="text-xs font-medium text-gray-700">
                            {imageUploadLoading.image_3 ? 'Uploading...' : 'Upload Image 3'}
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Image 4 - Optional */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2">Image 4 (Optional)</label>
                      {imagePreviews.image_4 && (
                        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-300 mb-2">
                          <img src={imagePreviews.image_4} alt="Preview 4" className="w-full h-full object-cover" />
                          <button 
                            type="button" 
                            onClick={() => { 
                              setImagePreviews({ ...imagePreviews, image_4: '' }); 
                              setFormData({ ...formData, image_4: '' }); 
                            }} 
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                      <label className={`flex items-center justify-center w-full px-3 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-500 transition ${imageUploadLoading.image_4 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleImageUpload(e, 'image_4')} 
                          disabled={imageUploadLoading.image_4} 
                          className="hidden" 
                        />
                        <div className="text-center">
                          <p className="text-xs font-medium text-gray-700">
                            {imageUploadLoading.image_4 ? 'Uploading...' : 'Upload Image 4'}
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="rounded border-gray-300 text-green-500 focus:ring-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Featured Product</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 pt-6 mt-6 border-t">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                  {editingItem ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

