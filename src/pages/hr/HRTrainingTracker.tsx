import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Calendar,
  Award,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Plus
} from 'lucide-react';

interface TrainingRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  trainingTitle: string;
  trainingType: 'mandatory' | 'optional' | 'certification';
  status: 'completed' | 'in-progress' | 'overdue' | 'not-started';
  dueDate: string;
  completionDate?: string;
  score?: number;
  certificateId?: string;
  provider: string;
  duration: string;
}

const HRTrainingTracker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const trainingRecords: TrainingRecord[] = [
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      department: 'Engineering',
      trainingTitle: 'Safety Protocols and Emergency Procedures',
      trainingType: 'mandatory',
      status: 'completed',
      dueDate: '2024-01-10',
      completionDate: '2024-01-08',
      score: 95,
      certificateId: 'CERT-SP-001',
      provider: 'SafetyFirst Training',
      duration: '4 hours'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'Jane Smith',
      department: 'Operations',
      trainingTitle: 'Diversity and Inclusion Workshop',
      trainingType: 'mandatory',
      status: 'overdue',
      dueDate: '2024-01-05',
      provider: 'EqualityWorks',
      duration: '2 hours'
    },
    {
      id: '3',
      employeeId: 'EMP003',
      employeeName: 'Mike Johnson',
      department: 'Finance',
      trainingTitle: 'Project Management Certification',
      trainingType: 'certification',
      status: 'in-progress',
      dueDate: '2024-02-15',
      provider: 'PM Institute',
      duration: '40 hours'
    },
    {
      id: '4',
      employeeId: 'EMP004',
      employeeName: 'Sarah Wilson',
      department: 'HR',
      trainingTitle: 'Leadership Development Program',
      trainingType: 'optional',
      status: 'completed',
      dueDate: '2024-01-20',
      completionDate: '2024-01-18',
      score: 88,
      certificateId: 'CERT-LD-004',
      provider: 'Leadership Academy',
      duration: '8 hours'
    },
    {
      id: '5',
      employeeId: 'EMP005',
      employeeName: 'David Chen',
      department: 'IT',
      trainingTitle: 'Cybersecurity Awareness Training',
      trainingType: 'mandatory',
      status: 'not-started',
      dueDate: '2024-01-30',
      provider: 'CyberSafe',
      duration: '3 hours'
    },
    {
      id: '6',
      employeeId: 'EMP006',
      employeeName: 'Lisa Rodriguez',
      department: 'Marketing',
      trainingTitle: 'Digital Marketing Advanced Course',
      trainingType: 'optional',
      status: 'in-progress',
      dueDate: '2024-03-01',
      provider: 'Marketing Pro',
      duration: '20 hours'
    }
  ];

  const getStatusIcon = (status: TrainingRecord['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'overdue': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'not-started': return <AlertCircle className="h-4 w-4 text-gray-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: TrainingRecord['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'not-started': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: TrainingRecord['trainingType']) => {
    switch (type) {
      case 'mandatory': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'certification': return <Award className="h-4 w-4 text-purple-600" />;
      case 'optional': return <BookOpen className="h-4 w-4 text-blue-600" />;
      default: return <BookOpen className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredRecords = trainingRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.trainingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesType = typeFilter === 'all' || record.trainingType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const completed = trainingRecords.filter(record => record.status === 'completed').length;
  const inProgress = trainingRecords.filter(record => record.status === 'in-progress').length;
  const overdue = trainingRecords.filter(record => record.status === 'overdue').length;
  const notStarted = trainingRecords.filter(record => record.status === 'not-started').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Training Tracker</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Monitor employee training progress and compliance</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Training
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-xl lg:text-2xl font-bold text-blue-600">{inProgress}</p>
              </div>
              <Clock className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
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
                <p className="text-xs lg:text-sm font-medium text-gray-600">Not Started</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-600">{notStarted}</p>
              </div>
              <AlertCircle className="h-6 w-6 lg:h-8 lg:w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by employee, training, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="mandatory">Mandatory</SelectItem>
                <SelectItem value="optional">Optional</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Training Records */}
      <Card>
        <CardHeader>
          <CardTitle>Training Records ({filteredRecords.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div key={record.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{record.employeeName}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">({record.employeeId})</span>
                        <Badge variant="outline" className="text-xs">
                          {record.department}
                        </Badge>
                      </div>
                    </div>
                    <h4 className="font-medium text-gray-800 mb-2">{record.trainingTitle}</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        {getTypeIcon(record.trainingType)}
                        <span className="capitalize">{record.trainingType}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{record.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {new Date(record.dueDate).toLocaleDateString()}</span>
                      </div>
                      <span>{record.provider}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <Badge variant="outline" className={getStatusColor(record.status)}>
                        {getStatusIcon(record.status)}
                        <span className="ml-1 capitalize">{record.status.replace('-', ' ')}</span>
                      </Badge>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        {record.score && (
                          <div className="flex items-center gap-1 text-sm">
                            <Award className="h-4 w-4 text-yellow-600" />
                            <span className="font-medium">Score: {record.score}%</span>
                          </div>
                        )}
                        {record.certificateId && (
                          <div className="flex items-center gap-1 text-sm">
                            <Award className="h-4 w-4 text-purple-600" />
                            <span>Cert: {record.certificateId}</span>
                          </div>
                        )}
                        {record.completionDate && (
                          <div className="flex items-center gap-1 text-sm text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span>Completed: {new Date(record.completionDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      View Details
                    </Button>
                    {record.status === 'not-started' && (
                      <Button size="sm" className="w-full sm:w-auto">
                        Start Training
                      </Button>
                    )}
                    {record.status === 'completed' && record.certificateId && (
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <Download className="h-4 w-4 mr-1" />
                        Certificate
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
  );
};

export default HRTrainingTracker;