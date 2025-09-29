import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, Bell, Settings, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import kmrlLogo from "@/assets/kmrl-logo.png";

// Role-based dashboard titles
const dashboardTitles = {
  admin: "Document Intelligence System",
  engineering: "Engineering & Safety Intelligence",
  finance: "Finance & Procurement Intelligence", 
  hr: "HR & Training Intelligence",
  environmental: "Environmental Intelligence System",
  executives: "Executive Intelligence Dashboard",
  manager: "Frontline Manager Intelligence",
};

export function Header() {
  const navigate = useNavigate();

  // Get user info from localStorage (set during login)
  const getUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return {
      name: 'Admin User',
      email: 'admin@kmrl.com',
      department: 'Administration'
    };
  };

  // Get user role for dashboard title
  const getUserRole = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      const departmentToRole = {
        'Admin': 'admin',
        'Engineering & Safety': 'engineering',
        'Finance & Procurement': 'finance',
        'HR & Training': 'hr',
        'Environmental / Regulatory': 'environmental',
        'Executives & Legal': 'executives',
        'Frontline Manager': 'manager',
        'Administration': 'admin',
      };
      return departmentToRole[user.department] || 'admin';
    }
    return 'admin';
  };

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isLoggedIn');
    // Redirect to login page
    navigate('/login');
  };

  const user = getUserInfo();
  const userRole = getUserRole();
  const dashboardTitle = dashboardTitles[userRole] || dashboardTitles.admin;

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-full items-center justify-between px-3 sm:px-6">
        {/* Left Section - Sidebar trigger + Logo + Title */}
        <div className="flex items-center gap-2 sm:gap-4">
          <SidebarTrigger className="hover:bg-secondary" />
          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              src={kmrlLogo} 
              alt="KMRL Logo" 
              className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg shadow-sm"
            />
            <div className="flex flex-col">
              <h1 className="text-sm sm:text-lg font-semibold text-foreground truncate max-w-[150px] sm:max-w-none">
                {dashboardTitle}
              </h1>
              <span className="text-xs text-muted-foreground hidden sm:block">
                Kochi Metro Rail Limited
              </span>
            </div>
          </div>
        </div>

        {/* Right Section - Notifications + Profile */}
        <div className="flex items-center gap-1 sm:gap-3">
          <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-10 sm:w-10">
            <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-accent rounded-full"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 sm:gap-2 h-auto p-1 sm:p-2">
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col text-sm text-left">
                  <span className="font-medium text-foreground">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.department}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}