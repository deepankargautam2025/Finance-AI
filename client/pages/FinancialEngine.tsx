import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Shield,
  AlertTriangle,
  CheckCircle,
  Brain,
  Zap,
  Target,
  PieChart as PieChartIcon,
  BarChart3,
  Activity,
  DollarSign,
  CreditCard,
  Wallet,
  Calculator,
  Bell,
  RefreshCw,
  Eye,
  Lightbulb,
  Award,
  Timer,
  MapPin,
  Car,
  Home,
  Receipt,
  MessageCircle,
  Star,
  Banknote,
} from "lucide-react";

interface FinancialHealth {
  overallScore: number;
  category: "excellent" | "good" | "fair" | "poor";
  incomeStability: number;
  expensePattern: number;
  savingsRate: number;
  debtToIncomeRatio: number;
  creditUtilization: number;
  paymentHistory: number;
  riskLevel: "low" | "medium" | "high";
  lastUpdated: Date;
}

interface SpendingCategory {
  name: string;
  amount: number;
  percentage: number;
  trend: "up" | "down" | "stable";
  color: string;
}

interface LoanPortfolio {
  id: string;
  type: string;
  provider: string;
  principal: number;
  outstanding: number;
  interestRate: number;
  emi: number;
  tenure: number;
  remaining: number;
  nextDue: Date;
  status: "active" | "overdue" | "closed";
}

interface RiskAlert {
  id: string;
  type: "emi_ratio" | "spending_spike" | "credit_utilization" | "payment_due";
  severity: "low" | "medium" | "high";
  message: string;
  action: string;
  timestamp: Date;
}

interface LoanCalculation {
  loanAmount: number;
  interestRate: number;
  tenure: number;
  emi: number;
  totalInterest: number;
  totalAmount: number;
}

interface AIResponse {
  id: string;
  message: string;
  timestamp: Date;
  type: "suggestion" | "alert" | "info";
}

export default function FinancialEngine() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeMainTab, setActiveMainTab] = useState("overview");

  // Calculator States
  const [emiCalculator, setEmiCalculator] = useState<LoanCalculation>({
    loanAmount: 1000000,
    interestRate: 10.5,
    tenure: 60,
    emi: 0,
    totalInterest: 0,
    totalAmount: 0,
  });

  const [carLoanCalculator, setCarLoanCalculator] = useState<LoanCalculation>({
    loanAmount: 800000,
    interestRate: 9.5,
    tenure: 60,
    emi: 0,
    totalInterest: 0,
    totalAmount: 0,
  });

  const [homeLoanCalculator, setHomeLoanCalculator] = useState<LoanCalculation>(
    {
      loanAmount: 5000000,
      interestRate: 8.5,
      tenure: 240,
      emi: 0,
      totalInterest: 0,
      totalAmount: 0,
    },
  );

  // AI Chat State
  const [aiResponses] = useState<AIResponse[]>([
    {
      id: "1",
      message:
        "Based on your financial profile, you can save ���12,000 annually by refinancing your car loan to a better rate of 8.2%.",
      timestamp: new Date(),
      type: "suggestion",
    },
    {
      id: "2",
      message:
        "Your debt-to-income ratio is healthy at 35%. Consider increasing your SIP by ₹5,000 to accelerate wealth building.",
      timestamp: new Date(Date.now() - 60000),
      type: "info",
    },
    {
      id: "3",
      message:
        "Alert: Your next EMI of ₹35,000 is due in 3 days. Ensure sufficient balance in your account.",
      timestamp: new Date(Date.now() - 120000),
      type: "alert",
    },
  ]);

  // Financial Health Data
  const [financialHealth] = useState<FinancialHealth>({
    overallScore: 785,
    category: "good",
    incomeStability: 92,
    expensePattern: 78,
    savingsRate: 85,
    debtToIncomeRatio: 35,
    creditUtilization: 45,
    paymentHistory: 95,
    riskLevel: "low",
    lastUpdated: new Date(),
  });

  // Spending Data
  const [spendingData] = useState<SpendingCategory[]>([
    {
      name: "EMIs",
      amount: 25000,
      percentage: 45,
      trend: "stable",
      color: "#ef4444",
    },
    {
      name: "Groceries",
      amount: 8000,
      percentage: 14,
      trend: "up",
      color: "#f97316",
    },
    {
      name: "Utilities",
      amount: 6000,
      percentage: 11,
      trend: "stable",
      color: "#eab308",
    },
    {
      name: "Entertainment",
      amount: 5000,
      percentage: 9,
      trend: "down",
      color: "#22c55e",
    },
    {
      name: "Transport",
      amount: 4500,
      percentage: 8,
      trend: "up",
      color: "#3b82f6",
    },
    {
      name: "Healthcare",
      amount: 3000,
      percentage: 5,
      trend: "stable",
      color: "#8b5cf6",
    },
    {
      name: "Others",
      amount: 4500,
      percentage: 8,
      trend: "stable",
      color: "#6b7280",
    },
  ]);

  // Loan Portfolio
  const [loanPortfolio] = useState<LoanPortfolio[]>([
    {
      id: "1",
      type: "Home Loan",
      provider: "HDFC Bank",
      principal: 5000000,
      outstanding: 3500000,
      interestRate: 8.5,
      emi: 35000,
      tenure: 240,
      remaining: 168,
      nextDue: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: "active",
    },
    {
      id: "2",
      type: "Car Loan",
      provider: "Bajaj Finserv",
      principal: 800000,
      outstanding: 420000,
      interestRate: 9.2,
      emi: 18000,
      tenure: 60,
      remaining: 24,
      nextDue: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      status: "active",
    },
    {
      id: "3",
      type: "Personal Loan",
      provider: "Navi",
      principal: 300000,
      outstanding: 85000,
      interestRate: 11.5,
      emi: 8500,
      tenure: 36,
      remaining: 10,
      nextDue: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      status: "active",
    },
  ]);

  // Risk Alerts
  const [riskAlerts] = useState<RiskAlert[]>([
    {
      id: "1",
      type: "emi_ratio",
      severity: "medium",
      message:
        "Your EMI-to-income ratio is 65%. Consider refinancing to reduce burden.",
      action: "View Refinancing Options",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "spending_spike",
      severity: "low",
      message: "Entertainment spending increased by 25% this month.",
      action: "Set Budget Limit",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "3",
      type: "payment_due",
      severity: "high",
      message: "Car loan EMI due in 3 days (₹18,000).",
      action: "Pay Now",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ]);

  // Income trend data for chart
  const incomeData = [
    { month: "Jan", income: 75000, expenses: 45000, savings: 30000 },
    { month: "Feb", income: 80000, expenses: 48000, savings: 32000 },
    { month: "Mar", income: 85000, expenses: 52000, savings: 33000 },
    { month: "Apr", income: 85000, expenses: 50000, savings: 35000 },
    { month: "May", income: 90000, expenses: 54000, savings: 36000 },
    { month: "Jun", income: 95000, expenses: 56000, savings: 39000 },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);

    // Initialize calculators
    updateEmiCalculator("loanAmount", emiCalculator.loanAmount);
    updateCarLoanCalculator("loanAmount", carLoanCalculator.loanAmount);
    updateHomeLoanCalculator("loanAmount", homeLoanCalculator.loanAmount);

    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-fresh-green";
    if (score >= 60) return "text-lime-green";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-destructive bg-destructive/10 text-destructive";
      case "medium":
        return "border-warning bg-warning/10 text-warning";
      case "low":
        return "border-primary bg-primary/10 text-primary";
      default:
        return "border-muted bg-muted/10 text-muted-foreground";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  // Calculator Functions
  const calculateLoan = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / (12 * 100);
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
    };
  };

  const updateEmiCalculator = (field: string, value: number) => {
    const updated = { ...emiCalculator, [field]: value };
    const result = calculateLoan(
      updated.loanAmount,
      updated.interestRate,
      updated.tenure,
    );
    setEmiCalculator({ ...updated, ...result });
  };

  const updateCarLoanCalculator = (field: string, value: number) => {
    const updated = { ...carLoanCalculator, [field]: value };
    const result = calculateLoan(
      updated.loanAmount,
      updated.interestRate,
      updated.tenure,
    );
    setCarLoanCalculator({ ...updated, ...result });
  };

  const updateHomeLoanCalculator = (field: string, value: number) => {
    const updated = { ...homeLoanCalculator, [field]: value };
    const result = calculateLoan(
      updated.loanAmount,
      updated.interestRate,
      updated.tenure,
    );
    setHomeLoanCalculator({ ...updated, ...result });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass-card p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full glass-card flex items-center justify-center">
              <Brain className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold">
              AI Analyzing Your Financial Health
            </h3>
            <p className="text-muted-foreground">
              Processing your financial data...
            </p>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="glass-button rounded-2xl"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">
                  AI Financial Health Engine
                </h1>
                <p className="text-sm text-muted-foreground">
                  Real-time analysis powered by advanced AI
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-success/20 text-success border-success/30">
                <Activity className="w-3 h-3 mr-1" />
                Live Analysis
              </Badge>
              <Button className="glass-button rounded-2xl px-4">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Top Navigation Tabs */}
        <Tabs
          value={activeMainTab}
          onValueChange={setActiveMainTab}
          className="space-y-6"
        >
          <div className="glass-card p-1 rounded-3xl mb-8">
            <TabsList className="w-full h-auto bg-transparent p-1 grid grid-cols-2 md:grid-cols-6 gap-1">
              <TabsTrigger
                value="overview"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-primary/20 data-[state=active]:to-mint-fresh/20 data-[state=active]:text-teal-primary rounded-2xl px-4 py-3 h-auto"
              >
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">Health Engine</span>
              </TabsTrigger>
              <TabsTrigger
                value="ai-advisor"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-primary/20 data-[state=active]:to-mint-fresh/20 data-[state=active]:text-teal-primary rounded-2xl px-4 py-3 h-auto"
              >
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">AI Advisor</span>
              </TabsTrigger>
              <TabsTrigger
                value="credit-score"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-primary/20 data-[state=active]:to-mint-fresh/20 data-[state=active]:text-teal-primary rounded-2xl px-4 py-3 h-auto"
              >
                <Star className="w-4 h-4" />
                <span className="hidden sm:inline">Credit Score</span>
              </TabsTrigger>
              <TabsTrigger
                value="bill-pay"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-primary/20 data-[state=active]:to-mint-fresh/20 data-[state=active]:text-teal-primary rounded-2xl px-4 py-3 h-auto"
              >
                <Receipt className="w-4 h-4" />
                <span className="hidden sm:inline">Bill Pay</span>
              </TabsTrigger>
              <TabsTrigger
                value="emi-calculator"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-primary/20 data-[state=active]:to-mint-fresh/20 data-[state=active]:text-teal-primary rounded-2xl px-4 py-3 h-auto"
              >
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">EMI Calc</span>
              </TabsTrigger>
              <TabsTrigger
                value="loan-calculators"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-primary/20 data-[state=active]:to-mint-fresh/20 data-[state=active]:text-teal-primary rounded-2xl px-4 py-3 h-auto"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Loan Calc</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Health Engine Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Overall Score Card */}
            <Card className="glass-card animate-slide-in-up">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Score Display */}
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-muted/20"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${(financialHealth.overallScore / 1000) * 251.2} 251.2`}
                          className="text-teal-primary"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-3xl font-bold text-teal-primary">
                          {financialHealth.overallScore}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          / 1000
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Badge className="bg-success/20 text-success border-success/30 capitalize">
                        <Award className="w-3 h-3 mr-1" />
                        {financialHealth.category} Health
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        Last updated: {formatDate(financialHealth.lastUpdated)}
                      </p>
                    </div>
                  </div>

                  {/* Health Metrics */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold mb-4">
                      Health Breakdown
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Income Stability</span>
                          <span className="text-sm font-medium">
                            {financialHealth.incomeStability}%
                          </span>
                        </div>
                        <Progress
                          value={financialHealth.incomeStability}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Expense Pattern</span>
                          <span className="text-sm font-medium">
                            {financialHealth.expensePattern}%
                          </span>
                        </div>
                        <Progress
                          value={financialHealth.expensePattern}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Savings Rate</span>
                          <span className="text-sm font-medium">
                            {financialHealth.savingsRate}%
                          </span>
                        </div>
                        <Progress
                          value={financialHealth.savingsRate}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Payment History</span>
                          <span className="text-sm font-medium">
                            {financialHealth.paymentHistory}%
                          </span>
                        </div>
                        <Progress
                          value={financialHealth.paymentHistory}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Alerts */}
            {riskAlerts.length > 0 && (
              <Card
                className="glass-card mb-8 animate-slide-in-up"
                style={{ animationDelay: "0.1s" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    Smart Risk Alerts ({riskAlerts.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {riskAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-xl border-2 ${getAlertSeverityColor(alert.severity)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {alert.severity.toUpperCase()}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(alert.timestamp)}
                            </span>
                          </div>
                          <p className="font-medium mb-1">{alert.message}</p>
                        </div>
                        <Button size="sm" className="glass-button rounded-xl">
                          {alert.action}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Financial Analysis Sub-tabs */}
            <Tabs defaultValue="financial-overview" className="space-y-6">
              <TabsList className="glass-card p-1 h-auto">
                <TabsTrigger
                  value="financial-overview"
                  className="flex items-center gap-2 data-[state=active]:bg-primary/20"
                >
                  <Eye className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="spending"
                  className="flex items-center gap-2 data-[state=active]:bg-primary/20"
                >
                  <PieChartIcon className="w-4 h-4" />
                  Spending Analysis
                </TabsTrigger>
                <TabsTrigger
                  value="loans"
                  className="flex items-center gap-2 data-[state=active]:bg-primary/20"
                >
                  <CreditCard className="w-4 h-4" />
                  Loan Portfolio
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="flex items-center gap-2 data-[state=active]:bg-primary/20"
                >
                  <Lightbulb className="w-4 h-4" />
                  AI Insights
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="financial-overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Income vs Expenses Trend */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Income vs Expenses Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {incomeData.map((month, index) => (
                          <div key={month.month} className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span className="font-medium">{month.month}</span>
                              <span className="text-muted-foreground">
                                ₹{(month.income / 1000).toFixed(0)}k
                              </span>
                            </div>

                            {/* Income Bar */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-success">Income</span>
                                <span>{formatCurrency(month.income)}</span>
                              </div>
                              <div className="w-full bg-muted/20 rounded-full h-2">
                                <div
                                  className="h-2 bg-gradient-to-r from-success to-success/80 rounded-full transition-all duration-500"
                                  style={{
                                    width: `${(month.income / 100000) * 100}%`,
                                    animationDelay: `${index * 0.1}s`,
                                  }}
                                ></div>
                              </div>
                            </div>

                            {/* Expenses Bar */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-destructive">
                                  Expenses
                                </span>
                                <span>{formatCurrency(month.expenses)}</span>
                              </div>
                              <div className="w-full bg-muted/20 rounded-full h-2">
                                <div
                                  className="h-2 bg-gradient-to-r from-destructive to-destructive/80 rounded-full transition-all duration-500"
                                  style={{
                                    width: `${(month.expenses / 100000) * 100}%`,
                                    animationDelay: `${index * 0.1 + 0.05}s`,
                                  }}
                                ></div>
                              </div>
                            </div>

                            {/* Savings Bar */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-primary">Savings</span>
                                <span>{formatCurrency(month.savings)}</span>
                              </div>
                              <div className="w-full bg-muted/20 rounded-full h-2">
                                <div
                                  className="h-2 bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
                                  style={{
                                    width: `${(month.savings / 100000) * 100}%`,
                                    animationDelay: `${index * 0.1 + 0.1}s`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Metrics */}
                  <div className="space-y-4">
                    <Card className="glass-card">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Monthly Income
                            </p>
                            <p className="text-2xl font-bold text-success">
                              ₹95,000
                            </p>
                          </div>
                          <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-success" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass-card">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Total EMIs
                            </p>
                            <p className="text-2xl font-bold text-warning">
                              ₹61,500
                            </p>
                          </div>
                          <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-warning" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass-card">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Available Savings
                            </p>
                            <p className="text-2xl font-bold text-primary">
                              ₹39,000
                            </p>
                          </div>
                          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                            <Wallet className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Spending Analysis Tab */}
              <TabsContent value="spending" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Spending Breakdown */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Expense Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Donut Chart Visualization */}
                        <div className="relative w-48 h-48 mx-auto mb-6">
                          <svg className="w-full h-full" viewBox="0 0 200 200">
                            <circle
                              cx="100"
                              cy="100"
                              r="70"
                              fill="none"
                              stroke="rgba(140, 60%, 45%, 0.1)"
                              strokeWidth="20"
                            />
                            {spendingData.map((item, index) => {
                              const totalPercentage = spendingData
                                .slice(0, index)
                                .reduce(
                                  (sum, prev) => sum + prev.percentage,
                                  0,
                                );
                              const circumference = 2 * Math.PI * 70;
                              const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                              const strokeDashoffset =
                                -(totalPercentage / 100) * circumference;

                              return (
                                <circle
                                  key={index}
                                  cx="100"
                                  cy="100"
                                  r="70"
                                  fill="none"
                                  stroke={item.color}
                                  strokeWidth="20"
                                  strokeDasharray={strokeDasharray}
                                  strokeDashoffset={strokeDashoffset}
                                  className="transition-all duration-500"
                                  style={{
                                    animationDelay: `${index * 0.2}s`,
                                  }}
                                />
                              );
                            })}
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-2xl font-bold text-primary">
                              ₹
                              {(
                                spendingData.reduce(
                                  (sum, item) => sum + item.amount,
                                  0,
                                ) / 1000
                              ).toFixed(0)}
                              k
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Total
                            </div>
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="grid grid-cols-1 gap-2">
                          {spendingData.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 glass-card rounded-xl hover:scale-102 transition-all duration-300"
                              style={{
                                animationDelay: `${0.5 + index * 0.1}s`,
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: item.color }}
                                ></div>
                                <span className="font-medium">{item.name}</span>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">
                                  {item.percentage}%
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {formatCurrency(item.amount)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Category Details */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Category Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {spendingData.map((category) => (
                        <div
                          key={category.name}
                          className="flex items-center justify-between p-3 glass-card rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: category.color }}
                            ></div>
                            <div>
                              <p className="font-medium">{category.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatCurrency(category.amount)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {category.percentage}%
                            </span>
                            {category.trend === "up" && (
                              <TrendingUp className="w-4 h-4 text-destructive" />
                            )}
                            {category.trend === "down" && (
                              <TrendingDown className="w-4 h-4 text-success" />
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Loan Portfolio Tab */}
              <TabsContent value="loans" className="space-y-6">
                <div className="space-y-4">
                  {loanPortfolio.map((loan) => (
                    <Card key={loan.id} className="glass-card">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                          {/* Loan Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">
                                {loan.type}
                              </h3>
                              <Badge className="bg-primary/20 text-primary">
                                {loan.provider}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">
                                  Outstanding
                                </p>
                                <p className="font-semibold">
                                  {formatCurrency(loan.outstanding)}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">EMI</p>
                                <p className="font-semibold">
                                  {formatCurrency(loan.emi)}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">
                                  Interest
                                </p>
                                <p className="font-semibold">
                                  {loan.interestRate}%
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">
                                  Remaining
                                </p>
                                <p className="font-semibold">
                                  {loan.remaining} months
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Progress */}
                          <div className="lg:w-64">
                            <div className="flex justify-between text-sm mb-2">
                              <span>Progress</span>
                              <span>
                                {Math.round(
                                  ((loan.tenure - loan.remaining) /
                                    loan.tenure) *
                                    100,
                                )}
                                %
                              </span>
                            </div>
                            <Progress
                              value={
                                ((loan.tenure - loan.remaining) / loan.tenure) *
                                100
                              }
                              className="mb-2"
                            />
                            <p className="text-xs text-muted-foreground">
                              Next EMI: {formatDate(loan.nextDue)}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="glass-button rounded-xl"
                            >
                              Pay Now
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="glass-button rounded-xl"
                            >
                              Refinance
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* AI Insights Tab */}
              <TabsContent value="insights" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-primary" />
                        AI Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 glass-card rounded-xl border border-success/30">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                          <div>
                            <p className="font-medium text-success">
                              Refinancing Opportunity
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              You can save ₹12,000 annually by refinancing your
                              car loan to a better rate.
                            </p>
                            <Button
                              size="sm"
                              className="mt-3 gradient-primary rounded-xl"
                            >
                              Explore Options
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 glass-card rounded-xl border border-warning/30">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                          <div>
                            <p className="font-medium text-warning">
                              Budget Alert
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Your entertainment spending is 25% above your set
                              budget this month.
                            </p>
                            <Button
                              size="sm"
                              className="mt-3 glass-button rounded-xl"
                            >
                              Adjust Budget
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 glass-card rounded-xl border border-primary/30">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-primary">
                              Investment Suggestion
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Consider investing your surplus ₹15,000 in SIP for
                              better returns.
                            </p>
                            <Button
                              size="sm"
                              className="mt-3 glass-button rounded-xl"
                            >
                              View SIPs
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-primary" />
                        Financial Goals Tracker
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 glass-card rounded-xl">
                        <div className="flex justify-between items-center mb-3">
                          <p className="font-medium">Emergency Fund</p>
                          <span className="text-sm text-muted-foreground">
                            ₹2.5L / ₹5L
                          </span>
                        </div>
                        <Progress value={50} className="mb-2" />
                        <p className="text-xs text-muted-foreground">
                          50% completed • On track
                        </p>
                      </div>

                      <div className="p-4 glass-card rounded-xl">
                        <div className="flex justify-between items-center mb-3">
                          <p className="font-medium">Dream Car Fund</p>
                          <span className="text-sm text-muted-foreground">
                            ₹8L / ₹12L
                          </span>
                        </div>
                        <Progress value={67} className="mb-2" />
                        <p className="text-xs text-muted-foreground">
                          67% completed • Ahead of schedule
                        </p>
                      </div>

                      <div className="p-4 glass-card rounded-xl">
                        <div className="flex justify-between items-center mb-3">
                          <p className="font-medium">Retirement Planning</p>
                          <span className="text-sm text-muted-foreground">
                            ₹15L / ₹1Cr
                          </span>
                        </div>
                        <Progress value={15} className="mb-2" />
                        <p className="text-xs text-muted-foreground">
                          15% completed • Need to increase SIP
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* AI Advisor Tab */}
          <TabsContent value="ai-advisor" className="space-y-6">
            <Card className="glass-card animate-slide-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-teal-primary/20 to-mint-fresh/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-teal-primary" />
                  </div>
                  AI Financial Advisor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="max-h-96 overflow-y-auto space-y-4">
                  {aiResponses.map((response) => (
                    <div
                      key={response.id}
                      className={`p-4 rounded-2xl glass-card ${
                        response.type === "alert"
                          ? "border-l-4 border-warning"
                          : response.type === "suggestion"
                            ? "border-l-4 border-teal-primary"
                            : "border-l-4 border-primary"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            response.type === "alert"
                              ? "bg-warning/20"
                              : response.type === "suggestion"
                                ? "bg-teal-primary/20"
                                : "bg-primary/20"
                          }`}
                        >
                          {response.type === "alert" && (
                            <AlertTriangle className="w-4 h-4 text-warning" />
                          )}
                          {response.type === "suggestion" && (
                            <Lightbulb className="w-4 h-4 text-teal-primary" />
                          )}
                          {response.type === "info" && (
                            <CheckCircle className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-1">
                            {formatDate(response.timestamp)}
                          </p>
                          <p className="font-medium">{response.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 p-4 glass-card rounded-2xl">
                  <MessageCircle className="w-5 h-5 text-teal-primary" />
                  <Input
                    placeholder="Ask your AI advisor anything..."
                    className="glass-card border-0 bg-transparent"
                  />
                  <Button className="bg-gradient-to-r from-teal-primary to-mint-fresh rounded-xl">
                    Ask
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Credit Score Tab */}
          <TabsContent value="credit-score" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card animate-slide-in-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-success/20 to-emerald-500/20 flex items-center justify-center">
                      <Star className="w-6 h-6 text-success" />
                    </div>
                    Credit Score Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-success mb-2">
                      742
                    </div>
                    <Badge className="bg-success/20 text-success">
                      Excellent
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">
                      Last updated: {formatDate(new Date())}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Payment History</span>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Credit Utilization</span>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <Progress value={75} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Credit Age</span>
                      <span className="text-sm font-medium">8 years</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card animate-slide-in-up">
                <CardHeader>
                  <CardTitle>Credit Improvement Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 glass-card rounded-2xl border-l-4 border-teal-primary">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Lower Credit Utilization</p>
                        <p className="text-sm text-muted-foreground">
                          Keep your credit utilization below 30% for better
                          scores
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 glass-card rounded-2xl border-l-4 border-primary">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Pay Bills on Time</p>
                        <p className="text-sm text-muted-foreground">
                          Set up autopay to never miss a payment deadline
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 glass-card rounded-2xl border-l-4 border-warning">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                      <div>
                        <p className="font-medium">Monitor Credit Report</p>
                        <p className="text-sm text-muted-foreground">
                          Check for errors and disputes monthly
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bill Pay Tab */}
          <TabsContent value="bill-pay" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card animate-slide-in-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <Receipt className="w-6 h-6 text-purple-500" />
                    </div>
                    Upcoming Bills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 glass-card rounded-2xl border-l-4 border-warning">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-warning" />
                        <div>
                          <p className="font-medium">HDFC Credit Card</p>
                          <p className="text-sm text-muted-foreground">
                            Due: Today
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-warning">
                          ₹12,500
                        </p>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-teal-primary to-mint-fresh rounded-xl mt-1"
                        >
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 glass-card rounded-2xl border-l-4 border-primary">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Electricity Bill</p>
                          <p className="text-sm text-muted-foreground">
                            Due: 3 days
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">₹3,200</p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="glass-button rounded-xl mt-1"
                        >
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 glass-card rounded-2xl border-l-4 border-success">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Banknote className="w-5 h-5 text-success" />
                        <div>
                          <p className="font-medium">Car EMI</p>
                          <p className="text-sm text-muted-foreground">
                            Due: 5 days
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">₹18,000</p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="glass-button rounded-xl mt-1"
                        >
                          Auto-Pay
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card animate-slide-in-up">
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6">
                    <div className="text-3xl font-bold text-success mb-2">
                      100%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      On-time payments (12 months)
                    </p>
                    <Badge className="mt-2 bg-success/20 text-success">
                      Perfect Record
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 glass-card rounded-xl">
                      <span className="text-sm">Home Loan EMI</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">₹35,000</span>
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 glass-card rounded-xl">
                      <span className="text-sm">Car Loan EMI</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">₹18,000</span>
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 glass-card rounded-xl">
                      <span className="text-sm">Credit Card</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">₹8,500</span>
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* EMI Calculator Tab */}
          <TabsContent value="emi-calculator" className="space-y-6">
            <Card className="glass-card animate-slide-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-teal-primary/20 to-mint-fresh/20 flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-teal-primary" />
                  </div>
                  EMI Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Loan Amount (₹)
                        </Label>
                        <Input
                          type="number"
                          value={emiCalculator.loanAmount}
                          onChange={(e) =>
                            updateEmiCalculator(
                              "loanAmount",
                              Number(e.target.value),
                            )
                          }
                          className="glass-card mt-2"
                        />
                        <Slider
                          value={[emiCalculator.loanAmount]}
                          onValueChange={(value) =>
                            updateEmiCalculator("loanAmount", value[0])
                          }
                          min={100000}
                          max={10000000}
                          step={50000}
                          className="mt-4"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium">
                          Interest Rate (% p.a.)
                        </Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={emiCalculator.interestRate}
                          onChange={(e) =>
                            updateEmiCalculator(
                              "interestRate",
                              Number(e.target.value),
                            )
                          }
                          className="glass-card mt-2"
                        />
                        <Slider
                          value={[emiCalculator.interestRate]}
                          onValueChange={(value) =>
                            updateEmiCalculator("interestRate", value[0])
                          }
                          min={5}
                          max={25}
                          step={0.1}
                          className="mt-4"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium">
                          Loan Tenure (months)
                        </Label>
                        <Input
                          type="number"
                          value={emiCalculator.tenure}
                          onChange={(e) =>
                            updateEmiCalculator(
                              "tenure",
                              Number(e.target.value),
                            )
                          }
                          className="glass-card mt-2"
                        />
                        <Slider
                          value={[emiCalculator.tenure]}
                          onValueChange={(value) =>
                            updateEmiCalculator("tenure", value[0])
                          }
                          min={12}
                          max={360}
                          step={12}
                          className="mt-4"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="text-center p-6 glass-card rounded-3xl">
                      <p className="text-sm text-muted-foreground mb-2">
                        Monthly EMI
                      </p>
                      <p className="text-4xl font-bold text-teal-primary">
                        ₹{emiCalculator.emi.toLocaleString()}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 glass-card rounded-2xl">
                        <p className="text-sm text-muted-foreground mb-1">
                          Total Interest
                        </p>
                        <p className="text-xl font-bold text-warning">
                          ₹{emiCalculator.totalInterest.toLocaleString()}
                        </p>
                      </div>

                      <div className="text-center p-4 glass-card rounded-2xl">
                        <p className="text-sm text-muted-foreground mb-1">
                          Total Amount
                        </p>
                        <p className="text-xl font-bold text-primary">
                          ₹{emiCalculator.totalAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-teal-primary to-mint-fresh rounded-2xl py-3 h-auto">
                      Apply for This Loan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loan Calculators Tab */}
          <TabsContent value="loan-calculators" className="space-y-6">
            <Tabs defaultValue="car-loan" className="space-y-6">
              <TabsList className="glass-card p-1 h-auto">
                <TabsTrigger
                  value="car-loan"
                  className="flex items-center gap-2 data-[state=active]:bg-primary/20 rounded-xl"
                >
                  <Car className="w-4 h-4" />
                  Car Loan
                </TabsTrigger>
                <TabsTrigger
                  value="home-loan"
                  className="flex items-center gap-2 data-[state=active]:bg-primary/20 rounded-xl"
                >
                  <Home className="w-4 h-4" />
                  Home Loan
                </TabsTrigger>
              </TabsList>

              {/* Car Loan Calculator */}
              <TabsContent value="car-loan">
                <Card className="glass-card animate-slide-in-up">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <Car className="w-6 h-6 text-blue-500" />
                      </div>
                      Car Loan Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <Label className="text-sm font-medium">
                            Car Price (₹)
                          </Label>
                          <Input
                            type="number"
                            value={carLoanCalculator.loanAmount}
                            onChange={(e) =>
                              updateCarLoanCalculator(
                                "loanAmount",
                                Number(e.target.value),
                              )
                            }
                            className="glass-card mt-2"
                          />
                          <Slider
                            value={[carLoanCalculator.loanAmount]}
                            onValueChange={(value) =>
                              updateCarLoanCalculator("loanAmount", value[0])
                            }
                            min={200000}
                            max={5000000}
                            step={50000}
                            className="mt-4"
                          />
                        </div>

                        <div>
                          <Label className="text-sm font-medium">
                            Interest Rate (% p.a.)
                          </Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={carLoanCalculator.interestRate}
                            onChange={(e) =>
                              updateCarLoanCalculator(
                                "interestRate",
                                Number(e.target.value),
                              )
                            }
                            className="glass-card mt-2"
                          />
                          <Slider
                            value={[carLoanCalculator.interestRate]}
                            onValueChange={(value) =>
                              updateCarLoanCalculator("interestRate", value[0])
                            }
                            min={7}
                            max={15}
                            step={0.1}
                            className="mt-4"
                          />
                        </div>

                        <div>
                          <Label className="text-sm font-medium">
                            Loan Tenure (months)
                          </Label>
                          <Select
                            value={carLoanCalculator.tenure.toString()}
                            onValueChange={(value) =>
                              updateCarLoanCalculator("tenure", Number(value))
                            }
                          >
                            <SelectTrigger className="glass-card mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12">1 Year</SelectItem>
                              <SelectItem value="24">2 Years</SelectItem>
                              <SelectItem value="36">3 Years</SelectItem>
                              <SelectItem value="48">4 Years</SelectItem>
                              <SelectItem value="60">5 Years</SelectItem>
                              <SelectItem value="84">7 Years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="text-center p-6 glass-card rounded-3xl">
                          <p className="text-sm text-muted-foreground mb-2">
                            Monthly EMI
                          </p>
                          <p className="text-4xl font-bold text-blue-500">
                            ₹{carLoanCalculator.emi.toLocaleString()}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 glass-card rounded-2xl">
                            <p className="text-sm text-muted-foreground mb-1">
                              Total Interest
                            </p>
                            <p className="text-xl font-bold text-warning">
                              ₹
                              {carLoanCalculator.totalInterest.toLocaleString()}
                            </p>
                          </div>

                          <div className="text-center p-4 glass-card rounded-2xl">
                            <p className="text-sm text-muted-foreground mb-1">
                              Total Amount
                            </p>
                            <p className="text-xl font-bold text-primary">
                              ₹{carLoanCalculator.totalAmount.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl py-3 h-auto">
                          Get Car Loan Quotes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Home Loan Calculator */}
              <TabsContent value="home-loan">
                <Card className="glass-card animate-slide-in-up">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                        <Home className="w-6 h-6 text-green-500" />
                      </div>
                      Home Loan Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <Label className="text-sm font-medium">
                            Property Value (₹)
                          </Label>
                          <Input
                            type="number"
                            value={homeLoanCalculator.loanAmount}
                            onChange={(e) =>
                              updateHomeLoanCalculator(
                                "loanAmount",
                                Number(e.target.value),
                              )
                            }
                            className="glass-card mt-2"
                          />
                          <Slider
                            value={[homeLoanCalculator.loanAmount]}
                            onValueChange={(value) =>
                              updateHomeLoanCalculator("loanAmount", value[0])
                            }
                            min={1000000}
                            max={50000000}
                            step={100000}
                            className="mt-4"
                          />
                        </div>

                        <div>
                          <Label className="text-sm font-medium">
                            Interest Rate (% p.a.)
                          </Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={homeLoanCalculator.interestRate}
                            onChange={(e) =>
                              updateHomeLoanCalculator(
                                "interestRate",
                                Number(e.target.value),
                              )
                            }
                            className="glass-card mt-2"
                          />
                          <Slider
                            value={[homeLoanCalculator.interestRate]}
                            onValueChange={(value) =>
                              updateHomeLoanCalculator("interestRate", value[0])
                            }
                            min={6.5}
                            max={12}
                            step={0.1}
                            className="mt-4"
                          />
                        </div>

                        <div>
                          <Label className="text-sm font-medium">
                            Loan Tenure (years)
                          </Label>
                          <Select
                            value={(homeLoanCalculator.tenure / 12).toString()}
                            onValueChange={(value) =>
                              updateHomeLoanCalculator(
                                "tenure",
                                Number(value) * 12,
                              )
                            }
                          >
                            <SelectTrigger className="glass-card mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 Years</SelectItem>
                              <SelectItem value="10">10 Years</SelectItem>
                              <SelectItem value="15">15 Years</SelectItem>
                              <SelectItem value="20">20 Years</SelectItem>
                              <SelectItem value="25">25 Years</SelectItem>
                              <SelectItem value="30">30 Years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="text-center p-6 glass-card rounded-3xl">
                          <p className="text-sm text-muted-foreground mb-2">
                            Monthly EMI
                          </p>
                          <p className="text-4xl font-bold text-green-500">
                            ₹{homeLoanCalculator.emi.toLocaleString()}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 glass-card rounded-2xl">
                            <p className="text-sm text-muted-foreground mb-1">
                              Total Interest
                            </p>
                            <p className="text-xl font-bold text-warning">
                              ₹
                              {homeLoanCalculator.totalInterest.toLocaleString()}
                            </p>
                          </div>

                          <div className="text-center p-4 glass-card rounded-2xl">
                            <p className="text-sm text-muted-foreground mb-1">
                              Total Amount
                            </p>
                            <p className="text-xl font-bold text-primary">
                              ₹{homeLoanCalculator.totalAmount.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl py-3 h-auto">
                          Get Home Loan Quotes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Button
            onClick={() => navigate("/loan-application")}
            className="h-auto p-6 flex-col gap-3 glass-button rounded-2xl"
          >
            <Calculator className="w-8 h-8 text-primary" />
            <div className="text-center">
              <h4 className="font-semibold">Find New Loans</h4>
              <p className="text-sm text-muted-foreground">
                Get personalized recommendations
              </p>
            </div>
          </Button>

          <Button
            onClick={() => navigate("/ai-advisor")}
            className="h-auto p-6 flex-col gap-3 glass-button rounded-2xl"
          >
            <Brain className="w-8 h-8 text-primary" />
            <div className="text-center">
              <h4 className="font-semibold">AI Financial Advisor</h4>
              <p className="text-sm text-muted-foreground">
                Get smart financial advice
              </p>
            </div>
          </Button>

          <Button
            onClick={() => navigate("/profile")}
            className="h-auto p-6 flex-col gap-3 glass-button rounded-2xl"
          >
            <Shield className="w-8 h-8 text-primary" />
            <div className="text-center">
              <h4 className="font-semibold">Update Profile</h4>
              <p className="text-sm text-muted-foreground">
                Improve analysis accuracy
              </p>
            </div>
          </Button>
        </div>
      </div>

      {/* Floating AI Chatbot */}
      <Button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-teal-primary to-mint-fresh shadow-2xl hover:scale-110 transition-all duration-300 z-50"
        onClick={() => navigate("/ai-advisor")}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    </div>
  );
}
