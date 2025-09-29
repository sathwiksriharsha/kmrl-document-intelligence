import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText: string;
  gradient?: boolean;
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  actionText,
  gradient = false 
}: FeatureCardProps) {
  return (
    <Card className={`
      group relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:border-primary/20
      ${gradient ? 'bg-gradient-subtle' : 'bg-card'}
    `}>
      <CardHeader className="pb-4">
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110
          ${gradient ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}
        `}>
          <Icon className="h-6 w-6" />
        </div>
        
        <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Button 
          variant="ghost" 
          className="w-full justify-between text-primary hover:bg-primary/5 hover:text-primary-dark p-0 h-auto"
        >
          <span className="font-medium">{actionText}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}