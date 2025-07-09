import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Smartphone, Shield, ArrowRight, CheckCircle } from "lucide-react";

export default function Auth() {
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setStep("otp");
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== "123456") {
      alert("Invalid OTP. Use 123456 for demo");
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setStep("success");
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating orbs background */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/5 backdrop-blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-accent/5 backdrop-blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-10 w-16 h-16 rounded-full bg-purple-500/5 backdrop-blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo/Brand */}
        <div className="text-center space-y-4 animate-slide-in-up">
          <div className="mx-auto w-20 h-20 glass-card rounded-3xl flex items-center justify-center mb-6 neon-glow animate-glow-pulse">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
            FinanceAI
          </h1>
          <p className="text-muted-foreground/80 text-lg">
            Your smart financial advisor
          </p>
        </div>

        {step === "phone" && (
          <Card
            className="glass-card animate-scale-in relative overflow-hidden"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0"></div>
            <CardHeader className="text-center pb-6">
              <CardTitle className="flex items-center justify-center gap-3 text-xl">
                <div className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-primary" />
                </div>
                Phone Verification
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground/80">
                Enter your phone number to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-base font-medium">
                    Phone Number
                  </Label>
                  <div className="flex">
                    <div className="flex items-center px-4 rounded-l-2xl border border-r-0 border-white/10 glass-card text-muted-foreground bg-white/5">
                      +91
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9876543210"
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(
                          e.target.value.replace(/\D/g, "").slice(0, 10),
                        )
                      }
                      className="rounded-l-none rounded-r-2xl futuristic-input border-white/10 text-lg"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full gradient-primary rounded-2xl py-3 h-auto text-lg neon-glow"
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === "otp" && (
          <Card
            className="glass-card animate-scale-in relative overflow-hidden"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent/0 via-accent to-accent/0"></div>
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-xl">Enter OTP</CardTitle>
              <CardDescription className="text-base text-muted-foreground/80">
                We've sent a verification code to +91 {phoneNumber}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="otp" className="text-base font-medium">
                    6-Digit OTP
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="text-center text-2xl tracking-widest futuristic-input rounded-2xl border-white/10 py-4"
                    required
                  />
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                      <span className="text-sm text-muted-foreground/80">
                        Demo OTP: 123456
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full gradient-primary rounded-2xl py-3 h-auto text-lg neon-glow"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full glass-button rounded-2xl py-3 h-auto"
                  onClick={() => setStep("phone")}
                >
                  Change Phone Number
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === "success" && (
          <Card className="glass-card animate-scale-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-success/0 via-success to-success/0"></div>
            <CardContent className="pt-8 text-center space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-success/10 backdrop-blur-xl border border-success/20 flex items-center justify-center animate-glow-pulse">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-success">
                  Welcome to FinanceAI!
                </h3>
                <p className="text-muted-foreground/80 text-lg">
                  Redirecting to your dashboard...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Preview */}
        <div
          className="grid grid-cols-2 gap-6 text-center animate-slide-in-up"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="glass-card p-6 rounded-3xl group hover:scale-105 transition-all duration-500 neon-glow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-3xl mb-3 group-hover:animate-float">🏦</div>
            <h4 className="font-semibold text-base mb-1">Smart Loans</h4>
            <p className="text-sm text-muted-foreground/80">
              AI-powered matching
            </p>
          </div>
          <div className="glass-card p-6 rounded-3xl group hover:scale-105 transition-all duration-500 neon-glow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-3xl mb-3 group-hover:animate-float">📊</div>
            <h4 className="font-semibold text-base mb-1">Financial Health</h4>
            <p className="text-sm text-muted-foreground/80">
              Real-time scoring
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
