import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  Calendar,
  AlertTriangle,
  Target,
  FileText,
  CreditCard
} from "lucide-react";

interface FinancialMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  category: "revenue" | "expense" | "budget" | "savings";
}

interface BudgetItem {
  department: string;
  allocated: number;
  spent: number;
  remaining: number;
  percentage: number;
  status: "on-track" | "warning" | "over-budget";
}

const mockFinancialMetrics: FinancialMetric[] = [
  {
    id: "FM001",
    title: "Monthly Revenue",
    value: "₹1,24,50,000",
    change: "+8.5%",
    trend: "up",
    category: "revenue"
  },
  {
    id: "FM002", 
    title: "Operational Expenses",
    value: "₹89,30,000",
    change: "-3.2%",
    trend: "down",
    category: "expense"
  },
  {
    id: "FM003",
    title: "Budget Utilization",
    value: "78.4%",
    change: "+2.1%",
    trend: "up",
    category: "budget"
  },
  {
    id: "FM004",
    title: "Cost Savings",
    value: "₹12,45,000",
    change: "+15.3%",
    trend: "up",
    category: "savings"
  }
];

const mockBudgetData: BudgetItem[] = [
  {
    department: "Operations",
    allocated: 45000000,
    spent: 35200000,
    remaining: 9800000,
    percentage: 78.2,
    status: "on-track"
  },
  {
    department: "Maintenance",
    allocated: 28000000,
    spent: 24500000,
    remaining: 3500000,
    percentage: 87.5,
    status: "warning"
  },
  {
    department: "Security",
    allocated: 15000000,
    spent: 12800000,
    remaining: 2200000,
    percentage: 85.3,
    status: "on-track"
  },
  {
    department: "Administration",
    allocated: 20000000,
    spent: 19200000,
    remaining: 800000,
    percentage: 96.0,
    status: "warning"
  },
  {
    department: "Technology",
    allocated: 32000000,
    spent: 33500000,
    remaining: -1500000,
    percentage: 104.7,
    status: "over-budget"
  }
];

const FinanceDashboard = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <TrendingUp className="h-4 w-4 text-gray-500" />;
    }
  };

  const getMetricIcon = (category: string) => {
    switch (category) {
      case "revenue": return <DollarSign className="h-5 w-5 text-green-600" />;
      case "expense": return <CreditCard className="h-5 w-5 text-red-600" />;
      case "budget": return <Target className="h-5 w-5 text-blue-600" />;
      case "savings": return <PieChart className="h-5 w-5 text-purple-600" />;
      default: return <BarChart3 className="h-5 w-5 text-gray-600" />;
    }
  };

  const getBudgetStatusColor = (status: string) => {
    switch (status) {
      case "on-track": return "text-green-600 bg-green-50 border-green-200";
      case "warning": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "over-budget": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <DollarSign className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            Finance Dashboard
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Financial overview, expenditure tracking, and budget management
          </p>
        </div>

        {/* Key Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockFinancialMetrics.map((metric) => (
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

        {/* Expenditure Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Monthly Expenditure Trends
            </CardTitle>
            <CardDescription>
              Department-wise spending analysis for the current fiscal year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center space-y-2">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">Expenditure Chart</p>
                <p className="text-sm text-muted-foreground">Interactive chart would be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget vs Actuals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Budget vs Actuals
            </CardTitle>
            <CardDescription>
              Department-wise budget allocation and spending comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockBudgetData.map((budget, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getBudgetStatusColor(budget.status)}`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{budget.department}</h3>
                      <Badge 
                        variant={budget.status === "over-budget" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {budget.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Allocated</p>
                        <p className="font-medium">{formatCurrency(budget.allocated)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Spent</p>
                        <p className="font-medium">{formatCurrency(budget.spent)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Remaining</p>
                        <p className={`font-medium ${budget.remaining < 0 ? "text-red-600" : "text-green-600"}`}>
                          {formatCurrency(budget.remaining)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Utilization</p>
                        <p className="font-medium">{budget.percentage}%</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Budget Utilization</span>
                        <span>{budget.percentage}%</span>
                      </div>
                      <Progress 
                        value={Math.min(budget.percentage, 100)} 
                        className={`h-2 ${budget.status === "over-budget" ? "bg-red-100" : ""}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Financial Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Financial Alerts
              </CardTitle>
              <CardDescription>
                Important financial notifications requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800">Technology Budget Exceeded</p>
                      <p className="text-xs text-red-600">Department has exceeded allocated budget by 4.7%</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-yellow-800">Audit Deadline Approaching</p>
                      <p className="text-xs text-yellow-600">Quarterly audit due in 5 days</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-yellow-800">Pending Invoice Approvals</p>
                      <p className="text-xs text-yellow-600">12 invoices pending approval</p>
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
                Frequently used financial operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span className="text-xs">Generate Report</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-xs">Process Payments</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  <span className="text-xs">Budget Analysis</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span className="text-xs">Schedule Audit</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Recent Financial Transactions
            </CardTitle>
            <CardDescription>
              Latest financial activities and transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Passenger Revenue - September 16</p>
                    <p className="text-xs text-muted-foreground">Daily ticket sales collection</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">+₹4,25,000</p>
                  <p className="text-xs text-muted-foreground">16:30 PM</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Maintenance Payment - Edapally Station</p>
                    <p className="text-xs text-muted-foreground">Platform repair and cleaning</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600">-₹2,50,000</p>
                  <p className="text-xs text-muted-foreground">14:15 PM</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Vendor Payment - Security Services</p>
                    <p className="text-xs text-muted-foreground">Monthly security contract payment</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600">-₹8,75,000</p>
                  <p className="text-xs text-muted-foreground">12:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FinanceDashboard;