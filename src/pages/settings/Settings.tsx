
import { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon,
  CheckSquare,
  XSquare,
  Wifi,
  Shield,
  Server,
  RefreshCw
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RouterAPIStatus } from '@/lib/types';
import { routerAPI } from '@/lib/api';

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [testingConnection, setTestingConnection] = useState(false);
  const [apiStatus, setApiStatus] = useState<RouterAPIStatus | null>(null);
  
  // Mock API status for demonstration
  const mockApiStatus: RouterAPIStatus = {
    status: 'connected',
    router_ip: '192.168.1.1',
    api_port: 8728,
    username: 'admin',
    api_enabled: true,
    api_ssl_enabled: false,
    ping_status: true,
    permissions_valid: true,
    last_checked: new Date().toISOString()
  };

  const loadApiStatus = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would call the API
      // const response = await routerAPI.getStatus();
      // setApiStatus(response.data);
      
      // Using mock data for demonstration
      setApiStatus(mockApiStatus);
    } catch (error) {
      console.error('Error loading API status:', error);
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    setTestingConnection(true);
    try {
      // In a real implementation, this would call the API
      // const response = await routerAPI.testConnection();
      // setApiStatus(response.data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update mock data for demonstration
      setApiStatus({
        ...mockApiStatus,
        last_checked: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error testing connection:', error);
    } finally {
      setTestingConnection(false);
    }
  };

  useEffect(() => {
    loadApiStatus();
  }, []);

  const StatusItem = ({ 
    title, 
    status, 
    description 
  }: { 
    title: string; 
    status: boolean; 
    description: string;
  }) => (
    <div className="flex items-start space-x-4 py-3">
      <div>
        {status ? (
          <CheckSquare className="h-5 w-5 text-green-500" />
        ) : (
          <XSquare className="h-5 w-5 text-red-500" />
        )}
      </div>
      <div>
        <div className="font-medium">
          {title} 
          <Badge 
            className="ml-2" 
            variant={status ? "default" : "destructive"}
          >
            {status ? "Passed" : "Failed"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-primary" />
          Settings
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            RouterOS API Configuration
          </CardTitle>
          <CardDescription>
            Configure and test your connection to the MikroTik RouterOS API
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-2 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="router_ip">Router IP Address</Label>
                  <Input 
                    id="router_ip" 
                    placeholder="192.168.1.1" 
                    value={apiStatus?.router_ip}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api_port">API Port</Label>
                  <Input 
                    id="api_port" 
                    placeholder="8728" 
                    value={apiStatus?.api_port}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    placeholder="admin" 
                    value={apiStatus?.username}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_checked">Last Checked</Label>
                  <Input 
                    id="last_checked" 
                    value={apiStatus?.last_checked ? new Date(apiStatus.last_checked).toLocaleString() : 'Never'}
                    readOnly
                  />
                </div>
              </div>
          
              <Separator className="my-6" />
          
              <div className="rounded-md border border-border p-4 mb-6">
                <h3 className="text-lg font-medium mb-4">RouterOS API Checklist</h3>
                
                <div className="space-y-1">
                  <StatusItem 
                    title="Connection Status" 
                    status={apiStatus?.status === 'connected'} 
                    description="API connection to your MikroTik router is active and working"
                  />
                  <Separator />
                  <StatusItem 
                    title="API Service Enabled" 
                    status={apiStatus?.api_enabled || false} 
                    description="The API service is enabled on your MikroTik router"
                  />
                  <Separator />
                  <StatusItem 
                    title="API SSL Service" 
                    status={apiStatus?.api_ssl_enabled || false} 
                    description="API SSL service is enabled for secure communication"
                  />
                  <Separator />
                  <StatusItem 
                    title="Ping Status" 
                    status={apiStatus?.ping_status || false} 
                    description="Your MikroTik router responds to ping requests"
                  />
                  <Separator />
                  <StatusItem 
                    title="Permissions" 
                    status={apiStatus?.permissions_valid || false} 
                    description="Your API user has the required permissions"
                  />
                </div>
              </div>
          
              <div className="flex justify-end gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = "/edit-connection"} 
                  className="flex items-center gap-2"
                >
                  <SettingsIcon className="h-4 w-4" />
                  Edit Connection
                </Button>
                <Button 
                  onClick={testConnection} 
                  disabled={testingConnection} 
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${testingConnection ? 'animate-spin' : ''}`} />
                  Test Connection
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
