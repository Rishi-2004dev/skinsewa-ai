
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Eye, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { processImageForAnalysis, generatePdfReport } from "@/services/ImageAnalysisService";
import { Card, CardContent } from "@/components/ui/card";
import { v4 as uuidv4 } from 'uuid';
import { ScrollArea } from "./scroll-area";
import { Spinner } from "./spinner";

interface ImageUploadCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageUploadCard({ open, onOpenChange }: ImageUploadCardProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const [needsMoreInfo, setNeedsMoreInfo] = useState(false);
  const [patientInfo, setPatientInfo] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [modelLoading, setModelLoading] = useState(false);
  const { language } = useLanguage();
  const { toast } = useToast();
  
  useEffect(() => {
    // Set the initial loading state when the component is first opened
    if (open) {
      setModelLoading(true);
      
      // Simulate model loading
      const timer = setTimeout(() => {
        setModelLoading(false);
        toast({
          title: language === 'en' ? "Ready for Analysis" : "विश्लेषण के लिए तैयार",
          description: language === 'en' ? "The skin analysis system is ready to use" : "त्वचा विश्लेषण प्रणाली उपयोग के लिए तैयार है",
        });
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [open, language, toast]);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: language === 'en' ? "Invalid file type" : "अमान्य फ़ाइल प्रकार",
        description: language === 'en' ? "Please upload a valid image file (JPG, PNG, HEIC)" : "कृपया एक मान्य छवि फ़ाइल अपलोड करें (JPG, PNG, HEIC)",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedFile(file);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
    
    // Reset previous results
    setAnalysisResult(null);
    setShowResults(false);
    setNeedsMoreInfo(false);
    setPdfUrl(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    try {
      // Check if we have patient info from localStorage
      const storedPatientInfo = localStorage.getItem('assessmentData');
      const patientInfoString = storedPatientInfo 
        ? JSON.parse(storedPatientInfo)
        : `Age: Unknown, Skin Type: Unknown, Symptoms: Unknown`;
      
      // Convert to string format for the analysis
      const patientInfoFormatted = typeof patientInfoString === 'object' 
        ? `Age: ${patientInfoString.age || 'Unknown'}, Skin Type: ${patientInfoString.complexion || 'Unknown'}, Symptoms: ${patientInfoString.symptoms || 'Unknown'}`
        : patientInfoString;
      
      setPatientInfo(patientInfoFormatted);
      
      // Analyze the image
      console.log("Analyzing image with Gemini API:", selectedFile.name);
      const result = await processImageForAnalysis(
        previewUrl as string, 
        patientInfoFormatted
      );
      
      if (result.success && result.data) {
        setAnalysisResult(result.data);
        
        // Generate PDF report with image
        const reportResult = generatePdfReport(
          result.data, 
          patientInfoFormatted,
          previewUrl as string
        );
        
        if (reportResult.success) {
          setPdfUrl(reportResult.reportUrl);
          
          // Save to localStorage for ProfilePopover to display
          const storedReports = localStorage.getItem('skinReports') 
            ? JSON.parse(localStorage.getItem('skinReports') || '[]') 
            : [];
          
          const patientId = storedPatientInfo 
            ? JSON.parse(storedPatientInfo).patientId || `P${Math.floor(100000 + Math.random() * 900000)}`
            : `P${Math.floor(100000 + Math.random() * 900000)}`;
            
          const newReport = {
            id: uuidv4(),
            date: new Date().toLocaleDateString(),
            condition: result.data.condition,
            confidence: result.data.confidence,
            pdfUrl: reportResult.reportUrl,
            imageUrl: previewUrl,
            patientId
          };
          
          storedReports.push(newReport);
          localStorage.setItem('skinReports', JSON.stringify(storedReports));
        }
        
        // Show results
        setShowResults(true);
        
        toast({
          title: language === 'en' ? "Analysis Complete" : "विश्लेषण पूर्ण",
          description: language === 'en' ? "Your skin image has been successfully analyzed" : "आपकी त्वचा की छवि का सफलतापूर्वक विश्लेषण किया गया है",
        });
        
      } else if (result.error) {
        toast({
          title: language === 'en' ? "Analysis Failed" : "विश्लेषण विफल रहा",
          description: result.error,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        title: language === 'en' ? "Analysis Failed" : "विश्लेषण विफल रहा",
        description: language === 'en' ? "There was an error analyzing your image. Please try again." : "आपकी छवि का विश्लेषण करने में त्रुटि हुई। कृपया पुन: प्रयास करें।",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    setShowResults(false);
    setNeedsMoreInfo(false);
    setPdfUrl(null);
  };

  const handleViewDetails = () => {
    // This would ideally navigate to a details page or expand the results
    // For now, we'll just toggle between basic and detailed view
    setShowResults(!showResults);
  };

  const handleViewRecords = () => {
    // Close the current dialog and open the profile popover in reports tab
    onOpenChange(false);
    
    // Trigger the profile popover to open - requires modification to Index.tsx
    const event = new CustomEvent('openProfilePopover', { detail: { activeTab: 'reports' } });
    document.dispatchEvent(event);
  };

  const handleDownloadPDF = () => {
    if (!pdfUrl) return;
    
    try {
      const reportFileName = `SkinReport_${analysisResult.condition}_${new Date().toISOString().slice(0,10)}.pdf`;
      
      // Create an anchor element and set properties
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = reportFileName;
      
      // Append to the document, click and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: language === 'en' ? "Download Started" : "डाउनलोड शुरू हुआ",
        description: language === 'en' ? "Your PDF report is being downloaded" : "आपकी पीडीएफ रिपोर्ट डाउनलोड हो रही है",
      });
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast({
        title: language === 'en' ? "Download Failed" : "डाउनलोड विफल",
        description: language === 'en' ? "There was an error downloading your report. Please try again." : "आपकी रिपोर्ट डाउनलोड करने में त्रुटि हुई। कृपया पुन: प्रयास करें।",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[80vw] w-[95vw] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{language === 'en' ? 'Upload Skin Image' : 'त्वचा की छवि अपलोड करें'}</DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? 'Upload a clear image of the affected skin area for analysis.' 
                : 'विश्लेषण के लिए प्रभावित त्वचा क्षेत्र की एक स्पष्ट छवि अपलोड करें।'}
            </DialogDescription>
          </DialogHeader>
          
          {modelLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-skinsewa-pink mb-4"></div>
              <p className="text-center text-lg font-medium">
                {language === 'en' 
                  ? 'Loading ML models for skin analysis...' 
                  : 'त्वचा विश्लेषण के लिए एमएल मॉडल लोड हो रहे हैं...'}
              </p>
              <p className="text-center text-sm text-gray-500 mt-2">
                {language === 'en' 
                  ? 'This may take a few moments on first use' 
                  : 'पहली बार उपयोग में यह कुछ क्षण ले सकता है'}
              </p>
            </div>
          ) : !showResults ? (
            <div className="grid gap-6 py-4">
              <div 
                className={`
                  border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ease-in-out
                  ${dragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"}
                  ${previewUrl ? "border-primary" : ""}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !previewUrl && document.getElementById("file-upload")?.click()}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/jpeg,image/png,image/jpg,image/heic"
                  onChange={handleFileChange}
                />
                
                {previewUrl ? (
                  <div className="space-y-4">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-h-64 mx-auto rounded-md object-contain"
                    />
                    {needsMoreInfo && (
                      <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-md text-sm">
                        <p className="font-medium">
                          {language === 'en' ? 'More Information Required' : 'अधिक जानकारी की आवश्यकता है'}
                        </p>
                        <p className="mt-1 text-xs">
                          {language === 'en' 
                            ? 'The system needs additional details about your skin condition, medical history, and symptoms for a more accurate analysis. Please fill out the assessment form.' 
                            : 'अधिक सटीक विश्लेषण के लिए सिस्टम को आपकी त्वचा की स्थिति, चिकित्सा इतिहास और लक्षणों के बारे में अतिरिक्त विवरण की आवश्यकता है। कृपया मूल्यांकन प्रपत्र भरें।'}
                        </p>
                      </div>
                    )}
                    <p className="text-sm text-gray-500">
                      {language === 'en' ? 'Image selected' : 'छवि चुनी गई'}
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                      size="sm"
                    >
                      {language === 'en' ? 'Choose different image' : 'अलग छवि चुनें'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {language === 'en' ? 'Drag and drop image or click to upload' : 'छवि खींचें और छोड़ें या अपलोड करने के लिए क्लिक करें'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {language === 'en' ? 'Supports JPG, PNG, HEIC formats' : 'JPG, PNG, HEIC प्रारूपों का समर्थन करता है'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="py-4 h-[60vh]">
              {analysisResult && (
                <ScrollArea className="h-full pr-4">
                  <div className="space-y-6 p-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-skinsewa-pink">
                          {analysisResult.condition}
                        </h3>
                        <div className="mt-1 flex items-center">
                          <div className="text-xs font-medium px-2 py-0.5 rounded-full bg-skinsewa-pink/10 text-skinsewa-pink">
                            {language === 'en' ? 'Confidence:' : 'विश्वास:'} {Math.round(analysisResult.confidence * 100)}%
                          </div>
                        </div>
                      </div>
                      {previewUrl && (
                        <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-skinsewa-pink">
                          <img 
                            src={previewUrl} 
                            alt="Skin condition" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    
                    <Card className="overflow-hidden">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-semibold text-primary mb-2">
                          {language === 'en' ? 'Patient Information' : 'रोगी की जानकारी'}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-3">{patientInfo}</p>
                        
                        <h4 className="text-sm font-semibold text-primary mb-2">
                          {language === 'en' ? 'Clinical Assessment' : 'नैदानिक मूल्यांकन'}
                        </h4>
                        <p className="text-sm mb-4">{analysisResult.description}</p>
                        
                        <h4 className="text-sm font-semibold text-primary mb-2">
                          {language === 'en' ? 'Recommendations' : 'सिफारिशें'}
                        </h4>
                        <ul className="text-sm list-disc pl-6 space-y-1.5 mb-2">
                          {analysisResult.recommendations.map((rec: string, i: number) => (
                            <li key={i}>{rec}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Card className="p-3">
                        <div className="text-center">
                          <h5 className="text-xs font-semibold mb-1">{language === 'en' ? 'Severity' : 'गंभीरता'}</h5>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                            <div 
                              className="bg-yellow-500 h-2.5 rounded-full" 
                              style={{ width: `${analysisResult.severity * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-xs">{Math.round(analysisResult.severity * 100)}%</p>
                        </div>
                      </Card>
                      <Card className="p-3">
                        <div className="text-center">
                          <h5 className="text-xs font-semibold mb-1">{language === 'en' ? 'Treatment Response' : 'उपचार प्रतिक्रिया'}</h5>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                            <div 
                              className="bg-green-500 h-2.5 rounded-full" 
                              style={{ width: `${analysisResult.treatmentResponse * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-xs">{Math.round(analysisResult.treatmentResponse * 100)}%</p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </ScrollArea>
              )}
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 justify-between">
            <div className="flex gap-2 ml-auto">
              <Button 
                variant="outline" 
                onClick={() => {
                  onOpenChange(false);
                  setTimeout(() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    setAnalysisResult(null);
                    setShowResults(false);
                  }, 300);
                }}
              >
                {language === 'en' ? 'Close' : 'बंद करें'}
              </Button>
              
              {!showResults && previewUrl ? (
                <Button 
                  onClick={handleSubmit} 
                  disabled={!selectedFile || isLoading}
                  className="bg-skinsewa-pink hover:bg-skinsewa-pink/90"
                >
                  {isLoading 
                    ? (language === 'en' ? 'Analyzing...' : 'विश्लेषण हो रहा है...') 
                    : (language === 'en' ? 'Start Analysis' : 'विश्लेषण शुरू करें')}
                </Button>
              ) : showResults && (
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline"
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    {language === 'en' ? 'Download PDF Report' : 'पीडीएफ रिपोर्ट डाउनलोड करें'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleViewDetails}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    {language === 'en' ? 'Toggle Details' : 'विवरण टॉगल करें'}
                  </Button>
                  <Button
                    onClick={handleViewRecords}
                    className="flex items-center gap-2 bg-skinsewa-pink hover:bg-skinsewa-pink/90"
                  >
                    <Search className="h-4 w-4" />
                    {language === 'en' ? 'View All Reports' : 'सभी रिपोर्ट देखें'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
