import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Search, 
  Filter, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Star,
  Plus
} from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  category: "maintenance" | "security" | "technology" | "cleaning" | "catering" | "construction";
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  totalContracts: number;
  activeContracts: number;
  totalValue: number;
  paymentStatus: "up-to-date" | "pending" | "overdue";
  lastPayment: string;
  nextPayment: string;
  performance: number;
  registrationDate: string;
}

interface Contract {
  id: string;
  vendorId: string;
  title: string;
  type: "annual" | "monthly" | "project" | "maintenance";
  value: number;
  startDate: string;
  endDate: string;
  status: "active" | "pending" | "completed" | "cancelled";
  paymentTerms: string;
  description: string;
}

const mockVendors: Vendor[] = [
  {
    id: "V001",
    name: "Metro Security Solutions Pvt Ltd",
    category: "security",
    contactPerson: "Rajesh Kumar",
    email: "rajesh@metrosecurity.in",
    phone: "+91-9876543210",
    address: "Kakkanad, Kochi, Kerala",
    rating: 4.8,
    totalContracts: 12,
    activeContracts: 3,
    totalValue: 45000000,
    paymentStatus: "up-to-date",
    lastPayment: "2025-09-15",
    nextPayment: "2025-10-15",
    performance: 92,
    registrationDate: "2023-01-15"
  },
  {
    id: "V002",
    name: "Kochi Rail Maintenance Corp",
    category: "maintenance",
    contactPerson: "Priya Nair",
    email: "priya@krmc.co.in",
    phone: "+91-9123456789",
    address: "Edapally, Kochi, Kerala",
    rating: 4.6,
    totalContracts: 8,
    activeContracts: 5,
    totalValue: 78000000,
    paymentStatus: "pending",
    lastPayment: "2025-08-20",
    nextPayment: "2025-09-20",
    performance: 88,
    registrationDate: "2022-06-10"
  },
  {
    id: "V003",
    name: "TechRail Systems India",
    category: "technology",
    contactPerson: "Arun Menon",
    email: "arun@techrail.in",
    phone: "+91-9567890123",
    address: "Infopark, Kochi, Kerala",
    rating: 4.9,
    totalContracts: 6,
    activeContracts: 2,
    totalValue: 125000000,
    paymentStatus: "up-to-date",
    lastPayment: "2025-09-10",
    nextPayment: "2025-10-10",
    performance: 96,
    registrationDate: "2023-03-20"
  },
  {
    id: "V004",
    name: "CleanMetro Services",
    category: "cleaning",
    contactPerson: "Sunita Sharma",
    email: "sunita@cleanmetro.in",
    phone: "+91-9234567890",
    address: "Aluva, Kochi, Kerala",
    rating: 4.2,
    totalContracts: 15,
    activeContracts: 8,
    totalValue: 32000000,
    paymentStatus: "overdue",
    lastPayment: "2025-08-05",
    nextPayment: "2025-09-05",
    performance: 78,
    registrationDate: "2022-11-08"
  },
  {
    id: "V005",
    name: "Metro Food Services Pvt Ltd",
    category: "catering",
    contactPerson: "Vinod Thomas",
    email: "vinod@metrofood.in",
    phone: "+91-9345678901",
    address: "Kaloor, Kochi, Kerala",
    rating: 4.4,
    totalContracts: 4,
    activeContracts: 2,
    totalValue: 18000000,
    paymentStatus: "up-to-date",
    lastPayment: "2025-09-12",
    nextPayment: "2025-10-12",
    performance: 85,
    registrationDate: "2023-05-15"
  }
];

const mockContracts: Contract[] = [
  {
    id: "C001",
    vendorId: "V001",
    title: "Station Security Services - Phase 1",
    type: "annual",
    value: 15000000,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "active",
    paymentTerms: "Monthly",
    description: "Comprehensive security services for Aluva, Edapally, and Kakkanad stations"
  },
  {
    id: "C002",
    vendorId: "V002",
    title: "Platform Maintenance Contract",
    type: "maintenance",
    value: 25000000,
    startDate: "2025-03-01",
    endDate: "2026-02-28",
    status: "active",
    paymentTerms: "Quarterly",
    description: "Regular maintenance and repair of all platform facilities"
  },
  {
    id: "C003",
    vendorId: "V003",
    title: "Ticketing System Upgrade",
    type: "project",
    value: 65000000,
    startDate: "2025-06-01",
    endDate: "2025-12-31",
    status: "active",
    paymentTerms: "Milestone-based",
    description: "Complete upgrade of automatic fare collection system"
  }
];

const VendorManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "security": return <Building2 className="h-4 w-4 text-blue-500" />;
      case "maintenance": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "technology": return <FileText className="h-4 w-4 text-purple-500" />;
      case "cleaning": return <Clock className="h-4 w-4 text-cyan-500" />;
      case "catering": return <DollarSign className="h-4 w-4 text-orange-500" />;
      case "construction": return <Building2 className="h-4 w-4 text-red-500" />;
      default: return <Building2 className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "up-to-date": return "text-green-600 bg-green-50 border-green-200";
      case "pending": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "overdue": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getContractStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-50";
      case "pending": return "text-yellow-600 bg-yellow-50";
      case "completed": return "text-blue-600 bg-blue-50";
      case "cancelled": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`h-3 w-3 ${index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} 
      />
    ));
  };

  const filteredVendors = mockVendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || vendor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalVendors = mockVendors.length;
  const activeVendors = mockVendors.filter(v => v.activeContracts > 0).length;
  const totalContractValue = mockVendors.reduce((sum, v) => sum + v.totalValue, 0);
  const overduePayments = mockVendors.filter(v => v.paymentStatus === "overdue").length;

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Building2 className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            Vendor Management
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage vendor relationships, contracts, and payment tracking
          </p>
        </div>

        {/* Vendor Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Total Vendors</p>
                <p className="text-lg md:text-xl font-bold">{totalVendors}</p>
              </div>
              <div className="p-1 md:p-2 bg-blue-100 rounded text-blue-600">
                <Building2 className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Active Vendors</p>
                <p className="text-lg md:text-xl font-bold text-green-600">{activeVendors}</p>
              </div>
              <div className="p-1 md:p-2 bg-green-100 rounded text-green-600">
                <CheckCircle className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Contract Value</p>
                <p className="text-lg md:text-xl font-bold">{formatCurrency(totalContractValue).slice(0, -3)}Cr</p>
              </div>
              <div className="p-1 md:p-2 bg-purple-100 rounded text-purple-600">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Overdue Payments</p>
                <p className="text-lg md:text-xl font-bold text-red-600">{overduePayments}</p>
              </div>
              <div className="p-1 md:p-2 bg-red-100 rounded text-red-600">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Vendor Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search vendors by name or contact person..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={selectedCategory === "all" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                >
                  All Categories
                </Button>
                <Button 
                  variant={selectedCategory === "security" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedCategory("security")}
                >
                  Security
                </Button>
                <Button 
                  variant={selectedCategory === "maintenance" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedCategory("maintenance")}
                >
                  Maintenance
                </Button>
                <Button 
                  variant={selectedCategory === "technology" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedCategory("technology")}
                >
                  Technology
                </Button>
                <Button 
                  variant={selectedCategory === "cleaning" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedCategory("cleaning")}
                >
                  Cleaning
                </Button>
                <Button 
                  variant={selectedCategory === "catering" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedCategory("catering")}
                >
                  Catering
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vendor List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Vendor Directory ({filteredVendors.length})
                </CardTitle>
                <CardDescription>
                  Complete vendor information and contract details
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Add Vendor
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredVendors.map((vendor) => (
                <div key={vendor.id} className={`p-4 rounded-lg border ${getPaymentStatusColor(vendor.paymentStatus)}`}>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white/50 rounded">
                        {getCategoryIcon(vendor.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{vendor.name}</h3>
                          <Badge className="text-xs">
                            {vendor.category.toUpperCase()}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {renderStars(vendor.rating)}
                            <span className="text-xs font-medium ml-1">{vendor.rating}</span>
                          </div>
                          <Badge 
                            variant={vendor.paymentStatus === "overdue" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {vendor.paymentStatus.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <span>{vendor.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span>{vendor.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span>{vendor.address}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div><strong>Contact Person:</strong> {vendor.contactPerson}</div>
                            <div><strong>Total Contracts:</strong> {vendor.totalContracts}</div>
                            <div><strong>Active Contracts:</strong> {vendor.activeContracts}</div>
                          </div>
                          
                          <div className="space-y-2">
                            <div><strong>Contract Value:</strong> {formatCurrency(vendor.totalValue)}</div>
                            <div><strong>Last Payment:</strong> {vendor.lastPayment}</div>
                            <div><strong>Next Payment:</strong> {vendor.nextPayment}</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Performance Rating</span>
                            <span>{vendor.performance}%</span>
                          </div>
                          <Progress value={vendor.performance} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2 border-t">
                      <div className="text-xs text-muted-foreground">
                        Vendor ID: {vendor.id} • Registered: {vendor.registrationDate}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="text-xs flex-1 sm:flex-none">
                          View Contracts
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs flex-1 sm:flex-none">
                          Payment History
                        </Button>
                        <Button size="sm" className="text-xs flex-1 sm:flex-none">
                          Contact Vendor
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Contracts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Active Contracts
            </CardTitle>
            <CardDescription>
              Currently active vendor contracts and agreements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockContracts.map((contract) => (
                <div key={contract.id} className="p-4 border rounded-lg">
                  <div className="flex flex-col gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="font-semibold break-words">{contract.title}</h4>
                        <Badge className={`text-xs ${getContractStatusColor(contract.status)}`}>
                          {contract.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {contract.type.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 break-words">{contract.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Contract Value</p>
                          <p className="font-medium">{formatCurrency(contract.value)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Start Date</p>
                          <p className="font-medium">{contract.startDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">End Date</p>
                          <p className="font-medium">{contract.endDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Payment Terms</p>
                          <p className="font-medium break-words">{contract.paymentTerms}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2 border-t">
                      <Button variant="outline" size="sm" className="text-xs flex-1 sm:flex-none">
                        View Details
                      </Button>
                      <Button size="sm" className="text-xs flex-1 sm:flex-none">
                        Manage
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

export default VendorManagement;