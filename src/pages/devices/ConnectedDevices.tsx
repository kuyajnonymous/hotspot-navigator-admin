
import { useEffect, useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Database, SearchIcon, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConnectedDevice } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function ConnectedDevices() {
  const [devices, setDevices] = useState<ConnectedDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('connected_devices')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      setDevices(data || []);
    } catch (error) {
      console.error('Error fetching devices:', error);
      toast.error('Failed to load connected devices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDevices();
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          Connected Devices
        </h1>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => fetchDevices()}
          disabled={loading}
        >
          <Laptop className="h-4 w-4" />
          Refresh Devices
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Device List</CardTitle>
          <CardDescription>
            View and manage devices connected to your network
          </CardDescription>
          <div className="flex items-center gap-4 pt-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by hostname, MAC, or IP..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Implement device list table here */}
          <p className="text-center text-muted-foreground py-8">
            Connected devices will be displayed here
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
