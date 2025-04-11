
import { supabase } from '@/lib/supabase';

export type AuthUser = {
  id: string;
  email: string;
  userType?: 'doctor' | 'patient';
  firstName?: string;
  lastName?: string;
};

export const signUp = async (
  email: string, 
  password: string, 
  userType: 'doctor' | 'patient',
  firstName: string,
  lastName: string
) => {
  try {
    // Sign up the user with Supabase
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;

    if (authData.user) {
      // Insert the user profile data
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: authData.user.id,
          user_type: userType,
          first_name: firstName,
          last_name: lastName,
          email: email,
          created_at: new Date().toISOString()
        });

      if (profileError) throw profileError;
    }

    return { success: true };
  } catch (error) {
    console.error('Error signing up:', error);
    return { success: false, error };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Fetch user profile
    const { data: profileData, error: profileError } = await supabase
      .from('user_profiles')
      .select('user_type, first_name, last_name')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw profileError;

    const user: AuthUser = {
      id: data.user.id,
      email: data.user.email || '',
      userType: profileData.user_type as 'doctor' | 'patient',
      firstName: profileData.first_name,
      lastName: profileData.last_name
    };

    return { success: true, user };
  } catch (error) {
    console.error('Error signing in:', error);
    return { success: false, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error };
  }
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const { data } = await supabase.auth.getSession();
    
    if (!data.session?.user) {
      return null;
    }

    // Fetch user profile
    const { data: profileData, error: profileError } = await supabase
      .from('user_profiles')
      .select('user_type, first_name, last_name')
      .eq('id', data.session.user.id)
      .single();

    if (profileError) throw profileError;

    return {
      id: data.session.user.id,
      email: data.session.user.email || '',
      userType: profileData.user_type as 'doctor' | 'patient',
      firstName: profileData.first_name,
      lastName: profileData.last_name
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};
