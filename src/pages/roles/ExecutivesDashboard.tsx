import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, FileText, Scale, Search, Calendar, Users, AlertTriangle, TrendingUp } from "lucide-react";

interface BoardMeetingSummary {
  id: string;
  title: string;
  meetingDate: string;
  attendees: number;
  keyDecisions: string[];
  actionItems: string[];
  status: "completed" | "scheduled" | "draft";
  priority: "high" | "medium" | "low";
  documentUrl: string;
}

interface RegulatoryDirective {
  id: string;
  title: string;
  issuingAuthority: string;
  issueDate: string;
  effectiveDate: string;
  category: "safety" | "environmental" | "operational" | "financial";
  summary: string;
  complianceRequired: boolean;
  deadline: string;
  impact: "high" | "medium" | "low";
}

interface LegalOpinion {
  id: string;
  title: string;
  requestDate: string;
  responseDate: string;
  legalCounsel: string;
  category: "contracts" | "regulatory" | "litigation" | "compliance";
  summary: string;
  recommendations: string[];
  status: "pending" | "completed" | "under-review";
  confidentiality: "public" | "restricted" | "confidential";
}

const mockBoardMeetings: BoardMeetingSummary[] = [
  {
    id: "BM001",
    title: "September 2025 Board Meeting - Operations Review",
    meetingDate: "2025-09-15",
    attendees: 12,
    keyDecisions: [
      "Approved budget increase for station modernization project",
      "Endorsed new safety protocol implementation timeline",
      "Authorized procurement of additional rolling stock"
    ],
    actionItems: [
      "Finance team to prepare detailed budget breakdown by Sept 30",
      "Engineering to submit safety protocol training schedule",
      "Procurement to initiate tender process for new trains"
    ],
    status: "completed",
    priority: "high",
    documentUrl: "/meetings/board-sept-2025.pdf"
  },
  {
    id: "BM002",
    title: "Q3 Financial Performance Review",
    meetingDate: "2025-08-20",
    attendees: 10,
    keyDecisions: [
      "Approved revision of fare structure for peak hours",
      "Sanctioned investment in digital ticketing infrastructure",
      "Endorsed partnership with local transport providers"
    ],
    actionItems: [
      "Revenue team to implement fare changes by October 1",
      "IT department to finalize digital ticketing rollout plan",
      "Business development to draft partnership agreements"
    ],
    status: "completed",
    priority: "medium",
    documentUrl: "/meetings/board-aug-2025.pdf"
  },
  {
    id: "BM003",
    title: "Upcoming October 2025 Board Meeting",
    meetingDate: "2025-10-15",
    attendees: 0,
    keyDecisions: [],
    actionItems: [
      "Prepare Q3 performance reports",
      "Review environmental compliance status",
      "Present customer satisfaction survey results"
    ],
    status: "scheduled",
    priority: "medium",
    documentUrl: ""
  }
];

const mockRegulatoryDirectives: RegulatoryDirective[] = [
  {
    id: "RD001",
    title: "Updated Fire Safety Norms for Metro Stations",
    issuingAuthority: "Ministry of Housing and Urban Affairs",
    issueDate: "2025-09-10",
    effectiveDate: "2025-12-01",
    category: "safety",
    summary: "New fire safety requirements including enhanced evacuation procedures, improved fire detection systems, and mandatory fire drills every quarter.",
    complianceRequired: true,
    deadline: "2025-11-30",
    impact: "high"
  },
  {
    id: "RD002",
    title: "Environmental Clearance for Metro Extension",
    issuingAuthority: "Kerala State Pollution Control Board",
    issueDate: "2025-09-08",
    effectiveDate: "2025-09-15",
    category: "environmental",
    summary: "Environmental impact assessment requirements for proposed metro line extensions. Includes noise pollution monitoring and green building compliance.",
    complianceRequired: true,
    deadline: "2025-10-15",
    impact: "medium"
  },
  {
    id: "RD003",
    title: "Digital Payment Integration Guidelines",
    issuingAuthority: "Reserve Bank of India",
    issueDate: "2025-09-05",
    effectiveDate: "2025-10-01",
    category: "financial",
    summary: "Updated guidelines for digital payment systems in public transport. Emphasizes security protocols and customer data protection.",
    complianceRequired: true,
    deadline: "2025-09-30",
    impact: "medium"
  }
];

const mockLegalOpinions: LegalOpinion[] = [
  {
    id: "LO001",
    title: "Vendor Contract Dispute Resolution",
    requestDate: "2025-09-10",
    responseDate: "2025-09-16",
    legalCounsel: "Menon & Associates",
    category: "contracts",
    summary: "Legal opinion on dispute with construction vendor regarding project delays. Recommends arbitration process and contract amendment terms.",
    recommendations: [
      "Initiate arbitration proceedings within 30 days",
      "Document all project delays with evidence",
      "Negotiate penalty clauses for future contracts"
    ],
    status: "completed",
    confidentiality: "restricted"
  },
  {
    id: "LO002",
    title: "Compliance with New Safety Regulations",
    requestDate: "2025-09-12",
    responseDate: "",
    legalCounsel: "Internal Legal Team",
    category: "regulatory",
    summary: "Assessment of compliance requirements for updated fire safety norms and potential legal implications of non-compliance.",
    recommendations: [],
    status: "under-review",
    confidentiality: "public"
  },
  {
    id: "LO003",
    title: "Passenger Data Protection Compliance",
    requestDate: "2025-09-14",
    responseDate: "",
    legalCounsel: "Cyber Law Consultants",
    category: "compliance",
    summary: "Review of passenger data collection and storage practices to ensure compliance with data protection regulations.",
    recommendations: [],
    status: "pending",
    confidentiality: "confidential"
  }
];

const ExecutivesDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("meetings");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600";
      case "scheduled": return "text-blue-600";
      case "draft": return "text-gray-600";
      case "pending": return "text-orange-600";
      case "under-review": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "safety": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "environmental": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "operational": return <Building className="h-4 w-4 text-blue-500" />;
      case "financial": return <TrendingUp className="h-4 w-4 text-yellow-500" />;
      case "contracts": return <FileText className="h-4 w-4 text-blue-500" />;
      case "regulatory": return <Scale className="h-4 w-4 text-purple-500" />;
      case "litigation": return <Scale className="h-4 w-4 text-red-500" />;
      case "compliance": return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const pendingActions = mockBoardMeetings.reduce((acc, meeting) => acc + meeting.actionItems.length, 0);
  const activeDirectives = mockRegulatoryDirectives.filter(directive => directive.complianceRequired).length;
  const pendingLegalMatters = mockLegalOpinions.filter(opinion => opinion.status === "pending" || opinion.status === "under-review").length;

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Building className="h-8 w-8 text-primary" />
              Executives & Legal Dashboard
            </h1>
            <p className="text-muted-foreground">Strategic oversight and legal compliance management</p>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="gap-2">
              <Scale className="h-4 w-4" />
              Legal Request
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Pending Actions</p>
                  <p className="text-2xl font-bold">{pendingActions}</p>
                  <p className="text-xs text-blue-600">From board meetings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Active Directives</p>
                  <p className="text-2xl font-bold">{activeDirectives}</p>
                  <p className="text-xs text-orange-600">Compliance required</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Scale className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Legal Matters</p>
                  <p className="text-2xl font-bold">{pendingLegalMatters}</p>
                  <p className="text-xs text-purple-600">Pending review</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Compliance Rate</p>
                  <p className="text-2xl font-bold">94%</p>
                  <p className="text-xs text-green-600">Overall compliance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Legal Documents - Find board minutes, directives, or legal opinions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="meetings">Board Meetings</TabsTrigger>
            <TabsTrigger value="directives">Regulatory Directives</TabsTrigger>
            <TabsTrigger value="legal">Legal Opinions</TabsTrigger>
          </TabsList>

          <TabsContent value="meetings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Board Meeting Summaries
                </CardTitle>
                <CardDescription>
                  Key decisions and action items from board meetings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBoardMeetings.map((meeting) => (
                    <div key={meeting.id} className={`p-4 rounded-lg border ${getPriorityColor(meeting.priority)}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{meeting.title}</h3>
                            <Badge variant={meeting.priority === "high" ? "destructive" : "secondary"}>
                              {meeting.priority.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(meeting.status)}>
                              {meeting.status.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                            <span><strong>Meeting Date:</strong> {new Date(meeting.meetingDate).toLocaleDateString()}</span>
                            <span><strong>Attendees:</strong> {meeting.attendees > 0 ? meeting.attendees : "TBD"}</span>
                          </div>
                        </div>
                      </div>

                      {meeting.keyDecisions.length > 0 && (
                        <div className="mb-3">
                          <p className="font-medium text-sm mb-1">Key Decisions:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {meeting.keyDecisions.map((decision, index) => (
                              <li key={index} className="flex items-start gap-1">
                                <span>•</span>
                                <span>{decision}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {meeting.actionItems.length > 0 && (
                        <div className="mb-3">
                          <p className="font-medium text-sm mb-1">Action Items:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {meeting.actionItems.map((item, index) => (
                              <li key={index} className="flex items-start gap-1">
                                <span>•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Minutes
                        </Button>
                        <Button variant="outline" size="sm">
                          Track Actions
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="directives" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Government & Regulatory Directives
                </CardTitle>
                <CardDescription>
                  Latest regulatory requirements and compliance directives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRegulatoryDirectives.map((directive) => (
                    <div key={directive.id} className={`p-4 rounded-lg border ${directive.impact === "high" ? "border-red-200 bg-red-50" : directive.impact === "medium" ? "border-yellow-200 bg-yellow-50" : "border-green-200 bg-green-50"}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{directive.title}</h3>
                            <Badge variant={directive.impact === "high" ? "destructive" : "secondary"}>
                              {directive.impact.toUpperCase()} IMPACT
                            </Badge>
                            {directive.complianceRequired && (
                              <Badge variant="destructive">COMPLIANCE REQUIRED</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{directive.summary}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              {getCategoryIcon(directive.category)}
                              <span><strong>Category:</strong> {directive.category}</span>
                            </div>
                            <div>
                              <span><strong>Authority:</strong> {directive.issuingAuthority}</span>
                            </div>
                            <div>
                              <span><strong>Effective Date:</strong> {new Date(directive.effectiveDate).toLocaleDateString()}</span>
                            </div>
                            <div>
                              <span><strong>Compliance Deadline:</strong> {new Date(directive.deadline).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Full Directive
                        </Button>
                        <Button variant="outline" size="sm">
                          Compliance Plan
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Legal Opinions & Advice
                </CardTitle>
                <CardDescription>
                  Legal consultations and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLegalOpinions.map((opinion) => (
                    <div key={opinion.id} className="p-4 border rounded-lg bg-purple-50 border-purple-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{opinion.title}</h3>
                            <Badge variant="outline" className={getStatusColor(opinion.status)}>
                              {opinion.status.replace("-", " ").toUpperCase()}
                            </Badge>
                            <Badge variant={opinion.confidentiality === "confidential" ? "destructive" : "secondary"}>
                              {opinion.confidentiality.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-purple-700 mb-3">{opinion.summary}</p>
                          
                          {opinion.recommendations.length > 0 && (
                            <div className="mb-3">
                              <p className="font-medium text-sm mb-1">Legal Recommendations:</p>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {opinion.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-start gap-1">
                                    <span>•</span>
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              {getCategoryIcon(opinion.category)}
                              <span><strong>Category:</strong> {opinion.category}</span>
                            </div>
                            <div>
                              <span><strong>Legal Counsel:</strong> {opinion.legalCounsel}</span>
                            </div>
                            <div>
                              <span><strong>Request Date:</strong> {new Date(opinion.requestDate).toLocaleDateString()}</span>
                            </div>
                            <div>
                              <span><strong>Response Date:</strong> {opinion.responseDate ? new Date(opinion.responseDate).toLocaleDateString() : "Pending"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Full Opinion
                        </Button>
                        <Button variant="outline" size="sm">
                          Follow Up
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

export default ExecutivesDashboard;