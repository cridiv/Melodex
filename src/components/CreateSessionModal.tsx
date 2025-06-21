import { X } from 'lucide-react';
import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (sessionName: string) => void;
};

export default function CreateSessionModal({ isOpen, onClose, onCreate }: Props) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onCreate(name.trim());
      setName('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Create New Session</h3>
          <button
            onClick={() => {
              onClose();
              setName('');
            }}
            className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="sessionName" className="block text-sm font-medium text-gray-300 mb-2">
              Session Name
            </label>
            <input
              id="sessionName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter session name..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b19e6] focus:border-transparent transition-all duration-200"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
                if (e.key === 'Escape') {
                  onClose();
                  setName('');
                }
              }}
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => {
                onClose();
                setName('');
              }}
              className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!name.trim()}
              className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-[#3b19e6] disabled:cursor-not-allowed text-white rounded-xl transition-colors duration-200 font-medium"
            >
              Create Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
