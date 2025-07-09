import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Smartphone,
  Shield,
  ArrowRight,
  CheckCircle,
  Loader2,
  Fingerprint,
  Lock,
  Zap,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";

type LoginStep = "phone" | "otp" | "success";

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<LoginStep>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setStep("otp");
    setCountdown(30); // 30 second countdown
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== "123456") {
      alert("Invalid OTP. Use 123456 for demo");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store user session
    localStorage.setItem("userAuthenticated", "true");
    localStorage.setItem("userPhone", phoneNumber);

    setStep("success");
    setLoading(false);

    // Redirect to dashboard after success animation
    setTimeout(() => navigate("/dashboard"), 2500);
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setCountdown(30);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-neon-purple/10 to-neon-cyan/10 backdrop-blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-gradient-to-r from-neon-pink/10 to-neon-green/10 backdrop-blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-10 w-16 h-16 rounded-full bg-gradient-to-r from-neon-orange/10 to-neon-blue/10 backdrop-blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 backdrop-blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-4 animate-slide-in-up">
          <div className="mx-auto w-24 h-24 glass-card rounded-4xl flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink rounded-4xl opacity-20 animate-pulse"></div>
            <Shield className="w-12 h-12 text-primary relative z-10" />
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
              FinanceAI
            </h1>
            <p className="text-lg text-muted-foreground/90">
              Your Intelligent Financial Advisor
            </p>
          </div>
        </div>

        {/* Phone Number Step */}
        {step === "phone" && (
          <Card
            className="glass-card animate-scale-in relative overflow-hidden"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-purple to-transparent"></div>
            <CardHeader className="text-center pb-6">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-secondary" />
                </div>
                Welcome Back
              </CardTitle>
              <p className="text-muted-foreground/80">
                Enter your phone number to access your financial dashboard
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-base font-medium">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                      <span className="text-lg">🇮🇳</span>
                      <span>+91</span>
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
                      className="pl-20 text-lg h-14 futuristic-input bg-background/50 border-border/50"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 text-lg rounded-2xl bg-gradient-to-r from-neon-purple to-neon-cyan hover:from-neon-cyan hover:to-neon-purple transition-all duration-500 shadow-lg hover:shadow-xl"
                  disabled={loading || phoneNumber.length !== 10}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-3" />
                      Get OTP
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-muted-foreground/70">
                  By continuing, you agree to our Terms & Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* OTP Verification Step */}
        {step === "otp" && (
          <Card
            className="glass-card animate-scale-in relative overflow-hidden"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent"></div>
            <CardHeader className="text-center pb-6">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center">
                  <Lock className="w-6 h-6 text-accent" />
                </div>
                Verify OTP
              </CardTitle>
              <p className="text-muted-foreground/80">
                We've sent a verification code to{" "}
                <span className="font-medium text-foreground">
                  +91 {phoneNumber}
                </span>
              </p>
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
                    placeholder="● ● ● ● ● ●"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="text-center text-3xl tracking-[0.5em] h-16 futuristic-input bg-background/50 border-border/50"
                    maxLength={6}
                    required
                  />
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                      <span className="text-sm text-muted-foreground/80">
                        Demo OTP:{" "}
                        <span className="font-mono text-accent">123456</span>
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 text-lg rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-green hover:from-neon-green hover:to-neon-cyan transition-all duration-500 shadow-lg hover:shadow-xl"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Fingerprint className="w-5 h-5 mr-3" />
                      Verify & Continue
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </>
                  )}
                </Button>

                {/* Resend OTP */}
                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Resend OTP in{" "}
                      <span className="font-mono text-accent">
                        {countdown}s
                      </span>
                    </p>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleResendOTP}
                      disabled={loading}
                      className="text-secondary hover:text-secondary/80"
                    >
                      Resend OTP
                    </Button>
                  )}
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setStep("phone")}
                >
                  ← Change Phone Number
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Success Step */}
        {step === "success" && (
          <Card className="glass-card animate-scale-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-green to-transparent"></div>
            <CardContent className="pt-8 text-center space-y-6">
              <div className="mx-auto w-24 h-24 rounded-full glass-card flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-cyan rounded-full opacity-20 animate-glow-pulse"></div>
                <CheckCircle className="w-12 h-12 text-success relative z-10" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
                  Welcome to FinanceAI! 🎉
                </h3>
                <p className="text-lg text-muted-foreground/80">
                  Loading your personalized dashboard...
                </p>
                <div className="flex items-center justify-center gap-1 mt-4">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-neon-purple rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Preview */}
        {step !== "success" && (
          <div
            className="grid grid-cols-3 gap-4 animate-slide-in-up"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="glass-card p-4 rounded-2xl text-center group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 flex items-center justify-center group-hover:animate-float">
                <TrendingUp className="w-6 h-6 text-neon-purple" />
              </div>
              <h4 className="font-semibold text-sm">AI Analysis</h4>
              <p className="text-xs text-muted-foreground/80">Smart insights</p>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-r from-neon-cyan/20 to-neon-green/20 flex items-center justify-center group-hover:animate-float">
                <Star className="w-6 h-6 text-neon-cyan" />
              </div>
              <h4 className="font-semibold text-sm">Best Loans</h4>
              <p className="text-xs text-muted-foreground/80">
                Matched for you
              </p>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-r from-neon-green/20 to-neon-pink/20 flex items-center justify-center group-hover:animate-float">
                <Sparkles className="w-6 h-6 text-neon-green" />
              </div>
              <h4 className="font-semibold text-sm">Instant</h4>
              <p className="text-xs text-muted-foreground/80">Fast approval</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
