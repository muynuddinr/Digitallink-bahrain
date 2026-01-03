export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface NewsletterEnquiry {
  id: string;
  email: string;
  subscribed_at: string;
  status: 'active' | 'unsubscribed';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface SubCategory {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface SuperSubCategory {
  id: string;
  sub_category_id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  category_id: string;
  sub_category_id?: string;
  super_sub_category_id?: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  image_url?: string;
  images?: string[];
  specifications?: Record<string, any>;
  is_featured: boolean;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalContacts: number;
  totalNewsletters: number;
  newContacts: number;
  recentProducts: Product[];
}
