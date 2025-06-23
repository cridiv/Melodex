import React, { useState, useEffect } from 'react';
import { Upload, Home, User, LogOut, Music, Calendar, CheckCircle, Clock, AlertCircle, Menu, X, Activity, Zap, TrendingUp, Plus, Search, Bell, Folder, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavBarM from './NavBarM';
import { supabase } from '../lib/supabaseClient';

type TrackStatus = 'processed' | 'processing' | 'failed';

interface Track {
  id: number;
  name: string;
  date: string;
  status: TrackStatus;
  size: string;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const HomePageM = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) {
        console.error('Not authenticated');
        return;
      }

      const userId = session.user.id;
      const accessToken = session.access_token;

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/sessions/all-user-tracks/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await res.json();

        const formattedTracks = data.map((track: any) => ({
          id: track.id,
          name: track.title || track.filename || 'Untitled',
          date: new Date(track.created_at).toISOString().slice(0, 10),
          status: track.status || 'processed',
          size: track.size || '3.0 MB',
        }));

        setTracks(formattedTracks);
      } catch (err) {
        console.error('Error loading tracks:', err);
      }
    };

    fetchTracks();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getStatusIcon = (status: TrackStatus) => {
    switch (status) {
      case 'processed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: TrackStatus) => {
    switch (status) {
      case 'processed':
        return 'text-green-400';
      case 'processing':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBarM />
      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Welcome back, John
          </h2>
          <p className="text-gray-400 text-sm">Ready to analyze some music?</p>
        </div>

        {/* Stats Cards - Mobile Layout */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-gray-800" style={{ backgroundColor: '#3b19e6' }}>
            <div className="flex items-center justify-between mb-2">
              <Music className="w-6 h-6 text-white" />
              <TrendingUp className="w-4 h-4 text-white/60" />
            </div>
            <p className="text-white/80 text-xs mb-1">Total Tracks</p>
            <p className="text-2xl font-bold text-white">{tracks.length}</p>
          </div>

          <div className="p-4 rounded-xl border border-gray-800" style={{ backgroundColor: '#3b19e6' }}>
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-6 h-6 text-white" />
              <Zap className="w-4 h-4 text-white/60" />
            </div>
            <p className="text-white/80 text-xs mb-1">Processed</p>
            <p className="text-2xl font-bold text-white">{tracks.filter(t => t.status === 'processed').length}</p>
          </div>

          <div className="p-4 rounded-xl border border-gray-800" style={{ backgroundColor: '#3b19e6' }}>
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-6 h-6 text-white" />
              <Activity className="w-4 h-4 text-white/60" />
            </div>
            <p className="text-white/80 text-xs mb-1">Processing</p>
            <p className="text-2xl font-bold text-white">{tracks.filter(t => t.status === 'processing').length}</p>
          </div>

          <div className="p-4 rounded-xl border border-gray-800" style={{ backgroundColor: '#3b19e6' }}>
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-6 h-6 text-white" />
              <Music className="w-4 h-4 text-white/60" />
            </div>
            <p className="text-white/80 text-xs mb-1">This Month</p>
            <p className="text-2xl font-bold text-white">24</p>
          </div>
        </div>

        {/* Quick Actions - Mobile */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-4 rounded-xl border border-gray-800 hover:scale-[0.98] transition-all duration-200 text-left flex items-center space-x-4" style={{ backgroundColor: '#3b19e6' }}>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <Link to="/upload"><h4 className="font-semibold text-white">Upload New Track</h4></Link>
                <p className="text-white/70 text-xs">Add audio file for analysis</p>
              </div>
            </button>

            <button 
              onClick={() => {
                const element = document.getElementById('recent-tracks');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full p-4 rounded-xl border border-gray-800 hover:scale-[0.98] transition-all duration-200 text-left flex items-center space-x-4" 
              style={{ backgroundColor: '#3b19e6' }}
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white">View Analytics</h4>
                <p className="text-white/70 text-xs">Explore detailed insights</p>
              </div>
            </button>

            <button className="w-full p-4 rounded-xl border border-gray-800 hover:scale-[0.98] transition-all duration-200 text-left flex items-center space-x-4" style={{ backgroundColor: '#3b19e6' }}>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Export Results</h4>
                <p className="text-white/70 text-xs">Download analysis data</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Tracks - Mobile Card Layout */}
        <div id="recent-tracks">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Recent Tracks</h3>
            <button className="text-sm text-blue-400 font-medium">View All</button>
          </div>
          <div className="space-y-3">
            {tracks.slice(0, 3).map((track) => (
              <div key={track.id} className="p-4 rounded-xl border border-gray-800" style={{ backgroundColor: '#3b19e6' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Music className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white truncate">{track.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="w-3 h-3 text-white/60" />
                      <span className="text-xs text-white/60">{track.date}</span>
                      <span className="text-xs text-white/60">•</span>
                      <span className="text-xs text-white/60">{track.size}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(track.status)}
                    <span className={`text-xs font-medium capitalize ${getStatusColor(track.status)}`}>
                      {track.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button with Modal */}
      <div className="fixed bottom-6 right-6">
        {/* Animated Plus/X Button */}
        <button
          onClick={toggleModal}
          aria-label={isModalOpen ? 'Close menu' : 'Open menu'}
          className={`
            w-14 h-14 rounded-full flex items-center justify-center text-white
            transition-all duration-300 ease-in-out shadow-lg hover:scale-110
            ${isModalOpen ? 'rotate-180' : ''}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          `}
          style={{ backgroundColor: '#3b19e6' }}
        >
          {isModalOpen ? (
            <X className="w-6 h-6 transition-transform duration-300" />
          ) : (
            <Plus className="w-6 h-6 transition-transform duration-300" />
          )}
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div 
            className="
              absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 z-50
              space-y-2
            "
          >
            {/* Create Session Option */}
            <div 
              className="relative"
              onMouseEnter={() => setHoveredOption('session')}
              onMouseLeave={() => setHoveredOption(null)}
            ><Link to="/session">
              <button
                className="
                  w-12 h-12 rounded-full flex items-center justify-center text-white
                  transition-all duration-300 ease-in-out
                  hover:scale-110 shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                "
                style={{ backgroundColor: '#3b19e6' }}
                onClick={() => {
                  // Handle create session action
                  console.log('Create session clicked');
                  toggleModal();
                }}
              >
                <Folder className="w-6 h-6" />
              </button></Link>
              
              {/* Create Session Tooltip */}
              {hoveredOption === 'session' && (
                <div className="
                  absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2
                  bg-black text-white text-xs px-2 py-1 rounded
                  whitespace-nowrap z-10
                ">
                  Create a new Session
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black"></div>
                </div>
              )}
            </div>

            {/* Lyrics Option */}
            <div 
              className="relative"
              onMouseEnter={() => setHoveredOption('lyrics')}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <button
                className="
                  w-12 h-12 rounded-full flex items-center justify-center text-white
                  transition-all duration-300 ease-in-out
                  hover:scale-110 shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                "
                style={{ backgroundColor: '#3b19e6' }}
                onClick={() => {
                  // Handle lyrics action
                  console.log('Generate lyrics clicked');
                  toggleModal();
                }}
              >
                <FileText className="w-6 h-6" />
              </button>
              
              {/* Lyrics Tooltip */}
              {hoveredOption === 'lyrics' && (
                <div className="
                  absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2
                  bg-black text-white text-xs px-2 py-1 rounded
                  whitespace-nowrap z-10
                ">
                  Generate lyrics
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black"></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Side Menu */}
              <div className={`fixed inset-y-0 left-0 w-80 transform transition-transform duration-300 ease-in-out z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col border-r border-gray-800 bg-black">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg transition-colors text-white"
                style={{ backgroundColor: 'black' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3b19e6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'black'}
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-800">
            <div className="flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 cursor-pointer" 
                 style={{ backgroundColor: '#3b19e6' }}
                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b19e6'}>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">John Doe</p>
                <p className="text-sm text-white/70">Premium User</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default HomePageM;