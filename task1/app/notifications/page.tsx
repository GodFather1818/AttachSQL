// pages/notifications.jsx
"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Layout from '@/components/ui/Layout';
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button
} from "@mui/material";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.token) {
      fetchNotifications();
    }
  }, [session]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:3002/notifications', {
        headers: { Authorization: `Bearer ${session.user.token}` },
      });
      setNotifications(response.data);
      window.dispatchEvent(new Event('refreshUnreadCount'));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.patch(`http://localhost:3002/notifications/${notificationId}/read`, {}, {
        headers: { Authorization: `Bearer ${session.user.token}` },
      });
      fetchNotifications(); // Refresh the list
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  
  const handleDelete = async (notificationId) => {
    try {
      await axios.delete(`http://localhost:3002/notifications/${notificationId}`, {
        headers: { Authorization: `Bearer ${session.user.token}` },
      });
      setNotifications(notifications.filter((notification) => notification._id !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <Layout>
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li 
            key={notification._id} 
            className={`p-4 border rounded-lg shadow-sm ${notification.read ? 'bg-gray-50' : 'bg-white'}`}
          >
            <div className="flex justify-between items-start">
              <p className="flex-grow">{notification.message}</p>
              <Button 
                onClick={() => handleDelete(notification._id)}
                className="ml-2 min-w-0 p-1"
              >
                <DeleteIcon sx={{ color: "red", fontSize: 20 }} />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">{new Date(notification.createdAt).toLocaleString()}</p>
            {!notification.read && (
              <button 
                onClick={() => markAsRead(notification._id)}
                className="mt-2 text-sm text-blue-500 hover:text-blue-700"
              >
                Mark as read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  </Layout>
  );
}
