import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Users, FileText, Activity, Settings, Shield, TrendingUp, Database, Bell, UserPlus } from "lucide-react";
import { AnalyticsWidget } from "@/components/dashboard/AnalyticsWidget";

interface DepartmentUsage {
  name: string;
  uploads: number;
  summaries: number;
  alerts: number;
  compliance: number;
}

const mockDepartmentData: DepartmentUsage[] = [
  { name: "Engineering & Safety", uploads: 45, summaries: 42, alerts: 3, compliance: 95 },
  { name: "Finance & Procurement", uploads: 38, summaries: 35, alerts: 1, compliance: 98 },
  { name: "HR & Training", uploads: 32, summaries: 30, alerts: 2, compliance: 92 },
  { name: "Environmental", uploads: 28, summaries: 26, alerts: 4, compliance: 87 },
  { name: "Frontline Management", uploads: 22, summaries: 20, alerts: 1, compliance: 95 }
];

const mockSystemStats = {
  totalUsers: 127,
  activeUsers: 89,
  totalDocuments: 2847,
  documentsToday: 23,
  avgProcessingTime: "1.2s",
  systemUptime: "99.7%",
  storageUsed: 67,
  totalAlerts: 11
};

const mockRecentActivity = [
  { user: "John Doe", action: "uploaded safety report", time: "2 minutes ago", department: "Engineering" },
  { user: "Sarah Chen", action: "completed compliance review", time: "5 minutes ago", department: "Environmental" },
  { user: "Mike Johnson", action: "processed vendor contract", time: "12 minutes ago", department: "Finance" },
  { user: "Lisa Wang", action: "updated training manual", time: "18 minutes ago", department: "HR" },
  { user: "David Kumar", action: "flagged critical alert", time: "25 minutes ago", department: "Safety" }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const getComplianceColor = (score: number) => {
    if (score >= 95) return "text-green-600";
    if (score >= 90) return "text-yellow-600";
    return "text-red-600";
  };

  const getTotalUploads = () => mockDepartmentData.reduce((sum, dept) => sum + dept.uploads, 0);
  const getTotalAlerts = () => mockDepartmentData.reduce((sum, dept) => sum + dept.alerts, 0);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">System overview and user management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              System Settings
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{mockSystemStats.totalUsers}</p>
                  <p className="text-xs text-green-600">{mockSystemStats.activeUsers} active</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                  <p className="text-2xl font-bold">{mockSystemStats.totalDocuments}</p>
                  <p className="text-xs text-green-600">+{mockSystemStats.documentsToday} today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-bold">{getTotalAlerts()}</p>
                  <p className="text-xs text-yellow-600">Requires attention</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">System Uptime</p>
                  <p className="text-2xl font-bold">{mockSystemStats.systemUptime}</p>
                  <p className="text-xs text-blue-600">Performance excellent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsWidget />
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Department Overview
                  </CardTitle>
                  <CardDescription>
                    Document uploads and compliance by department
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDepartmentData.slice(0, 3).map((dept) => (
                      <div key={dept.name} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{dept.name}</p>
                          <p className="text-xs text-muted-foreground">{dept.uploads} uploads this month</p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={dept.compliance >= 95 ? "default" : dept.compliance >= 90 ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            {dept.compliance}% compliant
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <div className="grid gap-4">
              {mockDepartmentData.map((dept) => (
                <Card key={dept.name}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{dept.name}</h3>
                      <div className="flex gap-2">
                        {dept.alerts > 0 && (
                          <Badge variant="destructive" className="gap-1">
                            <Bell className="h-3 w-3" />
                            {dept.alerts} alerts
                          </Badge>
                        )}
                        <Badge 
                          variant={dept.compliance >= 95 ? "default" : "secondary"}
                          className={getComplianceColor(dept.compliance)}
                        >
                          {dept.compliance}% compliant
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{dept.uploads}</p>
                        <p className="text-xs text-muted-foreground">Uploads</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{dept.summaries}</p>
                        <p className="text-xs text-muted-foreground">Summaries</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-600">{dept.alerts}</p>
                        <p className="text-xs text-muted-foreground">Alerts</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Compliance Score</span>
                        <span className={getComplianceColor(dept.compliance)}>{dept.compliance}%</span>
                      </div>
                      <Progress value={dept.compliance} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest user actions across all departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-secondary rounded-full">
                          <Activity className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{activity.user}</p>
                          <p className="text-xs text-muted-foreground">{activity.action}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">
                          {activity.department}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    System Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Processing Speed</span>
                    <span className="font-mono text-green-600">{mockSystemStats.avgProcessingTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Uptime</span>
                    <span className="font-mono text-green-600">{mockSystemStats.systemUptime}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Storage Used</span>
                      <span>{mockSystemStats.storageUsed}%</span>
                    </div>
                    <Progress value={mockSystemStats.storageUsed} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <UserPlus className="h-4 w-4" />
                    Manage Users & Roles
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Settings className="h-4 w-4" />
                    System Configuration
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Database className="h-4 w-4" />
                    Database Management
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Bell className="h-4 w-4" />
                    Alert Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;