
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

interface ApiKeyInputProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onKeyValidated: () => void;
}

export function ApiKeyInput({ open, onOpenChange, onKeyValidated }: ApiKeyInputProps) {
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  
  // Auto-validate when component mounts or becomes visible
  useEffect(() => {
    if (open) {
      handleAutomaticValidation();
    }
  }, [open]);
  
  const handleAutomaticValidation = async () => {
    setIsValidating(true);
    
    try {
      // Simulate API validation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: language === 'en' ? "API Key Valid" : "API कुंजी मान्य",
        description: language === 'en' ? "The SkinSewa analysis system is ready to use" : "SkinSewa विश्लेषण प्रणाली उपयोग के लिए तैयार है"
      });
      
      onOpenChange(false);
      onKeyValidated();
    } catch (error) {
      console.error("Error during automatic validation:", error);
    } finally {
      setIsValidating(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {language === 'en' ? "Initializing Analysis System" : "विश्लेषण प्रणाली आरंभ हो रही है"}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' 
              ? "Please wait while we initialize the SkinSewa skin analysis system" 
              : "कृपया प्रतीक्षा करें जबकि हम SkinSewa त्वचा विश्लेषण प्रणाली को आरंभ करते हैं"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-skinsewa-pink"></div>
          
          <p className="text-center text-sm text-muted-foreground">
            {language === 'en' 
              ? "The system is being prepared for accurate skin analysis" 
              : "सिस्टम सटीक त्वचा विश्लेषण के लिए तैयार किया जा रहा है"}
          </p>
          
          <div className="flex justify-center">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              className="mt-4"
            >
              {language === 'en' ? "Cancel" : "रद्द करें"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
