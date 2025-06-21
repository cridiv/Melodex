// TrackModalManager.tsx
import React, { useState } from 'react';
import MetaDataPopup from './MetaDataPopup'; // Rename Track.tsx to MetadataPopup.tsx
import SessionPicker from './SessionPicker';

const TrackModalManager: React.FC = () => {
  const [showMetadata, setShowMetadata] = useState(true);
  const [showSessionPicker, setShowSessionPicker] = useState(false);

  const handleSaveClick = () => {
    // Show the session picker when Save is clicked
    setShowSessionPicker(true);
  };

  const handleSessionSelect = (sessionId: string) => {
    console.log('Selected session:', sessionId);
    // Save the track to session here (make API call or handle logic)
    // After saving, close both modals
    setShowMetadata(false);
    setShowSessionPicker(false);
  };

  return (
    <>
      <MetaDataPopup
        isOpen={showMetadata}
        onClose={() => setShowMetadata(false)}
        onSave={handleSaveClick} // opens session picker
        onDownloadAudio={() => console.log('Download Audio')}
        onDownloadVideo={() => console.log('Download Video')}
      />

      <SessionPicker
        isOpen={showSessionPicker}
        onClose={() => setShowSessionPicker(false)}
        onSelectSession={handleSessionSelect}
      />
    </>
  );
};

export default TrackModalManager;
