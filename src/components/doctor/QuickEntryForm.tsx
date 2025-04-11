
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Save, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const vitalTemplates = [
  "Normal vitals. Patient is stable.",
  "BP elevated at 140/90. Heart rate normal at 72 bpm.",
  "Fever of 38.5°C. Other vitals normal.",
  "Respiratory rate increased at 22/min. SpO2 95%."
];

const medicationTemplates = [
  "Continue current medications. No changes.",
  "Started Metformin 500mg twice daily.",
  "Increased Amlodipine from 5mg to 10mg daily.",
  "Discontinued Ibuprofen due to GI side effects."
];

export default function QuickEntryForm() {
  const [isRecording, setIsRecording] = useState(false);
  const [vitalsText, setVitalsText] = useState("");
  const [symptomsText, setSymptomsText] = useState("");
  const [medicationText, setMedicationText] = useState("");
  const [notesText, setNotesText] = useState("");
  const { toast } = useToast();

  const simulateVoiceRecording = (field: string) => {
    setIsRecording(true);
    
    setTimeout(() => {
      setIsRecording(false);
      
      let text = "";
      
      switch (field) {
        case "vitals":
          text = "Blood pressure 130/85, pulse 76, temperature 37.0°C";
          setVitalsText(text);
          break;
        case "symptoms":
          text = "Patient reports mild headache, fatigue after eating, and occasional dizziness";
          setSymptomsText(text);
          break;
        case "medication":
          text = "Prescribed Metformin 500mg twice daily, Losartan 50mg once daily";
          setMedicationText(text);
          break;
        case "notes":
          text = "Patient adhering well to medication schedule. Advised to monitor blood glucose levels more frequently";
          setNotesText(text);
          break;
      }
      
      toast({
        title: "Voice transcription complete",
        description: `Text added to ${field} field.`,
      });
    }, 2000);
  };

  const handleSave = () => {
    toast({
      title: "Patient data saved",
      description: "All information has been recorded successfully.",
    });

    // Reset form
    setVitalsText("");
    setSymptomsText("");
    setMedicationText("");
    setNotesText("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-medium mb-6">Quick Entry Form</h3>
      
      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="template">Use Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="vitals">Vitals</Label>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => simulateVoiceRecording("vitals")}
                  disabled={isRecording}
                >
                  <Mic size={18} className={isRecording ? "text-red-500 animate-pulse" : ""} />
                </Button>
              </div>
              <Textarea 
                id="vitals" 
                value={vitalsText} 
                onChange={(e) => setVitalsText(e.target.value)} 
                placeholder="Enter vital signs..." 
                className="h-20"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="symptoms">Symptoms</Label>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => simulateVoiceRecording("symptoms")}
                  disabled={isRecording}
                >
                  <Mic size={18} className={isRecording ? "text-red-500 animate-pulse" : ""} />
                </Button>
              </div>
              <Textarea 
                id="symptoms" 
                value={symptomsText} 
                onChange={(e) => setSymptomsText(e.target.value)} 
                placeholder="Enter symptoms..." 
                className="h-20"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="medication">Medication & Treatment</Label>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => simulateVoiceRecording("medication")}
                  disabled={isRecording}
                >
                  <Mic size={18} className={isRecording ? "text-red-500 animate-pulse" : ""} />
                </Button>
              </div>
              <Textarea 
                id="medication" 
                value={medicationText} 
                onChange={(e) => setMedicationText(e.target.value)}
                placeholder="Enter medications and treatment..." 
                className="h-20"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="notes">Additional Notes</Label>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => simulateVoiceRecording("notes")}
                  disabled={isRecording}
                >
                  <Mic size={18} className={isRecording ? "text-red-500 animate-pulse" : ""} />
                </Button>
              </div>
              <Textarea 
                id="notes" 
                value={notesText} 
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Additional notes or observations..." 
                className="h-20"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="template">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="vital-template">Vitals Template</Label>
              <Select onValueChange={(value) => setVitalsText(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template..." />
                </SelectTrigger>
                <SelectContent>
                  {vitalTemplates.map((template, index) => (
                    <SelectItem key={index} value={template}>{template}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea 
                id="vital-template" 
                value={vitalsText} 
                onChange={(e) => setVitalsText(e.target.value)} 
                placeholder="Selected template will appear here..." 
                className="h-20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="medication-template">Medication Template</Label>
              <Select onValueChange={(value) => setMedicationText(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template..." />
                </SelectTrigger>
                <SelectContent>
                  {medicationTemplates.map((template, index) => (
                    <SelectItem key={index} value={template}>{template}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea 
                id="medication-template" 
                value={medicationText} 
                onChange={(e) => setMedicationText(e.target.value)} 
                placeholder="Selected template will appear here..." 
                className="h-20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="symptoms">Symptoms</Label>
              <Textarea 
                id="symptoms"
                value={symptomsText} 
                onChange={(e) => setSymptomsText(e.target.value)}
                placeholder="Enter symptoms..." 
                className="h-20" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea 
                id="notes"
                value={notesText} 
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Additional notes or observations..." 
                className="h-20" 
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => window.alert("Draft saved!")}>
          Save as Draft
        </Button>
        <Button onClick={handleSave} className="flex items-center">
          <Save className="mr-2 h-4 w-4" />
          Save Record
        </Button>
      </div>
    </div>
  );
}
