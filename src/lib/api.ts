
// API Client for RouterOS Backend

import axios from 'axios';

// Define base API URL - this should be environment-based
const API_BASE_URL = 'http://localhost:8000/api'; // Replace with actual base URL

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  login: (username: string, password: string) => 
    apiClient.post('/auth/login', { username, password }),
  
  logout: () => 
    apiClient.post('/auth/logout'),
  
  getUser: () => 
    apiClient.get('/auth/user'),
};

// Hotspot Users API
export const hotspotAPI = {
  getUsers: () => 
    apiClient.get('/hotspot/users'),
  
  getUser: (id: string) => 
    apiClient.get(`/hotspot/users/${id}`),
  
  createUser: (userData: any) => 
    apiClient.post('/hotspot/users', userData),
  
  updateUser: (id: string, userData: any) => 
    apiClient.put(`/hotspot/users/${id}`, userData),
  
  deleteUser: (id: string) => 
    apiClient.delete(`/hotspot/users/${id}`),
  
  getActiveSessions: () => 
    apiClient.get('/hotspot/active'),
};

// PPPoE Users API
export const pppoeAPI = {
  getUsers: () => 
    apiClient.get('/pppoe/users'),
  
  getUser: (id: string) => 
    apiClient.get(`/pppoe/users/${id}`),
  
  createUser: (userData: any) => 
    apiClient.post('/pppoe/users', userData),
  
  updateUser: (id: string, userData: any) => 
    apiClient.put(`/pppoe/users/${id}`, userData),
  
  deleteUser: (id: string) => 
    apiClient.delete(`/pppoe/users/${id}`),
  
  getActiveSessions: () => 
    apiClient.get('/pppoe/active'),
};

// Connected Devices API
export const devicesAPI = {
  getDevices: () => 
    apiClient.get('/devices'),
  
  getDevice: (id: string) => 
    apiClient.get(`/devices/${id}`),
  
  addToWhitelist: (deviceId: string) => 
    apiClient.post(`/devices/${deviceId}/whitelist`),
  
  addToBlocklist: (deviceId: string) => 
    apiClient.post(`/devices/${deviceId}/blocklist`),
  
  getDHCPLeases: () => 
    apiClient.get('/devices/dhcp-leases'),
};

// Firewall Rules API
export const firewallAPI = {
  getRules: () => 
    apiClient.get('/firewall/rules'),
  
  getRule: (id: string) => 
    apiClient.get(`/firewall/rules/${id}`),
  
  createRule: (ruleData: any) => 
    apiClient.post('/firewall/rules', ruleData),
  
  updateRule: (id: string, ruleData: any) => 
    apiClient.put(`/firewall/rules/${id}`, ruleData),
  
  deleteRule: (id: string) => 
    apiClient.delete(`/firewall/rules/${id}`),
  
  enableRule: (id: string) => 
    apiClient.post(`/firewall/rules/${id}/enable`),
  
  disableRule: (id: string) => 
    apiClient.post(`/firewall/rules/${id}/disable`),
};

// Bandwidth Management API
export const bandwidthAPI = {
  getProfiles: () => 
    apiClient.get('/bandwidth/profiles'),
  
  getProfile: (id: string) => 
    apiClient.get(`/bandwidth/profiles/${id}`),
  
  createProfile: (profileData: any) => 
    apiClient.post('/bandwidth/profiles', profileData),
  
  updateProfile: (id: string, profileData: any) => 
    apiClient.put(`/bandwidth/profiles/${id}`, profileData),
  
  deleteProfile: (id: string) => 
    apiClient.delete(`/bandwidth/profiles/${id}`),
  
  getQueues: () => 
    apiClient.get('/bandwidth/queues'),
};

// Access Schedules API
export const schedulesAPI = {
  getSchedules: () => 
    apiClient.get('/schedules'),
  
  getSchedule: (id: string) => 
    apiClient.get(`/schedules/${id}`),
  
  createSchedule: (scheduleData: any) => 
    apiClient.post('/schedules', scheduleData),
  
  updateSchedule: (id: string, scheduleData: any) => 
    apiClient.put(`/schedules/${id}`, scheduleData),
  
  deleteSchedule: (id: string) => 
    apiClient.delete(`/schedules/${id}`),
};

// Router Configuration & Status API
export const routerAPI = {
  getStatus: () => 
    apiClient.get('/router/status'),
  
  testConnection: () => 
    apiClient.post('/router/test-connection'),
  
  getSystemInfo: () => 
    apiClient.get('/router/system-info'),
  
  getInterfaces: () => 
    apiClient.get('/router/interfaces'),
  
  getResourceUsage: () => 
    apiClient.get('/router/resources'),
};

// Wizard API
export const wizardAPI = {
  runHotspotWizard: (config: any) => 
    apiClient.post('/wizard/hotspot', config),
  
  runPPPoEWizard: (config: any) => 
    apiClient.post('/wizard/pppoe', config),
};

export default apiClient;
