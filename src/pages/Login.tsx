import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Shield, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import kmrlLogo from "@/assets/kmrl-logo.png";

const departments = [
  { value: "admin", label: "Admin", route: "/home" },
  { value: "engineering", label: "Engineering & Safety", route: "/engineering" },
  { value: "finance", label: "Finance & Procurement", route: "/finance" },
  { value: "hr", label: "HR & Training", route: "/hr" },
  { value: "environmental", label: "Environmental / Regulatory", route: "/environmental" },
  { value: "executives", label: "Executives & Legal", route: "/executives" },
  { value: "manager", label: "Frontline Manager", route: "/manager" }
];

// Mock user credentials for demo purposes
const mockUsers = {
  "admin@kmrl.com": { password: "admin123", department: "admin" },
  "engineer@kmrl.com": { password: "eng123", department: "engineering" },
  "finance@kmrl.com": { password: "fin123", department: "finance" },
  "hr@kmrl.com": { password: "hr123", department: "hr" },
  "env@kmrl.com": { password: "env123", department: "environmental" },
  "exec@kmrl.com": { password: "exec123", department: "executives" },
  "manager@kmrl.com": { password: "mgr123", department: "manager" }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!email || !password || !department) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check mock credentials
    const user = mockUsers[email as keyof typeof mockUsers];
    if (user && user.password === password && user.department === department) {
      // Store user session info
      const userInfo = {
        name: departments.find(d => d.value === department)?.label + " User",
        email: email,
        department: departments.find(d => d.value === department)?.label || "Unknown"
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("isLoggedIn", "true");
      
      toast({
        title: "Login Successful",
        description: `Welcome to ${departments.find(d => d.value === department)?.label} Dashboard`,
      });

      // Redirect to department-specific dashboard
      const departmentRoute = departments.find(d => d.value === department)?.route || "/home";
      navigate(departmentRoute);
    } else {
      setError("Invalid credentials or department mismatch");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-md space-y-4 sm:space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex justify-center">
            <img 
              src={kmrlLogo} 
              alt="KMRL Logo" 
              className="h-12 sm:h-16 w-auto"
            />
          </div>
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              <span className="hidden sm:inline">Document Intelligence System</span>
              <span className="sm:hidden">KMRL Intelligence</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Sign in to access your department dashboard
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Sign In
            </CardTitle>
            <CardDescription className="text-sm">
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="email" className="text-sm">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className="h-10 sm:h-11"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    className="h-10 sm:h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-2 sm:px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="department" className="text-sm">Department</Label>
                <Select value={department} onValueChange={setDepartment} disabled={isLoading}>
                  <SelectTrigger className="h-10 sm:h-11">
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value} className="text-sm">
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full h-10 sm:h-11 text-sm sm:text-base" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="pt-6">
            <h3 className="font-medium text-sm mb-3">Demo Credentials:</h3>
            <div className="text-xs space-y-1 text-muted-foreground">
              <div><strong>Admin:</strong> admin@kmrl.com / admin123</div>
              <div><strong>Engineering:</strong> engineer@kmrl.com / eng123</div>
              <div><strong>Finance:</strong> finance@kmrl.com / fin123</div>
              <div><strong>HR:</strong> hr@kmrl.com / hr123</div>
              <div><strong>Environmental:</strong> env@kmrl.com / env123</div>
              <div><strong>Executives:</strong> exec@kmrl.com / exec123</div>
              <div><strong>Manager:</strong> manager@kmrl.com / mgr123</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;