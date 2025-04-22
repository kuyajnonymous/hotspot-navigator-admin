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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RouterAPIStatus } from '@/lib/types';
import { useRouterAPI } from '@/hooks/useRouterAPI';
import { RouterSettingsForm } from '@/components/settings/RouterSettingsForm';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export default function Settings() {
  const [apiStatus, setApiStatus] = useState<RouterAPIStatus | null>(null);
  const { testConnection, testingConnection, updateRouterConnection } = useRouterAPI();

  const { data: connection, isLoading } = useQuery({
    queryKey: ['router-connection'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('router_connections')
        .select('*')
        .limit(1)
        .single();
      
      if (error) throw error;
      
      // Convert to RouterAPIStatus format
      const status: RouterAPIStatus = {
        status: data.is_active ? 'connected' : 'disconnected',
        router_ip: data.router_ip,
        api_port: data.api_port,
        username: data.api_username,
        api_enabled: true,
        api_ssl_enabled: data.api_ssl || false,
        ping_status: data.is_active || false,
        permissions_valid: true,
        last_checked: data.last_connected || new Date().toISOString()
      };
      
      setApiStatus(status);
      return data;
    },
  });

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

  const handleTest = async () => {
    if (!connection) return;
    const result = await testConnection(connection.id);
    if (result) {
      setApiStatus(result);
    }
  };

  const handleUpdate = async (data: Partial<RouterAPIStatus>) => {
    if (!connection) return false;
    const success = await updateRouterConnection(connection.id, data);
    if (success && data) {
      setApiStatus(prev => prev ? { ...prev, ...data } : null);
    }
    return success;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!connection || !apiStatus) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Wifi className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No Router Connection</h3>
        <p className="text-muted-foreground">
          Please add a router connection to get started
        </p>
      </div>
    );
  }

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
          <RouterSettingsForm
            apiStatus={apiStatus}
            connectionId={connection.id}
            onUpdate={handleUpdate}
            onTest={handleTest}
            testingConnection={testingConnection}
          />

          <Separator className="my-6" />

          <div className="rounded-md border border-border p-4">
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
        </CardContent>
      </Card>
    </div>
  );
}
