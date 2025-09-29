import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Calendar, 
  Download, 
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Leaf,
  Shield,
  Eye,
  Upload
} from 'lucide-react';

interface ComplianceDocument {
  id: string;
  title: string;
  type: 'permit' | 'certificate' | 'report' | 'assessment' | 'policy' | 'audit';
  category: 'air-quality' | 'water-management' | 'waste-disposal' | 'emissions' | 'safety' | 'general';
  issueDate: string;
  expiryDate?: string;
  status: 'active' | 'expiring-soon' | 'expired' | 'pending-renewal';
  authority: string;
  documentNumber: string;
  description: string;
  fileSize: string;
  lastUpdated: string;
  complianceLevel: 'high' | 'medium' | 'low';
}

const EnvironmentalComplianceDocs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const documents: ComplianceDocument[] = [
    {
      id: '1',
      title: 'Air Quality Monitoring Permit',
      type: 'permit',
      category: 'air-quality',
      issueDate: '2023-01-15',
      expiryDate: '2024-01-15',
      status: 'expiring-soon',
      authority: 'Environmental Protection Agency',
      documentNumber: 'EPA-AQ-2023-001',
      description: 'Annual permit for air quality monitoring and emissions reporting',
      fileSize: '2.3 MB',
      lastUpdated: '2023-12-01',
      complianceLevel: 'high'
    },
    {
      id: '2',
      title: 'Water Discharge Certificate',
      type: 'certificate',
      category: 'water-management',
      issueDate: '2023-06-10',
      expiryDate: '2025-06-10',
      status: 'active',
      authority: 'State Water Resources Board',
      documentNumber: 'SWRB-WD-2023-045',
      description: 'Certificate for treated water discharge into municipal system',
      fileSize: '1.8 MB',
      lastUpdated: '2023-06-10',
      complianceLevel: 'high'
    },
    {
      id: '3',
      title: 'Hazardous Waste Management Report',
      type: 'report',
      category: 'waste-disposal',
      issueDate: '2023-12-01',
      expiryDate: '2024-12-01',
      status: 'active',
      authority: 'Department of Environmental Services',
      documentNumber: 'DES-HWM-2023-089',
      description: 'Annual report on hazardous waste generation and disposal methods',
      fileSize: '4.2 MB',
      lastUpdated: '2023-12-01',
      complianceLevel: 'high'
    },
    {
      id: '4',
      title: 'Environmental Impact Assessment',
      type: 'assessment',
      category: 'general',
      issueDate: '2023-03-22',
      expiryDate: '2026-03-22',
      status: 'active',
      authority: 'Environmental Assessment Board',
      documentNumber: 'EAB-EIA-2023-012',
      description: 'Comprehensive environmental impact assessment for facility operations',
      fileSize: '15.7 MB',
      lastUpdated: '2023-03-22',
      complianceLevel: 'high'
    },
    {
      id: '5',
      title: 'Carbon Emissions Reporting',
      type: 'report',
      category: 'emissions',
      issueDate: '2024-01-05',
      status: 'active',
      authority: 'Climate Change Authority',
      documentNumber: 'CCA-CER-2024-003',
      description: 'Quarterly carbon emissions and reduction measures report',
      fileSize: '3.1 MB',
      lastUpdated: '2024-01-05',
      complianceLevel: 'medium'
    },
    {
      id: '6',
      title: 'Safety Data Sheet Compliance Audit',
      type: 'audit',
      category: 'safety',
      issueDate: '2023-11-15',
      expiryDate: '2024-11-15',
      status: 'active',
      authority: 'Occupational Safety Administration',
      documentNumber: 'OSA-SDS-2023-067',
      description: 'Audit report for chemical safety data sheet compliance',
      fileSize: '2.9 MB',
      lastUpdated: '2023-11-15',
      complianceLevel: 'medium'
    },
    {
      id: '7',
      title: 'Waste Water Treatment License',
      type: 'permit',
      category: 'water-management',
      issueDate: '2022-08-30',
      expiryDate: '2023-08-30',
      status: 'expired',
      authority: 'Municipal Water Authority',
      documentNumber: 'MWA-WWT-2022-023',
      description: 'License for on-site waste water treatment facility operation',
      fileSize: '1.5 MB',
      lastUpdated: '2022-08-30',
      complianceLevel: 'high'
    }
  ];

  const getStatusIcon = (status: ComplianceDocument['status']) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'expiring-soon': return <Clock className="h-4 w-4 text-orange-600" />;
      case 'expired': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'pending-renewal': return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: ComplianceDocument['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'expiring-soon': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending-renewal': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: ComplianceDocument['type']) => {
    switch (type) {
      case 'permit': return <Shield className="h-4 w-4 text-blue-600" />;
      case 'certificate': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'report': return <FileText className="h-4 w-4 text-purple-600" />;
      case 'assessment': return <Eye className="h-4 w-4 text-orange-600" />;
      case 'policy': return <Leaf className="h-4 w-4 text-green-600" />;
      case 'audit': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getComplianceLevelColor = (level: ComplianceDocument['complianceLevel']) => {
    switch (level) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.authority.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  const activeCount = documents.filter(doc => doc.status === 'active').length;
  const expiringSoonCount = documents.filter(doc => doc.status === 'expiring-soon').length;
  const expiredCount = documents.filter(doc => doc.status === 'expired').length;
  const pendingCount = documents.filter(doc => doc.status === 'pending-renewal').length;

  return (
    <DashboardLayout>
      <div className="space-y-6 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Environmental Compliance Documents</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Manage environmental permits, certificates, and compliance documentation</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export List
          </Button>
          <Button className="w-full sm:w-auto">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Active</p>
                <p className="text-xl lg:text-2xl font-bold text-green-600">{activeCount}</p>
              </div>
              <CheckCircle className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-xl lg:text-2xl font-bold text-orange-600">{expiringSoonCount}</p>
              </div>
              <Clock className="h-6 w-6 lg:h-8 lg:w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Expired</p>
                <p className="text-xl lg:text-2xl font-bold text-red-600">{expiredCount}</p>
              </div>
              <AlertTriangle className="h-6 w-6 lg:h-8 lg:w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Pending Renewal</p>
                <p className="text-xl lg:text-2xl font-bold text-blue-600">{pendingCount}</p>
              </div>
              <Clock className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
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
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="permit">Permit</SelectItem>
                <SelectItem value="certificate">Certificate</SelectItem>
                <SelectItem value="report">Report</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="policy">Policy</SelectItem>
                <SelectItem value="audit">Audit</SelectItem>
              </SelectContent>
            </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="pending-renewal">Pending Renewal</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="air-quality">Air Quality</SelectItem>
                <SelectItem value="water-management">Water Management</SelectItem>
                <SelectItem value="waste-disposal">Waste Disposal</SelectItem>
                <SelectItem value="emissions">Emissions</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Documents ({filteredDocuments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getComplianceLevelColor(doc.complianceLevel)}`} />
                        <h3 className="font-semibold text-gray-900 text-sm lg:text-base break-words">{doc.title}</h3>
                      </div>
                      <Badge variant="outline" className={`${getStatusColor(doc.status)} text-xs self-start sm:self-auto`}>
                        {getStatusIcon(doc.status)}
                        <span className="ml-1 capitalize">{doc.status.replace('-', ' ')}</span>
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3 text-sm lg:text-base break-words">{doc.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        {getTypeIcon(doc.type)}
                        <span className="capitalize">{doc.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Issued: {new Date(doc.issueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                        <span className="font-medium">Authority:</span> <span className="break-words">{doc.authority}</span>
                      </div>
                      {doc.expiryDate && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Expires: {new Date(doc.expiryDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="break-all">
                        <span className="font-medium">Document #:</span> {doc.documentNumber}
                      </div>
                      <div>
                        <span className="font-medium">Size:</span> {doc.fileSize}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <Badge variant="outline" className="text-xs self-start">
                        {doc.category.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    {(doc.status === 'expiring-soon' || doc.status === 'expired') && (
                      <Button size="sm" className="w-full sm:w-auto">
                        Renew
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

export default EnvironmentalComplianceDocs;