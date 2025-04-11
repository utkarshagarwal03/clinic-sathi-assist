
import { createClient } from '@supabase/supabase-js'

// Define your Supabase URL and Anon Key
const supabaseUrl = 'https://bbuqgdwlqsntoqxjzail.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJidXFnZHdscXNudG9xeGp6YWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNzIzMzEsImV4cCI6MjA1OTk0ODMzMX0.ZxOPNwM5A23RbhwCz9Cs8bMgwp2YlaMjrN-VHITgBLc'

// Log missing configuration for debugging
if (!supabaseUrl || supabaseUrl === '') {
  console.error('Missing Supabase URL')
}

if (!supabaseAnonKey || supabaseAnonKey === '') {
  console.error('Missing Supabase Anon Key')
}

// Create Supabase client with the specified URL and key
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Export a simple check function to verify the client was created correctly
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl) && Boolean(supabaseAnonKey)
}
