import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('newsletter_enquiries')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    // Return demo data if database not set up
    return NextResponse.json([
      {
        id: '1',
        email: 'subscriber1@example.com',
        subscribed_at: new Date().toISOString(),
        status: 'active'
      },
      {
        id: '2',
        email: 'subscriber2@example.com',
        subscribed_at: new Date(Date.now() - 86400000).toISOString(),
        status: 'active'
      },
      {
        id: '3',
        email: 'subscriber3@example.com',
        subscribed_at: new Date(Date.now() - 172800000).toISOString(),
        status: 'unsubscribed'
      }
    ]);
  }
}
