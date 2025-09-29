import { AlertTriangle, Eye, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RoleDocumentCardProps {
  title: string;
  date: string;
  source: string;
  summary: string[];
  riskLevel: "high" | "medium" | "low";
  isCritical?: boolean;
  status?: "pending" | "reviewed" | "acknowledged";
  onAcknowledge?: () => void;
}

export const RoleDocumentCard = ({
  title,
  date,
  source,
  summary,
  riskLevel,
  isCritical = false,
  status = "pending",
  onAcknowledge
}: RoleDocumentCardProps) => {
  const getRiskBadgeVariant = () => {
    switch (riskLevel) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getRiskColor = () => {
    switch (riskLevel) {
      case "high": return "text-destructive";
      case "medium": return "text-orange-600";
      case "low": return "text-green-600";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card className={`transition-all hover:shadow-md ${isCritical ? "border-destructive bg-destructive/5" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {isCritical && <AlertTriangle className="h-4 w-4 text-destructive" />}
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">{source} • {date}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getRiskBadgeVariant()} className={riskLevel === "high" ? "text-white" : getRiskColor()}>
              {riskLevel.toUpperCase()}
            </Badge>
            {status === "acknowledged" && (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
            {status === "pending" && (
              <Clock className="h-4 w-4 text-orange-600" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Key Points:</h4>
          <ul className="space-y-1">
            {summary.map((point, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between pt-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Eye className="h-4 w-4" />
            View Full Document
          </Button>
          {status !== "acknowledged" && onAcknowledge && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onAcknowledge}
              className="text-green-600 hover:text-green-700"
            >
              Acknowledge
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};