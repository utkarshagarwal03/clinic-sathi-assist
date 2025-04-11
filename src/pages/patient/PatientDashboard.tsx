
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import MedicationLogger from "@/components/patient/MedicationLogger";
import SymptomLogger from "@/components/patient/SymptomLogger";
import MoodTracker from "@/components/patient/MoodTracker";
import SymptomChart from "@/components/charts/SymptomChart";

const PatientDashboard = () => {
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  });

  return (
    <MainLayout userType="patient">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">{greeting}, Ananya</h1>
        <p className="text-gray-500 dark:text-gray-400">Tuesday, April 11, 2025</p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Doctor Visit</CardTitle>
            <Calendar className="h-4 w-4 text-medical-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">April 15, 2025</div>
            <p className="text-xs text-gray-500 mt-1">Dr. Sharma, 10:30 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Medications</CardTitle>
            <Clock className="h-4 w-4 text-medical-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">3 Medications</div>
            <p className="text-xs text-gray-500 mt-1">1 taken, 2 pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">5 Days</div>
            <p className="text-xs text-gray-500 mt-1">Keep up the good work!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Symptom Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">1 Alert</div>
            <p className="text-xs text-gray-500 mt-1">Possible medication side effect</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="today">
            <TabsList>
              <TabsTrigger value="today">Today's Log</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="mood">Mood</TabsTrigger>
            </TabsList>
            <TabsContent value="today" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SymptomLogger />
                <MedicationLogger />
              </div>
            </TabsContent>
            <TabsContent value="trends" className="mt-6">
              <SymptomChart />
            </TabsContent>
            <TabsContent value="mood" className="mt-6">
              <MoodTracker />
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="bg-gradient-to-br from-medical-500 to-medical-700 text-white p-6">
            <CardHeader className="pb-2">
              <CardTitle>Upcoming Medications</CardTitle>
              <CardDescription className="text-medical-200">Don't forget to take these</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-medium">Metformin (500mg)</div>
                <div className="text-sm text-medical-100 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>12:30 PM - with lunch</span>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-medium">Amlodipine (5mg)</div>
                <div className="text-sm text-medical-100 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>8:00 PM - after dinner</span>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-medium">Atorvastatin (10mg)</div>
                <div className="text-sm text-medical-100 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>9:00 PM - before bed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default PatientDashboard;
