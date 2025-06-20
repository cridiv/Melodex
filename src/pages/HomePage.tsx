import React, { useState } from 'react';
import { Upload, Home, User, LogOut, Music, Calendar, CheckCircle, Clock, AlertCircle, Menu, X, Activity, Zap, TrendingUp } from 'lucide-react';

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

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tracks] = useState<Track[]>([
    {
      id: 1,
      name: "Summer Vibes.mp3",
      date: "2024-06-14",
      status: "processed",
      size: "3.2 MB"
    },
    {
      id: 2,
      name: "Midnight Jazz.wav",
      date: "2024-06-13",
      status: "processing",
      size: "12.8 MB"
    },
    {
      id: 3,
      name: "Electronic Dreams.mp3",
      date: "2024-06-12",
      status: "processed",
      size: "4.1 MB"
    },
    {
      id: 4,
      name: "Acoustic Session.wav",
      date: "2024-06-11",
      status: "failed",
      size: "8.9 MB"
    },
    {
      id: 5,
      name: "Hip Hop Beat.mp3",
      date: "2024-06-10",
      status: "processed",
      size: "2.7 MB"
    }
  ]);

  const getStatusIcon = (status: TrackStatus) => {
    switch (status) {
      case 'processed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
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

  const sidebarItems: SidebarItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'logout', label: 'Logout', icon: LogOut }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <div>
          <h1 className="text-3xl font-bold">Melodex</h1>
          <p className="text-gray-400 text-sm mt-1">Audio Analysis Platform</p>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-3 rounded-lg transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: '#3b19e6' }}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Welcome back, John
            </h2>
            <p className="text-gray-400 text-lg">Ready to analyze some incredible music today?</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="p-8 rounded-2xl border border-gray-800 backdrop-blur-sm" style={{ backgroundColor: '#3b19e6' }}>
              <div className="flex items-center justify-between mb-4">
                <Music className="w-8 h-8 text-white" />
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-white/80 text-sm mb-1">Total Tracks</p>
              <p className="text-3xl font-bold text-white">{tracks.length}</p>
            </div>

            <div className="p-8 rounded-2xl border border-gray-800 backdrop-blur-sm" style={{ backgroundColor: '#3b19e6' }}>
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-white/80 text-sm mb-1">Processed</p>
              <p className="text-3xl font-bold text-white">{tracks.filter(t => t.status === 'processed').length}</p>
            </div>

            <div className="p-8 rounded-2xl border border-gray-800 backdrop-blur-sm" style={{ backgroundColor: '#3b19e6' }}>
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-white" />
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-white/80 text-sm mb-1">Processing</p>
              <p className="text-3xl font-bold text-white">{tracks.filter(t => t.status === 'processing').length}</p>
            </div>

            <div className="p-8 rounded-2xl border border-gray-800 backdrop-blur-sm" style={{ backgroundColor: '#3b19e6' }}>
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-white" />
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-white/80 text-sm mb-1">This Month</p>
              <p className="text-3xl font-bold text-white">24</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="p-6 rounded-2xl border border-gray-800 hover:scale-105 transition-all duration-300 text-left group" style={{ backgroundColor: '#3b19e6' }}>
                <Upload className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-white mb-2">Upload New Track</h4>
                <p className="text-white/70 text-sm">Add a new audio file for analysis</p>
              </button>

              <button className="p-6 rounded-2xl border border-gray-800 hover:scale-105 transition-all duration-300 text-left group" style={{ backgroundColor: '#3b19e6' }}>
                <Activity className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-white mb-2">View Analytics</h4>
                <p className="text-white/70 text-sm">Explore detailed audio insights</p>
              </button>

              <button className="p-6 rounded-2xl border border-gray-800 hover:scale-105 transition-all duration-300 text-left group" style={{ backgroundColor: '#3b19e6' }}>
                <TrendingUp className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-white mb-2">Export Results</h4>
                <p className="text-white/70 text-sm">Download your analysis data</p>
              </button>
            </div>
          </div>

          {/* Tracks Table */}
          <div className="rounded-2xl border border-gray-800 overflow-hidden" style={{ backgroundColor: '#3b19e6' }}>
            <div className="p-8 border-b border-white/10">
              <h3 className="text-2xl font-bold text-white">Your Tracks</h3>
              <p className="text-white/70 mt-2">Manage and monitor your uploaded audio files</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-6 font-semibold text-white/90">Track Name</th>
                    <th className="text-left p-6 font-semibold text-white/90">Upload Date</th>
                    <th className="text-left p-6 font-semibold text-white/90">Size</th>
                    <th className="text-left p-6 font-semibold text-white/90">Status</th>
                    <th className="text-left p-6 font-semibold text-white/90">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tracks.map((track, index) => (
                    <tr key={track.id} className={`border-t border-white/10 hover:bg-white/5 transition-colors ${index % 2 === 0 ? 'bg-white/5' : ''}`}>
                      <td className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                            <Music className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-medium text-white">{track.name}</span>
                        </div>
                      </td>
                      <td className="p-6 text-white/70">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{track.date}</span>
                        </div>
                      </td>
                      <td className="p-6 text-white/70">{track.size}</td>
                      <td className="p-6">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(track.status)}
                          <span className={`capitalize font-medium ${getStatusColor(track.status)}`}>
                            {track.status}
                          </span>
                        </div>
                      </td>
                      <td className="p-6">
                        <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-200 text-sm text-white font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar Menu */}
      <div className={`fixed inset-y-0 right-0 w-80 transform transition-transform duration-300 ease-in-out z-50 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col border-l border-gray-800" style={{ backgroundColor: '#3b19e6' }}>
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
          
          <nav className="flex-1 p-6">
            <ul className="space-y-3">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button className="w-full flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-200 hover:bg-white/10 text-white group">
                      <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span className="text-lg font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
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

export default HomePage;