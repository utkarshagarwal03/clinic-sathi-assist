
import AuthForm from "@/components/auth/AuthForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <AuthForm />
        
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Swasthya Sathi is a healthcare application for doctors and patients in India.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
