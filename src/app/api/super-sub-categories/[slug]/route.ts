import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get super sub category by slug with full hierarchy
    const { data: superSubCategories, error: superError } = await supabase
      .from('super_sub_categories')
      .select(`
        *,
        sub_category:sub_categories(
          *,
          category:categories(*)
        )
      `)
      .eq('slug', slug);

    if (superError) throw superError;
    if (!superSubCategories || superSubCategories.length === 0) {
      return NextResponse.json({ error: 'Super subcategory not found' }, { status: 404 });
    }

    const superSubCategory = superSubCategories[0];

    // Get products for this super sub category
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('super_sub_category_id', superSubCategory.id)
      .eq('status', 'active')
      .order('name', { ascending: true });

    if (productsError) throw productsError;

    return NextResponse.json({
      ...superSubCategory,
      products: products || []
    });
  } catch (error) {
    console.error('Error fetching super subcategory:', error);
    return NextResponse.json({ error: 'Failed to fetch super subcategory' }, { status: 500 });
  }
}
