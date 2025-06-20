import React, { useState } from 'react';
import { X, Link, Music, Video, FileText } from 'lucide-react';
import NavBarM from './NavBarM';
import { supabase } from '../lib/supabaseClient';

const UploadScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [link, setLink] = useState('');
  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [activeInput, setActiveInput] = useState<'link' | 'audio' | 'video' | null>(null);
  const [isReadyToUpload, setIsReadyToUpload] = useState(false);

  const handleDragOver = (e: React.DragEvent, type: string) => {
    e.preventDefault();
    setDragOver(type);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
  };

  const handleDrop = (e: React.DragEvent, type: 'audio' | 'video') => {
    e.preventDefault();
    setDragOver(null);
    const files = Array.from(e.dataTransfer.files);
    if (type === 'audio') {
      setAudioFiles(files);
      setActiveInput('audio');
    } else {
      setVideoFiles(files);
      setActiveInput('video');
    }
    setIsReadyToUpload(true);
  };

 const handleUpload = async () => {
  const formData = new FormData();

  const fileToUpload = audioFiles[0] || videoFiles[0]; // only one at a time
  if (!fileToUpload) return alert('Please select a file');

  formData.append('file', fileToUpload);

  try {
    const sessionResult = await supabase.auth.getSession();
    const accessToken = sessionResult.data.session?.access_token;
    const userId = sessionResult.data.session?.user?.id;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    formData.append('userId', userId);

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tracks/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || 'Upload failed');
    }

    console.log('✅ Upload Success:', result);
    alert('Upload successful!');
    clearUploads();
  } catch (err) {
    console.error('❌ Upload error:', err);
    alert('Error uploading file');
  }
};

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'audio' | 'video') => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (type === 'audio') {
      setAudioFiles(files);
      setActiveInput('audio');
    } else {
      setVideoFiles(files);
      setActiveInput('video');
    }
    setIsReadyToUpload(true);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    setActiveInput(e.target.value ? 'link' : null);
  };

  const clearUploads = () => {
    setLink('');
    setAudioFiles([]);
    setVideoFiles([]);
    setActiveInput(null);
    setIsReadyToUpload(false);

    const fileInputs = document.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>;
    fileInputs.forEach(input => input.value = '');
  };

  const isLinkDisabled = activeInput && activeInput !== 'link';
  const isAudioDisabled = activeInput && activeInput !== 'audio';
  const isVideoDisabled = activeInput && activeInput !== 'video';

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBarM />

      <div className="p-4 space-y-6">
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Upload Your Content
          </h2>
          <p className="text-gray-400 text-sm">Choose your upload method below</p>
        </div>

        {(activeInput) && (
          <div className="flex justify-end">
            <button
              onClick={clearUploads}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 text-red-400 transition-all"
            >
              <X className="w-4 h-4" />
              Clear Upload
            </button>
          </div>
        )}

        <div className="space-y-6">

          {/* Link Upload */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold flex items-center space-x-2">
              <Link className="w-5 h-5" />
              <span>Upload from Links</span>
            </h3>
            <div className={`p-6 rounded-xl border-2 border-dashed border-gray-600 hover:border-blue-500 transition-all duration-300 ${isLinkDisabled ? 'opacity-50 pointer-events-none' : ''}`} style={{ backgroundColor: '#1a1a1a' }}>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Link className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Paste your link</h4>
                  <p className="text-gray-400 text-sm mb-4">Support for YouTube, SoundCloud, Spotify, and more</p>
                  <input
                    type="url"
                    placeholder="https://example.com/your-link"
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    value={link}
                    onChange={handleLinkChange}
                    disabled={!!isLinkDisabled}
                  />
                  <button
                    className={`w-full mt-3 p-3 rounded-lg font-semibold transition-all duration-200 hover:scale-[0.98] ${!link ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ backgroundColor: '#3b19e6' }}
                    disabled={!link}
                  >
                    Upload from Link
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Audio Upload */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold flex items-center space-x-2">
              <Music className="w-5 h-5" />
              <span>Upload Audio Files</span>
            </h3>
            <div
              className={`p-6 rounded-xl border-2 border-dashed transition-all duration-300 ${dragOver === 'audio' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-blue-500'} ${isAudioDisabled ? 'opacity-50 pointer-events-none' : ''}`}
              style={{ backgroundColor: dragOver === 'audio' ? undefined : '#1a1a1a' }}
              onDragOver={(e) => !isAudioDisabled && handleDragOver(e, 'audio')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => !isAudioDisabled && handleDrop(e, 'audio')}
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Music className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    {audioFiles.length > 0 ? `${audioFiles.length} file(s) selected` : 'Drop audio files here'}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">or click to browse</p>
                  <input
                    type="file"
                    multiple
                    accept="audio/*"
                    onChange={(e) => handleFileSelect(e, 'audio')}
                    className="hidden"
                    id="audio-upload"
                    disabled={!!isAudioDisabled}
                  />
                  {audioFiles.length > 0 && isReadyToUpload ? (
                    <button
                      onClick={handleUpload}
                      className="w-full p-3 rounded-lg font-semibold bg-green-600 hover:bg-green-700 transition-all"
                    >
                      Upload Audio
                    </button>
                  ) : (
                    <label
                      htmlFor="audio-upload"
                      className={`inline-block w-full p-3 rounded-lg font-semibold transition-all duration-200 hover:scale-[0.98] cursor-pointer ${isAudioDisabled ? 'cursor-not-allowed' : ''}`}
                      style={{ backgroundColor: '#3b19e6' }}
                    >
                      {audioFiles.length > 0 ? 'Change Audio Files' : 'Choose Audio Files'}
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Supported formats: MP3, WAV, FLAC, AAC, OGG, M4A</p>
            </div>
          </div>

          {/* Video Upload */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold flex items-center space-x-2">
              <Video className="w-5 h-5" />
              <span>Upload Video Files</span>
            </h3>
            <div
              className={`p-6 rounded-xl border-2 border-dashed transition-all duration-300 ${dragOver === 'video' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-blue-500'} ${isVideoDisabled ? 'opacity-50 pointer-events-none' : ''}`}
              style={{ backgroundColor: dragOver === 'video' ? undefined : '#1a1a1a' }}
              onDragOver={(e) => !isVideoDisabled && handleDragOver(e, 'video')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => !isVideoDisabled && handleDrop(e, 'video')}
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Video className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    {videoFiles.length > 0 ? `${videoFiles.length} file(s) selected` : 'Drop video files here'}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">or click to browse</p>
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={(e) => handleFileSelect(e, 'video')}
                    className="hidden"
                    id="video-upload"
                    disabled={!!isVideoDisabled}
                  />
                  {videoFiles.length > 0 && isReadyToUpload ? (
                    <button
                      onClick={handleUpload}
                      className="w-full p-3 rounded-lg font-semibold bg-green-600 hover:bg-green-700 transition-all"
                    >
                      Upload Video
                    </button>
                  ) : (
                    <label
                      htmlFor="video-upload"
                      className={`inline-block w-full p-3 rounded-lg font-semibold transition-all duration-200 hover:scale-[0.98] cursor-pointer ${isVideoDisabled ? 'cursor-not-allowed' : ''}`}
                      style={{ backgroundColor: '#3b19e6' }}
                    >
                      {videoFiles.length > 0 ? 'Change Video Files' : 'Choose Video Files'}
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Supported formats: MP4, AVI, MOV, MKV, WMV, FLV, WEBM</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl border border-gray-800" style={{ backgroundColor: '#1a1a1a' }}>
          <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Upload Tips</span>
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Maximum file size: 100MB per file</li>
            <li>• You can upload multiple files at once</li>
            <li>• Processing time depends on file size and format</li>
            <li>• Links are processed instantly if the source is accessible</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadScreen;
