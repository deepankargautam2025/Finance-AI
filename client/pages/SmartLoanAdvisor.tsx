import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Home,
  Search,
  CreditCard,
  Calculator,
  MessageCircle,
  User,
  Bell,
  Settings,
  Shield,
  TrendingUp,
  Zap,
  Sparkles,
  Target,
  Award,
  Wallet,
  BarChart3,
  PieChart,
  Activity,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: string;
  description: string;
}

const navigationItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    path: "/smart-dashboard",
    description: "Financial health overview",
  },
  {
    id: "discover",
    label: "Discover Loans",
    icon: Search,
    path: "/loan-discovery",
    badge: "AI",
    description: "Find perfect loan matches",
  },
  {
    id: "my-loans",
    label: "My Loans",
    icon: CreditCard,
    path: "/loan-portfolio",
    description: "Manage your loans",
  },
  {
    id: "emi-planner",
    label: "EMI Planner",
    icon: Calculator,
    path: "/emi-planner",
    description: "Smart debt planning",
  },
  {
    id: "ai-assistant",
    label: "AI Assistant",
    icon: MessageCircle,
    path: "/ai-chat",
    badge: "NEW",
    description: "24/7 financial advisor",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    path: "/smart-profile",
    description: "Settings & security",
  },
];

export default function SmartLoanAdvisor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const currentPath = location.pathname;
  const activeItem =
    navigationItems.find((item) => currentPath.includes(item.id)) ||
    navigationItems[0];

  const handleNavigation = (item: NavItem) => {
    setActiveTab(item.id);
    navigate(item.path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-3xl bg-white/80">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-primary to-mint-fresh flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-teal-primary to-mint-fresh bg-clip-text text-transparent">
                  SmartLoan Advisor
                </h1>
                <p className="text-xs text-muted-foreground">
                  AI-Powered Financial Health
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={`relative px-4 py-2 h-auto rounded-2xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-teal-primary/10 to-mint-fresh/10 text-teal-primary border border-teal-primary/20"
                        : "hover:bg-white/50 text-foreground/70 hover:text-foreground"
                    }`}
                    onClick={() => handleNavigation(item)}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <Badge className="text-xs px-1.5 py-0.5 bg-gradient-to-r from-teal-primary to-mint-fresh text-white">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-teal-primary to-mint-fresh rounded-full"></div>
                    )}
                  </Button>
                );
              })}
            </nav>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex glass-button rounded-2xl"
              >
                <Bell className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex glass-button rounded-2xl"
              >
                <Settings className="w-4 h-4" />
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden glass-button rounded-2xl"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-16 w-80 h-full bg-white/95 backdrop-blur-3xl border-l border-border/50 shadow-2xl">
            <div className="p-6 space-y-4">
              <div className="text-sm font-medium text-muted-foreground mb-4">
                Navigation
              </div>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={`w-full justify-start p-4 h-auto rounded-2xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-teal-primary/10 to-mint-fresh/10 text-teal-primary border border-teal-primary/20"
                        : "hover:bg-white/50"
                    }`}
                    onClick={() => handleNavigation(item)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isActive ? "bg-teal-primary/20" : "bg-muted/50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <Badge className="text-xs px-1.5 py-0.5 bg-gradient-to-r from-teal-primary to-mint-fresh text-white">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center">
              <activeItem.icon className="w-6 h-6 text-teal-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-primary to-mint-fresh bg-clip-text text-transparent">
                {activeItem.label}
              </h1>
              <p className="text-muted-foreground">{activeItem.description}</p>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Home className="w-4 h-4" />
            <ChevronRight className="w-4 h-4" />
            <span className="text-teal-primary font-medium">
              {activeItem.label}
            </span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-3xl animate-slide-in-up">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-teal-primary/20 to-mint-fresh/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-teal-primary" />
                </div>
                <Badge className="bg-success/20 text-success">+12%</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Financial Score
                </p>
                <p className="text-2xl font-bold text-teal-primary">785</p>
                <p className="text-xs text-muted-foreground">Good Health</p>
              </div>
            </div>

            <div
              className="glass-card p-6 rounded-3xl animate-slide-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-success/20 to-emerald-500/20 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-success" />
                </div>
                <Badge className="bg-success/20 text-success">Active</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Available Credit
                </p>
                <p className="text-2xl font-bold text-success">₹8.5L</p>
                <p className="text-xs text-muted-foreground">3 Pre-approved</p>
              </div>
            </div>

            <div
              className="glass-card p-6 rounded-3xl animate-slide-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-warning/20 to-orange-500/20 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-warning" />
                </div>
                <Badge className="bg-warning/20 text-warning">Due Soon</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total EMIs</p>
                <p className="text-2xl font-bold text-warning">₹45,500</p>
                <p className="text-xs text-muted-foreground">Next: 5 days</p>
              </div>
            </div>

            <div
              className="glass-card p-6 rounded-3xl animate-slide-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-primary/20 to-blue-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <Badge className="bg-primary/20 text-primary">On Track</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Savings Goal
                </p>
                <p className="text-2xl font-bold text-primary">68%</p>
                <p className="text-xs text-muted-foreground">₹2.1L saved</p>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI Loan Discovery */}
            <div
              className="glass-card p-8 rounded-3xl animate-slide-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-teal-primary/20 to-mint-fresh/20 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-teal-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">AI Loan Discovery</h3>
                  <p className="text-muted-foreground">
                    Find perfect loans with AI matching
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 glass-card rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-success">HD</span>
                    </div>
                    <div>
                      <p className="font-medium">HDFC Personal Loan</p>
                      <p className="text-xs text-muted-foreground">
                        9.5% • ₹10L • 84 months
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-success/20 text-success">
                    98% Match
                  </Badge>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-teal-primary to-mint-fresh rounded-2xl py-3 h-auto"
                  onClick={() => navigate("/loan-discovery")}
                >
                  Discover More Loans
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Smart EMI Planner */}
            <div
              className="glass-card p-8 rounded-3xl animate-slide-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Calculator className="w-8 h-8 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Smart EMI Planner</h3>
                  <p className="text-muted-foreground">
                    Optimize your debt strategy
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 glass-card rounded-2xl">
                    <p className="text-sm text-muted-foreground">
                      Potential Savings
                    </p>
                    <p className="text-xl font-bold text-success">₹1.2L</p>
                  </div>
                  <div className="text-center p-4 glass-card rounded-2xl">
                    <p className="text-sm text-muted-foreground">
                      Refinance Options
                    </p>
                    <p className="text-xl font-bold text-primary">3</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full glass-button rounded-2xl py-3 h-auto"
                  onClick={() => navigate("/emi-planner")}
                >
                  Plan Your EMIs
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Gamification Section */}
          <div
            className="glass-card p-8 rounded-3xl animate-slide-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                  <Award className="w-8 h-8 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Financial Achievements</h3>
                  <p className="text-muted-foreground">
                    Your progress & rewards
                  </p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2">
                Level 5 Expert
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 glass-card rounded-2xl">
                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-success/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-success" />
                </div>
                <h4 className="font-semibold mb-2">Payment Perfectionist</h4>
                <p className="text-sm text-muted-foreground">
                  12 months on-time payments
                </p>
                <Badge className="mt-2 bg-success/20 text-success">
                  Unlocked
                </Badge>
              </div>

              <div className="text-center p-6 glass-card rounded-2xl">
                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Score Booster</h4>
                <p className="text-sm text-muted-foreground">
                  Improved by 50+ points
                </p>
                <Badge className="mt-2 bg-primary/20 text-primary">
                  In Progress
                </Badge>
              </div>

              <div className="text-center p-6 glass-card rounded-2xl">
                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-muted/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-muted-foreground" />
                </div>
                <h4 className="font-semibold mb-2">Debt Free Hero</h4>
                <p className="text-sm text-muted-foreground">
                  Pay off all loans
                </p>
                <Badge className="mt-2 bg-muted/20 text-muted-foreground">
                  Locked
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating AI Assistant */}
      <Button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-teal-primary to-mint-fresh shadow-2xl hover:scale-110 transition-all duration-300 z-50"
        onClick={() => navigate("/ai-chat")}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    </div>
  );
}
