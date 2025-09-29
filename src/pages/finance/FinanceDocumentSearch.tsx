import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  FileText, 
  Filter, 
  Clock, 
  Download, 
  Eye,
  DollarSign,
  TrendingUp,
  Calculator,
  CreditCard,
  Receipt,
  Briefcase
} from "lucide-react";

interface FinanceDocument {
  id: string;
  title: string;
  type: "budget" | "invoice" | "contract" | "audit" | "tax" | "financial-statement" | "expense-report" | "payment-record";
  department: string;
  summary: string;
  lastModified: string;
  createdDate: string;
  relevanceScore: number;
  tags: string[];
  location: string;
  fileSize: string;
  author: string;
  status: "active" | "archived" | "pending-approval" | "draft";
  amount?: number;
  currency: string;
  fiscalYear: string;
}

const mockFinanceDocuments: FinanceDocument[] = [
  {
    id: "FD001",
    title: "Annual Budget Allocation 2025-26 - Operations Department",
    type: "budget",
    department: "Finance",
    summary: "Comprehensive budget document outlining operational expenditure allocation for all metro operations including maintenance, security, staffing, and utilities for fiscal year 2025-26.",
    lastModified: "2025-09-15",
    createdDate: "2025-08-01",
    relevanceScore: 95,
    tags: ["budget", "operations", "annual", "2025-26", "allocation"],
    location: "/finance/budgets/annual-budget-operations-2025-26.pdf",
    fileSize: "2.3 MB",
    author: "Chief Financial Officer",
    status: "active",
    amount: 450000000,
    currency: "INR",
    fiscalYear: "2025-26"
  },
  {
    id: "FD002",
    title: "Vendor Invoice - Metro Security Solutions - September 2025",
    type: "invoice",
    department: "Procurement",
    summary: "Monthly security services invoice for comprehensive security coverage across all metro stations. Includes manpower, equipment, and monitoring services.",
    lastModified: "2025-09-16",
    createdDate: "2025-09-01",
    relevanceScore: 88,
    tags: ["invoice", "security", "vendor", "monthly", "september"],
    location: "/finance/invoices/security-solutions-sept-2025.pdf",
    fileSize: "856 KB",
    author: "Procurement Manager",
    status: "pending-approval",
    amount: 1500000,
    currency: "INR",
    fiscalYear: "2025-26"
  },
  {
    id: "FD003",
    title: "Quarterly Financial Statements - Q2 2025",
    type: "financial-statement",
    department: "Finance",
    summary: "Comprehensive quarterly financial statements including profit & loss, balance sheet, cash flow statement, and notes to accounts for Q2 2025.",
    lastModified: "2025-09-10",
    createdDate: "2025-07-15",
    relevanceScore: 92,
    tags: ["financial-statements", "quarterly", "q2", "2025", "profit-loss"],
    location: "/finance/statements/quarterly-financial-q2-2025.pdf",
    fileSize: "4.1 MB",
    author: "Chief Financial Officer",
    status: "active",
    amount: 124500000,
    currency: "INR",
    fiscalYear: "2025-26"
  },
  {
    id: "FD004",
    title: "GST Audit Report - Annual Review 2024-25",
    type: "audit",
    department: "Tax & Compliance",
    summary: "Comprehensive GST audit report covering all transactions, input tax credits, output tax liabilities, and compliance status for fiscal year 2024-25.",
    lastModified: "2025-09-08",
    createdDate: "2025-06-01",
    relevanceScore: 86,
    tags: ["gst", "audit", "annual", "2024-25", "compliance", "tax"],
    location: "/finance/audits/gst-audit-report-2024-25.pdf",
    fileSize: "3.2 MB",
    author: "External Auditor",
    status: "active",
    amount: 15600000,
    currency: "INR",
    fiscalYear: "2024-25"
  },
  {
    id: "FD005",
    title: "Monthly Expense Report - August 2025",
    type: "expense-report",
    department: "Finance",
    summary: "Detailed monthly expense breakdown covering operational costs, maintenance expenses, staff costs, utility bills, and administrative expenses for August 2025.",
    lastModified: "2025-09-05",
    createdDate: "2025-09-01",
    relevanceScore: 82,
    tags: ["expense-report", "monthly", "august", "2025", "operational-costs"],
    location: "/finance/expenses/monthly-expense-report-aug-2025.pdf",
    fileSize: "1.8 MB",
    author: "Finance Manager",
    status: "active",
    amount: 89300000,
    currency: "INR",
    fiscalYear: "2025-26"
  },
  {
    id: "FD006",
    title: "Maintenance Contract Agreement - Platform Services",
    type: "contract",
    department: "Procurement",
    summary: "Annual maintenance contract for comprehensive platform services including cleaning, repair, electrical maintenance, and passenger facilities upkeep.",
    lastModified: "2025-09-12",
    createdDate: "2025-03-15",
    relevanceScore: 78,
    tags: ["contract", "maintenance", "platform", "annual", "services"],
    location: "/finance/contracts/platform-maintenance-contract-2025.pdf",
    fileSize: "2.7 MB",
    author: "Procurement Manager",
    status: "active",
    amount: 25000000,
    currency: "INR",
    fiscalYear: "2025-26"
  },
  {
    id: "FD007",
    title: "Income Tax Assessment - Corporate Filing 2024-25",
    type: "tax",
    department: "Tax & Compliance",
    summary: "Corporate income tax assessment and filing documentation for KMRL including tax calculations, deductions, and statutory compliance for FY 2024-25.",
    lastModified: "2025-09-07",
    createdDate: "2025-07-30",
    relevanceScore: 90,
    tags: ["income-tax", "corporate", "assessment", "2024-25", "filing"],
    location: "/finance/tax/income-tax-assessment-2024-25.pdf",
    fileSize: "2.1 MB",
    author: "Tax Consultant",
    status: "active",
    amount: 8750000,
    currency: "INR",
    fiscalYear: "2024-25"
  },
  {
    id: "FD008",
    title: "Payment Record - Vendor Settlements August 2025",
    type: "payment-record",
    department: "Accounts Payable",
    summary: "Complete record of all vendor payments processed in August 2025 including security services, maintenance contracts, utility bills, and miscellaneous expenses.",
    lastModified: "2025-09-02",
    createdDate: "2025-09-01",
    relevanceScore: 75,
    tags: ["payment-record", "vendor", "settlements", "august", "2025"],
    location: "/finance/payments/vendor-settlements-aug-2025.pdf",
    fileSize: "1.5 MB",
    author: "Accounts Payable Officer",
    status: "active",
    amount: 67800000,
    currency: "INR",
    fiscalYear: "2025-26"
  }
];

const FinanceDocumentSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FinanceDocument[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isSearching, setIsSearching] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "budget": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "invoice": return <Receipt className="h-4 w-4 text-blue-600" />;
      case "contract": return <Briefcase className="h-4 w-4 text-purple-600" />;
      case "audit": return <Search className="h-4 w-4 text-red-600" />;
      case "tax": return <Calculator className="h-4 w-4 text-orange-600" />;
      case "financial-statement": return <DollarSign className="h-4 w-4 text-indigo-600" />;
      case "expense-report": return <CreditCard className="h-4 w-4 text-pink-600" />;
      case "payment-record": return <Clock className="h-4 w-4 text-teal-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      budget: "bg-green-100 text-green-800",
      invoice: "bg-blue-100 text-blue-800",
      contract: "bg-purple-100 text-purple-800",
      audit: "bg-red-100 text-red-800",
      tax: "bg-orange-100 text-orange-800",
      "financial-statement": "bg-indigo-100 text-indigo-800",
      "expense-report": "bg-pink-100 text-pink-800",
      "payment-record": "bg-teal-100 text-teal-800"
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-50";
      case "archived": return "text-gray-600 bg-gray-50";
      case "pending-approval": return "text-yellow-600 bg-yellow-50";
      case "draft": return "text-blue-600 bg-blue-50";
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

  const handleSearch = () => {
    if (!searchQuery.trim() && selectedType === "all") {
      setSearchResults(mockFinanceDocuments);
      return;
    }
    
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      let filteredResults = mockFinanceDocuments;
      
      if (searchQuery.trim()) {
        filteredResults = filteredResults.filter(doc =>
          doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          doc.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (selectedType !== "all") {
        filteredResults = filteredResults.filter(doc => doc.type === selectedType);
      }
      
      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 800);
  };

  // Initialize with all documents
  useEffect(() => {
    setSearchResults(mockFinanceDocuments);
  }, []);

  const totalDocuments = mockFinanceDocuments.length;
  const activeDocuments = mockFinanceDocuments.filter(doc => doc.status === "active").length;
  const pendingApprovals = mockFinanceDocuments.filter(doc => doc.status === "pending-approval").length;
  const totalValue = mockFinanceDocuments.reduce((sum, doc) => sum + (doc.amount || 0), 0);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Search className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            Finance Document Search
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Search and discover finance-related documents, contracts, and reports
          </p>
        </div>

        {/* Document Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Total Documents</p>
                <p className="text-lg md:text-xl font-bold">{totalDocuments}</p>
              </div>
              <div className="p-1 md:p-2 bg-blue-100 rounded text-blue-600">
                <FileText className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Active Documents</p>
                <p className="text-lg md:text-xl font-bold text-green-600">{activeDocuments}</p>
              </div>
              <div className="p-1 md:p-2 bg-green-100 rounded text-green-600">
                <Clock className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Pending Approval</p>
                <p className="text-lg md:text-xl font-bold text-yellow-600">{pendingApprovals}</p>
              </div>
              <div className="p-1 md:p-2 bg-yellow-100 rounded text-yellow-600">
                <Clock className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted-foreground">Total Value</p>
                <p className="text-lg md:text-xl font-bold">{formatCurrency(totalValue).slice(0, -3)}Cr</p>
              </div>
              <div className="p-1 md:p-2 bg-purple-100 rounded text-purple-600">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search Interface */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Document Search
            </CardTitle>
            <CardDescription>
              Search through finance documents, invoices, contracts, and reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search for budgets, invoices, contracts, audits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button onClick={handleSearch} disabled={isSearching}>
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>

              {/* Document Type Filters */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={selectedType === "all" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedType("all")}
                >
                  <Filter className="h-4 w-4 mr-1" />
                  All Types
                </Button>
                <Button 
                  variant={selectedType === "budget" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedType("budget")}
                >
                  Budgets
                </Button>
                <Button 
                  variant={selectedType === "invoice" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedType("invoice")}
                >
                  Invoices
                </Button>
                <Button 
                  variant={selectedType === "contract" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedType("contract")}
                >
                  Contracts
                </Button>
                <Button 
                  variant={selectedType === "audit" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedType("audit")}
                >
                  Audits
                </Button>
                <Button 
                  variant={selectedType === "tax" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedType("tax")}
                >
                  Tax Documents
                </Button>
                <Button 
                  variant={selectedType === "financial-statement" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedType("financial-statement")}
                >
                  Statements
                </Button>
              </div>

              {/* Quick Access Shortcuts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" className="h-auto p-3 flex flex-col items-center">
                  <TrendingUp className="h-5 w-5 mb-1" />
                  <span className="text-xs">Current Budget</span>
                </Button>
                <Button variant="outline" className="h-auto p-3 flex flex-col items-center">
                  <Receipt className="h-5 w-5 mb-1" />
                  <span className="text-xs">Recent Invoices</span>
                </Button>
                <Button variant="outline" className="h-auto p-3 flex flex-col items-center">
                  <Calculator className="h-5 w-5 mb-1" />
                  <span className="text-xs">Tax Documents</span>
                </Button>
                <Button variant="outline" className="h-auto p-3 flex flex-col items-center">
                  <DollarSign className="h-5 w-5 mb-1" />
                  <span className="text-xs">Financial Reports</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Search Results ({searchResults.length})
            </CardTitle>
            <CardDescription>
              Finance documents sorted by relevance and date
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((document) => (
                <div key={document.id} className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded">
                        {getTypeIcon(document.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-semibold text-base">{document.title}</h3>
                          <Badge className={`text-xs ${getTypeColor(document.type)}`}>
                            {document.type.replace("-", " ").toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {document.relevanceScore}% match
                          </Badge>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(document.status)}`}>
                            {document.status.replace("-", " ").toUpperCase()}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{document.summary}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-3">
                          <div>
                            <p><strong>Department:</strong> {document.department}</p>
                            <p><strong>Author:</strong> {document.author}</p>
                          </div>
                          <div>
                            <p><strong>Created:</strong> {document.createdDate}</p>
                            <p><strong>Modified:</strong> {document.lastModified}</p>
                          </div>
                          <div>
                            <p><strong>File Size:</strong> {document.fileSize}</p>
                            <p><strong>Fiscal Year:</strong> {document.fiscalYear}</p>
                          </div>
                        </div>

                        {document.amount && (
                          <div className="mb-3">
                            <p className="text-sm">
                              <strong>Amount:</strong> 
                              <span className="text-lg font-semibold text-green-600 ml-1">
                                {formatCurrency(document.amount)}
                              </span>
                            </p>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-1">
                          {document.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t">
                      <div className="text-xs text-muted-foreground">
                        Location: {document.location}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" className="text-xs">
                          Open Document
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Finance Documents
            </CardTitle>
            <CardDescription>
              Recently accessed and modified finance documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 hover:bg-accent rounded">
                <span className="text-sm">Annual Budget Allocation 2025-26</span>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-accent rounded">
                <span className="text-sm">Security Services Invoice - September 2025</span>
                <span className="text-xs text-muted-foreground">Yesterday</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-accent rounded">
                <span className="text-sm">Quarterly Financial Statements - Q2 2025</span>
                <span className="text-xs text-muted-foreground">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FinanceDocumentSearch;