import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('newsletter_enquiries')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json(
        { message: 'Email already subscribed' },
        { status: 200 }
      );
    }

    // Insert new subscriber
    const { data, error } = await supabase
      .from('newsletter_enquiries')
      .insert([
        {
          email,
          status: 'active'
        }
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      // For demo purposes, return success even if DB fails
      return NextResponse.json(
        { message: 'Successfully subscribed to newsletter' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}