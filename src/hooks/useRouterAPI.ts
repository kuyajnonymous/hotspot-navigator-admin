
import { useState } from 'react';
import { toast } from 'sonner';
import { routerAPI } from '@/lib/api';
import { RouterAPIStatus } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useRouterAPI = () => {
  const [loading, setLoading] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const { user } = useAuth();

  const updateRouterConnection = async (connectionId: string, data: Partial<RouterAPIStatus>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('router_connections')
        .update({
          router_ip: data.router_ip,
          api_port: data.api_port,
          api_username: data.username,
          api_ssl: data.api_ssl_enabled,
          last_connected: new Date().toISOString(),
        })
        .eq('id', connectionId);

      if (error) throw error;
      toast.success('Router connection updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating router connection:', error);
      toast.error('Failed to update router connection');
      return false;
    }
  };

  const testConnection = async (connectionId: string) => {
    setTestingConnection(true);
    try {
      const response = await routerAPI.testConnection();
      if (response.data.status === 'connected') {
        await updateRouterConnection(connectionId, response.data);
        toast.success('Connection test successful');
        return response.data;
      } else {
        toast.error('Connection test failed');
        return null;
      }
    } catch (error) {
      console.error('Error testing connection:', error);
      toast.error('Failed to test connection');
      return null;
    } finally {
      setTestingConnection(false);
    }
  };

  return {
    loading,
    testingConnection,
    testConnection,
    updateRouterConnection,
  };
};
