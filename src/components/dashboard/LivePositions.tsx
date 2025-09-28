import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, X, Edit3 } from "lucide-react";

const livePositions = [
  {
    id: 1,
    symbol: "BTCUSDT",
    type: "LONG",
    entry: 42800,
    current: 43250,
    pnl: "+$450",
    pnlPercent: "+1.05%",
    size: "0.5 BTC",
    isProfit: true
  },
  {
    id: 2,
    symbol: "ETHUSDT", 
    type: "SHORT",
    entry: 2580,
    current: 2520,
    pnl: "+$300",
    pnlPercent: "+2.33%", 
    size: "5 ETH",
    isProfit: true
  },
];

export const LivePositions = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Live Positions</CardTitle>
          <Badge variant="outline">{livePositions.length} Active</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {livePositions.length > 0 ? (
          <div className="space-y-4">
            {livePositions.map((position) => {
              const isLong = position.type === "LONG";
              
              return (
                <div key={position.id} className="p-4 border rounded-lg bg-muted/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {isLong ? (
                          <TrendingUp className="w-4 h-4 text-bull" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-bear" />
                        )}
                        <span className="font-semibold">{position.symbol}</span>
                      </div>
                      <Badge 
                        variant={isLong ? "default" : "secondary"}
                        className={isLong ? "bg-bull hover:bg-bull/90" : "bg-bear hover:bg-bear/90"}
                      >
                        {position.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${
                        position.isProfit ? 'text-profit' : 'text-loss'
                      }`}>
                        {position.pnl} ({position.pnlPercent})
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3 text-sm mb-3">
                    <div>
                      <span className="text-muted-foreground">Entry:</span>
                      <p className="font-medium">${position.entry.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Current:</span>
                      <p className="font-medium">${position.current.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Size:</span>
                      <p className="font-medium">{position.size}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" className="h-7 px-2">
                        <Edit3 className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 px-2 text-destructive hover:text-destructive">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Active Positions</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your active trades will appear here once you open positions.
            </p>
            <Button variant="outline" size="sm">
              View Trading History
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};