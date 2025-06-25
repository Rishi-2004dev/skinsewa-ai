
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Chatbot } from "@/components/ui/Chatbot";

interface SkinCondition {
  id: string;
  name: string;
  description: string;
  causes: string[];
  symptoms: string[];
  dos: string[];
  donts: string[];
  category: string;
}

const Conditions = () => {
  const conditions: SkinCondition[] = [
    {
      id: "acne",
      name: "Acne",
      description: "A skin condition that occurs when hair follicles become clogged with oil and dead skin cells, causing pimples, blackheads, and whiteheads.",
      causes: [
        "Excess oil production",
        "Hair follicles clogged by oil and dead skin cells",
        "Bacteria",
        "Hormonal changes",
        "Diet (some studies suggest dairy and high-glycemic foods)"
      ],
      symptoms: [
        "Whiteheads (closed plugged pores)",
        "Blackheads (open plugged pores)",
        "Red, tender bumps (papules)",
        "Pimples (pustules) with pus at their tips",
        "Nodules (large, solid, painful lumps beneath the skin)"
      ],
      dos: [
        "Wash face twice daily with a gentle cleanser",
        "Use non-comedogenic products",
        "Change pillowcases regularly",
        "Keep hair clean and away from face",
        "Consult a dermatologist for severe cases"
      ],
      donts: [
        "Don't pick or squeeze pimples",
        "Avoid touching your face frequently",
        "Don't use harsh scrubs or exfoliants",
        "Avoid greasy cosmetics",
        "Don't sleep with makeup on"
      ],
      category: "Common"
    },
    {
      id: "eczema",
      name: "Eczema",
      description: "A condition that makes the skin red, itchy, and inflamed. It's common in children but can occur at any age.",
      causes: [
        "Genetic factors",
        "Immune system dysfunction",
        "Environmental triggers",
        "Stress",
        "Irritants like soaps or detergents"
      ],
      symptoms: [
        "Dry, sensitive skin",
        "Intense itching",
        "Red, inflamed skin",
        "Recurring rashes",
        "Rough, leathery patches"
      ],
      dos: [
        "Moisturize regularly with fragrance-free products",
        "Take lukewarm showers",
        "Wear soft, breathable fabrics",
        "Use mild, unscented soaps",
        "Identify and avoid triggers"
      ],
      donts: [
        "Don't scratch affected areas",
        "Avoid harsh soaps and detergents",
        "Avoid extreme temperature changes",
        "Don't wear rough or irritating clothing",
        "Avoid known allergens and irritants"
      ],
      category: "Common"
    },
    {
      id: "psoriasis",
      name: "Psoriasis",
      description: "A chronic autoimmune condition that causes rapid skin cell growth, leading to thick, scaly patches on the skin surface.",
      causes: [
        "Immune system dysfunction",
        "Genetic factors",
        "Environmental triggers",
        "Stress",
        "Certain medications"
      ],
      symptoms: [
        "Red patches covered with silvery scales",
        "Dry, cracked skin that may bleed",
        "Itching or burning",
        "Thickened, pitted, or ridged nails",
        "Swollen or stiff joints"
      ],
      dos: [
        "Keep skin moisturized",
        "Take daily baths with gentle cleansers",
        "Apply prescribed topical treatments regularly",
        "Get some sun exposure (moderate amounts)",
        "Manage stress"
      ],
      donts: [
        "Don't pick at scales or patches",
        "Avoid triggers like alcohol and smoking",
        "Don't skip prescribed treatments",
        "Avoid sunburn",
        "Don't use harsh skincare products"
      ],
      category: "Chronic"
    },
    {
      id: "rosacea",
      name: "Rosacea",
      description: "A chronic inflammatory skin condition that causes redness, visible blood vessels, and sometimes bumps on the face.",
      causes: [
        "Blood vessel abnormalities",
        "Skin mites (Demodex)",
        "Genetic factors",
        "Environmental factors",
        "Certain foods and beverages"
      ],
      symptoms: [
        "Persistent redness in central face",
        "Swollen red bumps",
        "Visible blood vessels",
        "Eye problems (in ocular rosacea)",
        "Enlarged nose (rhinophyma, in severe cases)"
      ],
      dos: [
        "Use gentle, non-irritating skincare products",
        "Wear broad-spectrum sunscreen daily",
        "Keep track of and avoid triggers",
        "Use prescribed medications consistently",
        "Protect face from extreme temperatures"
      ],
      donts: [
        "Avoid spicy foods, alcohol, and hot beverages",
        "Don't use products containing alcohol or fragrance",
        "Avoid extreme heat exposure",
        "Don't use harsh exfoliants or scrubs",
        "Avoid intense exercise in hot environments"
      ],
      category: "Chronic"
    },
    {
      id: "dermatitis",
      name: "Contact Dermatitis",
      description: "A red, itchy rash caused by direct contact with a substance or an allergic reaction to it.",
      causes: [
        "Irritant contact with detergents or solvents",
        "Allergic reactions to metals, plants, or cosmetics",
        "Prolonged exposure to water",
        "Chemical irritants",
        "Certain fabrics"
      ],
      symptoms: [
        "Red rash",
        "Itching",
        "Dry, cracked, scaly skin",
        "Bumps and blisters",
        "Swelling, burning, or tenderness"
      ],
      dos: [
        "Identify and avoid triggers",
        "Wash skin promptly after contact with irritants",
        "Use hypoallergenic products",
        "Apply cool, wet compresses to soothe skin",
        "Use prescribed corticosteroid creams for flare-ups"
      ],
      donts: [
        "Don't scratch the affected area",
        "Avoid known irritants and allergens",
        "Don't use fragranced products",
        "Don't wear tight clothing over affected areas",
        "Don't use harsh soaps or cleansers"
      ],
      category: "Allergic"
    },
    {
      id: "melasma",
      name: "Melasma",
      description: "A common skin condition that causes brown or gray-brown patches on the face, particularly on the cheeks, bridge of the nose, forehead, and upper lip.",
      causes: [
        "Sun exposure",
        "Hormonal changes during pregnancy",
        "Birth control pills",
        "Hormone therapy",
        "Genetic predisposition"
      ],
      symptoms: [
        "Symmetrical brown or grayish patches",
        "Most commonly appears on the face",
        "No other symptoms beyond discoloration",
        "May worsen with sun exposure",
        "More common in women"
      ],
      dos: [
        "Use broad-spectrum sunscreen daily",
        "Wear wide-brimmed hats in the sun",
        "Use prescribed skin lightening creams",
        "Consider procedures like chemical peels if recommended",
        "Be patient with treatments as results take time"
      ],
      donts: [
        "Don't skip sunscreen",
        "Avoid direct sun exposure during peak hours",
        "Don't use irritating skincare products",
        "Avoid waxing affected areas",
        "Don't expect immediate results from treatments"
      ],
      category: "Pigmentation"
    },
    {
      id: "vitiligo",
      name: "Vitiligo",
      description: "A condition in which the skin loses its pigment cells, resulting in patches of lighter skin.",
      causes: [
        "Autoimmune disorder",
        "Family history",
        "Certain trigger events",
        "Oxidative stress",
        "Neural factors"
      ],
      symptoms: [
        "White patches on skin",
        "Premature whitening of hair",
        "Loss of color in tissues inside mouth",
        "Change in color of inner layer of eye",
        "Often starts on hands, face, and areas around body openings"
      ],
      dos: [
        "Protect skin from sun with sunscreen",
        "Consider prescribed medications or therapies",
        "Join support groups",
        "Explore camouflage options if desired",
        "Maintain general skin health"
      ],
      donts: [
        "Don't expect overnight results from treatments",
        "Don't get sunburned",
        "Don't use harsh skin products",
        "Don't ignore emotional aspects of the condition",
        "Don't avoid medical consultation"
      ],
      category: "Pigmentation"
    },
    {
      id: "fungal",
      name: "Fungal Infections",
      description: "Skin infections caused by various types of fungi, including ringworm, athlete's foot, jock itch, and yeast infections.",
      causes: [
        "Direct contact with infected person or animal",
        "Contact with contaminated items",
        "Warm, moist environments",
        "Weakened immune system",
        "Extended antibiotic use"
      ],
      symptoms: [
        "Red, itchy, scaly rash",
        "Ring-shaped patches (ringworm)",
        "Cracking or peeling skin between toes (athlete's foot)",
        "Burning sensation",
        "Raised border"
      ],
      dos: [
        "Keep affected areas clean and dry",
        "Use antifungal medications as prescribed",
        "Change socks and underwear daily",
        "Complete the full course of medication",
        "Wash hands after touching infected areas"
      ],
      donts: [
        "Don't share personal items",
        "Avoid walking barefoot in public areas",
        "Don't wear tight, non-breathable clothing",
        "Don't stop treatment early when symptoms improve",
        "Don't use steroid creams without medical advice"
      ],
      category: "Infections"
    },
    {
      id: "warts",
      name: "Warts",
      description: "Small growths on the skin caused by an infection with human papillomavirus (HPV).",
      causes: [
        "Human papillomavirus (HPV) infection",
        "Direct skin-to-skin contact",
        "Touching surfaces with the virus",
        "Breaks in the skin",
        "Weakened immune system"
      ],
      symptoms: [
        "Small, rough growth on skin",
        "Flesh-colored, white, pink, or tan",
        "Black dots (clotted blood vessels)",
        "May cause pain or tenderness",
        "Clusters of warts may appear"
      ],
      dos: [
        "Wash hands regularly",
        "Keep warts covered with bandages",
        "Use over-the-counter treatments or consult doctor",
        "Change disposable razors frequently",
        "Keep feet dry if treating plantar warts"
      ],
      donts: [
        "Don't pick at warts",
        "Don't share towels, shoes, or socks",
        "Don't bite fingernails if you have warts nearby",
        "Don't shave over warts",
        "Don't touch warts and then touch other body parts"
      ],
      category: "Infections"
    },
    {
      id: "shingles",
      name: "Shingles",
      description: "A viral infection that causes a painful rash, caused by the varicella-zoster virus, the same virus that causes chickenpox.",
      causes: [
        "Varicella-zoster virus reactivation",
        "Age (more common in older adults)",
        "Weakened immune system",
        "Stress",
        "Previous chickenpox infection"
      ],
      symptoms: [
        "Pain, burning, or tingling",
        "Red rash that begins after pain",
        "Fluid-filled blisters that break and crust over",
        "Itching",
        "Fever, headache, fatigue"
      ],
      dos: [
        "Seek early treatment (within 72 hours)",
        "Keep the rash clean and covered",
        "Take prescribed antiviral medications",
        "Use cool, wet compresses for comfort",
        "Rest and manage stress"
      ],
      donts: [
        "Don't scratch the rash",
        "Don't share items that touch the rash",
        "Don't contact people who've never had chickenpox",
        "Don't delay treatment",
        "Don't ignore eye symptoms if rash is on face"
      ],
      category: "Infections"
    }
  ];

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConditions = conditions.filter(condition => {
    const matchesCategory = filter === "all" || condition.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch = condition.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          condition.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Skin Conditions</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Search Conditions</label>
            <Input 
              placeholder="Search by name or description..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <label className="block text-sm font-medium mb-2">Filter by Category</label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="common">Common</SelectItem>
                <SelectItem value="chronic">Chronic</SelectItem>
                <SelectItem value="allergic">Allergic</SelectItem>
                <SelectItem value="pigmentation">Pigmentation</SelectItem>
                <SelectItem value="infections">Infections</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConditions.map((condition) => (
            <Card key={condition.id} id={condition.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{condition.name}</CardTitle>
                <CardDescription>{condition.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-lg">Causes</h3>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      {condition.causes.map((cause, index) => (
                        <li key={index} className="text-sm">{cause}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg">Symptoms</h3>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      {condition.symptoms.map((symptom, index) => (
                        <li key={index} className="text-sm">{symptom}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-green-600 dark:text-green-400">Do's</h3>
                      <ul className="list-disc pl-5 space-y-1 mt-2">
                        {condition.dos.map((item, index) => (
                          <li key={index} className="text-xs">{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-red-600 dark:text-red-400">Don'ts</h3>
                      <ul className="list-disc pl-5 space-y-1 mt-2">
                        {condition.donts.map((item, index) => (
                          <li key={index} className="text-xs">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <a 
                    href={`/conditions/${condition.id}`} 
                    className="text-sm text-skinsewa-blue hover:underline block text-center mt-4"
                  >
                    Learn more about {condition.name}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Conditions;
