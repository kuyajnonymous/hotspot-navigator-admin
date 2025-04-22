
import { useState, useEffect } from "react";
import { 
  Wifi, 
  Users, 
  Shield, 
  Clock, 
  BarChart,
  Database,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusCard from "@/components/dashboard/StatusCard";
import { routerAPI, hotspotAPI, pppoeAPI } from "@/lib/api";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeHotspotUsers: 0,
    totalHotspotUsers: 0,
    activePppoeUsers: 0,
    totalPppoeUsers: 0,
    connectedDevices: 0,
    activeFirewallRules: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    uptime: "0d 0h 0m"
  });

  const refreshData = async () => {
    setLoading(true);
    try {
      // In a real implementation, these would be Promise.all to parallelize requests
      const routerStatus = await routerAPI.getSystemInfo();
      const hotspotUsers = await hotspotAPI.getUsers();
      const hotspotActiveSessions = await hotspotAPI.getActiveSessions();
      const pppoeUsers = await pppoeAPI.getUsers();
      const pppoeActiveSessions = await pppoeAPI.getActiveSessions();
      const resourceUsage = await routerAPI.getResourceUsage();
      const firewallRules = await routerAPI.getStatus();
      
      // This is mock data - in reality, we'd use actual API responses
      setStats({
        activeHotspotUsers: 12,
        totalHotspotUsers: 45,
        activePppoeUsers: 8,
        totalPppoeUsers: 25,
        connectedDevices: 36,
        activeFirewallRules: 18,
        cpuUsage: 24,
        memoryUsage: 38,
        uptime: "18d 6h 32m"
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={refreshData}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Status Cards Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatusCard
          title="Active Hotspot Users"
          value={stats.activeHotspotUsers}
          icon={<Wifi className="h-4 w-4" />}
          description={`of ${stats.totalHotspotUsers} total users`}
        />
        <StatusCard
          title="Active PPPoE Users"
          value={stats.activePppoeUsers}
          icon={<Users className="h-4 w-4" />}
          description={`of ${stats.totalPppoeUsers} total users`}
        />
        <StatusCard
          title="Connected Devices"
          value={stats.connectedDevices}
          icon={<Database className="h-4 w-4" />}
        />
        <StatusCard
          title="Active Firewall Rules"
          value={stats.activeFirewallRules}
          icon={<Shield className="h-4 w-4" />}
        />
      </div>

      {/* System Stats */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              CPU Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-foreground bg-primary">
                    {stats.cpuUsage}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-muted">
                <div
                  style={{ width: `${stats.cpuUsage}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-foreground bg-primary">
                    {stats.memoryUsage}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-muted">
                <div
                  style={{ width: `${stats.memoryUsage}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-xl font-bold">{stats.uptime}</span>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Button 
          variant="outline" 
          className="h-24 flex flex-col gap-2"
          onClick={() => window.location.href = "/hotspot-users"}
        >
          <Users className="h-6 w-6" />
          <span>Manage Hotspot Users</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-24 flex flex-col gap-2"
          onClick={() => window.location.href = "/firewall"}
        >
          <Shield className="h-6 w-6" />
          <span>Configure Firewall</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-24 flex flex-col gap-2"
          onClick={() => window.location.href = "/bandwidth"}
        >
          <BarChart className="h-6 w-6" />
          <span>Bandwidth Management</span>
        </Button>
      </div>
    </div>
  );
}
