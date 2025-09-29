import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Inbox, 
  Search, 
  FileText, 
  Users, 
  ScrollText, 
  Clock, 
  Download, 
  Eye,
  Filter,
  Archive,
  Star,
  Paperclip
} from "lucide-react";

interface HRDocument {
  id: string;
  title: string;
  type: "policy" | "memo" | "contract" | "form" | "manual" | "report";
  category: "hr-policy" | "employee-contract" | "training" | "benefits" | "compliance" | "communication";
  priority: "high" | "medium" | "low";
  status: "new" | "read" | "pending-action" | "archived";
  sender: string;
  department: string;
  receivedDate: string;
  dueDate?: string;
  summary: string;
  tags: string[];
  attachments: number;
  fileSize: string;
}

const mockHRDocuments: HRDocument[] = [
  {
    id: "HRD001",
    title: "Updated Employee Handbook - September 2025 Edition",
    type: "policy",
    category: "hr-policy",
    priority: "high",
    status: "new",
    sender: "HR Director",
    department: "Human Resources",
    receivedDate: "2025-09-17",
    dueDate: "2025-09-25",
    summary: "Comprehensive update to employee handbook including new remote work policies, updated leave policies, and revised code of conduct guidelines.",
    tags: ["handbook", "policies", "remote-work", "leave", "conduct"],
    attachments: 3,
    fileSize: "4.2 MB"
  },
  {
    id: "HRD002",
    title: "Employment Contract - New Hire - Maintenance Department",
    type: "contract",
    category: "employee-contract",
    priority: "medium",
    status: "pending-action",
    sender: "Recruitment Team",
    department: "Human Resources",
    receivedDate: "2025-09-16",
    dueDate: "2025-09-20",
    summary: "Employment contract for new maintenance technician hire requiring HR review and approval before onboarding scheduled for next week.",
    tags: ["contract", "new-hire", "maintenance", "onboarding"],
    attachments: 2,
    fileSize: "1.8 MB"
  },
  {
    id: "HRD003",
    title: "Safety Training Completion Report - August 2025",
    type: "report",
    category: "training",
    priority: "medium",
    status: "read",
    sender: "Training Manager",
    department: "Training & Development",
    receivedDate: "2025-09-15",
    summary: "Monthly safety training completion report showing 87% completion rate across all departments with detailed breakdown by department and role.",
    tags: ["training", "safety", "completion", "monthly", "report"],
    attachments: 1,
    fileSize: "2.1 MB"
  },
  {
    id: "HRD004",
    title: "Annual Performance Review Templates - Updated",
    type: "form",
    category: "hr-policy",
    priority: "low",
    status: "new",
    sender: "HR Manager",
    department: "Human Resources",
    receivedDate: "2025-09-14",
    summary: "Updated performance review templates with new KPI metrics and competency frameworks for annual review cycle starting October 2025.",
    tags: ["performance", "review", "templates", "kpi", "annual"],
    attachments: 4,
    fileSize: "856 KB"
  },
  {
    id: "HRD005",
    title: "Employee Benefits Enrollment - Health Insurance Updates",
    type: "memo",
    category: "benefits",
    priority: "high",
    status: "pending-action",
    sender: "Benefits Administrator",
    department: "Human Resources",
    receivedDate: "2025-09-13",
    dueDate: "2025-09-30",
    summary: "Important updates to health insurance benefits requiring immediate employee communication and enrollment period coordination.",
    tags: ["benefits", "health-insurance", "enrollment", "updates"],
    attachments: 2,
    fileSize: "1.2 MB"
  },
  {
    id: "HRD006",
    title: "Labor Law Compliance Checklist - Q3 2025",
    type: "manual",
    category: "compliance",
    priority: "high",
    status: "read",
    sender: "Legal Compliance Team",
    department: "Legal",
    receivedDate: "2025-09-12",
    summary: "Quarterly compliance checklist covering latest labor law requirements, minimum wage updates, and mandatory posting requirements.",
    tags: ["compliance", "labor-law", "quarterly", "checklist"],
    attachments: 1,
    fileSize: "3.4 MB"
  },
  {
    id: "HRD007",
    title: "Internal Communication - Policy Changes Announcement",
    type: "memo",
    category: "communication",
    priority: "medium",
    status: "archived",
    sender: "CEO Office",
    department: "Executive",
    receivedDate: "2025-09-10",
    summary: "Company-wide announcement regarding upcoming policy changes and their effective dates requiring HR coordination for implementation.",
    tags: ["announcement", "policy-changes", "company-wide", "implementation"],
    attachments: 1,
    fileSize: "742 KB"
  },
  {
    id: "HRD008",
    title: "Training Module - Diversity and Inclusion Workshop",
    type: "manual",
    category: "training",
    priority: "medium",
    status: "new",
    sender: "Training Manager",
    department: "Training & Development",
    receivedDate: "2025-09-11",
    summary: "New diversity and inclusion training module materials and facilitator guide for mandatory quarterly workshops.",
    tags: ["training", "diversity", "inclusion", "workshop", "mandatory"],
    attachments: 5,
    fileSize: "6.7 MB"
  }
];

const HRDocumentInbox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "policy": return <FileText className="h-4 w-4 text-blue-600" />;
      case "memo": return <FileText className="h-4 w-4 text-green-600" />;
      case "contract": return <ScrollText className="h-4 w-4 text-purple-600" />;
      case "form": return <FileText className="h-4 w-4 text-orange-600" />;
      case "manual": return <FileText className="h-4 w-4 text-indigo-600" />;
      case "report": return <FileText className="h-4 w-4 text-red-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "text-blue-600 bg-blue-50";
      case "read": return "text-gray-600 bg-gray-50";
      case "pending-action": return "text-orange-600 bg-orange-50";
      case "archived": return "text-purple-600 bg-purple-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getDaysUntilDue = (dueDate?: string) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredDocuments = mockHRDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === "all" || doc.status === selectedFilter || doc.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const newDocuments = mockHRDocuments.filter(doc => doc.status === "new").length;
  const pendingActions = mockHRDocuments.filter(doc => doc.status === "pending-action").length;
  const totalDocuments = mockHRDocuments.length;
  const overdueDocuments = mockHRDocuments.filter(doc => 
    doc.dueDate && getDaysUntilDue(doc.dueDate) !== null && getDaysUntilDue(doc.dueDate)! < 0
  ).length;

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Inbox className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            HR Document Inbox
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            HR-specific documents, policies, memos, and contracts management
          </p>
        </div>

        {/* Document Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Total Documents</p>
                <p className="text-lg md:text-xl font-bold">{totalDocuments}</p>
              </div>
              <div className="p-1 md:p-2 bg-blue-100 rounded text-blue-600">
                <FileText className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">New Documents</p>
                <p className="text-lg md:text-xl font-bold text-blue-600">{newDocuments}</p>
              </div>
              <div className="p-1 md:p-2 bg-blue-100 rounded text-blue-600">
                <Inbox className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Pending Action</p>
                <p className="text-lg md:text-xl font-bold text-orange-600">{pendingActions}</p>
              </div>
              <div className="p-1 md:p-2 bg-orange-100 rounded text-orange-600">
                <Clock className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Overdue</p>
                <p className="text-lg md:text-xl font-bold text-red-600">{overdueDocuments}</p>
              </div>
              <div className="p-1 md:p-2 bg-red-100 rounded text-red-600">
                <Clock className="h-4 w-4" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Search HR documents, policies, memos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" className="sm:w-auto w-full">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:flex xl:flex-wrap gap-2">
                <Button 
                  variant={selectedFilter === "all" ? "default" : "outline"} 
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedFilter("all")}
                >
                  <Filter className="h-3 w-3 mr-1" />
                  All Documents
                </Button>
                <Button 
                  variant={selectedFilter === "new" ? "default" : "outline"} 
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedFilter("new")}
                >
                  New
                </Button>
                <Button 
                  variant={selectedFilter === "pending-action" ? "default" : "outline"} 
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedFilter("pending-action")}
                >
                  Pending Action
                </Button>
                <Button 
                  variant={selectedFilter === "policy" ? "default" : "outline"} 
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedFilter("policy")}
                >
                  Policies
                </Button>
                <Button 
                  variant={selectedFilter === "contract" ? "default" : "outline"} 
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedFilter("contract")}
                >
                  Contracts
                </Button>
                <Button 
                  variant={selectedFilter === "memo" ? "default" : "outline"} 
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedFilter("memo")}
                >
                  Memos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Inbox className="h-5 w-5" />
              HR Documents ({filteredDocuments.length})
            </CardTitle>
            <CardDescription>
              HR-related documents requiring review or action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDocuments.map((document) => (
                <div key={document.id} className={`p-4 rounded-lg border ${getPriorityColor(document.priority)}`}>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white/50 rounded">
                        {getTypeIcon(document.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-semibold text-base">{document.title}</h3>
                          <Badge variant={document.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                            {document.priority.toUpperCase()}
                          </Badge>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(document.status)}`}>
                            {document.status.replace("-", " ").toUpperCase()}
                          </div>
                          {document.dueDate && getDaysUntilDue(document.dueDate) !== null && getDaysUntilDue(document.dueDate)! <= 3 && getDaysUntilDue(document.dueDate)! >= 0 && (
                            <Badge variant="destructive" className="text-xs">DUE SOON</Badge>
                          )}
                          {document.dueDate && getDaysUntilDue(document.dueDate) !== null && getDaysUntilDue(document.dueDate)! < 0 && (
                            <Badge variant="destructive" className="text-xs">OVERDUE</Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{document.summary}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm text-muted-foreground mb-3">
                          <div>
                            <p className="text-xs sm:text-sm"><strong>Type:</strong> {document.type}</p>
                            <p className="text-xs sm:text-sm break-words"><strong>Category:</strong> {document.category.replace("-", " ")}</p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm break-words"><strong>From:</strong> {document.sender}</p>
                            <p className="text-xs sm:text-sm break-words"><strong>Department:</strong> {document.department}</p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm"><strong>Received:</strong> {document.receivedDate}</p>
                            {document.dueDate && (
                              <p className="text-xs sm:text-sm"><strong>Due Date:</strong> {document.dueDate}</p>
                            )}
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm"><strong>File Size:</strong> {document.fileSize}</p>
                            <p className="flex items-center gap-1 text-xs sm:text-sm">
                              <Paperclip className="h-3 w-3" />
                              <strong>{document.attachments} attachments</strong>
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {document.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-2 border-t">
                      <div className="text-xs text-muted-foreground break-words">
                        Document ID: {document.id} • Received: {document.receivedDate}
                        {document.dueDate && getDaysUntilDue(document.dueDate) !== null && (
                          <span> • {getDaysUntilDue(document.dueDate)! >= 0 
                            ? `${getDaysUntilDue(document.dueDate)} days remaining`
                            : `${Math.abs(getDaysUntilDue(document.dueDate)!)} days overdue`
                          }</span>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="text-xs flex-1 sm:flex-none">
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs flex-1 sm:flex-none">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs flex-1 sm:flex-none">
                          <Star className="h-3 w-3 mr-1" />
                          Star
                        </Button>
                        {document.status === "pending-action" && (
                          <Button size="sm" className="text-xs flex-1 sm:flex-none">
                            Take Action
                          </Button>
                        )}
                        {document.status === "new" && (
                          <Button size="sm" className="text-xs flex-1 sm:flex-none">
                            Mark as Read
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="text-xs flex-1 sm:flex-none">
                          <Archive className="h-3 w-3 mr-1" />
                          Archive
                        </Button>
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

export default HRDocumentInbox;