
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ProfilePopover } from "@/components/ProfilePopover";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Menu, Shield, X, Home, FileText, Users, MessageSquare, BookOpen, HelpCircle, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function Header() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Add scroll event to change header style when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled 
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      }`}
    >
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
            <span className="inline-block font-bold">SkinSewa</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link 
              to="/" 
              className="group text-sm font-medium transition-colors relative"
              aria-current="page"
            >
              {t("nav.home")}
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-skinsewa-pink group-hover:w-full transition-all"></span>
            </Link>
            
            {/* Desktop Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="group text-sm font-medium transition-colors relative flex items-center gap-1">
                  Resources
                  <ChevronDown className="h-4 w-4" />
                  <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-skinsewa-pink group-hover:w-full transition-all"></span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px] bg-white dark:bg-gray-800">
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center gap-2" onClick={() => {
                    const section = document.getElementById('education-section');
                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <BookOpen className="h-4 w-4" />
                    Educational Resources
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center gap-2" onClick={() => {
                    const section = document.querySelector('.community-section');
                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <MessageSquare className="h-4 w-4" />
                    Community Forum
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center gap-2" onClick={() => {
                    const section = document.querySelector('.blog-trends');
                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <FileText className="h-4 w-4" />
                    Blog & Articles
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center gap-2" onClick={() => {
                    const section = document.querySelector('.testimonials-section');
                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <Users className="h-4 w-4" />
                    Testimonials
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/faq" className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    FAQ
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              to="/conditions" 
              className="group text-sm font-medium transition-colors relative"
            >
              {t("nav.conditions")}
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-skinsewa-pink group-hover:w-full transition-all"></span>
            </Link>
            <Link 
              to="/contact" 
              className="group text-sm font-medium transition-colors relative"
            >
              {t("nav.contact")}
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-skinsewa-pink group-hover:w-full transition-all"></span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {!isMobile && (
            <Link to="/admin">
              <Button variant="ghost" size="icon" className="relative" title="Admin Panel">
                <Shield className="h-5 w-5 text-skinsewa-darkblue dark:text-gray-200" />
              </Button>
            </Link>
          )}
          <LanguageToggle />
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setProfileOpen(true)} 
            className="relative"
            aria-label="Open profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <ProfilePopover 
            open={profileOpen} 
            onOpenChange={setProfileOpen}
          />
        </div>
      </div>
      
      {/* Mobile Navigation Sheet with icons */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" className="w-3/4 pt-12">
          <div className="flex flex-col gap-6 text-left">
            <SheetClose asChild>
              <Link 
                to="/" 
                className="text-lg font-medium py-2 hover:bg-muted rounded-md flex items-center gap-2"
              >
                <Home className="h-5 w-5" />
                {t("nav.home")}
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link 
                to="/conditions" 
                className="text-lg font-medium py-2 hover:bg-muted rounded-md flex items-center gap-2"
              >
                <FileText className="h-5 w-5" />
                {t("nav.conditions")}
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link 
                to="/contact" 
                className="text-lg font-medium py-2 hover:bg-muted rounded-md flex items-center gap-2"
              >
                <Users className="h-5 w-5" />
                {t("nav.contact")}
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link 
                to="/" 
                className="text-lg font-medium py-2 hover:bg-muted rounded-md flex items-center gap-2"
                onClick={() => {
                  setTimeout(() => {
                    const section = document.getElementById('education-section');
                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                <BookOpen className="h-5 w-5" />
                Educational Resources
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link 
                to="/" 
                className="text-lg font-medium py-2 hover:bg-muted rounded-md flex items-center gap-2"
                onClick={() => {
                  setTimeout(() => {
                    const section = document.querySelector('.community-section');
                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                <MessageSquare className="h-5 w-5" />
                Community Forum
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link 
                to="/faq" 
                className="text-lg font-medium py-2 hover:bg-muted rounded-md flex items-center gap-2"
              >
                <HelpCircle className="h-5 w-5" />
                FAQ
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link 
                to="/admin" 
                className="text-lg font-medium py-2 hover:bg-muted rounded-md flex items-center gap-2"
              >
                <Shield className="h-5 w-5" />
                Admin Panel
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
