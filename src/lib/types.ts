
// API Types for RouterOS Integration

// User Types
export interface HotspotUser {
  id: string;
  username: string;
  password?: string;
  profile: string;
  uptime: string;
  bytes_in: number;
  bytes_out: number;
  status: 'active' | 'inactive';
  mac_address?: string;
  ip_address?: string;
  comment?: string;
  created_at: string;
}

export interface PPPoEUser {
  id: string;
  username: string;
  password?: string;
  profile: string;
  uptime: string;
  bytes_in: number;
  bytes_out: number;
  status: 'active' | 'inactive';
  mac_address?: string;
  ip_address?: string;
  comment?: string;
  created_at: string;
}

export interface ConnectedDevice {
  id: string;
  mac_address: string;
  ip_address: string;
  hostname?: string;
  uptime: string;
  bytes_in: number;
  bytes_out: number;
  status: 'active' | 'inactive';
  comment?: string;
}

export interface FirewallRule {
  id: string;
  chain: string;
  action: string;
  protocol?: string;
  src_address?: string;
  dst_address?: string;
  src_port?: string;
  dst_port?: string;
  comment?: string;
  disabled: boolean;
}

export interface BandwidthLimit {
  id: string;
  name: string;
  max_limit_up: string;
  max_limit_down: string;
  burst_limit_up?: string;
  burst_limit_down?: string;
  burst_threshold_up?: string;
  burst_threshold_down?: string;
  burst_time_up?: string;
  burst_time_down?: string;
  priority?: string;
  comment?: string;
}

export interface AccessSchedule {
  id: string;
  name: string;
  start_time: string;
  end_time: string;
  start_date?: string;
  end_date?: string;
  days_of_week: string[];
  comment?: string;
}

export interface RouterAPIStatus {
  status: 'connected' | 'disconnected';
  router_ip: string;
  api_port: number;
  username: string;
  api_enabled: boolean;
  api_ssl_enabled: boolean;
  ping_status: boolean;
  permissions_valid: boolean;
  last_checked: string;
}
