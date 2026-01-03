import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('contact_enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    // Return demo data if database not set up
    return NextResponse.json([
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        message: 'I would like to know more about your security solutions.',
        created_at: new Date().toISOString(),
        status: 'new'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+0987654321',
        message: 'Can you provide a quote for surveillance systems?',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        status: 'contacted'
      }
    ]);
  }
}
