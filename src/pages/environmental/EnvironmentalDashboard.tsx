import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Leaf, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Droplets,
  Zap,
  Trash2,
  Wind,
  Calendar,
  BarChart3,
  Target,
  Award
} from 'lucide-react';

const EnvironmentalDashboard: React.FC = () => {
  const environmentalMetrics = {
    carbonFootprint: { current: 1250, target: 1000, unit: 'tCO2e', change: -8.5 },
    waterUsage: { current: 15420, target: 14000, unit: 'gallons', change: -12.3 },
    energyConsumption: { current: 85600, target: 80000, unit: 'kWh', change: -6.2 },
    wasteGeneration: { current: 2340, target: 2000, unit: 'kg', change: -15.7 },
    recyclingRate: { current: 78, target: 85, unit: '%', change: 5.2 },
    renewableEnergy: { current: 45, target: 60, unit: '%', change: 8.9 }
  };

  const complianceStatus = [
    { regulation: 'EPA Air Quality Standards', status: 'compliant', lastAudit: '2024-01-10', nextReview: '2024-04-10' },
    { regulation: 'Water Discharge Permits', status: 'compliant', lastAudit: '2024-01-05', nextReview: '2024-07-05' },
    { regulation: 'Waste Management Compliance', status: 'warning', lastAudit: '2023-12-15', nextReview: '2024-03-15' },
    { regulation: 'Environmental Impact Assessment', status: 'compliant', lastAudit: '2023-11-20', nextReview: '2024-11-20' },
    { regulation: 'Chemical Storage Regulations', status: 'compliant', lastAudit: '2024-01-08', nextReview: '2024-06-08' }
  ];

  const recentActivities = [
    { id: 1, type: 'monitoring', title: 'Water Quality Test Completed', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'compliance', title: 'EPA Inspection Scheduled', date: '2024-01-20', status: 'upcoming' },
    { id: 3, type: 'improvement', title: 'Solar Panel Installation Phase 2', date: '2024-01-12', status: 'in-progress' },
    { id: 4, type: 'audit', title: 'Monthly Environmental Audit', date: '2024-01-10', status: 'completed' },
    { id: 5, type: 'training', title: 'Environmental Safety Training', date: '2024-01-18', status: 'upcoming' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'monitoring': return <BarChart3 className="h-4 w-4 text-blue-600" />;
      case 'compliance': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'improvement': return <Target className="h-4 w-4 text-green-600" />;
      case 'audit': return <Award className="h-4 w-4 text-purple-600" />;
      case 'training': return <Leaf className="h-4 w-4 text-green-600" />;
      default: return <Leaf className="h-4 w-4 text-gray-600" />;
    }
  };

  const isOnTarget = (current: number, target: number, unit: string) => {
    if (unit === '%') {
      return current >= target;
    }
    return current <= target;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Environmental Dashboard</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Monitor environmental performance and compliance</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button className="w-full sm:w-auto">
            <Leaf className="h-4 w-4 mr-2" />
            New Initiative
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs lg:text-sm font-medium text-gray-600">Carbon Footprint</p>
                <p className="text-lg lg:text-2xl font-bold truncate">{environmentalMetrics.carbonFootprint.current.toLocaleString()}</p>
                <p className="text-xs lg:text-sm text-gray-500 truncate">{environmentalMetrics.carbonFootprint.unit} / Target: {environmentalMetrics.carbonFootprint.target.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="h-3 w-3 lg:h-4 lg:w-4 text-green-600 mr-1" />
                  <span className="text-xs lg:text-sm text-green-600">{Math.abs(environmentalMetrics.carbonFootprint.change)}% reduction</span>
                </div>
              </div>
              <div className="h-10 w-10 lg:h-12 lg:w-12 bg-green-100 rounded-full flex items-center justify-center ml-2">
                <Leaf className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs lg:text-sm font-medium text-gray-600">Water Usage</p>
                <p className="text-lg lg:text-2xl font-bold truncate">{environmentalMetrics.waterUsage.current.toLocaleString()}</p>
                <p className="text-xs lg:text-sm text-gray-500 truncate">{environmentalMetrics.waterUsage.unit} / Target: {environmentalMetrics.waterUsage.target.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="h-3 w-3 lg:h-4 lg:w-4 text-green-600 mr-1" />
                  <span className="text-xs lg:text-sm text-green-600">{Math.abs(environmentalMetrics.waterUsage.change)}% reduction</span>
                </div>
              </div>
              <div className="h-10 w-10 lg:h-12 lg:w-12 bg-blue-100 rounded-full flex items-center justify-center ml-2">
                <Droplets className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs lg:text-sm font-medium text-gray-600">Energy Consumption</p>
                <p className="text-lg lg:text-2xl font-bold truncate">{environmentalMetrics.energyConsumption.current.toLocaleString()}</p>
                <p className="text-xs lg:text-sm text-gray-500 truncate">{environmentalMetrics.energyConsumption.unit} / Target: {environmentalMetrics.energyConsumption.target.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="h-3 w-3 lg:h-4 lg:w-4 text-green-600 mr-1" />
                  <span className="text-xs lg:text-sm text-green-600">{Math.abs(environmentalMetrics.energyConsumption.change)}% reduction</span>
                </div>
              </div>
              <div className="h-10 w-10 lg:h-12 lg:w-12 bg-yellow-100 rounded-full flex items-center justify-center ml-2">
                <Zap className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs lg:text-sm font-medium text-gray-600">Waste Generation</p>
                <p className="text-lg lg:text-2xl font-bold truncate">{environmentalMetrics.wasteGeneration.current.toLocaleString()}</p>
                <p className="text-xs lg:text-sm text-gray-500 truncate">{environmentalMetrics.wasteGeneration.unit} / Target: {environmentalMetrics.wasteGeneration.target.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="h-3 w-3 lg:h-4 lg:w-4 text-green-600 mr-1" />
                  <span className="text-xs lg:text-sm text-green-600">{Math.abs(environmentalMetrics.wasteGeneration.change)}% reduction</span>
                </div>
              </div>
              <div className="h-10 w-10 lg:h-12 lg:w-12 bg-red-100 rounded-full flex items-center justify-center ml-2">
                <Trash2 className="h-5 w-5 lg:h-6 lg:w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs lg:text-sm font-medium text-gray-600">Recycling Rate</p>
                <p className="text-lg lg:text-2xl font-bold">{environmentalMetrics.recyclingRate.current}%</p>
                <p className="text-xs lg:text-sm text-gray-500">Target: {environmentalMetrics.recyclingRate.target}%</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-green-600 mr-1" />
                  <span className="text-xs lg:text-sm text-green-600">{environmentalMetrics.recyclingRate.change}% increase</span>
                </div>
              </div>
              <div className="h-10 w-10 lg:h-12 lg:w-12 bg-green-100 rounded-full flex items-center justify-center ml-2">
                <Trash2 className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs lg:text-sm font-medium text-gray-600">Renewable Energy</p>
                <p className="text-lg lg:text-2xl font-bold">{environmentalMetrics.renewableEnergy.current}%</p>
                <p className="text-xs lg:text-sm text-gray-500">Target: {environmentalMetrics.renewableEnergy.target}%</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-green-600 mr-1" />
                  <span className="text-xs lg:text-sm text-green-600">{environmentalMetrics.renewableEnergy.change}% increase</span>
                </div>
              </div>
              <div className="h-10 w-10 lg:h-12 lg:w-12 bg-yellow-100 rounded-full flex items-center justify-center ml-2">
                <Wind className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceStatus.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm lg:text-base">{item.regulation}</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-xs lg:text-sm text-gray-500">
                      <span>Last Audit: {new Date(item.lastAudit).toLocaleDateString()}</span>
                      <span>Next Review: {new Date(item.nextReview).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${getStatusColor(item.status)} self-start sm:self-auto text-xs`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="mt-1 flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm lg:text-base truncate">{activity.title}</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                      <span className="text-xs lg:text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</span>
                      <Badge variant="outline" className={
                        activity.status === 'completed' ? 'bg-green-100 text-green-800 text-xs self-start' :
                        activity.status === 'in-progress' ? 'bg-blue-100 text-blue-800 text-xs self-start' :
                        'bg-yellow-100 text-yellow-800 text-xs self-start'
                      }>
                        {activity.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </DashboardLayout>
  );
};

export default EnvironmentalDashboard;