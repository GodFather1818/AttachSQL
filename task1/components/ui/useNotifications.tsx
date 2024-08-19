"use client";
// In your _app.tsx or a custom hook
import { useEffect } from 'react';
import io from 'socket.io-client';
import { useSession } from 'next-auth/react';

export function useNotifications() {
    const { data: session } = useSession();
    const permissions = session?.user?.permissions.tasks;
    console.log(permissions);
    const token = session?.user.token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  useEffect(() => {
    if (session?.user) {
      const socket = io('http://localhost:3002', {
        query: { userId: session.user.id },
      });

      socket.on('notification', (notification) => {
        console.log('New notification:', notification);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [session]);
}
