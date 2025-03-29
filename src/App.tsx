
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Scanner from "./pages/Scanner";
import ScannerResult from "./pages/ScannerResult";
import Fertilizer from "./pages/Fertilizer";
import Heatmap from "./pages/Heatmap";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import Community from "./pages/Community";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/scanner/result" element={<ScannerResult />} />
          <Route path="/fertilizer" element={<Fertilizer />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/community" element={<Community />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
