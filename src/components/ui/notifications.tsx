"use client";

import { CheckCircle, Info, X, XCircle, AlertTriangle } from "lucide-react";

import { useNotifications, type Notification } from "@/stores/notifications";
import { cn } from "@/utils/cn";

const icons = {
  info: <Info className="size-5 text-blue-500" aria-hidden="true" />,
  success: <CheckCircle className="size-5 text-green-500" aria-hidden="true" />,
  warning: (
    <AlertTriangle className="size-5 text-yellow-500" aria-hidden="true" />
  ),
  error: <XCircle className="size-5 text-red-500" aria-hidden="true" />,
};

const NotificationToast = ({
  notification: { id, type, title, message },
  onDismiss,
}: {
  notification: Notification;
  onDismiss: (id: string) => void;
}) => {
  return (
    <div
      role="alert"
      aria-label={title}
      className="flex w-full flex-col items-center space-y-4 sm:items-end"
    >
      <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-background shadow-lg ring-1 ring-black/5">
        <div className="p-4">
          <div className="flex items-start">
            <div className="shrink-0">{icons[type]}</div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-foreground">{title}</p>
              {message && (
                <p className="mt-1 text-sm text-muted-foreground">{message}</p>
              )}
            </div>
            <div className="ml-4 flex shrink-0">
              <button
                type="button"
                className="inline-flex rounded-md text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                onClick={() => onDismiss(id)}
              >
                <span className="sr-only">Close</span>
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <div
      aria-live="assertive"
      className={cn(
        "pointer-events-none fixed inset-0 z-50 flex flex-col items-end space-y-4 px-4 py-6 sm:items-start sm:p-6"
      )}
    >
      {notifications.map(notification => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}
    </div>
  );
};
