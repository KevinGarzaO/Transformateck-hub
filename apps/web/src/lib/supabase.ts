import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qqqkjneuzalfcerjzzae.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxcWtqbmV1emFsZmNlcmp6emFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMDkxNzQsImV4cCI6MjA4ODY4NTE3NH0.UgosKnFgtPLsmZw-YQ8nEmkXUUCuUKrTlUadWD1bHxg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
