import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HeroCard } from "@/components/dashboard/HeroCard";
import { FeatureGrid } from "@/components/dashboard/FeatureGrid";
import { AnalyticsWidget } from "@/components/dashboard/AnalyticsWidget";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-8">
        {/* Hero Section */}
        <section className="mb-4 sm:mb-8">
          <HeroCard />
        </section>

        {/* Analytics Section */}
        <section className="mb-4 sm:mb-8">
          <AnalyticsWidget />
        </section>

        {/* Features Section */}
        <section>
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
              Key Features
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Discover how our AI-powered platform can transform your document management workflow
            </p>
          </div>
          <FeatureGrid />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Index;
