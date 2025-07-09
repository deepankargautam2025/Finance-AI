import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Smartphone,
  BarChart3,
  CreditCard,
  Zap,
  Target,
  TrendingUp,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: "Financial Health Score",
      description:
        "AI-powered analysis of your financial health with personalized insights",
    },
    {
      icon: CreditCard,
      title: "Smart Loan Matching",
      description: "Find the best loans tailored to your financial profile",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description:
        "Track your income, expenses, and savings with detailed insights",
    },
    {
      icon: Zap,
      title: "AI Financial Advisor",
      description: "Get personalized financial advice powered by advanced AI",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      content:
        "FinanceAI helped me improve my credit score by 120 points in 6 months!",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "Business Owner",
      content:
        "Found the perfect business loan at 2% lower interest rate than my bank offered.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating orbs background */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/5 backdrop-blur-3xl animate-float"></div>
      <div
        className="absolute top-40 right-32 w-24 h-24 rounded-full bg-accent/5 backdrop-blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-32 left-32 w-16 h-16 rounded-full bg-purple-500/5 backdrop-blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-20 right-20 w-20 h-20 rounded-full bg-blue-500/5 backdrop-blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      ></div>

      {/* Hero Section */}
      <section className="relative py-32 px-4 z-10">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-12 animate-slide-in-up">
            <div className="mx-auto w-24 h-24 glass-card rounded-4xl flex items-center justify-center mb-8 neon-glow animate-glow-pulse">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-teal-primary via-mint-fresh to-teal-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
              SmartLoan Advisor
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground/80 mb-12 max-w-4xl mx-auto leading-relaxed">
              Next-gen AI-powered financial health platform that analyzes your
              spending, matches you with perfect loans, and gamifies your
              financial journey
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-slide-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              className="bg-gradient-to-r from-teal-primary to-mint-fresh text-xl px-10 py-4 h-auto rounded-3xl hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl"
            >
              <Smartphone className="w-6 h-6 mr-3" />
              Get Started Now
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            <Button
              onClick={() => navigate("/smart-dashboard")}
              variant="outline"
              size="lg"
              className="glass-button text-xl px-10 py-4 h-auto rounded-3xl hover:scale-105 transition-all duration-500"
            >
              <CreditCard className="w-6 h-6 mr-3" />
              View SmartLoan Advisor
            </Button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-12 max-w-4xl mx-auto animate-slide-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="text-center glass-card p-6 rounded-3xl group hover:scale-105 transition-all duration-500">
              <div className="text-4xl font-bold text-primary mb-2 group-hover:animate-glow-pulse">
                750+
              </div>
              <div className="text-base text-muted-foreground/80">
                Avg Credit Score Improvement
              </div>
            </div>
            <div className="text-center glass-card p-6 rounded-3xl group hover:scale-105 transition-all duration-500">
              <div className="text-4xl font-bold text-accent mb-2 group-hover:animate-glow-pulse">
                ₹50L+
              </div>
              <div className="text-base text-muted-foreground/80">
                Loans Matched
              </div>
            </div>
            <div className="text-center glass-card p-6 rounded-3xl group hover:scale-105 transition-all duration-500">
              <div className="text-4xl font-bold text-primary mb-2 group-hover:animate-glow-pulse">
                10K+
              </div>
              <div className="text-base text-muted-foreground/80">
                Happy Users
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Powerful Financial Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI technology to help you make smarter financial
              decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="glass-card group hover:scale-105 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:animate-pulse-glow">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to transform your financial health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Sign Up with Phone</h3>
              <p className="text-muted-foreground">
                Quick verification with OTP to get started securely
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your financial data to create your profile
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Get Recommendations
              </h3>
              <p className="text-muted-foreground">
                Receive personalized loan matches and financial advice
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              Real stories from people who transformed their finances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-lg mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have improved their financial health
            with FinanceAI
          </p>
          <Button
            onClick={() => navigate("/auth")}
            size="lg"
            className="gradient-primary text-lg px-8 py-6 rounded-2xl"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Start Your Journey Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
