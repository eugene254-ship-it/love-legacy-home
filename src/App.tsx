import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Pricing from "./pages/Pricing";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import SupportWidget from "./components/SupportWidget";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <SupportWidget />
      </AuthProvider>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;