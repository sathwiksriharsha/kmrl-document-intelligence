import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, AlertTriangle, TrendingUp, Clock } from "lucide-react";

interface DailyBriefItem {
  id: string;
  title: string;
  category: "safety" | "operations" | "maintenance" | "policy";
  priority: "high" | "medium" | "low";
  summary: string;
  actionRequired: boolean;
  source: string;
  timestamp: string;
}

const mockDailyBrief: DailyBriefItem[] = [
  {
    id: "DB001",
    title: "Updated Safety Protocol for Emergency Evacuation",
    category: "safety",
    priority: "high",
    summary: "New emergency evacuation procedures effective immediately. All station staff must review updated protocols. Key changes include revised assembly points and communication procedures during emergencies.",
    actionRequired: true,
    source: "Safety Department",
    timestamp: "2025-09-17 08:30"
  },
  {
    id: "DB002",
    title: "Train Schedule Adjustments - Peak Hours",
    category: "operations",
    priority: "medium",
    summary: "Minor adjustments to morning peak hour schedules starting September 20. Trains will run at 4-minute intervals between 8:00-10:00 AM to manage increased passenger volume.",
    actionRequired: false,
    source: "Operations Control",
    timestamp: "2025-09-17 07:45"
  },
  {
    id: "DB003",
    title: "Platform Maintenance - Edapally Station",
    category: "maintenance",
    priority: "medium",
    summary: "Scheduled platform maintenance at Edapally Station on September 22, 11:00 PM - 5:00 AM. Platform 2 will be temporarily closed. Passenger guidance protocols in effect.",
    actionRequired: true,
    source: "Maintenance Department",
    timestamp: "2025-09-17 06:15"
  },
  {
    id: "DB004",
    title: "Customer Service Excellence Initiative",
    category: "policy",
    priority: "low",
    summary: "New customer service guidelines emphasizing proactive assistance and passenger engagement. Digital feedback system launched for real-time service quality monitoring.",
    actionRequired: false,
    source: "Customer Relations",
    timestamp: "2025-09-16 16:30"
  }
];

const DailyBriefs = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "safety": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "operations": return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case "maintenance": return <Clock className="h-4 w-4 text-orange-500" />;
      case "policy": return <FileText className="h-4 w-4 text-green-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            Daily Briefs
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            AI-generated digest of important documents and updates
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">New Updates</p>
                <p className="text-lg md:text-xl font-bold">{mockDailyBrief.length}</p>
              </div>
              <div className="p-1 md:p-2 bg-blue-100 rounded text-blue-600">
                <FileText className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Action Required</p>
                <p className="text-lg md:text-xl font-bold">
                  {mockDailyBrief.filter(item => item.actionRequired).length}
                </p>
              </div>
              <div className="p-1 md:p-2 bg-red-100 rounded text-red-600">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">High Priority</p>
                <p className="text-lg md:text-xl font-bold">
                  {mockDailyBrief.filter(item => item.priority === "high").length}
                </p>
              </div>
              <div className="p-1 md:p-2 bg-orange-100 rounded text-orange-600">
                <Clock className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Departments</p>
                <p className="text-lg md:text-xl font-bold">4</p>
              </div>
              <div className="p-1 md:p-2 bg-green-100 rounded text-green-600">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
          </Card>
        </div>

        {/* Daily Brief Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Today's Important Updates
            </CardTitle>
            <CardDescription>
              AI-curated summaries of documents relevant to your operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDailyBrief.map((item) => (
                <div key={item.id} className={`p-4 rounded-lg border ${getPriorityColor(item.priority)}`}>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white/50 rounded">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-semibold text-base">{item.title}</h3>
                          <Badge variant={item.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                            {item.priority.toUpperCase()}
                          </Badge>
                          {item.actionRequired && (
                            <Badge variant="destructive" className="text-xs">ACTION REQUIRED</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{item.summary}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span><strong>Category:</strong> {item.category}</span>
                          <span><strong>Source:</strong> {item.source}</span>
                          <span><strong>Time:</strong> {item.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t">
                      <div className="text-xs text-muted-foreground">
                        Last updated: {item.timestamp}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          View Full Document
                        </Button>
                        {item.actionRequired && (
                          <Button size="sm" className="text-xs">
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DailyBriefs;