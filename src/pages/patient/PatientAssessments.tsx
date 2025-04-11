
import MainLayout from "@/components/layout/MainLayout";
import SelfAssessment from "@/components/patient/SelfAssessment";

const PatientAssessments = () => {
  return (
    <MainLayout userType="patient">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Self-Assessments</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Complete these assessments to help track your mental health
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <SelfAssessment />
      </div>
    </MainLayout>
  );
};

export default PatientAssessments;
