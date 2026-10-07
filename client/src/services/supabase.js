import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cjbrvuhznwodgletvhcj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_IeIybrJjApcERZ4OF5kKzg_cWt78vZR';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Register a new user profile with password in Supabase profiles table
 */
export const registerUserInSupabase = async ({ name, email, password, phone, role, location }) => {
  try {
    // 1. Check if user already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) {
      return { success: false, error: 'Email already registered. Please sign in instead.' };
    }

    // 2. Insert new user profile with password
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        name: name || 'Agri User',
        email: email,
        password: password,
        phone: phone || null,
        role: role || 'farmer',
        location: location || 'Indore, MP',
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, user: data };
  } catch (error) {
    console.error('Supabase Registration Error:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Log in user by verifying email and password in Supabase profiles table
 */
export const loginUserInSupabase = async (email, password) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return { success: false, error: 'User account not found. Please register first.' };
    }

    if (data.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    return { success: true, user: data };
  } catch (error) {
    console.error('Supabase Login Error:', error.message);
    return { success: false, error: 'Authentication failed. Please check your email and password.' };
  }
};
