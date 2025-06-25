
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, FileText, Video, BookOpen, AlertCircle, Download, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HealthGuideProps {
  title: string;
  description: string;
  items: string[];
  type: 'checklist' | 'guide' | 'warning';
  onViewFull: () => void;
}

const HealthGuide = ({ title, description, items, type, onViewFull }: HealthGuideProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant={type === 'warning' ? 'destructive' : 'outline'}>
            {type === 'checklist' ? 'Checklist' : type === 'guide' ? 'Guide' : 'Warning'}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              {type === 'checklist' ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              ) : type === 'warning' ? (
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              ) : (
                <div className="h-5 w-5 bg-primary/20 rounded-full text-xs flex items-center justify-center text-primary font-medium mt-0.5">
                  {index + 1}
                </div>
              )}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={onViewFull}>
          View Full {type === 'checklist' ? 'Checklist' : 'Guide'}
        </Button>
      </CardFooter>
    </Card>
  );
};

interface Resource {
  id: number;
  title: string;
  type: string;
  duration: string;
  tags: string[];
  content?: string;
  downloadUrl?: string;
  videoUrl?: string;
}

export function EducationalResources() {
  const [activeTab, setActiveTab] = useState("guides");
  const [selectedGuide, setSelectedGuide] = useState<{title: string, content: string[], type: string} | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [resourceDialogOpen, setResourceDialogOpen] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);

  const skinCareChecklist = [
    "Wash your face twice daily with a gentle cleanser",
    "Apply sunscreen with SPF 30+ every morning",
    "Moisturize skin after washing",
    "Avoid touching your face throughout the day",
    "Perform a weekly skin self-examination"
  ];

  const acnePreventionGuide = [
    "Use non-comedogenic skincare and makeup products",
    "Change pillowcases at least once a week",
    "Avoid consuming high-glycemic foods",
    "Manage stress through exercise and meditation",
    "Clean phones, glasses, and other items that touch your face"
  ];

  const skinWarnings = [
    "Seek medical attention for moles that change shape, size, or color",
    "Avoid UV exposure during peak hours (10 AM - 4 PM)",
    "Don't pick or squeeze skin lesions or acne",
    "Discontinue products that cause irritation or rash",
    "Watch for signs of infection after skin treatments"
  ];

  const resources: Resource[] = [
    {
      id: 1,
      title: "Understanding Skin Conditions",
      type: "video",
      duration: "12 min",
      tags: ["educational", "overview"],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Example URL
    },
    {
      id: 2,
      title: "Guide to Daily Skincare Routine",
      type: "article",
      duration: "5 min read",
      tags: ["guide", "routine"],
      content: "# Daily Skincare Routine\n\nA proper skincare routine is essential for maintaining healthy skin regardless of your skin type. Below is a comprehensive guide to establishing an effective daily regimen.\n\n## Morning Routine\n\n1. **Cleanse**: Start with a gentle cleanser appropriate for your skin type to remove oils that accumulated overnight.\n\n2. **Tone**: Apply a toner to restore your skin's pH balance and prepare it for subsequent products.\n\n3. **Treatment**: Apply any serums or treatments targeting specific concerns (e.g., vitamin C for brightening).\n\n4. **Moisturize**: Use a moisturizer suitable for your skin type to keep skin hydrated throughout the day.\n\n5. **Sunscreen**: Apply broad-spectrum SPF 30+ sunscreen to protect against UV damage (the most crucial anti-aging step).\n\n## Evening Routine\n\n1. **Double Cleanse**: Begin with an oil-based cleanser to remove makeup and sunscreen, followed by a water-based cleanser.\n\n2. **Exfoliate**: Use chemical exfoliants (AHAs/BHAs) 2-3 times weekly to remove dead skin cells (avoid daily use).\n\n3. **Treatment**: Apply serums containing active ingredients like retinoids, peptides, or niacinamide.\n\n4. **Eye Cream**: Gently apply eye cream to address concerns like dark circles or fine lines.\n\n5. **Moisturize**: Use a slightly richer night cream or moisturizer to repair and hydrate skin overnight.\n\n## Tips for Success\n\n- **Consistency is key**: Results come from regular application over time.\n- **Introduce new products gradually**: Add one new product at a time to identify any adverse reactions.\n- **Adjust seasonally**: Your skin needs different levels of hydration throughout the year.\n- **Listen to your skin**: Adjust your routine based on how your skin responds and feels."
    },
    {
      id: 3,
      title: "Recognizing Skin Cancer Signs",
      type: "pdf",
      duration: "8 pages",
      tags: ["medical", "prevention"],
      downloadUrl: "#" // This would be replaced with an actual PDF download link
    },
    {
      id: 4,
      title: "Nutrition and Skin Health",
      type: "article",
      duration: "7 min read",
      tags: ["nutrition", "wellness"],
      content: "# Nutrition and Skin Health\n\nThe connection between diet and skin health is increasingly supported by scientific research. What you eat can significantly impact your skin's appearance, aging process, and resilience against environmental stressors.\n\n## Key Nutrients for Healthy Skin\n\n### Antioxidants\n- **Vitamin C**: Essential for collagen production; found in citrus fruits, strawberries, and bell peppers\n- **Vitamin E**: Protects cell membranes; abundant in nuts, seeds, and vegetable oils\n- **Beta-carotene**: Converted to vitamin A in the body; found in orange and dark green vegetables\n\n### Essential Fatty Acids\n- **Omega-3 fatty acids**: Maintain skin membrane health and reduce inflammation; found in fatty fish, flaxseeds, and walnuts\n- **Omega-6 fatty acids**: Support skin barrier function; found in vegetable oils, nuts, and seeds\n\n### Proteins\n- Amino acids from protein sources are the building blocks for collagen and elastin\n- Quality protein sources include lean meats, fish, legumes, and tofu\n\n### Hydration\n- Adequate water intake helps maintain skin moisture and flush toxins\n- Aim for 8-10 glasses of water daily, adjusting for activity level and climate\n\n## Foods to Limit for Skin Health\n\n- **High-glycemic foods**: Refined carbohydrates and sugars can trigger inflammation and acne\n- **Excessive dairy**: May contribute to acne in some individuals due to hormonal components\n- **Trans fats**: Can promote inflammation and damage cell structures\n- **Alcohol**: Causes dehydration and can deplete nutrients needed for skin health\n\n## Beneficial Eating Patterns\n\nResearch suggests that Mediterranean-style diets rich in fruits, vegetables, whole grains, olive oil, and fish correlate with fewer signs of photoaging and better overall skin health.\n\nIntermittent fasting and caloric restriction (when appropriate and medically supervised) may promote cellular repair mechanisms that benefit skin health through processes like autophagy.\n\nRemember that dietary changes typically take 4-6 weeks to show visible effects on the skin, so consistency and patience are essential."
    }
  ];

  const fullSkinCareChecklist = [
    ...skinCareChecklist,
    "Exfoliate 2-3 times per week to remove dead skin cells",
    "Use a face mask appropriate for your skin type weekly",
    "Apply eye cream nightly to prevent fine lines and dark circles",
    "Stay hydrated by drinking at least 8 glasses of water daily",
    "Eat a balanced diet rich in antioxidants and omega-3 fatty acids",
    "Avoid smoking and excessive alcohol consumption",
    "Clean makeup brushes and tools regularly",
    "Replace pillowcases at least once a week",
    "Avoid hot water when washing your face as it strips natural oils",
    "Consult a dermatologist annually for a professional skin check"
  ];

  const fullAcnePreventionGuide = [
    ...acnePreventionGuide,
    "Use oil-free and water-based cosmetics labeled 'non-comedogenic'",
    "Apply spot treatments containing salicylic acid or benzoyl peroxide",
    "Consider using retinoids if recommended by a dermatologist",
    "Avoid dairy and high-glycemic foods which may trigger breakouts",
    "Remove makeup completely before sleeping",
    "Shower after sweating heavily, especially after workouts",
    "Avoid hair products that contain oils and can transfer to your face",
    "Don't pick, pop, or squeeze pimples which can cause scarring",
    "Use a fresh towel to dry your face after washing",
    "Consider blue light therapy for moderate acne cases"
  ];

  const fullSkinWarnings = [
    ...skinWarnings,
    "Be alert for persistent skin changes that don't heal within 3 weeks",
    "Monitor changes in existing moles using the ABCDE rule (Asymmetry, Border, Color, Diameter, Evolving)",
    "Seek immediate medical attention for rapidly spreading rashes",
    "Be cautious with DIY treatments found online without dermatologist approval",
    "Watch for allergic reactions when trying new skincare products",
    "Don't ignore persistent itching, burning, or pain in the skin",
    "Be vigilant about sunburn prevention, especially for children",
    "Avoid tanning beds completely - they significantly increase skin cancer risk",
    "Check medication side effects that might impact your skin",
    "Never ignore unusual growths or lesions on mucous membranes"
  ];

  const handleViewFullGuide = (type: string) => {
    if (type === 'checklist') {
      setSelectedGuide({
        title: "Daily Skin Care Checklist",
        content: fullSkinCareChecklist,
        type: "checklist"
      });
    } else if (type === 'guide') {
      setSelectedGuide({
        title: "Acne Prevention Guide",
        content: fullAcnePreventionGuide,
        type: "guide"
      });
    } else if (type === 'warning') {
      setSelectedGuide({
        title: "Skin Warning Signs",
        content: fullSkinWarnings,
        type: "warning"
      });
    }
    setDialogOpen(true);
  };

  const handleViewResource = (resource: Resource) => {
    setSelectedResource(resource);
    setResourceDialogOpen(true);
  };

  const handleDownloadTemplate = () => {
    setTemplateDialogOpen(true);
  };

  return (
    <div className="py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-skinsewa-blue mb-2">Health Resources</h2>
        <p className="text-muted-foreground">Educational guides and tools to help you maintain healthy skin.</p>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 w-full grid grid-cols-3">
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="checklists">Checklists</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="guides" className="space-y-4">
          <HealthGuide 
            title="Acne Prevention Guide"
            description="Follow these steps to prevent acne breakouts"
            items={acnePreventionGuide}
            type="guide"
            onViewFull={() => handleViewFullGuide('guide')}
          />
          <HealthGuide 
            title="Skin Warning Signs"
            description="Important warning signs you shouldn't ignore"
            items={skinWarnings}
            type="warning"
            onViewFull={() => handleViewFullGuide('warning')}
          />
        </TabsContent>
        
        <TabsContent value="checklists" className="space-y-4">
          <HealthGuide 
            title="Daily Skin Care Checklist"
            description="Essential steps for daily skin maintenance"
            items={skinCareChecklist}
            type="checklist"
            onViewFull={() => handleViewFullGuide('checklist')}
          />
          <Card>
            <CardHeader>
              <CardTitle>Track Your Progress</CardTitle>
              <CardDescription>
                Download our skin care tracking app to monitor your progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Button className="w-full" onClick={handleDownloadTemplate}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Tracking Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4">
            {resources.map((resource) => (
              <Card key={resource.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      {resource.type === "video" ? (
                        <Video className="h-6 w-6 text-primary" />
                      ) : resource.type === "pdf" ? (
                        <FileText className="h-6 w-6 text-primary" />
                      ) : (
                        <BookOpen className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{resource.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{resource.type}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{resource.duration}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleViewResource(resource)}>
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Full Guide Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedGuide?.title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              {selectedGuide?.content.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  {selectedGuide.type === 'checklist' ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : selectedGuide.type === 'warning' ? (
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  ) : (
                    <div className="h-5 w-5 bg-primary/20 rounded-full text-xs flex items-center justify-center text-primary font-medium mt-0.5">
                      {index + 1}
                    </div>
                  )}
                  <div>
                    <p className="text-base">{item}</p>
                    {index < 5 && 
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedGuide.type === 'checklist' 
                          ? "Track this habit daily for best results." 
                          : selectedGuide.type === 'warning'
                          ? "Contact a dermatologist if you notice this sign."
                          : "Implement this practice consistently for optimal results."}
                      </p>
                    }
                  </div>
                </div>
              ))}

              <div className="pt-4 mt-6 border-t">
                <h3 className="font-bold text-lg mb-2">Additional Resources</h3>
                <p className="mb-4">For more detailed information on this topic, you may find these resources helpful:</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Download PDF Guide
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Video className="h-4 w-4" />
                    Watch Video Tutorial
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Visit Educational Portal
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Resource Dialog */}
      <Dialog open={resourceDialogOpen} onOpenChange={setResourceDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{selectedResource?.title}</DialogTitle>
          </DialogHeader>
          {selectedResource?.type === "video" && selectedResource.videoUrl && (
            <div className="aspect-video w-full">
              <iframe
                src={selectedResource.videoUrl}
                className="w-full h-full rounded-md"
                allowFullScreen
                title={selectedResource.title}
              ></iframe>
            </div>
          )}
          {selectedResource?.type === "article" && selectedResource.content && (
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4">
                {selectedResource.content.split('\n\n').map((paragraph, idx) => (
                  <div key={idx}>
                    {paragraph.startsWith('# ') ? (
                      <h2 className="text-2xl font-bold">{paragraph.replace('# ', '')}</h2>
                    ) : paragraph.startsWith('## ') ? (
                      <h3 className="text-xl font-semibold mt-6">{paragraph.replace('## ', '')}</h3>
                    ) : paragraph.startsWith('### ') ? (
                      <h4 className="text-lg font-medium mt-4">{paragraph.replace('### ', '')}</h4>
                    ) : paragraph.startsWith('- ') ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {paragraph.split('\n').map((item, i) => (
                          <li key={i}>{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-base">{paragraph}</p>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
          {selectedResource?.type === "pdf" && (
            <div className="text-center py-8">
              <FileText className="h-16 w-16 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">PDF Document</h3>
              <p className="text-muted-foreground mb-6">This document contains important information about recognizing potential skin cancer signs.</p>
              <Button onClick={() => window.open(selectedResource.downloadUrl, '_blank')}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Template Dialog */}
      <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Skin Care Tracking Template</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center">
            <FileText className="h-16 w-16 mx-auto text-primary mb-4" />
            <h3 className="text-lg font-medium mb-2">Daily Skin Care Tracker</h3>
            <p className="text-muted-foreground mb-6">Track your skin care routine, symptoms, and progress with this comprehensive template.</p>
            <div className="flex flex-col space-y-3">
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download Excel Template
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF Template
              </Button>
              <div className="text-xs text-muted-foreground mt-2">
                Available formats: Excel, PDF, Google Sheets
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
