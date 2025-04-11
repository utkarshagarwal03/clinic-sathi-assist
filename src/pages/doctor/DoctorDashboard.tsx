
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import PatientList from "@/components/doctor/PatientList";
import QuickEntryForm from "@/components/doctor/QuickEntryForm";
import AlertCard from "@/components/doctor/AlertCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Bell, FileText, AlertTriangle } from "lucide-react";

const DoctorDashboard = () => {
  return (
    <MainLayout userType="doctor">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Welcome, Dr. Sharma</h1>
        <p className="text-gray-500 dark:text-gray-400">Tuesday, April 11, 2025</p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-medical-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-gray-500 mt-1">+2 in the last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">High Risk Patients</CardTitle>
            <AlertTriangle className="h-4 w-4 text-risk-high" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-gray-500 mt-1">Need immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-xs text-gray-500 mt-1">2 pending, 6 completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-xs text-gray-500 mt-1">2 critical alerts</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="patients">
            <TabsList>
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="alerts">Recent Alerts</TabsTrigger>
            </TabsList>
            <TabsContent value="patients" className="mt-6">
              <PatientList />
            </TabsContent>
            <TabsContent value="alerts" className="mt-6">
              <div className="space-y-4">
                <AlertCard
                  type="critical"
                  title="Abnormal Vital Signs"
                  description="Patient reported heart rate > 120 bpm and chest pain."
                  time="Today, 10:23 AM"
                  patientId="P1001"
                  patientName="Rajesh Kumar"
                />
                <AlertCard
                  type="warning"
                  title="Possible Medication Side Effect"
                  description="Patient reported dizziness after taking Metformin."
                  time="Today, 9:15 AM"
                  patientId="P1002"
                  patientName="Priya Sharma"
                />
                <AlertCard
                  type="warning"
                  title="Mental Health Concern"
                  description="PHQ-9 score of 15 (Moderately severe depression)."
                  time="Yesterday, 2:30 PM"
                  patientId="P1006"
                  patientName="Meera Joshi"
                />
                <AlertCard
                  type="info"
                  title="Medication Compliance Issue"
                  description="Patient has missed 3 consecutive doses of medication."
                  time="Yesterday, 10:45 AM"
                  patientId="P1003"
                  patientName="Amit Patel"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <QuickEntryForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default DoctorDashboard;
