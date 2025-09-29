import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, FileText, AlertTriangle, Clock, Mail, MessageSquare, Share2 } from "lucide-react";

interface AnalyticsData {
  totalDocs30d: number;
  highRisk30d: number;
  pendingFollowups: number;
  avgTimeToAction: string;
  docsBySource: {
    email: number;
    whatsapp: number;
    sharepoint: number;
    maximo: number;
    scan: number;
    cloud: number;
  };
}

const mockAnalyticsData: AnalyticsData = {
  totalDocs30d: 127,
  highRisk30d: 23,
  pendingFollowups: 8,
  avgTimeToAction: "2.3 hrs",
  docsBySource: {
    email: 35,
    whatsapp: 28,
    sharepoint: 22,
    maximo: 18,
    scan: 15,
    cloud: 9
  }
};

export const AnalyticsWidget = () => {
  const totalSourceDocs = Object.values(mockAnalyticsData.docsBySource).reduce((sum, count) => sum + count, 0);

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'email': return <Mail className="h-3 w-3" />;
      case 'whatsapp': return <MessageSquare className="h-3 w-3" />;
      case 'sharepoint': return <Share2 className="h-3 w-3" />;
      default: return <FileText className="h-3 w-3" />;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'email': return 'bg-blue-500';
      case 'whatsapp': return 'bg-teal-500';
      case 'sharepoint': return 'bg-green-500';
      case 'maximo': return 'bg-orange-500';
      case 'scan': return 'bg-gray-500';
      case 'cloud': return 'bg-purple-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5" />
          Document Analytics (30 Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{mockAnalyticsData.totalDocs30d}</div>
            <div className="text-xs text-muted-foreground">Total Docs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{mockAnalyticsData.highRisk30d}</div>
            <div className="text-xs text-muted-foreground">High Risk</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{mockAnalyticsData.pendingFollowups}</div>
            <div className="text-xs text-muted-foreground">Pending Follow-ups</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{mockAnalyticsData.avgTimeToAction}</div>
            <div className="text-xs text-muted-foreground">Avg. Time to Action</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Documents by Source (Last 7 Days)</h4>
          <div className="space-y-2">
            {Object.entries(mockAnalyticsData.docsBySource)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 3)
              .map(([source, count]) => {
                const percentage = Math.round((count / totalSourceDocs) * 100);
                return (
                  <div key={source} className="flex items-center gap-3">
                    <div className="flex items-center gap-2 w-20">
                      {getSourceIcon(source)}
                      <span className="text-xs capitalize">{source}</span>
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getSourceColor(source)}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {count}
                    </Badge>
                  </div>
                );
              })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};