// pages/notifications.jsx
"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Layout from '@/components/ui/Layout';

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

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li 
              key={notification._id} 
              className={`p-4 border rounded ${notification.read ? 'bg-gray-100' : 'bg-white'}`}
            >
              <p>{notification.message}</p>
              <p className="text-sm text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
              {!notification.read && (
                <button 
                  onClick={() => markAsRead(notification._id)}
                  className="mt-2 text-sm text-blue-500"
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

// // pages/notifications.jsx
// "use client";
// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import axios from 'axios';
// import Layout from '@/components/ui/Layout';

// export default function Notifications() {
//   const [notifications, setNotifications] = useState([]);
//   const { data: session } = useSession();

//   useEffect(() => {
//     if (session?.user?.token) {
//       fetchNotifications();
//     }
//   }, [session]);

//   const fetchNotifications = async () => {
//     try {
//       const response = await axios.get('http://localhost:3002/notifications', {
//         headers: { Authorization: `Bearer ${session.user.token}` },
//       });
//       setNotifications(response.data);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   };

//   const markAsRead = async (notificationId) => {
//     try {
//       await axios.patch(`http://localhost:3002/notifications/${notificationId}/read`, {}, {
//         headers: { Authorization: `Bearer ${session.user.token}` },
//       });
//       fetchNotifications(); // Refresh the list
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//     }
//   };

//   // ... rest of the component remains the same
