
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  FileText, 
  Bell, 
  Settings, 
  Menu, 
  X, 
  LogOut, 
  Moon, 
  Sun 
} from "lucide-react";

type MainLayoutProps = {
  children: React.ReactNode;
  userType: "doctor" | "patient";
};

export default function MainLayout({ children, userType }: MainLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const doctorNavItems = [
    { name: "Dashboard", path: "/doctor/dashboard", icon: <Home size={20} /> },
    { name: "Patients", path: "/doctor/patients", icon: <Users size={20} /> },
    { name: "Reports", path: "/doctor/reports", icon: <FileText size={20} /> },
    { name: "Alerts", path: "/doctor/alerts", icon: <Bell size={20} /> },
    { name: "Settings", path: "/doctor/settings", icon: <Settings size={20} /> },
  ];

  const patientNavItems = [
    { name: "Dashboard", path: "/patient/dashboard", icon: <Home size={20} /> },
    { name: "Symptoms", path: "/patient/symptoms", icon: <FileText size={20} /> },
    { name: "Medications", path: "/patient/medications", icon: <FileText size={20} /> },
    { name: "Assessments", path: "/patient/assessments", icon: <FileText size={20} /> },
    { name: "Settings", path: "/patient/settings", icon: <Settings size={20} /> },
  ];

  const navItems = userType === "doctor" ? doctorNavItems : patientNavItems;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 pt-5 overflow-y-auto shadow-sm">
          <div className="flex items-center justify-center px-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-medical-500 rounded-full flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5 text-white"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Swasthya Sathi</h1>
            </div>
          </div>
          <div className="mt-8 flex-grow px-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-4 py-3 rounded-lg text-sm font-medium
                  ${
                    location.pathname === item.path
                      ? "bg-medical-100 dark:bg-medical-900/30 text-medical-700 dark:text-medical-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <Button 
              variant="ghost" 
              className="flex items-center w-full justify-start text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={() => window.location.href = "/"}
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="mt-2"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? (
                <Sun size={18} className="text-yellow-500" />
              ) : (
                <Moon size={18} />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden fixed w-full bg-white dark:bg-gray-800 z-10 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-medical-500 rounded-full flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5 text-white"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Swasthya Sathi</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium
                  ${
                    location.pathname === item.path
                      ? "bg-medical-100 dark:bg-medical-900/30 text-medical-700 dark:text-medical-300"
                      : "text-gray-700 dark:text-gray-300"
                  }
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            <button
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-500"
              onClick={() => window.location.href = "/"}
            >
              <LogOut size={18} className="mr-3" />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="md:ml-64 flex-1">
        <main className="py-6 md:py-12 px-4 sm:px-6 md:px-8 mt-14 md:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
