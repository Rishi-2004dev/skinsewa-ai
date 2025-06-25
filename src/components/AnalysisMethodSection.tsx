
import { useLanguage } from "@/context/LanguageContext";

export function AnalysisMethodSection() {
  const { t, language } = useLanguage();
  
  const steps = [
    {
      id: 1,
      title: language === 'en' ? 'Upload Image' : 'छवि अपलोड करें',
      description: language === 'en' 
        ? 'Take a clear picture of your skin condition and upload it to our secure platform.'
        : 'अपनी त्वचा की स्थिति की एक स्पष्ट तस्वीर लें और इसे हमारे सुरक्षित प्लेटफॉर्म पर अपलोड करें।'
    },
    {
      id: 2,
      title: language === 'en' ? 'AI Analysis' : 'एआई विश्लेषण',
      description: language === 'en' 
        ? 'Our advanced Gemini AI analyzes your image against thousands of dermatological conditions.'
        : 'हमारा उन्नत जेमिनी एआई आपकी छवि का हजारों त्वचा संबंधी स्थितियों के खिलाफ विश्लेषण करता है।'
    },
    {
      id: 3,
      title: language === 'en' ? 'Get Diagnosis' : 'निदान प्राप्त करें',
      description: language === 'en' 
        ? 'Receive a detailed analysis with likely condition, severity assessment, and next steps.'
        : 'संभावित स्थिति, गंभीरता मूल्यांकन और अगले कदमों के साथ एक विस्तृत विश्लेषण प्राप्त करें।'
    },
    {
      id: 4,
      title: language === 'en' ? 'Treatment Options' : 'उपचार विकल्प',
      description: language === 'en' 
        ? 'Get personalized treatment recommendations and find nearby healthcare providers.'
        : 'व्यक्तिगत उपचार सिफारिशें प्राप्त करें और पास के स्वास्थ्य सेवा प्रदाताओं को खोजें।'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            {language === 'en' ? 'How Our Analysis Works' : 'हमारा विश्लेषण कैसे काम करता है'}
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-lg">
            {language === 'en' 
              ? 'Using advanced AI and dermatological expertise to provide accurate skin analysis' 
              : 'सटीक त्वचा विश्लेषण प्रदान करने के लिए उन्नत एआई और त्वचा विशेषज्ञता का उपयोग करना'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{step.id}</span>
                </div>
                {step.id < steps.length && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-200 dark:bg-blue-800 -z-10"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
          <p className="font-medium text-lg text-blue-800 dark:text-blue-300">
            {language === 'en'
              ? 'Our AI has been trained on over 100,000 dermatological images for accurate diagnosis'
              : 'हमारे एआई को सटीक निदान के लिए 100,000 से अधिक त्वचा विज्ञान संबंधी छवियों पर प्रशिक्षित किया गया है'}
          </p>
        </div>
      </div>
    </section>
  );
}
