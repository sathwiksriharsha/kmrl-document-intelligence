import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import DocumentInbox from "./pages/DocumentInbox";
import SearchPage from "./pages/SearchPage";
import Roles from "./pages/Roles";
import Compliance from "./pages/Compliance";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminDashboard from "./pages/roles/AdminDashboard";
import EngineeringDashboard from "./pages/roles/EngineeringDashboard";
import FinanceDashboard from "./pages/roles/FinanceDashboard";
import HRDashboard from "./pages/roles/HRDashboard";
import EnvironmentalDashboard from "./pages/roles/EnvironmentalDashboard";
import ExecutivesDashboard from "./pages/roles/ExecutivesDashboard";
import ManagerDashboard from "./pages/roles/ManagerDashboard";
import DailyBriefs from "./pages/manager/DailyBriefs";
import ManagerAlerts from "./pages/manager/ManagerAlerts";
import QuickSearch from "./pages/manager/QuickSearch";
import MyTasks from "./pages/manager/MyTasks";
import FinanceDashboardPage from "./pages/finance/FinanceDashboard";
import VendorManagement from "./pages/finance/VendorManagement";
import FinanceComplianceAlerts from "./pages/finance/FinanceComplianceAlerts";
import FinanceDocumentSearch from "./pages/finance/FinanceDocumentSearch";
import HRDashboardPage from "./pages/hr/HRDashboardPage";
import HRDocumentInbox from "./pages/hr/HRDocumentInbox";
import HRComplianceAlerts from "./pages/hr/HRComplianceAlerts";
import HRTrainingTracker from "./pages/hr/HRTrainingTracker";
import EnvironmentalDashboardPage from "./pages/environmental/EnvironmentalDashboard";
import EnvironmentalComplianceDocs from "./pages/environmental/EnvironmentalComplianceDocs";
import RegulatoryWatch from "./pages/environmental/RegulatoryWatch";
import AIRiskAnalysis from "./pages/environmental/AIRiskAnalysis";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Index />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/documents" element={<DocumentInbox />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/compliance" element={<Compliance />} />
          
          {/* Role-specific dashboard routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/engineering" element={<EngineeringDashboard />} />
          <Route path="/finance" element={<FinanceDashboard />} />
          <Route path="/hr" element={<HRDashboard />} />
          <Route path="/environmental" element={<EnvironmentalDashboard />} />
          <Route path="/executives" element={<ExecutivesDashboard />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          
          {/* Manager specific page routes */}
          <Route path="/manager/briefs" element={<DailyBriefs />} />
          <Route path="/manager/alerts" element={<ManagerAlerts />} />
          <Route path="/manager/search" element={<QuickSearch />} />
          <Route path="/manager/tasks" element={<MyTasks />} />
          
          {/* Finance specific page routes */}
          <Route path="/finance/dashboard" element={<FinanceDashboardPage />} />
          <Route path="/finance/vendors" element={<VendorManagement />} />
          <Route path="/finance/compliance" element={<FinanceComplianceAlerts />} />
          <Route path="/finance/documents" element={<FinanceDocumentSearch />} />
          
          {/* HR specific page routes */}
          <Route path="/hr-dashboard" element={<HRDashboardPage />} />
          <Route path="/hr-document-inbox" element={<HRDocumentInbox />} />
          <Route path="/hr-compliance-alerts" element={<HRComplianceAlerts />} />
          <Route path="/hr-training-tracker" element={<HRTrainingTracker />} />
          
          {/* Environmental specific page routes */}
          <Route path="/environmental-dashboard" element={<EnvironmentalDashboardPage />} />
          <Route path="/environmental-compliance-docs" element={<EnvironmentalComplianceDocs />} />
          <Route path="/regulatory-watch" element={<RegulatoryWatch />} />
          <Route path="/ai-risk-analysis" element={<AIRiskAnalysis />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
