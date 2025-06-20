import React, { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { 
  ArrowLeft, 
  Settings, 
  Upload, 
  Music, 
  Video, 
  Play, 
  Trash2, 
  RefreshCw, 
  FileText, 
  CheckCircle, 
  Loader, 
  Clock, 
  X 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface TrackMetadata {
  artist?: string;
  title?: string;
  genre?: string;
}

interface Track {
  id: string;
  filename: string;
  duration: string;
  size: string;
  type: 'audio' | 'video';
  status: 'pending' | 'processing' | 'completed';
  progress: number;
  metadata?: TrackMetadata;
}

const SessionDetail: React.FC = () => {
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [showLyricsModal, setShowLyricsModal] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<string>('');
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: '1',
      filename: 'summer_vibes_final.mp3',
      duration: '3:42',
      size: '8.2 MB',
      type: 'audio',
      status: 'completed',
      progress: 100,
      metadata: {
        artist: 'The Midnight Collective',
        title: 'Summer Vibes',
        genre: 'Electronic'
      }
    },
    {
      id: '2',
      filename: 'acoustic_session_raw.mp4',
      duration: '5:18',
      size: '24.7 MB',
      type: 'video',
      status: 'processing',
      progress: 65
    },
    {
      id: '3',
      filename: 'demo_track_v2.wav',
      duration: '2:56',
      size: '12.4 MB',
      type: 'audio',
      status: 'pending',
      progress: 0
    }
  ]);

  // Simulate processing progress
  useEffect(() => {
    const interval = setInterval(() => {
      setTracks(prevTracks => 
        prevTracks.map(track => {
          if (track.status === 'processing' && track.progress < 100) {
            const newProgress = Math.min(track.progress + Math.random() * 10, 100);
            return {
              ...track,
              progress: newProgress,
              status: newProgress >= 100 ? 'completed' : 'processing'
            };
          }
          return track;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleToggleVisibility = (): void => {
    setIsPublic(!isPublic);
  };

  const handlePlayTrack = (filename: string): void => {
    console.log('Playing:', filename);
  };

  const handleDeleteTrack = (id: string, filename: string): void => {
    if (window.confirm(`Are you sure you want to delete ${filename}?`)) {
      setTracks(tracks.filter(track => track.id !== id));
    }
  };

  const handleReextractTrack = (id: string): void => {
    setTracks(tracks.map(track => 
      track.id === id 
        ? { ...track, status: 'processing', progress: 0 }
        : track
    ));
  };

  const handleViewLyrics = (songTitle: string): void => {
    setSelectedSong(songTitle);
    setShowLyricsModal(true);
  };

  const handleUploadTrack = (): void => {
    console.log('Upload track clicked');
  };

  const getStatusIcon = (status: string): JSX.Element => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-3.5 h-3.5" />;
      case 'processing':
        return <Loader className="w-3.5 h-3.5 animate-spin" />;
      case 'pending':
        return <Clock className="w-3.5 h-3.5" />;
      default:
        return <Clock className="w-3.5 h-3.5" />;
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'Extraction Complete';
      case 'processing':
        return 'Processing...';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => console.log('Going back...')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border-0 rounded-xl p-3 text-white transition-all duration-300 hover:-translate-x-1"
            >
              <Link to="/session"><ArrowLeft className="w-5 h-5" /></Link>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold">My Studio Session</h1>
          </div>
          <button 
            onClick={() => console.log('Opening settings...')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border-0 rounded-xl p-3 text-white transition-all duration-300 hover:rotate-90"
          >
            <Settings className="w-5 h-5" />
          </button>
        </header>

        {/* Session Metadata */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 mb-8 border border-white/10">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Session Name</span>
              <span className="font-semibold">My Studio Session</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Created</span>
              <span className="font-semibold">June 15, 2025</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Visibility</span>
              <button 
                onClick={handleToggleVisibility}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none ${
                  isPublic ? 'bg-[#3b19e6]' : 'bg-white/20'
                }`}
              >
                <div 
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-lg ${
                    isPublic ? 'translate-x-7' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Upload Button */}
        <Link to="/upload"><button 
          onClick={handleUploadTrack}
          className="bg-gradient-to-r from-[#3b19e6] to-[#5a35ff] hover:from-[#3b19e6]/90 hover:to-[#5a35ff]/90 border-0 rounded-2xl px-8 py-4 text-white font-semibold flex items-center gap-3 mb-8 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[#3b19e6]/25 hover:shadow-2xl"
        >
          <Upload className="w-5 h-5" />
          Upload New Track
        </button>
        </Link>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <div 
              key={track.id}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#3b19e6]/30 group"
            >
              {/* Track Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#3b19e6] to-[#5a35ff] rounded-2xl flex items-center justify-center shadow-lg">
                  {track.type === 'audio' ? 
                    <Music className="w-7 h-7 text-white" /> : 
                    <Video className="w-7 h-7 text-white" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold mb-1 text-white truncate">{track.filename}</h3>
                  <p className="text-white/70 text-sm">
                    {track.duration} • {track.size}
                  </p>
                </div>
              </div>

              {/* Status Bar */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-white/70 mb-3">
                  {getStatusIcon(track.status)}
                  <span>{getStatusText(track.status)}</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r from-[#3b19e6] to-[#5a35ff] rounded-full transition-all duration-500 ${
                      track.status === 'processing' ? 'animate-pulse' : ''
                    }`}
                    style={{ width: `${track.progress}%` }}
                  />
                </div>
              </div>

              {/* Extracted Metadata */}
              {track.metadata && track.status === 'completed' && (
                <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Artist:</span>
                      <span className="font-medium text-white">{track.metadata.artist}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Title:</span>
                      <span className="font-medium text-white">{track.metadata.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Genre:</span>
                      <span className="font-medium text-white">{track.metadata.genre}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Track Actions */}
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => handlePlayTrack(track.filename)}
                  className="bg-white/10 hover:bg-green-500/20 backdrop-blur-lg border-0 rounded-xl px-4 py-2 text-white text-sm flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Play className="w-4 h-4" />
                  Play
                </button>
                <button 
                  onClick={() => handleDeleteTrack(track.id, track.filename)}
                  className="bg-white/10 hover:bg-red-500/20 backdrop-blur-lg border-0 rounded-xl px-4 py-2 text-white text-sm flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                {track.status !== 'processing' && (
                  <button 
                    onClick={() => handleReextractTrack(track.id)}
                    className="bg-white/10 hover:bg-[#3b19e6]/20 backdrop-blur-lg border-0 rounded-xl px-4 py-2 text-white text-sm flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Re-extract
                  </button>
                )}
                {track.metadata && track.status === 'completed' && (
                  <button 
                    onClick={() => handleViewLyrics(track.metadata?.title || track.filename)}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border-0 rounded-xl px-4 py-2 text-white text-sm flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <FileText className="w-4 h-4" />
                    Lyrics
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lyrics Modal */}
      {showLyricsModal && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowLyricsModal(false)}
        >
          <div 
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedSong} - Lyrics</h2>
              <button 
                onClick={() => setShowLyricsModal(false)}
                className="bg-white/10 hover:bg-white/20 border-0 rounded-xl p-2 text-white transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="text-white/90 leading-relaxed space-y-6">
              <div>
                <p className="font-bold text-[#3b19e6] mb-2">[Verse 1]</p>
                <p className="mb-4">
                  Sunset colors paint the sky tonight<br />
                  Golden hour makes everything feel right<br />
                  Summer breeze carries memories so sweet<br />
                  Dancing shadows at our feet
                </p>
              </div>
              
              <div>
                <p className="font-bold text-[#3b19e6] mb-2">[Chorus]</p>
                <p className="mb-4">
                  These are the summer vibes we're chasing<br />
                  Time keeps moving but we're not racing<br />
                  Let the music flow through our souls<br />
                  Summer vibes make us whole
                </p>
              </div>
              
              <div>
                <p className="font-bold text-[#3b19e6] mb-2">[Verse 2]</p>
                <p>
                  Ocean waves crash against the shore<br />
                  This is what we've been waiting for<br />
                  Midnight conversations under stars<br />
                  These moments are forever ours
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionDetail;