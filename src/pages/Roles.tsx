import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RoleDocumentCard } from "@/components/roles/RoleDocumentCard";
import { RoleTimeline } from "@/components/roles/RoleTimeline";
import { Shield, Users, DollarSign, Cog, ShoppingCart, Scale } from "lucide-react";

const roles = [
  { id: "safety", name: "Safety", icon: Shield },
  { id: "hr", name: "HR", icon: Users },
  { id: "finance", name: "Finance", icon: DollarSign },
  { id: "engineering", name: "Engineering", icon: Cog },
  { id: "procurement", name: "Procurement", icon: ShoppingCart },
  { id: "legal", name: "Legal", icon: Scale }
];

const mockDocuments = {
  safety: [
    {
      title: "Safety Bulletin - Track Maintenance Alert",
      date: "March 8, 2025",
      source: "Operations Department",
      summary: [
        "Immediate inspection required for Track Section A-7",
        "Potential rail wear detected in high-traffic zones", 
        "Schedule maintenance window for March 15-17"
      ],
      riskLevel: "high" as const,
      isCritical: true,
      status: "pending" as const
    },
    {
      title: "Emergency Response Protocol Update",
      date: "March 5, 2025", 
      source: "Safety Department",
      summary: [
        "Updated evacuation procedures for underground stations",
        "New communication protocols with fire department",
        "Staff training required by March 20"
      ],
      riskLevel: "medium" as const,
      status: "reviewed" as const
    }
  ],
  hr: [
    {
      title: "Quarterly Performance Review Guidelines",
      date: "March 7, 2025",
      source: "HR Department",
      summary: [
        "Performance evaluation criteria updated for 2025",
        "New competency framework for technical staff", 
        "Deadline for completion: March 31"
      ],
      riskLevel: "low" as const,
      status: "pending" as const
    }
  ],
  finance: [
    {
      title: "Budget Allocation - Q2 2025",
      date: "March 6, 2025",
      source: "Finance Department", 
      summary: [
        "Capital expenditure approval required for new trains",
        "Cost analysis for infrastructure upgrades",
        "Board approval needed by March 25"
      ],
      riskLevel: "high" as const,
      status: "pending" as const
    }
  ],
  engineering: [
    {
      title: "Signal System Upgrade Specifications",
      date: "March 4, 2025",
      source: "Technical Department",
      summary: [
        "New automated signaling system requirements",
        "Compatibility testing with existing infrastructure",
        "Implementation timeline: 6 months"
      ],
      riskLevel: "medium" as const,
      status: "reviewed" as const
    }
  ],
  procurement: [
    {
      title: "Vendor Compliance Audit Report",
      date: "March 3, 2025",
      source: "Procurement Department",
      summary: [
        "Non-compliance issues identified with Vendor XYZ",
        "Contract renegotiation required",
        "Alternative vendor assessment recommended"
      ],
      riskLevel: "high" as const,
      isCritical: true,
      status: "pending" as const
    }
  ],
  legal: [
    {
      title: "Environmental Clearance Renewal",
      date: "March 2, 2025",
      source: "Legal Department",
      summary: [
        "Environmental permit expires April 15, 2025",
        "Renewal application submitted to authorities",
        "Compliance documentation review pending"
      ],
      riskLevel: "medium" as const,
      status: "pending" as const
    }
  ]
};

const mockTimelines = {
  safety: [
    { title: "Safety Audit Report", date: "March 15", department: "Safety", priority: "high" as const, daysLeft: 7 },
    { title: "Fire Drill Documentation", date: "March 20", department: "Safety", priority: "medium" as const, daysLeft: 12 }
  ],
  hr: [
    { title: "Annual Performance Reviews", date: "March 31", department: "HR", priority: "high" as const, daysLeft: 23 },
    { title: "Training Completion Certificates", date: "April 5", department: "HR", priority: "low" as const, daysLeft: 28 }
  ],
  finance: [
    { title: "Q1 Financial Report", date: "March 31", department: "Finance", priority: "high" as const, daysLeft: 23 }
  ],
  engineering: [
    { title: "Infrastructure Assessment", date: "March 25", department: "Engineering", priority: "medium" as const, daysLeft: 17 }
  ],
  procurement: [
    { title: "Vendor Contract Renewal", date: "March 18", department: "Procurement", priority: "high" as const, daysLeft: 10 }
  ],
  legal: [
    { title: "Environmental Permit Renewal", date: "April 15", department: "Legal", priority: "high" as const, daysLeft: 38 }
  ]
};

const Roles = () => {
  const [filter, setFilter] = useState("all");
  const [acknowledgedDocs, setAcknowledgedDocs] = useState<Set<string>>(new Set());

  const handleAcknowledge = (docTitle: string) => {
    setAcknowledgedDocs(prev => new Set([...prev, docTitle]));
  };

  const filterDocuments = (documents: any[]) => {
    if (filter === "all") return documents;
    if (filter === "critical") return documents.filter(doc => doc.isCritical);
    if (filter === "pending") return documents.filter(doc => doc.status === "pending");
    if (filter === "archived") return documents.filter(doc => acknowledgedDocs.has(doc.title));
    return documents;
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Role-Based Views</h1>
            <p className="text-muted-foreground">Department-specific document summaries and alerts</p>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter documents" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Documents</SelectItem>
              <SelectItem value="critical">Critical Only</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="archived">Acknowledged</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="safety" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <TabsTrigger key={role.id} value={role.id} className="gap-2">
                  <Icon className="h-4 w-4" />
                  {role.name}
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {roles.map((role) => (
            <TabsContent key={role.id} value={role.id} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-xl font-semibold">{role.name} Documents</h2>
                  {filterDocuments(mockDocuments[role.id as keyof typeof mockDocuments] || []).map((doc, index) => (
                    <RoleDocumentCard
                      key={index}
                      {...doc}
                      status={acknowledgedDocs.has(doc.title) ? "acknowledged" : doc.status}
                      onAcknowledge={() => handleAcknowledge(doc.title)}
                    />
                  ))}
                  {filterDocuments(mockDocuments[role.id as keyof typeof mockDocuments] || []).length === 0 && (
                    <p className="text-muted-foreground text-center py-8">No documents match the current filter.</p>
                  )}
                </div>
                <div>
                  <RoleTimeline events={mockTimelines[role.id as keyof typeof mockTimelines] || []} />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Roles;