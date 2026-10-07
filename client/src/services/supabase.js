import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch user profile from Supabase by User ID or Email
 */
export const getUserProfile = async (emailOrId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .or(`id.eq.${emailOrId},email.eq.${emailOrId}`)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching Supabase profile:', error.message);
    return null;
  }
};

/**
 * Upsert (Save/Update) user profile in Supabase
 */
export const saveUserProfile = async (profileData) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone || null,
        role: profileData.role || 'farmer',
        location: profileData.location || 'Indore, MP',
        avatar_url: profileData.avatarUrl || null,
        updated_at: new Date().toISOString()
      }, { onConflict: 'email' })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving profile to Supabase:', error.message);
    return null;
  }
};
