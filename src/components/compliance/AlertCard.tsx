import { AlertTriangle, Eye, CheckCircle, FileText, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AlertCardProps {
  title: string;
  summary: string;
  severity: "high" | "medium" | "low";
  department: string;
  linkedDocument: string;
  createdAt: string;
  isResolved?: boolean;
  onResolve?: () => void;
}

export const AlertCard = ({
  title,
  summary,
  severity,
  department,
  linkedDocument,
  createdAt,
  isResolved = false,
  onResolve
}: AlertCardProps) => {
  const getSeverityVariant = () => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getSeverityIcon = () => {
    if (severity === "high") {
      return <AlertTriangle className="h-4 w-4" />;
    }
    return null;
  };

  const getDepartmentColor = (dept: string) => {
    const colors: Record<string, string> = {
      "Safety": "bg-red-100 text-red-800",
      "HR": "bg-blue-100 text-blue-800",
      "Finance": "bg-green-100 text-green-800",
      "Engineering": "bg-purple-100 text-purple-800",
      "Procurement": "bg-orange-100 text-orange-800",
      "Legal": "bg-gray-100 text-gray-800"
    };
    return colors[dept] || "bg-gray-100 text-gray-800";
  };

  const getDepartmentInitials = (dept: string) => {
    return dept.substring(0, 2).toUpperCase();
  };

  return (
    <Card className={`transition-all hover:shadow-md ${severity === "high" && !isResolved ? "border-destructive bg-destructive/5" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <Avatar className={`w-10 h-10 ${getDepartmentColor(department)}`}>
            <AvatarFallback className="text-xs font-medium">
              {getDepartmentInitials(department)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold leading-tight">{title}</h3>
              <div className="flex items-center gap-2">
                <Badge variant={getSeverityVariant()} className="gap-1">
                  {getSeverityIcon()}
                  {severity.toUpperCase()}
                </Badge>
                {isResolved && (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{summary}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {department}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {createdAt}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" className="gap-2">
            <FileText className="h-4 w-4" />
            {linkedDocument}
          </Button>
          {!isResolved && onResolve && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onResolve}
              className="text-green-600 hover:text-green-700"
            >
              Resolve
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};