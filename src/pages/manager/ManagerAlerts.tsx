import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ShieldAlert, Info, CheckCircle, Clock, Filter } from "lucide-react";

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: "critical" | "warning" | "info";
  status: "active" | "acknowledged" | "resolved";
  category: "safety" | "operational" | "maintenance" | "security" | "compliance";
  location?: string;
  timestamp: string;
  source: string;
  actionRequired: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: "ALT001",
    title: "Passenger Flow Congestion Alert",
    message: "High passenger volume detected at Aluva Station Platform 1. Consider crowd control measures.",
    severity: "warning",
    status: "active",
    category: "operational",
    location: "Aluva Station - Platform 1",
    timestamp: "2025-09-17 09:15",
    source: "Crowd Monitoring System",
    actionRequired: true
  },
  {
    id: "ALT002",
    title: "Escalator Maintenance Required",
    message: "Escalator EC-03 at Edapally Station showing irregular operation patterns. Schedule immediate inspection.",
    severity: "critical",
    status: "active",
    category: "maintenance",
    location: "Edapally Station - Main Entrance",
    timestamp: "2025-09-17 08:45",
    source: "Maintenance Monitoring",
    actionRequired: true
  },
  {
    id: "ALT003",
    title: "Security Badge Access Anomaly",
    message: "Unusual access pattern detected in restricted area. Security team notified.",
    severity: "warning",
    status: "acknowledged",
    category: "security",
    location: "Kakkanad Station - Control Room",
    timestamp: "2025-09-17 08:30",
    source: "Access Control System",
    actionRequired: false
  },
  {
    id: "ALT004",
    title: "Air Quality Reading Normal",
    message: "Underground air quality systems operating within normal parameters.",
    severity: "info",
    status: "resolved",
    category: "safety",
    location: "All Underground Stations",
    timestamp: "2025-09-17 07:00",
    source: "Environmental Monitoring",
    actionRequired: false
  },
  {
    id: "ALT005",
    title: "Compliance Documentation Due",
    message: "Monthly safety compliance report due in 3 days. Ensure all documentation is current.",
    severity: "warning",
    status: "active",
    category: "compliance",
    timestamp: "2025-09-17 06:00",
    source: "Compliance System",
    actionRequired: true
  }
];

const ManagerAlerts = () => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return <ShieldAlert className="h-4 w-4 text-red-500" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "info": return <Info className="h-4 w-4 text-blue-500" />;
      default: return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-700 bg-red-50 border-red-200";
      case "warning": return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "info": return "text-blue-700 bg-blue-50 border-blue-200";
      default: return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Clock className="h-4 w-4 text-orange-500" />;
      case "acknowledged": return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "resolved": return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const activeAlerts = mockAlerts.filter(alert => alert.status === "active");
  const criticalAlerts = mockAlerts.filter(alert => alert.severity === "critical");
  const actionRequiredAlerts = mockAlerts.filter(alert => alert.actionRequired);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            Real-Time Alerts
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Real-time monitoring and alert management system
          </p>
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-lg md:text-xl font-bold text-orange-600">{activeAlerts.length}</p>
              </div>
              <div className="p-1 md:p-2 bg-orange-100 rounded text-orange-600">
                <Clock className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Critical</p>
                <p className="text-lg md:text-xl font-bold text-red-600">{criticalAlerts.length}</p>
              </div>
              <div className="p-1 md:p-2 bg-red-100 rounded text-red-600">
                <ShieldAlert className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Action Required</p>
                <p className="text-lg md:text-xl font-bold text-blue-600">{actionRequiredAlerts.length}</p>
              </div>
              <div className="p-1 md:p-2 bg-blue-100 rounded text-blue-600">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Total Alerts</p>
                <p className="text-lg md:text-xl font-bold">{mockAlerts.length}</p>
              </div>
              <div className="p-1 md:p-2 bg-gray-100 rounded text-gray-600">
                <Info className="h-4 w-4" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filter Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Alert Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">All Alerts</Button>
              <Button variant="outline" size="sm">Active Only</Button>
              <Button variant="outline" size="sm">Critical</Button>
              <Button variant="outline" size="sm">Action Required</Button>
              <Button variant="outline" size="sm">Safety</Button>
              <Button variant="outline" size="sm">Operational</Button>
              <Button variant="outline" size="sm">Maintenance</Button>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Current Alerts
            </CardTitle>
            <CardDescription>
              Real-time alerts from all systems and departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white/50 rounded">
                        {getSeverityIcon(alert.severity)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-semibold text-base">{alert.title}</h3>
                          <Badge variant={alert.severity === "critical" ? "destructive" : "secondary"} className="text-xs">
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(alert.status)}
                            <span className="text-xs font-medium">{alert.status.toUpperCase()}</span>
                          </div>
                          {alert.actionRequired && (
                            <Badge variant="destructive" className="text-xs">ACTION REQUIRED</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <span><strong>Category:</strong> {alert.category}</span>
                          <span><strong>Source:</strong> {alert.source}</span>
                          {alert.location && <span><strong>Location:</strong> {alert.location}</span>}
                          <span><strong>Time:</strong> {alert.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t">
                      <div className="text-xs text-muted-foreground">
                        Alert ID: {alert.id} • Last updated: {alert.timestamp}
                      </div>
                      <div className="flex gap-2">
                        {alert.status === "active" && (
                          <Button variant="outline" size="sm" className="text-xs">
                            Acknowledge
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="text-xs">
                          View Details
                        </Button>
                        {alert.actionRequired && (
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
      </div>
    </DashboardLayout>
  );
};

export default ManagerAlerts;