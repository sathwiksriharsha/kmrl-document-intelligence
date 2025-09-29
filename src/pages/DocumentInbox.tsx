import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  FileText, 
  Share2, 
  MessageSquare, 
  ScanLine, 
  Cloud,
  Eye,
  Calendar,
  Tag,
  Search,
  Filter,
  Languages,
  AlertTriangle,
  CheckCircle,
  Forward,
  Clock,
  Globe,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  title: string;
  source: "email" | "maximo" | "sharepoint" | "whatsapp" | "scan" | "cloud";
  language: "EN" | "ML" | "Mixed";
  timestamp: string;
  department?: string;
  departments?: string[];
  aiSummary: string;
  malayalamSummary?: string;
  tags: string[];
  fileSize?: string;
  status: "processing" | "ready" | "error";
  priority: "High Risk" | "Urgent" | "Normal";
  isReviewed?: boolean;
  forwardedTo?: string[];
  followUpDate?: string;
}

// Priority assignment logic based on content
const assignPriority = (title: string, summary: string, tags: string[]): "High Risk" | "Urgent" | "Normal" => {
  const highRiskKeywords = ["safety", "compliance", "deadline", "expiry", "shall", "must", "urgent", "regulatory", "emergency", "incident"];
  const urgentKeywords = ["invoice", "purchase", "po", "payment", "repair", "maintenance"];
  
  const content = (title + " " + summary + " " + tags.join(" ")).toLowerCase();
  
  if (highRiskKeywords.some(keyword => content.includes(keyword))) {
    return "High Risk";
  } else if (urgentKeywords.some(keyword => content.includes(keyword))) {
    return "Urgent";
  }
  return "Normal";
};

// Cross-department awareness logic
const assignDepartments = (title: string, summary: string, tags: string[]): string[] => {
  const content = (title + " " + summary + " " + tags.join(" ")).toLowerCase();
  const departments: string[] = [];
  
  if (content.includes("safety") || content.includes("incident") || content.includes("emergency")) departments.push("Safety");
  if (content.includes("engineering") || content.includes("repair") || content.includes("signal") || content.includes("maintenance")) departments.push("Engineering");
  if (content.includes("finance") || content.includes("invoice") || content.includes("payment") || content.includes("purchase")) departments.push("Finance");
  if (content.includes("hr") || content.includes("policy") || content.includes("employee") || content.includes("leave")) departments.push("HR");
  if (content.includes("legal") || content.includes("compliance") || content.includes("regulatory") || content.includes("environment")) departments.push("Legal");
  if (content.includes("procurement") || content.includes("vendor") || content.includes("contract")) departments.push("Procurement");
  
  return departments.length > 0 ? departments : ["General"];
};

const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Safety Circular - Malayalam",
    source: "email",
    language: "ML",
    timestamp: "2 hours ago",
    department: "Safety",
    departments: ["Safety"],
    aiSummary: "New safety protocols for track maintenance operations. Includes mandatory equipment inspections and updated emergency procedures.",
    malayalamSummary: "ട്രാക്ക് മെയിന്റനൻസ് പ്രവർത്തനങ്ങൾക്കായുള്ള പുതിയ സുരക്ഷാ പ്രോട്ടോക്കോളുകൾ. നിർബന്ധിത ഉപകരണ പരിശോധനകൾ, അപ്ഡേറ്റ് ചെയ്ത എമർജൻസി നടപടിക്രമങ്ങൾ എന്നിവ ഉൾപ്പെടുന്നു.",
    tags: ["Safety", "Maintenance", "Emergency"],
    fileSize: "2.3 MB",
    status: "ready",
    priority: "High Risk",
    isReviewed: false
  },
  {
    id: "2", 
    title: "Engineering Design Change",
    source: "maximo",
    language: "EN",
    timestamp: "4 hours ago",
    department: "Engineering",
    departments: ["Engineering", "Procurement"],
    aiSummary: "Work order for signal system repair at Kakkanad station. Estimated completion time: 6 hours. Requires specialized technician and backup signal equipment from approved vendors.",
    malayalamSummary: "കാക്കനാട് സ്റ്റേഷനിലെ സിഗ്നൽ സിസ്റ്റം അറ്റകുറ്റപ്പണിക്കുള്ള വർക്ക് ഓർഡർ. പ്രതീക്ഷിക്കുന്ന പൂർത്തീകരണ സമയം: 6 മണിക്കൂർ.",
    tags: ["Engineering", "Repair", "Signal"],
    fileSize: "1.8 MB",
    status: "ready",
    priority: "Urgent",
    isReviewed: false
  },
  {
    id: "3",
    title: "Vendor Invoice",
    source: "sharepoint",
    language: "EN",
    timestamp: "6 hours ago", 
    department: "Finance",
    departments: ["Finance"],
    aiSummary: "Invoice for electrical equipment purchase totaling ₹2,45,000. Payment terms: Net 30 days. Items include emergency lighting, fire extinguishers, and first aid kits for multiple stations.",
    malayalamSummary: "ഇലക്ട്രിക്കൽ ഉപകരണങ്ങൾ വാങ്ങുന്നതിനുള്ള ബില്ല് - മൊത്തം ₹2,45,000. പേയ്മെന്റ് നിബന്ധനകൾ: നെറ്റ് 30 ദിവസം.",
    tags: ["Finance", "Invoice", "Purchase"],
    fileSize: "4.1 MB",
    status: "ready",
    priority: "Urgent",
    isReviewed: false
  },
  {
    id: "4",
    title: "Board Meeting Minutes",
    source: "whatsapp",
    language: "Mixed",
    timestamp: "8 hours ago",
    department: "Legal",
    departments: ["Legal", "HR"],
    aiSummary: "Monthly board meeting minutes covering policy updates, HR initiatives, and legal compliance matters. New employee benefits program approved for implementation.",
    malayalamSummary: "പോളിസി അപ്ഡേറ്റുകൾ, എച്ച്ആർ സംരംഭങ്ങൾ, നിയമപരമായ അനുസരണ കാര്യങ്ങൾ എന്നിവ ഉൾക്കൊള്ളുന്ന മാസിക ബോർഡ് മീറ്റിംഗ് മിനിറ്റ്സ്.",
    tags: ["Legal", "HR", "Policy"],
    fileSize: "856 KB",
    status: "ready",
    priority: "Normal",
    isReviewed: false
  },
  {
    id: "5",
    title: "Incident Report",
    source: "scan",
    language: "EN",
    timestamp: "1 day ago",
    department: "Safety",
    departments: ["Safety"],
    aiSummary: "Critical safety incident report from Edappally station. Immediate corrective actions required. Investigation findings show equipment malfunction as root cause.",
    malayalamSummary: "എടപ്പള്ളി സ്റ്റേഷനിൽ നിന്നുള്ള നിർണ്ണായക സുരക്ഷാ സംഭവ റിപ്പോർട്ട്. ഉടനടി തിരുത്തൽ നടപടികൾ ആവശ്യം.",
    tags: ["Safety", "Incident", "Critical"],
    fileSize: "3.2 MB",
    status: "ready",
    priority: "High Risk",
    isReviewed: false
  },
  {
    id: "6",
    title: "Maximo Export - Job Card",
    source: "cloud",
    language: "EN",
    timestamp: "2 days ago",
    department: "Engineering",
    departments: ["Engineering"],
    aiSummary: "Routine maintenance job card for Track Section 3A. Regular inspection and maintenance tasks completed successfully. All systems operational.",
    malayalamSummary: "ട്രാക്ക് സെക്ഷൻ 3A-യ്ക്കുള്ള പതിവ് മെയിന്റനൻസ് ജോബ് കാർഡ്. പതിവ് പരിശോധനയും അറ്റകുറ്റപ്പണി ജോലികളും വിജയകരമായി പൂർത്തിയാക്കി.",
    tags: ["Engineering", "Maintenance", "Routine"],
    fileSize: "12.4 MB",
    status: "ready",
    priority: "Normal",
    isReviewed: false
  }
];

const sourceIcons = {
  email: Mail,
  maximo: FileText,
  sharepoint: Share2,
  whatsapp: MessageSquare,
  scan: ScanLine,
  cloud: Cloud
};

const sourceColors = {
  email: "bg-blue-100 text-blue-800",
  maximo: "bg-orange-100 text-orange-800", 
  sharepoint: "bg-green-100 text-green-800",
  whatsapp: "bg-teal-100 text-teal-800",
  scan: "bg-gray-100 text-gray-800",
  cloud: "bg-purple-100 text-purple-800"
};

const DocumentInbox = () => {
  const [sourceFilter, setSourceFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [priorityFilters, setPriorityFilters] = useState<string[]>(["High Risk", "Urgent", "Normal"]);
  const [summaryLanguage, setSummaryLanguage] = useState<"EN" | "ML" | "Both">("EN");
  const [documents, setDocuments] = useState(mockDocuments);
  const [isForwardDialogOpen, setIsForwardDialogOpen] = useState(false);
  const [selectedDocForForward, setSelectedDocForForward] = useState<Document | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [forwardMessage, setForwardMessage] = useState("");
  const { toast } = useToast();

  const filteredDocuments = documents.filter(doc => {
    const matchesSource = sourceFilter === "all" || doc.source === sourceFilter;
    const matchesDepartment = departmentFilter === "all" || 
      doc.department === departmentFilter || 
      doc.departments?.includes(departmentFilter);
    const matchesLanguage = languageFilter === "all" || doc.language === languageFilter;
    const matchesPriority = priorityFilters.includes(doc.priority);
    const matchesSearch = searchQuery === "" || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.aiSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSource && matchesDepartment && matchesLanguage && matchesPriority && matchesSearch;
  }).sort((a, b) => {
    // Sort by priority: High Risk > Urgent > Normal
    const priorityOrder = { "High Risk": 3, "Urgent": 2, "Normal": 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const getSourceIcon = (source: Document["source"]) => {
    const Icon = sourceIcons[source];
    return <Icon className="h-4 w-4" />;
  };

  const getPriorityBadge = (priority: Document["priority"]) => {
    switch (priority) {
      case "High Risk":
        return <Badge variant="destructive" className="text-xs">High Risk</Badge>;
      case "Urgent":
        return <Badge className="bg-orange-100 text-orange-800 text-xs">Urgent</Badge>;
      case "Normal":
        return <Badge variant="outline" className="text-green-600 text-xs">Normal</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Document["status"]) => {
    switch (status) {
      case "processing":
        return <Badge variant="secondary" className="animate-pulse">Processing</Badge>;
      case "ready":
        return <Badge variant="outline" className="text-green-600">Ready</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return null;
    }
  };

  const handlePriorityFilterChange = (priority: string, checked: boolean) => {
    if (checked) {
      setPriorityFilters([...priorityFilters, priority]);
    } else {
      setPriorityFilters(priorityFilters.filter(p => p !== priority));
    }
  };

  const handleMarkReviewed = (docId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, isReviewed: true } : doc
    ));
    toast({
      title: "Document Reviewed",
      description: "Document has been marked as reviewed.",
    });
  };

  const handleForwardDocument = () => {
    if (selectedDocForForward && selectedDepartments.length > 0) {
      setDocuments(prev => prev.map(doc => 
        doc.id === selectedDocForForward.id ? 
        { ...doc, forwardedTo: selectedDepartments } : doc
      ));
      toast({
        title: "Document Forwarded",
        description: `Document forwarded to ${selectedDepartments.join(", ")}`,
      });
      setIsForwardDialogOpen(false);
      setSelectedDocForForward(null);
      setSelectedDepartments([]);
      setForwardMessage("");
    }
  };

  const handleScheduleFollowUp = (docId: string) => {
    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + 7);
    
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? 
      { ...doc, followUpDate: followUpDate.toISOString().split('T')[0] } : doc
    ));
    toast({
      title: "Follow-up Scheduled",
      description: "Follow-up reminder has been scheduled for next week.",
    });
  };

  const getSummaryContent = (doc: Document) => {
    switch (summaryLanguage) {
      case "ML":
        return doc.malayalamSummary || doc.aiSummary + " (Malayalam summary pending - demo)";
      case "Both":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-xs mb-1">English</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">{doc.aiSummary}</p>
            </div>
            <div>
              <h5 className="font-medium text-xs mb-1">Malayalam</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">{doc.malayalamSummary || "Malayalam summary pending (demo)"}</p>
            </div>
          </div>
        );
      default:
        return <p className="text-sm text-muted-foreground leading-relaxed">{doc.aiSummary}</p>;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Document Inbox & AI Summarization Hub</h1>
            <p className="text-muted-foreground">AI-powered document processing from multiple sources</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={summaryLanguage} onValueChange={(value: "EN" | "ML" | "Both") => setSummaryLanguage(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EN">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    English
                  </div>
                </SelectItem>
                <SelectItem value="ML">
                  <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Malayalam
                  </div>
                </SelectItem>
                <SelectItem value="Both">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Both
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Source</label>
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="maximo">Maximo</SelectItem>
                    <SelectItem value="sharepoint">SharePoint</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="scan">Scanned</SelectItem>
                    <SelectItem value="cloud">Cloud Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Safety">Safety</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select value={languageFilter} onValueChange={setLanguageFilter}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="EN">English</SelectItem>
                    <SelectItem value="ML">Malayalam</SelectItem>
                    <SelectItem value="Mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <div className="space-y-1.5 sm:space-y-2">
                  {["High Risk", "Urgent", "Normal"].map((priority) => (
                    <div key={priority} className="flex items-center space-x-2">
                      <Checkbox
                        id={priority}
                        checked={priorityFilters.includes(priority)}
                        onCheckedChange={(checked) => handlePriorityFilterChange(priority, checked as boolean)}
                      />
                      <Label htmlFor={priority} className="text-xs sm:text-sm">{priority}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Actions</label>
                <Button variant="outline" className="w-full h-10 text-sm">
                  Summarize All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Feed */}
        <div className="space-y-4">
          {filteredDocuments.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Documents Found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || sourceFilter !== "all" || departmentFilter !== "all" || languageFilter !== "all"
                    ? "No documents match your current filters. Try adjusting your search criteria."
                    : "Your AI Inbox will fill up as new documents arrive from various sources."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredDocuments.map((doc) => (
              <Card key={doc.id} className={`transition-all hover:shadow-md relative ${doc.isReviewed ? 'bg-muted/20' : ''} border-l-4 ${doc.priority === 'High Risk' ? 'border-l-red-500' : doc.priority === 'Urgent' ? 'border-l-orange-500' : 'border-l-green-500'}`}>
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`p-2 rounded-lg ${sourceColors[doc.source]} relative flex-shrink-0`}>
                      {getSourceIcon(doc.source)}
                      {/* Priority dot indicator */}
                      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${doc.priority === 'High Risk' ? 'bg-red-500' : doc.priority === 'Urgent' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                    </div>
                    
                    <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-start gap-2">
                            <h3 className="font-semibold text-base sm:text-lg break-words leading-tight">{doc.title}</h3>
                            {doc.isReviewed && <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 flex-shrink-0" />}
                          </div>
                          
                          {/* Multi-department tags */}
                          {doc.departments && doc.departments.length > 1 && (
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                <Users className="h-3 w-3 mr-1" />
                                <span className="hidden sm:inline">Shared: </span>{doc.departments.join(" · ")}
                              </Badge>
                            </div>
                          )}
                          
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span className="truncate">{doc.timestamp}</span>
                            </div>
                            {doc.department && (
                              <div className="flex items-center gap-1">
                                <Tag className="h-3 w-3" />
                                <span className="truncate">{doc.department}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Languages className="h-3 w-3" />
                              {doc.language}
                            </div>
                            {doc.fileSize && (
                              <span className="hidden sm:inline">{doc.fileSize}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                          {getPriorityBadge(doc.priority)}
                          {getStatusBadge(doc.status)}
                        </div>
                      </div>

                      {doc.status === "ready" && (
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm mb-2">AI Summary</h4>
                            {getSummaryContent(doc)}
                          </div>

                          <div className="flex items-center gap-2">
                            {doc.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <Separator />

                          {/* Quick Action Buttons */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                              <span>Source: <span className="capitalize font-medium">{doc.source}</span></span>
                              {doc.forwardedTo && (
                                <Badge variant="outline" className="text-xs">
                                  Forwarded to: {doc.forwardedTo.join(", ")}
                                </Badge>
                              )}
                              {doc.followUpDate && (
                                <Badge variant="outline" className="text-xs">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Follow-up: {new Date(doc.followUpDate).toLocaleDateString()}
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                              {!doc.isReviewed && (
                                <Button variant="outline" size="sm" onClick={() => handleMarkReviewed(doc.id)} className="gap-1 text-xs sm:text-sm">
                                  <CheckCircle className="h-3 w-3" />
                                  <span className="hidden sm:inline">Mark </span>Reviewed
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => {
                                  setSelectedDocForForward(doc);
                                  setIsForwardDialogOpen(true);
                                }}
                                className="gap-1 text-xs sm:text-sm"
                              >
                                <Forward className="h-3 w-3" />
                                Forward
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleScheduleFollowUp(doc.id)}
                                className="gap-1 text-xs sm:text-sm"
                              >
                                <Clock className="h-3 w-3" />
                                <span className="hidden sm:inline">Follow-up</span><span className="sm:hidden">Follow</span>
                              </Button>
                              <Button variant="outline" size="sm" className="gap-1 text-xs sm:text-sm">
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">View Full</span><span className="sm:hidden">View</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {doc.status === "processing" && (
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                            AI is processing this document...
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Forward Dialog */}
        <Dialog open={isForwardDialogOpen} onOpenChange={setIsForwardDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Forward Document</DialogTitle>
              <DialogDescription>
                Select departments to forward "{selectedDocForForward?.title}" to:
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {["Safety", "Engineering", "Finance", "HR", "Legal", "Procurement"].map((dept) => (
                  <div key={dept} className="flex items-center space-x-2">
                    <Checkbox
                      id={dept}
                      checked={selectedDepartments.includes(dept)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedDepartments([...selectedDepartments, dept]);
                        } else {
                          setSelectedDepartments(selectedDepartments.filter(d => d !== dept));
                        }
                      }}
                    />
                    <Label htmlFor={dept}>{dept}</Label>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Optional Message</Label>
                <Textarea
                  id="message"
                  placeholder="Add a note for the recipients..."
                  value={forwardMessage}
                  onChange={(e) => setForwardMessage(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsForwardDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleForwardDocument} disabled={selectedDepartments.length === 0}>
                Forward Document
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default DocumentInbox;