
import { useState } from "react";
import { Link } from "react-router-dom";
import { Wifi, Users, Settings, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Index() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <header className="px-4 py-6 md:px-6 md:py-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary h-8 w-8 flex items-center justify-center">
              <Wifi className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Hotspot Navigator</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link 
              to="/hotspot-portal" 
              className="text-sm text-gray-600 hover:text-primary hidden md:block"
            >
              Hotspot Portal
            </Link>
            <Link to="/dashboard">
              <Button size="sm">Admin Dashboard</Button>
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            MikroTik Hotspot Management
            <span className="text-primary"> Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 md:mb-10">
            Manage your MikroTik router's hotspot, PPPoE users, and network settings
            through an intuitive admin dashboard.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Open Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/hotspot-portal">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Hotspot Portal
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-blue-100 p-3 mb-4">
                <Wifi className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-2">Hotspot Management</h2>
              <p className="text-gray-500 mb-4">
                Create, edit, and monitor hotspot users. Manage bandwidth limits and access times.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">PPPoE User Control</h2>
              <p className="text-gray-500 mb-4">
                Manage PPPoE users, monitor connections, and control access permissions.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-purple-100 p-3 mb-4">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">Router Configuration</h2>
              <p className="text-gray-500 mb-4">
                Configure firewall rules, bandwidth limits, and access schedules easily.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="container mx-auto px-4 py-8 mt-auto">
        <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Hotspot Navigator Admin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
