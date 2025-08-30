"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Bell, X, Check, Trash2 } from "lucide-react";
import {
  getAdminNotifications,
  markAdminNotificationAsRead,
  deleteAdminNotification,
} from "@/services/admin";
import {
  getNotifications,
  markNotificationAsRead,
} from "@/services/notification";

const NotificationDropdown = React.memo(({ isAdmin = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen, isAdmin]);

  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      let data;

      if (isAdmin) {
        data = await getAdminNotifications("all");
      } else {
        data = await getNotifications("all");
      }

      const mapped = (data || []).map((n) => ({
        id: n.id,
        title: n.notification?.title || n.title || "Notification",
        message: n.notification?.message || n.message || "",
        time: new Date(
          n.delivered_at ||
            n.created_at ||
            n.notification?.created_at ||
            Date.now()
        ).toLocaleString(),
        ts: new Date(
          n.delivered_at ||
            n.created_at ||
            n.notification?.created_at ||
            Date.now()
        ).getTime(),
        read: Boolean(n.is_read || n.read),
        type: "general",
        details: n.notification?.message || n.message || "",
      }));

      setNotifications(mapped);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isAdmin]);

  const markAsRead = useCallback(
    async (id) => {
      try {
        if (isAdmin) {
          await markAdminNotificationAsRead(id);
        } else {
          await markNotificationAsRead(id);
        }

        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === id ? { ...notif, read: true } : notif
          )
        );
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    },
    [isAdmin]
  );

  const deleteNotification = useCallback(
    async (id) => {
      try {
        if (isAdmin) {
          await deleteAdminNotification(id);
        }
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
      } catch (error) {
        console.error("Error deleting notification:", error);
      }
    },
    [isAdmin]
  );

  // Memoize unread count calculation
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const formatTime = useCallback((timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleNotificationClick = useCallback(
    (notification) => {
      if (!notification.read) {
        markAsRead(notification.id);
      }
    },
    [markAsRead]
  );

  const handleDeleteClick = useCallback(
    (e, id) => {
      e.stopPropagation();
      deleteNotification(id);
    },
    [deleteNotification]
  );

  const handleMarkAllAsRead = useCallback(() => {
    notifications.forEach((n) => {
      if (!n.read) markAsRead(n.id);
    });
  }, [notifications, markAsRead]);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Notifications
            </h3>
            <button
              onClick={closeDropdown}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2">Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No notifications</p>
              </div>
            ) : (
              <div>
                {notifications.slice(0, 10).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start">
                          <span
                            className={`mt-1 mr-3 inline-flex items-center justify-center w-2 h-2 rounded-full ${
                              notification.read ? "bg-green-500" : "bg-red-500"
                            }`}
                          >
                            {notification.read && (
                              <span className="text-white text-[8px]">✓</span>
                            )}
                          </span>

                          <div className="flex-1">
                            <h4
                              className={`text-sm font-semibold ${
                                !notification.read
                                  ? "text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {formatTime(notification.ts)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {isAdmin && (
                        <button
                          onClick={(e) => handleDeleteClick(e, notification.id)}
                          className="ml-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {unreadCount} unread
                </span>
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

NotificationDropdown.displayName = "NotificationDropdown";

export default NotificationDropdown;
