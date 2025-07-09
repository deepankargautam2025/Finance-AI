import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  User,
  MapPin,
  Building,
  CreditCard,
  Smartphone,
  Mail,
  Calendar,
  DollarSign,
  TrendingUp,
  Shield,
  Save,
  Edit,
  Camera,
  Verified,
  Star,
  Award,
  Target,
  LogOut,
} from "lucide-react";

interface UserProfile {
  // Personal Info
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;

  // Address
  address: string;
  city: string;
  state: string;
  pincode: string;

  // Professional Info
  employmentType: string;
  companyName: string;
  designation: string;
  workExperience: string;
  monthlyIncome: string;
  secondaryIncome: string;

  // Financial Info
  monthlyExpenses: string;
  existingLoans: string;
  creditCards: string;
  investments: string;
  bankName: string;
  accountType: string;

  // Documents
  panCard: string;
  aadharCard: string;

  // Calculated Metrics
  creditScore: number;
  financialHealthScore: number;
  riskCategory: "low" | "medium" | "high";
  eligibilityScore: number;
}

export default function Profile() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    fullName: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "9876543210",
    dateOfBirth: "1990-05-15",
    gender: "male",
    maritalStatus: "married",

    address: "123, MG Road, Sector 15",
    city: "Gurgaon",
    state: "Haryana",
    pincode: "122001",

    employmentType: "salaried",
    companyName: "Tech Solutions Pvt Ltd",
    designation: "Senior Software Engineer",
    workExperience: "8",
    monthlyIncome: "85000",
    secondaryIncome: "15000",

    monthlyExpenses: "45000",
    existingLoans: "Home Loan: ₹35L outstanding, Car Loan: ₹8L outstanding",
    creditCards: "HDFC Regalia (₹5L limit), SBI Cashback (₹2L limit)",
    investments: "Mutual Funds: ₹12L, PPF: ₹8L, Fixed Deposits: ₹5L",
    bankName: "hdfc",
    accountType: "savings",

    panCard: "ABCDE1234F",
    aadharCard: "1234 5678 9012",

    creditScore: 742,
    financialHealthScore: 785,
    riskCategory: "low",
    eligibilityScore: 88,
  });

  // Advanced Financial Scoring Algorithm
  const calculateFinancialHealth = (userProfile: UserProfile) => {
    const income =
      parseFloat(userProfile.monthlyIncome) +
      parseFloat(userProfile.secondaryIncome || "0");
    const expenses = parseFloat(userProfile.monthlyExpenses);
    const experience = parseFloat(userProfile.workExperience);

    // Income Stability Score (25%)
    let incomeStabilityScore = 0;
    if (userProfile.employmentType === "salaried") incomeStabilityScore += 40;
    else if (userProfile.employmentType === "self-employed")
      incomeStabilityScore += 30;
    else if (userProfile.employmentType === "business")
      incomeStabilityScore += 35;

    if (income >= 100000) incomeStabilityScore += 30;
    else if (income >= 50000) incomeStabilityScore += 20;
    else if (income >= 25000) incomeStabilityScore += 10;

    if (experience >= 5) incomeStabilityScore += 30;
    else if (experience >= 2) incomeStabilityScore += 20;
    else incomeStabilityScore += 10;

    // Debt-to-Income Ratio Score (20%)
    const debtToIncomeRatio = expenses / income;
    let debtScore = 0;
    if (debtToIncomeRatio <= 0.3) debtScore = 100;
    else if (debtToIncomeRatio <= 0.5) debtScore = 80;
    else if (debtToIncomeRatio <= 0.7) debtScore = 60;
    else debtScore = 30;

    // Savings & Investment Score (20%)
    let savingsScore = 0;
    const savingsRate = (income - expenses) / income;
    if (savingsRate >= 0.3) savingsScore = 100;
    else if (savingsRate >= 0.2) savingsScore = 80;
    else if (savingsRate >= 0.1) savingsScore = 60;
    else savingsScore = 30;

    if (userProfile.investments.length > 50) savingsScore += 20; // Has investments

    // Credit History Score (15%)
    let creditHistoryScore = userProfile.creditScore / 8.5; // Convert 850 scale to 100

    // Profile Completeness Score (10%)
    let completenessScore = 0;
    const fields = Object.values(userProfile);
    const filledFields = fields.filter(
      (field) => field && field.toString().length > 0,
    );
    completenessScore = (filledFields.length / fields.length) * 100;

    // Banking Relationship Score (10%)
    let bankingScore = 60; // Base score
    if (userProfile.bankName === "hdfc" || userProfile.bankName === "icici")
      bankingScore += 20;
    if (userProfile.accountType === "salary") bankingScore += 20;

    // Calculate weighted final score
    const finalScore = Math.round(
      incomeStabilityScore * 0.25 +
        debtScore * 0.2 +
        savingsScore * 0.2 +
        creditHistoryScore * 0.15 +
        completenessScore * 0.1 +
        bankingScore * 0.1,
    );

    // Risk Category
    let riskCategory: "low" | "medium" | "high" = "medium";
    if (finalScore >= 750) riskCategory = "low";
    else if (finalScore >= 600) riskCategory = "medium";
    else riskCategory = "high";

    // Eligibility Score for loans
    const eligibilityScore = Math.min(100, Math.round(finalScore * 1.2));

    return {
      financialHealthScore: finalScore,
      riskCategory,
      eligibilityScore,
      breakdown: {
        incomeStability: Math.round(incomeStabilityScore),
        debtToIncome: Math.round(debtScore),
        savings: Math.round(savingsScore),
        creditHistory: Math.round(creditHistoryScore),
        completeness: Math.round(completenessScore),
        banking: Math.round(bankingScore),
      },
    };
  };

  const handleSave = async () => {
    setLoading(true);

    // Calculate new financial metrics
    const results = calculateFinancialHealth(profile);

    // Update profile with new calculations
    setProfile((prev) => ({
      ...prev,
      financialHealthScore: results.financialHealthScore,
      riskCategory: results.riskCategory,
      eligibilityScore: results.eligibilityScore,
    }));

    // Simulate API save
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setEditing(false);

    // Save to localStorage
    localStorage.setItem("userProfile", JSON.stringify(profile));
  };

  const handleSignOut = () => {
    // Clear user data
    localStorage.removeItem("userProfile");
    localStorage.removeItem("authToken");

    // Navigate to login
    navigate("/login");
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <Shield className="w-3 h-3 mr-1" />
            Low Risk
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
            <TrendingUp className="w-3 h-3 mr-1" />
            Medium Risk
          </Badge>
        );
      case "high":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200">
            <Target className="w-3 h-3 mr-1" />
            High Risk
          </Badge>
        );
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-neon-green";
    if (score >= 650) return "text-neon-cyan";
    if (score >= 550) return "text-neon-orange";
    return "text-destructive";
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
                <h1 className="text-xl font-bold">
                  Profile & Financial Health
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage your information and view your financial scores
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!editing ? (
                <>
                  <Button
                    onClick={() => setEditing(true)}
                    className="glass-button rounded-2xl px-4"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="glass-button rounded-2xl px-4 text-destructive border-destructive/30 hover:bg-destructive/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setEditing(false)}
                    className="glass-button rounded-2xl px-4"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-gradient-to-r from-teal-primary to-mint-fresh rounded-2xl px-4"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                    <Save className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl space-y-8">
        {/* Financial Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 flex items-center justify-center">
                <Award className="w-8 h-8 text-neon-purple" />
              </div>
              <div
                className={`text-3xl font-bold mb-2 ${getScoreColor(profile.financialHealthScore)}`}
              >
                {profile.financialHealthScore}
              </div>
              <p className="text-sm text-muted-foreground">
                Financial Health Score
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-neon-green/20 to-neon-cyan/20 flex items-center justify-center">
                <Star className="w-8 h-8 text-neon-green" />
              </div>
              <div className="text-3xl font-bold mb-2 text-neon-green">
                {profile.eligibilityScore}%
              </div>
              <p className="text-sm text-muted-foreground">Loan Eligibility</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-neon-orange/20 to-neon-pink/20 flex items-center justify-center">
                <Target className="w-8 h-8 text-neon-orange" />
              </div>
              <div className="mb-2">{getRiskBadge(profile.riskCategory)}</div>
              <p className="text-sm text-muted-foreground">Risk Category</p>
            </CardContent>
          </Card>
        </div>

        {/* Personal Information */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-neon-purple/20 flex items-center justify-center">
                <User className="w-5 h-5 text-neon-purple" />
              </div>
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                {editing ? (
                  <Input
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    className="futuristic-input"
                  />
                ) : (
                  <p className="text-lg font-medium">{profile.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                {editing ? (
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="futuristic-input"
                  />
                ) : (
                  <p className="text-lg font-medium">{profile.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-medium">+91 {profile.phone}</p>
                  <Verified className="w-4 h-4 text-neon-green" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Date of Birth</Label>
                {editing ? (
                  <Input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        dateOfBirth: e.target.value,
                      }))
                    }
                    className="futuristic-input"
                  />
                ) : (
                  <p className="text-lg font-medium">
                    {new Date(profile.dateOfBirth).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                {editing ? (
                  <Select
                    onValueChange={(value) =>
                      setProfile((prev) => ({ ...prev, gender: value }))
                    }
                  >
                    <SelectTrigger className="futuristic-input">
                      <SelectValue placeholder={profile.gender} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-lg font-medium capitalize">
                    {profile.gender}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Marital Status</Label>
                {editing ? (
                  <Select
                    onValueChange={(value) =>
                      setProfile((prev) => ({ ...prev, maritalStatus: value }))
                    }
                  >
                    <SelectTrigger className="futuristic-input">
                      <SelectValue placeholder={profile.maritalStatus} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-lg font-medium capitalize">
                    {profile.maritalStatus}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-neon-cyan" />
                Address
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="md:col-span-2 lg:col-span-4 space-y-2">
                  <Label>Street Address</Label>
                  {editing ? (
                    <Textarea
                      value={profile.address}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      className="futuristic-input"
                    />
                  ) : (
                    <p className="text-lg font-medium">{profile.address}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  {editing ? (
                    <Input
                      value={profile.city}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                      className="futuristic-input"
                    />
                  ) : (
                    <p className="text-lg font-medium">{profile.city}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  {editing ? (
                    <Input
                      value={profile.state}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }))
                      }
                      className="futuristic-input"
                    />
                  ) : (
                    <p className="text-lg font-medium">{profile.state}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>PIN Code</Label>
                  {editing ? (
                    <Input
                      value={profile.pincode}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          pincode: e.target.value,
                        }))
                      }
                      className="futuristic-input"
                    />
                  ) : (
                    <p className="text-lg font-medium">{profile.pincode}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-neon-cyan/20 flex items-center justify-center">
                <Building className="w-5 h-5 text-neon-cyan" />
              </div>
              Professional Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Employment Type</Label>
                {editing ? (
                  <Select
                    onValueChange={(value) =>
                      setProfile((prev) => ({ ...prev, employmentType: value }))
                    }
                  >
                    <SelectTrigger className="futuristic-input">
                      <SelectValue placeholder={profile.employmentType} />
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
                ) : (
                  <p className="text-lg font-medium capitalize">
                    {profile.employmentType}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Company Name</Label>
                {editing ? (
                  <Input
                    value={profile.companyName}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        companyName: e.target.value,
                      }))
                    }
                    className="futuristic-input"
                  />
                ) : (
                  <p className="text-lg font-medium">{profile.companyName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Designation</Label>
                {editing ? (
                  <Input
                    value={profile.designation}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        designation: e.target.value,
                      }))
                    }
                    className="futuristic-input"
                  />
                ) : (
                  <p className="text-lg font-medium">{profile.designation}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Work Experience (years)</Label>
                {editing ? (
                  <Input
                    type="number"
                    value={profile.workExperience}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        workExperience: e.target.value,
                      }))
                    }
                    className="futuristic-input"
                  />
                ) : (
                  <p className="text-lg font-medium">
                    {profile.workExperience} years
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Monthly Income (₹)</Label>
                {editing ? (
                  <Input
                    type="number"
                    value={profile.monthlyIncome}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        monthlyIncome: e.target.value,
                      }))
                    }
                    className="futuristic-input"
                  />
                ) : (
                  <p className="text-lg font-medium text-neon-green">
                    ₹{parseInt(profile.monthlyIncome).toLocaleString()}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Secondary Income (₹)</Label>
                {editing ? (
                  <Input
                    type="number"
                    value={profile.secondaryIncome}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        secondaryIncome: e.target.value,
                      }))
                    }
                    className="futuristic-input"
                  />
                ) : (
                  <p className="text-lg font-medium text-neon-cyan">
                    ₹{parseInt(profile.secondaryIncome || "0").toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Information */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-neon-green/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-neon-green" />
              </div>
              Financial Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Monthly Expenses (₹)</Label>
                {editing ? (
                  <Input
                    type="number"
                    value={profile.monthlyExpenses}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        monthlyExpenses: e.target.value,
                      }))
                    }
                    className="futuristic-input"
                  />
                ) : (
                  <p className="text-lg font-medium text-neon-orange">
                    ₹{parseInt(profile.monthlyExpenses).toLocaleString()}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Bank Name</Label>
                {editing ? (
                  <Select
                    onValueChange={(value) =>
                      setProfile((prev) => ({ ...prev, bankName: value }))
                    }
                  >
                    <SelectTrigger className="futuristic-input">
                      <SelectValue placeholder={profile.bankName} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                      <SelectItem value="icici">ICICI Bank</SelectItem>
                      <SelectItem value="sbi">State Bank of India</SelectItem>
                      <SelectItem value="axis">Axis Bank</SelectItem>
                      <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-lg font-medium capitalize">
                    {profile.bankName} Bank
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Existing Loans</Label>
                {editing ? (
                  <Textarea
                    value={profile.existingLoans}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        existingLoans: e.target.value,
                      }))
                    }
                    className="futuristic-input min-h-[80px]"
                    placeholder="Describe your existing loans and EMIs"
                  />
                ) : (
                  <p className="text-lg font-medium">{profile.existingLoans}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Credit Cards</Label>
                {editing ? (
                  <Textarea
                    value={profile.creditCards}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        creditCards: e.target.value,
                      }))
                    }
                    className="futuristic-input min-h-[80px]"
                    placeholder="List your credit cards and limits"
                  />
                ) : (
                  <p className="text-lg font-medium">{profile.creditCards}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Investments</Label>
                {editing ? (
                  <Textarea
                    value={profile.investments}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        investments: e.target.value,
                      }))
                    }
                    className="futuristic-input min-h-[80px]"
                    placeholder="Describe your investment portfolio"
                  />
                ) : (
                  <p className="text-lg font-medium">{profile.investments}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Verification */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-neon-pink/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-neon-pink" />
              </div>
              Document Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>PAN Card Number</Label>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-medium font-mono">
                    {profile.panCard}
                  </p>
                  <Verified className="w-5 h-5 text-neon-green" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Aadhar Card Number</Label>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-medium font-mono">
                    {profile.aadharCard}
                  </p>
                  <Verified className="w-5 h-5 text-neon-green" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
