import { createClient } from '@supabase/supabase-js';

// Backend-only Supabase client (no AsyncStorage)
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://bmxtcqpuhfrvnajozzlw.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJteHRjcXB1aGZydm5ham96emx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NTQ4NDksImV4cCI6MjA3MjIzMDg0OX0.kDn1-ABfpKfUS7jBaUnSWuzNiUweiFp5dFzsOKNi0S0';

console.log('🔗 Backend Supabase configuration:', {
  url: supabaseUrl,
  keyConfigured: !!supabaseAnonKey,
  environment: 'server'
});

export const supabaseServer = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // No session persistence on backend
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
});

// Test connection
export const testSupabaseConnection = async () => {
  try {
    console.log('🔍 Testing backend Supabase connection...');
    const { data, error } = await supabaseServer.from('users').select('id').limit(1);
    
    if (error) {
      console.error('❌ Backend Supabase connection failed:', error.message);
    } else {
      console.log('✅ Backend Supabase connection successful:', {
        hasData: !!data,
        recordCount: data?.length || 0
      });
    }
  } catch (err) {
    console.error('❌ Backend Supabase connection error:', err instanceof Error ? err.message : String(err));
  }
};

