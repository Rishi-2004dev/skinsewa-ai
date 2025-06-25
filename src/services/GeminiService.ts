const GEMINI_API_KEY = "AIzaSyBKLrmWKuuzmvK8RC_SH8lFMS4rUaZIKK8";

interface GeminiAnalysisResponse {
  result: {
    condition: string;
    confidence: number;
    description: string;
    recommendations: string[];
    severity: number;
    treatmentResponse: number;
    recurrenceRate: number;
    spreadRate: number;
  };
}

export const analyzeImageWithGemini = async (
  imageData: string,
  patientInfo: string
): Promise<GeminiAnalysisResponse> => {
  try {
    const base64Data = imageData.split(",")[1];

    const prompt = 
      You are a dermatology AI assistant.

      Instructions:
      1. If the image does NOT show human skin or a visible skin condition, return:
      {
        "condition": "Not a skin condition",
        "confidence": 0.99,
        "description": "Briefly describe what this image appears to be (e.g., 'a dog', 'a tree', 'a fruit').",
        "recommendations": ["Please upload a clear image of the affected human skin area for proper analysis."],
        "severity": 0,
        "treatmentResponse": 0,
        "recurrenceRate": 0,
        "spreadRate": 0
      }

      2. If it IS human skin, analyze the skin condition and return:
      - condition
      - confidence (0–1)
      - description
      - 4-6 recommendations
      - severity (0–1)
      - treatmentResponse (0–1)
      - recurrenceRate (0–1)
      - spreadRate (0–1)

      Format output as valid JSON only. No explanations or text outside the JSON.
      
      Patient Info:
      ${patientInfo}
    ;

    // Using gemini-1.5-pro model which is compatible with the API
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: "image/jpeg",
                    data: base64Data,
                  },
                },
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(Gemini API error: ${response.status} ${errorData});
    }

    const data = await response.json();

    const textResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    const jsonStartIdx = textResponse.indexOf("{");
    const jsonEndIdx = textResponse.lastIndexOf("}") + 1;

    if (jsonStartIdx >= 0 && jsonEndIdx > jsonStartIdx) {
      const jsonStr = textResponse.substring(jsonStartIdx, jsonEndIdx);
      const parsed = JSON.parse(jsonStr);

      // Fixed clamp function to properly handle types
      const clamp = (val: number | string | undefined): number => {
        if (val === undefined || val === null) return 0;
        
        // Convert string to number if needed
        const numVal = typeof val === 'string' ? parseFloat(val) : val;
        
        // Handle NaN values
        if (isNaN(numVal as number)) return 0;
        
        // Clamp between 0 and 1, and ensure it's a fixed precision number
        return Math.max(0, Math.min(1, Number((numVal as number).toFixed(2))));
      };

      return {
        result: {
          condition: parsed.condition || "Unidentified condition",
          confidence: clamp(parsed.confidence),
          description:
            parsed.description || "No description provided",
          recommendations:
            parsed.recommendations || ["Consult a dermatologist"],
          severity: clamp(parsed.severity),
          treatmentResponse: clamp(parsed.treatmentResponse),
          recurrenceRate: clamp(parsed.recurrenceRate),
          spreadRate: clamp(parsed.spreadRate),
        },
      };
    }

    throw new Error("Failed to parse Gemini API response");
  } catch (error) {
    console.error("Error analyzing image with Gemini:", error);
    throw error;
  }
};

// Export the API key so it can be imported by other components
export { GEMINI_API_KEY };

// Static API key handling for hardcoded key setup
export const checkGeminiApiKey = async (): Promise<boolean> => true;
export const storeGeminiApiKey = (apiKey: string): void => {};
export const getGeminiApiKey = (): string => GEMINI_API_KEY; 
