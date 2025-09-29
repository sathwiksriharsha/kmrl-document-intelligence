import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroCard() {
  return (
    <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-primary">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Content */}
      <CardContent className="relative z-10 p-4 sm:p-8 md:p-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
            <span className="text-primary-foreground/80 font-medium text-sm sm:text-base">AI-Powered Intelligence</span>
          </div>
          
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 sm:mb-4">
            Smart Document Insights 
            <span className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl mt-1 sm:mt-2 text-primary-foreground/90">
              for Kochi Metro
            </span>
          </h1>
          
          <p className="text-sm sm:text-lg text-primary-foreground/80 mb-6 sm:mb-8 leading-relaxed">
            Transform your document workflow with AI-powered summarization, intelligent search, 
            and role-based insights. Streamline operations and enhance decision-making across 
            all departments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button 
              variant="secondary" 
              size="default"
              className="bg-background/95 text-primary hover:bg-background shadow-lg backdrop-blur-sm sm:size-lg"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="default"
              className="text-primary-foreground hover:bg-primary-foreground/10 border border-primary-foreground/20 sm:size-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}