import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';

const Signin: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(error.message);
      setIsLoading(false);
      return;
    }

    console.log('Logged in:', data);
    navigate('/home');
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/auth/callback',
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000] relative overflow-hidden">
      {['♪', '♫', '♬', '♩'].map((note, i) => (
        <div
          key={i}
          className={`absolute text-3xl text-slate-600 opacity-10 animate-pulse ${
            i === 0 ? 'top-1/4 left-1/4' : i === 1 ? 'top-1/3 right-1/4' :
            i === 2 ? 'bottom-1/3 left-1/5' : 'bottom-1/4 right-1/5'
          }`}
          style={{ animationDelay: `${i * 1.2}s` }}
        >
          {note}
        </div>
      ))}

      <div className="bg-[#000]/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r bg-[#3b19e6] bg-clip-text text-transparent mb-2">
            Melodex
          </h1>
          <p className="text-slate-400">Welcome back to your music</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/60 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/60 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="w-4 h-4 text-blue-400 bg-slate-900/60 border-slate-600/50 rounded focus:ring-blue-400/20"
              />
              <span className="text-sm text-slate-400">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-400 hover:text-purple-400 transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${
              isLoading
                ? 'bg-slate-600 cursor-not-allowed'
                : 'bg-[#3b19e6] hover:to-purple-600 hover:shadow-xl'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-slate-600/50"></div>
          <span className="px-4 text-sm text-slate-500">or</span>
          <div className="flex-1 border-t border-slate-600/50"></div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center space-x-2 py-3 px-4 bg-slate-800/60 border border-slate-600/50 rounded-xl text-slate-300 hover:bg-slate-800/80 hover:border-slate-500 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-sm">Google</span>
          </button>

          <button
            className="flex items-center justify-center space-x-2 py-3 px-4 bg-slate-800/60 border border-slate-600/50 rounded-xl text-slate-300 hover:bg-slate-800/80 hover:border-slate-500 transition-all"
            disabled
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="text-sm">Facebook</span>
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:text-purple-400 font-semibold transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
