import { FileText, Search, Zap } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    icon: FileText,
    title: "Upload & Summarize Docs",
    description: "Upload documents in multiple formats and get AI-powered summaries instantly. Perfect for policy documents, reports, and operational guidelines.",
    actionText: "Start Uploading",
    gradient: true,
  },
  {
    icon: Search,
    title: "Search & Ask Questions",
    description: "Use natural language to search through your document library and get precise answers to specific questions about your content.",
    actionText: "Try Search",
    gradient: false,
  },
  {
    icon: Zap,
    title: "Role-Based Alerts",
    description: "Receive intelligent notifications and compliance alerts tailored to your role and responsibilities within the organization.",
    actionText: "View Alerts",
    gradient: false,
  },
];

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard 
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          actionText={feature.actionText}
          gradient={feature.gradient}
        />
      ))}
    </div>
  );
}