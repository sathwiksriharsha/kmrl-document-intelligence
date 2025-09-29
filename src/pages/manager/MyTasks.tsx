import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  CheckSquare, 
  Clock, 
  AlertTriangle, 
  Calendar, 
  User, 
  Target,
  Plus,
  Filter,
  Star
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed" | "overdue";
  dueDate: string;
  category: "safety" | "operational" | "maintenance" | "administrative" | "compliance";
  assignedBy: string;
  estimatedHours: number;
  completedHours?: number;
  tags: string[];
  location?: string;
}

const mockTasks: Task[] = [
  {
    id: "TSK001",
    title: "Complete Monthly Safety Inspection Report",
    description: "Conduct comprehensive safety inspection of all station areas and compile monthly report for submission to Safety Department.",
    priority: "high",
    status: "pending",
    dueDate: "2025-09-20",
    category: "safety",
    assignedBy: "Safety Manager",
    estimatedHours: 4,
    tags: ["monthly", "inspection", "safety", "report"],
    location: "All Station Areas"
  },
  {
    id: "TSK002",
    title: "Review and Update Emergency Contact List",
    description: "Verify all emergency contact information and update staff directory with any changes. Ensure all departments have current contact details.",
    priority: "medium",
    status: "in-progress",
    dueDate: "2025-09-18",
    category: "administrative",
    assignedBy: "Operations Director",
    estimatedHours: 2,
    completedHours: 1,
    tags: ["contacts", "emergency", "directory", "update"]
  },
  {
    id: "TSK003",
    title: "Coordinate Platform Maintenance Schedule",
    description: "Work with maintenance team to schedule platform cleaning and repair work during off-peak hours. Minimize passenger disruption.",
    priority: "medium",
    status: "pending",
    dueDate: "2025-09-22",
    category: "maintenance",
    assignedBy: "Maintenance Supervisor",
    estimatedHours: 3,
    tags: ["platform", "maintenance", "scheduling", "coordination"],
    location: "Platform 1 & 2"
  },
  {
    id: "TSK004",
    title: "Staff Training Session - Customer Service",
    description: "Organize and conduct customer service training session for all frontline staff. Focus on new passenger assistance protocols.",
    priority: "low",
    status: "pending",
    dueDate: "2025-09-25",
    category: "operational",
    assignedBy: "Training Manager",
    estimatedHours: 6,
    tags: ["training", "customer-service", "staff", "protocols"]
  },
  {
    id: "TSK005",
    title: "Submit Compliance Documentation",
    description: "Prepare and submit quarterly compliance documentation to regulatory authorities. Ensure all safety and operational requirements are met.",
    priority: "high",
    status: "overdue",
    dueDate: "2025-09-15",
    category: "compliance",
    assignedBy: "Compliance Officer",
    estimatedHours: 5,
    tags: ["compliance", "documentation", "quarterly", "regulatory"]
  },
  {
    id: "TSK006",
    title: "Equipment Inventory Check",
    description: "Conduct weekly inventory check of all safety and operational equipment. Update inventory management system with current status.",
    priority: "medium",
    status: "completed",
    dueDate: "2025-09-16",
    category: "operational",
    assignedBy: "Operations Manager",
    estimatedHours: 2,
    completedHours: 2,
    tags: ["inventory", "equipment", "weekly", "check"]
  }
];

const MyTasks = () => {
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());

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
      case "completed": return "text-green-600 bg-green-50";
      case "in-progress": return "text-blue-600 bg-blue-50";
      case "overdue": return "text-red-600 bg-red-50";
      case "pending": return "text-gray-600 bg-gray-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckSquare className="h-4 w-4 text-green-500" />;
      case "in-progress": return <Clock className="h-4 w-4 text-blue-500" />;
      case "overdue": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "pending": return <Calendar className="h-4 w-4 text-gray-500" />;
      default: return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  const toggleTaskSelection = (taskId: string) => {
    const newSelection = new Set(selectedTasks);
    if (newSelection.has(taskId)) {
      newSelection.delete(taskId);
    } else {
      newSelection.add(taskId);
    }
    setSelectedTasks(newSelection);
  };

  const pendingTasks = mockTasks.filter(task => task.status === "pending");
  const inProgressTasks = mockTasks.filter(task => task.status === "in-progress");
  const overdueTasks = mockTasks.filter(task => task.status === "overdue");
  const completedTasks = mockTasks.filter(task => task.status === "completed");

  const getTaskProgress = (task: Task) => {
    if (task.status === "completed") return 100;
    if (task.completedHours && task.estimatedHours) {
      return Math.round((task.completedHours / task.estimatedHours) * 100);
    }
    return 0;
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <CheckSquare className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            My Tasks
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Personal task management and assignment tracking
          </p>
        </div>

        {/* Task Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Pending</p>
                <p className="text-lg md:text-xl font-bold text-gray-600">{pendingTasks.length}</p>
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
                <p className="text-lg md:text-xl font-bold text-blue-600">{inProgressTasks.length}</p>
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
                <p className="text-lg md:text-xl font-bold text-red-600">{overdueTasks.length}</p>
              </div>
              <div className="p-1 md:p-2 bg-red-100 rounded text-red-600">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Completed</p>
                <p className="text-lg md:text-xl font-bold text-green-600">{completedTasks.length}</p>
              </div>
              <div className="p-1 md:p-2 bg-green-100 rounded text-green-600">
                <CheckSquare className="h-4 w-4" />
              </div>
            </div>
          </Card>
        </div>

        {/* Task Management Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Task Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter Tasks
              </Button>
              <Button variant="outline" size="sm">All Tasks</Button>
              <Button variant="outline" size="sm">Pending</Button>
              <Button variant="outline" size="sm">In Progress</Button>
              <Button variant="outline" size="sm">High Priority</Button>
              <Button variant="outline" size="sm">Due Today</Button>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              All Tasks ({mockTasks.length})
            </CardTitle>
            <CardDescription>
              Manage your assigned tasks and track progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTasks.map((task) => (
                <div key={task.id} className={`p-4 rounded-lg border ${getPriorityColor(task.priority)}`}>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={task.id}
                        checked={selectedTasks.has(task.id)}
                        onCheckedChange={() => toggleTaskSelection(task.id)}
                      />
                      <div className="p-2 bg-white/50 rounded">
                        {getStatusIcon(task.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-semibold text-base">{task.title}</h3>
                          <Badge variant={task.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                            {task.priority.toUpperCase()}
                          </Badge>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status.replace("-", " ").toUpperCase()}
                          </div>
                          {task.status === "overdue" && (
                            <Badge variant="destructive" className="text-xs">OVERDUE</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                        
                        {/* Progress Bar for In-Progress Tasks */}
                        {task.status === "in-progress" && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{getTaskProgress(task)}%</span>
                            </div>
                            <Progress value={getTaskProgress(task)} className="h-2" />
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                          <span><strong>Due:</strong> {task.dueDate}</span>
                          <span><strong>Category:</strong> {task.category}</span>
                          <span><strong>Assigned by:</strong> {task.assignedBy}</span>
                          <span><strong>Estimated:</strong> {task.estimatedHours}h</span>
                          {task.location && <span><strong>Location:</strong> {task.location}</span>}
                          {task.completedHours && (
                            <span><strong>Completed:</strong> {task.completedHours}h</span>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {task.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t">
                      <div className="text-xs text-muted-foreground">
                        Task ID: {task.id} • Priority: {task.priority}
                      </div>
                      <div className="flex gap-2">
                        {task.status === "pending" && (
                          <Button size="sm" className="text-xs">
                            Start Task
                          </Button>
                        )}
                        {task.status === "in-progress" && (
                          <>
                            <Button variant="outline" size="sm" className="text-xs">
                              Update Progress
                            </Button>
                            <Button size="sm" className="text-xs">
                              Mark Complete
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm" className="text-xs">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          Priority
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

export default MyTasks;