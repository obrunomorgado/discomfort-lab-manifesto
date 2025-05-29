
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Index from "./pages/Index";
import TestPanel from "./pages/TestPanel";
import CareerTruthAI from "./pages/CareerTruthAI";
import UnbreakableMind from "./pages/UnbreakableMind";
import ArquitetoDaVerdade from "./pages/ArquitetoDaVerdade";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-dark-bg">
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/testes" element={<TestPanel />} />
              <Route path="/career-truth-ai" element={<CareerTruthAI />} />
              <Route path="/unbreakable-mind" element={<UnbreakableMind />} />
              <Route path="/arquiteto-da-verdade" element={<ArquitetoDaVerdade />} />
              <Route path="/perfil" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
