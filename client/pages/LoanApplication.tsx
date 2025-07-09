import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  User,
  FileText,
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Building,
  TrendingUp,
  Smartphone,
  Home,
  Car,
} from "lucide-react";

interface UserData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  pincode: string;

  // Financial Information
  monthlyIncome: string;
  employmentType: string;
  companyName: string;
  workExperience: string;
  loanAmount: string;
  loanPurpose: string;
  existingLoans: string;

  // Bank Details
  bankName: string;
  accountType: string;
  monthlyExpenses: string;

  // Additional Info
  panCard: string;
  aadharCard: string;
}

type Step =
  | "personal"
  | "financial"
  | "bank"
  | "documents"
  | "payment"
  | "processing"
  | "results";

export default function LoanApplication() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("personal");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    monthlyIncome: "",
    employmentType: "",
    companyName: "",
    workExperience: "",
    loanAmount: "",
    loanPurpose: "",
    existingLoans: "",
    bankName: "",
    accountType: "",
    monthlyExpenses: "",
    panCard: "",
    aadharCard: "",
  });

  const steps = [
    { id: "personal", title: "Personal Info", icon: User },
    { id: "financial", title: "Financial Details", icon: TrendingUp },
    { id: "bank", title: "Bank Details", icon: Building },
    { id: "documents", title: "Documents", icon: FileText },
    { id: "payment", title: "Payment", icon: CreditCard },
  ];

  const getStepIndex = () => steps.findIndex((step) => step.id === currentStep);
  const progress = ((getStepIndex() + 1) / steps.length) * 100;

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const stepIndex = getStepIndex();
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].id as Step);
    } else if (currentStep === "payment") {
      handlePayment();
    }
  };

  const handlePrevious = () => {
    const stepIndex = getStepIndex();
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].id as Step);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setCurrentStep("processing");

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate financial analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setCurrentStep("results");
    setLoading(false);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case "personal":
        return (
          userData.fullName &&
          userData.email &&
          userData.phone &&
          userData.address
        );
      case "financial":
        return (
          userData.monthlyIncome &&
          userData.employmentType &&
          userData.loanAmount
        );
      case "bank":
        return userData.bankName && userData.accountType;
      case "documents":
        return userData.panCard && userData.aadharCard;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
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
              <h1 className="text-xl font-bold">Loan Application</h1>
              <p className="text-sm text-muted-foreground">
                Complete your application to get personalized loan
                recommendations
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Progress Bar */}
        {currentStep !== "processing" && currentStep !== "results" && (
          <Card className="glass-card mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Application Progress</h2>
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  Step {getStepIndex() + 1} of {steps.length}
                </Badge>
              </div>
              <Progress value={progress} className="mb-4 h-2" />
              <div className="grid grid-cols-5 gap-2">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = step.id === currentStep;
                  const isCompleted = index < getStepIndex();

                  return (
                    <div
                      key={step.id}
                      className="flex flex-col items-center text-center"
                    >
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-2 transition-all duration-300 ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : isCompleted
                              ? "bg-success text-success-foreground"
                              : "glass-card"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <StepIcon className="w-5 h-5" />
                        )}
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Personal Information Step */}
        {currentStep === "personal" && (
          <Card className="glass-card animate-slide-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={userData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="futuristic-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={userData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="futuristic-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={userData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="futuristic-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={userData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    className="futuristic-input"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete address"
                    value={userData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="futuristic-input min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="City"
                      value={userData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="futuristic-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="State"
                      value={userData.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      className="futuristic-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      placeholder="PIN Code"
                      value={userData.pincode}
                      onChange={(e) =>
                        handleInputChange("pincode", e.target.value)
                      }
                      className="futuristic-input"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Financial Information Step */}
        {currentStep === "financial" && (
          <Card className="glass-card animate-slide-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                Financial Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Monthly Income (₹) *</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    placeholder="50000"
                    value={userData.monthlyIncome}
                    onChange={(e) =>
                      handleInputChange("monthlyIncome", e.target.value)
                    }
                    className="futuristic-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type *</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("employmentType", value)
                    }
                  >
                    <SelectTrigger className="futuristic-input">
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salaried">Salaried</SelectItem>
                      <SelectItem value="self-employed">
                        Self Employed
                      </SelectItem>
                      <SelectItem value="business">Business Owner</SelectItem>
                      <SelectItem value="freelancer">Freelancer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company/Business Name</Label>
                  <Input
                    id="companyName"
                    placeholder="Company or business name"
                    value={userData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    className="futuristic-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workExperience">
                    Work Experience (years)
                  </Label>
                  <Input
                    id="workExperience"
                    type="number"
                    placeholder="5"
                    value={userData.workExperience}
                    onChange={(e) =>
                      handleInputChange("workExperience", e.target.value)
                    }
                    className="futuristic-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount Required (₹) *</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="500000"
                    value={userData.loanAmount}
                    onChange={(e) =>
                      handleInputChange("loanAmount", e.target.value)
                    }
                    className="futuristic-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanPurpose">Loan Purpose</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("loanPurpose", value)
                    }
                  >
                    <SelectTrigger className="futuristic-input">
                      <SelectValue placeholder="Select loan purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal Use</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="home">Home Purchase</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="wedding">Wedding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="existingLoans">Existing Loans (if any)</Label>
                <Textarea
                  id="existingLoans"
                  placeholder="Describe any existing loans or EMIs"
                  value={userData.existingLoans}
                  onChange={(e) =>
                    handleInputChange("existingLoans", e.target.value)
                  }
                  className="futuristic-input min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bank Details Step */}
        {currentStep === "bank" && (
          <Card className="glass-card animate-slide-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <Building className="w-5 h-5 text-blue-500" />
                </div>
                Bank Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("bankName", value)
                    }
                  >
                    <SelectTrigger className="futuristic-input">
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sbi">State Bank of India</SelectItem>
                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                      <SelectItem value="icici">ICICI Bank</SelectItem>
                      <SelectItem value="axis">Axis Bank</SelectItem>
                      <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                      <SelectItem value="pnb">Punjab National Bank</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type *</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("accountType", value)
                    }
                  >
                    <SelectTrigger className="futuristic-input">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="current">Current Account</SelectItem>
                      <SelectItem value="salary">Salary Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyExpenses">Monthly Expenses (₹)</Label>
                  <Input
                    id="monthlyExpenses"
                    type="number"
                    placeholder="30000"
                    value={userData.monthlyExpenses}
                    onChange={(e) =>
                      handleInputChange("monthlyExpenses", e.target.value)
                    }
                    className="futuristic-input"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Documents Step */}
        {currentStep === "documents" && (
          <Card className="glass-card animate-slide-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-500" />
                </div>
                Document Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="panCard">PAN Card Number *</Label>
                  <Input
                    id="panCard"
                    placeholder="ABCDE1234F"
                    value={userData.panCard}
                    onChange={(e) =>
                      handleInputChange("panCard", e.target.value.toUpperCase())
                    }
                    className="futuristic-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aadharCard">Aadhar Card Number *</Label>
                  <Input
                    id="aadharCard"
                    placeholder="1234 5678 9012"
                    value={userData.aadharCard}
                    onChange={(e) =>
                      handleInputChange("aadharCard", e.target.value)
                    }
                    className="futuristic-input"
                  />
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl border-amber-200 bg-amber-50/50">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800">
                      Document Verification
                    </h4>
                    <p className="text-sm text-amber-700 mt-1">
                      We'll verify your documents during the application
                      process. Make sure the information matches your official
                      documents.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Step */}
        {currentStep === "payment" && (
          <Card className="glass-card animate-slide-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-success/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-success" />
                </div>
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="glass-card p-8 rounded-3xl mb-6 border-primary/20">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-2">₹299</h3>
                  <p className="text-muted-foreground mb-4">
                    One-time processing fee
                  </p>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Financial Analysis</span>
                      <span>Included</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Loan Matching</span>
                      <span>Included</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Credit Score Report</span>
                      <span>Included</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-4 rounded-2xl border-blue-200 bg-blue-50/50 mb-6">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <div className="text-left">
                      <h4 className="font-medium text-blue-800">
                        Secure Payment
                      </h4>
                      <p className="text-sm text-blue-700">
                        Your payment is processed securely. We don't store any
                        payment information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Processing Step */}
        {currentStep === "processing" && (
          <Card className="glass-card animate-scale-in">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-glow-pulse">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Processing Your Application
                </h3>
                <p className="text-muted-foreground mb-4">
                  Our AI is analyzing your financial data and finding the best
                  loan matches...
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span>Verifying payment...</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <span>Analyzing financial data...</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <span>Matching with loan providers...</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Step */}
        {currentStep === "results" && (
          <div className="space-y-6 animate-slide-in-up">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-success/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                  Application Successful!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Your application has been processed successfully. Here are
                  your results:
                </p>
                <Button
                  onClick={() => navigate("/financial-results")}
                  className="bg-gradient-to-r from-neon-green to-neon-cyan rounded-2xl px-6 text-lg h-auto py-3"
                >
                  View Your Financial Score & Loan Recommendations
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        {currentStep !== "processing" && currentStep !== "results" && (
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={getStepIndex() === 0}
              className="glass-button rounded-2xl px-6"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid() || loading}
              className="gradient-primary rounded-2xl px-6"
            >
              {currentStep === "payment" ? "Pay ₹299 & Continue" : "Continue"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
