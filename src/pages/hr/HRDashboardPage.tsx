import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  BookOpen,
  Award,
  UserCheck
} from "lucide-react";

interface HRMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  category: "employees" | "training" | "compliance" | "performance";
}

interface Policy {
  id: string;
  title: string;
  category: "hr-policy" | "safety" | "conduct" | "benefits";
  status: "active" | "pending-review" | "expired" | "draft";
  lastUpdated: string;
  expiryDate: string;
  owner: string;
  applicableEmployees: number;
}

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  hireDate: string;
  trainingStatus: "completed" | "in-progress" | "overdue" | "not-started";
  complianceScore: number;
  lastTraining: string;
}

const mockHRMetrics: HRMetric[] = [
  {
    id: "HR001",
    title: "Total Employees",
    value: "1,247",
    change: "+3.2%",
    trend: "up",
    category: "employees"
  },
  {
    id: "HR002",
    title: "Training Completion",
    value: "87.5%",
    change: "+5.8%",
    trend: "up",
    category: "training"
  },
  {
    id: "HR003",
    title: "Policy Compliance",
    value: "94.2%",
    change: "-1.1%",
    trend: "down",
    category: "compliance"
  },
  {
    id: "HR004",
    title: "Performance Rating",
    value: "4.3/5.0",
    change: "+0.2",
    trend: "up",
    category: "performance"
  }
];

const mockPolicies: Policy[] = [
  {
    id: "POL001",
    title: "Employee Safety and Health Policy",
    category: "safety",
    status: "active",
    lastUpdated: "2025-08-15",
    expiryDate: "2026-08-15",
    owner: "Safety Manager",
    applicableEmployees: 1247
  },
  {
    id: "POL002",
    title: "Code of Conduct and Ethics",
    category: "conduct",
    status: "pending-review",
    lastUpdated: "2025-07-20",
    expiryDate: "2025-10-20",
    owner: "HR Manager",
    applicableEmployees: 1247
  },
  {
    id: "POL003",
    title: "Training and Development Policy",
    category: "hr-policy",
    status: "active",
    lastUpdated: "2025-09-01",
    expiryDate: "2026-09-01",
    owner: "Training Manager",
    applicableEmployees: 1247
  },
  {
    id: "POL004",
    title: "Employee Benefits and Compensation",
    category: "benefits",
    status: "expired",
    lastUpdated: "2024-12-31",
    expiryDate: "2025-08-31",
    owner: "HR Director",
    applicableEmployees: 1247
  }
];

const mockEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "Rajesh Kumar",
    department: "Operations",
    position: "Station Manager",
    hireDate: "2022-03-15",
    trainingStatus: "completed",
    complianceScore: 95,
    lastTraining: "2025-08-20"
  },
  {
    id: "EMP002",
    name: "Priya Nair",
    department: "Security",
    position: "Security Supervisor",
    hireDate: "2023-01-10",
    trainingStatus: "in-progress",
    complianceScore: 88,
    lastTraining: "2025-07-15"
  },
  {
    id: "EMP003",
    name: "Arun Menon",
    department: "Maintenance",
    position: "Technical Lead",
    hireDate: "2021-11-05",
    trainingStatus: "overdue",
    complianceScore: 72,
    lastTraining: "2025-05-10"
  },
  {
    id: "EMP004",
    name: "Sunita Sharma",
    department: "Finance",
    position: "Accounts Manager",
    hireDate: "2023-06-20",
    trainingStatus: "completed",
    complianceScore: 92,
    lastTraining: "2025-09-05"
  }
];

const HRDashboardPage = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <TrendingUp className="h-4 w-4 text-gray-500" />;
    }
  };

  const getMetricIcon = (category: string) => {
    switch (category) {
      case "employees": return <Users className="h-5 w-5 text-blue-600" />;
      case "training": return <BookOpen className="h-5 w-5 text-green-600" />;
      case "compliance": return <CheckCircle className="h-5 w-5 text-purple-600" />;
      case "performance": return <Award className="h-5 w-5 text-orange-600" />;
      default: return <Users className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPolicyStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-50 border-green-200";
      case "pending-review": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "expired": return "text-red-600 bg-red-50 border-red-200";
      case "draft": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getTrainingStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-50";
      case "in-progress": return "text-blue-600 bg-blue-50";
      case "overdue": return "text-red-600 bg-red-50";
      case "not-started": return "text-gray-600 bg-gray-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getTrainingStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress": return <Clock className="h-4 w-4 text-blue-500" />;
      case "overdue": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "not-started": return <Calendar className="h-4 w-4 text-gray-500" />;
      default: return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            HR Dashboard
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Employee statistics, policy management, and HR KPIs overview
          </p>
        </div>

        {/* HR Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockHRMetrics.map((metric) => (
            <Card key={metric.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-primary/10 rounded">
                  {getMetricIcon(metric.category)}
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-xs font-medium ${
                    metric.trend === "up" ? "text-green-600" : 
                    metric.trend === "down" ? "text-red-600" : "text-gray-600"
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <p className="text-xl font-bold">{metric.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Policy Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Policy Management
            </CardTitle>
            <CardDescription>
              HR policies, status tracking, and compliance monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPolicies.map((policy) => (
                <div key={policy.id} className={`p-4 rounded-lg border ${getPolicyStatusColor(policy.status)}`}>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-semibold text-base">{policy.title}</h3>
                          <Badge variant={policy.status === "expired" ? "destructive" : "secondary"} className="text-xs">
                            {policy.status.replace("-", " ").toUpperCase()}
                          </Badge>
                          {getDaysUntilExpiry(policy.expiryDate) <= 30 && getDaysUntilExpiry(policy.expiryDate) > 0 && (
                            <Badge variant="destructive" className="text-xs">EXPIRING SOON</Badge>
                          )}
                          {getDaysUntilExpiry(policy.expiryDate) < 0 && (
                            <Badge variant="destructive" className="text-xs">EXPIRED</Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div>
                            <p><strong>Category:</strong> {policy.category.replace("-", " ")}</p>
                            <p><strong>Owner:</strong> {policy.owner}</p>
                          </div>
                          <div>
                            <p><strong>Last Updated:</strong> {policy.lastUpdated}</p>
                            <p><strong>Expiry Date:</strong> {policy.expiryDate}</p>
                          </div>
                          <div>
                            <p><strong>Applicable Employees:</strong> {policy.applicableEmployees}</p>
                            <p><strong>Days to Expiry:</strong> {getDaysUntilExpiry(policy.expiryDate) >= 0 
                              ? `${getDaysUntilExpiry(policy.expiryDate)} days`
                              : `${Math.abs(getDaysUntilExpiry(policy.expiryDate))} days overdue`
                            }</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm" className="text-xs">
                              View Policy
                            </Button>
                            <Button size="sm" className="text-xs">
                              Edit Policy
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Employee Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Employee Training Overview
            </CardTitle>
            <CardDescription>
              Employee training status and compliance tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEmployees.map((employee) => (
                <div key={employee.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{employee.name}</h3>
                          <p className="text-sm text-muted-foreground">{employee.position} - {employee.department}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {getTrainingStatusIcon(employee.trainingStatus)}
                          <span className={`text-xs font-medium px-2 py-1 rounded ${getTrainingStatusColor(employee.trainingStatus)}`}>
                            {employee.trainingStatus.replace("-", " ").toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                        <div>
                          <p><strong>Hire Date:</strong> {employee.hireDate}</p>
                        </div>
                        <div>
                          <p><strong>Last Training:</strong> {employee.lastTraining}</p>
                        </div>
                        <div>
                          <p><strong>Compliance Score:</strong> {employee.complianceScore}%</p>
                        </div>
                        <div>
                          <p><strong>Department:</strong> {employee.department}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Compliance Score</span>
                          <span>{employee.complianceScore}%</span>
                        </div>
                        <Progress value={employee.complianceScore} className="h-2" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm" className="text-xs">
                        View Profile
                      </Button>
                      <Button size="sm" className="text-xs">
                        Assign Training
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & HR Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* HR Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                HR Alerts
              </CardTitle>
              <CardDescription>
                Important HR notifications requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800">Employee Benefits Policy Expired</p>
                      <p className="text-xs text-red-600">Policy expired 17 days ago - immediate review required</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-yellow-800">Training Overdue - Arun Menon</p>
                      <p className="text-xs text-yellow-600">Safety training overdue by 127 days</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-yellow-800">Policy Review Due Soon</p>
                      <p className="text-xs text-yellow-600">Code of Conduct review due in 33 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Frequently used HR operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="text-xs">Add Employee</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span className="text-xs">Schedule Training</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span className="text-xs">Create Policy</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span className="text-xs">Performance Review</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HRDashboardPage;