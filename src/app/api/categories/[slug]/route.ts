import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get category by slug
    const { data: categories, error: categoryError } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug);

    if (categoryError) throw categoryError;
    if (!categories || categories.length === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const category = categories[0];

    // Get subcategories for this category
    const { data: subCategories, error: subError } = await supabase
      .from('sub_categories')
      .select('*')
      .eq('category_id', category.id)
      .order('name', { ascending: true });

    if (subError) throw subError;

    return NextResponse.json({
      ...category,
      subCategories: subCategories || []
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}
