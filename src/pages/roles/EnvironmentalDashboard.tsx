import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, AlertTriangle, CheckCircle, Radio, MapPin, Calendar, FileText, Activity } from "lucide-react";

interface ComplianceDocument {
  id: string;
  title: string;
  category: string;
  status: "pass" | "fail" | "pending";
  aiAnalysis: string;
  lastReviewed: string;
  nextReview: string;
  riskLevel: "high" | "medium" | "low";
  regulations: string[];
}

interface RegulatoryUpdate {
  id: string;
  title: string;
  source: string;
  impact: "high" | "medium" | "low";
  effectiveDate: string;
  summary: string;
  actionRequired: boolean;
  affectedAreas: string[];
}

interface AreaOfConcern {
  id: string;
  location: string;
  issueType: string;
  severity: "critical" | "high" | "medium" | "low";
  aiDetectedDate: string;
  description: string;
  coordinates: { lat: number; lng: number };
  status: "open" | "investigating" | "resolved";
}

const mockComplianceDocs: ComplianceDocument[] = [
  {
    id: "ENV001",
    title: "Air Quality Monitoring Report Q3 2025",
    category: "Air Quality",
    status: "pass",
    aiAnalysis: "Air quality parameters consistently within acceptable limits. PM2.5 levels averaged 38 μg/m³, meeting CPCB standards. No significant deviations detected.",
    lastReviewed: "2025-09-15",
    nextReview: "2025-12-15",
    riskLevel: "low",
    regulations: ["Air (Prevention and Control of Pollution) Act", "CPCB Guidelines"]
  },
  {
    id: "ENV002", 
    title: "Noise Level Assessment - Station Areas",
    category: "Noise Pollution",
    status: "fail",
    aiAnalysis: "Noise levels at 3 stations exceed permissible limits during peak hours. Aluva station recorded 75 dB (limit: 65 dB). Immediate mitigation required.",
    lastReviewed: "2025-09-10",
    nextReview: "2025-10-10",
    riskLevel: "high",
    regulations: ["Noise Pollution (Regulation and Control) Rules", "Kerala State Pollution Control Board"]
  },
  {
    id: "ENV003",
    title: "Waste Management Compliance Report",
    category: "Waste Management",
    status: "pass",
    aiAnalysis: "Waste segregation and disposal protocols properly implemented. 92% recycling rate achieved. Hazardous waste handling compliant with regulations.",
    lastReviewed: "2025-09-08",
    nextReview: "2025-11-08",
    riskLevel: "low",
    regulations: ["Solid Waste Management Rules", "Hazardous Waste Management Rules"]
  },
  {
    id: "ENV004",
    title: "Water Quality Assessment - Drainage Systems",
    category: "Water Quality",
    status: "pending",
    aiAnalysis: "Pending laboratory analysis of water samples from drainage outlets. Previous trends show minor pH fluctuations requiring monitoring.",
    lastReviewed: "2025-09-05",
    nextReview: "2025-09-20",
    riskLevel: "medium",
    regulations: ["Water (Prevention and Control of Pollution) Act", "Central Ground Water Board"]
  }
];

const mockRegulatoryUpdates: RegulatoryUpdate[] = [
  {
    id: "REG001",
    title: "Updated Carbon Emission Standards for Public Transport",
    source: "Ministry of Environment, Forest and Climate Change",
    impact: "high",
    effectiveDate: "2025-10-01",
    summary: "New carbon emission limits for electric public transport systems. Metro systems must report quarterly emissions and implement carbon offset measures.",
    actionRequired: true,
    affectedAreas: ["Operations", "Maintenance", "Planning"]
  },
  {
    id: "REG002",
    title: "Revised Noise Pollution Guidelines for Urban Areas",
    source: "Kerala State Pollution Control Board",
    impact: "medium",
    effectiveDate: "2025-09-25",
    summary: "Updated permissible noise levels for metro stations in residential areas. Peak hour limits reduced from 65dB to 60dB.",
    actionRequired: true,
    affectedAreas: ["Station Operations", "Construction"]
  },
  {
    id: "REG003",
    title: "Electronic Waste Management Amendment",
    source: "Central Pollution Control Board",
    impact: "low",
    effectiveDate: "2025-11-15",
    summary: "Enhanced reporting requirements for electronic waste disposal from technical equipment and signaling systems.",
    actionRequired: false,
    affectedAreas: ["IT", "Maintenance"]
  }
];

const mockAreasOfConcern: AreaOfConcern[] = [
  {
    id: "AOC001",
    location: "Aluva Station - Platform 2",
    issueType: "Noise Pollution",
    severity: "critical",
    aiDetectedDate: "2025-09-16",
    description: "AI monitoring detected consistent noise levels above permissible limits during train arrivals. Peak recorded: 78 dB (limit: 65 dB).",
    coordinates: { lat: 10.1081, lng: 76.3527 },
    status: "investigating"
  },
  {
    id: "AOC002",
    location: "Kaloor Station - Entrance Area",
    issueType: "Air Quality",
    severity: "high",
    aiDetectedDate: "2025-09-14",
    description: "Elevated particulate matter levels detected near main entrance. Possible source: nearby construction activities affecting air circulation.",
    coordinates: { lat: 9.9981, lng: 76.2947 },
    status: "open"
  },
  {
    id: "AOC003",
    location: "Lissie Station - Drainage Outlet",
    issueType: "Water Quality",
    severity: "medium",
    aiDetectedDate: "2025-09-12",
    description: "pH levels in drainage water slightly above normal range. Monitoring for potential contamination from cleaning chemicals.",
    coordinates: { lat: 9.9704, lng: 76.2823 },
    status: "investigating"
  },
  {
    id: "AOC004",
    location: "Edapally Station - Parking Area",
    issueType: "Waste Management",
    severity: "low",
    aiDetectedDate: "2025-09-10",
    description: "Improper waste segregation observed in parking area bins. Increased awareness and monitoring implemented.",
    coordinates: { lat: 10.0176, lng: 76.3097 },
    status: "resolved"
  }
];

const EnvironmentalDashboard = () => {
  const [activeTab, setActiveTab] = useState("compliance");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass": return "text-green-600 bg-green-50 border-green-200";
      case "fail": return "text-red-600 bg-red-50 border-red-200";
      case "pending": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-600 bg-red-50 border-red-200";
      case "high": return "text-orange-600 bg-orange-50 border-orange-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const passCount = mockComplianceDocs.filter(doc => doc.status === "pass").length;
  const failCount = mockComplianceDocs.filter(doc => doc.status === "fail").length;
  const pendingCount = mockComplianceDocs.filter(doc => doc.status === "pending").length;
  const criticalConcerns = mockAreasOfConcern.filter(area => area.severity === "critical" && area.status !== "resolved").length;

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Leaf className="h-8 w-8 text-primary" />
              Environmental & Regulatory Dashboard
            </h1>
            <p className="text-muted-foreground">Monitor compliance, track regulatory changes, and identify environmental risks</p>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              New Assessment
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Audit
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Compliant</p>
                  <p className="text-2xl font-bold">{passCount}</p>
                  <p className="text-xs text-green-600">Documents passing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Non-Compliant</p>
                  <p className="text-2xl font-bold">{failCount}</p>
                  <p className="text-xs text-red-600">Requires action</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Activity className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Under Review</p>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-xs text-yellow-600">Pending analysis</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Critical Areas</p>
                  <p className="text-2xl font-bold">{criticalConcerns}</p>
                  <p className="text-xs text-orange-600">Need attention</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="compliance">Compliance Documents</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory Watch</TabsTrigger>
            <TabsTrigger value="concerns">Areas of Concern</TabsTrigger>
          </TabsList>

          <TabsContent value="compliance" className="space-y-6">
            <div className="flex items-center gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="air">Air Quality</SelectItem>
                  <SelectItem value="noise">Noise Pollution</SelectItem>
                  <SelectItem value="water">Water Quality</SelectItem>
                  <SelectItem value="waste">Waste Management</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Compliance Documents with AI Analysis
                </CardTitle>
                <CardDescription>
                  Environmental compliance status with AI-generated pass/fail assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockComplianceDocs.map((doc) => (
                    <div key={doc.id} className={`p-4 rounded-lg border ${getStatusColor(doc.status)}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{doc.title}</h3>
                            <Badge variant={doc.status === "pass" ? "default" : doc.status === "fail" ? "destructive" : "secondary"}>
                              {doc.status.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">{doc.category}</Badge>
                          </div>
                          <div className="bg-white/50 p-3 rounded mb-3">
                            <p className="text-sm"><strong>AI Analysis:</strong> {doc.aiAnalysis}</p>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {doc.regulations.map((regulation) => (
                              <Badge key={regulation} variant="outline" className="text-xs">
                                {regulation}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">Risk Level</p>
                          <Badge variant={doc.riskLevel === "high" ? "destructive" : doc.riskLevel === "medium" ? "secondary" : "default"}>
                            {doc.riskLevel.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Last reviewed: {new Date(doc.lastReviewed).toLocaleDateString()}</span>
                        <span>Next review: {new Date(doc.nextReview).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regulatory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5" />
                  Real-time Regulatory Watch Feed
                </CardTitle>
                <CardDescription>
                  Latest regulatory updates and changes affecting KMRL operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRegulatoryUpdates.map((update) => (
                    <div key={update.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{update.title}</h3>
                            <Badge variant={update.impact === "high" ? "destructive" : update.impact === "medium" ? "secondary" : "default"}>
                              {update.impact.toUpperCase()} IMPACT
                            </Badge>
                            {update.actionRequired && (
                              <Badge variant="destructive">ACTION REQUIRED</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Source:</strong> {update.source}
                          </p>
                          <p className="text-sm mb-3">{update.summary}</p>
                          <div className="flex flex-wrap gap-1">
                            {update.affectedAreas.map((area) => (
                              <Badge key={area} variant="outline" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">Effective Date</p>
                          <p className="text-sm">{new Date(update.effectiveDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      {update.actionRequired && (
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">
                            Create Action Plan
                          </Button>
                          <Button variant="outline" size="sm">
                            Mark as Reviewed
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="concerns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Areas of Concern Heatmap
                </CardTitle>
                <CardDescription>
                  AI-flagged environmental concerns across KMRL network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAreasOfConcern.map((concern) => (
                    <div key={concern.id} className={`p-4 rounded-lg border ${getSeverityColor(concern.severity)}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{concern.location}</h3>
                            <Badge variant={concern.severity === "critical" ? "destructive" : concern.severity === "high" ? "secondary" : "default"}>
                              {concern.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">{concern.issueType}</Badge>
                            <Badge variant={concern.status === "resolved" ? "default" : "secondary"}>
                              {concern.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm mb-3">{concern.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Coordinates: {concern.coordinates.lat}, {concern.coordinates.lng}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">Detected</p>
                          <p className="text-sm">{new Date(concern.aiDetectedDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">
                          View on Map
                        </Button>
                        <Button variant="outline" size="sm">
                          Update Status
                        </Button>
                        <Button variant="outline" size="sm">
                          Generate Report
                        </Button>
                      </div>
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

export default EnvironmentalDashboard;