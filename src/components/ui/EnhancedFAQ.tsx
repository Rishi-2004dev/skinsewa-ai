
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
  categories: string[];
}

const faqItems: FAQItem[] = [
  {
    question: "How can I tell if my skin condition is serious enough to see a doctor?",
    answer: "You should consider seeing a doctor if your skin condition: 1) Is painful or severely itchy, 2) Has sudden onset or rapid spreading, 3) Shows signs of infection like increased redness, warmth, swelling, or pus, 4) Doesn't improve with over-the-counter treatments after 2 weeks, 5) Is accompanied by fever or other systemic symptoms, 6) Affects your daily activities or sleep. While our AI analysis can provide guidance, it's not a substitute for professional medical care when needed.",
    categories: ["medical", "general", "diagnosis"]
  },
  {
    question: "What's the difference between a virtual consultation and an in-person dermatologist visit?",
    answer: "Virtual consultations offer convenience and accessibility but have limitations. In a virtual consultation, dermatologists evaluate visible skin conditions through photos or video, provide general advice, and may prescribe certain medications. In-person visits allow for physical examination, dermoscopy (magnified skin view), biopsies when needed, and immediate procedures or treatments. Our AI analysis is a preliminary tool but doesn't replace either form of professional consultation when needed.",
    categories: ["technology", "consultation", "general"]
  },
  {
    question: "Are AI skin analyses as accurate as professional diagnoses?",
    answer: "AI skin analyses, while increasingly sophisticated, don't match the accuracy of professional dermatologist diagnoses. Our AI tool provides preliminary assessments based on visual patterns and data from thousands of cases. However, dermatologists bring clinical experience, can perform physical examinations, consider your full medical history, order laboratory tests, and perform biopsies when needed. Our AI analysis should be used as a supportive tool to guide you toward appropriate care, not as a definitive diagnosis.",
    categories: ["technology", "AI", "diagnosis"]
  },
  {
    question: "How often should I perform a skin self-examination?",
    answer: "A monthly skin self-examination is recommended for most people. This should involve checking your entire body, including difficult-to-see areas like your back, scalp, and between toes, looking for new growths or changes to existing moles using the ABCDE method (Asymmetry, Border irregularity, Color variations, Diameter larger than 6mm, Evolution/changes). People with higher risk factors like previous skin cancers, family history, or numerous moles should conduct more frequent checks and have regular professional skin exams.",
    categories: ["prevention", "general", "self-care"]
  },
  {
    question: "What information should I prepare before my first dermatology appointment?",
    answer: "Before your first dermatology appointment, prepare: 1) A complete list of your current medications and supplements, 2) Your medical history, including any allergies, 3) Family history of skin conditions or skin cancer, 4) When your skin symptoms began and how they've changed, 5) Treatments you've already tried and their effects, 6) Clear photos of the condition if it changes or comes and goes, 7) Questions you want to ask the dermatologist. Having this information ready will help make your appointment more productive.",
    categories: ["consultation", "preparation", "general"]
  },
  {
    question: "Can certain medications affect my skin condition?",
    answer: "Yes, many medications can affect skin health or cause skin reactions. Common examples include antibiotics that can increase sun sensitivity, blood pressure medications that may cause rashes, corticosteroids that can thin the skin, chemotherapy drugs that often cause various skin reactions, and some psychiatric medications that can trigger photosensitivity or pigmentation changes. Always inform your dermatologist about all medications you're taking, as they may be contributing to your skin issues or may interact with skin treatments.",
    categories: ["medical", "treatment", "medications"]
  },
  {
    question: "How do I know which skin care products are right for my condition?",
    answer: "Finding the right skincare products depends on identifying your skin type (dry, oily, combination, sensitive) and any specific conditions (acne, rosacea, eczema). Look for products formulated for your skin type and concerns, avoid known irritants if you have sensitive skin, start with gentle products and introduce new ones one at a time, and consult a dermatologist for persistent conditions. Our assessment tool can help identify your skin type and recommend appropriate product categories.",
    categories: ["products", "self-care", "treatment"]
  }
];

export function EnhancedFAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const categories = Array.from(
    new Set(faqItems.flatMap(item => item.categories))
  );
  
  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === null || 
      item.categories.includes(activeCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-10">
      <div className="mb-8">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions and answers..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Button 
            variant={activeCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(null)}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      
      {filteredFAQs.length > 0 ? (
        <Accordion type="single" collapsible className="w-full">
          {filteredFAQs.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <div className="pb-4">
                  <p className="text-muted-foreground mb-3">{item.answer}</p>
                  <div className="flex gap-2 flex-wrap">
                    {item.categories.map(category => (
                      <Badge key={category} variant="outline">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-lg font-medium">No matching questions found</p>
          <p className="text-muted-foreground">Try adjusting your search or category selection</p>
        </div>
      )}
    </div>
  );
}
