
import { useEffect, useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Shield, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FirewallRule } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function FirewallRules() {
  const [rules, setRules] = useState<FirewallRule[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchRules = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('firewall_rules')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      setRules(data || []);
    } catch (error) {
      console.error('Error fetching firewall rules:', error);
      toast.error('Failed to load firewall rules');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRules();
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Firewall Rules
        </h1>
        <Button
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Rule
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Rules</CardTitle>
          <CardDescription>
            Configure and manage your firewall rules
          </CardDescription>
          <div className="flex items-center gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search rules..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Implement firewall rules table here */}
          <p className="text-center text-muted-foreground py-8">
            Firewall rules will be displayed here
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
