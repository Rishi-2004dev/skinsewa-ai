
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, User, FileHeart, Settings, FileText, Plus, Calendar, Clock, Download, Printer, ChevronDown, ChevronUp, Mail, Phone, MessageSquare } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface ClinicDashboardProps {
  onLogout: () => void;
}

// Sample patient data
const mockPatients = [
  { id: "P1001", name: "Ravi Kumar", age: 34, lastVisit: "2025-04-28", condition: "Acne", imageUrl: "/path/to/image1.jpg" },
  { id: "P1002", name: "Priya Singh", age: 27, lastVisit: "2025-05-01", condition: "Eczema", imageUrl: "/path/to/image2.jpg" },
  { id: "P1003", name: "Ajay Sharma", age: 45, lastVisit: "2025-04-25", condition: "Psoriasis", imageUrl: "/path/to/image3.jpg" },
  { id: "P1004", name: "Sunita Patel", age: 29, lastVisit: "2025-04-29", condition: "Rosacea", imageUrl: "/path/to/image4.jpg" },
];

// Sample reports data
const mockReports = [
  { id: "R1001", patientId: "P1001", date: "2025-04-28", type: "Skin Analysis", results: "Mild acne on forehead and cheeks." },
  { id: "R1002", patientId: "P1001", date: "2025-03-15", type: "Follow-up", results: "Improvement in acne condition." },
  { id: "R1003", patientId: "P1002", date: "2025-05-01", type: "Skin Analysis", results: "Moderate eczema on arms." },
  { id: "R1004", patientId: "P1003", date: "2025-04-25", type: "Allergy Test", results: "No allergies detected." },
  { id: "R1005", patientId: "P1004", date: "2025-04-29", type: "Skin Analysis", results: "Mild rosacea on cheeks." },
];

// Sample appointments data
const mockAppointments = [
  { 
    id: "A1001", 
    patientId: "P1001", 
    patientName: "Ravi Kumar", 
    date: "2025-05-05", 
    time: "10:00 AM", 
    status: "Scheduled",
    condition: "Acne",
    notes: "Follow-up for previous treatment"
  },
  { 
    id: "A1002", 
    patientId: "P1002", 
    patientName: "Priya Singh", 
    date: "2025-05-06", 
    time: "11:30 AM", 
    status: "Scheduled",
    condition: "Eczema",
    notes: "New treatment plan discussion"
  },
  { 
    id: "A1003", 
    patientId: "P1003", 
    patientName: "Ajay Sharma", 
    date: "2025-05-04", 
    time: "2:15 PM", 
    status: "Confirmed",
    condition: "Psoriasis",
    notes: "Monthly check-up"
  },
];

// Sample analytics data
const mockAnalytics = {
  totalPatients: 42,
  newPatientsThisMonth: 7,
  appointmentsThisWeek: 12,
  appointmentsCompleted: 8,
  topConditions: [
    { name: "Acne", count: 15 },
    { name: "Eczema", count: 8 },
    { name: "Psoriasis", count: 7 },
    { name: "Rosacea", count: 5 },
    { name: "Fungal infections", count: 4 }
  ]
};

export function ClinicDashboard({ onLogout }: ClinicDashboardProps) {
  const { toast } = useToast();
  const [searchPatientId, setSearchPatientId] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [expandedPatientView, setExpandedPatientView] = useState(false);
  const [clinicProfile, setClinicProfile] = useState({
    name: "Skin Care Solutions",
    address: "123 Health Street, New Delhi",
    phone: "+91-11-23456789",
    email: "info@skincaresolutions.in",
    registrationNumber: "SKNCL12345",
  });
  const [patientReports, setPatientReports] = useState<any[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);

  const handlePatientSearch = () => {
    if (!searchPatientId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a patient ID",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be an API call
    const foundPatient = mockPatients.find(p => 
      p.id.toLowerCase() === searchPatientId.toLowerCase()
    );
    
    if (foundPatient) {
      setSearchResults([foundPatient]);
      // Get associated reports
      const reports = mockReports.filter(r => r.patientId === foundPatient.id);
      setPatientReports(reports);
      
      toast({
        title: "Patient found",
        description: `Found records for ${foundPatient.name}`,
      });
    } else {
      setSearchResults([]);
      setPatientReports([]);
      toast({
        title: "Patient not found",
        description: "No patient records found with that ID",
        variant: "destructive",
      });
    }
  };

  const handleCredentialsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Credentials updated",
      description: "Your login credentials have been updated successfully",
    });
  };

  const handleAppointmentStatusChange = (id: string, newStatus: string) => {
    toast({
      title: "Appointment status updated",
      description: `Appointment #${id} status changed to ${newStatus}`,
    });
  };

  const handleAppointmentSelection = (id: string) => {
    setSelectedAppointment(selectedAppointment === id ? null : id);
  };

  const handleSendMessage = (patientId: string) => {
    toast({
      title: "Message sent",
      description: `Message sent to patient #${patientId}`,
    });
  };

  const handleExportReport = (reportId: string) => {
    toast({
      title: "Report exported",
      description: `Report #${reportId} has been exported to PDF`,
    });
  };

  const handlePrintReport = (reportId: string) => {
    toast({
      title: "Printing report",
      description: `Report #${reportId} has been sent to printer`,
    });
  };

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Clinic Dashboard</h1>
        <p className="text-muted-foreground">Manage patient records and clinic information</p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-8">
        <TabsList className="grid grid-cols-5 max-w-2xl">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Patients</CardDescription>
                <CardTitle className="text-3xl">{mockAnalytics.totalPatients}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +{mockAnalytics.newPatientsThisMonth} new this month
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-3xl">{mockAnalytics.appointmentsThisWeek}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Appointments scheduled
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Completed</CardDescription>
                <CardTitle className="text-3xl">{mockAnalytics.appointmentsCompleted}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Appointments this week
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Completion Rate</CardDescription>
                <CardTitle className="text-3xl">
                  {Math.round((mockAnalytics.appointmentsCompleted / mockAnalytics.appointmentsThisWeek) * 100)}%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Of scheduled appointments
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your schedule for the next 3 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAppointments.map(appointment => (
                    <Card key={appointment.id} className="hover:shadow-sm transition-shadow">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-base">{appointment.patientName}</CardTitle>
                          <Badge 
                            className={`${
                              appointment.status === 'Completed' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                : appointment.status === 'Confirmed' 
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                            }`}
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        <CardDescription>
                          Patient ID: {appointment.patientId} • {appointment.condition}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 pb-2">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {appointment.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {appointment.time}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-2 flex justify-end">
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <FileText className="h-4 w-4" />
                            <span>Details</span>
                          </Button>
                          <Select 
                            defaultValue={appointment.status}
                            onValueChange={(value) => handleAppointmentStatusChange(appointment.id, value)}
                          >
                            <SelectTrigger className="w-[140px] h-9">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Scheduled">Scheduled</SelectItem>
                              <SelectItem value="Confirmed">Confirmed</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                              <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Schedule New</span>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Conditions</CardTitle>
                <CardDescription>Most common conditions treated</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.topConditions.map((condition, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{condition.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-skinsewa-pink rounded-full" 
                            style={{ width: `${(condition.count / mockAnalytics.totalPatients) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{condition.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="patients" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Lookup</CardTitle>
              <CardDescription>Search for patients by their ID</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter patient ID (e.g., P1001)"
                    className="pl-8"
                    value={searchPatientId}
                    onChange={(e) => setSearchPatientId(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handlePatientSearch();
                    }}
                  />
                </div>
                <Button onClick={handlePatientSearch}>Search</Button>
              </div>
            </CardContent>
          </Card>

          {searchResults.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Patient Information</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setExpandedPatientView(!expandedPatientView)}
                  >
                    {expandedPatientView ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {searchResults.map(patient => (
                  <div key={patient.id} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-skinsewa-blue/10">
                        <User className="h-6 w-6 text-skinsewa-blue" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{patient.name}</h3>
                        <p className="text-sm text-muted-foreground">ID: {patient.id} • Age: {patient.age}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Last Visit</h4>
                        <p>{patient.lastVisit}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Condition</h4>
                        <p>{patient.condition}</p>
                      </div>
                    </div>

                    {expandedPatientView && (
                      <div className="pt-4 border-t border-border mt-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Contact Information</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{patient.name.toLowerCase().replace(' ', '.')}@example.com</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Treatment History</h4>
                          <div className="text-sm space-y-1">
                            <p>• Initial consultation on {new Date(patient.lastVisit).toLocaleDateString()} for {patient.condition}</p>
                            <p>• Prescribed topical treatment for 4 weeks</p>
                            <p>• Follow-up scheduled for {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex items-center gap-1"
                            onClick={() => handleSendMessage(patient.id)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            Message Patient
                          </Button>
                          <Button 
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Calendar className="h-4 w-4" />
                            Schedule Follow-up
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Full History</Button>
              </CardFooter>
            </Card>
          )}
          
          {searchResults.length > 0 && patientReports.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Patient Reports</CardTitle>
                <CardDescription>
                  {patientReports.length} reports found for {searchResults[0].name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientReports.map(report => (
                    <Card key={report.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-base">{report.type}</CardTitle>
                          <span className="text-sm text-muted-foreground">{report.date}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p className="text-sm">{report.results}</p>
                      </CardContent>
                      <CardFooter className="pt-2 flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex items-center gap-1"
                          onClick={() => handlePrintReport(report.id)}
                        >
                          <Printer className="h-4 w-4" />
                          <span>Print</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex items-center gap-1"
                          onClick={() => handleExportReport(report.id)}
                        >
                          <Download className="h-4 w-4" />
                          <span>Export</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Add New Report</span>
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Reports</CardTitle>
              <CardDescription>
                View and manage all patient reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReports.map(report => (
                  <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle className="text-base">{report.type}</CardTitle>
                          <CardDescription>
                            Patient ID: {report.patientId}
                          </CardDescription>
                        </div>
                        <span className="text-sm text-muted-foreground">{report.date}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-sm">{report.results}</p>
                    </CardContent>
                    <CardFooter className="pt-2 flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex items-center gap-1"
                        onClick={() => handlePrintReport(report.id)}
                      >
                        <Printer className="h-4 w-4" />
                        <span>Print</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex items-center gap-1"
                        onClick={() => handleExportReport(report.id)}
                      >
                        <Download className="h-4 w-4" />
                        <span>Export</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appointments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Schedule New</span>
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockAppointments.map(appointment => (
              <Card 
                key={appointment.id} 
                className={`hover:shadow-md transition-shadow cursor-pointer ${
                  selectedAppointment === appointment.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleAppointmentSelection(appointment.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{appointment.patientName}</CardTitle>
                      <CardDescription>ID: {appointment.patientId} • {appointment.condition}</CardDescription>
                    </div>
                    <Badge 
                      className={`${
                        appointment.status === 'Completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : appointment.status === 'Confirmed' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                      }`}
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {appointment.time}
                    </div>
                  </div>
                  
                  {selectedAppointment === appointment.id && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium">Notes</h4>
                          <p className="text-sm">{appointment.notes}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium">Actions</h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>Contact Patient</span>
                            </Button>
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              <span>View Patient Files</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-2">
                  <Select 
                    defaultValue={appointment.status}
                    onValueChange={(value) => handleAppointmentStatusChange(appointment.id, value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clinic Profile</CardTitle>
              <CardDescription>
                Update your clinic information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Clinic Name</label>
                  <Input value={clinicProfile.name} readOnly />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Registration Number</label>
                  <Input value={clinicProfile.registrationNumber} readOnly />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input value={clinicProfile.address} readOnly />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input value={clinicProfile.phone} readOnly />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input value={clinicProfile.email} readOnly />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Edit Profile</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Update Credentials</CardTitle>
              <CardDescription>
                Change your login credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCredentialsUpdate} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <Input type="password" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input type="password" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <Input type="password" required />
                </div>
                <Button type="submit">Update Password</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
