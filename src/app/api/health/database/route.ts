import { NextResponse } from 'next/server';
import { checkDatabaseConnection } from '@/lib/supabase';

export async function GET() {
  const connected = await checkDatabaseConnection();
  
  return NextResponse.json({
    connected,
    timestamp: new Date().toISOString()
  });
}
