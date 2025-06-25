import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EnhancedFAQ } from "@/components/ui/EnhancedFAQ";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageSquare, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function FAQ() {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We've received your message and will get back to you shortly."
    });
    setContactForm({ name: "", email: "", message: "" });
  };

  // Example related questions based on common user searches
  const relatedQuestions = [
    "How can I tell if my skin condition is serious enough to see a doctor?",
    "What's the difference between a virtual consultation and an in-person dermatologist visit?",
    "Are AI skin analyses as accurate as professional diagnoses?",
    "How often should I perform a skin self-examination?",
    "What information should I prepare before my first dermatology appointment?"
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3">Frequently Asked Questions</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions or reach out for help
            </p>
            <div className="mt-6 max-w-md mx-auto">
              <div className="relative">
                <Input
                  placeholder="Search for answers..."
                  className="pl-10 pr-4 py-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
          
          {searchQuery && (
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-2">People also ask:</h2>
              <div className="space-y-2">
                {relatedQuestions
                  .filter(q => q.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((question, i) => (
                    <Card key={i} className="p-3 cursor-pointer hover:bg-accent">
                      <div className="flex items-start gap-2">
                        <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                        <p>{question}</p>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          )}
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* FAQ Categories */}
            <div className="md:col-span-1">
              <div className="sticky top-4 space-y-4">
                <h2 className="text-lg font-medium mb-2">Categories</h2>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Badge className="mr-2">24</Badge>
                    General Questions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Badge className="mr-2">18</Badge>
                    Using the App
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Badge className="mr-2">12</Badge>
                    AI Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Badge className="mr-2">9</Badge>
                    Skin Conditions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Badge className="mr-2">7</Badge>
                    Account & Privacy
                  </Button>
                </div>
                
                <div className="mt-8 p-4 bg-accent rounded-lg">
                  <h3 className="font-medium mb-2">Need more help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our support team is available 24/7 to assist you.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Mail className="mr-2 h-4 w-4" />
                      Email Support
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main FAQ */}
            <div className="md:col-span-3">
              <ScrollArea className="h-[700px] pr-4">
                <EnhancedFAQ />
              </ScrollArea>
            </div>
          </div>

          <div className="mt-16 text-center bg-muted p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="mb-6 max-w-xl mx-auto">
              Our team is here to help. Contact us for personalized assistance with any questions or concerns.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <HelpCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Help Center</h3>
                <p className="text-muted-foreground mb-4 text-center">
                  Browse our knowledge base for detailed guides and tutorials.
                </p>
                <Button size="lg" className="gap-2 w-full">
                  <HelpCircle className="h-5 w-5" />
                  Visit Help Center
                </Button>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Contact Support</h3>
                <p className="text-muted-foreground mb-4 text-center">
                  Get in touch with our customer support team directly.
                </p>
                <form className="w-full space-y-3" onSubmit={handleSubmitContact}>
                  <Input 
                    placeholder="Your name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    required
                  />
                  <Input 
                    type="email"
                    placeholder="Your email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    required
                  />
                  <Textarea 
                    placeholder="How can we help you?"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    required
                    rows={3}
                  />
                  <Button type="submit" variant="outline" className="w-full gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
