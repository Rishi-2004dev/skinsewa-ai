
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";

interface AssessmentFormProps {
  onSubmit: () => void;
}

export function AssessmentForm({ onSubmit }: AssessmentFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    age: "",
    complexion: "",
    products: "",
    symptoms: "No symptoms",
  });
  
  // Common symptoms for skin conditions
  const commonSkinSymptoms = [
    "No symptoms",
    "Itching",
    "Rash",
    "Redness",
    "Dryness",
    "Flaking",
    "Bumps",
    "Pain",
    "Burning sensation",
    "Swelling",
    "Discoloration"
  ];

  // Generate a patient ID on component mount if not already set
  useEffect(() => {
    // Check if we already have a patient ID in local storage for this session
    const existingData = localStorage.getItem("assessmentData");
    let existingPatientId = "";
    
    if (existingData) {
      try {
        const parsed = JSON.parse(existingData);
        existingPatientId = parsed.patientId || "";
      } catch (e) {
        console.error("Error parsing existing assessment data", e);
      }
    }
    
    // If no existing patient ID, generate a new one
    if (!existingPatientId) {
      // Generate a unique ID for the patient (simplified for demo)
      // Format: 8 character alphanumeric ID
      const newPatientId = uuidv4().substring(0, 8).toUpperCase();
      
      setFormData(prev => ({
        ...prev,
        patientId: newPatientId
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        patientId: existingPatientId
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSymptomChange = (value: string) => {
    setFormData(prev => ({ ...prev, symptoms: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save assessment data to localStorage (including patientId)
    localStorage.setItem("assessmentData", JSON.stringify(formData));
    
    toast({
      title: "Assessment complete",
      description: "Your information has been saved for analysis.",
    });
    
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="patientId">Patient ID</Label>
          <span className="text-sm text-muted-foreground">
            Auto-generated
          </span>
        </div>
        <Input
          id="patientId"
          name="patientId"
          value={formData.patientId}
          disabled
          className="bg-muted/50"
        />
        <p className="text-xs text-muted-foreground">
          This ID will be used to identify your reports
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          name="age"
          type="number"
          min="0"
          max="120"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="complexion">Skin Complexion</Label>
        <Input
          id="complexion"
          name="complexion"
          placeholder="e.g., fair, medium, dark"
          value={formData.complexion}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="symptoms">Symptoms</Label>
        <Select 
          value={formData.symptoms} 
          onValueChange={handleSymptomChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your symptoms" />
          </SelectTrigger>
          <SelectContent>
            {commonSkinSymptoms.map(symptom => (
              <SelectItem key={symptom} value={symptom}>
                {symptom}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="products">Skincare Products Used</Label>
        <Input
          id="products"
          name="products"
          placeholder="e.g., moisturizer, sunscreen"
          value={formData.products}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full mt-4">
        Continue
      </Button>
    </form>
  );
}
