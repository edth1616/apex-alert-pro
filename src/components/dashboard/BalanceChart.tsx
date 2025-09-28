import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const balanceData = [
  { date: "Jan 1", value: 10000 },
  { date: "Jan 8", value: 10500 },
  { date: "Jan 15", value: 11200 },
  { date: "Jan 22", value: 10800 },
  { date: "Jan 29", value: 12100 },
  { date: "Feb 5", value: 11900 },
  { date: "Feb 12", value: 13285 },
];

export const BalanceChart = () => {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Balance History</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={balanceData}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--chart-primary))" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--chart-grid))" 
              vertical={false}
            />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              hide 
              domain={['dataMin - 500', 'dataMax + 500']}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-dropdown)',
                fontSize: '14px'
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Balance']}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--chart-primary))" 
              strokeWidth={2}
              fill="url(#balanceGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};