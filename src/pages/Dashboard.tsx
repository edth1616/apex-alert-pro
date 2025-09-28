import { Wallet, TrendingUp, Bell, Target, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { UpcomingAlerts } from "@/components/dashboard/UpcomingAlerts";
import { LivePositions } from "@/components/dashboard/LivePositions";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John. Here's your trading overview.</p>
        </div>
        <Button className="bg-primary hover:bg-primary-dark text-primary-foreground gap-2">
          <Plus className="w-4 h-4" />
          New Alert
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Balance"
          value="$13,285.50"
          change={{ value: "+8.2%", isPositive: true }}
          icon={Wallet}
          iconColor="text-primary"
          iconBg="bg-gradient-to-br from-primary/10 to-primary/20"
        />
        <StatsCard
          title="Today's P&L"
          value="+$425.30"
          change={{ value: "+3.2%", isPositive: true }}
          icon={TrendingUp}
          iconColor="text-profit"
          iconBg="bg-gradient-to-br from-profit/10 to-profit/20"
        />
        <StatsCard
          title="Active Alerts"
          value="12"
          change={{ value: "+2 today", isPositive: true }}
          icon={Bell}
          iconColor="text-warning"
          iconBg="bg-gradient-to-br from-warning/10 to-warning/20"
        />
        <StatsCard
          title="Win Rate"
          value="78%"
          change={{ value: "+5% this week", isPositive: true }}
          icon={Target}
          iconColor="text-secondary"
          iconBg="bg-gradient-to-br from-secondary/10 to-secondary/20"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <BalanceChart />
        </div>
        
        {/* Upcoming Alerts - Takes 1 column */}
        <div>
          <UpcomingAlerts />
        </div>
      </div>

      {/* Live Positions - Full width */}
      <div>
        <LivePositions />
      </div>
    </div>
  );
};

export default Dashboard;