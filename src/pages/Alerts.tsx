import { useState } from "react";
import { Search, Filter, Plus, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

const alertsData = [
  {
    id: 1,
    symbol: "BTCUSDT",
    type: "LONG",
    status: "PENDING",
    target: 45000,
    current: 43250,
    progress: 85,
    created: "2024-01-15",
    notes: "Support bounce expected"
  },
  {
    id: 2,
    symbol: "ETHUSDT",
    type: "SHORT", 
    status: "EXECUTED",
    target: 2400,
    current: 2380,
    progress: 100,
    created: "2024-01-14",
    notes: "Resistance rejection"
  },
  {
    id: 3,
    symbol: "SOLUSDT",
    type: "LONG",
    status: "ACTIVE",
    target: 85,
    current: 78,
    progress: 92,
    created: "2024-01-13",
    notes: "Breakout pattern"
  },
];

const Alerts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [symbolFilter, setSymbolFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-status-pending text-white";
      case "ACTIVE": return "bg-status-active text-white";
      case "EXECUTED": return "bg-status-executed text-white";
      case "CANCELLED": return "bg-status-cancelled text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "LONG" ? "bg-bull hover:bg-bull/90" : "bg-bear hover:bg-bear/90";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alerts Management</h1>
          <p className="text-muted-foreground">Manage all your trading alerts in one place.</p>
        </div>
        <Button className="bg-primary hover:bg-primary-dark text-primary-foreground gap-2">
          <Plus className="w-4 h-4" />
          New Alert
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts, symbols, notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="executed">Executed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={symbolFilter} onValueChange={setSymbolFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Symbol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Symbols</SelectItem>
                <SelectItem value="BTCUSDT">BTC/USDT</SelectItem>
                <SelectItem value="ETHUSDT">ETH/USDT</SelectItem>
                <SelectItem value="SOLUSDT">SOL/USDT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">45</div>
            <div className="text-sm text-muted-foreground">Total Alerts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-status-active">12</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-status-executed">28</div>
            <div className="text-sm text-muted-foreground">Executed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-status-cancelled">5</div>
            <div className="text-sm text-muted-foreground">Cancelled</div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle>All Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertsData.map((alert) => (
              <div key={alert.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-lg">{alert.symbol}</span>
                    <Badge className={getTypeColor(alert.type)}>
                      {alert.type}
                    </Badge>
                    <Badge className={getStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Alert
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Target Price</span>
                    <p className="font-semibold">${alert.target.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Current Price</span>
                    <p className="font-semibold">${alert.current.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <p className="font-semibold">{alert.progress}%</p>
                  </div>
                </div>

                <Progress value={alert.progress} className="mb-3 h-2" />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Created: {new Date(alert.created).toLocaleDateString()}
                  </span>
                  <span className="text-muted-foreground truncate max-w-xs">
                    "{alert.notes}"
                  </span>
                </div>
              </div>
            ))}
          </div>

          {alertsData.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No alerts found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <Button variant="outline">Clear Filters</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;