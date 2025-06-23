// src/components/NotificationModal.tsx
import React from 'react';
import { Bell, BellOff } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal positioned at top-right */}
      <div className="fixed top-16 right-4 z-50 w-80 max-w-[calc(100vw-2rem)]">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 transform transition-all duration-300 animate-in slide-in-from-top-2">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-400" />
              Notifications
            </h3>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors duration-200 p-1 hover:bg-white/10 rounded-lg"
            >
              ✕
            </button>
          </div>

          {/* Empty State */}
          <div className="text-center py-8">
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <BellOff className="w-8 h-8 text-white/60" />
                </div>
                {/* Floating particles */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400/40 rounded-full animate-pulse" />
                <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400/40 rounded-full animate-pulse delay-1000" />
              </div>
            </div>
            
            <h4 className="text-white font-medium mb-2">No notifications yet</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              When you have new notifications, they'll appear here. Stay tuned for updates!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationModal;