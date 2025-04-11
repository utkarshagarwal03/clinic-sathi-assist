
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockData = [
  { date: "Apr 4", painLevel: 7, headache: 8, dizziness: 5, fatigue: 9, mood: 2 },
  { date: "Apr 5", painLevel: 6, headache: 6, dizziness: 5, fatigue: 8, mood: 3 },
  { date: "Apr 6", painLevel: 4, headache: 5, dizziness: 4, fatigue: 7, mood: 3 },
  { date: "Apr 7", painLevel: 5, headache: 7, dizziness: 3, fatigue: 6, mood: 2 },
  { date: "Apr 8", painLevel: 4, headache: 5, dizziness: 2, fatigue: 5, mood: 4 },
  { date: "Apr 9", painLevel: 3, headache: 3, dizziness: 2, fatigue: 4, mood: 4 },
  { date: "Apr 10", painLevel: 2, headache: 2, dizziness: 1, fatigue: 3, mood: 5 },
  { date: "Apr 11", painLevel: 1, headache: 2, dizziness: 0, fatigue: 3, mood: 4 }
];

const symptoms = [
  { value: "painLevel", label: "Pain Level", color: "#8884d8" },
  { value: "headache", label: "Headache", color: "#82ca9d" },
  { value: "dizziness", label: "Dizziness", color: "#ffc658" },
  { value: "fatigue", label: "Fatigue", color: "#ff8042" },
];

type TimeRange = "week" | "month" | "3months";

export default function SymptomChart() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(["painLevel", "headache"]);
  const [timeRange, setTimeRange] = useState<TimeRange>("week");
  
  const handleSymptomToggle = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };
  
  const getSymptomColor = (symptomKey: string) => {
    return symptoms.find(s => s.value === symptomKey)?.color || "#000";
  };
  
  const getSymptomLabel = (symptomKey: string) => {
    return symptoms.find(s => s.value === symptomKey)?.label || symptomKey;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-medium mb-6">Symptom Trends</h3>
      
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {symptoms.map(symptom => (
            <Button
              key={symptom.value}
              variant={selectedSymptoms.includes(symptom.value) ? "default" : "outline"}
              size="sm"
              onClick={() => handleSymptomToggle(symptom.value)}
              className={selectedSymptoms.includes(symptom.value) ? "" : ""}
              style={{
                backgroundColor: selectedSymptoms.includes(symptom.value) ? symptom.color : "",
                color: selectedSymptoms.includes(symptom.value) ? "white" : "",
                borderColor: !selectedSymptoms.includes(symptom.value) ? symptom.color : ""
              }}
            >
              {symptom.label}
            </Button>
          ))}
        </div>
        
        <Select
          value={timeRange}
          onValueChange={(value: TimeRange) => setTimeRange(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="line" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="line">Line Chart</TabsTrigger>
          <TabsTrigger value="mood">Mood Chart</TabsTrigger>
        </TabsList>
        
        <TabsContent value="line">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                {selectedSymptoms.map(symptom => (
                  <Line
                    key={symptom}
                    type="monotone"
                    dataKey={symptom}
                    name={getSymptomLabel(symptom)}
                    stroke={getSymptomColor(symptom)}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-center text-gray-500">
            <p>Symptom severity scale: 0 (none) to 10 (severe)</p>
          </div>
        </TabsContent>
        
        <TabsContent value="mood">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="mood"
                  name="Mood"
                  stroke="#9b87f5"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-center text-gray-500">
            <p>Mood scale: 1 (very bad) to 5 (very good)</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
