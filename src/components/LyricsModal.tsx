import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface LyricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  artist?: string;
  lyrics: string;
}

const LyricsModal: React.FC<LyricsModalProps> = ({
  isOpen,
  onClose,
  title,
  artist = '',
  lyrics,
}) => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && lyrics) {
      const splitLines = lyrics
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line !== '');
      setLines(splitLines);
    }
  }, [lyrics, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
      <div
        className="relative w-full max-w-2xl bg-white/5 border border-white/20 
        backdrop-blur-2xl rounded-3xl shadow-2xl p-6 max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">{title}</h2>
            {artist && <p className="text-sm text-indigo-400">{artist}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="text-white w-5 h-5" />
          </button>
        </div>

        {/* Divider */}
        <hr className="border-white/10 mb-4" />

        {/* Lyrics lines */}
        <div className="overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar text-white space-y-2">
          {lines.map((line, index) => (
            <p key={index} className="leading-relaxed text-sm whitespace-pre-wrap">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LyricsModal;
