import { Calendar, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TimelineItem {
  title: string;
  date: string;
  department: string;
  status: "pending" | "in-progress" | "completed" | "overdue";
  daysLeft: number;
  description: string;
}

interface ComplianceTimelineProps {
  items: TimelineItem[];
}

export const ComplianceTimeline = ({ items }: ComplianceTimelineProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress": return <Clock className="h-4 w-4 text-blue-600" />;
      case "overdue": return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-50 border-green-200";
      case "in-progress": return "text-blue-600 bg-blue-50 border-blue-200";
      case "overdue": return "text-destructive bg-destructive/10 border-destructive/20";
      default: return "text-muted-foreground bg-muted/10 border-muted/20";
    }
  };

  const getDaysLeftBadge = (daysLeft: number, status: string) => {
    if (status === "completed") return null;
    
    const variant = daysLeft <= 0 ? "destructive" : daysLeft <= 3 ? "secondary" : "outline";
    const text = daysLeft <= 0 ? "Overdue" : `${daysLeft}d left`;
    
    return (
      <Badge variant={variant} className="text-xs">
        {text}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Compliance Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="relative">
              {index < items.length - 1 && (
                <div className="absolute left-2 top-8 w-0.5 h-16 bg-border" />
              )}
              <div className={`flex gap-4 p-4 rounded-lg border ${getStatusColor(item.status)}`}>
                <div className="flex-shrink-0 mt-0.5">
                  {getStatusIcon(item.status)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    {getDaysLeftBadge(item.daysLeft, item.status)}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{item.department}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};