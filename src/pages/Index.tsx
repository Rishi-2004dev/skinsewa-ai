
import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ConditionsSection } from "@/components/ConditionsSection";
import { ImageUploadCard } from "@/components/ui/ImageUploadCard";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { AnalysisMethodSection } from "@/components/AnalysisMethodSection";
import { Chatbot } from "@/components/ui/Chatbot";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AssessmentForm } from "@/components/ui/AssessmentForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProfilePopover } from "@/components/ProfilePopover";
import { EducationalResources } from "@/components/EducationalResources";
import { BlogTrends } from "@/components/BlogTrends";
import { CommunitySection } from "@/components/CommunitySection";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Enable PostgreSQL extensions for real-time functionality
supabase.channel('my-channel')
  .on('broadcast', { event: 'test' }, payload => console.log('Broadcast received:', payload))
  .subscribe();

export default function Index() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [assessDialogOpen, setAssessDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [profileActiveTab, setProfileActiveTab] = useState("reports");
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const isMobile = useIsMobile();
  const lastScrollTop = useRef(0);
  const scrollButtonRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);

  // Listen for custom events to open the profile popover
  useEffect(() => {
    const handleOpenProfilePopover = (e: any) => {
      if (e.detail && e.detail.activeTab) {
        setProfileActiveTab(e.detail.activeTab);
      }
      setProfileDialogOpen(true);
    };

    document.addEventListener('openProfilePopover', handleOpenProfilePopover);
    
    // Show/hide scroll to top button
    const handleScroll = () => {
      const st = window.scrollY;
      
      if (st > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
      
      lastScrollTop.current = st <= 0 ? 0 : st;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Position the scroll to top button to align with chatbot
    const positionScrollButton = () => {
      if (scrollButtonRef.current && chatbotRef.current) {
        const chatbotRect = chatbotRef.current.getBoundingClientRect();
        scrollButtonRef.current.style.bottom = `${chatbotRect.height + 20}px`;
        scrollButtonRef.current.style.right = isMobile ? '20px' : '32px';
      }
    };
    
    window.addEventListener('resize', positionScrollButton);
    setTimeout(positionScrollButton, 500); // Ensure components are rendered
    
    return () => {
      document.removeEventListener('openProfilePopover', handleOpenProfilePopover);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', positionScrollButton);
    };
  }, [isMobile]);
  
  // Function to scroll back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 overflow-x-hidden">
        <HeroSection 
          onUploadClick={() => setUploadDialogOpen(true)} 
          onAssessClick={() => setAssessDialogOpen(true)} 
        />
        
        <div id="education-section" className="container mx-auto px-4 pt-16 scroll-mt-20">
          <EducationalResources />
        </div>
        <div className="pt-10">
          <ConditionsSection />
        </div>
        <div className="container mx-auto px-4 pt-10 blog-trends">
          <BlogTrends />
        </div>
        <AnalysisMethodSection />
        <div className="container mx-auto px-4 pt-10 community-section">
          <CommunitySection />
        </div>
        <div className="py-16 testimonials-section">
          <TestimonialsSection />
        </div>
      </main>
      <Footer />
      
      <div ref={chatbotRef}>
        <Chatbot />
      </div>
      
      {showScrollToTop && (
        <div 
          ref={scrollButtonRef}
          className="fixed z-10 animate-fade-in cursor-pointer"
          onClick={scrollToTop}
        >
          <Button size="icon" variant="outline" className="rounded-full h-12 w-12 border-skinsewa-blue bg-white shadow-lg hover:bg-skinsewa-blue/10">
            <ArrowUp className="h-6 w-6 text-skinsewa-blue" />
          </Button>
        </div>
      )}
      
      <ImageUploadCard 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen} 
      />
      <Dialog open={assessDialogOpen} onOpenChange={setAssessDialogOpen}>
        <DialogContent className="max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Assess Your Skin</h2>
          <AssessmentForm onSubmit={() => setAssessDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      <ProfilePopover 
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
        initialTab={profileActiveTab}
      />
    </div>
  );
}
