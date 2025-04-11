
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function SymptomLogger() {
  const [painLevel, setPainLevel] = useState<number[]>([0]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomText, setSymptomText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const commonSymptoms = [
    { value: "headache", label: "Headache" },
    { value: "fatigue", label: "Fatigue" },
    { value: "nausea", label: "Nausea" },
    { value: "dizziness", label: "Dizziness" },
    { value: "shortness_of_breath", label: "Shortness of Breath" },
    { value: "chest_pain", label: "Chest Pain" },
    { value: "fever", label: "Fever" },
    { value: "cough", label: "Cough" },
    { value: "muscle_pain", label: "Muscle Pain" },
    { value: "joint_pain", label: "Joint Pain" }
  ];

  const handleSymptomChange = (value: string) => {
    if (!selectedSymptoms.includes(value)) {
      setSelectedSymptoms([...selectedSymptoms, value]);
    }
  };

  const removeSymptom = (symptomValue: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(v => v !== symptomValue));
  };

  const getLabelForValue = (value: string) => {
    const symptom = commonSymptoms.find(s => s.value === value);
    return symptom ? symptom.label : value;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Symptoms Logged",
        description: "Your symptoms have been recorded successfully.",
      });

      // Check for potential ADR based on symptoms
      if (
        selectedSymptoms.includes("dizziness") || 
        selectedSymptoms.includes("nausea") ||
        symptomText.toLowerCase().includes("dizziness") ||
        symptomText.toLowerCase().includes("nausea")
      ) {
        // Show ADR alert after a small delay
        setTimeout(() => {
          toast({
            title: "Possible Medication Side Effect",
            description: "Dizziness/nausea may be related to your current medication. Please consult your doctor.",
            variant: "destructive",
          });
        }, 1000);
      }

      // Reset form
      setPainLevel([0]);
      setSelectedSymptoms([]);
      setSymptomText("");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div>
        <h3 className="text-lg font-medium mb-6">Daily Symptom Logger</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symptoms">Select Symptoms</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedSymptoms.map(symptom => (
                <div 
                  key={symptom}
                  className="bg-medical-100 dark:bg-medical-900/30 text-medical-700 dark:text-medical-300 text-sm rounded-full px-3 py-1 flex items-center"
                >
                  {getLabelForValue(symptom)}
                  <button 
                    type="button" 
                    onClick={() => removeSymptom(symptom)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <Select onValueChange={handleSymptomChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select symptom" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {commonSymptoms.map(symptom => (
                    <SelectItem 
                      key={symptom.value} 
                      value={symptom.value}
                      disabled={selectedSymptoms.includes(symptom.value)}
                    >
                      {symptom.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pain-level">Pain Level: {painLevel[0]}/10</Label>
            <Slider 
              id="pain-level"
              defaultValue={[0]} 
              max={10} 
              step={1}
              value={painLevel}
              onValueChange={setPainLevel}
              className="py-4"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea 
              id="notes" 
              value={symptomText}
              onChange={(e) => setSymptomText(e.target.value)}
              placeholder="Describe your symptoms in more detail..." 
              className="h-32"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                <span>Logging...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                <span>Log Symptoms</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
