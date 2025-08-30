"use client";

import React, { useEffect, useState } from "react";
import {
  getAdminNotifications,
  markAdminNotificationAsRead,
  deleteAdminNotification,
} from "@/services/admin";
import {
  Bell,
  ChevronLeft,
  MoreVertical,
  Check,
  X,
  Settings,
  Trash2,
  Archive,
} from "lucide-react";
import { getNotifications } from "@/services/notification";

const AdminNotificationsPage = () => {
  const [currentView, setCurrentView] = useState("list"); // 'list', 'empty', 'detail'
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getNotifications("all");
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
          course: null,
        }));
        setNotifications(mapped);
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    };
    load();
  }, []);

  const [filter, setFilter] = useState("all"); // 'all', 'unread', 'read'

  const getNotificationIcon = (type) => {
    const iconClass = "w-5 h-5";
    switch (type) {
      case "assignment":
        return (
          <div
            className={`${iconClass} bg-orange-100 text-orange-600 rounded-full p-1`}
          >
            📝
          </div>
        );
      case "course":
        return (
          <div
            className={`${iconClass} bg-blue-100 text-[#13485B] rounded-full p-1`}
          >
            📚
          </div>
        );
      case "achievement":
        return (
          <div
            className={`${iconClass} bg-green-100 text-green-600 rounded-full p-1`}
          >
            🏆
          </div>
        );
      case "billing":
        return (
          <div
            className={`${iconClass} bg-purple-100 text-purple-600 rounded-full p-1`}
          >
            💳
          </div>
        );
      default:
        return <Bell className={iconClass} />;
    }
  };

  const markAsRead = async (id) => {
    try {
      await markAdminNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await deleteAdminNotification(id);
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
      if (selectedNotification?.id === id) {
        setCurrentView("list");
        setSelectedNotification(null);
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((n) => !n.read);
      await Promise.all(
        unreadNotifications.map((n) => markAdminNotificationAsRead(n.id))
      );
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const getFilteredNotifications = () => {
    switch (filter) {
      case "unread":
        return notifications.filter((n) => !n.read);
      case "read":
        return notifications.filter((n) => n.read);
      default:
        return notifications;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Empty State Component
  const EmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Bell className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No notifications
      </h3>
      <p className="text-gray-600 max-w-sm">
        When you have new notifications, they'll appear here.
      </p>
    </div>
  );

  // Notification List Component
  const NotificationList = () => (
    <div className="flex-1 overflow-y-auto">
      {/* Filter Tabs */}
      <div className="flex space-x-1 rounded-lg bg-[#EAF7FC] w-fit border-b">
        {["all", "read", "unread"].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-6 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              filter === filterType
                ? "bg-[#268FB6] text-white"
                : "text-[#268FB6] hover:text-gray-900"
            }`}
          >
            {filterType}
          </button>
        ))}
      </div>

      {getFilteredNotifications().length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-7">
          {Object.entries(
            getFilteredNotifications().reduce((acc, n) => {
              const d = new Date(n.ts);
              const now = new Date();
              let label = d.toLocaleDateString();
              if (
                d.getFullYear() === now.getFullYear() &&
                d.getMonth() === now.getMonth() &&
                d.getDate() === now.getDate()
              )
                label = "Today";
              const y = new Date(now);
              y.setDate(now.getDate() - 1);
              if (
                d.getFullYear() === y.getFullYear() &&
                d.getMonth() === y.getMonth() &&
                d.getDate() === y.getDate()
              )
                label = "Yesterday";
              if (!acc[label]) acc[label] = [];
              acc[label].push(n);
              return acc;
            }, {})
          ).map(([label, items]) => (
            <div key={label} className="border-b border-gray-200">
              <div className="px-4 py-2 text-sm font-semibold text-gray-600">
                {label}
              </div>
              <div>
                {items.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => {
                      setSelectedNotification(notification);
                      setCurrentView("detail");
                      if (!notification.read) {
                        markAsRead(notification.id);
                      }
                    }}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-start">
                      <span
                        className={`mt-1 mr-3 inline-flex items-center justify-center w-3 h-3 rounded-full ${
                          notification.read ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {notification.read ? (
                          <span className="text-white text-[10px]">✓</span>
                        ) : null}
                      </span>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4
                            className={`text-sm font-semibold ${
                              !notification.read
                                ? "text-gray-900"
                                : "text-gray-700"
                            }`}
                          >
                            {notification.title}
                          </h4>

                          <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                            {new Date(notification.ts).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-end mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="text-xs text-red-600 hover:text-red-800 mr-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Notification Detail Component
  const NotificationDetail = () => (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-6">
          {getNotificationIcon(selectedNotification.type)}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {selectedNotification.title}
            </h2>
            {selectedNotification.course && (
              <span className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full mb-4">
                {selectedNotification.course}
              </span>
            )}
          </div>
        </div>

        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 leading-relaxed">
            {selectedNotification.details}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">
            {selectedNotification.time}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => deleteNotification(selectedNotification.id)}
              className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">Delete</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded transition-colors">
              <Archive className="w-4 h-4" />
              <span className="text-sm">Archive</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="bg-white space-y-5 overflow-hidden"
      style={{ height: "600px" }}
    >
      {/* Header */}
      <div className="bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {currentView === "detail" && (
              <button
                onClick={() => {
                  setCurrentView("list");
                  setSelectedNotification(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-lg font-semibold text-gray-900">
              {currentView === "detail"
                ? "Notification Details"
                : "Admin Notifications"}
            </h1>
            {currentView === "list" && unreadCount > 0 && (
              <span className="bg-[#268FB6] text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </div>

          {currentView === "list" && notifications.length > 0 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {currentView === "empty" && <EmptyState />}
        {currentView === "list" && <NotificationList />}
        {currentView === "detail" && selectedNotification && (
          <NotificationDetail />
        )}
      </div>
    </div>
  );
};

export default AdminNotificationsPage;
