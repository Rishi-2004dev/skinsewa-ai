import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, User, Trash2, Share2, Mail, Edit, Copy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface ProfilePopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTab?: string;
}

interface Report {
  id: string;
  date: string;
  condition: string;
  pdfUrl: string;
  imageUrl: string;
  confidence: number;
  patientId?: string;
}

interface PatientInfo {
  patientId: string;
  name: string;
  age: string;
  complexion: string;
  products: string;
  symptoms: string;
}

export function ProfilePopover({ open, onOpenChange, initialTab = "reports" }: ProfilePopoverProps) {
  const [reports, setReports] = useState<Report[]>([]);
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedInfo, setEditedInfo] = useState<PatientInfo | null>(null);
  const { toast } = useToast();

  // Update active tab when initialTab prop changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Load data whenever the dialog opens
  useEffect(() => {
    if (open) {
      loadData();
    }
  }, [open]);

  const loadData = () => {
    // Load saved reports from localStorage
    const savedReports = localStorage.getItem('skinReports');
    if (savedReports) {
      try {
        setReports(JSON.parse(savedReports));
      } catch (error) {
        console.error("Error parsing reports:", error);
      }
    }
    
    // Load patient info from localStorage
    const savedPatientInfo = localStorage.getItem('assessmentData');
    if (savedPatientInfo) {
      try {
        const info = JSON.parse(savedPatientInfo);
        setPatientInfo(info);
        setEditedInfo(info);
      } catch (error) {
        console.error("Error parsing patient info:", error);
      }
    }
  };

  const handleDownloadPDF = (pdfUrl: string, fileName: string) => {
    try {
      // For blob URLs
      if (pdfUrl.startsWith('blob:')) {
        // Try to fetch the blob and download it
        fetch(pdfUrl)
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          });
      } else {
        // Regular URL handling
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      toast({
        title: "Download started",
        description: "Your report PDF is being downloaded."
      });
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast({
        title: "Download failed",
        description: "There was an error downloading your report. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteReport = (reportId: string) => {
    const updatedReports = reports.filter(report => report.id !== reportId);
    setReports(updatedReports);
    localStorage.setItem('skinReports', JSON.stringify(updatedReports));
    
    toast({
      title: "Report deleted",
      description: "The report has been successfully deleted."
    });
  };

  const handleShareReport = (report: Report, method: 'whatsapp' | 'email') => {
    let shareUrl = '';
    
    if (method === 'whatsapp') {
      const message = `Check out my skin analysis for ${report.condition} from SkinSewa!`;
      shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    } else if (method === 'email') {
      const subject = `SkinSewa Skin Analysis Report: ${report.condition}`;
      const body = `I'd like to share my skin analysis for ${report.condition} from SkinSewa.`;
      shareUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    
    window.open(shareUrl, '_blank');
    
    toast({
      title: "Sharing report",
      description: `Opening ${method === 'whatsapp' ? 'WhatsApp' : 'Email'} to share your report.`
    });
  };

  const handleSavePersonalInfo = () => {
    if (!editedInfo) return;
    
    localStorage.setItem('assessmentData', JSON.stringify(editedInfo));
    setPatientInfo(editedInfo);
    setIsEditing(false);
    
    toast({
      title: "Information updated",
      description: "Your personal information has been successfully updated."
    });
  };

  const handleInputChange = (field: keyof PatientInfo, value: string) => {
    if (!editedInfo) return;
    
    setEditedInfo({
      ...editedInfo,
      [field]: value
    });
  };

  const copyPatientId = () => {
    if (patientInfo?.patientId) {
      navigator.clipboard.writeText(patientInfo.patientId);
      toast({
        title: "Patient ID copied",
        description: "The patient ID has been copied to your clipboard."
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="" />
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <DialogTitle>Profile</DialogTitle>
              {patientInfo && patientInfo.patientId && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">
                    Patient ID: {patientInfo.patientId}
                  </span>
                  <Button variant="ghost" size="icon" onClick={copyPatientId} className="h-5 w-5 p-0">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="profile">Personal Info</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 w-full pr-4">
            <TabsContent value="reports" className="space-y-4 mt-4 p-1 data-[state=active]:h-[400px] overflow-y-auto">
              {reports && reports.length > 0 ? (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <Card key={report.id} className="p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                          {report.imageUrl && (
                            <div className="h-16 w-16 rounded overflow-hidden shrink-0">
                              <img 
                                src={report.imageUrl} 
                                alt="Skin condition" 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-medium">{report.condition}</h3>
                              <Badge variant="outline">
                                {(report.confidence * 100).toFixed(1)}% confidence
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{report.date}</p>
                            {report.patientId && (
                              <p className="text-xs text-muted-foreground mt-1">ID: {report.patientId}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDownloadPDF(report.pdfUrl, `Report_${report.condition}_${report.date}.pdf`)}
                            className="flex gap-1 whitespace-nowrap"
                          >
                            <Download className="h-4 w-4" />
                            <span className="hidden sm:inline">Download</span>
                          </Button>
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleShareReport(report, 'whatsapp')}
                              title="Share via WhatsApp"
                              className="h-8 w-8"
                            >
                              <Share2 className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleShareReport(report, 'email')}
                              title="Share via Email"
                              className="h-8 w-8"
                            >
                              <Mail className="h-4 w-4 text-blue-600" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDeleteReport(report.id)}
                              title="Delete Report"
                              className="h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No reports available yet.</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your skin analysis reports will appear here after you upload and analyze an image.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="profile" className="space-y-4 mt-4 p-1 data-[state=active]:h-[400px] overflow-y-auto">
              {patientInfo ? (
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    {!isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="flex gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </Button>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">Patient ID</label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="text"
                            value={editedInfo?.patientId || ''}
                            readOnly
                            className="border-input bg-secondary text-foreground mt-1"
                          />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-1" 
                            onClick={copyPatientId}
                          >
                            <Copy className="h-3 w-3 mr-1" /> Copy
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Name</label>
                        <Input
                          type="text"
                          value={editedInfo?.name || ''}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="border-input bg-background text-foreground mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Age</label>
                        <Input
                          type="number"
                          min="1"
                          value={editedInfo?.age || ''}
                          onChange={(e) => handleInputChange('age', e.target.value)}
                          className="border-input bg-background text-foreground mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Skin Complexion</label>
                        <Input
                          type="text"
                          value={editedInfo?.complexion || ''}
                          onChange={(e) => handleInputChange('complexion', e.target.value)}
                          className="border-input bg-background text-foreground mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Symptoms</label>
                        <Input
                          type="text"
                          value={editedInfo?.symptoms || ''}
                          onChange={(e) => handleInputChange('symptoms', e.target.value)}
                          className="border-input bg-background text-foreground mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Products Used</label>
                        <Input
                          type="text"
                          value={editedInfo?.products || ''}
                          onChange={(e) => handleInputChange('products', e.target.value)}
                          className="border-input bg-background text-foreground mt-1"
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setEditedInfo(patientInfo);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleSavePersonalInfo}>Save</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Patient ID</p>
                        <div className="flex items-center gap-2">
                          <p className="truncate">{patientInfo.patientId}</p>
                          <Button variant="ghost" size="icon" onClick={copyPatientId} className="h-6 w-6 p-0">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Name</p>
                        <p>{patientInfo.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Age</p>
                        <p>{patientInfo.age}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Skin Complexion</p>
                        <p>{patientInfo.complexion}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Symptoms</p>
                        <p>{patientInfo.symptoms}</p>
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <p className="text-sm font-medium text-muted-foreground">Products Used</p>
                        <p>{patientInfo.products || "Not specified"}</p>
                      </div>
                    </div>
                  )}
                </Card>
              ) : (
                <div className="text-center py-8">
                  <User className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No profile information available.</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Complete the skin assessment to save your personal information.
                  </p>
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
