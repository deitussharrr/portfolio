import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gtsdtmonksdfexlsadec.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0c2R0bW9ua3NkZmV4bHNhZGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5Mzc1NDIsImV4cCI6MjA4NzUxMzU0Mn0.5ceNIcY-JpF-uUFsg-QXrRYs-0Z3Nvh-Nbk39ZpT8aY';

export const supabase = createClient(supabaseUrl, supabaseKey);
