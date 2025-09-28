import { Bell, CheckCircle, AlertTriangle, TrendingUp, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationCenterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const notifications = [
  {
    id: 1,
    type: "alert_triggered",
    title: "Alert Triggered",
    message: "BTCUSDT LONG target reached at $45,000",
    time: "2 minutes ago",
    read: false,
    icon: TrendingUp,
    color: "text-profit",
  },
  {
    id: 2,
    type: "position_closed",
    title: "Position Closed",
    message: "ETHUSDT SHORT closed with +$250 profit",
    time: "15 minutes ago",
    read: false,
    icon: CheckCircle,
    color: "text-profit",
  },
  {
    id: 3,
    type: "system",
    title: "System Update",
    message: "New trading features available",
    time: "1 hour ago",
    read: true,
    icon: Bell,
    color: "text-info",
  },
];

export const NotificationCenter = ({ open, onOpenChange }: NotificationCenterProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-96 p-0">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </SheetTitle>
            <Button variant="ghost" size="sm">
              Mark all read
            </Button>
          </div>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-3">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`
                    p-4 rounded-lg border transition-colors hover:bg-muted/30 cursor-pointer
                    ${!notification.read ? 'bg-accent/20 border-primary/20' : 'bg-card border-border'}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full bg-muted ${notification.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{notification.title}</p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bell className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No notifications</h3>
              <p className="text-sm text-muted-foreground">
                You're all caught up! New notifications will appear here.
              </p>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};