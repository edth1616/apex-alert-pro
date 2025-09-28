import { Home, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";

const navigationItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Bell, label: "Alerts", path: "/alerts" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="border-b bg-card/30">
      <div className="px-6">
        <div className="flex gap-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Button
                key={item.path}
                variant="ghost"
                asChild
                className={`
                  h-12 gap-2 px-4 rounded-none border-b-2 transition-all duration-200
                  ${isActive 
                    ? 'border-primary bg-accent/50 text-primary font-medium shadow-sm' 
                    : 'border-transparent hover:border-muted-foreground/20 hover:bg-muted/30'
                  }
                `}
              >
                <Link to={item.path}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};