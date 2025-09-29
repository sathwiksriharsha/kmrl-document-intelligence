import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCard } from "@/components/compliance/AlertCard";
import { ComplianceTimeline } from "@/components/compliance/ComplianceTimeline";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar as CalendarIcon, Download, BarChart3, AlertTriangle, Clock, CheckCircle } from "lucide-react";

const mockAlerts = [
  {
    title: "Safety Bulletin Deadline - March 12, 2025",
    summary: "Critical safety documentation review required before implementation of new track safety protocols.",
    severity: "high" as const,
    department: "Safety",
    linkedDocument: "Safety Protocol Rev 2.1",
    createdAt: "2 hours ago",
    isResolved: false
  },
  {
    title: "Environmental Permit Renewal Due",
    summary: "Environmental clearance documentation needs renewal before April 15, 2025.",
    severity: "medium" as const,
    department: "Legal",
    linkedDocument: "Environmental Clearance",
    createdAt: "1 day ago",
    isResolved: false
  },
  {
    title: "Vendor Compliance Audit Complete",
    summary: "Quarterly vendor assessment completed with recommendations for contract modifications.",
    severity: "low" as const,
    department: "Procurement",
    linkedDocument: "Vendor Audit Q1-2025",
    createdAt: "3 days ago",
    isResolved: true
  },
  {
    title: "Staff Training Certification Expiring",
    summary: "Technical staff certifications expire in 30 days. Renewal process must begin immediately.",
    severity: "high" as const,
    department: "HR",
    linkedDocument: "Training Records 2024",
    createdAt: "5 hours ago",
    isResolved: false
  },
  {
    title: "Budget Approval Required - Q2 Infrastructure",
    summary: "Capital expenditure approval needed for scheduled infrastructure upgrades and maintenance.",
    severity: "medium" as const,
    department: "Finance",
    linkedDocument: "Q2 Budget Proposal",
    createdAt: "1 day ago",
    isResolved: false
  }
];

const mockTimelineItems = [
  {
    title: "Track Maintenance Inspection",
    date: "September 15, 2025",
    department: "Safety",
    status: "pending" as const,
    daysLeft: 9,
    description: "Quarterly track maintenance inspection required"
  },
  {
    title: "Q3 Financial Report",
    date: "September 30, 2025", 
    department: "Finance",
    status: "in-progress" as const,
    daysLeft: 24,
    description: "Complete third quarter financial review and compliance check"
  },
  {
    title: "Environmental Monitoring Report",
    date: "October 15, 2025",
    department: "Legal", 
    status: "pending" as const,
    daysLeft: 39,
    description: "Submit quarterly environmental monitoring documentation"
  },
  {
    title: "Staff Training Certification",
    date: "September 25, 2025",
    department: "HR",
    status: "in-progress" as const,
    daysLeft: 19,
    description: "Complete mandatory safety training certifications"
  },
  {
    title: "Vendor Performance Review",
    date: "August 31, 2025",
    department: "Procurement",
    status: "overdue" as const,
    daysLeft: -6,
    description: "Quarterly vendor performance assessment overdue"
  },
  {
    title: "Signal System Maintenance",
    date: "September 1, 2025",
    department: "Engineering", 
    status: "completed" as const,
    daysLeft: 0,
    description: "Monthly signal system maintenance completed"
  },
  {
    title: "Station Security Audit",
    date: "September 10, 2025",
    department: "Safety",
    status: "completed" as const,
    daysLeft: 0,
    description: "Completed security audit for all metro stations"
  },
  {
    title: "Emergency Response Drill",
    date: "September 20, 2025",
    department: "Safety",
    status: "pending" as const,
    daysLeft: 14,
    description: "Conduct quarterly emergency response training"
  }
];

const Compliance = () => {
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("alerts");
  const [resolvedAlerts, setResolvedAlerts] = useState<Set<string>>(new Set());

  const handleResolveAlert = (title: string) => {
    setResolvedAlerts(prev => new Set([...prev, title]));
  };

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesDepartment = departmentFilter === "all" || alert.department.toLowerCase() === departmentFilter.toLowerCase();
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         alert.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCritical = !showCriticalOnly || alert.severity === "high";
    const isResolved = resolvedAlerts.has(alert.title) || alert.isResolved;
    
    return matchesDepartment && matchesSearch && matchesCritical && !isResolved;
  });

  const totalTasks = mockTimelineItems.length;
  const overdueTasks = mockTimelineItems.filter(item => item.status === "overdue").length;
  const completedTasks = mockTimelineItems.filter(item => item.status === "completed").length;
  const compliancePercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Alerts & Compliance Dashboard</h1>
            <p className="text-muted-foreground">Monitor critical alerts, compliance deadlines, and document-driven risks</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alerts" className="gap-2">
              <Bell className="h-4 w-4" />
              Alerts & Notifications
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <CalendarIcon className="h-4 w-4" />
              Compliance Calendar
            </TabsTrigger>
            <TabsTrigger value="timeline" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Timeline View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-6">
            {/* Timeline Strip */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Next 30 Days Timeline</h3>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {Array.from({ length: 30 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i);
                    const hasDeadline = [5, 12, 18, 25].includes(i);
                    return (
                      <div key={i} className="flex flex-col items-center min-w-[60px]">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${hasDeadline ? 'bg-red-500 text-white' : 'bg-muted'}`}>
                          {date.getDate()}
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">{date.toLocaleDateString('en', { weekday: 'short' })}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="safety">Safety</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="procurement">Procurement</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Search alerts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="critical-only"
                      checked={showCriticalOnly}
                      onCheckedChange={setShowCriticalOnly}
                    />
                    <Label htmlFor="critical-only">Critical Only</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredAlerts.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Active Alerts</h3>
                        <p className="text-muted-foreground">All alerts have been resolved or no alerts match your filters.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    filteredAlerts.map((alert, index) => (
                      <AlertCard
                        key={index}
                        {...alert}
                        onResolve={() => handleResolveAlert(alert.title)}
                      />
                    ))
                  )}
                </div>
              </div>

              <div className="lg:w-80">
                <ComplianceTimeline items={mockTimelineItems.slice(0, 4)} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Compliance Calendar - September 2025
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar className="w-full" />
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Tasks</span>
                      <Badge variant="outline">{totalTasks}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Overdue</span>
                      <Badge variant="destructive">{overdueTasks}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Completed</span>
                      <Badge variant="outline" className="text-green-600">{completedTasks}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Compliance %</span>
                      <Badge variant="outline">{compliancePercentage}%</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ComplianceTimeline items={mockTimelineItems} />
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Export Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <button className="w-full text-left p-2 hover:bg-muted rounded text-sm">
                      Export as CSV
                    </button>
                    <button className="w-full text-left p-2 hover:bg-muted rounded text-sm">
                      Export as PDF
                    </button>
                    <button className="w-full text-left p-2 hover:bg-muted rounded text-sm">
                      Sync to Google Calendar
                    </button>
                    <button className="w-full text-left p-2 hover:bg-muted rounded text-sm">
                      Export to iCal
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Compliance;