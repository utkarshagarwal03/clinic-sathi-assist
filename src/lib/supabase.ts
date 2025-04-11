
import { createClient } from '@supabase/supabase-js'

// Check if Supabase URL and key are available
const supabaseUrl = 'https://bbuqgdwlqsntoqxjzail.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJidXFnZHdscXNudG9xeGp6YWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNzIzMzEsImV4cCI6MjA1OTk0ODMzMX0.ZxOPNwM5A23RbhwCz9Cs8bMgwp2YlaMjrN-VHITgBLc'


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
