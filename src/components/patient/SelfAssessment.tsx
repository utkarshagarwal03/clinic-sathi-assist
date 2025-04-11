
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

interface Question {
  id: string;
  text: string;
}

const phq9Questions: Question[] = [
  { id: "q1", text: "Little interest or pleasure in doing things" },
  { id: "q2", text: "Feeling down, depressed, or hopeless" },
  { id: "q3", text: "Trouble falling or staying asleep, or sleeping too much" },
  { id: "q4", text: "Feeling tired or having little energy" },
  { id: "q5", text: "Poor appetite or overeating" },
  { id: "q6", text: "Feeling bad about yourself" },
  { id: "q7", text: "Trouble concentrating on things" },
  { id: "q8", text: "Moving or speaking slowly, or being fidgety/restless" },
  { id: "q9", text: "Thoughts of being better off dead or hurting yourself" }
];

const gad7Questions: Question[] = [
  { id: "g1", text: "Feeling nervous, anxious, or on edge" },
  { id: "g2", text: "Not being able to stop or control worrying" },
  { id: "g3", text: "Worrying too much about different things" },
  { id: "g4", text: "Trouble relaxing" },
  { id: "g5", text: "Being so restless that it's hard to sit still" },
  { id: "g6", text: "Becoming easily annoyed or irritable" },
  { id: "g7", text: "Feeling afraid as if something awful might happen" }
];

export default function SelfAssessment() {
  const [phq9Answers, setPhq9Answers] = useState<Record<string, number>>({});
  const [gad7Answers, setGad7Answers] = useState<Record<string, number>>({});
  const [phq9Score, setPhq9Score] = useState<number | null>(null);
  const [gad7Score, setGad7Score] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handlePhq9Change = (questionId: string, value: string) => {
    setPhq9Answers({
      ...phq9Answers,
      [questionId]: parseInt(value)
    });
  };

  const handleGad7Change = (questionId: string, value: string) => {
    setGad7Answers({
      ...gad7Answers,
      [questionId]: parseInt(value)
    });
  };

  const calculatePhq9Score = () => {
    return Object.values(phq9Answers).reduce((sum, value) => sum + value, 0);
  };

  const calculateGad7Score = () => {
    return Object.values(gad7Answers).reduce((sum, value) => sum + value, 0);
  };

  const getPhq9Severity = (score: number) => {
    if (score >= 0 && score <= 4) return "Minimal or none";
    if (score >= 5 && score <= 9) return "Mild";
    if (score >= 10 && score <= 14) return "Moderate";
    if (score >= 15 && score <= 19) return "Moderately severe";
    if (score >= 20) return "Severe";
    return "";
  };

  const getGad7Severity = (score: number) => {
    if (score >= 0 && score <= 4) return "Minimal anxiety";
    if (score >= 5 && score <= 9) return "Mild anxiety";
    if (score >= 10 && score <= 14) return "Moderate anxiety";
    if (score >= 15) return "Severe anxiety";
    return "";
  };

  const handleSubmit = (assessmentType: "phq9" | "gad7") => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (assessmentType === "phq9") {
        const score = calculatePhq9Score();
        setPhq9Score(score);
        
        toast({
          title: "PHQ-9 Assessment Complete",
          description: `Your depression screening score is ${score} (${getPhq9Severity(score)}).`,
        });
        
        if (score >= 10) {
          setTimeout(() => {
            toast({
              title: "Mental Health Alert",
              description: "Your PHQ-9 score indicates moderate or higher depression symptoms. Consider consulting with a healthcare provider.",
              variant: "destructive",
            });
          }, 1000);
        }
      } else {
        const score = calculateGad7Score();
        setGad7Score(score);
        
        toast({
          title: "GAD-7 Assessment Complete",
          description: `Your anxiety screening score is ${score} (${getGad7Severity(score)}).`,
        });
        
        if (score >= 10) {
          setTimeout(() => {
            toast({
              title: "Mental Health Alert",
              description: "Your GAD-7 score indicates moderate or higher anxiety symptoms. Consider consulting with a healthcare provider.",
              variant: "destructive",
            });
          }, 1000);
        }
      }
    }, 1500);
  };

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-medium mb-6">Mental Health Self-Assessment</h3>
      
      <Tabs defaultValue="phq9" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="phq9">PHQ-9 (Depression)</TabsTrigger>
          <TabsTrigger value="gad7">GAD-7 (Anxiety)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="phq9" className="space-y-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
          </div>
          
          {phq9Questions.map((question) => (
            <div key={question.id} className="space-y-2 border-b border-gray-200 dark:border-gray-700 pb-4">
              <Label className="text-sm font-medium">{question.text}</Label>
              <RadioGroup 
                onValueChange={(value) => handlePhq9Change(question.id, value)} 
                value={phq9Answers[question.id]?.toString()} 
                className="grid grid-cols-2 gap-2 sm:grid-cols-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id={`${question.id}-0`} />
                  <Label htmlFor={`${question.id}-0`} className="text-xs">Not at all</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id={`${question.id}-1`} />
                  <Label htmlFor={`${question.id}-1`} className="text-xs">Several days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id={`${question.id}-2`} />
                  <Label htmlFor={`${question.id}-2`} className="text-xs">More than half the days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id={`${question.id}-3`} />
                  <Label htmlFor={`${question.id}-3`} className="text-xs">Nearly every day</Label>
                </div>
              </RadioGroup>
            </div>
          ))}
          
          {phq9Score !== null && (
            <div className={`p-4 rounded-lg ${
              phq9Score >= 10 ? "bg-red-50 dark:bg-red-900/20" : "bg-green-50 dark:bg-green-900/20"
            }`}>
              <div className="flex items-start">
                {phq9Score >= 10 && (
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                )}
                <div>
                  <h4 className="font-medium">
                    Your PHQ-9 Score: {phq9Score} - {getPhq9Severity(phq9Score)}
                  </h4>
                  <p className="text-sm mt-1">
                    {phq9Score < 10 
                      ? "Your symptoms suggest minimal to mild depression. Continue monitoring your mood." 
                      : "Your symptoms suggest moderate or severe depression. Please consider discussing these results with your healthcare provider."}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <Button 
            onClick={() => handleSubmit("phq9")} 
            disabled={isSubmitting || Object.keys(phq9Answers).length < phq9Questions.length}
            className="w-full"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                <span>Processing...</span>
              </div>
            ) : (
              phq9Score === null ? "Submit Assessment" : "Update Assessment"
            )}
          </Button>
        </TabsContent>
        
        <TabsContent value="gad7" className="space-y-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
          </div>
          
          {gad7Questions.map((question) => (
            <div key={question.id} className="space-y-2 border-b border-gray-200 dark:border-gray-700 pb-4">
              <Label className="text-sm font-medium">{question.text}</Label>
              <RadioGroup 
                onValueChange={(value) => handleGad7Change(question.id, value)} 
                value={gad7Answers[question.id]?.toString()} 
                className="grid grid-cols-2 gap-2 sm:grid-cols-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id={`${question.id}-0`} />
                  <Label htmlFor={`${question.id}-0`} className="text-xs">Not at all</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id={`${question.id}-1`} />
                  <Label htmlFor={`${question.id}-1`} className="text-xs">Several days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id={`${question.id}-2`} />
                  <Label htmlFor={`${question.id}-2`} className="text-xs">More than half the days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id={`${question.id}-3`} />
                  <Label htmlFor={`${question.id}-3`} className="text-xs">Nearly every day</Label>
                </div>
              </RadioGroup>
            </div>
          ))}
          
          {gad7Score !== null && (
            <div className={`p-4 rounded-lg ${
              gad7Score >= 10 ? "bg-red-50 dark:bg-red-900/20" : "bg-green-50 dark:bg-green-900/20"
            }`}>
              <div className="flex items-start">
                {gad7Score >= 10 && (
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                )}
                <div>
                  <h4 className="font-medium">
                    Your GAD-7 Score: {gad7Score} - {getGad7Severity(gad7Score)}
                  </h4>
                  <p className="text-sm mt-1">
                    {gad7Score < 10 
                      ? "Your symptoms suggest minimal to mild anxiety. Continue monitoring your anxiety levels." 
                      : "Your symptoms suggest moderate or severe anxiety. Please consider discussing these results with your healthcare provider."}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <Button 
            onClick={() => handleSubmit("gad7")} 
            disabled={isSubmitting || Object.keys(gad7Answers).length < gad7Questions.length}
            className="w-full"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                <span>Processing...</span>
              </div>
            ) : (
              gad7Score === null ? "Submit Assessment" : "Update Assessment"
            )}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
