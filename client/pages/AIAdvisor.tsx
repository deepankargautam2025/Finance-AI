import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  User,
  Send,
  Lightbulb,
  TrendingUp,
  PiggyBank,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

export default function AIAdvisor() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your AI Financial Advisor. I can help you with budgeting, loan advice, investment suggestions, and improving your financial health. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const quickActions: QuickAction[] = [
    {
      id: "1",
      label: "Improve Credit Score",
      icon: TrendingUp,
      description: "Get tips to boost your credit score",
    },
    {
      id: "2",
      label: "Budget Planning",
      icon: PiggyBank,
      description: "Create a personalized budget",
    },
    {
      id: "3",
      label: "Loan Advice",
      icon: CreditCard,
      description: "Find the best loan options",
    },
    {
      id: "4",
      label: "Investment Tips",
      icon: Lightbulb,
      description: "Smart investment suggestions",
    },
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content: getBotResponse(input),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botResponse]);
    setLoading(false);
  };

  const getBotResponse = (userInput: string): string => {
    const input_lower = userInput.toLowerCase();

    if (input_lower.includes("credit") || input_lower.includes("score")) {
      return "To improve your credit score: 1) Pay bills on time (35% of score), 2) Keep credit utilization below 30%, 3) Don't close old credit cards, 4) Check your credit report regularly. Your current score of 750 is good - let's get it to excellent (800+)!";
    }

    if (input_lower.includes("budget") || input_lower.includes("expense")) {
      return "Based on your income of ₹85,000, I recommend the 50/30/20 rule: ₹42,500 for needs, ₹25,500 for wants, ₹17,000 for savings. Currently, you're spending ₹52,000 - try reducing dining and entertainment by ₹5,000 monthly.";
    }

    if (input_lower.includes("loan") || input_lower.includes("borrow")) {
      return "With your credit score of 750, you qualify for premium rates. HDFC offers 9.5% for ₹5L, which is excellent. Avoid high-interest options like payday loans (13.8%). Consider a secured loan against FD for even better rates if available.";
    }

    if (input_lower.includes("invest") || input_lower.includes("mutual")) {
      return "With ₹33,000 in savings, consider: 1) Emergency fund (6 months expenses = ₹3.12L), 2) SIP in diversified equity funds (₹10,000/month), 3) PPF for tax savings (₹1.5L annually). Start with low-risk balanced funds given your profile.";
    }

    return "I understand your question. Based on your financial profile, I'd recommend focusing on: building emergency funds, improving your credit score, and exploring low-risk investment options. Would you like me to elaborate on any of these areas?";
  };

  const handleQuickAction = (action: QuickAction) => {
    setInput(action.description);
    handleSendMessage();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="glass-button rounded-xl"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 glass-card rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Financial Advisor</h1>
                <p className="text-xs text-muted-foreground">
                  Powered by FinanceAI
                </p>
              </div>
            </div>
            <Badge className="ml-auto bg-green-500/20 text-green-400">
              Online
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="glass-button h-auto p-4 flex-col gap-2 rounded-xl"
              onClick={() => handleQuickAction(action)}
            >
              <action.icon className="w-5 h-5" />
              <span className="text-xs text-center">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Chat Messages */}
        <Card className="glass-card mb-4">
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${
                      message.type === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === "user"
                          ? "bg-primary/20"
                          : "bg-accent/20"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="w-4 h-4 text-primary" />
                      ) : (
                        <Bot className="w-4 h-4 text-accent" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl p-3 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "glass-card"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-accent" />
                    </div>
                    <div className="glass-card rounded-2xl p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-accent rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-accent rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Input Area */}
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your finances..."
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={loading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                className="gradient-primary rounded-xl px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="glass-card mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              Financial Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <p className="text-sm text-green-400 font-medium">Pro Tip</p>
              <p className="text-sm">
                Set up automatic transfers to your savings account right after
                payday to build wealth effortlessly.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm text-blue-400 font-medium">
                Credit Score Boost
              </p>
              <p className="text-sm">
                Keep your oldest credit card active to maintain a longer credit
                history, even if you don't use it regularly.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
