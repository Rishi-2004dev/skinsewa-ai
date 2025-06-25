import { useState, useEffect } from "react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { ClinicLogin } from "@/components/admin/ClinicLogin";
import { LoginSelector } from "@/components/admin/LoginSelector";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { ClinicDashboard } from "@/components/admin/ClinicDashboard";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ClinicRegistration } from "@/components/admin/ClinicRegistration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useSearchParams } from "react-router-dom";
import { Menu, Shield, X, Home, FileText, Users, Settings, UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon } from "lucide-react";
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface CredentialsDialogProps {
  open: boolean;
  onClose: () => void;
  credentials: {
    username: string;
    password: string;
  } | null;
}

function CredentialsDialog({ open, onClose, credentials }: CredentialsDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!credentials) return;
    
    const text = `Username: ${credentials.username}\nPassword: ${credentials.password}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your Login Credentials</DialogTitle>
          <DialogDescription>
            Please save these credentials. You'll need them to access your clinic dashboard.
          </DialogDescription>
        </DialogHeader>
        {credentials && (
          <div className="p-4 bg-muted rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Username:</span>
              <span className="text-skinsewa-blue">{credentials.username}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Password:</span>
              <span className="text-skinsewa-blue">{credentials.password}</span>
            </div>
          </div>
        )}
        <DialogFooter className="sm:justify-end">
          <Button 
            variant="outline" 
            onClick={handleCopy}
            className="flex items-center gap-1"
          >
            {copied ? (
              <>
                <CheckIcon className="h-4 w-4" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <CopyIcon className="h-4 w-4" />
                <span>Copy Credentials</span>
              </>
            )}
          </Button>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function Admin() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState("AIzaSyAORpqSMtL-I3QHHJlActTKiRE2Z79B56Y");
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showCredentials, setShowCredentials] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState<{username: string, password: string} | null>(null);
  const [userType, setUserType] = useState<"admin" | "clinic" | null>(null);
  const [searchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Check if already authenticated
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const clinicToken = localStorage.getItem('clinicToken');
    
    if (adminToken) {
      setIsAuthenticated(true);
      setUserType("admin");
    } else if (clinicToken) {
      setIsAuthenticated(true);
      setUserType("clinic");
    }
    
    // Check for tab parameter in URL
    const tab = searchParams.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    }
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, [searchParams]);

  const handleAdminLogin = (credentials: { username: string; password: string }) => {
    // Mock validation for admin
    if (credentials.username === "admin" && credentials.password === "admin123") {
      localStorage.setItem('adminToken', 'mock-admin-token');
      localStorage.setItem('geminiApiKey', apiKey);
      
      toast({
        title: "Admin login successful",
        description: "Welcome to the admin dashboard"
      });
      
      setIsAuthenticated(true);
      setUserType("admin");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
    }
  };
  
  const handleClinicLogin = (credentials: { username: string; password: string }) => {
    // Mock validation for clinic - in a real app, this would check against registered clinics
    // For demo, we'll accept any credentials that match clinic_ pattern
    if (credentials.username.startsWith("clinic_") || credentials.username === generatedCredentials?.username) {
      localStorage.setItem('clinicToken', 'mock-clinic-token');
      
      toast({
        title: "Clinic login successful",
        description: "Welcome to your clinic dashboard"
      });
      
      setIsAuthenticated(true);
      setUserType("clinic");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid clinic credentials",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    if (userType === "admin") {
      localStorage.removeItem('adminToken');
    } else {
      localStorage.removeItem('clinicToken');
    }
    
    setIsAuthenticated(false);
    setUserType(null);
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
  };

  const handleClinicRegistration = (clinicData: any) => {
    // Generate simple credentials for the clinic
    const clinicUsername = clinicData.clinicName.toLowerCase().replace(/\s+/g, '_').substring(0, 10);
    const clinicPassword = `skin${Math.floor(1000 + Math.random() * 9000)}`; // generates "skin" + 4 digit number
    
    // In a real app, this would send the data to a backend API for verification
    console.log("Clinic registration data:", clinicData);
    console.log("Generated credentials:", { username: clinicUsername, password: clinicPassword });
    
    // Set credentials and show dialog
    setGeneratedCredentials({
      username: clinicUsername,
      password: clinicPassword
    });
    setShowCredentials(true);
    
    toast({
      title: "Registration successful",
      description: "Your clinic has been registered successfully."
    });
  };

  // Render header only when authenticated
  const renderHeader = () => {
    if (!isAuthenticated) return null;
    
    return (
      <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-900 shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex gap-6 md:gap-10 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-skinsewa-pink"
              >
                <path d="M12 21a9 9 0 0 0 0-18 9 9 0 0 0 0 18Z" />
                <path d="m12 3 2 4h-4l2-4Z" />
                <path d="m12 21-2-4h4l-2 4Z" />
                <path d="M3 12h4l-4 2Z" />
                <path d="M21 12h-4l4 2Z" />
              </svg>
              <span className="inline-block font-bold">
                SkinSewa {userType === "admin" ? "Admin" : "Clinic"}
              </span>
            </Link>
            {/* Only show nav links on larger screens, not on mobile since we have the hamburger menu */}
            <nav className="hidden md:flex gap-6">
              <Link 
                to="/" 
                className="group text-sm font-medium transition-colors relative"
              >
                Home
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-skinsewa-pink group-hover:w-full transition-all"></span>
              </Link>
              <Link 
                to="/conditions" 
                className="group text-sm font-medium transition-colors relative"
              >
                Conditions
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-skinsewa-pink group-hover:w-full transition-all"></span>
              </Link>
              <Link 
                to="/contact" 
                className="group text-sm font-medium transition-colors relative"
              >
                Contact
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-skinsewa-pink group-hover:w-full transition-all"></span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-skinsewa-darkblue dark:text-gray-200" />
            <span className="hidden sm:inline-block text-sm font-medium">
              {userType === "admin" ? "Admin Portal" : "Clinic Portal"}
            </span>
            <ThemeToggle />
            {isAuthenticated && (
              <button 
                onClick={handleLogout} 
                className="text-sm font-medium text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Sheet for Admin */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="right" className="w-3/4 pt-12">
            <div className="flex flex-col gap-6 text-center">
              <SheetClose asChild>
                <Link 
                  to="/" 
                  className="text-lg font-medium py-2 hover:bg-muted rounded-md flex items-center justify-center gap-2"
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link 
                  to="/conditions" 
                  className="text-lg font-medium py-2 hover:bg-muted rounded-md flex items-center justify-center gap-2"
                >
                  <FileText className="h-5 w-5" />
                  Conditions
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link 
                  to="/contact" 
                  className="text-lg font-medium py-2 hover:bg-muted rounded-md flex items-center justify-center gap-2"
                >
                  <Users className="h-5 w-5" />
                  Contact
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link 
                  to="/admin" 
                  className="text-lg font-medium py-2 hover:bg-muted rounded-md flex items-center justify-center gap-2"
                >
                  <Shield className="h-5 w-5" />
                  Admin Panel
                </Link>
              </SheetClose>
              <div className="border-t border-border my-2"></div>
              {isAuthenticated && (
                <SheetClose asChild>
                  <button 
                    onClick={handleLogout} 
                    className="text-lg font-medium py-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-md flex items-center justify-center gap-2"
                  >
                    <Settings className="h-5 w-5" />
                    Logout
                  </button>
                </SheetClose>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </header>
    );
  };
  
  const renderContent = () => {
    if (isAuthenticated) {
      return userType === "admin" 
        ? <AdminDashboard onLogout={handleLogout} /> 
        : <ClinicDashboard onLogout={handleLogout} />;
    }
    
    if (activeTab === "register") {
      return (
        <div className="w-full max-w-5xl mx-auto px-4">
          <ClinicRegistration onSubmit={handleClinicRegistration} />
        </div>
      );
    }
    
    if (!userType) {
      return <LoginSelector onSelect={setUserType} />;
    }
    
    return userType === "admin"
      ? <AdminLogin onLogin={handleAdminLogin} onBack={() => setUserType(null)} />
      : <ClinicLogin onLogin={handleClinicLogin} onBack={() => setUserType(null)} />;
  };

  return (
    <div className="min-h-screen w-full bg-background">
      {renderHeader()}
      
      <div className="flex-1">
        {activeTab === "register" && !isAuthenticated ? (
          <div className="flex min-h-screen flex-col">
            <div className="container py-8">
              <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <h1 className="text-2xl md:text-3xl font-bold">Clinic Registration</h1>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setActiveTab("login");
                      setUserType(null);
                    }}
                    className="text-sm"
                  >
                    Back to Login
                  </Button>
                  <ThemeToggle />
                </div>
              </div>
              
              {renderContent()}
            </div>
          </div>
        ) : (
          renderContent()
        )}
      </div>
      
      <CredentialsDialog 
        open={showCredentials}
        onClose={() => setShowCredentials(false)}
        credentials={generatedCredentials}
      />
    </div>
  );
}
