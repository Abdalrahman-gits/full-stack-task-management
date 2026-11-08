import ThemeToggler from "@/ui/ThemeToggler";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";
import DashboardHeader from "./DashboardHeader";

function DashboardLayout() {
  return (
    <div className="grid min-h-dvh grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Sidebar />
      <DashboardHeader />
      <main className="bg-canvas px-7.5 py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
