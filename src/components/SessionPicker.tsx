import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface Session {
  id: string;
  name: string;
  createdAt: string;
}

interface SessionPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSession: (sessionId: string) => void;
}

const SessionPicker: React.FC<SessionPickerProps> = ({
  isOpen,
  onClose,
  onSelectSession,
}) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchSessions();
    }
  }, [isOpen]);

  const fetchSessions = async () => {
    setLoading(true);
    setError('');
    try {
      const session = await supabase.auth.getSession();
      const userId = session.data.session?.user?.id;
      if (!userId) throw new Error('User not authenticated');

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/sessions/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${session.data.session?.access_token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch sessions');

      setSessions(data || []);
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#121118] rounded-xl w-full max-w-md mx-4 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Select a Session</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800 rounded-full">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-3 max-h-72 overflow-y-auto">
          {loading && <p className="text-gray-400 text-sm">Loading sessions...</p>}
          {error && <p className="text-red-400 text-sm">{error}</p>}
          {!loading && !error && sessions.length === 0 && (
            <p className="text-gray-500 text-sm">No sessions found. Create one first.</p>
          )}
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className="w-full text-left bg-[#1e1d24] hover:bg-[#2a2731] px-4 py-3 rounded-lg transition-all text-white font-medium"
            >
              {session.name}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-700 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionPicker;
