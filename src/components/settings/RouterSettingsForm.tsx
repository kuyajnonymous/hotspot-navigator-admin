
import { useState } from 'react';
import { RouterAPIStatus } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { RefreshCw } from 'lucide-react';

interface RouterSettingsFormProps {
  apiStatus: RouterAPIStatus;
  connectionId: string;
  onUpdate: (data: Partial<RouterAPIStatus>) => Promise<boolean>;
  onTest: () => Promise<void>;
  testingConnection: boolean;
}

export const RouterSettingsForm = ({
  apiStatus,
  connectionId,
  onUpdate,
  onTest,
  testingConnection,
}: RouterSettingsFormProps) => {
  const [formData, setFormData] = useState({
    router_ip: apiStatus.router_ip,
    api_port: apiStatus.api_port,
    username: apiStatus.username,
    api_ssl_enabled: apiStatus.api_ssl_enabled,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="router_ip">Router IP Address</Label>
          <Input
            id="router_ip"
            value={formData.router_ip}
            onChange={(e) => setFormData(prev => ({ ...prev, router_ip: e.target.value }))}
            placeholder="192.168.1.1"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="api_port">API Port</Label>
          <Input
            id="api_port"
            type="number"
            value={formData.api_port}
            onChange={(e) => setFormData(prev => ({ ...prev, api_port: parseInt(e.target.value) }))}
            placeholder="8728"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={formData.username}
            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
            placeholder="admin"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="api_ssl">API SSL</Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="api_ssl"
              checked={formData.api_ssl_enabled}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, api_ssl_enabled: checked }))}
            />
            <span className="text-sm text-muted-foreground">
              {formData.api_ssl_enabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onTest}
          disabled={testingConnection}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${testingConnection ? 'animate-spin' : ''}`} />
          Test Connection
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
};
