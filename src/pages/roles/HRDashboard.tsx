import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, FileText, Search, AlertTriangle, BookOpen, Award, Clock } from "lucide-react";

interface ComplianceDeadline {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  department: string;
  status: "pending" | "in-progress" | "completed";
  assignedTo: string;
}

interface HRPolicy {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  aiSummary: string;
  version: string;
  applicableTo: string[];
  documentUrl: string;
}

interface TrainingRecommendation {
  id: string;
  title: string;
  targetAudience: string;
  priority: "high" | "medium" | "low";
  estimatedDuration: string;
  completionRate: number;
  deadline: string;
  description: string;
}

const mockComplianceDeadlines: ComplianceDeadline[] = [
  {
    id: "CD001",
    title: "Annual Safety Training Certification",
    description: "All operational staff must complete mandatory safety training and certification before October 15, 2025.",
    dueDate: "2025-10-15",
    priority: "high",
    department: "Operations",
    status: "in-progress",
    assignedTo: "Training Manager"
  },
  {
    id: "CD002",
    title: "Employee Code of Conduct Acknowledgment",
    description: "New employees must acknowledge and sign the updated code of conduct within 30 days of joining.",
    dueDate: "2025-09-30",
    priority: "medium",
    department: "All Departments",
    status: "pending",
    assignedTo: "HR Manager"
  },
  {
    id: "CD003",
    title: "Data Protection Training Completion",
    description: "IT and administrative staff training on new data protection regulations and GDPR compliance.",
    dueDate: "2025-10-01",
    priority: "high",
    department: "IT & Admin",
    status: "in-progress",
    assignedTo: "IT Training Lead"
  }
];

const mockHRPolicies: HRPolicy[] = [
  {
    id: "POL001",
    title: "Remote Work Guidelines",
    category: "Work Arrangements",
    lastUpdated: "2025-09-15",
    aiSummary: "Updated remote work policy allows up to 2 days per week of remote work for eligible roles. New approval process requires manager consent and productivity metrics tracking.",
    version: "3.2",
    applicableTo: ["Administrative Staff", "IT Staff", "Management"],
    documentUrl: "/policies/remote-work-v3.2.pdf"
  },
  {
    id: "POL002",
    title: "Employee Performance Evaluation",
    category: "Performance Management",
    lastUpdated: "2025-09-10",
    aiSummary: "Annual performance reviews now include 360-degree feedback and competency-based assessments. New digital platform introduced for streamlined evaluation process.",
    version: "2.8",
    applicableTo: ["All Employees"],
    documentUrl: "/policies/performance-eval-v2.8.pdf"
  },
  {
    id: "POL003",
    title: "Workplace Safety Protocols",
    category: "Safety",
    lastUpdated: "2025-09-08",
    aiSummary: "Enhanced safety protocols for metro operations including new emergency procedures, updated PPE requirements, and mandatory safety briefings for all operational staff.",
    version: "4.1",
    applicableTo: ["Operations Staff", "Maintenance Staff", "Security"],
    documentUrl: "/policies/safety-protocols-v4.1.pdf"
  }
];

const mockTrainingRecommendations: TrainingRecommendation[] = [
  {
    id: "TR001",
    title: "Digital Transformation Skills",
    targetAudience: "Administrative Staff",
    priority: "high",
    estimatedDuration: "8 hours",
    completionRate: 65,
    deadline: "2025-11-30",
    description: "Essential training on new digital tools and processes being implemented across KMRL."
  },
  {
    id: "TR002",
    title: "Customer Service Excellence",
    targetAudience: "Frontline Staff",
    priority: "medium",
    estimatedDuration: "6 hours",
    completionRate: 80,
    deadline: "2025-10-31",
    description: "Enhanced customer service skills for better passenger experience and complaint resolution."
  },
  {
    id: "TR003",
    title: "Leadership Development Program",
    targetAudience: "Middle Management",
    priority: "medium",
    estimatedDuration: "16 hours",
    completionRate: 45,
    deadline: "2025-12-15",
    description: "Comprehensive leadership skills development including team management and strategic thinking."
  }
];

const HRDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("deadlines");

  const getDaysUntilDeadline = (dateString: string) => {
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600";
      case "in-progress": return "text-blue-600";
      case "pending": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  const urgentDeadlines = mockComplianceDeadlines.filter(deadline => {
    const days = getDaysUntilDeadline(deadline.dueDate);
    return days <= 30 && deadline.status !== "completed";
  }).length;

  const recentPolicies = mockHRPolicies.filter(policy => {
    const updateDate = new Date(policy.lastUpdated);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return updateDate >= thirtyDaysAgo;
  }).length;

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-8 w-8 text-primary" />
              HR & Training Dashboard
            </h1>
            <p className="text-muted-foreground">Manage compliance deadlines, policies, and training programs</p>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              New Policy
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Training
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Urgent Deadlines</p>
                  <p className="text-2xl font-bold">{urgentDeadlines}</p>
                  <p className="text-xs text-red-600">Within 30 days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Recent Policies</p>
                  <p className="text-2xl font-bold">{recentPolicies}</p>
                  <p className="text-xs text-blue-600">Updated this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Training Programs</p>
                  <p className="text-2xl font-bold">{mockTrainingRecommendations.length}</p>
                  <p className="text-xs text-green-600">Active programs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Compliance Rate</p>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-xs text-orange-600">Overall compliance</p>
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
                placeholder="Find Policy - Search by title, category, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="deadlines">Compliance Deadlines</TabsTrigger>
            <TabsTrigger value="policies">HR Policies</TabsTrigger>
            <TabsTrigger value="training">Training Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="deadlines" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Compliance Deadlines
                </CardTitle>
                <CardDescription>
                  Critical compliance tasks requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockComplianceDeadlines.map((deadline) => {
                    const daysUntil = getDaysUntilDeadline(deadline.dueDate);
                    return (
                      <div key={deadline.id} className={`p-4 rounded-lg border ${getPriorityColor(deadline.priority)}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{deadline.title}</h3>
                              <Badge variant={deadline.priority === "high" ? "destructive" : "secondary"}>
                                {deadline.priority.toUpperCase()}
                              </Badge>
                              <Badge variant="outline" className={getStatusColor(deadline.status)}>
                                {deadline.status.replace("-", " ").toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{deadline.description}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span><strong>Department:</strong> {deadline.department}</span>
                              <span><strong>Assigned to:</strong> {deadline.assignedTo}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">
                              {daysUntil > 0 ? `${daysUntil} days` : "Overdue"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Due: {new Date(deadline.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Update Status
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recently Updated HR Policies
                </CardTitle>
                <CardDescription>
                  Latest policy updates with AI-generated summaries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockHRPolicies.map((policy) => (
                    <div key={policy.id} className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{policy.title}</h3>
                            <Badge variant="outline">v{policy.version}</Badge>
                            <Badge variant="secondary">{policy.category}</Badge>
                          </div>
                          <p className="text-sm text-blue-700 mb-3 bg-blue-100 p-2 rounded">
                            <strong>AI Summary:</strong> {policy.aiSummary}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {policy.applicableTo.map((audience) => (
                              <Badge key={audience} variant="outline" className="text-xs">
                                {audience}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Last updated: {new Date(policy.lastUpdated).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Document
                          </Button>
                          <Button variant="outline" size="sm">
                            Download PDF
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Training Recommendations
                </CardTitle>
                <CardDescription>
                  Recommended training programs based on organizational needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTrainingRecommendations.map((training) => (
                    <div key={training.id} className={`p-4 rounded-lg border ${getPriorityColor(training.priority)}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{training.title}</h3>
                            <Badge variant={training.priority === "high" ? "destructive" : "secondary"}>
                              {training.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{training.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Target Audience:</span> {training.targetAudience}
                            </div>
                            <div>
                              <span className="font-medium">Duration:</span> {training.estimatedDuration}
                            </div>
                            <div>
                              <span className="font-medium">Completion Rate:</span> {training.completionRate}%
                            </div>
                            <div>
                              <span className="font-medium">Deadline:</span> {new Date(training.deadline).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">
                          Schedule Training
                        </Button>
                        <Button variant="outline" size="sm">
                          View Progress
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

export default HRDashboard;