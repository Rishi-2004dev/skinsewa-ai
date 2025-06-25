
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";

interface ClinicRegistrationProps {
  onSubmit: (data: ClinicData) => void;
}

interface StaffMember {
  name: string;
  role: string;
  specialization: string;
  experience: string;
  qualification: string;
}

interface RepresentativeInfo {
  name: string;
  position: string;
  phone: string;
  email: string;
}

interface ClinicData {
  clinicName: string;
  clinicType: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactPhone: string;
  contactEmail: string;
  registrationNumber: string;
  establishedYear: string;
  facilities: string[];
  specialties: string[];
  representative: RepresentativeInfo;
  staff: StaffMember[];
}

export function ClinicRegistration({ onSubmit }: ClinicRegistrationProps) {
  const [formData, setFormData] = useState<ClinicData>({
    clinicName: "",
    clinicType: "private",
    address: "",
    city: "",
    state: "",
    pincode: "",
    contactPhone: "",
    contactEmail: "",
    registrationNumber: "",
    establishedYear: "",
    facilities: [""],
    specialties: [""],
    representative: {
      name: "",
      position: "",
      phone: "",
      email: ""
    },
    staff: [
      {
        name: "",
        role: "doctor",
        specialization: "",
        experience: "",
        qualification: ""
      }
    ]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === "representative") {
        setFormData(prev => ({
          ...prev,
          representative: {
            ...prev.representative,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (value: string, field: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      if (parent === "representative") {
        setFormData(prev => ({
          ...prev,
          representative: {
            ...prev.representative,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleArrayChange = (index: number, value: string, field: keyof ClinicData) => {
    if (field === 'facilities' || field === 'specialties') {
      setFormData(prev => {
        const newArray = [...prev[field]];
        newArray[index] = value;
        return {
          ...prev,
          [field]: newArray
        };
      });
    }
  };

  const addArrayItem = (field: 'facilities' | 'specialties') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayItem = (index: number, field: 'facilities' | 'specialties') => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const addStaffMember = () => {
    setFormData(prev => ({
      ...prev,
      staff: [
        ...prev.staff,
        {
          name: "",
          role: "doctor",
          specialization: "",
          experience: "",
          qualification: ""
        }
      ]
    }));
  };

  const removeStaffMember = (index: number) => {
    setFormData(prev => {
      const newStaff = [...prev.staff];
      newStaff.splice(index, 1);
      return {
        ...prev,
        staff: newStaff
      };
    });
  };

  const handleStaffChange = (index: number, field: keyof StaffMember, value: string) => {
    setFormData(prev => {
      const newStaff = [...prev.staff];
      newStaff[index] = {
        ...newStaff[index],
        [field]: value
      };
      return {
        ...prev,
        staff: newStaff
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Clinic Registration</CardTitle>
        <CardDescription>
          Register your clinic with SkinSewa to connect with patients seeking dermatological care
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clinicName">Clinic Name *</Label>
                <Input 
                  id="clinicName" 
                  name="clinicName" 
                  value={formData.clinicName} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clinicType">Clinic Type *</Label>
                <Select 
                  value={formData.clinicType} 
                  onValueChange={(value) => handleSelectChange(value, "clinicType")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select clinic type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="ngo">NGO</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Complete Address *</Label>
                <Textarea 
                  id="address" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange}
                  required
                  className="min-h-24"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input 
                  id="city" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input 
                  id="state" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pincode">PIN Code *</Label>
                <Input 
                  id="pincode" 
                  name="pincode" 
                  value={formData.pincode} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration/License Number *</Label>
                <Input 
                  id="registrationNumber" 
                  name="registrationNumber" 
                  value={formData.registrationNumber} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="establishedYear">Established Year</Label>
                <Input 
                  id="establishedYear" 
                  name="establishedYear" 
                  value={formData.establishedYear} 
                  onChange={handleChange}
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone *</Label>
                <Input 
                  id="contactPhone" 
                  name="contactPhone" 
                  value={formData.contactPhone} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input 
                  id="contactEmail" 
                  name="contactEmail" 
                  type="email" 
                  value={formData.contactEmail} 
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Facilities & Specialties</h3>
            
            <div className="space-y-4">
              <Label>Facilities Available</Label>
              {formData.facilities.map((facility, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input 
                    value={facility} 
                    onChange={(e) => handleArrayChange(index, e.target.value, "facilities")}
                    placeholder="e.g., Laser Treatment, UV Therapy"
                  />
                  {formData.facilities.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeArrayItem(index, "facilities")}
                      className="flex-shrink-0"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => addArrayItem("facilities")}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Facility
              </Button>
            </div>
            
            <div className="space-y-4">
              <Label>Specialties</Label>
              {formData.specialties.map((specialty, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input 
                    value={specialty} 
                    onChange={(e) => handleArrayChange(index, e.target.value, "specialties")}
                    placeholder="e.g., Dermatology, Pediatric Dermatology"
                  />
                  {formData.specialties.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeArrayItem(index, "specialties")}
                      className="flex-shrink-0"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => addArrayItem("specialties")}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Specialty
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Primary Representative</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="representative.name">Name *</Label>
                <Input 
                  id="representative.name" 
                  name="representative.name" 
                  value={formData.representative.name} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="representative.position">Position *</Label>
                <Input 
                  id="representative.position" 
                  name="representative.position" 
                  value={formData.representative.position} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="representative.phone">Phone *</Label>
                <Input 
                  id="representative.phone" 
                  name="representative.phone" 
                  value={formData.representative.phone} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="representative.email">Email *</Label>
                <Input 
                  id="representative.email" 
                  name="representative.email" 
                  type="email" 
                  value={formData.representative.email} 
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Key Staff Members</h3>
            
            {formData.staff.map((staffMember, index) => (
              <div key={index} className="border p-4 rounded-md bg-muted/30 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Staff Member {index + 1}</h4>
                  {formData.staff.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeStaffMember(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`staff-${index}-name`}>Name *</Label>
                    <Input 
                      id={`staff-${index}-name`}
                      value={staffMember.name} 
                      onChange={(e) => handleStaffChange(index, "name", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`staff-${index}-role`}>Role *</Label>
                    <Select 
                      value={staffMember.role} 
                      onValueChange={(value) => handleStaffChange(index, "role", value)}
                    >
                      <SelectTrigger id={`staff-${index}-role`}>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="nurse">Nurse</SelectItem>
                        <SelectItem value="technician">Technician</SelectItem>
                        <SelectItem value="admin">Administrative</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`staff-${index}-specialization`}>Specialization</Label>
                    <Input 
                      id={`staff-${index}-specialization`}
                      value={staffMember.specialization} 
                      onChange={(e) => handleStaffChange(index, "specialization", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`staff-${index}-experience`}>Experience (years)</Label>
                    <Input 
                      id={`staff-${index}-experience`}
                      value={staffMember.experience} 
                      onChange={(e) => handleStaffChange(index, "experience", e.target.value)}
                      type="number"
                      min="0"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`staff-${index}-qualification`}>Qualifications</Label>
                    <Input 
                      id={`staff-${index}-qualification`}
                      value={staffMember.qualification} 
                      onChange={(e) => handleStaffChange(index, "qualification", e.target.value)}
                      placeholder="e.g., MBBS, MD Dermatology"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={addStaffMember}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Staff Member
            </Button>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              By submitting this form, you agree that SkinSewa will review and verify your clinic's details.
              Once verified, you will receive login credentials via the provided email address.
            </p>
            
            <Button type="submit" className="w-full">Submit Registration</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
