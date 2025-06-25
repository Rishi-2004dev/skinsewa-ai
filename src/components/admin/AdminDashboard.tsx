import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentCheckbox } from "@/components/admin/AppointmentCheckbox";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, AlertCircle, Check, X, UserPlus, Calendar, Users, Settings, Shield } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock data for the admin dashboard
const mockAppointments = [
  { id: "A1001", patientName: "Amit Sharma", date: "2025-05-03", time: "10:00 AM", condition: "Acne", status: "Pending", clinicName: "Skin Care Solutions" },
  { id: "A1002", patientName: "Priya Patel", date: "2025-05-03", time: "11:30 AM", condition: "Eczema", status: "Confirmed", clinicName: "DermaCare Clinic" },
  { id: "A1003", patientName: "Rahul Verma", date: "2025-05-04", time: "9:15 AM", condition: "Psoriasis", status: "Completed", clinicName: "Perfect Skin Center" },
  { id: "A1004", patientName: "Neha Singh", date: "2025-05-04", time: "2:00 PM", condition: "Rosacea", status: "Confirmed", clinicName: "Skin Care Solutions" },
  { id: "A1005", patientName: "Vikram Mehta", date: "2025-05-05", time: "4:30 PM", condition: "Fungal infection", status: "Pending", clinicName: "DermaCare Clinic" },
];

const mockClinics = [
  { id: 1, name: "Skin Care Solutions", address: "123 Health Blvd, Mumbai", verified: true },
  { id: 2, name: "DermaCare Clinic", address: "456 Medical Lane, Delhi", verified: true },
  { id: 3, name: "Perfect Skin Center", address: "789 Wellness Road, Bangalore", verified: false },
  { id: 4, name: "Clear Complexion", address: "101 Doctor's Drive, Chennai", verified: true },
  { id: 5, name: "Dermatology Specialists", address: "202 Healing Path, Hyderabad", verified: false },
];

const mockRegistrationRequests = [
  { 
    id: "R1001", 
    clinicName: "Advanced Derma Care", 
    location: "Pune", 
    dateSubmitted: "2025-05-01", 
    status: "Pending",
    representative: "Dr. Rohan Mehra",
    phone: "+91-9876543210",
    specialties: ["Acne Treatment", "Dermatosurgery", "Laser Therapy"],
    registrationNumber: "DERM20250501"
  },
  { 
    id: "R1002", 
    clinicName: "Skin Wellness Hub", 
    location: "Kolkata", 
    dateSubmitted: "2025-05-02", 
    status: "Pending",
    representative: "Dr. Anjali Das",
    phone: "+91-8765432109",
    specialties: ["Psoriasis", "Vitiligo", "Pediatric Dermatology"],
    registrationNumber: "DERM20250502"
  },
  { 
    id: "R1003", 
    clinicName: "City Dermatology Center", 
    location: "Ahmedabad", 
    dateSubmitted: "2025-04-28", 
    status: "Under Review",
    representative: "Dr. Vikram Patel",
    phone: "+91-7654321098",
    specialties: ["Hair Transplant", "Cosmetic Dermatology", "Skin Allergies"],
    registrationNumber: "DERM20250428"
  },
];

const mockPatients = [
  { id: 1, name: "Amit Sharma", age: 32, appointments: 3, lastVisit: "2025-04-28" },
  { id: 2, name: "Priya Patel", age: 27, appointments: 1, lastVisit: "2025-04-30" },
  { id: 3, name: "Rahul Verma", age: 45, appointments: 5, lastVisit: "2025-04-25" },
  { id: 4, name: "Neha Singh", age: 19, appointments: 2, lastVisit: "2025-04-29" },
  { id: 5, name: "Vikram Mehta", age: 56, appointments: 4, lastVisit: "2025-04-27" },
];

type AiKeyFormState = {
  geminiKey: string;
};

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState(mockAppointments);
  const [clinics, setClinics] = useState(mockClinics);
  const [registrationRequests, setRegistrationRequests] = useState(mockRegistrationRequests);
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('geminiApiKey') || '');
  const isMobile = useIsMobile();

  const handleAppointmentStatusChange = (id: string, completed: boolean) => {
    setAppointments(prevAppointments => prevAppointments.map(appointment => {
      if (appointment.id === id) {
        return {
          ...appointment,
          status: completed ? "Completed" : "Confirmed"
        };
      }
      return appointment;
    }));
  };

  const handleClinicVerificationToggle = (id: number) => {
    setClinics(prevClinics => prevClinics.map(clinic => {
      if (clinic.id === id) {
        const newStatus = !clinic.verified;
        
        toast({
          title: newStatus ? "Clinic verified" : "Clinic verification removed",
          description: `${clinic.name} has been ${newStatus ? "verified" : "unverified"}.`,
        });
        
        return {
          ...clinic,
          verified: newStatus
        };
      }
      return clinic;
    }));
  };

  const handleApiKeySave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const geminiKey = formData.get('geminiKey') as string;
    
    localStorage.setItem('geminiApiKey', geminiKey);
    setGeminiApiKey(geminiKey);
    
    toast({
      title: "API Key Updated",
      description: "Gemini API key has been updated successfully",
    });
  };

  const handleRegistrationAction = (id: string, action: 'approve' | 'reject' | 'flag') => {
    setRegistrationRequests(prev => prev.map(req => {
      if (req.id === id) {
        const newStatus = action === 'approve' ? 'Approved' : action === 'reject' ? 'Rejected' : 'Requires More Info';
        
        toast({
          title: `Registration ${action === 'flag' ? 'flagged' : action === 'approve' ? 'approved' : 'rejected'}`,
          description: `${req.clinicName}'s registration has been ${action === 'flag' ? 'flagged for more information' : action === 'approve' ? 'approved' : 'rejected'}.`,
        });
        
        return {
          ...req,
          status: newStatus
        };
      }
      return req;
    }));
  };

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage patients, appointments, clinics and registration requests</p>
      </div>

      <Tabs defaultValue="registrations" className="space-y-8">
        {/* Mobile-optimized TabsList with icons */}
        <TabsList className={`${isMobile ? 'grid grid-cols-5 w-full' : 'grid grid-cols-5 max-w-2xl'}`}>
          <TabsTrigger value="registrations" className="flex items-center justify-center gap-2">
            {isMobile ? <UserPlus className="h-4 w-4" /> : (
              <>
                <UserPlus className="h-4 w-4 md:mr-1 hidden sm:inline-block" />
                <span>Registrations</span>
              </>
            )}
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center justify-center gap-2">
            {isMobile ? <Calendar className="h-4 w-4" /> : (
              <>
                <Calendar className="h-4 w-4 md:mr-1 hidden sm:inline-block" />
                <span>Appointments</span>
              </>
            )}
          </TabsTrigger>
          <TabsTrigger value="clinics" className="flex items-center justify-center gap-2">
            {isMobile ? <Shield className="h-4 w-4" /> : (
              <>
                <Shield className="h-4 w-4 md:mr-1 hidden sm:inline-block" />
                <span>Clinics</span>
              </>
            )}
          </TabsTrigger>
          <TabsTrigger value="patients" className="flex items-center justify-center gap-2">
            {isMobile ? <Users className="h-4 w-4" /> : (
              <>
                <Users className="h-4 w-4 md:mr-1 hidden sm:inline-block" />
                <span>Patients</span>
              </>
            )}
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center justify-center gap-2">
            {isMobile ? <Settings className="h-4 w-4" /> : (
              <>
                <Settings className="h-4 w-4 md:mr-1 hidden sm:inline-block" />
                <span>Settings</span>
              </>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="registrations" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Clinic Registration Requests</h2>
          
          <div className="grid gap-4">
            {registrationRequests.map(request => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardHeader className={`pb-2 ${isMobile ? 'flex-col' : ''}`}>
                  <div className={`flex ${isMobile ? 'flex-col gap-2' : 'justify-between items-start'}`}>
                    <div>
                      <CardTitle>{request.clinicName}</CardTitle>
                      <CardDescription>ID: {request.id} • {request.location} • Submitted: {request.dateSubmitted}</CardDescription>
                    </div>
                    <Badge 
                      className={`${
                        request.status === 'Approved' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : request.status === 'Rejected' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          : request.status === 'Under Review'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          : request.status === 'Requires More Info'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                      } ${isMobile ? 'self-start' : ''}`}
                    >
                      {request.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium">Representative</p>
                      <p className="text-sm">{request.representative}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm">{request.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Registration Number</p>
                      <p className="text-sm">{request.registrationNumber}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium">Specialties</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {request.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className={`${isMobile ? 'flex-col gap-3' : 'flex justify-between'} pt-1`}>
                  <Button 
                    variant="outline" 
                    size={isMobile ? "default" : "sm"} 
                    className={`flex items-center gap-1 ${isMobile ? 'w-full justify-center' : ''}`}
                    onClick={() => handleRegistrationAction(request.id, 'flag')}
                  >
                    <AlertCircle className="h-4 w-4" />
                    Request More Info
                  </Button>
                  <div className={`flex gap-2 ${isMobile ? 'w-full' : ''}`}>
                    <Button 
                      variant="destructive" 
                      size={isMobile ? "default" : "sm"}
                      onClick={() => handleRegistrationAction(request.id, 'reject')}
                      className={`flex items-center gap-1 ${isMobile ? 'flex-1' : ''}`}
                    >
                      <X className="h-4 w-4" />
                      Reject
                    </Button>
                    <Button 
                      variant="default" 
                      size={isMobile ? "default" : "sm"}
                      onClick={() => handleRegistrationAction(request.id, 'approve')}
                      className={`flex items-center gap-1 bg-green-600 hover:bg-green-700 ${isMobile ? 'flex-1' : ''}`}
                    >
                      <Check className="h-4 w-4" />
                      Approve
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="appointments" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Appointment Management</h2>
          
          <div className="grid gap-4">
            {appointments.map(appointment => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className={`flex ${isMobile ? 'flex-col gap-2' : 'justify-between items-start'}`}>
                    <div>
                      <CardTitle>{appointment.patientName}</CardTitle>
                      <CardDescription>ID: {appointment.id} • {appointment.condition}</CardDescription>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${isMobile ? 'self-start' : ''} 
                      ${appointment.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : 
                        appointment.status === "Confirmed" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"}`}>
                      {appointment.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-col space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Scheduled:</span> {appointment.date} at {appointment.time}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Clinic:</span> {appointment.clinicName}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className={`${isMobile ? 'flex-col gap-3' : 'flex justify-between'} pt-1`}>
                  <Button 
                    variant="outline" 
                    size={isMobile ? "default" : "sm"} 
                    className={`flex items-center gap-1 ${isMobile ? 'w-full justify-center' : ''}`}
                  >
                    <FileText className="h-4 w-4" />
                    View Details
                  </Button>
                  <div className={`flex items-center ${isMobile ? 'w-full justify-between' : 'space-x-2'}`}>
                    <span className="text-sm">Mark Complete</span>
                    <AppointmentCheckbox 
                      appointmentId={appointment.id}
                      initialState={appointment.status === "Completed"}
                      onStatusChange={handleAppointmentStatusChange}
                    />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="clinics" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Clinic Management</h2>
          
          <div className="grid gap-4">
            {clinics.map(clinic => (
              <Card key={clinic.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className={`flex ${isMobile ? 'flex-col gap-2' : 'justify-between items-start'}`}>
                    <div>
                      <CardTitle>{clinic.name}</CardTitle>
                      <CardDescription>{clinic.address}</CardDescription>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${isMobile ? 'self-start' : ''} ${
                      clinic.verified 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                        : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                    }`}>
                      {clinic.verified ? "Verified" : "Unverified"}
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className={`${isMobile ? 'flex-col gap-3' : 'flex justify-between'} pt-2`}>
                  <Button 
                    variant="outline" 
                    size={isMobile ? "default" : "sm"} 
                    className={`flex items-center gap-1 ${isMobile ? 'w-full justify-center' : ''}`}
                  >
                    <FileText className="h-4 w-4" />
                    View Details
                  </Button>
                  <div className={`flex items-center ${isMobile ? 'w-full justify-between' : 'space-x-2'}`}>
                    <label 
                      htmlFor={`verify-clinic-${clinic.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {clinic.verified ? "Verified" : "Verify Clinic"}
                    </label>
                    <Checkbox 
                      id={`verify-clinic-${clinic.id}`} 
                      checked={clinic.verified}
                      onCheckedChange={() => handleClinicVerificationToggle(clinic.id)}
                    />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="patients" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Patient Management</h2>
          
          <div className="grid gap-4">
            {mockPatients.map(patient => (
              <Card key={patient.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle>{patient.name}</CardTitle>
                  <CardDescription>Age: {patient.age} • Appointments: {patient.appointments}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm">
                    <span className="font-medium">Last Visit:</span> {patient.lastVisit}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end pt-1">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    View Records
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Setup the necessary API keys for the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleApiKeySave} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="geminiKey" className="text-sm font-medium">
                    Google Gemini API Key
                  </label>
                  <input
                    id="geminiKey"
                    name="geminiKey"
                    type="text"
                    defaultValue={geminiApiKey}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter your Gemini API key"
                  />
                  <p className="text-xs text-muted-foreground">
                    Used for AI-powered skin analysis and recommendations
                  </p>
                </div>
                <Button type="submit">Save API Keys</Button>
              </form>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Manage your admin account</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="destructive" onClick={onLogout}>Logout</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
