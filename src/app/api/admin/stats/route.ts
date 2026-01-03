import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Fetch statistics from Supabase
    const [products, categories, contacts, newsletters] = await Promise.all([
      supabase.from('products').select('id', { count: 'exact', head: true }),
      supabase.from('categories').select('id', { count: 'exact', head: true }),
      supabase.from('contact_enquiries').select('id', { count: 'exact', head: true }),
      supabase.from('newsletter_enquiries').select('id', { count: 'exact', head: true }),
    ]);

    // Get new contacts (last 24 hours)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: newContactsCount } = await supabase
      .from('contact_enquiries')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', yesterday);

    return NextResponse.json({
      totalProducts: products.count || 0,
      totalCategories: categories.count || 0,
      totalContacts: contacts.count || 0,
      totalNewsletters: newsletters.count || 0,
      newContacts: newContactsCount || 0,
    });
  } catch (error) {
    // Return default values if database not set up yet
    return NextResponse.json({
      totalProducts: 0,
      totalCategories: 0,
      totalContacts: 0,
      totalNewsletters: 0,
      newContacts: 0,
    });
  }
}
