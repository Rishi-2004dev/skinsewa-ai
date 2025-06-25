
// Data for improved chatbot accuracy

export const skinConditionInfo = {
  acne: {
    description: "A common skin condition characterized by pimples, blackheads, and whiteheads due to clogged hair follicles.",
    causes: [
      "Excess oil production",
      "Bacteria",
      "Inflammation",
      "Clogged hair follicles",
      "Hormonal changes"
    ],
    treatments: [
      "Topical treatments with benzoyl peroxide or salicylic acid",
      "Oral antibiotics for moderate to severe cases",
      "Retinoids for persistent acne",
      "Hormonal therapies for women with hormonal acne"
    ]
  },
  eczema: {
    description: "A chronic skin condition characterized by itchy, inflamed skin that may become cracked, rough, and scaly.",
    causes: [
      "Genetic factors",
      "Environmental triggers",
      "Immune system dysfunction",
      "Skin barrier defects"
    ],
    treatments: [
      "Regular moisturizing with emollients",
      "Topical corticosteroids for flare-ups",
      "Avoiding triggers such as irritants and allergens",
      "Antihistamines for severe itching",
      "Phototherapy for widespread eczema"
    ]
  },
  psoriasis: {
    description: "A chronic autoimmune condition that causes rapid skin cell growth, resulting in thick, scaly patches.",
    causes: [
      "Immune system dysfunction",
      "Genetic factors",
      "Environmental triggers like stress, injury, or infection"
    ],
    treatments: [
      "Topical corticosteroids",
      "Vitamin D analogs",
      "Phototherapy",
      "Systemic medications for severe cases",
      "Biologics targeting specific parts of the immune system"
    ]
  },
  rosacea: {
    description: "A chronic inflammatory skin condition that primarily affects the face, causing redness, visible blood vessels, and sometimes bumps.",
    causes: [
      "Blood vessel abnormalities",
      "Demodex mites",
      "Genetic factors",
      "Environmental factors",
      "Certain foods and beverages"
    ],
    treatments: [
      "Topical medications to reduce inflammation",
      "Oral antibiotics for more severe cases",
      "Laser therapy for visible blood vessels",
      "Avoiding triggers like spicy foods, alcohol, and extreme temperatures"
    ]
  }
};

export const commonQuestions = [
  {
    question: "What type of skin condition do I have?",
    answer: "To identify your skin condition, please use our AI analysis tool by uploading a clear image of the affected area. Our system will analyze it and provide a preliminary assessment. For a definitive diagnosis, always consult with a healthcare professional."
  },
  {
    question: "Is SkinSewa's analysis accurate?",
    answer: "SkinSewa uses advanced Gemini AI trained on thousands of dermatological images to provide accurate assessments. While our system achieves high accuracy rates, it's designed as a preliminary screening tool. Always consult with a healthcare professional for a definitive diagnosis."
  },
  {
    question: "How can I prevent acne?",
    answer: "To prevent acne: wash your face twice daily with a gentle cleanser, use non-comedogenic moisturizers and makeup, avoid touching your face, clean items that touch your face regularly (like phone screens), maintain a healthy diet, stay hydrated, and manage stress. If acne persists, consult a dermatologist."
  },
  {
    question: "What treatments are available for eczema?",
    answer: "Eczema treatments include: regular moisturizing with emollients, topical corticosteroids for flare-ups, calcineurin inhibitors, antihistamines for itching, phototherapy, and in severe cases, oral immunosuppressants or biologics. Identifying and avoiding triggers is also important. Consult a dermatologist for a personalized treatment plan."
  },
  {
    question: "Is my skin condition contagious?",
    answer: "Most common skin conditions like acne, eczema, psoriasis, and rosacea are not contagious. However, some skin conditions such as fungal infections, scabies, and impetigo are contagious. Use our AI analysis tool for an initial assessment, but consult a healthcare professional for a definitive diagnosis."
  },
  {
    question: "How does the AI analysis work?",
    answer: "Our AI analysis works by processing an image of your skin condition through our Gemini AI system, which has been trained on thousands of dermatological images. It identifies visual patterns and matches them against known skin conditions. The system also considers additional information you provide, such as symptoms and medical history, to deliver a more accurate assessment."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take your privacy seriously. All images and personal information are encrypted and stored securely. We do not share your data with third parties without your explicit consent. Images are only used for providing you with analysis results and, if you opt-in, for improving our AI system's accuracy."
  },
  {
    question: "Can children use SkinSewa?",
    answer: "Children can benefit from SkinSewa's analysis, but we recommend that parents or guardians manage the process. Children's skin can be more sensitive and may present conditions differently than adults. Always consult with a pediatrician or pediatric dermatologist for skin concerns in children."
  }
];

export const indianSpecificInfo = {
  climate: "India's diverse climate affects skin conditions differently across regions. High humidity in coastal areas can exacerbate fungal infections, while dry heat in northern regions may worsen eczema symptoms.",
  
  skinTypes: "Indian skin tones range from fair to deep brown, with most people having Fitzpatrick skin types III-VI. Darker skin tones are more prone to hyperpigmentation and may show inflammation differently than lighter skin.",
  
  commonConditions: "Common skin conditions in India include melasma (especially in women), post-inflammatory hyperpigmentation, fungal infections due to humid climate, acne, and vitiligo. Tropical conditions like prickly heat are also prevalent during summer months.",
  
  ayurvedic: "Traditional Ayurvedic remedies for skin conditions include turmeric paste for inflammation, neem for acne and fungal infections, aloe vera for burns and irritation, and sandalwood for cooling and soothing irritated skin.",
  
  localTreatments: "Many effective treatments are available in India through government hospitals, AIIMS centers, and private clinics. Programs like Ayushman Bharat provide coverage for skin condition treatments for eligible citizens."
};
