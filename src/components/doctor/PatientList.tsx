
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  riskLevel: "high" | "medium" | "low";
}

const mockPatients: Patient[] = [
  {
    id: "P1001",
    name: "Rajesh Kumar",
    age: 45,
    condition: "Type 2 Diabetes",
    lastVisit: "2024-04-08",
    riskLevel: "high"
  },
  {
    id: "P1002",
    name: "Priya Sharma",
    age: 38,
    condition: "Hypertension",
    lastVisit: "2024-04-05",
    riskLevel: "medium"
  },
  {
    id: "P1003",
    name: "Amit Patel",
    age: 52,
    condition: "COPD",
    lastVisit: "2024-04-01",
    riskLevel: "high"
  },
  {
    id: "P1004",
    name: "Sunita Gupta",
    age: 29,
    condition: "Asthma",
    lastVisit: "2024-03-28",
    riskLevel: "low"
  },
  {
    id: "P1005",
    name: "Vikram Singh",
    age: 61,
    condition: "Coronary Artery Disease",
    lastVisit: "2024-04-06",
    riskLevel: "high"
  },
  {
    id: "P1006",
    name: "Meera Joshi",
    age: 34,
    condition: "Rheumatoid Arthritis",
    lastVisit: "2024-03-30",
    riskLevel: "medium"
  },
  {
    id: "P1007",
    name: "Deepak Verma",
    age: 42,
    condition: "Chronic Kidney Disease",
    lastVisit: "2024-04-02",
    riskLevel: "high"
  },
  {
    id: "P1008",
    name: "Ananya Das",
    age: 27,
    condition: "Migraine",
    lastVisit: "2024-04-04",
    riskLevel: "low"
  }
];

export default function PatientList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");

  const filteredPatients = mockPatients
    .filter(patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(patient => 
      filter === "all" ? true : patient.riskLevel === filter
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search patients..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 self-start sm:self-auto">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={filter === "high" ? "default" : "outline"}
            onClick={() => setFilter("high")}
            className={filter === "high" ? "bg-risk-high hover:bg-risk-high/90" : ""}
            size="sm"
          >
            High Risk
          </Button>
          <Button
            variant={filter === "medium" ? "default" : "outline"}
            onClick={() => setFilter("medium")}
            className={filter === "medium" ? "bg-risk-medium hover:bg-risk-medium/90" : ""}
            size="sm"
          >
            Medium
          </Button>
          <Button
            variant={filter === "low" ? "default" : "outline"}
            onClick={() => setFilter("low")}
            className={filter === "low" ? "bg-risk-low hover:bg-risk-low/90" : ""}
            size="sm"
          >
            Low Risk
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.length > 0 ? (
          filteredPatients.map(patient => (
            <Link to={`/doctor/patients/${patient.id}`} key={patient.id}>
              <Card className="card-hover p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{patient.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{patient.age} yrs • {patient.condition}</p>
                    <p className="text-xs text-gray-400 mt-1">Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</p>
                  </div>
                  <Badge className={`
                    ${patient.riskLevel === "high" ? "bg-risk-high" : ""} 
                    ${patient.riskLevel === "medium" ? "bg-risk-medium" : ""} 
                    ${patient.riskLevel === "low" ? "bg-risk-low" : ""}
                  `}>
                    {patient.riskLevel === "high" ? "High Risk" : ""}
                    {patient.riskLevel === "medium" ? "Medium Risk" : ""}
                    {patient.riskLevel === "low" ? "Low Risk" : ""}
                  </Badge>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-3 text-center py-8">
            <p>No patients found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
