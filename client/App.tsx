import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AIAdvisor from "./pages/AIAdvisor";
import LoanApplication from "./pages/LoanApplication";
import FinancialResults from "./pages/FinancialResults";
import FinancialEngine from "./pages/FinancialEngine";
import SmartLoanAdvisor from "./pages/SmartLoanAdvisor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ai-advisor" element={<AIAdvisor />} />
          <Route path="/loan-application" element={<LoanApplication />} />
          <Route path="/financial-results" element={<FinancialResults />} />
          <Route path="/financial-engine" element={<FinancialEngine />} />
          <Route path="/smart-dashboard" element={<SmartLoanAdvisor />} />
          <Route path="/loan-discovery" element={<SmartLoanAdvisor />} />
          <Route path="/loan-portfolio" element={<SmartLoanAdvisor />} />
          <Route path="/emi-planner" element={<SmartLoanAdvisor />} />
          <Route path="/ai-chat" element={<SmartLoanAdvisor />} />
          <Route path="/smart-profile" element={<SmartLoanAdvisor />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
