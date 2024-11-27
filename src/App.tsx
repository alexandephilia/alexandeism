import "./App.css"
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import CustomCursor from "./components/CustomCursor";
import TerminalLoader from "./components/TerminalLoader";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const AIResearchPage = lazy(() => import("./pages/projects/ai"));
const PromptEngineeringPage = lazy(() => import("./pages/projects/prompt"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <CustomCursor />
        <Toaster />
        <Sonner />
        <Router>
          <Suspense fallback={<TerminalLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects/ai" element={<AIResearchPage />} />
              <Route path="/projects/prompt" element={<PromptEngineeringPage />} />
            </Routes>
          </Suspense>
        </Router>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;