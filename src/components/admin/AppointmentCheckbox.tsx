
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

interface AppointmentCheckboxProps {
  appointmentId: string;
  initialState?: boolean;
  onStatusChange?: (id: string, completed: boolean) => void;
}

export function AppointmentCheckbox({ 
  appointmentId, 
  initialState = false,
  onStatusChange
}: AppointmentCheckboxProps) {
  const [isCompleted, setIsCompleted] = useState(initialState);
  const { toast } = useToast();

  const handleChange = (checked: boolean) => {
    setIsCompleted(checked);
    
    // In a real app, this would update the status in the database
    toast({
      title: checked ? "Appointment marked as completed" : "Appointment marked as pending",
      description: `Appointment ID: ${appointmentId}`,
      action: (
        <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
          <Check className="h-4 w-4 text-green-600" />
        </div>
      ),
    });
    
    if (onStatusChange) {
      onStatusChange(appointmentId, checked);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id={`appointment-${appointmentId}`} 
        checked={isCompleted}
        onCheckedChange={handleChange}
      />
      <Label 
        htmlFor={`appointment-${appointmentId}`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {isCompleted ? "Completed" : "Mark as completed"}
      </Label>
    </div>
  );
}
