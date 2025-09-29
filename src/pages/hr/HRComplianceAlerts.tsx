import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Clock, 
  Users, 
  Calendar,
  ShieldAlert,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  status: 'overdue' | 'due-soon' | 'on-track' | 'completed';
  category: 'labor-law' | 'safety' | 'training' | 'documentation' | 'payroll';
  assignedTo: string;
  daysRemaining: number;
}

const HRComplianceAlerts: React.FC = () => {
  const complianceItems: ComplianceItem[] = [
    {
      id: '1',
      title: 'Annual Safety Training Update',
      description: 'Update safety protocols and training materials for all employees',
      priority: 'high',
      deadline: '2024-01-15',
      status: 'overdue',
      category: 'safety',
      assignedTo: 'Sarah Johnson',
      daysRemaining: -5
    },
    {
      id: '2',
      title: 'Labor Law Compliance Review',
      description: 'Review and update employee handbook for new labor regulations',
      priority: 'high',
      deadline: '2024-01-25',
      status: 'due-soon',
      category: 'labor-law',
      assignedTo: 'Mike Chen',
      daysRemaining: 10
    },
    {
      id: '3',
      title: 'Quarterly Payroll Audit',
      description: 'Conduct comprehensive payroll compliance audit',
      priority: 'medium',
      deadline: '2024-02-01',
      status: 'on-track',
      category: 'payroll',
      assignedTo: 'Lisa Rodriguez',
      daysRemaining: 17
    },
    {
      id: '4',
      title: 'Employee Records Update',
      description: 'Update employee documentation and verify compliance',
      priority: 'medium',
      deadline: '2024-02-10',
      status: 'on-track',
      category: 'documentation',
      assignedTo: 'David Kim',
      daysRemaining: 26
    },
    {
      id: '5',
      title: 'Diversity Training Completion',
      description: 'Ensure all managers complete mandatory diversity training',
      priority: 'low',
      deadline: '2024-02-28',
      status: 'on-track',
      category: 'training',
      assignedTo: 'Anna Patel',
      daysRemaining: 44
    },
    {
      id: '6',
      title: 'Previous Quarter Training Records',
      description: 'Completed training compliance documentation',
      priority: 'low',
      deadline: '2023-12-31',
      status: 'completed',
      category: 'training',
      assignedTo: 'Sarah Johnson',
      daysRemaining: 0
    }
  ];

  const getStatusIcon = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'overdue': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'due-soon': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'on-track': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'due-soon': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'on-track': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: ComplianceItem['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: ComplianceItem['category']) => {
    switch (category) {
      case 'safety': return <ShieldAlert className="h-4 w-4" />;
      case 'training': return <Users className="h-4 w-4" />;
      case 'labor-law': return <AlertTriangle className="h-4 w-4" />;
      case 'payroll': return <Calendar className="h-4 w-4" />;
      case 'documentation': return <Clock className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const overdue = complianceItems.filter(item => item.status === 'overdue').length;
  const dueSoon = complianceItems.filter(item => item.status === 'due-soon').length;
  const onTrack = complianceItems.filter(item => item.status === 'on-track').length;
  const completed = complianceItems.filter(item => item.status === 'completed').length;

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">HR Compliance Alerts</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Monitor and manage HR compliance requirements</p>
        </div>
        <Button className="w-full sm:w-auto">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Add Alert
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-xl lg:text-2xl font-bold text-red-600">{overdue}</p>
              </div>
              <XCircle className="h-6 w-6 lg:h-8 lg:w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Due Soon</p>
                <p className="text-xl lg:text-2xl font-bold text-orange-600">{dueSoon}</p>
              </div>
              <AlertCircle className="h-6 w-6 lg:h-8 lg:w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">On Track</p>
                <p className="text-xl lg:text-2xl font-bold text-blue-600">{onTrack}</p>
              </div>
              <Clock className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Completed</p>
                <p className="text-xl lg:text-2xl font-bold text-green-600">{completed}</p>
              </div>
              <CheckCircle className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Items */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(item.priority)}`} />
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      </div>
                      <Badge variant="outline" className={getStatusColor(item.status)}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1 capitalize">{item.status.replace('-', ' ')}</span>
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3 text-sm sm:text-base">{item.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(item.category)}
                          <span className="capitalize">{item.category.replace('-', ' ')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {new Date(item.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{item.assignedTo}</span>
                        </div>
                        {item.status !== 'completed' && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              {item.daysRemaining > 0 
                                ? `${item.daysRemaining} days left`
                                : `${Math.abs(item.daysRemaining)} days overdue`
                              }
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      View Details
                    </Button>
                    {item.status !== 'completed' && (
                      <Button size="sm" className="w-full sm:w-auto">
                        Mark Complete
                      </Button>
                    )}
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

export default HRComplianceAlerts;