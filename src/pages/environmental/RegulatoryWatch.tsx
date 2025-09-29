import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertTriangle, 
  Calendar, 
  Search,
  Filter,
  ExternalLink,
  Bell,
  Clock,
  TrendingUp,
  Gavel,
  Globe,
  FileText,
  Eye,
  Bookmark
} from 'lucide-react';

interface RegulatoryUpdate {
  id: string;
  title: string;
  type: 'new-regulation' | 'amendment' | 'guidance' | 'consultation' | 'deadline';
  category: 'air-quality' | 'water-management' | 'waste-disposal' | 'emissions' | 'safety' | 'general';
  priority: 'high' | 'medium' | 'low';
  source: string;
  publishDate: string;
  effectiveDate?: string;
  deadlineDate?: string;
  summary: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  status: 'new' | 'reviewed' | 'action-required' | 'compliant';
  region: 'federal' | 'state' | 'local' | 'international';
  url?: string;
  tags: string[];
}

const RegulatoryWatch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const regulatoryUpdates: RegulatoryUpdate[] = [
    {
      id: '1',
      title: 'New EPA Carbon Emission Standards for Industrial Facilities',
      type: 'new-regulation',
      category: 'emissions',
      priority: 'high',
      source: 'Environmental Protection Agency',
      publishDate: '2024-01-10',
      effectiveDate: '2024-07-01',
      summary: 'New carbon emission limits for industrial facilities over 100,000 sq ft',
      description: 'The EPA has issued new carbon emission standards that will require industrial facilities to reduce emissions by 25% by 2025. This includes mandatory monitoring and reporting requirements.',
      impact: 'high',
      status: 'action-required',
      region: 'federal',
      url: 'https://epa.gov/carbon-standards-2024',
      tags: ['carbon-emissions', 'monitoring', 'industrial', 'compliance']
    },
    {
      id: '2',
      title: 'Updated Water Discharge Permit Requirements',
      type: 'amendment',
      category: 'water-management',
      priority: 'medium',
      source: 'State Water Resources Control Board',
      publishDate: '2024-01-08',
      effectiveDate: '2024-04-01',
      summary: 'Changes to water discharge permit application and renewal processes',
      description: 'Updated requirements for water discharge permits including additional water quality testing parameters and extended renewal periods.',
      impact: 'medium',
      status: 'reviewed',
      region: 'state',
      url: 'https://waterboards.ca.gov/permits-2024',
      tags: ['water-discharge', 'permits', 'testing', 'renewal']
    },
    {
      id: '3',
      title: 'Consultation on Waste Classification Guidelines',
      type: 'consultation',
      category: 'waste-disposal',
      priority: 'medium',
      source: 'Department of Environmental Protection',
      publishDate: '2024-01-05',
      deadlineDate: '2024-02-15',
      summary: 'Public consultation on proposed changes to hazardous waste classification',
      description: 'DEP is seeking public input on proposed changes to hazardous waste classification that could affect disposal methods and costs.',
      impact: 'medium',
      status: 'new',
      region: 'state',
      url: 'https://dep.state.gov/waste-consultation',
      tags: ['hazardous-waste', 'classification', 'consultation', 'public-input']
    },
    {
      id: '4',
      title: 'Annual Environmental Compliance Report Due',
      type: 'deadline',
      category: 'general',
      priority: 'high',
      source: 'Environmental Compliance Authority',
      publishDate: '2023-12-15',
      deadlineDate: '2024-03-31',
      summary: 'Annual compliance report submission deadline approaching',
      description: 'All facilities must submit their annual environmental compliance reports by March 31, 2024. Late submissions may result in penalties.',
      impact: 'high',
      status: 'action-required',
      region: 'federal',
      tags: ['annual-report', 'compliance', 'deadline', 'submission']
    },
    {
      id: '5',
      title: 'New Safety Data Sheet Requirements for Chemical Storage',
      type: 'guidance',
      category: 'safety',
      priority: 'medium',
      source: 'Occupational Safety and Health Administration',
      publishDate: '2024-01-12',
      effectiveDate: '2024-06-01',
      summary: 'Updated SDS requirements for chemical storage and handling',
      description: 'OSHA has issued new guidance on Safety Data Sheet requirements for chemical storage facilities, including enhanced labeling and documentation standards.',
      impact: 'medium',
      status: 'reviewed',
      region: 'federal',
      url: 'https://osha.gov/sds-guidance-2024',
      tags: ['safety-data-sheet', 'chemical-storage', 'labeling', 'documentation']
    },
    {
      id: '6',
      title: 'International Climate Accord Implementation Deadline',
      type: 'deadline',
      category: 'emissions',
      priority: 'high',
      source: 'International Climate Council',
      publishDate: '2023-11-20',
      deadlineDate: '2024-12-31',
      summary: 'Implementation deadline for international climate accord commitments',
      description: 'Companies must implement carbon reduction measures as per international climate accord commitments by end of 2024.',
      impact: 'high',
      status: 'action-required',
      region: 'international',
      tags: ['climate-accord', 'carbon-reduction', 'international', 'implementation']
    },
    {
      id: '7',
      title: 'Local Air Quality Monitoring Standards Update',
      type: 'amendment',
      category: 'air-quality',
      priority: 'low',
      source: 'Municipal Environmental Office',
      publishDate: '2024-01-03',
      effectiveDate: '2024-05-01',
      summary: 'Minor updates to local air quality monitoring requirements',
      description: 'Local environmental office has updated air quality monitoring standards with minor adjustments to sampling frequency and reporting formats.',
      impact: 'low',
      status: 'compliant',
      region: 'local',
      tags: ['air-quality', 'monitoring', 'local', 'sampling']
    }
  ];

  const getTypeIcon = (type: RegulatoryUpdate['type']) => {
    switch (type) {
      case 'new-regulation': return <Gavel className="h-4 w-4 text-red-600" />;
      case 'amendment': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'guidance': return <Globe className="h-4 w-4 text-green-600" />;
      case 'consultation': return <Eye className="h-4 w-4 text-purple-600" />;
      case 'deadline': return <Clock className="h-4 w-4 text-orange-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: RegulatoryUpdate['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: RegulatoryUpdate['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'reviewed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'action-required': return 'bg-red-100 text-red-800 border-red-200';
      case 'compliant': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImpactColor = (impact: RegulatoryUpdate['impact']) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getRegionIcon = (region: RegulatoryUpdate['region']) => {
    switch (region) {
      case 'federal': return '🏛️';
      case 'state': return '🏢';
      case 'local': return '🏘️';
      case 'international': return '🌍';
      default: return '📍';
    }
  };

  const filteredUpdates = regulatoryUpdates.filter(update => {
    const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || update.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || update.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || update.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || update.category === categoryFilter;
    
    return matchesSearch && matchesType && matchesPriority && matchesStatus && matchesCategory;
  });

  const newCount = regulatoryUpdates.filter(update => update.status === 'new').length;
  const actionRequiredCount = regulatoryUpdates.filter(update => update.status === 'action-required').length;
  const reviewedCount = regulatoryUpdates.filter(update => update.status === 'reviewed').length;
  const compliantCount = regulatoryUpdates.filter(update => update.status === 'compliant').length;

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6 overflow-x-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Regulatory Watch</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Stay updated with environmental regulations and compliance requirements</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Bell className="h-4 w-4 mr-2" />
            Set Alerts
          </Button>
          <Button className="w-full sm:w-auto">
            <Bookmark className="h-4 w-4 mr-2" />
            Subscribe to Updates
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">New Updates</p>
                <p className="text-xl lg:text-2xl font-bold text-blue-600">{newCount}</p>
              </div>
              <Bell className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Action Required</p>
                <p className="text-xl lg:text-2xl font-bold text-red-600">{actionRequiredCount}</p>
              </div>
              <AlertTriangle className="h-6 w-6 lg:h-8 lg:w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Reviewed</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-600">{reviewedCount}</p>
              </div>
              <Eye className="h-6 w-6 lg:h-8 lg:w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Compliant</p>
                <p className="text-xl lg:text-2xl font-bold text-green-600">{compliantCount}</p>
              </div>
              <TrendingUp className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
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
                  placeholder="Search regulations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="new-regulation">New Regulation</SelectItem>
                <SelectItem value="amendment">Amendment</SelectItem>
                <SelectItem value="guidance">Guidance</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
              </SelectContent>
            </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="action-required">Action Required</SelectItem>
                  <SelectItem value="compliant">Compliant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regulatory Updates */}
      <Card>
        <CardHeader>
          <CardTitle>Regulatory Updates ({filteredUpdates.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUpdates.map((update) => (
              <div key={update.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(update.priority)}`} />
                        <h3 className="font-semibold text-gray-900 text-sm lg:text-base break-words">{update.title}</h3>
                      </div>
                      <Badge variant="outline" className={`${getStatusColor(update.status)} text-xs self-start sm:self-auto`}>
                        {update.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3 text-sm lg:text-base break-words">{update.summary}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        {getTypeIcon(update.type)}
                        <span className="capitalize">{update.type.replace('-', ' ')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{getRegionIcon(update.region)}</span>
                        <span className="capitalize">{update.region}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Published: {new Date(update.publishDate).toLocaleDateString()}</span>
                      </div>
                      <div className={`flex items-center gap-1 ${getImpactColor(update.impact)}`}>
                        <TrendingUp className="h-4 w-4" />
                        <span className="capitalize">Impact: {update.impact}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div>
                        <span className="font-medium">Source:</span> {update.source}
                      </div>
                      {update.effectiveDate && (
                        <div>
                          <span className="font-medium">Effective:</span> {new Date(update.effectiveDate).toLocaleDateString()}
                        </div>
                      )}
                      {update.deadlineDate && (
                        <div className="text-orange-600">
                          <span className="font-medium">Deadline:</span> {new Date(update.deadlineDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {update.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700">{update.description}</p>
                  </div>
                  <div className="flex gap-2">
                    {update.url && (
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Source
                      </Button>
                    )}
                    <Button size="sm">
                      Track Update
                    </Button>
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

export default RegulatoryWatch;