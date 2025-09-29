import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, DollarSign, Download, TrendingUp, Building, FileText, Calendar } from "lucide-react";

interface MonthlyExpenditure {
  month: string;
  amount: number;
  budget: number;
  categories: {
    operations: number;
    maintenance: number;
    procurement: number;
    utilities: number;
  };
}

interface Vendor {
  id: string;
  name: string;
  totalValue: number;
  contractCount: number;
  category: string;
  aiTags: string[];
  riskLevel: "low" | "medium" | "high";
  lastPayment: string;
}

interface ContractAlert {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  contractIds: string[];
  potentialLoss: number;
}

const mockExpenditureData: MonthlyExpenditure[] = [
  {
    month: "Jan 2025",
    amount: 2850000,
    budget: 3000000,
    categories: { operations: 1200000, maintenance: 850000, procurement: 500000, utilities: 300000 }
  },
  {
    month: "Feb 2025", 
    amount: 3100000,
    budget: 3000000,
    categories: { operations: 1300000, maintenance: 900000, procurement: 600000, utilities: 300000 }
  },
  {
    month: "Mar 2025",
    amount: 2750000,
    budget: 3000000,
    categories: { operations: 1150000, maintenance: 800000, procurement: 500000, utilities: 300000 }
  },
  {
    month: "Apr 2025",
    amount: 2950000,
    budget: 3100000,
    categories: { operations: 1250000, maintenance: 850000, procurement: 550000, utilities: 300000 }
  },
  {
    month: "May 2025",
    amount: 3200000,
    budget: 3100000,
    categories: { operations: 1400000, maintenance: 950000, procurement: 550000, utilities: 300000 }
  },
  {
    month: "Jun 2025",
    amount: 2900000,
    budget: 3100000,
    categories: { operations: 1200000, maintenance: 850000, procurement: 550000, utilities: 300000 }
  }
];

const mockVendors: Vendor[] = [
  {
    id: "V001",
    name: "Metro Technical Solutions",
    totalValue: 2500000,
    contractCount: 8,
    category: "Technical Services",
    aiTags: ["High-value vendor", "Recurring vendor", "Critical supplier"],
    riskLevel: "low",
    lastPayment: "2025-09-15"
  },
  {
    id: "V002",
    name: "PowerGrid Industries",
    totalValue: 1800000,
    contractCount: 5,
    category: "Electrical",
    aiTags: ["Recurring vendor", "Infrastructure"],
    riskLevel: "low",
    lastPayment: "2025-09-10"
  },
  {
    id: "V003",
    name: "SafeTrack Maintenance",
    totalValue: 1200000,
    contractCount: 12,
    category: "Maintenance",
    aiTags: ["High-frequency vendor", "Safety critical"],
    riskLevel: "medium",
    lastPayment: "2025-09-12"
  },
  {
    id: "V004",
    name: "QuickFix Services",
    totalValue: 450000,
    contractCount: 15,
    category: "General Services",
    aiTags: ["Small vendor", "Frequent transactions"],
    riskLevel: "low",
    lastPayment: "2025-09-14"
  }
];

const mockContractAlerts: ContractAlert[] = [
  {
    id: "CA001",
    title: "Duplicate Service Contracts Detected",
    description: "Similar maintenance contracts found with overlapping scope for Track Section 2-4. Potential cost savings of ₹2.5L identified.",
    severity: "high",
    contractIds: ["CT-2024-045", "CT-2024-067"],
    potentialLoss: 250000
  },
  {
    id: "CA002",
    title: "Vendor Payment Terms Mismatch",
    description: "PowerGrid Industries has conflicting payment terms across multiple contracts. Standardization recommended.",
    severity: "medium",
    contractIds: ["CT-2024-023", "CT-2024-089"],
    potentialLoss: 50000
  }
];

const FinanceDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [activeTab, setActiveTab] = useState("overview");

  const currentMonthData = mockExpenditureData[mockExpenditureData.length - 1];
  const totalSpent = currentMonthData.amount;
  const budgetUtilization = (totalSpent / currentMonthData.budget) * 100;
  const totalVendorValue = mockVendors.reduce((sum, vendor) => sum + vendor.totalValue, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-primary" />
              Finance & Procurement Dashboard
            </h1>
            <p className="text-muted-foreground">Monitor expenditure, vendor relationships, and contract management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Excel Report
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Generate Summary
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Monthly Spent</p>
                  <p className="text-xl font-bold">{formatCurrency(totalSpent)}</p>
                  <p className="text-xs text-muted-foreground">{budgetUtilization.toFixed(1)}% of budget</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Active Vendors</p>
                  <p className="text-xl font-bold">{mockVendors.length}</p>
                  <p className="text-xs text-green-600">{formatCurrency(totalVendorValue)}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Contract Alerts</p>
                  <p className="text-xl font-bold">{mockContractAlerts.length}</p>
                  <p className="text-xs text-red-600">Requires attention</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Cost Savings</p>
                  <p className="text-xl font-bold">{formatCurrency(300000)}</p>
                  <p className="text-xs text-orange-600">This quarter</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="expenditure">Expenditure</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="alerts">Contract Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Monthly Expenditure Trend
                  </CardTitle>
                  <CardDescription>
                    Spending patterns over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockExpenditureData.slice(-3).map((data, index) => (
                      <div key={data.month} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{data.month}</p>
                          <p className="text-sm text-muted-foreground">
                            {((data.amount / data.budget) * 100).toFixed(1)}% of budget
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(data.amount)}</p>
                          <p className="text-xs text-muted-foreground">
                            Budget: {formatCurrency(data.budget)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Vendors by Value</CardTitle>
                  <CardDescription>
                    Highest value vendor relationships
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockVendors.slice(0, 3).map((vendor) => (
                      <div key={vendor.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{vendor.name}</p>
                          <p className="text-sm text-muted-foreground">{vendor.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(vendor.totalValue)}</p>
                          <p className="text-xs text-muted-foreground">
                            {vendor.contractCount} contracts
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="expenditure" className="space-y-6">
            <div className="flex items-center gap-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Expenditure Breakdown</CardTitle>
                <CardDescription>
                  Detailed spending analysis by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockExpenditureData.map((data, index) => (
                    <div key={data.month} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{data.month}</h3>
                        <div className="text-right">
                          <p className="font-bold text-lg">{formatCurrency(data.amount)}</p>
                          <p className="text-sm text-muted-foreground">
                            Budget: {formatCurrency(data.budget)}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Operations</p>
                          <p className="font-semibold">{formatCurrency(data.categories.operations)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Maintenance</p>
                          <p className="font-semibold">{formatCurrency(data.categories.maintenance)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Procurement</p>
                          <p className="font-semibold">{formatCurrency(data.categories.procurement)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Utilities</p>
                          <p className="font-semibold">{formatCurrency(data.categories.utilities)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Vendor Summary with AI Tags
                </CardTitle>
                <CardDescription>
                  Comprehensive vendor analysis with AI-generated insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockVendors.map((vendor) => (
                    <div key={vendor.id} className={`p-4 rounded-lg border ${getRiskColor(vendor.riskLevel)}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{vendor.name}</h3>
                            <Badge variant={vendor.riskLevel === "low" ? "default" : "secondary"}>
                              {vendor.riskLevel.toUpperCase()} RISK
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{vendor.category}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {vendor.aiTags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{formatCurrency(vendor.totalValue)}</p>
                          <p className="text-sm text-muted-foreground">{vendor.contractCount} contracts</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Vendor ID: {vendor.id}</span>
                        <span>Last Payment: {vendor.lastPayment}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Duplicate Contracts & Risk Alerts
                </CardTitle>
                <CardDescription>
                  AI-detected contract issues and optimization opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockContractAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 border rounded-lg bg-red-50 border-red-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-red-900">{alert.title}</h3>
                            <Badge variant="destructive">
                              {alert.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-red-700 mb-3">{alert.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {alert.contractIds.map((contractId) => (
                              <Badge key={contractId} variant="outline" className="text-xs">
                                {contractId}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-red-900">
                            {formatCurrency(alert.potentialLoss)}
                          </p>
                          <p className="text-xs text-red-600">Potential loss</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">
                          Review Contracts
                        </Button>
                        <Button variant="outline" size="sm">
                          Mark Resolved
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

export default FinanceDashboard;