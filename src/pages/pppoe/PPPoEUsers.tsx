
import { useEffect, useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Users, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PPPoEUser } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function PPPoEUsers() {
  const [users, setUsers] = useState<PPPoEUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pppoe_users')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching PPPoE users:', error);
      toast.error('Failed to load PPPoE users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          PPPoE Users
        </h1>
        <Button
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage PPPoE Users</CardTitle>
          <CardDescription>
            View and manage your PPPoE users
          </CardDescription>
          <div className="flex items-center gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Implement PPPoE users table here */}
          <p className="text-center text-muted-foreground py-8">
            PPPoE users will be displayed here
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
