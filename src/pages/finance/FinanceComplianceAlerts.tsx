import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ShieldAlert, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  TrendingUp,
  DollarSign,
  Filter,
  Bell,
  Download,
  Eye
} from "lucide-react";

interface ComplianceAlert {
  id: string;
  title: string;
  description: string;
  category: "audit" | "tax" | "invoice" | "regulatory" | "financial-reporting" | "contract";
  priority: "critical" | "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed" | "overdue";
  dueDate: string;
  assignedTo: string;
  department: string;
  createdDate: string;
  estimatedHours: number;
  completionPercentage: number;
  requirements: string[];
  consequences: string;
}

const mockComplianceAlerts: ComplianceAlert[] = [
  {
    id: "CA001",
    title: "Quarterly Financial Audit - Q3 2025",
    description: "Comprehensive audit of all financial records, expenditures, and revenue for Q3 2025. External auditor review scheduled.",
    category: "audit",
    priority: "critical",
    status: "pending",
    dueDate: "2025-09-22",
    assignedTo: "Finance Manager",
    department: "Finance",
    createdDate: "2025-08-15",
    estimatedHours: 40,
    completionPercentage: 15,
    requirements: [
      "Compile all financial statements",
      "Prepare expense documentation", 
      "Review vendor payment records",
      "Organize asset registers"
    ],
    consequences: "Regulatory non-compliance, potential penalties, operational license review"
  },
  {
    id: "CA002",
    title: "GST Return Filing - September 2025",
    description: "Monthly GST return filing for all Metro operations including passenger revenue, vendor payments, and service taxes.",
    category: "tax",
    priority: "high",
    status: "in-progress",
    dueDate: "2025-09-20",
    assignedTo: "Tax Consultant",
    department: "Finance",
    createdDate: "2025-09-01",
    estimatedHours: 8,
    completionPercentage: 60,
    requirements: [
      "Reconcile all GST transactions",
      "Verify input tax credits",
      "Prepare GSTR-1 and GSTR-3B",
      "Submit returns online"
    ],
    consequences: "Late filing penalties, interest charges, GST compliance rating impact"
  },
  {
    id: "CA003",
    title: "Invoice Compliance Review - Vendor Payments",
    description: "Review all vendor invoices for compliance with procurement policies, tax regulations, and contract terms.",
    category: "invoice",
    priority: "medium",
    status: "pending",
    dueDate: "2025-09-25",
    assignedTo: "Accounts Payable Team",
    department: "Finance",
    createdDate: "2025-09-10",
    estimatedHours: 16,
    completionPercentage: 0,
    requirements: [
      "Verify invoice authenticity",
      "Check contract compliance",
      "Validate tax calculations",
      "Ensure proper approvals"
    ],
    consequences: "Payment disputes, tax issues, vendor relationship impact"
  },
  {
    id: "CA004",
    title: "RBI Guidelines Compliance - Cash Management",
    description: "Ensure compliance with Reserve Bank of India guidelines for cash handling, storage, and transportation in Metro operations.",
    category: "regulatory",
    priority: "high",
    status: "in-progress",
    dueDate: "2025-09-30",
    assignedTo: "Treasury Manager",
    department: "Finance",
    createdDate: "2025-09-05",
    estimatedHours: 12,
    completionPercentage: 35,
    requirements: [
      "Review cash handling procedures",
      "Update security protocols",
      "Train cash handling staff",
      "Submit compliance report"
    ],
    consequences: "Regulatory penalties, operational restrictions, security risks"
  },
  {
    id: "CA005",
    title: "Annual Financial Statement Preparation",
    description: "Prepare comprehensive annual financial statements including profit & loss, balance sheet, and cash flow statements.",
    category: "financial-reporting",
    priority: "medium",
    status: "completed",
    dueDate: "2025-09-15",
    assignedTo: "Chief Financial Officer",
    department: "Finance",
    createdDate: "2025-08-01",
    estimatedHours: 60,
    completionPercentage: 100,
    requirements: [
      "Consolidate all accounts",
      "Prepare detailed statements",
      "External auditor review",
      "Board approval process"
    ],
    consequences: "N/A - Completed successfully"
  },
  {
    id: "CA006",
    title: "Contract Renewal Compliance - Insurance Policies",
    description: "Review and renew all insurance policies ensuring compliance with regulatory requirements and coverage adequacy.",
    category: "contract",
    priority: "high",
    status: "overdue",
    dueDate: "2025-09-10",
    assignedTo: "Risk Manager",
    department: "Finance",
    createdDate: "2025-08-20",
    estimatedHours: 20,
    completionPercentage: 25,
    requirements: [
      "Review current policies",
      "Assess coverage adequacy",
      "Negotiate renewal terms",
      "Ensure regulatory compliance"
    ],
    consequences: "Coverage gaps, regulatory non-compliance, increased liability exposure"
  }
];

const FinanceComplianceAlerts = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "audit": return <ShieldAlert className="h-4 w-4 text-purple-500" />;
      case "tax": return <DollarSign className="h-4 w-4 text-green-500" />;
      case "invoice": return <FileText className="h-4 w-4 text-blue-500" />;
      case "regulatory": return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "financial-reporting": return <TrendingUp className="h-4 w-4 text-indigo-500" />;
      case "contract": return <CheckCircle className="h-4 w-4 text-teal-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "text-red-700 bg-red-50 border-red-200";
      case "high": return "text-orange-700 bg-orange-50 border-orange-200";
      case "medium": return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-700 bg-green-50 border-green-200";
      default: return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress": return <Clock className="h-4 w-4 text-blue-500" />;
      case "overdue": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "pending": return <Calendar className="h-4 w-4 text-gray-500" />;
      default: return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-50";
      case "in-progress": return "text-blue-600 bg-blue-50";
      case "overdue": return "text-red-600 bg-red-50";
      case "pending": return "text-gray-600 bg-gray-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const pendingAlerts = mockComplianceAlerts.filter(alert => alert.status === "pending");
  const overdueAlerts = mockComplianceAlerts.filter(alert => alert.status === "overdue");
  const criticalAlerts = mockComplianceAlerts.filter(alert => alert.priority === "critical");
  const inProgressAlerts = mockComplianceAlerts.filter(alert => alert.status === "in-progress");

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            Finance Compliance Alerts
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Financial compliance monitoring, audit deadlines, and regulatory requirements
          </p>
        </div>

        {/* Compliance Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Pending</p>
                <p className="text-lg md:text-xl font-bold text-gray-600">{pendingAlerts.length}</p>
              </div>
              <div className="p-1 md:p-2 bg-gray-100 rounded text-gray-600">
                <Calendar className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">In Progress</p>
                <p className="text-lg md:text-xl font-bold text-blue-600">{inProgressAlerts.length}</p>
              </div>
              <div className="p-1 md:p-2 bg-blue-100 rounded text-blue-600">
                <Clock className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Overdue</p>
                <p className="text-lg md:text-xl font-bold text-red-600">{overdueAlerts.length}</p>
              </div>
              <div className="p-1 md:p-2 bg-red-100 rounded text-red-600">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Critical</p>
                <p className="text-lg md:text-xl font-bold text-purple-600">{criticalAlerts.length}</p>
              </div>
              <div className="p-1 md:p-2 bg-purple-100 rounded text-purple-600">
                <ShieldAlert className="h-4 w-4" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filter Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Compliance Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">All Alerts</Button>
              <Button variant="outline" size="sm">Pending</Button>
              <Button variant="outline" size="sm">Overdue</Button>
              <Button variant="outline" size="sm">Critical Priority</Button>
              <Button variant="outline" size="sm">Audit</Button>
              <Button variant="outline" size="sm">Tax</Button>
              <Button variant="outline" size="sm">Regulatory</Button>
              <Button variant="outline" size="sm">Due This Week</Button>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Alerts List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Active Compliance Alerts ({mockComplianceAlerts.length})
            </CardTitle>
            <CardDescription>
              Finance-specific compliance requirements and deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockComplianceAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border ${getPriorityColor(alert.priority)}`}>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white/50 rounded">
                        {getCategoryIcon(alert.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-semibold text-base">{alert.title}</h3>
                          <Badge variant={alert.priority === "critical" ? "destructive" : "secondary"} className="text-xs">
                            {alert.priority.toUpperCase()}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(alert.status)}
                            <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(alert.status)}`}>
                              {alert.status.replace("-", " ").toUpperCase()}
                            </span>
                          </div>
                          {getDaysUntilDue(alert.dueDate) < 0 && (
                            <Badge variant="destructive" className="text-xs">OVERDUE</Badge>
                          )}
                          {getDaysUntilDue(alert.dueDate) <= 7 && getDaysUntilDue(alert.dueDate) >= 0 && (
                            <Badge variant="destructive" className="text-xs">DUE SOON</Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-muted-foreground">Due Date</p>
                            <p className="font-medium">{alert.dueDate}</p>
                            <p className="text-xs text-muted-foreground">
                              {getDaysUntilDue(alert.dueDate) >= 0 
                                ? `${getDaysUntilDue(alert.dueDate)} days remaining`
                                : `${Math.abs(getDaysUntilDue(alert.dueDate))} days overdue`
                              }
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Assigned To</p>
                            <p className="font-medium">{alert.assignedTo}</p>
                            <p className="text-xs text-muted-foreground">{alert.department}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Category</p>
                            <p className="font-medium">{alert.category.replace("-", " ")}</p>
                            <p className="text-xs text-muted-foreground">Est. {alert.estimatedHours}h</p>
                          </div>
                        </div>

                        {/* Progress Bar for In-Progress Items */}
                        {alert.status === "in-progress" && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Completion Progress</span>
                              <span>{alert.completionPercentage}%</span>
                            </div>
                            <Progress value={alert.completionPercentage} className="h-2" />
                          </div>
                        )}

                        {/* Requirements Checklist */}
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-2">Requirements:</p>
                          <ul className="text-xs space-y-1">
                            {alert.requirements.map((req, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Consequences */}
                        <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                          <p className="font-medium text-yellow-800">Consequences of Non-Compliance:</p>
                          <p className="text-yellow-700">{alert.consequences}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t">
                      <div className="text-xs text-muted-foreground">
                        Alert ID: {alert.id} • Created: {alert.createdDate}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                        {alert.status === "pending" && (
                          <Button size="sm" className="text-xs">
                            Start Task
                          </Button>
                        )}
                        {alert.status === "in-progress" && (
                          <Button size="sm" className="text-xs">
                            Update Progress
                          </Button>
                        )}
                        {alert.status === "overdue" && (
                          <Button variant="destructive" size="sm" className="text-xs">
                            Urgent Action
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

export default FinanceComplianceAlerts;