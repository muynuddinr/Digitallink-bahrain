import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check database connection
export async function checkDatabaseConnection() {
  try {
    const { error } = await supabase.from('categories').select('count', { count: 'exact', head: true });
    return !error;
  } catch {
    return false;
  }
}
