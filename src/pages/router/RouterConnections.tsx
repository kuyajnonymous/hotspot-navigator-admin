
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Loader, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RouterConnectionForm } from "@/components/router/RouterConnectionForm";
import { RouterConnectionList } from "@/components/router/RouterConnectionList";
import { supabase } from "@/integrations/supabase/client";

export default function RouterConnections() {
  const [showForm, setShowForm] = useState(false);

  const { data: connections, isLoading } = useQuery({
    queryKey: ['router-connections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('router_connections')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Router Connections</h1>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Connection
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : !connections?.length ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <WifiOff className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No router connections</h3>
          <p className="text-muted-foreground">
            Add your first router connection to get started
          </p>
        </div>
      ) : (
        <RouterConnectionList connections={connections} />
      )}

      <RouterConnectionForm open={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
}
