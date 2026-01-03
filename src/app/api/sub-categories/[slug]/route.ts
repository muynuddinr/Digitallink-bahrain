import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get subcategory by slug with category info
    const { data: subCategories, error: subError } = await supabase
      .from('sub_categories')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('slug', slug);

    if (subError) throw subError;
    if (!subCategories || subCategories.length === 0) {
      return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    }

    const subCategory = subCategories[0];

    // Get super sub categories for this subcategory
    const { data: superSubCategories, error: superError } = await supabase
      .from('super_sub_categories')
      .select('*')
      .eq('sub_category_id', subCategory.id)
      .order('name', { ascending: true });

    if (superError) throw superError;

    return NextResponse.json({
      ...subCategory,
      superSubCategories: superSubCategories || []
    });
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    return NextResponse.json({ error: 'Failed to fetch subcategory' }, { status: 500 });
  }
}
