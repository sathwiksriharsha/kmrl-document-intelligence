import React, { useState } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResults } from '@/components/search/SearchResults';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { BookOpen, Pin, MessageSquare, Star, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SearchSnippet {
  id: string;
  title: string;
  department: string;
  date: string;
  snippet: string;
  relevanceScore: number;
  documentType: string;
}

interface KnowledgeVaultItem {
  id: string;
  title: string;
  summary: string;
  roleTags: string[];
  priority: "High Risk" | "Urgent" | "Normal";
  sourceRef: string;
  createdAt: string;
  isPinned: boolean;
  annotation?: string;
}

const mockKnowledgeVault: KnowledgeVaultItem[] = [
  {
    id: "1",
    title: "Safety Protocol Update - Track Maintenance",
    summary: "New safety protocols for track maintenance operations. Key changes include mandatory equipment checks, updated emergency procedures, and revised communication protocols during maintenance windows.",
    roleTags: ["Safety", "Engineering"],
    priority: "High Risk",
    sourceRef: "Email - Safety Circular 2025-001",
    createdAt: "2025-09-06T14:30:00Z",
    isPinned: true,
    annotation: "Critical for Q4 implementation"
  },
  {
    id: "2",
    title: "Engineering Design Change",
    summary: "Work order for signal system repair at Kakkanad station. Estimated completion time: 6 hours. Requires specialized technician and backup signal equipment from approved vendors.",
    roleTags: ["Engineering", "Procurement"],
    priority: "Urgent",
    sourceRef: "Maximo Work Order - WO-2025-0892",
    createdAt: "2025-09-06T10:15:00Z",
    isPinned: false
  },
  {
    id: "3",
    title: "Board Meeting Minutes - Q3 Review",
    summary: "Monthly board meeting minutes covering policy updates, HR initiatives, and legal compliance matters. New employee benefits program approved for implementation.",
    roleTags: ["Legal", "HR", "Finance"],
    priority: "Normal",
    sourceRef: "SharePoint - Board Minutes Sept 2025",
    createdAt: "2025-09-05T16:45:00Z",
    isPinned: false,
    annotation: "Follow up on benefits implementation timeline"
  }
];

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<SearchSnippet[]>([]);
  const [aiAnswer, setAiAnswer] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("search");
  const [knowledgeVault, setKnowledgeVault] = useState(mockKnowledgeVault);
  const [vaultFilter, setVaultFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState<KnowledgeVaultItem | null>(null);
  const [annotation, setAnnotation] = useState("");
  const [isAnnotationDialogOpen, setIsAnnotationDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (query: string, filter: string) => {
    setIsLoading(true);
    setCurrentQuery(query);
    setSearchResults([]);
    setAiAnswer('');

    // Simulate AI search process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock search results
    const mockResults: SearchSnippet[] = [
      {
        id: '1',
        title: 'Safety Inspection Report - January 2024',
        department: 'Safety',
        date: '2024-01-15',
        snippet: 'Monthly safety inspection completed for all metro stations. Overall compliance rating at 95%. Minor issues identified at Aluva and Edappally stations requiring immediate attention.',
        relevanceScore: 94,
        documentType: 'pdf'
      },
      {
        id: '2',
        title: 'HR Policy Update - Remote Work Guidelines',
        department: 'HR',
        date: '2024-01-10',
        snippet: 'Updated remote work policy effective February 1st, 2024. All employees eligible for hybrid work arrangements. New guidelines for equipment allocation and performance metrics.',
        relevanceScore: 87,
        documentType: 'docx'
      },
      {
        id: '3',
        title: 'Maintenance Schedule Q1 2024',
        department: 'Engineering',
        date: '2024-01-05',
        snippet: 'Quarterly maintenance schedule for all metro lines. Track maintenance scheduled for weekends. Signal system upgrades planned for February. Estimated downtime: 4 hours per session.',
        relevanceScore: 82,
        documentType: 'pdf'
      }
    ];

    const mockAiAnswer = `Based on the search through ${mockResults.length} documents, I found information about ${query.toLowerCase()}. The most relevant documents show current safety compliance at 95%, with minor maintenance needed at specific stations. All safety protocols are up to date and emergency systems are operational.`;

    setSearchResults(mockResults);
    setAiAnswer(mockAiAnswer);
    setIsLoading(false);
  };

  const handlePinItem = (itemId: string) => {
    setKnowledgeVault(prev => prev.map(item => 
      item.id === itemId ? { ...item, isPinned: !item.isPinned } : item
    ));
    toast({
      title: "Item Updated",
      description: "Knowledge vault item has been updated.",
    });
  };

  const handleAnnotateItem = (item: KnowledgeVaultItem) => {
    setSelectedItem(item);
    setAnnotation(item.annotation || "");
    setIsAnnotationDialogOpen(true);
  };

  const saveAnnotation = () => {
    if (selectedItem) {
      setKnowledgeVault(prev => prev.map(item => 
        item.id === selectedItem.id ? { ...item, annotation } : item
      ));
      toast({
        title: "Annotation Saved",
        description: "Your annotation has been saved to the knowledge vault.",
      });
      setIsAnnotationDialogOpen(false);
      setSelectedItem(null);
      setAnnotation("");
    }
  };

  const filteredVaultItems = knowledgeVault.filter(item => {
    if (vaultFilter === "All") return true;
    if (vaultFilter === "Pinned") return item.isPinned;
    return item.roleTags.includes(vaultFilter);
  });

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Search & Knowledge Management</h1>
          <p className="text-muted-foreground text-lg">
            Search through your document library and manage your knowledge vault
          </p>
        </div>

        {/* Search Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Document Search</TabsTrigger>
            <TabsTrigger value="vault" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Knowledge Vault
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-8">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            <SearchResults 
              query={currentQuery}
              results={searchResults}
              aiAnswer={aiAnswer}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="vault" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Knowledge Vault</h2>
                <p className="text-muted-foreground">Saved AI summaries and annotations</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant={vaultFilter === "All" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setVaultFilter("All")}
                >
                  All
                </Button>
                <Button 
                  variant={vaultFilter === "Pinned" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setVaultFilter("Pinned")}
                >
                  <Pin className="h-4 w-4 mr-1" />
                  Pinned
                </Button>
                {["Safety", "Engineering", "Finance", "HR", "Legal"].map(role => (
                  <Button 
                    key={role}
                    variant={vaultFilter === role ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setVaultFilter(role)}
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {filteredVaultItems.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Items Found</h3>
                    <p className="text-muted-foreground">No knowledge vault items match your current filter.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredVaultItems.map((item) => (
                  <Card key={item.id} className="transition-all hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start gap-2">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            {item.isPinned && <Pin className="h-4 w-4 text-primary mt-1" />}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={item.priority === "High Risk" ? "destructive" : item.priority === "Urgent" ? "default" : "outline"}
                              className="text-xs"
                            >
                              {item.priority}
                            </Badge>
                            {item.roleTags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.summary}
                          </p>

                          {item.annotation && (
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <h5 className="text-xs font-medium mb-1">Personal Note:</h5>
                              <p className="text-sm text-muted-foreground">{item.annotation}</p>
                            </div>
                          )}

                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{item.sourceRef}</span>
                            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePinItem(item.id)}
                            className="gap-1"
                          >
                            <Pin className="h-3 w-3" />
                            {item.isPinned ? "Unpin" : "Pin"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAnnotateItem(item)}
                            className="gap-1"
                          >
                            <MessageSquare className="h-3 w-3" />
                            Note
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Annotation Dialog */}
        <Dialog open={isAnnotationDialogOpen} onOpenChange={setIsAnnotationDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Personal Note</DialogTitle>
              <DialogDescription>
                Add your personal notes or insights about "{selectedItem?.title}"
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="annotation">Your Note</Label>
                <Textarea
                  id="annotation"
                  placeholder="Add your thoughts, insights, or follow-up actions..."
                  value={annotation}
                  onChange={(e) => setAnnotation(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAnnotationDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveAnnotation}>
                Save Note
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default SearchPage;