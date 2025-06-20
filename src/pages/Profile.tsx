import { useState } from 'react';
import { Edit3, Save, Lock } from 'lucide-react';
import { FaSpotify } from 'react-icons/fa';
import NavBarM from './NavBarM';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    username: 'audiophile42',
    fullName: 'Alex Chen',
    email: 'alex@melodex.com',
    country: 'United States',
    dob: '1990-05-15',
    gender: 'Male',
    spotifyConnected: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Add API save logic here
  };

  return (
    
    <div className="min-h-screen bg-black text-white p-6 relative">
        <NavBarM />
      {/* Noise texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')] opacity-20 pointer-events-none"></div>
      
      {/* Main container */}
      <div className="max-w-md mx-auto bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-800/50 shadow-xl p-8 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <button
            onClick={() => isEditing ? handleSubmit : setIsEditing(!isEditing)}
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
        <div className="flex justify-center mb-8">
          <label className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-indigo-600/30 rounded-full blur-md group-hover:blur-lg transition-all animate-pulse"></div>
            <img 
              src="https://i.pravatar.cc/150?img=5" 
              alt="Avatar" 
              className="w-24 h-24 rounded-full border-2 border-indigo-600/80 relative z-10"
            />
            <input type="file" className="hidden" />
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Username</label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  className="w-full bg-gray-900/30 border border-gray-700 rounded-lg px-4 py-2 focus:border-indigo-500 focus:outline-none"
                />
              ) : (
                <div className="px-4 py-2 bg-gray-900/30 rounded-lg border border-transparent">
                  {user.username}
                </div>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                  className="w-full bg-gray-900/30 border border-gray-700 rounded-lg px-4 py-2 focus:border-indigo-500 focus:outline-none"
                />
              ) : (
                <div className="px-4 py-2 bg-gray-900/30 rounded-lg border border-transparent">
                  {user.fullName}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full bg-gray-900/30 border border-gray-700 rounded-lg px-4 py-2 focus:border-indigo-500 focus:outline-none"
                />
              ) : (
                <div className="px-4 py-2 bg-gray-900/30 rounded-lg border border-transparent">
                  {user.email}
                </div>
              )}
            </div>

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
                  {/* Add more countries */}
                </select>
              ) : (
                <div className="px-4 py-2 bg-gray-900/30 rounded-lg border border-transparent">
                  {user.country}
                </div>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={user.dob}
                  onChange={handleChange}
                  className="w-full bg-gray-900/30 border border-gray-700 rounded-lg px-4 py-2 focus:border-indigo-500 focus:outline-none"
                />
              ) : (
                <div className="px-4 py-2 bg-gray-900/30 rounded-lg border border-transparent">
                  {new Date(user.dob).toLocaleDateString()}
                </div>
              )}
            </div>

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
                <div className="px-4 py-2 bg-gray-900/30 rounded-lg border border-transparent">
                  {user.gender}
                </div>
              )}
            </div>

            {/* Password */}
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

            {/* Spotify Connection */}
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

export default Profile;