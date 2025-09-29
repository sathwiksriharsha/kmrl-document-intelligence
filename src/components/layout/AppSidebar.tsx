// IMPORTANT: DO NOT CHANGE EXISTING UI CODE OR DESIGN

import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Upload,
  Inbox,
  Search,
  Users,
  Shield,
  ChevronRight,
  DollarSign,
  Building,
  Leaf,
  Scale,
  Bell,
  FileText,
  Calendar,
  TrendingUp,
  Activity,
  BookOpen,
  Settings,
  Database,
  AlertTriangle,
  Eye,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// Role-based navigation configuration
const navigationConfig = {
  admin: [
    { title: "Dashboard", url: "/home", icon: Home },
    { title: "Upload Documents", url: "/upload", icon: Upload },
    { title: "Document Inbox", url: "/documents", icon: Inbox },
    { title: "Search", url: "/search", icon: Search },
    { title: "Compliance Alerts", url: "/compliance", icon: Shield },
    { title: "Role Views", url: "/roles", icon: Users },
    { title: "Admin Panel", url: "/admin", icon: Settings },
  ],
  engineering: [
    { title: "Engineering Dashboard", url: "/engineering", icon: Home },
    { title: "Upload Reports", url: "/upload", icon: Upload },
    { title: "Document Inbox", url: "/documents", icon: Inbox },
    { title: "Search Reports", url: "/search", icon: Search },
    { title: "Safety Alerts", url: "/compliance", icon: Shield },
  ],
  finance: [
    { title: "Finance Dashboard", url: "/finance/dashboard", icon: DollarSign },
    { title: "Vendor Management", url: "/finance/vendors", icon: Building },
    { title: "Compliance Alerts", url: "/finance/compliance", icon: Shield },
    { title: "Document Search", url: "/finance/documents", icon: Search },
  ],
  hr: [
      { title: 'HR Dashboard', url: '/hr-dashboard', icon: Users },
      { title: 'Document Inbox', url: '/hr-document-inbox', icon: Inbox },
      { title: 'Compliance Alerts', url: '/hr-compliance-alerts', icon: AlertTriangle },
      { title: 'Training Tracker', url: '/hr-training-tracker', icon: Search },
    ],
    environmental: [
      { title: 'Environmental Dashboard', url: '/environmental-dashboard', icon: Leaf },
      { title: 'Compliance Docs', url: '/environmental-compliance-docs', icon: FileText },
      { title: 'Regulatory Watch', url: '/regulatory-watch', icon: Eye },
      { title: 'AI Risk Analysis', url: '/ai-risk-analysis', icon: Search },
    ],
  executives: [
    { title: "Executive Dashboard", url: "/executives", icon: Building },
    { title: "Board Meetings", url: "/executives", icon: Calendar },
    { title: "Document Inbox", url: "/documents", icon: Inbox },
    { title: "Search Documents", url: "/search", icon: Search },
    { title: "Regulatory Alerts", url: "/compliance", icon: Shield },
  ],
  manager: [
    { title: "Daily Briefs", url: "/manager/briefs", icon: FileText },
    { title: "Alerts", url: "/manager/alerts", icon: Bell },
    { title: "Quick Search", url: "/manager/search", icon: Search },
    { title: "My Tasks", url: "/manager/tasks", icon: Activity },
  ],
};

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  // Get user role from localStorage (set during login)
  const getUserRole = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      // Map department names to role keys
      const departmentToRole = {
        'Admin': 'admin',
        'Engineering & Safety': 'engineering',
        'Finance & Procurement': 'finance',
        'HR & Training': 'hr',
        'Environmental / Regulatory': 'environmental',
        'Executives & Legal': 'executives',
        'Frontline Manager': 'manager',
        'Administration': 'admin', // fallback
      };
      return departmentToRole[user.department] || 'admin';
    }
    return 'admin'; // default fallback
  };

  const userRole = getUserRole();
  const navigationItems = navigationConfig[userRole] || navigationConfig.admin;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar
      className={`transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64 sm:w-64"
      } border-r border-border bg-gradient-subtle`}
      collapsible="icon"
    >
      <SidebarContent className="p-1 sm:p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={`text-muted-foreground font-medium text-xs sm:text-sm ${isCollapsed ? 'sr-only' : ''}`}>
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5 sm:space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`
                      relative transition-all duration-200 hover:shadow-sm rounded-xl
                      ${isActive(item.url) 
                        ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                        : 'hover:bg-secondary/50 text-muted-foreground hover:text-foreground'
                      }
                    `}
                  >
                    <NavLink to={item.url} className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2">
                      <item.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isActive(item.url) ? 'text-primary' : ''}`} />
                      {!isCollapsed && (
                        <>
                          <span className="font-medium text-sm sm:text-base truncate">{item.title}</span>
                          {isActive(item.url) && (
                            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-auto text-primary flex-shrink-0" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}