import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MoreVertical, TrendingUp, TrendingDown } from "lucide-react";

const upcomingAlerts = [
  {
    id: 1,
    symbol: "BTCUSDT",
    type: "LONG",
    target: 45000,
    current: 43250,
    progress: 85,
    notes: "Support bounce expected"
  },
  {
    id: 2,
    symbol: "ETHUSDT", 
    type: "SHORT",
    target: 2400,
    current: 2520,
    progress: 60,
    notes: "Resistance rejection"
  },
  {
    id: 3,
    symbol: "SOLUSDT",
    type: "LONG", 
    target: 85,
    current: 78,
    progress: 92,
    notes: "Breakout pattern"
  },
];

export const UpcomingAlerts = () => {
  return (
    <Card className="h-[400px]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Upcoming Alerts</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingAlerts.map((alert) => {
          const isLong = alert.type === "LONG";
          
          return (
            <div key={alert.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {isLong ? (
                      <TrendingUp className="w-4 h-4 text-bull" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-bear" />
                    )}
                    <span className="font-semibold">{alert.symbol}</span>
                  </div>
                  <Badge 
                    variant={isLong ? "default" : "secondary"}
                    className={isLong ? "bg-bull hover:bg-bull/90" : "bg-bear hover:bg-bear/90"}
                  >
                    {alert.type}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Target:</span>
                  <p className="font-medium">${alert.target.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Current:</span>
                  <p className="font-medium">${alert.current.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Progress:</span>
                  <p className="font-medium">{alert.progress}%</p>
                </div>
              </div>
              
              <Progress value={alert.progress} className="mb-2 h-2" />
              
              <p className="text-sm text-muted-foreground truncate">
                {alert.notes}
              </p>
            </div>
          );
        })}
        
        {upcomingAlerts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No upcoming alerts</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};