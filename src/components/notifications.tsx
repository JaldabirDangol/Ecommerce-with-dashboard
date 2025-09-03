"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

type Notification = {
  id: string;
  message: string;
  link?: string;
  isRead?: boolean;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications");
        if (!response.ok) throw new Error("Failed to fetch notifications");
        const data: Notification[] = await response.json();
        setNotifications(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load notifications.");
        toast.error("Failed to load notifications.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 20000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell size={18} /> Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading notifications...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : notifications.length > 0 ? (
          <ul className="list-disc list-inside text-sm space-y-2">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={n.isRead ? "text-gray-500" : "text-black font-medium"}
              >
                {n.link ? (
                  <a href={n.link} className="hover:underline">
                    {n.message}
                  </a>
                ) : (
                  n.message
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No notifications yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
