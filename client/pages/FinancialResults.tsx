import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  TrendingUp,
  Shield,
  Download,
  ExternalLink,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Users,
  CreditCard,
  DollarSign,
  Calendar,
  Zap,
  Target,
  Award,
  ThumbsUp,
} from "lucide-react";

interface FinancialScore {
  overall: number;
  creditworthiness: number;
  incomeStability: number;
  debtRatio: number;
  paymentHistory: number;
  category: "excellent" | "good" | "fair" | "poor";
}

interface LoanProvider {
  id: string;
  name: string;
  logo: string;
  interestRate: number;
  maxAmount: number;
  tenure: number;
  processingFee: number;
  eligibility: "approved" | "likely" | "review" | "rejected";
  features: string[];
  rating: number;
  processingTime: string;
  minIncome: number;
  loanType: string;
  websiteUrl: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  applyUrl: string;
}

export default function FinancialResults() {
  const navigate = useNavigate();

  // Simulated financial score based on user data
  const [financialScore] = useState<FinancialScore>({
    overall: 742,
    creditworthiness: 78,
    incomeStability: 85,
    debtRatio: 65,
    paymentHistory: 90,
    category: "good",
  });

  // Real loan recommendations with actual links
  const [loanProviders] = useState<LoanProvider[]>([
    {
      id: "1",
      name: "HDFC Bank",
      logo: "🏦",
      interestRate: 9.5,
      maxAmount: 1000000,
      tenure: 84,
      processingFee: 2.5,
      eligibility: "approved",
      features: ["No prepayment charges", "Quick approval", "Flexible EMI"],
      rating: 4.5,
      processingTime: "24 hours",
      minIncome: 30000,
      loanType: "Personal Loan",
      websiteUrl:
        "https://www.hdfcbank.com/personal/borrow/popular-loans/personal-loan",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.snapwork.hdfc",
      applyUrl: "https://applyonline.hdfcbank.com/loans/personal-loan.html",
    },
    {
      id: "2",
      name: "Bajaj Finserv",
      logo: "💳",
      interestRate: 11.99,
      maxAmount: 800000,
      tenure: 60,
      processingFee: 3.0,
      eligibility: "approved",
      features: [
        "Instant approval",
        "Minimal documentation",
        "Digital process",
      ],
      rating: 4.3,
      processingTime: "2 hours",
      minIncome: 25000,
      loanType: "Personal Loan",
      websiteUrl: "https://www.bajajfinserv.in/personal-loan",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.bajajfinserv.lending",
      applyUrl: "https://www.bajajfinserv.in/apply-personal-loan-online",
    },
    {
      id: "3",
      name: "MoneyTap",
      logo: "📱",
      interestRate: 13.5,
      maxAmount: 500000,
      tenure: 36,
      processingFee: 2.0,
      eligibility: "likely",
      features: ["Credit line facility", "Pay interest on usage", "App-based"],
      rating: 4.1,
      processingTime: "1 hour",
      minIncome: 20000,
      loanType: "Credit Line",
      websiteUrl: "https://www.moneytap.com/",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.moneytap.moneytap",
      applyUrl: "https://www.moneytap.com/apply",
    },
    {
      id: "4",
      name: "Navi",
      logo: "🚀",
      interestRate: 10.49,
      maxAmount: 2000000,
      tenure: 72,
      processingFee: 0,
      eligibility: "likely",
      features: ["Zero processing fee", "Quick approval", "Digital KYC"],
      rating: 4.4,
      processingTime: "5 minutes",
      minIncome: 25000,
      loanType: "Personal Loan",
      websiteUrl: "https://www.navi.com/personal-loan/",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.navi.lending",
      applyUrl: "https://app.navi.com/personal-loan",
    },
    {
      id: "5",
      name: "Payme India",
      logo: "💰",
      interestRate: 11.99,
      maxAmount: 1000000,
      tenure: 60,
      processingFee: 2.0,
      eligibility: "likely",
      features: [
        "Instant approval",
        "Minimal documentation",
        "Quick disbursal",
      ],
      rating: 4.2,
      processingTime: "30 minutes",
      minIncome: 20000,
      loanType: "Personal Loan",
      websiteUrl: "https://www.paymeindia.in/",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.payme.lending",
      applyUrl: "https://www.paymeindia.in/apply-personal-loan",
    },
    {
      id: "6",
      name: "CASHe",
      logo: "⚡",
      interestRate: 15.0,
      maxAmount: 400000,
      tenure: 24,
      processingFee: 1.5,
      eligibility: "review",
      features: [
        "Social credit scoring",
        "Young professional friendly",
        "Fast approval",
      ],
      rating: 4.0,
      processingTime: "15 minutes",
      minIncome: 15000,
      loanType: "Personal Loan",
      websiteUrl: "https://cashe.co.in/",
      playStoreUrl: "https://play.google.com/store/apps/details?id=cashe.cashe",
      applyUrl: "https://cashe.co.in/apply",
    },
    {
      id: "7",
      name: "Tata Capital",
      logo: "🏭",
      interestRate: 10.99,
      maxAmount: 1500000,
      tenure: 96,
      processingFee: 3.5,
      eligibility: "approved",
      features: ["Low interest rates", "High loan amount", "Longer tenure"],
      rating: 4.3,
      processingTime: "48 hours",
      minIncome: 40000,
      loanType: "Personal Loan",
      websiteUrl: "https://www.tatacapital.com/personal-loan.htm",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.tatacapital.tcmobile",
      applyUrl: "https://www.tatacapital.com/personal-loan/apply-online.htm",
    },
    {
      id: "8",
      name: "Fullerton India",
      logo: "🏛️",
      interestRate: 11.5,
      maxAmount: 1000000,
      tenure: 60,
      processingFee: 2.5,
      eligibility: "approved",
      features: [
        "Flexible EMI options",
        "Quick processing",
        "Doorstep service",
      ],
      rating: 4.1,
      processingTime: "24 hours",
      minIncome: 30000,
      loanType: "Personal Loan",
      websiteUrl: "https://www.fullertonindia.com/personal-loan/",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.fullerton.india",
      applyUrl: "https://www.fullertonindia.com/personal-loan/apply-online",
    },
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-green-600";
    if (score >= 650) return "text-lime-600";
    if (score >= 550) return "text-yellow-600";
    return "text-red-600";
  };

  const getEligibilityBadge = (eligibility: string) => {
    switch (eligibility) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Pre-Approved
          </Badge>
        );
      case "likely":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            <ThumbsUp className="w-3 h-3 mr-1" />
            Likely Approval
          </Badge>
        );
      case "review":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Under Review
          </Badge>
        );
      default:
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Needs Review
          </Badge>
        );
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
                <h1 className="text-xl font-bold">Your Financial Report</h1>
                <p className="text-sm text-muted-foreground">
                  Personalized loan recommendations based on your profile
                </p>
              </div>
            </div>
            <Button className="gradient-primary rounded-2xl px-4">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl space-y-8">
        {/* Financial Score Overview */}
        <Card className="glass-card animate-slide-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              Your Financial Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Overall Score */}
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
                      strokeDasharray={`${(financialScore.overall / 850) * 251.2} 251.2`}
                      className={getScoreColor(financialScore.overall)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div
                      className={`text-3xl font-bold ${getScoreColor(financialScore.overall)}`}
                    >
                      {financialScore.overall}
                    </div>
                    <div className="text-sm text-muted-foreground">/ 850</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      financialScore.category === "excellent"
                        ? "bg-green-100 text-green-700"
                        : financialScore.category === "good"
                          ? "bg-blue-100 text-blue-700"
                          : financialScore.category === "fair"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                    }`}
                  >
                    <Award className="w-4 h-4" />
                    {financialScore.category.charAt(0).toUpperCase() +
                      financialScore.category.slice(1)}{" "}
                    Credit
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You're in the top 35% of borrowers
                  </p>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="space-y-4">
                <h4 className="font-semibold mb-4">Score Breakdown</h4>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Creditworthiness</span>
                      <span className="text-sm font-medium">
                        {financialScore.creditworthiness}%
                      </span>
                    </div>
                    <Progress
                      value={financialScore.creditworthiness}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Income Stability</span>
                      <span className="text-sm font-medium">
                        {financialScore.incomeStability}%
                      </span>
                    </div>
                    <Progress
                      value={financialScore.incomeStability}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Debt-to-Income Ratio</span>
                      <span className="text-sm font-medium">
                        {financialScore.debtRatio}%
                      </span>
                    </div>
                    <Progress
                      value={financialScore.debtRatio}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Payment History</span>
                      <span className="text-sm font-medium">
                        {financialScore.paymentHistory}%
                      </span>
                    </div>
                    <Progress
                      value={financialScore.paymentHistory}
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loan Recommendations */}
        <Card
          className="glass-card animate-slide-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-accent" />
              </div>
              Personalized Loan Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {loanProviders.map((provider, index) => (
                <div
                  key={provider.id}
                  className="glass-card p-6 rounded-3xl hover:scale-102 transition-all duration-300 group animate-slide-in-up"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Provider Info */}
                    <div className="flex items-center gap-4 lg:flex-1">
                      <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center text-2xl">
                        {provider.logo}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold">{provider.name}</h3>
                          {getEligibilityBadge(provider.eligibility)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {provider.loanType}
                        </p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">
                            {provider.rating}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            rating
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Loan Details */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:flex-2">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">
                          Interest Rate
                        </div>
                        <div className="text-lg font-bold text-primary">
                          {provider.interestRate}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          per annum
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">
                          Max Amount
                        </div>
                        <div className="text-lg font-bold">
                          {formatCurrency(provider.maxAmount)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          available
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">
                          Tenure
                        </div>
                        <div className="text-lg font-bold">
                          {provider.tenure}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          months
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">
                          Processing
                        </div>
                        <div className="text-lg font-bold text-accent">
                          {provider.processingTime}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          approval
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="lg:flex-shrink-0 flex flex-col gap-2">
                      <Button
                        onClick={() => window.open(provider.applyUrl, "_blank")}
                        className="w-full lg:w-auto bg-gradient-to-r from-neon-purple to-neon-cyan rounded-2xl px-6 group-hover:animate-glow-pulse"
                      >
                        Apply Now
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                      {provider.playStoreUrl && (
                        <Button
                          onClick={() =>
                            window.open(provider.playStoreUrl, "_blank")
                          }
                          variant="outline"
                          size="sm"
                          className="glass-button rounded-xl px-4 text-xs"
                        >
                          📱 Get App
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="flex flex-wrap gap-2">
                      {provider.features.map((feature, featureIndex) => (
                        <Badge
                          key={featureIndex}
                          variant="outline"
                          className="bg-primary/5 text-primary border-primary/20"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-3 text-sm text-muted-foreground">
                      <div>
                        Processing Fee: {provider.processingFee}% of loan amount
                      </div>
                      <div>
                        Min Income: {formatCurrency(provider.minIncome)}/month
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips for Improvement */}
        <Card
          className="glass-card animate-slide-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-orange-500" />
              </div>
              Tips to Improve Your Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-800 mb-1">
                      Maintain Payment History
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Always pay your EMIs and credit card bills on time to
                      improve your credit score.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">
                      Lower Credit Utilization
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Keep your credit card usage below 30% of the total limit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <PieChart className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-800 mb-1">
                      Diversify Credit Mix
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Having different types of credit (cards, loans) can
                      improve your score.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-800 mb-1">
                      Build Credit History
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Keep old accounts open and maintain a longer credit
                      history.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <Button
            onClick={() => navigate("/ai-advisor")}
            variant="outline"
            className="glass-button rounded-2xl px-6"
          >
            <Zap className="w-4 h-4 mr-2" />
            Get AI Financial Advice
          </Button>
          <Button
            onClick={() => navigate("/dashboard")}
            className="gradient-primary rounded-2xl px-6"
          >
            <Shield className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
