
import { createClient } from '@supabase/supabase-js'

// Check if Supabase URL and key are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Add helpful console messages for debugging
if (!supabaseUrl) {
  console.error('Missing VITE_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  console.error('Missing VITE_SUPABASE_ANON_KEY environment variable')
}

// Create and export the Supabase client with fallbacks to prevent runtime errors
// Using empty strings as fallbacks just to prevent runtime errors
// The app won't function correctly without real values, but at least it won't crash immediately
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
)
