import React from 'react';
import { X } from 'lucide-react';
import { formatDuration } from '../utils/utils';
import { FaSpotify, FaYoutube } from 'react-icons/fa';

interface MetadataPopupProps {
  isOpen?: boolean;
  isLoading?: boolean; // ✅ New prop
  onClose?: () => void;
  onSave?: () => void;
  metadata?: {
    title?: string;
    artist?: string;
    album?: string;
    duration?: number;
    genre?: string;
    image?: string;
  };
}

const MetadataPopup: React.FC<MetadataPopupProps> = ({
  isOpen = false,
  isLoading = false,
  onClose,
  onSave,
  metadata = {},
}) => {
  if (!isOpen) return null;

  const openSpotify = () => {
    const query = encodeURIComponent(`${metadata.title} ${metadata.artist}`);
    window.open(`https://open.spotify.com/search/${query}`, '_blank');
  };

  const openYouTube = () => {
    const query = encodeURIComponent(`${metadata.title} ${metadata.artist}`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  const Spinner = () => (
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black rounded-lg shadow-xl w-96 max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Metadata</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Metadata Content */}
        <div className="p-6 flex gap-6">
          <div className="flex-shrink-0">
            <img
              src={metadata.image || '/music-placeholder.jpeg'}
              alt="Album art"
              className="w-24 h-24 rounded-lg object-cover"
            />
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <span className="font-medium text-white">Title:</span>
              <p className="text-gray-300 mt-1">{metadata.title || '—'}</p>
            </div>
            <div>
              <span className="font-medium text-white">Artist:</span>
              <p className="text-gray-300 mt-1">{metadata.artist || '—'}</p>
            </div>
            <div>
              <span className="font-medium text-white">Album:</span>
              <p className="text-gray-300 mt-1">{metadata.album || '—'}</p>
            </div>
            <div className="flex gap-6">
              <div>
                <span className="font-medium text-white">Duration:</span>
                <p className="text-gray-300 mt-1">
                  {metadata.duration ? formatDuration(metadata.duration) : '00:00'}
                </p>
              </div>
              <div>
                <span className="font-medium text-white">Genre:</span>
                <p className="text-gray-300 mt-1">{metadata.genre || '—'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-700">
          <button
            onClick={onSave}
            disabled={isLoading}
            className={`px-4 py-2 text-white rounded-md transition-all font-medium ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
            }`}
            style={{ backgroundColor: '#3b19e6' }}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                Saving <Spinner />
              </div>
            ) : (
              'Save'
            )}
          </button>

          <div className="flex gap-3">
            <button
              onClick={openSpotify}
              disabled={isLoading}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-90"
              style={{ backgroundColor: '#3b19e6' }}
              title="Search on Spotify"
            >
              <FaSpotify className="text-white w-5 h-5" />
            </button>
            <button
              onClick={openYouTube}
              disabled={isLoading}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-90"
              style={{ backgroundColor: '#3b19e6' }}
              title="Search on YouTube"
            >
              <FaYoutube className="text-white w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetadataPopup;
