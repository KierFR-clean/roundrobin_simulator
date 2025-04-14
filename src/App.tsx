import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router";
import { useState } from "react";
import "./App.css";
import HelpButton from "./components/Help";
import HelpModal from "./components/HelpModal";

const queryClient = new QueryClient();

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-[#319795] px-3 col-span-3">
      <h5 className="capitalize w-full py-4 font-bold text-center text-zinc-50">
        <span className="marked">Cloud</span> Load Balancing Simulation using
        Round Robin Algorithm
      </h5>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <p className="text-sm">
        © 2025 Developed by Group 7 as Partial Fulfillment for our SoftEng
        Project
      </p>
    </div>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <div className="fixed bottom-4 right-4 z-50">
        <HelpButton onClick={() => setModalShow(true)} />
        <HelpModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
