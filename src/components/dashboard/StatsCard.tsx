import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  iconColor, 
  iconBg 
}: StatsCardProps) => {
  return (
    <Card className="hover:shadow-card-hover transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {change && (
              <div className="flex items-center gap-1">
                {change.isPositive ? (
                  <TrendingUp className="w-4 h-4 text-profit" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-loss" />
                )}
                <span className={`text-sm font-medium ${
                  change.isPositive ? 'text-profit' : 'text-loss'
                }`}>
                  {change.value}
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl ${iconBg}`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};