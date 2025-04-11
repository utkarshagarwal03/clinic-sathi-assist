
import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from 'react';
import { AuthUser, getCurrentUser, signIn, signOut, signUp } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (
    email: string, 
    password: string, 
    userType: 'doctor' | 'patient',
    firstName: string,
    lastName: string
  ) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error checking authentication status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn(email, password);
      
      if (result.success && result.user) {
        setUser(result.user);
        toast({
          title: 'Login successful',
          description: `Welcome back, ${result.user.firstName || 'user'}!`,
        });
        
        // Redirect based on user type
        if (result.user.userType === 'doctor') {
          navigate('/doctor/dashboard');
        } else {
          navigate('/patient/dashboard');
        }
        
        return true;
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password.',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'An error occurred during login.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      toast({ 
        title: 'Logged out', 
        description: 'You have been successfully logged out.' 
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Logout failed',
        description: 'An error occurred during logout.',
        variant: 'destructive',
      });
    }
  };

  const register = async (
    email: string, 
    password: string, 
    userType: 'doctor' | 'patient',
    firstName: string,
    lastName: string
  ) => {
    try {
      const result = await signUp(email, password, userType, firstName, lastName);
      
      if (result.success) {
        toast({
          title: 'Registration successful',
          description: 'Your account has been created. You can now log in.',
        });
        return true;
      } else {
        toast({
          title: 'Registration failed',
          description: 'An error occurred during registration.',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'An error occurred during registration.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
