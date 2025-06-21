import { Plus, Music, Calendar, FileAudio, ChevronRight, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import NavBarM from './NavBarM';
import { Link } from 'react-router-dom';
import CreateSessionModal from '../components/CreateSessionModal';
import { supabase } from '../lib/supabaseClient';

export default function SessionPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  // Fetch sessions on mount
  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const res = await fetch(`http://localhost:3000/sessions/user/${user.id}`, {
        headers: { 'Cache-Control': 'no-cache' },
      });

      const data = await res.json();
      console.log('Fetched sessions:', data);
      setSessions(data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const handleCreateSession = async (sessionName: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;
      if (!userId) throw new Error('Not logged in');

      const res = await fetch('http://localhost:3000/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: sessionName, userId }),
      });

      if (res.ok) {
        console.log('Session created');
        fetchSessions();
        setShowCreatePopup(false);
      }
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const handleDeleteSession = async (sessionId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      const res = await fetch(`http://localhost:3000/sessions/${sessionId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const err = await res.json();
        console.error('Delete session failed:', err);
        return;
      }

      console.log('Session deleted:', sessionId);
      fetchSessions(); // Refetch updated list
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  const formatDate = (input: string | Date) => {
    const date = new Date(input);
    if (isNaN(date.getTime())) return 'Invalid date';

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBarM />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Sessions
            </h1>
            <p className="text-gray-400 text-lg mt-1">
              {sessions.length} active session{sessions.length !== 1 ? 's' : ''}
            </p>
          </div>

          <button
            onClick={() => setShowCreatePopup(true)}
            aria-label="Create new session"
            className="group relative w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all duration-300 ease-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black shadow-2xl hover:shadow-purple-500/25 overflow-hidden"
            style={{ backgroundColor: '#3b19e6' }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.backgroundColor = '#2d14b8';
              btn.style.boxShadow = '0 20px 40px rgba(59, 25, 230, 0.3)';
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.backgroundColor = '#3b19e6';
              btn.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Plus className="w-7 h-7 relative z-10 transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>

        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-black px-4">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
            </div>
          </div>
        </div>

        {sessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 transform hover:scale-[1.02] relative"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                      {session.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs border border-green-800">
                        Active
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => handleDeleteSession(session.id, e)}
                      className="w-8 h-8 rounded-lg bg-red-600/20 hover:bg-red-600/30 flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      aria-label="Delete session"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Link
                      to={`/session/${session.id}`}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-purple-400 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">Created</p>
                      <p className="text-sm text-white font-medium">{formatDate(session.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
                      <FileAudio className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">Files</p>
                      <p className="text-sm text-white font-medium">
                        {session._count?.tracks ?? 0} audio file{session._count?.tracks !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                <Music className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No sessions yet</h3>
                <p className="text-gray-500">Create your first recording session to get started</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Session Modal */}
      <CreateSessionModal
        isOpen={showCreatePopup}
        onClose={() => setShowCreatePopup(false)}
        onCreate={handleCreateSession}
      />
    </div>
  );
}
