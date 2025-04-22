
import { useState, useEffect } from 'react';
import { 
  Wifi, 
  Plus, 
  RefreshCw, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Clock
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { hotspotAPI } from '@/lib/api';
import { HotspotUser } from '@/lib/types';

export default function HotspotUsers() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<HotspotUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<HotspotUser[]>([]);

  // Mock data for demo purpose
  const mockUsers: HotspotUser[] = [
    {
      id: '1',
      username: 'guest1',
      profile: 'default',
      uptime: '2h 15m',
      bytes_in: 1500000,
      bytes_out: 500000,
      status: 'active',
      mac_address: 'AA:BB:CC:DD:EE:FF',
      ip_address: '192.168.1.101',
      created_at: '2023-04-10T10:30:00'
    },
    {
      id: '2',
      username: 'user123',
      profile: 'premium',
      uptime: '5h 45m',
      bytes_in: 5000000,
      bytes_out: 2000000,
      status: 'active',
      mac_address: 'AA:BB:CC:DD:EE:11',
      ip_address: '192.168.1.102',
      created_at: '2023-03-15T14:20:00'
    },
    {
      id: '3',
      username: 'visitor42',
      profile: 'basic',
      uptime: '0h 0m',
      bytes_in: 0,
      bytes_out: 0,
      status: 'inactive',
      mac_address: 'AA:BB:CC:DD:EE:22',
      ip_address: '192.168.1.103',
      created_at: '2023-04-18T09:15:00'
    },
    {
      id: '4',
      username: 'cafecustomer',
      profile: 'hourly',
      uptime: '0h 45m',
      bytes_in: 250000,
      bytes_out: 100000,
      status: 'active',
      mac_address: 'AA:BB:CC:DD:EE:33',
      ip_address: '192.168.1.104',
      created_at: '2023-04-20T16:10:00'
    },
    {
      id: '5',
      username: 'hotel505',
      profile: 'premium',
      uptime: '12h 30m',
      bytes_in: 8500000,
      bytes_out: 3500000,
      status: 'active',
      mac_address: 'AA:BB:CC:DD:EE:44',
      ip_address: '192.168.1.105',
      created_at: '2023-04-01T08:45:00'
    }
  ];

  // Format data size
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would call the API
      // const response = await hotspotAPI.getUsers();
      // setUsers(response.data);
      
      // Using mock data for demonstration
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
    } catch (error) {
      console.error('Error loading hotspot users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.mac_address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.ip_address?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleRefresh = () => {
    loadUsers();
  };

  const handleAddUser = () => {
    // Implementation would go here
    alert('Add user functionality would open a modal form');
  };

  const handleEditUser = (id: string) => {
    // Implementation would go here
    alert(`Edit user with ID: ${id}`);
  };

  const handleDeleteUser = (id: string) => {
    // Implementation would go here
    alert(`Delete user with ID: ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Wifi className="h-6 w-6 text-primary" />
          Hotspot Users
        </h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            size="sm"
            className="flex items-center gap-2"
            onClick={handleAddUser}
          >
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Manage Hotspot Users</CardTitle>
          <CardDescription>
            View and manage all hotspot users on your MikroTik router.
          </CardDescription>
          <div className="flex items-center gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by username, MAC, or IP..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead className="hidden md:table-cell">MAC Address</TableHead>
                <TableHead className="hidden md:table-cell">Uptime</TableHead>
                <TableHead className="hidden lg:table-cell">Data Usage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    <div className="flex justify-center">
                      <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">Loading users...</p>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    <p className="text-muted-foreground">No users found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.profile}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === 'active' ? 'default' : 'secondary'}
                        className={
                          user.status === 'active'
                            ? 'bg-green-500 hover:bg-green-600'
                            : ''
                        }
                      >
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.ip_address || '-'}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.mac_address || '-'}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {user.uptime}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="text-xs">
                        <div>↓ {formatBytes(user.bytes_in)}</div>
                        <div>↑ {formatBytes(user.bytes_out)}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditUser(user.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
