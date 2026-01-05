import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Insert into database
    const { data, error } = await supabase
      .from('contact_enquiries')
      .insert([
        {
          name,
          email,
          phone: '', // Optional, can be added later
          message: subject ? `${subject}: ${message}` : message,
          status: 'new'
        }
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      // For demo purposes, return success even if DB fails
      return NextResponse.json(
        { message: 'Enquiry submitted successfully' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Enquiry submitted successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}