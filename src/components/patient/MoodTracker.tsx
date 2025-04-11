
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface MoodOption {
  value: string;
  label: string;
  emoji: string;
}

const moodOptions: MoodOption[] = [
  { value: "great", label: "Great", emoji: "😀" },
  { value: "good", label: "Good", emoji: "🙂" },
  { value: "okay", label: "Okay", emoji: "😐" },
  { value: "bad", label: "Bad", emoji: "😔" },
  { value: "terrible", label: "Terrible", emoji: "😫" }
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [journalEntry, setJournalEntry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleMoodSelect = (moodValue: string) => {
    setSelectedMood(moodValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) {
      toast({
        title: "Mood Not Selected",
        description: "Please select your mood before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Mood Logged",
        description: "Your mood and journal entry have been saved.",
      });

      // Reset form
      setSelectedMood(null);
      setJournalEntry("");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div>
        <h3 className="text-lg font-medium mb-6">How are you feeling today?</h3>
        
        <div className="space-y-6">
          <div className="flex flex-wrap justify-between gap-2">
            {moodOptions.map(mood => (
              <button
                key={mood.value}
                type="button"
                onClick={() => handleMoodSelect(mood.value)}
                className={`
                  flex-1 min-w-[80px] py-3 px-4 flex flex-col items-center rounded-lg transition-all
                  ${
                    selectedMood === mood.value 
                      ? "bg-medical-100 dark:bg-medical-900/30 border-2 border-medical-500 dark:border-medical-400" 
                      : "border border-gray-200 dark:border-gray-700 hover:border-medical-300"
                  }
                `}
              >
                <span className="text-2xl mb-1">{mood.emoji}</span>
                <span className="text-sm">{mood.label}</span>
              </button>
            ))}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="journal">Journal Entry (Optional)</Label>
            <Textarea 
              id="journal"
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="Write about your day or how you're feeling..." 
              className="h-32"
            />
            <p className="text-xs text-gray-500">Your entries are private and help track your mental well-being over time.</p>
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !selectedMood}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                <span>Saving...</span>
              </div>
            ) : (
              "Log Your Mood"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
