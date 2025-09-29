import React, { useState, useEffect } from 'react';
import { Brain, Clock, AlertTriangle, CheckCircle2, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface UploadedFile {
  file: File;
  preview?: string;
}

interface AISummaryPanelProps {
  uploadedFile: UploadedFile | null;
}

interface SummaryData {
  keyPoints: string[];
  criticalAlerts: { message: string; priority: 'high' | 'medium' }[];
  actionSuggestions: string[];
  confidence: number;
}

export const AISummaryPanel: React.FC<AISummaryPanelProps> = ({ uploadedFile }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<SummaryData | null>(null);

  useEffect(() => {
    if (uploadedFile) {
      setIsProcessing(true);
      setSummary(null);
      
      // Simulate AI processing
      const timer = setTimeout(() => {
        // Mock summary data based on file type
        const mockSummary: SummaryData = {
          keyPoints: [
            "Safety inspection report for Kochi Metro Line 1",
            "Overall compliance rating: 92% (Excellent)",
            "Minor maintenance required for 3 stations",
            "Passenger feedback shows 95% satisfaction rate",
            "Emergency systems tested and operational"
          ],
          criticalAlerts: [
            { 
              message: "Track maintenance due by March 15, 2024", 
              priority: 'high' as const
            },
            { 
              message: "Staff safety training renewal required", 
              priority: 'medium' as const
            }
          ],
          actionSuggestions: [
            "Schedule track maintenance within 30 days",
            "Forward to Safety Department for review",
            "Update compliance dashboard",
            "Notify station managers of minor issues"
          ],
          confidence: 94
        };
        
        setSummary(mockSummary);
        setIsProcessing(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [uploadedFile]);

  if (!uploadedFile) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI-Generated Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center space-y-2">
            <Brain className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">Upload a document to see AI analysis</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isProcessing) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary animate-pulse" />
            AI-Generated Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="animate-spin mx-auto h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
              <Brain className="absolute inset-0 m-auto h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="font-medium">AI is analyzing your document...</p>
              <p className="text-sm text-muted-foreground">This may take a few moments</p>
            </div>
            <div className="flex justify-center space-x-1">
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (summary) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI-Generated Summary
            </div>
            <Badge variant="secondary">
              {summary.confidence}% Confidence
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 max-h-96 overflow-y-auto">
          {/* Key Points */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Key Points
            </h3>
            <ul className="space-y-2">
              {summary.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Critical Alerts */}
          {summary.criticalAlerts.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                Critical Alerts
              </h3>
              <div className="space-y-2">
                {summary.criticalAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.priority === 'high'
                        ? 'bg-destructive/10 border-l-destructive'
                        : 'bg-yellow-50 border-l-yellow-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`h-4 w-4 ${
                        alert.priority === 'high' ? 'text-destructive' : 'text-yellow-600'
                      }`} />
                      <span className="text-sm font-medium">{alert.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Suggestions */}
          {summary.actionSuggestions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                Action Suggestions
              </h3>
              <div className="space-y-2">
                {summary.actionSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-3 bg-accent/10 border-l-4 border-l-accent rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button className="w-full" variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Full Document
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
};