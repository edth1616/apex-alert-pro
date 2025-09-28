import { useState } from "react";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { NotificationCenter } from "../notifications/NotificationCenter";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onNotificationClick={() => setShowNotifications(true)} />
      <Navigation />
      
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>

      {/* Notification Center */}
      <NotificationCenter 
        open={showNotifications}
        onOpenChange={setShowNotifications}
      />
    </div>
  );
};