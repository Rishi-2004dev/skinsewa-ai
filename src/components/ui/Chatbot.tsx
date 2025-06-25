
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { commonQuestions, skinConditionInfo, indianSpecificInfo } from '@/utils/ChatbotData';
import { useLanguage } from '@/context/LanguageContext';
import { GEMINI_API_KEY } from '@/services/GeminiService';
import { toast } from '@/components/ui/use-toast';

export function Chatbot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
    { text: "Hello! How can I help you with your skin concerns today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // First try to use Gemini for a more intelligent response
      const botResponse = await queryGemini(input);
      
      // Wait a bit before showing bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error getting response from Gemini:", error);
      
      // Fall back to local processing if Gemini fails
      const fallbackResponse = processUserInputLocally(input);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { text: fallbackResponse, sender: 'bot' }]);
        setIsLoading(false);
      }, 500);
    }
    
    // Clear input
    setInput("");
  };
  
  const queryGemini = async (userInput: string): Promise<string> => {
    try {
      const prompt = `
        You are a skin health consultant working for SkinSewa, an Indian healthcare platform focused on skin conditions.
        
        About SkinSewa:
        - A web platform that helps users identify potential skin conditions
        - Users can upload photos of skin conditions for AI analysis
        - Provides educational resources about skin health
        - Connects users with dermatologists in India
        - Offers resources specifically tailored for Indian skin types and conditions
        
        Please respond as a helpful SkinSewa consultant. Answer the user's question in a friendly, professional manner.
        If the question is about a specific skin condition, briefly explain it and suggest they use our photo analysis feature.
        If the question is about the website functionality, explain how to use that feature.
        Keep responses concise (2-3 paragraphs maximum).
        
        User question: ${userInput}
      `;
      
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
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.4,
              topP: 0.8,
              maxOutputTokens: 800,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      return textResponse || "I'm sorry, I couldn't generate a proper response. Could you try asking in a different way?";
    } catch (error) {
      console.error("Error querying Gemini:", error);
      throw error;
    }
  };
  
  const processUserInputLocally = (input: string): string => {
    const normalizedInput = input.toLowerCase();
    
    // Try to find a direct match
    for (const item of chatbotData) {
      for (const keyword of item.keywords) {
        if (normalizedInput.includes(keyword.toLowerCase())) {
          return item.response;
        }
      }
    }
    
    // Default response if no match found
    return "I'm not quite sure how to help with that specific question. Could you try asking something about common skin conditions, treatment options, or skincare routines?";
  };
  
  // Create a list of keywords from all data sources for processing user input
  const chatbotData = [
    // Common questions
    ...commonQuestions.map(item => ({
      keywords: [item.question.toLowerCase()],
      response: item.answer
    })),
    
    // Skin conditions
    ...Object.entries(skinConditionInfo).map(([condition, info]) => ({
      keywords: [condition, ...(info.causes || []), ...(info.treatments || [])],
      response: `${info.description}\n\nCommon causes include: ${info.causes.join(', ')}.\n\nTreatments may include: ${info.treatments.join(', ')}.`
    })),
    
    // India specific info
    {
      keywords: ["india", "indian", "climate", "weather"],
      response: indianSpecificInfo.climate
    },
    {
      keywords: ["indian skin", "skin type", "skin tone", "dark skin", "brown skin"],
      response: indianSpecificInfo.skinTypes
    },
    {
      keywords: ["common conditions", "india conditions", "prevalent"],
      response: indianSpecificInfo.commonConditions
    },
    {
      keywords: ["ayurvedic", "traditional", "natural", "herbal"],
      response: indianSpecificInfo.ayurvedic
    },
    {
      keywords: ["local treatment", "india treatment", "hospitals", "clinics"],
      response: indianSpecificInfo.localTreatments
    }
  ];
  
  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen ? (
        <Card className="w-80 sm:w-96 shadow-lg border-skinsewa-blue/20">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-skinsewa-pink h-2 w-2 rounded-full"></div>
                SkinSewa Assistant
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleChat}
                className="h-7 w-7 p-0"
              >
                ×
              </Button>
            </CardTitle>
          </CardHeader>
          <ScrollArea className="h-80 px-4 py-2">
            <div className="space-y-4">
              {messages.map((message, i) => (
                <div 
                  key={i} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.sender === 'user' 
                        ? 'bg-skinsewa-pink text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-800">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse delay-150"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <CardFooter className="p-4 pt-2">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={isLoading}
                className="border-skinsewa-blue/30 focus:border-skinsewa-blue text-gray-900 dark:text-gray-100"
              />
              <Button type="submit" size="sm" disabled={isLoading}>Send</Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button 
          onClick={toggleChat}
          className="h-14 w-14 rounded-full shadow-lg bg-skinsewa-pink hover:bg-skinsewa-pink/90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </Button>
      )}
    </div>
  );
}
