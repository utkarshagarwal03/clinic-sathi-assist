
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { CheckCircle2, Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

export default function MedicationLogger() {
  const [medications, setMedications] = useState<Medication[]>([
    { id: "1", name: "Metformin", dosage: "500mg", time: "morning", taken: true },
    { id: "2", name: "Amlodipine", dosage: "5mg", time: "evening", taken: false },
    { id: "3", name: "Atorvastatin", dosage: "10mg", time: "evening", taken: false }
  ]);
  
  const [newMed, setNewMed] = useState({ name: "", dosage: "", time: "morning" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleToggleMedication = (id: string) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const handleAddMedication = () => {
    if (!newMed.name || !newMed.dosage) {
      toast({
        title: "Missing Information",
        description: "Please fill in all medication details.",
        variant: "destructive",
      });
      return;
    }
    
    setMedications([
      ...medications, 
      { 
        id: Date.now().toString(), 
        ...newMed, 
        taken: false 
      }
    ]);
    
    setNewMed({ name: "", dosage: "", time: "morning" });
    
    toast({
      title: "Medication Added",
      description: `${newMed.name} has been added to your list.`,
    });
  };

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
    
    toast({
      title: "Medication Removed",
      description: "Medication has been removed from your list.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Medication Log Updated",
        description: "Your medication log has been updated successfully.",
      });
      
      // Check for missed medications
      const missedMeds = medications.filter(med => !med.taken);
      if (missedMeds.length > 0) {
        toast({
          title: "Reminder",
          description: `You have ${missedMeds.length} medication(s) that haven't been taken today.`,
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div>
        <h3 className="text-lg font-medium mb-6">Daily Medication Log</h3>
        
        <div className="space-y-6">
          {medications.map(med => (
            <div key={med.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <div className="font-medium">{med.name}</div>
                <div className="text-sm text-gray-500">{med.dosage} • {med.time === "morning" ? "Morning" : med.time === "afternoon" ? "Afternoon" : "Evening"}</div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={med.taken} 
                    onCheckedChange={() => handleToggleMedication(med.id)} 
                    id={`med-${med.id}`}
                  />
                  <Label htmlFor={`med-${med.id}`} className="text-sm">
                    {med.taken ? "Taken" : "Mark as taken"}
                  </Label>
                </div>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon"
                  className="text-gray-500"
                  onClick={() => handleRemoveMedication(med.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium mb-4">Add New Medication</h4>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 sm:col-span-5">
                <Label htmlFor="med-name" className="text-xs mb-1 block">Medication Name</Label>
                <Input 
                  id="med-name" 
                  value={newMed.name}
                  onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                  placeholder="e.g., Metformin" 
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <Label htmlFor="med-dosage" className="text-xs mb-1 block">Dosage</Label>
                <Input 
                  id="med-dosage" 
                  value={newMed.dosage}
                  onChange={(e) => setNewMed({...newMed, dosage: e.target.value})}
                  placeholder="e.g., 500mg" 
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <Label htmlFor="med-time" className="text-xs mb-1 block">Time</Label>
                <Select 
                  value={newMed.time}
                  onValueChange={(value) => setNewMed({...newMed, time: value})}
                >
                  <SelectTrigger id="med-time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="morning">Morning</SelectItem>
                      <SelectItem value="afternoon">Afternoon</SelectItem>
                      <SelectItem value="evening">Evening</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-12 sm:col-span-1 flex items-end">
                <Button 
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleAddMedication}
                  className="w-full h-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                <span>Updating...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                <span>Update Medication Log</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
