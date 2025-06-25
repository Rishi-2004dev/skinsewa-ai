
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Upload, ArrowDown } from "lucide-react";

interface HeroSectionProps {
  onAssessClick: () => void;
  onUploadClick: () => void;
}

export function HeroSection({ onAssessClick, onUploadClick }: HeroSectionProps) {
  const { t } = useLanguage();

  // Function to scroll to content
  const scrollToContent = () => {
    const educationSection = document.getElementById('education-section');
    if (educationSection) {
      educationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full h-[100vh] py-20 md:py-32 lg:py-36 bg-hero-gradient dark:bg-gradient-to-b dark:from-skinsewa-darkblue dark:to-gray-900 flex items-center relative">
      <div className="container px-4 md:px-6 animate-fade-in">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-skinsewa-darkblue dark:text-white">
            {t("site.tagline")}
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-300 md:text-xl">
            {t("site.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
            <Button 
              onClick={onAssessClick}
              className="bg-skinsewa-pink hover:bg-skinsewa-pink/90 text-white px-8 py-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-5 w-5"
              >
                <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path>
                <path d="M9 9h1"></path>
                <path d="M9 13h6"></path>
                <path d="M9 17h6"></path>
              </svg>
              {t("button.assess")}
            </Button>
            <Button 
              onClick={onUploadClick}
              variant="outline" 
              className="border-skinsewa-blue text-skinsewa-blue hover:bg-skinsewa-blue/10 px-8 py-6"
            >
              <Upload className="mr-2 h-5 w-5" />
              {t("button.upload")}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Updated scroll hint positioned at the bottom of the screen with margin */}
      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center animate-bounce cursor-pointer" onClick={scrollToContent}>
        <p className="text-base font-medium bg-white/90 dark:bg-gray-800/90 p-3 px-4 rounded-full shadow-lg text-skinsewa-blue dark:text-white mb-3">
          Scroll for more content
        </p>
        <Button size="icon" variant="outline" className="rounded-full h-14 w-14 border-skinsewa-blue shadow-md">
          <ArrowDown className="h-8 w-8 text-skinsewa-blue" />
        </Button>
      </div>
    </section>
  );
}
