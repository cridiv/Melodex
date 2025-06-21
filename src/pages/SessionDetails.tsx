import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Settings, Upload, Music, Video, Trash2,
  RefreshCw, FileText, CheckCircle, Loader, Clock, X
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { FaSpotify, FaYoutube } from 'react-icons/fa';

interface Track {
  id: string;
  filename: string;
  title?: string;
  artist?: string;
  genre?: string;
  lyrics?: string;
  duration: string;
  size: string;
  type: 'audio' | 'video';
  status: 'pending' | 'processing' | 'completed';
  progress: number;
}

const LyricsModal = ({
  isOpen,
  onClose,
  title,
  artist,
  lyrics
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  artist?: string;
  lyrics?: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {title} {artist && `- ${artist}`}
          </h2>
          <button onClick={onClose} className="bg-white/10 hover:bg-white/20 border-0 rounded-xl p-2 text-white transition-all duration-300">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="text-white/90 leading-relaxed space-y-6 whitespace-pre-line">
          {lyrics || 'No lyrics available.'}
        </div>
      </div>
    </div>
  );
};

const SessionDetail: React.FC = () => {
  const { sessionId } = useParams();
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  
  // Lyrics modal state
  const [lyricsModalOpen, setLyricsModalOpen] = useState(false);
  const [currentLyrics, setCurrentLyrics] = useState('');
  const [currentTrackTitle, setCurrentTrackTitle] = useState('');
  const [currentTrackArtist, setCurrentTrackArtist] = useState('');

  useEffect(() => {
    async function fetchSessionTracks() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        if (!token) throw new Error('No access token found');

        const response = await fetch(
          `http://localhost:3000/sessions/${sessionId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error('Failed to fetch tracks');
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSessionTracks();
  }, [sessionId]);

  const handleToggleVisibility = () => setIsPublic(!isPublic);

  const handleDeleteTrack = async (id: string, filename: string) => {
    if (window.confirm(`Are you sure you want to delete ${filename}?`)) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        if (!token) throw new Error('No token found');

        const response = await fetch(`http://localhost:3000/tracks/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(await response.text());
        setTracks((prev) => prev.filter((track) => track.id !== id));
      } catch (err) {
        console.error('Error deleting track:', err);
      }
    }
  };

  const handleReextractTrack = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/tracks/${id}/reextract`, { method: 'POST' });
      setTracks((prev) =>
        prev.map((track) =>
          track.id === id ? { ...track, status: 'processing', progress: 0 } : track
        )
      );
    } catch (err) {
      console.error('Error re-extracting:', err);
    }
  };

const handleGenerateLyrics = async (track: Track) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    if (!token) throw new Error('No token found');

    // Show loading state
    setTracks(prev => prev.map(t => 
      t.id === track.id ? { ...t, status: 'processing' } : t
    ));

    // Call backend endpoint - note the URL change
    const response = await fetch('http://localhost:3000/lyrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: track.title || track.filename,
        artist: track.artist || ''
      })
    });

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Unexpected response: ${text.substring(0, 100)}`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to generate lyrics');
    }

    if (!data.lyrics) {
      throw new Error('No lyrics returned from server');
    }

    // Update track in database
    const updateResponse = await fetch(
      `http://localhost:3000/tracks/${track.id}`,
      {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ lyrics: data.lyrics })
      }
    );

    if (!updateResponse.ok) {
      throw new Error('Failed to update track with lyrics');
    }

    const updatedTrack = await updateResponse.json();

    setTracks(prev =>
      prev.map(t => t.id === updatedTrack.id ? updatedTrack : t)
    );
  } catch (err) {
    console.error('Error generating lyrics:', err);
    let errorMsg = 'Failed to generate lyrics';
    if (err && typeof err === 'object' && 'message' in err) {
      errorMsg = `Failed to generate lyrics: ${(err as { message: string }).message}`;
    }
    alert(errorMsg);
    
    setTracks(prev =>
      prev.map(t => 
        t.id === track.id ? { ...t, status: 'completed' } : t
      )
    );
  }
};

const handleViewLyrics = (track: Track) => {
    setCurrentTrackTitle(track.title || track.filename);
    setCurrentTrackArtist(track.artist || '');
    setCurrentLyrics(track.lyrics || '');
    setLyricsModalOpen(true);
  };

  const getStatusIcon = (status: string): React.ReactElement => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-3.5 h-3.5" />;
      case 'processing': return <Loader className="w-3.5 h-3.5 animate-spin" />;
      default: return <Clock className="w-3.5 h-3.5" />;
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'completed': return 'Extraction Complete';
      case 'processing': return 'Processing...';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link to="/session">
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border-0 rounded-xl p-3 text-white transition-all duration-300 hover:-translate-x-1">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold">My Studio Session</h1>
          </div>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border-0 rounded-xl p-3 text-white transition-all duration-300 hover:rotate-90">
            <Settings className="w-5 h-5" />
          </button>
        </header>

        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 mb-8 border border-white/10">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Session ID</span>
              <span className="font-semibold">{sessionId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Visibility</span>
              <button onClick={handleToggleVisibility}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none ${isPublic ? 'bg-[#3b19e6]' : 'bg-white/20'}`}>
                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-lg ${isPublic ? 'translate-x-7' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        </div>

        <Link to="/upload">
          <button className="bg-gradient-to-r from-[#3b19e6] to-[#5a35ff] hover:from-[#3b19e6]/90 hover:to-[#5a35ff]/90 border-0 rounded-2xl px-8 py-4 text-white font-semibold flex items-center gap-3 mb-8 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[#3b19e6]/25 hover:shadow-2xl">
            <Upload className="w-5 h-5" />
            Upload New Track
          </button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <div key={track.id} className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#3b19e6]/30 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#3b19e6] to-[#5a35ff] rounded-2xl flex items-center justify-center shadow-lg">
                  {track.type === 'audio' ? <Music className="w-7 h-7 text-white" /> : <Video className="w-7 h-7 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold mb-1 text-white truncate">{track.filename}</h3>
                  <p className="text-white/70 text-sm">{track.duration} • {track.size}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-white/70 mb-3">
                {getStatusIcon(track.status)}
                <span>{getStatusText(track.status)}</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <div className={`h-full bg-gradient-to-r from-[#3b19e6] to-[#5a35ff] rounded-full transition-all duration-500 ${track.status === 'processing' ? 'animate-pulse' : ''}`} style={{ width: `${track.progress}%` }} />
              </div>

              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-white/60">Artist:</span><span className="font-medium text-white">{track.artist ?? 'Unknown'}</span></div>
                <div className="flex justify-between"><span className="text-white/60">Title:</span><span className="font-medium text-white">{track.title ?? track.filename}</span></div>
                <div className="flex justify-between"><span className="text-white/60">Genre:</span><span className="font-medium text-white">{track.genre ?? 'N/A'}</span></div>
              </div>

              <div className="flex flex-wrap gap-2">
                {track.status === 'completed' && (
                  <>
                    <button onClick={() => window.open(`https://open.spotify.com/search/${encodeURIComponent(`${track.title ?? track.filename} ${track.artist ?? ''}`)}`, '_blank')}
                      className="bg-green-600/10 hover:bg-green-600/20 backdrop-blur-lg border-0 rounded-xl px-4 py-2 text-white text-sm flex items-center gap-2">
                      <FaSpotify className="w-4 h-4 text-green-400" /> Spotify
                    </button>

                    <button onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(`${track.title ?? track.filename} ${track.artist ?? ''}`)}`, '_blank')}
                      className="bg-red-600/10 hover:bg-red-600/20 backdrop-blur-lg border-0 rounded-xl px-4 py-2 text-white text-sm flex items-center gap-2">
                      <FaYoutube className="w-4 h-4 text-red-400" /> YouTube
                    </button>
                  </>
                )}

                <button onClick={() => handleDeleteTrack(track.id, track.filename)} className="bg-white/10 hover:bg-red-500/20 backdrop-blur-lg border-0 rounded-xl px-4 py-2 text-white text-sm flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>

                {track.status !== 'processing' && (
                  <button onClick={() => handleReextractTrack(track.id)} className="bg-white/10 hover:bg-[#3b19e6]/20 backdrop-blur-lg border-0 rounded-xl px-4 py-2 text-white text-sm flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" /> Re-extract
                  </button>
                )}

{/* Lyrics Button with proper loading states */}
{(track.lyrics && track.lyrics.trim().length > 0) ? (
  <button
    onClick={() => handleViewLyrics(track)}
    className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border-0 rounded-xl px-4 py-2 text-white text-sm flex items-center gap-2 transition-all duration-300"
  >
    <FileText className="w-4 h-4" /> View Lyrics
  </button>
) : track.status === 'processing' ? (
  <button
    disabled
    className="bg-white/10 backdrop-blur-lg border-0 rounded-xl px-4 py-2 text-white/60 text-sm flex items-center gap-2 cursor-not-allowed"
  >
    <Loader className="w-4 h-4 animate-spin" /> Generating...
  </button>
) : (
  <button
    onClick={() => handleGenerateLyrics(track)}
    className="bg-white/10 hover:bg-[#3b19e6]/30 backdrop-blur-lg border-0 rounded-xl px-4 py-2 text-white text-sm flex items-center gap-2 transition-all duration-300"
  >
    <FileText className="w-4 h-4" /> Generate Lyrics
  </button>
)}

              </div>
            </div>
          ))}
        </div>
      </div>

      <LyricsModal
        isOpen={lyricsModalOpen}
        onClose={() => setLyricsModalOpen(false)}
        title={currentTrackTitle}
        artist={currentTrackArtist}
        lyrics={currentLyrics}
      />
    </div>
  );
};

export default SessionDetail;