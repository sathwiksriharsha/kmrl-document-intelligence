import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Search, FileText, AlertTriangle, Clock, TrendingUp, Users, CheckCircle, Calendar, User } from "lucide-react";

interface DailyBriefItem {
  id: string;
  title: string;
  category: "safety" | "operations" | "maintenance" | "policy";
  priority: "high" | "medium" | "low";
  summary: string;
  actionRequired: boolean;
  source: string;
  timestamp: string;
}

interface UrgentAlert {
  id: string;
  title: string;
  message: string;
  severity: "critical" | "high" | "medium";
  timestamp: string;
  affectedAreas: string[];
  actionItems: string[];
  acknowledged: boolean;
}

interface QuickStat {
  label: string;
  value: string | number;
  trend: "up" | "down" | "stable";
  icon: React.ReactNode;
  color: string;
}

interface MyTask {
  id: string;
  title: string;
  type: "follow-up" | "approval" | "report" | "review";
  priority: "high" | "medium" | "low";
  dueDate: string;
  assignedBy: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  relatedDocument?: string;
}

const mockDailyBrief: DailyBriefItem[] = [
  {
    id: "DB001",
    title: "Updated Safety Protocol for Emergency Evacuation",
    category: "safety",
    priority: "high",
    summary: "New emergency evacuation procedures effective immediately. All station staff must review updated protocols. Key changes include revised assembly points and communication procedures during emergencies.",
    actionRequired: true,
    source: "Safety Department",
    timestamp: "2025-09-17 08:30"
  },
  {
    id: "DB002",
    title: "Train Schedule Adjustments - Peak Hours",
    category: "operations",
    priority: "medium",
    summary: "Minor adjustments to morning peak hour schedules starting September 20. Trains will run at 4-minute intervals between 8:00-10:00 AM to manage increased passenger volume.",
    actionRequired: false,
    source: "Operations Control",
    timestamp: "2025-09-17 07:45"
  },
  {
    id: "DB003",
    title: "Platform Maintenance - Edapally Station",
    category: "maintenance",
    priority: "medium",
    summary: "Scheduled platform maintenance at Edapally Station on September 22, 11:00 PM - 5:00 AM. Platform 2 will be temporarily closed. Passenger guidance protocols in effect.",
    actionRequired: true,
    source: "Maintenance Department",
    timestamp: "2025-09-17 06:15"
  },
  {
    id: "DB004",
    title: "Customer Service Excellence Initiative",
    category: "policy",
    priority: "low",
    summary: "New customer service guidelines emphasizing proactive assistance and passenger engagement. Digital feedback system launched for real-time service quality monitoring.",
    actionRequired: false,
    source: "Customer Relations",
    timestamp: "2025-09-16 16:30"
  }
];

const mockUrgentAlerts: UrgentAlert[] = [
  {
    id: "UA001",
    title: "Signal System Alert - Kaloor Station",
    message: "Intermittent signal communication detected at Kaloor Station. Backup systems activated. Monitor train movements and report any irregularities immediately.",
    severity: "high",
    timestamp: "2025-09-17 09:15",
    affectedAreas: ["Kaloor Station", "Platform 1", "Track Section 3-4"],
    actionItems: [
      "Monitor train arrivals/departures closely",
      "Maintain radio contact with control room",
      "Be prepared for manual override procedures"
    ],
    acknowledged: false
  },
  {
    id: "UA002",
    title: "Weather Advisory - Heavy Rain Expected",
    message: "Heavy rainfall predicted for September 18-19. Enhanced safety protocols in effect. Prepare for potential delays and increased passenger assistance needs.",
    severity: "medium",
    timestamp: "2025-09-17 08:00",
    affectedAreas: ["All Stations", "Outdoor Areas", "Parking Zones"],
    actionItems: [
      "Deploy additional staff during peak hours",
      "Ensure umbrella stations are stocked",
      "Monitor drainage systems for flooding"
    ],
    acknowledged: true
  }
];

const mockMyTasks: MyTask[] = [
  {
    id: "T001",
    title: "Review Safety Incident Report - Platform 2",
    type: "review",
    priority: "high",
    dueDate: "2025-09-18",
    assignedBy: "Safety Manager",
    description: "Review and approve corrective actions for yesterday's safety incident at Platform 2. Ensure all safety protocols were followed.",
    status: "pending",
    relatedDocument: "INC-2025-0917-002"
  },
  {
    id: "T002",
    title: "Approve Overtime Schedule for Weekend",
    type: "approval",
    priority: "medium",
    dueDate: "2025-09-19",
    assignedBy: "HR Department",
    description: "Review and approve overtime assignments for station staff during weekend maintenance window.",
    status: "pending"
  },
  {
    id: "T003",
    title: "Follow-up on Passenger Complaint Resolution",
    type: "follow-up",
    priority: "medium",
    dueDate: "2025-09-20",
    assignedBy: "Customer Relations",
    description: "Ensure passenger complaint about accessibility issues at Aluva station has been addressed properly.",
    status: "in-progress",
    relatedDocument: "COMP-2025-09-15-008"
  },
  {
    id: "T004",
    title: "Submit Monthly Operations Report",
    type: "report",
    priority: "low",
    dueDate: "2025-09-25",
    assignedBy: "Operations Director",
    description: "Compile and submit monthly operations summary including passenger counts, incidents, and performance metrics.",
    status: "pending"
  },
  {
    id: "T005",
    title: "Approve Equipment Purchase Request",
    type: "approval",
    priority: "high",
    dueDate: "2025-09-18",
    assignedBy: "Maintenance Team",
    description: "Review and approve emergency purchase request for signal equipment replacement at Kakkanad station.",
    status: "completed",
    relatedDocument: "PO-2025-09-16-045"
  }
];

const mockQuickStats: QuickStat[] = [
  {
    label: "Passenger Flow",
    value: "12.4K",
    trend: "up",
    icon: <Users className="h-4 w-4" />,
    color: "text-blue-600"
  },
  {
    label: "On-Time Performance",
    value: "97.2%",
    trend: "stable",
    icon: <Clock className="h-4 w-4" />,
    color: "text-green-600"
  },
  {
    label: "Active Alerts",
    value: 2,
    trend: "down",
    icon: <Bell className="h-4 w-4" />,
    color: "text-orange-600"
  },
  {
    label: "Tasks Completed",
    value: "8/10",
    trend: "up",
    icon: <CheckCircle className="h-4 w-4" />,
    color: "text-green-600"
  }
];

const ManagerDashboard = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [alerts, setAlerts] = useState(mockUrgentAlerts);
  const [tasks, setTasks] = useState(mockMyTasks);
  const [activeTab, setActiveTab] = useState("briefs");

  // Set active tab based on URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['briefs', 'alerts', 'search', 'tasks'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const updateTaskStatus = (taskId: string, newStatus: MyTask["status"]) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "safety": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "operations": return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case "maintenance": return <Clock className="h-4 w-4 text-orange-500" />;
      case "policy": return <FileText className="h-4 w-4 text-green-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-600 bg-red-50 border-red-200";
      case "high": return "text-orange-600 bg-orange-50 border-orange-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return "↗";
      case "down": return "↘";
      case "stable": return "→";
      default: return "→";
    }
  };

  const getTaskTypeIcon = (type: MyTask["type"]) => {
    switch (type) {
      case "follow-up": return <Clock className="h-4 w-4 text-blue-500" />;
      case "approval": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "report": return <FileText className="h-4 w-4 text-purple-500" />;
      case "review": return <User className="h-4 w-4 text-orange-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTaskPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600";
      case "in-progress": return "text-blue-600";
      case "pending": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  const pendingTasks = tasks.filter(task => task.status === "pending").length;
  const overdueTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate < today && task.status !== "completed";
  }).length;

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header - Mobile Optimized */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            Frontline Manager Dashboard
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">Real-time insights and alerts for operational excellence</p>
        </div>

        {/* Quick Stats - Mobile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {mockQuickStats.map((stat, index) => (
            <Card key={index} className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-lg md:text-xl font-bold">{stat.value}</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className={`p-1 md:p-2 bg-secondary rounded ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <span className="text-xs">{getTrendIcon(stat.trend)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="briefs">Daily Briefs</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="search">Quick Search</TabsTrigger>
            <TabsTrigger value="tasks">My Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="briefs" className="space-y-4">
            {/* My Daily Brief */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  My Daily Brief
                </CardTitle>
                <CardDescription className="text-sm">
                  AI-generated digest of important documents and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockDailyBrief.map((item) => (
                    <div key={item.id} className={`p-3 md:p-4 rounded-lg border ${getPriorityColor(item.priority)}`}>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="p-1 md:p-2 bg-white/50 rounded">
                            {getCategoryIcon(item.category)}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="font-semibold text-sm md:text-base">{item.title}</h3>
                              <Badge variant={item.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                                {item.priority.toUpperCase()}
                              </Badge>
                              {item.actionRequired && (
                                <Badge variant="destructive" className="text-xs">ACTION REQUIRED</Badge>
                              )}
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground mb-2">{item.summary}</p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t">
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">{item.source}</span> • {item.timestamp}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="text-xs">
                              View Full Document
                            </Button>
                            {item.actionRequired && (
                              <Button size="sm" className="text-xs">
                                Take Action
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
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            {/* Push Notifications Panel */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Urgent Alerts & Notifications
                </CardTitle>
                <CardDescription className="text-sm">
                  Real-time alerts requiring immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className={`p-3 md:p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="font-semibold text-sm md:text-base">{alert.title}</h3>
                              <Badge variant={alert.severity === "critical" ? "destructive" : "secondary"} className="text-xs">
                                {alert.severity.toUpperCase()}
                              </Badge>
                              {alert.acknowledged && (
                                <Badge variant="default" className="text-xs">ACKNOWLEDGED</Badge>
                              )}
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground mb-2">{alert.message}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs font-medium mb-1">Affected Areas:</p>
                            <div className="flex flex-wrap gap-1">
                              {alert.affectedAreas.map((area) => (
                                <Badge key={area} variant="outline" className="text-xs">
                                  {area}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-xs font-medium mb-1">Action Items:</p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {alert.actionItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-1">
                                  <span>•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t">
                          <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                          {!alert.acknowledged && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => acknowledgeAlert(alert.id)}
                              className="text-xs"
                            >
                              Acknowledge Alert
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="space-y-4">
            {/* Quick Search */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Quick Search
                </CardTitle>
                <CardDescription className="text-sm">
                  Search documents relevant to your department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Find Safety Update, Policy, or Document..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 text-sm md:text-base"
                    />
                  </div>
                  
                  {searchQuery && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Search results for "{searchQuery}":</p>
                      <div className="space-y-2">
                        <Card className="p-3">
                          <p className="text-sm font-medium">No results found</p>
                          <p className="text-xs text-muted-foreground">Try adjusting your search terms</p>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            {/* My Tasks */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  My Tasks
                </CardTitle>
                <CardDescription className="text-sm">
                  Assigned tasks, follow-ups, approvals, and reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Task Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-xs text-orange-600 font-medium">Pending</p>
                      <p className="text-lg font-bold text-orange-700">{pendingTasks}</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-xs text-red-600 font-medium">Overdue</p>
                      <p className="text-lg font-bold text-red-700">{overdueTasks}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-600 font-medium">In Progress</p>
                      <p className="text-lg font-bold text-blue-700">{tasks.filter(t => t.status === "in-progress").length}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-600 font-medium">Completed</p>
                      <p className="text-lg font-bold text-green-700">{tasks.filter(t => t.status === "completed").length}</p>
                    </div>
                  </div>

                  {/* Task List */}
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div key={task.id} className={`p-3 md:p-4 rounded-lg border ${getTaskPriorityColor(task.priority)}`}>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="p-1 md:p-2 bg-white/50 rounded">
                              {getTaskTypeIcon(task.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h3 className="font-semibold text-sm md:text-base">{task.title}</h3>
                                <Badge variant={task.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                                  {task.priority.toUpperCase()}
                                </Badge>
                                <Badge variant="outline" className={`${getTaskStatusColor(task.status)} text-xs`}>
                                  {task.status.replace("-", " ").toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-xs md:text-sm text-muted-foreground mb-2">{task.description}</p>
                              <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                  <span className="font-medium">Due Date:</span> {new Date(task.dueDate).toLocaleDateString()}
                                </div>
                                <div>
                                  <span className="font-medium">Assigned By:</span> {task.assignedBy}
                                </div>
                                {task.relatedDocument && (
                                  <div className="col-span-2">
                                    <span className="font-medium">Related Doc:</span> {task.relatedDocument}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t">
                            <div className="text-xs text-muted-foreground">
                              Type: <span className="font-medium capitalize">{task.type}</span>
                            </div>
                            <div className="flex gap-2">
                              {task.status === "pending" && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => updateTaskStatus(task.id, "in-progress")}
                                  className="text-xs"
                                >
                                  Start Task
                                </Button>
                              )}
                              {task.status === "in-progress" && (
                                <Button 
                                  size="sm"
                                  onClick={() => updateTaskStatus(task.id, "completed")}
                                  className="text-xs"
                                >
                                  Mark Complete
                                </Button>
                              )}
                              <Button variant="outline" size="sm" className="text-xs">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;