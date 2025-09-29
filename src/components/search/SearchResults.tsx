import React from 'react';
import { FileText, ExternalLink, Calendar, Building, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface SearchSnippet {
  id: string;
  title: string;
  department: string;
  date: string;
  snippet: string;
  relevanceScore: number;
  documentType: string;
}

interface SearchResultsProps {
  query: string;
  results: SearchSnippet[];
  aiAnswer: string;
  isLoading: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ 
  query, 
  results, 
  aiAnswer, 
  isLoading 
}) => {
  const getDepartmentColor = (dept: string) => {
    const colors: Record<string, string> = {
      'HR': 'bg-blue-100 text-blue-800',
      'Engineering': 'bg-green-100 text-green-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
      'Safety': 'bg-red-100 text-red-800',
      'Legal': 'bg-purple-100 text-purple-800',
      'Operations': 'bg-orange-100 text-orange-800'
    };
    return colors[dept] || 'bg-gray-100 text-gray-800';
  };

  const getDocumentIcon = (type: string) => {
    return <FileText className="h-4 w-4" />;
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="animate-spin mx-auto h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
              <div className="space-y-2">
                <p className="font-medium">AI is searching through documents...</p>
                <p className="text-sm text-muted-foreground">Finding the most relevant information</p>
              </div>
              <div className="flex justify-center space-x-1">
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!query) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">No relevant documents found</h3>
                <p className="text-muted-foreground">
                  Try another query or check if the document exists in the system
                </p>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Suggestions:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Use more general terms</li>
                  <li>Check spelling and try synonyms</li>
                  <li>Try searching by department or document type</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* AI Answer Section */}
      {aiAnswer && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              AI Answer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed font-medium">{aiAnswer}</p>
          </CardContent>
        </Card>
      )}

      {/* Supporting Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Supporting Documents</span>
            <Badge variant="secondary">{results.length} results</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Accordion type="multiple" className="w-full">
            {results.map((result, index) => (
              <AccordionItem key={result.id} value={`item-${index}`} className="border-b last:border-b-0">
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-smooth">
                  <div className="flex items-center justify-between w-full mr-4">
                    <div className="flex items-center gap-3">
                      {getDocumentIcon(result.documentType)}
                      <div className="text-left">
                        <h4 className="font-medium text-sm">{result.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={getDepartmentColor(result.department)}>
                            <Building className="h-3 w-3 mr-1" />
                            {result.department}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {result.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      {Math.round(result.relevanceScore)}% match
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm leading-relaxed">{result.snippet}</p>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Full Document
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};