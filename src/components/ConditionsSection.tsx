
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function ConditionsSection() {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  
  // Adding more conditions as requested
  const conditions = [
    {
      title: language === 'en' ? "Acne" : "मुँहासे",
      description: language === 'en' 
        ? "Identification and severity assessment of various acne types."
        : "विभिन्न मुँहासे प्रकारों की पहचान और गंभीरता का आकलन।",
      longDescription: language === 'en'
        ? "Acne is a skin condition that occurs when hair follicles become clogged with oil and dead skin cells, causing pimples, blackheads, and whiteheads. It commonly affects teenagers but can occur at any age."
        : "मुँहासे एक त्वचा की स्थिति है जो तब होती है जब बाल रोम तेल और मृत त्वचा कोशिकाओं से अवरुद्ध हो जाते हैं, जिससे फुंसियाँ, ब्लैकहेड्स और व्हाइटहेड्स होते हैं। यह आमतौर पर किशोरों को प्रभावित करता है लेकिन किसी भी उम्र में हो सकता है।",
      gradient: "from-red-500/60 to-orange-400/90",
      iconPath: "M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm0-16c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm-3 6a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"
    },
    {
      title: language === 'en' ? "Eczema" : "एक्जिमा",
      description: language === 'en'
        ? "Detection of eczema patterns and inflammation levels."
        : "एक्जिमा पैटर्न और सूजन स्तरों का पता लगाना।",
      longDescription: language === 'en'
        ? "Eczema is a condition where patches of skin become inflamed, itchy, red, cracked, and rough. Sometimes the skin may develop small, fluid-filled bumps that become crusty when scratched."
        : "एक्जिमा एक ऐसी स्थिति है जहां त्वचा के हिस्से सूजन, खुजली, लाल, दरार और खुरदरे हो जाते हैं। कभी-कभी त्वचा में छोटे, तरल भरे उभार विकसित हो सकते हैं जो खरोंचने पर पपड़ीदार हो जाते हैं।",
      gradient: "from-blue-500/60 to-indigo-400/90",
      iconPath: "M4 11v8h6c0-2.21-1.79-4-4-4h-2zm16-7H4v6h6.5c0-1.38 1.12-2.5 2.5-2.5 1.38 0 2.5 1.12 2.5 2.5H22V4z"
    },
    {
      title: language === 'en' ? "Psoriasis" : "सोरायसिस",
      description: language === 'en'
        ? "Analysis of psoriasis plaques and coverage areas."
        : "सोरायसिस प्लाक और कवरेज क्षेत्रों का विश्लेषण।",
      longDescription: language === 'en'
        ? "Psoriasis is a skin disorder that causes skin cells to multiply up to 10 times faster than normal, resulting in bumpy red patches covered with white scales. It can affect any part of the skin."
        : "सोरायसिस एक त्वचा विकार है जो त्वचा कोशिकाओं को सामान्य से 10 गुना तेजी से गुणा करने का कारण बनता है, जिससे सफेद स्केल्स से ढके उभरे हुए लाल धब्बे होते हैं। यह त्वचा के किसी भी हिस्से को प्रभावित कर सकता है।",
      gradient: "from-purple-500/60 to-fuchsia-400/90", 
      iconPath: "M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm0-18c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 13h-2v-6h2v6zm0-8h-2V7h2v2z"
    },
    {
      title: language === 'en' ? "Rosacea" : "रोसाइसिया",
      description: language === 'en'
        ? "Evaluation of redness, flushing, and visible blood vessels."
        : "लालिमा, फ्लशिंग और दृश्यमान रक्त वाहिकाओं का मूल्यांकन।",
      longDescription: language === 'en'
        ? "Rosacea is a chronic inflammatory skin condition that primarily affects the face, causing persistent redness, visible blood vessels, and sometimes bumps filled with pus. It often flares up for weeks or months at a time."
        : "रोसाइसिया एक क्रोनिक इंफ्लेमेटरी त्वचा की स्थिति है जो मुख्य रूप से चेहरे को प्रभावित करती है, जिससे लगातार लालिमा, दिखाई देने वाली रक्त वाहिकाएं और कभी-कभी मवाद से भरे उभार होते हैं। यह अक्सर हफ्तों या महीनों तक बढ़ जाता है।",
      gradient: "from-pink-500/60 to-red-400/90",
      iconPath: "M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm0-18c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 13h-2v-6h2v6zm0-8h-2V7h2v2z"
    },
    {
      title: language === 'en' ? "Vitiligo" : "विटिलिगो",
      description: language === 'en'
        ? "Assessment of depigmented patches and progression pattern."
        : "डिपिगमेंटेड पैच और प्रगति पैटर्न का आकलन।",
      longDescription: language === 'en'
        ? "Vitiligo is a long-term skin condition characterized by patches of the skin losing their pigment. The patches of skin affected become white and usually have sharp margins. The hair from the skin may also become white."
        : "विटिलिगो एक दीर्घकालिक त्वचा की स्थिति है जिसकी विशेषता त्वचा के हिस्सों का अपना रंजक खोना है। प्रभावित त्वचा के हिस्से सफेद हो जाते हैं और आमतौर पर तेज किनारे होते हैं। त्वचा से बाल भी सफेद हो सकते हैं।",
      gradient: "from-yellow-500/60 to-amber-400/90",
      iconPath: "M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"
    },
    {
      title: language === 'en' ? "Fungal Infections" : "फंगल संक्रमण",
      description: language === 'en'
        ? "Identification of various fungal infections and severity."
        : "विभिन्न फंगल संक्रमणों और गंभीरता की पहचान।",
      longDescription: language === 'en'
        ? "Fungal infections occur when fungi invade the tissue. Common types include athlete's foot, ringworm, and candidiasis. They often appear as a red, itchy rash with occasional blistering and scales."
        : "फंगल संक्रमण तब होते हैं जब फंगाई ऊतकों पर आक्रमण करती है। सामान्य प्रकारों में एथलीट फुट, रिंगवर्म, और कैंडिडिएसिस शामिल हैं। वे अक्सर एक लाल, खुजली वाले दाने के रूप में दिखाई देते हैं, जिसमें कभी-कभी छाले और स्केल्स होते हैं।",
      gradient: "from-green-500/60 to-emerald-400/90",
      iconPath: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
    },
    {
      title: language === 'en' ? "Melasma" : "मेलास्मा",
      description: language === 'en'
        ? "Analysis of hyperpigmentation patterns and intensity."
        : "हाइपरपिगमेंटेशन पैटर्न और तीव्रता का विश्लेषण।",
      longDescription: language === 'en'
        ? "Melasma is a common skin condition that causes brown to gray-brown patches on the face. It's more common in women and people with darker skin tones and is often triggered by hormonal changes and sun exposure."
        : "मेलास्मा एक आम त्वचा की स्थिति है जो चेहरे पर भूरे से धूसर-भूरे धब्बे पैदा करती है। यह महिलाओं और गहरे रंग की त्वचा वाले लोगों में अधिक आम है और अक्सर हार्मोनल परिवर्तन और धूप के संपर्क से ट्रिगर होता है।",
      gradient: "from-gray-500/60 to-stone-400/90",
      iconPath: "M21 12a9 9 0 1 1-6.219-8.56"
    },
    {
      title: language === 'en' ? "Dermatitis" : "डर्मेटाइटिस",
      description: language === 'en'
        ? "Detection of inflammatory skin conditions and irritants."
        : "सूजन वाली त्वचा की स्थिति और जलन पैदा करने वाले तत्वों का पता लगाना।",
      longDescription: language === 'en'
        ? "Dermatitis refers to a group of skin conditions that cause inflammation of the skin. Types include contact dermatitis, seborrheic dermatitis, and atopic dermatitis (eczema). Symptoms include redness, swelling, and itching."
        : "डर्मेटाइटिस त्वचा की स्थितियों के एक समूह को संदर्भित करता है जो त्वचा में सूजन का कारण बनता है। प्रकारों में कॉन्टैक्ट डर्मेटाइटिस, सेबोरिक डर्मेटाइटिस और एटोपिक डर्मेटाइटिस (एक्जिमा) शामिल हैं। लक्षणों में लालिमा, सूजन और खुजली शामिल हैं।",
      gradient: "from-cyan-500/60 to-blue-400/90",
      iconPath: "M8 14s1.5 2 4 2 4-2 4-2"
    },
    {
      title: language === 'en' ? "Skin Cancer" : "त्वचा कैंसर",
      description: language === 'en'
        ? "Early detection of suspicious skin lesions and marks."
        : "संदिग्ध त्वचा घावों और निशानों का शीघ्र पता लगाना।",
      longDescription: language === 'en'
        ? "Skin cancer is the abnormal growth of skin cells, most often developing on skin exposed to the sun. Common types include basal cell carcinoma, squamous cell carcinoma, and melanoma, the most dangerous form."
        : "त्वचा कैंसर त्वचा कोशिकाओं का असामान्य विकास है, जो अक्सर सूरज के संपर्क में आने वाली त्वचा पर विकसित होता है। सामान्य प्रकारों में बेसल सेल कार्सिनोमा, स्क्वैमस सेल कार्सिनोमा और मेलानोमा, सबसे खतरनाक रूप शामिल हैं।",
      gradient: "from-amber-500/60 to-red-600/90",
      iconPath: "M12 2v8m0 8v4m-8-12h4m8 0h4"
    }
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true, 
    slidesToScroll: isMobile ? 1 : 3, 
    align: 'start'
  });
  
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayIntervalRef = useRef<number | null>(null);
  
  // Auto-scroll logic with smooth transitions
  useEffect(() => {
    if (!emblaApi || isPaused) return;
    
    const startAutoplay = () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
      
      autoplayIntervalRef.current = window.setInterval(() => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollTo(0);
        }
        
        // Update active index
        setActiveIndex(emblaApi.selectedScrollSnap());
      }, 4000);
    };
    
    startAutoplay();
    
    emblaApi.on('select', () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    });
    
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [emblaApi, isPaused]);
  
  return (
    <section className="container py-12 md:py-24 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
          {t("section.conditions.title")}
        </h2>
        <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-lg">
          {t("section.conditions.description")}
        </p>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {conditions.map((condition, index) => (
              <div 
                key={index} 
                className={`min-w-0 shrink-0 ${isMobile ? 'basis-full' : 'basis-full sm:basis-1/2 md:basis-1/3'} px-3`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <Card
                  className={cn(
                    "condition-card h-full overflow-hidden transition-all duration-300 hover:shadow-xl relative",
                    activeIndex === index ? "transform scale-105" : ""
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br",
                      condition.gradient
                    )}
                  />
                  
                  {/* Add a semi-transparent overlay to improve text readability */}
                  <div className="absolute inset-0 bg-black/20" />
                  
                  <CardHeader className="relative z-10">
                    <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-white"
                      >
                        <path d={condition.iconPath} />
                      </svg>
                    </div>
                    <CardTitle className="text-white">{condition.title}</CardTitle>
                    <CardDescription className="text-white/90">
                      {condition.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent
                    className={cn(
                      "relative z-10 transition-all duration-300 overflow-hidden",
                      isPaused ? "max-h-40 opacity-100" : "max-h-0 opacity-0 p-0"
                    )}
                  >
                    <p className="text-white/90">{condition.longDescription}</p>
                  </CardContent>
                  
                  <CardFooter className="relative z-10">
                    <a
                      href={`/conditions#${condition.title.toLowerCase()}`}
                      className="text-sm font-medium text-white underline underline-offset-4 hover:text-white/90"
                    >
                      {t("section.conditions.learnMore")}
                    </a>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(conditions.length)].map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (emblaApi) emblaApi.scrollTo(index);
              }}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                activeIndex === index ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'
              }`}
              aria-label={`View condition ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
