import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useScrollScrolling } from "@/hooks/use-scroll-scrolling";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Privacy = lazy(() => import("./pages/Privacy"));

const queryClient = new QueryClient();

const App = () => {
  useScrollScrolling();

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/privacy"
            element={
              <Suspense fallback={<div className="min-h-screen bg-background" />}>
                <Privacy />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
