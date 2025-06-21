import React, { useState } from 'react';
import {
  Home,
  User,
  LogOut,
  Upload,
  Menu,
  X,
  Folder,
  Search,
  Bell,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
}

const NavBarM = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user: supabaseUser } = useAuth(); // ✅ Real user from context

  const sidebarItems: SidebarItem[] = [
    { id: 'home', label: 'Home', icon: Home, path: '/home' },
    { id: 'upload', label: 'Upload', icon: Upload, path: '/upload' },
    { id: 'session', label: 'Session', icon: Folder, path: '/session' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];

  const handleSidebarItemClick = (item: SidebarItem) => {
    if (item.id === 'logout') {
      localStorage.removeItem('supabase.auth.token');
      console.log('User logged out');
      window.location.href = '/signin';
      return;
    }
    setSidebarOpen(false);
  };

  const fullName =
    supabaseUser?.user_metadata?.full_name || supabaseUser?.email || 'User';

  const avatarSeed =
    supabaseUser?.user_metadata?.username || supabaseUser?.email || 'guest';

  return (
    <>
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <Link to="/home">
              <h1 className="text-xl font-bold">Melodex</h1>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Side Menu */}
      <div
        className={`fixed inset-y-0 left-0 w-80 transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col border-r border-gray-800 bg-black">
          {/* Header */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg transition-colors text-white"
                style={{ backgroundColor: 'black' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#3b19e6')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'black')
                }
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 p-6">
            <ul className="space-y-3">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <button
                    className="w-full flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-200 text-white group bg-black hover:bg-blue-600"
                    style={{ backgroundColor: 'black' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = '#3b19e6')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = 'black')
                    }
                    onClick={() => handleSidebarItemClick(item)}
                  >
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="text-lg font-medium">{item.label}</span>
                  </button>
                );

                return (
                  <li key={item.id}>
                    {item.path ? <Link to={item.path}>{content}</Link> : content}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Info */}
          <div className="p-6 border-t border-gray-800">
            <div
              className="flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 cursor-pointer"
              style={{ backgroundColor: '#3b19e6' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#2563eb')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#3b19e6')
              }
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <img
                  src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(
                    avatarSeed
                  )}`}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div>
                <p className="font-semibold text-white">{fullName}</p>
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
    </>
  );
};

export default NavBarM;
