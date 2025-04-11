
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType: 'doctor' | 'patient';
}

const ProtectedRoute = ({ children, requiredUserType }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  
  // Show loading state or spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-medical-500"></div>
      </div>
    );
  }
  
  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/" />;
  }
  
  // If user type doesn't match the required type, redirect to appropriate dashboard
  if (user.userType !== requiredUserType) {
    if (user.userType === 'doctor') {
      return <Navigate to="/doctor/dashboard" />;
    } else {
      return <Navigate to="/patient/dashboard" />;
    }
  }
  
  // If user is authenticated and has the right user type, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
