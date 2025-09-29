import { Calendar, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TimelineEvent {
  title: string;
  date: string;
  department: string;
  priority: "high" | "medium" | "low";
  daysLeft: number;
}

interface RoleTimelineProps {
  events: TimelineEvent[];
}

export const RoleTimeline = ({ events }: RoleTimelineProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-orange-600";
      case "low": return "text-green-600";
      default: return "text-muted-foreground";
    }
  };

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive/10 border-destructive/20";
      case "medium": return "bg-orange-100 border-orange-200";
      case "low": return "bg-green-100 border-green-200";
      default: return "bg-muted/10";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events.length === 0 ? (
            <p className="text-muted-foreground text-sm">No upcoming deadlines</p>
          ) : (
            events.map((event, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border ${getPriorityBg(event.priority)}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.department} • {event.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getPriorityColor(event.priority)}`}
                    >
                      {event.daysLeft}d left
                    </Badge>
                    {event.priority === "high" && event.daysLeft <= 3 && (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};