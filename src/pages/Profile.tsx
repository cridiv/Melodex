import { useState, useEffect } from 'react';
import { Edit3, Save, Lock } from 'lucide-react';
import { FaSpotify } from 'react-icons/fa';
import NavBarM from './NavBarM';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

const Profile = () => {
  const { user: supabaseUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    username: '',
    fullName: '',
    email: '',
    country: 'United States',
    dob: '',
    gender: '',
    spotifyConnected: false
  });

  // Populate state when supabaseUser is loaded
  useEffect(() => {
    if (supabaseUser) {
      setUser({
        username: supabaseUser.user_metadata?.username || '',
        fullName: supabaseUser.user_metadata?.full_name || '',
        email: supabaseUser.email || '',
        country: supabaseUser.user_metadata?.country || 'United States',
        dob: supabaseUser.user_metadata?.dob || '',
        gender: supabaseUser.user_metadata?.gender || '',
        spotifyConnected: false
      });
    }
  }, [supabaseUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);

    // Save updated user_metadata to Supabase
    const { error } = await supabase.auth.updateUser({
      data: {
        username: user.username,
        full_name: user.fullName,
        country: user.country,
        dob: user.dob,
        gender: user.gender
      }
    });

    if (error) {
      console.error('Error updating user profile:', error.message);
    } else {
      console.log('Profile updated');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 relative">
      <NavBarM />

      {/* Noise texture */}
     {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2Zy...')] opacity-20 pointer-events-none"></div> */}

      {/* Main container */}
      <div className="max-w-md mx-auto bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-800/50 shadow-xl p-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <button
            onClick={isEditing ? handleSubmit : () => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#3b19e6] hover:bg-indigo-600/20 border border-indigo-600/50 rounded-full text-indigo-400 transition-all"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                <span>Save</span>
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </>
            )}
          </button>
        </div>

        {/* Avatar */}
<img 
  src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${user.username || user.email}`} 
  alt="Avatar" 
  className="w-24 h-24 rounded-full border-2 border-indigo-600/80 relative z-10"
/>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Username */}
            <InputField label="Username" name="username" value={user.username} onChange={handleChange} isEditing={isEditing} />
            {/* Full Name */}
            <InputField label="Full Name" name="fullName" value={user.fullName} onChange={handleChange} isEditing={isEditing} />
            {/* Email (readonly) */}
            <InputField label="Email" name="email" value={user.email} isEditing={false} />

            {/* Country */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Country</label>
              {isEditing ? (
                <select
                  name="country"
                  value={user.country}
                  onChange={handleChange}
                  className="w-full bg-gray-900/30 border border-gray-700 rounded-lg px-4 py-2 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                </select>
              ) : (
                <DisplayValue value={user.country} />
              )}
            </div>

            {/* Date of Birth */}
            <InputField
              label="Date of Birth"
              name="dob"
              type="date"
              value={user.dob}
              onChange={handleChange}
              isEditing={isEditing}
              displayValue={user.dob ? new Date(user.dob).toLocaleDateString() : ''}
            />

            {/* Gender */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Gender</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                  className="w-full bg-gray-900/30 border border-gray-700 rounded-lg px-4 py-2 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              ) : (
                <DisplayValue value={user.gender} />
              )}
            </div>

            {/* Password (static) */}
            <div>
              <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Password
              </label>
              <button
                type="button"
                className="w-full text-left px-4 py-2 bg-gray-900/30 border border-gray-700 rounded-lg hover:border-indigo-500 transition-colors"
              >
                •••••••••
              </button>
            </div>

            {/* Spotify */}
            <div className="pt-4">
              <button
                type="button"
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                  user.spotifyConnected
                    ? 'bg-green-900/20 border-green-600/50 text-green-400 hover:bg-green-900/30'
                    : 'bg-gray-900/30 border-gray-700 hover:border-indigo-500 hover:bg-indigo-900/10'
                }`}
              >
                <FaSpotify className="text-green-500 w-5 h-5" />
                {user.spotifyConnected ? 'Connected to Spotify' : 'Connect Spotify'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Field
const InputField = ({
  label,
  name,
  value,
  onChange,
  isEditing,
  type = 'text',
  displayValue
}: {
  label: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  type?: string;
  displayValue?: string;
}) => (
  <div>
    <label className="block text-sm text-gray-400 mb-1">{label}</label>
    {isEditing && onChange ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-900/30 border border-gray-700 rounded-lg px-4 py-2 focus:border-indigo-500 focus:outline-none"
      />
    ) : (
      <DisplayValue value={displayValue || value} />
    )}
  </div>
);

// Reusable display block
const DisplayValue = ({ value }: { value: string }) => (
  <div className="px-4 py-2 bg-gray-900/30 rounded-lg border border-transparent">
    {value || <span className="text-gray-400 italic">Not set</span>}
  </div>
);

export default Profile;
