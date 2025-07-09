import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  CreditCard,
  TrendingUp,
  DollarSign,
  Smartphone,
  Settings,
  Download,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Target,
  Zap,
  Shield,
  User,
  MessageCircle,
} from "lucide-react";

interface FinancialData {
  score: number;
  income: number;
  expenses: number;
  savings: number;
  debtToIncome: number;
  scoreCategory: "excellent" | "good" | "fair" | "poor";
}

interface LoanRecommendation {
  id: string;
  provider: string;
  amount: number;
  interestRate: number;
  tenure: number;
  eligibility: "approved" | "likely" | "review";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [financialData, setFinancialData] = useState<FinancialData>({
    score: 750,
    income: 85000,
    expenses: 52000,
    savings: 33000,
    debtToIncome: 0.25,
    scoreCategory: "good",
  });

  const [loanRecommendations] = useState<LoanRecommendation[]>([
    {
      id: "1",
      provider: "HDFC Bank",
      amount: 500000,
      interestRate: 9.5,
      tenure: 24,
      eligibility: "approved",
    },
    {
      id: "2",
      provider: "Bajaj Finserv",
      amount: 300000,
      interestRate: 11.2,
      tenure: 18,
      eligibility: "likely",
    },
    {
      id: "3",
      provider: "Payday Loans",
      amount: 100000,
      interestRate: 13.8,
      tenure: 12,
      eligibility: "review",
    },
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-green-400";
    if (score >= 650) return "text-lime-400";
    if (score >= 550) return "text-yellow-400";
    return "text-red-400";
  };

  const getEligibilityBadge = (eligibility: string) => {
    switch (eligibility) {
      case "approved":
        return (
          <Badge className="bg-green-500/20 text-green-400">Approved</Badge>
        );
      case "likely":
        return <Badge className="bg-blue-500/20 text-blue-400">Likely</Badge>;
      case "review":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400">Review</Badge>
        );
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/5 backdrop-blur-3xl sticky top-0 z-50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/80"></div>
        <div className="relative container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center neon-glow animate-glow-pulse">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  FinanceAI
                </h1>
                <p className="text-sm text-muted-foreground/80">
                  Smart Financial Advisor
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="glass-button rounded-2xl neon-glow h-12 w-12"
              >
                <Bell className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-button rounded-2xl neon-glow h-12 w-12"
                onClick={() => navigate("/profile")}
              >
                <User className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-button rounded-2xl neon-glow h-12 w-12"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="glass-card p-8 rounded-3xl animate-slide-in-up relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Good evening, User! 👋
              </h2>
              <p className="text-muted-foreground/90 text-lg">
                Ready to find your perfect loan match?
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate("/loan-application")}
                className="gradient-primary rounded-2xl px-6 py-3 h-auto neon-glow animate-float"
              >
                <CreditCard className="w-5 h-5 mr-3" />
                Apply for Loan
              </Button>
              <Button
                variant="outline"
                className="glass-button rounded-2xl px-6 py-3 h-auto"
              >
                <Download className="w-5 h-5 mr-3" />
                Download Report
              </Button>
            </div>
          </div>
        </div>

        {/* Financial Score */}
        <Card
          className="glass-card relative overflow-hidden animate-slide-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0"></div>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              Financial Health Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <div
                    className={`text-6xl font-bold ${getScoreColor(financialData.score)} drop-shadow-lg`}
                  >
                    {financialData.score}
                  </div>
                  <div className="text-2xl text-muted-foreground/50">/850</div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                      financialData.scoreCategory === "excellent"
                        ? "financial-score-excellent"
                        : financialData.scoreCategory === "good"
                          ? "financial-score-good"
                          : financialData.scoreCategory === "fair"
                            ? "financial-score-fair"
                            : "financial-score-poor"
                    }`}
                  >
                    {financialData.scoreCategory} Credit
                  </div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="flex items-center text-green-400 text-lg font-semibold">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  +25
                </div>
                <p className="text-sm text-muted-foreground/80">this month</p>
              </div>
            </div>

            <div className="space-y-3">
              <Progress
                value={(financialData.score / 850) * 100}
                className="h-3 bg-white/5 rounded-full overflow-hidden"
              />

              <div className="grid grid-cols-2 gap-6">
                <div className="glass-card p-4 rounded-2xl">
                  <p className="text-muted-foreground/80 text-sm mb-1">
                    Debt-to-Income
                  </p>
                  <p className="font-bold text-lg">
                    {(financialData.debtToIncome * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="glass-card p-4 rounded-2xl">
                  <p className="text-muted-foreground/80 text-sm mb-1">
                    Payment History
                  </p>
                  <p className="font-bold text-lg text-green-400">Excellent</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className="glass-card group hover:scale-105 transition-all duration-500 animate-slide-in-up relative overflow-hidden"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-500/0 via-green-500 to-green-500/0"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground/80 font-medium">
                    Monthly Income
                  </p>
                  <p className="text-3xl font-bold text-green-400 drop-shadow-lg">
                    {formatCurrency(financialData.income)}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 backdrop-blur-xl border border-green-500/20 flex items-center justify-center group-hover:animate-float">
                  <ArrowUpRight className="w-7 h-7 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="glass-card group hover:scale-105 transition-all duration-500 animate-slide-in-up relative overflow-hidden"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground/80 font-medium">
                    Monthly Expenses
                  </p>
                  <p className="text-3xl font-bold text-red-400 drop-shadow-lg">
                    {formatCurrency(financialData.expenses)}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 backdrop-blur-xl border border-red-500/20 flex items-center justify-center group-hover:animate-float">
                  <ArrowDownRight className="w-7 h-7 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="glass-card group hover:scale-105 transition-all duration-500 animate-slide-in-up relative overflow-hidden"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground/80 font-medium">
                    Total Savings
                  </p>
                  <p className="text-3xl font-bold text-blue-400 drop-shadow-lg">
                    {formatCurrency(financialData.savings)}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 flex items-center justify-center group-hover:animate-float">
                  <DollarSign className="w-7 h-7 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loan Recommendations */}
        <Card
          className="glass-card animate-slide-in-up relative overflow-hidden"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0"></div>
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              Loan Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {loanRecommendations.map((loan, index) => (
              <div
                key={loan.id}
                className="glass-card p-6 rounded-3xl hover:scale-102 transition-all duration-500 cursor-pointer group relative overflow-hidden animate-slide-in-up"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 backdrop-blur-xl border border-primary/20 flex items-center justify-center group-hover:animate-float">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-lg">{loan.provider}</h4>
                      <p className="text-muted-foreground/80">
                        Up to {formatCurrency(loan.amount)}
                      </p>
                    </div>
                  </div>
                  {getEligibilityBadge(loan.eligibility)}
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="glass-card p-4 rounded-2xl">
                    <p className="text-muted-foreground/80 text-sm mb-1">
                      Interest Rate
                    </p>
                    <p className="font-bold text-lg text-primary">
                      {loan.interestRate}% p.a.
                    </p>
                  </div>
                  <div className="glass-card p-4 rounded-2xl">
                    <p className="text-muted-foreground/80 text-sm mb-1">
                      Tenure
                    </p>
                    <p className="font-bold text-lg">{loan.tenure} months</p>
                  </div>
                </div>

                <Button className="w-full gradient-primary rounded-2xl py-3 h-auto neon-glow group-hover:animate-glow-pulse">
                  <span className="text-lg font-semibold">Apply Now</span>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Button
            variant="outline"
            className="glass-button h-auto p-6 flex-col gap-3 rounded-3xl group hover:scale-105 transition-all duration-500 animate-slide-in-up"
            onClick={() => navigate("/financial-engine")}
            style={{ animationDelay: "0.8s" }}
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/20 backdrop-blur-xl border border-primary/30 flex items-center justify-center group-hover:animate-float">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <span className="text-base font-medium">Health Engine</span>
          </Button>
          <Button
            variant="outline"
            className="glass-button h-auto p-6 flex-col gap-3 rounded-3xl neon-glow group hover:scale-105 transition-all duration-500 animate-slide-in-up"
            onClick={() => navigate("/ai-advisor")}
            style={{ animationDelay: "0.9s" }}
          >
            <div className="w-12 h-12 rounded-2xl bg-accent/10 backdrop-blur-xl border border-accent/20 flex items-center justify-center group-hover:animate-float">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <span className="text-base font-medium">AI Advisor</span>
          </Button>
          <Button
            variant="outline"
            className="glass-button h-auto p-6 flex-col gap-3 rounded-3xl neon-glow group hover:scale-105 transition-all duration-500 animate-slide-in-up"
            style={{ animationDelay: "1.0s" }}
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 flex items-center justify-center group-hover:animate-float">
              <CreditCard className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-base font-medium">Credit Score</span>
          </Button>
          <Button
            variant="outline"
            className="glass-button h-auto p-6 flex-col gap-3 rounded-3xl neon-glow group hover:scale-105 transition-all duration-500 animate-slide-in-up"
            style={{ animationDelay: "1.1s" }}
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 backdrop-blur-xl border border-purple-500/20 flex items-center justify-center group-hover:animate-float">
              <Smartphone className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-base font-medium">Bill Pay</span>
          </Button>
        </div>
      </main>

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
