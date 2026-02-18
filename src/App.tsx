import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useScrollScrolling } from "@/hooks/use-scroll-scrolling";
import { AppErrorBoundary } from "@/components/AppErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Privacy = lazy(() => import("./pages/Privacy"));

const App = () => {
  useScrollScrolling();

  return (
    <AppErrorBoundary>
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
    </AppErrorBoundary>
  );
};

export default App;
