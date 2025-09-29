import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Filter, Clock, Download, Eye } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  type: "policy" | "procedure" | "form" | "report" | "manual" | "memo";
  department: string;
  summary: string;
  lastModified: string;
  relevanceScore: number;
  tags: string[];
  location: string;
}

const mockSearchResults: SearchResult[] = [
  {
    id: "DOC001",
    title: "Emergency Response Procedures for Station Incidents",
    type: "procedure",
    department: "Safety",
    summary: "Comprehensive guide for handling various emergency situations at metro stations including evacuation protocols, communication procedures, and coordination with emergency services.",
    lastModified: "2025-09-10",
    relevanceScore: 95,
    tags: ["emergency", "safety", "evacuation", "protocols"],
    location: "/safety/procedures/emergency-response-v3.2.pdf"
  },
  {
    id: "DOC002",
    title: "Daily Operations Checklist for Station Managers",
    type: "form",
    department: "Operations",
    summary: "Standard checklist covering all essential daily operational tasks including equipment checks, safety inspections, and passenger service quality assessments.",
    lastModified: "2025-09-15",
    relevanceScore: 88,
    tags: ["operations", "checklist", "daily", "management"],
    location: "/operations/forms/daily-checklist-v2.1.pdf"
  },
  {
    id: "DOC003",
    title: "Customer Service Excellence Guidelines",
    type: "policy",
    department: "Customer Relations",
    summary: "Updated customer service standards and best practices for frontline staff. Includes communication guidelines, complaint handling procedures, and passenger assistance protocols.",
    lastModified: "2025-09-12",
    relevanceScore: 82,
    tags: ["customer-service", "guidelines", "communication", "assistance"],
    location: "/customer-relations/policies/service-excellence-v4.0.pdf"
  },
  {
    id: "DOC004",
    title: "Weekly Maintenance Report Template",
    type: "form",
    department: "Maintenance",
    summary: "Standardized template for weekly maintenance reporting including equipment status, completed repairs, pending issues, and resource requirements.",
    lastModified: "2025-09-08",
    relevanceScore: 76,
    tags: ["maintenance", "reporting", "template", "weekly"],
    location: "/maintenance/forms/weekly-report-template-v1.5.pdf"
  },
  {
    id: "DOC005",
    title: "Staff Training Manual - Ticket Vending Machines",
    type: "manual",
    department: "Training",
    summary: "Complete training guide for ticket vending machine operation, troubleshooting, and customer assistance. Includes step-by-step procedures and common issue resolution.",
    lastModified: "2025-09-05",
    relevanceScore: 71,
    tags: ["training", "tvm", "troubleshooting", "customer-assistance"],
    location: "/training/manuals/tvm-operation-manual-v2.3.pdf"
  }
];

const QuickSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      const filteredResults = mockSearchResults.filter(result =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 800);
  };

  const getTypeIcon = (type: string) => {
    return <FileText className="h-4 w-4" />;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      policy: "bg-blue-100 text-blue-800",
      procedure: "bg-green-100 text-green-800",
      form: "bg-purple-100 text-purple-800",
      report: "bg-yellow-100 text-yellow-800",
      manual: "bg-orange-100 text-orange-800",
      memo: "bg-gray-100 text-gray-800"
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Search className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            Quick Search
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            AI-powered intelligent document search and discovery
          </p>
        </div>

        {/* Search Interface */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Document Search
            </CardTitle>
            <CardDescription>
              Search through all documents, policies, procedures, and forms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search for documents, policies, procedures..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button onClick={handleSearch} disabled={isSearching}>
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>

              {/* Search Filters */}
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  All Types
                </Button>
                <Button variant="outline" size="sm">Policies</Button>
                <Button variant="outline" size="sm">Procedures</Button>
                <Button variant="outline" size="sm">Forms</Button>
                <Button variant="outline" size="sm">Reports</Button>
                <Button variant="outline" size="sm">Manuals</Button>
              </div>

              {/* Quick Access Shortcuts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" className="h-auto p-3 flex flex-col items-center">
                  <FileText className="h-5 w-5 mb-1" />
                  <span className="text-xs">Emergency Procedures</span>
                </Button>
                <Button variant="outline" className="h-auto p-3 flex flex-col items-center">
                  <FileText className="h-5 w-5 mb-1" />
                  <span className="text-xs">Daily Checklists</span>
                </Button>
                <Button variant="outline" className="h-auto p-3 flex flex-col items-center">
                  <FileText className="h-5 w-5 mb-1" />
                  <span className="text-xs">Safety Policies</span>
                </Button>
                <Button variant="outline" className="h-auto p-3 flex flex-col items-center">
                  <FileText className="h-5 w-5 mb-1" />
                  <span className="text-xs">Training Materials</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Search Results ({searchResults.length})
              </CardTitle>
              <CardDescription>
                Results sorted by relevance and recency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <div key={result.id} className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded">
                          {getTypeIcon(result.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="font-semibold text-base">{result.title}</h3>
                            <Badge className={`text-xs ${getTypeColor(result.type)}`}>
                              {result.type.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {result.relevanceScore}% match
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{result.summary}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <span><strong>Department:</strong> {result.department}</span>
                            <span><strong>Last Modified:</strong> {result.lastModified}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {result.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t">
                        <div className="text-xs text-muted-foreground">
                          Location: {result.location}
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
        )}

        {/* Recent Searches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Searches
            </CardTitle>
            <CardDescription>
              Your recently accessed documents and searches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 hover:bg-accent rounded">
                <span className="text-sm">"emergency evacuation procedures"</span>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-accent rounded">
                <span className="text-sm">"daily checklist forms"</span>
                <span className="text-xs text-muted-foreground">Yesterday</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-accent rounded">
                <span className="text-sm">"customer service guidelines"</span>
                <span className="text-xs text-muted-foreground">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default QuickSearch;