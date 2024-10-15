import { useState, createContext, ReactElement, FC } from "react";

type Notification = {
  type: string;
  dismissible: boolean;
  content: string;
  id: number;
  onDismiss: () => void;
};

const NotificationContext = createContext<any>(null);

export const NotificationProvider: FC<{ children: ReactElement }> = ({
  children,
}) => {
  //  State
  const [notifications, setNotifications] = useState<Notification[]>([]);

  //  Functions
  const pushNotification = (message: string, type: string, scroll = true) => {
    const id = notifications.length + 1;
    setNotifications((prev) => [
      ...prev,
      {
        type,
        dismissible: true,
        content: message,
        id,
        onDismiss: () =>
          setNotifications((items) => items.filter((item) => item.id !== id)),
      },
    ]);
    if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearNotification = () => setNotifications([]);

  return (
    <NotificationContext.Provider
      value={{ notifications, pushNotification, clearNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
