import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Index from "./pages/Index";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Journey from "./pages/Journey";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// ✅ ADMIN ROUTES
import AdminRoutes from "./admin/routes/AdminRoutes";
import Preloader from "./components/Preloader";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          {isLoading ? (
            <Preloader onComplete={handlePreloaderComplete} />
          ) : (
            <>
              <Routes>
                {/* Public Website */}
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<Services />} />
                <Route path="/work" element={<Work />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/contact" element={<Contact />} />

                {/* Admin Panel - Hidden Route */}
                <Route path="/bloom-admin/*" element={<AdminRoutes />} />

                {/* Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
