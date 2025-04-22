
import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Wifi, 
  Shield, 
  Database,
  BarChart,
  Calendar,
  Clock,
  Settings,
  Menu,
  LogOut
} from "lucide-react";

interface NavItemProps {
  icon: React.ElementType;
  title: string;
  to: string;
  active: boolean;
}

const NavItem = ({ icon: Icon, title, to, active }: NavItemProps) => (
  <Link to={to}>
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 text-left font-normal",
        active ? "bg-accent text-accent-foreground" : "hover:bg-muted"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{title}</span>
    </Button>
  </Link>
);

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navItems = [
    { icon: LayoutDashboard, title: "Dashboard", to: "/dashboard" },
    { icon: Users, title: "Hotspot Users", to: "/hotspot-users" },
    { icon: Wifi, title: "PPPoE Users", to: "/pppoe-users" },
    { icon: Database, title: "Connected Devices", to: "/devices" },
    { icon: Shield, title: "Firewall Rules", to: "/firewall" },
    { icon: BarChart, title: "Bandwidth", to: "/bandwidth" },
    { icon: Calendar, title: "Schedules", to: "/schedules" },
    { icon: Settings, title: "Settings", to: "/settings" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-card border-r border-border transition-all duration-300 flex flex-col",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo & Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="rounded-md bg-primary h-8 w-8 flex items-center justify-center">
              <Wifi className="h-5 w-5 text-primary-foreground" />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-lg">Hotspot Nav</span>
            )}
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="h-8 w-8"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                icon={item.icon}
                title={item.title}
                to={item.to}
                active={location.pathname === item.to}
              />
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button variant="outline" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background">
        {/* Content goes here */}
        <div className="container mx-auto py-6 px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
