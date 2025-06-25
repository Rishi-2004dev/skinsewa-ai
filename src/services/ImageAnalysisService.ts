
import { analyzeImageWithGemini, getGeminiApiKey } from "./GeminiService";
import { jsPDF } from "jspdf";

interface AnalysisResult {
  success: boolean;
  data?: {
    condition: string;
    confidence: number;
    description: string;
    recommendations: string[];
    graphData: {
      severity: number;
      spreadRate: number;
      treatmentResponse: number;
      recurrenceRate: number;
    };
    severity: number;
    treatmentResponse: number;
    recurrenceRate: number;
    spreadRate: number;
  };
  error?: string;
  imageDescription?: string;
}

export const processImageForAnalysis = async (
  imageData: string, 
  patientInfo: string
): Promise<AnalysisResult> => {
  try {
    console.log("Starting Gemini API analysis");
    console.log("Context provided:", patientInfo);
    
    // Call the Gemini API to analyze the image
    try {
      console.log("Analyzing skin using Gemini API");
      const result = await analyzeImageWithGemini(imageData, patientInfo);
      
      if (!result || !result.result) {
        throw new Error("Invalid response from Gemini API");
      }
      
      // Return successful analysis
      return {
        success: true,
        data: {
          condition: result.result.condition,
          confidence: result.result.confidence,
          description: result.result.description,
          recommendations: result.result.recommendations,
          severity: result.result.severity,
          treatmentResponse: result.result.treatmentResponse,
          recurrenceRate: result.result.recurrenceRate,
          spreadRate: result.result.spreadRate,
          graphData: {
            severity: result.result.severity,
            spreadRate: result.result.spreadRate,
            treatmentResponse: result.result.treatmentResponse,
            recurrenceRate: result.result.recurrenceRate
          }
        }
      };
    } catch (error: any) {
      console.error("Error analyzing image:", error);
      
      return {
        success: false,
        error: error.message || "An error occurred during image analysis. Please try again."
      };
    }
  } catch (error: any) {
    console.error("General error in image analysis:", error);
    return {
      success: false,
      error: error.message || "An unknown error occurred during image analysis."
    };
  }
};

export const generatePdfReport = (analysisResult: any, patientInfo: string, imageDataUrl?: string) => {
  try {
    console.info("Generating PDF report for:", analysisResult);
    console.info("Patient info:", patientInfo);
    
    // Return error if the image is not a skin condition
    if (analysisResult.condition === "Not a skin condition") {
      return {
        success: false,
        error: "Cannot generate report for non-skin image"
      };
    }
    
    // Create a new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(133, 88, 111); // SkinSewa Pink
    doc.text("SkinSewa Analysis Report", pageWidth / 2, 20, { align: "center" });
    
    // Add date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Report Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, 28, { align: "center" });
    
    // Add divider
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 32, pageWidth - 20, 32);

    // Add the uploaded image if available
    let contentStartY = 42;
    if (imageDataUrl) {
      try {
        // Position image in the top right corner with appropriate size
        const imageWidth = 60;
        const imageHeight = 60;
        const imageX = pageWidth - imageWidth - 20; // Right side of page with margin
        
        // Add the image to the PDF
        doc.addImage(imageDataUrl, 'JPEG', imageX, contentStartY, imageWidth, imageHeight);
        
        // Add image caption
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text("Uploaded Image", imageX + imageWidth/2, contentStartY + imageHeight + 5, { align: "center" });
      } catch (imageError) {
        console.error("Error adding image to PDF:", imageError);
      }
    }
    
    // Adjust text content area to avoid overlapping with the image
    const textAreaWidth = imageDataUrl ? pageWidth - 100 : pageWidth - 40;
    
    // Add condition and confidence
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Diagnosis", 20, contentStartY);
    doc.setFontSize(14);
    doc.text(analysisResult.condition, 20, contentStartY + 8);
    doc.setFontSize(10);
    doc.text(`Confidence: ${Math.round(analysisResult.confidence * 100)}%`, 20, contentStartY + 16);
    
    // Add patient info
    doc.setFontSize(16);
    doc.text("Patient Information", 20, contentStartY + 28);
    doc.setFontSize(10);
    
    // Split patient info into lines that fit the text area width
    const patientInfoLines = doc.splitTextToSize(patientInfo, textAreaWidth);
    doc.text(patientInfoLines, 20, contentStartY + 36);
    
    // Add description
    doc.setFontSize(16);
    doc.text("Clinical Assessment", 20, contentStartY + 48);
    doc.setFontSize(10);
    
    // Split the description into lines that fit the text area width
    const descriptionLines = doc.splitTextToSize(analysisResult.description, textAreaWidth);
    doc.text(descriptionLines, 20, contentStartY + 56);
    
    // Calculate recommendations Y position based on description length
    let recommendationsY = contentStartY + 68 + (descriptionLines.length * 5);
    
    // Add recommendations
    doc.setFontSize(16);
    doc.text("Recommendations", 20, recommendationsY);
    doc.setFontSize(10);
    
    recommendationsY += 8;
    analysisResult.recommendations.forEach((recommendation: string, index: number) => {
      // Split each recommendation to fit the text area width
      const recommendationLines = doc.splitTextToSize(`${index + 1}. ${recommendation}`, textAreaWidth);
      doc.text(recommendationLines, 20, recommendationsY + (index * 10));
    });
    
    // Add severity metrics - position below recommendations
    let metricsY = recommendationsY + (analysisResult.recommendations.length * 10) + 10;
    
    doc.setFontSize(16);
    doc.text("Condition Metrics", 20, metricsY);
    
    metricsY += 10;
    
    // Severity
    doc.setFontSize(10);
    doc.text("Severity:", 20, metricsY);
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(255, 191, 0);
    doc.rect(70, metricsY - 4, 100, 5, "S");
    doc.rect(70, metricsY - 4, 100 * analysisResult.severity, 5, "F");
    doc.text(`${Math.round(analysisResult.severity * 100)}%`, 175, metricsY);
    
    // Treatment Response
    doc.text("Treatment Response:", 20, metricsY + 10);
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(0, 204, 102);
    doc.rect(70, metricsY + 6, 100, 5, "S");
    doc.rect(70, metricsY + 6, 100 * analysisResult.treatmentResponse, 5, "F");
    doc.text(`${Math.round(analysisResult.treatmentResponse * 100)}%`, 175, metricsY + 10);
    
    // Recurrence Rate
    doc.text("Recurrence Rate:", 20, metricsY + 20);
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(255, 102, 102);
    doc.rect(70, metricsY + 16, 100, 5, "S");
    doc.rect(70, metricsY + 16, 100 * analysisResult.recurrenceRate, 5, "F");
    doc.text(`${Math.round(analysisResult.recurrenceRate * 100)}%`, 175, metricsY + 20);
    
    // Add disclaimer footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("This report is generated by SkinSewa AI and is not a substitute for professional medical advice.", pageWidth / 2, pageHeight - 15, { align: "center" });
    doc.text("Please consult with a dermatologist for a professional diagnosis.", pageWidth / 2, pageHeight - 10, { align: "center" });
    
    // Generate the PDF as a data URL
    const pdfDataUri = doc.output('datauristring');
    
    // Create a reportId
    const reportId = `R${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Return success with PDF data URI
    return {
      success: true,
      reportUrl: pdfDataUri,
      reportId: reportId
    };
  } catch (error) {
    console.error("Error generating PDF report:", error);
    return {
      success: false,
      error: "Failed to generate PDF report"
    };
  }
};
