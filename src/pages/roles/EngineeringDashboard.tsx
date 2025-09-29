import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Shield, Search, Clock, FileText, Wrench, Activity, Bell } from "lucide-react";

interface IncidentReport {
  id: string;
  title: string;
  summary: string;
  severity: "critical" | "high" | "medium" | "low";
  reportedBy: string;
  date: string;
  status: "pending" | "investigating" | "resolved";
  tags: string[];
}

interface SafetyAlert {
  id: string;
  title: string;
  message: string;
  urgency: "critical" | "urgent" | "normal";
  issueDate: string;
  expiryDate: string;
  affectedAreas: string[];
}

interface UploadTimeline {
  id: string;
  fileName: string;
  uploadedBy: string;
  timestamp: string;
  type: "incident" | "safety_bulletin" | "engineering_drawing" | "maintenance";
  status: "processed" | "processing" | "failed";
}

const mockIncidentReports: IncidentReport[] = [
  {
    id: "INC-001",
    title: "Signal Malfunction at Aluva Station",
    summary: "Automated signaling system experienced intermittent failures during peak hours. Backup manual controls were activated. Initial investigation suggests software configuration issue.",
    severity: "high",
    reportedBy: "Station Controller - Aluva",
    date: "2025-09-16",
    status: "investigating",
    tags: ["Signal", "Aluva", "Software"]
  },
  {
    id: "INC-002", 
    title: "Track Vibration Alert - Kaloor Section",
    summary: "Sensors detected unusual vibration patterns on Track 2 between Kaloor and Lissie stations. Preliminary inspection shows possible ballast settling.",
    severity: "medium",
    reportedBy: "Track Maintenance Team",
    date: "2025-09-15",
    status: "pending",
    tags: ["Track", "Vibration", "Kaloor"]
  },
  {
    id: "INC-003",
    title: "Emergency Brake Activation - Train 104",
    summary: "Unscheduled emergency brake activation occurred due to passenger emergency button press. False alarm confirmed after investigation.",
    severity: "low",
    reportedBy: "Train Operator",
    date: "2025-09-14",
    status: "resolved",
    tags: ["Emergency", "Brake", "Train-104"]
  }
];

const mockSafetyAlerts: SafetyAlert[] = [
  {
    id: "SA-001",
    title: "Track Maintenance Window - September 20",
    message: "Scheduled maintenance on Track 1 from 23:00 to 05:00. All operations will use Track 2. Enhanced safety protocols in effect.",
    urgency: "critical",
    issueDate: "2025-09-17",
    expiryDate: "2025-09-21",
    affectedAreas: ["Track 1", "All Stations"]
  },
  {
    id: "SA-002",
    title: "Weather Alert - Heavy Rain Expected",
    message: "Monsoon warning issued for September 18-19. Extra caution for outdoor maintenance activities. Flood protocols on standby.",
    urgency: "urgent",
    issueDate: "2025-09-17",
    expiryDate: "2025-09-20",
    affectedAreas: ["All Outdoor Areas", "Drainage Systems"]
  }
];

const mockUploads: UploadTimeline[] = [
  { id: "1", fileName: "Daily_Safety_Inspection_Sept17.pdf", uploadedBy: "Safety Officer", timestamp: "2 hours ago", type: "safety_bulletin", status: "processed" },
  { id: "2", fileName: "Signal_System_Diagnostic_Report.docx", uploadedBy: "Engineer John", timestamp: "4 hours ago", type: "engineering_drawing", status: "processed" },
  { id: "3", fileName: "Incident_Report_Aluva_Station.pdf", uploadedBy: "Station Manager", timestamp: "6 hours ago", type: "incident", status: "processing" },
  { id: "4", fileName: "Track_Maintenance_Schedule_Q3.xlsx", uploadedBy: "Maintenance Head", timestamp: "1 day ago", type: "maintenance", status: "processed" },
  { id: "5", fileName: "Emergency_Procedure_Update.pdf", uploadedBy: "Safety Officer", timestamp: "1 day ago", type: "safety_bulletin", status: "processed" },
  { id: "6", fileName: "Train_Brake_System_Analysis.pdf", uploadedBy: "Technical Lead", timestamp: "2 days ago", type: "engineering_drawing", status: "processed" },
  { id: "7", fileName: "Weekly_Safety_Bulletin_Sept10.pdf", uploadedBy: "Safety Officer", timestamp: "3 days ago", type: "safety_bulletin", status: "processed" },
  { id: "8", fileName: "Platform_Inspection_Report.docx", uploadedBy: "Inspector", timestamp: "3 days ago", type: "incident", status: "processed" },
  { id: "9", fileName: "Electrical_System_Maintenance.pdf", uploadedBy: "Electrician", timestamp: "4 days ago", type: "maintenance", status: "processed" },
  { id: "10", fileName: "Station_Security_Protocol.pdf", uploadedBy: "Security Head", timestamp: "5 days ago", type: "safety_bulletin", status: "processed" }
];

const EngineeringDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("incidents");

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-600 bg-red-50 border-red-200";
      case "high": return "text-orange-600 bg-orange-50 border-orange-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical": return "text-red-600 bg-red-50";
      case "urgent": return "text-orange-600 bg-orange-50";
      case "normal": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "incident": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "safety_bulletin": return <Shield className="h-4 w-4 text-blue-500" />;
      case "engineering_drawing": return <Wrench className="h-4 w-4 text-green-500" />;
      case "maintenance": return <Activity className="h-4 w-4 text-orange-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const pendingReports = mockIncidentReports.filter(report => report.status === "pending");
  const criticalAlerts = mockSafetyAlerts.filter(alert => alert.urgency === "critical" || alert.urgency === "urgent");

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Wrench className="h-8 w-8 text-primary" />
              Engineering & Safety Dashboard
            </h1>
            <p className="text-muted-foreground">Monitor incidents, safety alerts, and technical documentation</p>
          </div>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Upload Report
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Pending Reports</p>
                  <p className="text-2xl font-bold">{pendingReports.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Bell className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Critical Alerts</p>
                  <p className="text-2xl font-bold">{criticalAlerts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Reports Today</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Safety Score</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports, incidents, safety bulletins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="incidents">Incident Reports</TabsTrigger>
            <TabsTrigger value="alerts">Safety Alerts</TabsTrigger>
            <TabsTrigger value="timeline">Upload Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="incidents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Pending Incident Reports
                </CardTitle>
                <CardDescription>
                  Incidents requiring attention with AI-generated summaries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockIncidentReports.map((report) => (
                    <div key={report.id} className={`p-4 rounded-lg border ${getSeverityColor(report.severity)}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{report.title}</h3>
                            <Badge variant={report.severity === "high" ? "destructive" : "secondary"}>
                              {report.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">
                              {report.id}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{report.summary}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {report.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Reported by: {report.reportedBy}</span>
                        <span>{report.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Critical Safety Alerts
                </CardTitle>
                <CardDescription>
                  Urgent safety directives and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSafetyAlerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-lg border ${getUrgencyColor(alert.urgency)}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{alert.title}</h3>
                            <Badge variant={alert.urgency === "critical" ? "destructive" : "secondary"}>
                              {alert.urgency.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                          <div className="flex flex-wrap gap-1">
                            {alert.affectedAreas.map((area) => (
                              <Badge key={area} variant="outline" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Issued: {alert.issueDate}</span>
                        <span>Expires: {alert.expiryDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Uploads Timeline
                </CardTitle>
                <CardDescription>
                  Last 10 document uploads and their processing status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockUploads.map((upload) => (
                    <div key={upload.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="p-2 bg-secondary rounded-lg">
                        {getTypeIcon(upload.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm">{upload.fileName}</p>
                          <Badge 
                            variant={upload.status === "processed" ? "default" : upload.status === "processing" ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            {upload.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          By {upload.uploadedBy} • {upload.timestamp}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EngineeringDashboard;