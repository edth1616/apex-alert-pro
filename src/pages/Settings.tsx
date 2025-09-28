import { useState } from "react";
import { 
  Key, 
  Bell, 
  TrendingUp, 
  Database, 
  Settings as SettingsIcon,
  ChevronDown,
  ChevronRight,
  Download,
  Upload,
  TestTube,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Settings = () => {
  const [openSections, setOpenSections] = useState({
    api: true,
    notifications: false,
    trading: false,
    backup: false,
    preferences: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const SettingsSection = ({ 
    id, 
    title, 
    icon: Icon, 
    children 
  }: { 
    id: keyof typeof openSections;
    title: string;
    icon: any;
    children: React.ReactNode;
  }) => (
    <Card>
      <Collapsible open={openSections[id]} onOpenChange={() => toggleSection(id)}>
        <CollapsibleTrigger asChild>
          <CardHeader className="hover:bg-muted/30 transition-colors cursor-pointer">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-primary" />
                {title}
              </div>
              {openSections[id] ? (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              )}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure your CryptoAlert Pro preferences and connections.</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* API Keys & Connections */}
        <SettingsSection id="api" title="API Keys & Connections" icon={Key}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="binance-key">Binance API Key</Label>
                <Input 
                  id="binance-key"
                  type="password"
                  placeholder="Enter your Binance API key"
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="binance-secret">Binance Secret Key</Label>
                <Input 
                  id="binance-secret"
                  type="password"
                  placeholder="Enter your Binance secret key"
                  className="font-mono"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-bull rounded-full"></div>
              <span className="text-sm text-muted-foreground">Connection Status: Connected</span>
            </div>
            <Button variant="outline" className="gap-2">
              <TestTube className="w-4 h-4" />
              Test Connection
            </Button>
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection id="notifications" title="Notifications & Alerts" icon={Bell}>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Telegram Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts via Telegram bot</p>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telegram-token">Telegram Bot Token</Label>
                <Input 
                  id="telegram-token"
                  placeholder="Enter your Telegram bot token"
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chat-id">Chat ID</Label>
                <Input 
                  id="chat-id"
                  placeholder="Enter your Telegram chat ID"
                  className="font-mono"
                />
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <Label>Discord Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send alerts to Discord channel</p>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discord-webhook">Discord Webhook URL</Label>
                <Input 
                  id="discord-webhook"
                  placeholder="Enter your Discord webhook URL"
                  className="font-mono"
                />
              </div>
            </div>
            
            <Button variant="outline" className="gap-2">
              <TestTube className="w-4 h-4" />
              Test Notifications
            </Button>
          </div>
        </SettingsSection>

        {/* Trading & Risk */}
        <SettingsSection id="trading" title="Trading & Risk Management" icon={TrendingUp}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="max-positions">Max Simultaneous Positions</Label>
                <Input 
                  id="max-positions"
                  type="number"
                  defaultValue="3"
                  min="1"
                  max="10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-loss">Daily Loss Limit ($)</Label>
                <Input 
                  id="max-loss"
                  type="number"
                  defaultValue="500"
                  min="0"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Auto-close on Profit Target</Label>
                  <p className="text-sm text-muted-foreground">Automatically close positions when profit target is reached</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Anti-Greed Mode</Label>
                  <p className="text-sm text-muted-foreground">Block new positions after significant profit</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Lock After TP1</Label>
                  <p className="text-sm text-muted-foreground">Prevent new trades after taking first profit</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* Backup & Data */}
        <SettingsSection id="backup" title="Backup & Data Management" icon={Database}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex flex-col items-center text-center space-y-3">
                  <Download className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Export Backup</h3>
                    <p className="text-sm text-muted-foreground">Download all your data</p>
                  </div>
                  <Button variant="outline" size="sm">Export Data</Button>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex flex-col items-center text-center space-y-3">
                  <Upload className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Import Backup</h3>
                    <p className="text-sm text-muted-foreground">Restore from backup file</p>
                  </div>
                  <Button variant="outline" size="sm">Import Data</Button>
                </div>
              </Card>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Auto-delete Expired Alerts</Label>
                  <p className="text-sm text-muted-foreground">Automatically remove old cancelled alerts</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="retention-days">Data Retention (Days)</Label>
                <Select defaultValue="90">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="forever">Forever</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <Button variant="destructive" className="gap-2">
                <Trash2 className="w-4 h-4" />
                Clear All History
              </Button>
            </div>
          </div>
        </SettingsSection>

        {/* General Preferences */}
        <SettingsSection id="preferences" title="General Preferences" icon={SettingsIcon}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">EST</SelectItem>
                    <SelectItem value="pst">PST</SelectItem>
                    <SelectItem value="cet">CET</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Number Format</Label>
                <Select defaultValue="us">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">US (1,234.56)</SelectItem>
                    <SelectItem value="eu">EU (1.234,56)</SelectItem>
                    <SelectItem value="space">Space (1 234.56)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Sound Notifications</Label>
                  <p className="text-sm text-muted-foreground">Play sounds for important alerts</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="snooze-duration">Default Snooze Duration (minutes)</Label>
                <Input 
                  id="snooze-duration"
                  type="number"
                  defaultValue="15"
                  min="5"
                  max="60"
                />
              </div>
            </div>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
};

export default Settings;