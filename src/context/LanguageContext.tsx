
import React, { createContext, useContext, useState } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "site.name": "SkinSewa",
    "site.tagline": "Understand Your Skin Better with AI",
    "site.description": "Get a preliminary analysis by answering questions or uploading an image.",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.conditions": "Skin Conditions",
    "nav.contact": "Contact",
    "button.assess": "Assess Your Skin",
    "button.upload": "Upload Image",
    "button.save": "Save",
    "section.conditions.title": "Common Conditions We Analyze",
    "section.conditions.description": "Our AI provides preliminary insights based on common skin conditions.",
    "section.conditions.learnMore": "Learn more",
    "form.name": "Full Name",
    "form.age": "Age",
    "form.complexion": "Skin Complexion",
    "form.products": "Products Currently Using",
    "form.symptoms": "Symptoms You're Experiencing",
    "form.saved": "Assessment Saved",
    "form.saved.description": "Your assessment details have been recorded.",
    "footer.rights": "All rights reserved",
  },
  hi: {
    "site.name": "स्किनसेवा",
    "site.tagline": "AI के साथ अपनी त्वचा को बेहतर ढंग से समझें",
    "site.description": "प्रश्नों का उत्तर देकर या छवि अपलोड करके प्रारंभिक विश्लेषण प्राप्त करें।",
    "nav.home": "होम",
    "nav.about": "हमारे बारे में",
    "nav.conditions": "त्वचा की स्थिति",
    "nav.contact": "संपर्क करें",
    "button.assess": "अपनी त्वचा का आकलन करें",
    "button.upload": "छवि अपलोड करें",
    "button.save": "सहेजें",
    "section.conditions.title": "सामान्य स्थितियाँ जिनका हम विश्लेषण करते हैं",
    "section.conditions.description": "हमारा AI सामान्य त्वचा की स्थितियों के आधार पर प्रारंभिक अंतर्दृष्टि प्रदान करता है।",
    "section.conditions.learnMore": "अधिक जानें",
    "form.name": "पूरा नाम",
    "form.age": "उम्र",
    "form.complexion": "त्वचा का रंग",
    "form.products": "वर्तमान में उपयोग किए जा रहे उत्पाद",
    "form.symptoms": "आप जिन लक्षणों का अनुभव कर रहे हैं",
    "form.saved": "आकलन सहेजा गया",
    "form.saved.description": "आपके आकलन का विवरण दर्ज कर लिया गया है।",
    "footer.rights": "सर्वाधिकार सुरक्षित",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "hi" : "en"));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
