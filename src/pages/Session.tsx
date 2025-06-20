import { Plus, Music, Calendar, FileAudio, ChevronRight, X, Trash2 } from 'lucide-react';
import { useState } from 'react';
import NavBarM from './NavBarM';
import { Link } from 'react-router-dom';


export default function SessionPage() {
  // Mock data for active sessions
  const [sessions, setSessions] = useState([
    {
      id: 'session-001',
      name: 'Recording Session #1',
      dateCreated: '2025-06-15',
      timeCreated: '10:30 AM',
      fileCount: 3,
      status: 'Active'
    },
    {
      id: 'session-002',
      name: 'Recording Session #2',
      dateCreated: '2025-06-14',
      timeCreated: '2:15 PM',
      fileCount: 7,
      status: 'Active'
    },
    {
      id: 'session-003',
      name: 'Recording Session #3',
      dateCreated: '2025-06-13',
      timeCreated: '9:45 AM',
      fileCount: 2,
      status: 'Active'
    },
    {
      id: 'session-004',
      name: 'Recording Session #4',
      dateCreated: '2025-06-12',
      timeCreated: '4:20 PM',
      fileCount: 5,
      status: 'Active'
    }
  ]);

  // State for popup
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');

  const handleUploadClick = () => {
    setShowCreatePopup(true);
  };

  const handleCreateSession = () => {
    if (newSessionName.trim()) {
      const now = new Date();
      const newSession = {
        id: `session-${Date.now()}`,
        name: newSessionName.trim(),
        dateCreated: now.toISOString().split('T')[0],
        timeCreated: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fileCount: 0,
        status: 'Active'
      };
      
      setSessions([newSession, ...sessions]);
      setNewSessionName('');
      setShowCreatePopup(false);
    }
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent session click when deleting
    setSessions(sessions.filter(session => session.id !== sessionId));
  };

  const handleClosePopup = () => {
    setShowCreatePopup(false);
    setNewSessionName('');
  };


  const formatDate = (dateString: string, timeString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${timeString}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${timeString}`;
    } else {
      return `${date.toLocaleDateString()} at ${timeString}`;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBarM />
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Sessions
            </h1>
            <p className="text-gray-400 text-lg mt-1">
              {sessions.length} active session{sessions.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {/* Plus Button */}
          <button
            onClick={handleUploadClick}
            aria-label="Create new session"
            className="
              group relative w-14 h-14 rounded-2xl flex items-center justify-center text-white
              transition-all duration-300 ease-out transform hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
              shadow-2xl hover:shadow-purple-500/25
              overflow-hidden
            "
            style={{ backgroundColor: '#3b19e6' }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = '#2d14b8';
              (e.target as HTMLButtonElement).style.boxShadow = '0 20px 40px rgba(59, 25, 230, 0.3)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = '#3b19e6';
              (e.target as HTMLButtonElement).style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Plus className="w-7 h-7 relative z-10 transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>

        {/* Divider with Gradient */}
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

        {/* Sessions Grid */}
        {sessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sessions.map((session) => (
              <Link
                to={`/session/${session.id}`}
                key={session.id}
                className="
                  group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700
                  hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10
                  cursor-pointer transition-all duration-300 transform hover:scale-[1.02]
                  relative block
                "
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                      {session.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs border border-green-800">
                        {session.status}
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
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                  </div>
                </div>

                {/* Session Stats */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">Created</p>
                      <p className="text-sm text-white font-medium">
                        {formatDate(session.dateCreated, session.timeCreated)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
                      <FileAudio className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">Files</p>
                      <p className="text-sm text-white font-medium">
                        {session.fileCount} audio file{session.fileCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
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

        {/* Summary Stats */}
        {sessions.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                    <Music className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{sessions.length}</p>
                    <p className="text-sm text-gray-400">Active Sessions</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                    <FileAudio className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {sessions.reduce((total, session) => total + session.fileCount, 0)}
                    </p>
                    <p className="text-sm text-gray-400">Total Files</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {Math.round((Date.now() - new Date(sessions[sessions.length - 1]?.dateCreated).getTime()) / (1000 * 60 * 60 * 24))}
                    </p>
                    <p className="text-sm text-gray-400">Days Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Session Popup */}
      {showCreatePopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl max-w-md w-full mx-4">
            {/* Popup Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Create New Session</h3>
              <button
                onClick={handleClosePopup}
                className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div>
                <label htmlFor="sessionName" className="block text-sm font-medium text-gray-300 mb-2">
                  Session Name
                </label>
                <input
                  id="sessionName"
                  type="text"
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                  placeholder="Enter session name..."
                  className="
                    w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl
                    text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-[#3b19e6] focus:border-transparent transition-all duration-200
                  "
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateSession();
                    } else if (e.key === 'Escape') {
                      handleClosePopup();
                    }
                  }}
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleClosePopup}
                  className="
                    flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl
                    transition-colors duration-200 font-medium
                  "
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateSession}
                  disabled={!newSessionName.trim()}
                  className="
                    flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-[#3b19e6]
                    disabled:cursor-not-allowed text-white rounded-xl transition-colors 
                    duration-200 font-medium
                  "
                >
                  Create Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}