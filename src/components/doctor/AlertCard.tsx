
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

type AlertType = "critical" | "warning" | "info";

interface AlertProps {
  type: AlertType;
  title: string;
  description: string;
  time: string;
  patientId: string;
  patientName: string;
}

export default function AlertCard({ type, title, description, time, patientId, patientName }: AlertProps) {
  const getAlertIcon = () => {
    switch (type) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-risk-high" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-risk-medium" />;
      case "info":
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-risk-high" />;
    }
  };

  const getAlertBadge = () => {
    switch (type) {
      case "critical":
        return <Badge className="bg-risk-high">Critical</Badge>;
      case "warning":
        return <Badge className="bg-risk-medium">Warning</Badge>;
      case "info":
        return <Badge className="bg-blue-500">Info</Badge>;
      default:
        return <Badge className="bg-risk-high">Critical</Badge>;
    }
  };

  return (
    <Card className="p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {getAlertIcon()}
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-medium">{title}</h3>
              {getAlertBadge()}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {description}
            </p>
            <div className="flex items-center mt-2 space-x-1 text-xs text-gray-400">
              <span>{patientName}</span>
              <span>•</span>
              <span>ID: {patientId}</span>
              <span>•</span>
              <span>{time}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4 justify-end">
        <Button variant="outline" size="sm">Dismiss</Button>
        <Button size="sm">View Details</Button>
      </div>
    </Card>
  );
}
