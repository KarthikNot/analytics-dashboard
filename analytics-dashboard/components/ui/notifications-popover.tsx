import React from 'react';

interface NotificationsPopoverProps {
  open: boolean;
  onClose: () => void;
}

export function NotificationsPopover({ open, onClose }: NotificationsPopoverProps) {
  // Example static notifications
  const notifications = [
    { id: 1, message: 'New client campaign launched.' },
    { id: 2, message: 'Monthly report is ready for review.' },
    { id: 3, message: 'Server maintenance scheduled for Sunday.' },
  ];

  if (!open) return null;

  return (
    <div
      className="
        absolute right-0 mt-2 w-80 rounded-md shadow-lg z-40
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        text-zinc-900 dark:text-zinc-100
        animate-fade-in
      "
    >
      <div className="p-4">
        <div className="font-bold text-base mb-2">Notifications</div>
        {notifications.length === 0 ? (
          <div className="text-sm text-zinc-500">No notifications</div>
        ) : (
          <ul className="space-y-2">
            {notifications.map(n => (
              <li key={n.id} className="text-sm">
                • {n.message}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        className="w-full border-t border-zinc-200 dark:border-zinc-800 text-center text-xs py-2 text-zinc-400 hover:text-primary"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}
