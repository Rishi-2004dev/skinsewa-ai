
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  role: string;
  content: string;
}

export function TestimonialsSection() {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "/placeholder.svg",
      role: "Acne Treatment Patient",
      content: "SkinSewa helped me identify my acne type and recommended a treatment that actually worked after months of trying different products with no success."
    },
    {
      id: 2,
      name: "Rahul Patel",
      avatar: "/placeholder.svg",
      role: "Eczema Patient",
      content: "The AI analysis accurately detected my eczema pattern. The recommended regimen has significantly reduced my flare-ups."
    },
    {
      id: 3,
      name: "Ananya Gupta",
      avatar: "/placeholder.svg",
      role: "Regular User",
      content: "Being able to upload photos and get instant analysis saved me weeks of waiting for a dermatologist appointment. Highly recommend!"
    },
    {
      id: 4,
      name: "Vikram Singh",
      avatar: "/placeholder.svg",
      role: "Rosacea Patient",
      content: "The personalized advice I received for my rosacea was spot on. My skin is clearer than it's been in years."
    },
    {
      id: 5,
      name: "Meera Reddy",
      avatar: "/placeholder.svg",
      role: "Psoriasis Patient",
      content: "Finally found something that helps me track and manage my psoriasis flare-ups. The information provided is very educational."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = isMobile ? 1 : 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % (testimonials.length - visibleCount + 1)
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [testimonials.length, visibleCount]);

  return (
    <section className="py-12 md:py-24 bg-gradient-to-r from-blue-50 to-pink-50 dark:from-blue-950/50 dark:to-pink-950/50">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-center mb-12">
          {language === 'en' ? 'Patient Testimonials' : 'रोगी प्रशंसापत्र'}
        </h2>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className={`w-full ${isMobile ? 'w-full' : 'md:w-1/3'} px-4 flex-shrink-0`}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic">&ldquo;{testimonial.content}&rdquo;</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: testimonials.length - visibleCount + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 w-2.5 rounded-full ${currentIndex === index ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
