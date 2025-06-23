import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
interface FormData {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!formData.acceptTerms) {
      alert('Please accept the Terms of Service and Privacy Policy');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    // Simulate API call
try {
  const res = await fetch('http://localhost:3000/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fullName: formData.fullName,
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
      gender: (formData as any).gender,
      country: (formData as any).country
    }),
  });

  if (!res.ok) throw new Error('Signup failed');

  setSubmitStatus('success');
  setIsSubmitting(false);

  setTimeout(() => {
    alert('Welcome to Melodex! Your account has been created successfully.');
  }, 1000);
} catch (err) {
  console.error(err);
  setSubmitStatus('error');
  setIsSubmitting(false);
  alert('There was an error signing up. Please try again.');
}
  }

    const handleGoogleLogin = async () => {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:5173/auth/callback',
        },
      });
    };

  const getButtonText = () => {
    if (isSubmitting) return 'Creating Account...';
    if (submitStatus === 'success') return 'Account Created! ✓';
    return 'Create Account';
  };

  const getButtonStyle = () => {
    if (isSubmitting) return 'bg-gradient-to-r from-slate-500 to-slate-600';
    if (submitStatus === 'success') return 'bg-gradient-to-r from-emerald-500 to-emerald-600';
    return 'bg-[#3b19e6] hover:bg-[#3b1e96] transition-colors duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400/20 disabled:opacity-70 disabled:cursor-not-allowed';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000] relative overflow-hidden">
      {/* Floating background elements */}
            
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['♪', '♫', '♪', '♬'].map((note, index) => (
          <div
            key={index}
            className={`absolute text-4xl text-slate-600 opacity-10 animate-pulse ${
              index === 0 ? 'top-1/4 left-1/4' :
              index === 1 ? 'top-1/3 right-1/4' :
              index === 2 ? 'bottom-1/3 left-1/5' :
              'bottom-1/4 right-1/5'
            }`}
            style={{
              animation: `float 6s ease-in-out infinite ${index * 1.5}s`,
              animationDelay: `${index * 1.5}s`
            }}
          >
            {note}
          </div>
        ))}
      </div>

      {/* Main signup container */}
      <div className="bg-[#000]/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 w-full max-w-md shadow-2xl relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-[#3b19e6] bg-clip-text text-transparent mb-2">
            <Link to="/">
            Melodex
            </Link>
          </h1>
          <p className="text-slate-400">Discover your perfect sound</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="group">
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300 group-hover:border-slate-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="group">
              <label htmlFor="userName" className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300 group-hover:border-slate-500"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300 group-hover:border-slate-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="group">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              Password
              </label>
              <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-900/60 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300 group-hover:border-slate-500"
              placeholder="Create a strong password"
              required
              />
            </div>

            {/* Gender select */}
            <div className="group">
              <label htmlFor="gender" className="block text-sm font-medium text-slate-300 mb-2">
              Gender
              </label>
              <select
              id="gender"
              name="gender"
              value={(formData as any).gender || ''}
              onChange={e => setFormData(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-900/60 border border-slate-600/50 rounded-xl text-slate-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300"
              required
              >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>

            {/* Country select */}
            <div className="group">
              <label htmlFor="country" className="block text-sm font-medium text-slate-300 mb-2">
              Country
              </label>
              <select
              id="country"
              name="country"
              value={(formData as any).country || ''}
              onChange={e => setFormData(prev => ({ ...prev, country: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-900/60 border border-slate-600/50 rounded-xl text-slate-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300"
              required
              >
              <option value="" disabled>
                Select your country
              </option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
              <option value="in">India</option>
              <option value="other">Other</option>
              </select>
            </div>

            <div className="group">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300 group-hover:border-slate-500"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              className="w-5 h-5 text-blue-400 bg-slate-900/60 border-slate-600/50 rounded focus:ring-blue-400/20 focus:ring-2 mt-0.5"
              required
            />
            <label htmlFor="acceptTerms" className="text-sm text-slate-400 leading-relaxed">
              I agree to Melodex's{' '}
              <a href="#" className="text-blue-400 hover:text-purple-400 transition-colors duration-300">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-400 hover:text-purple-400 transition-colors duration-300">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting || submitStatus === 'success'}
            className={`bg-[#3b19e6] w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:bg-[#3b1e96] disabled:opacity-70 disabled:cursor-not-allowed ${getButtonStyle()}`}
          >
            {getButtonText()}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-slate-600/50"></div>
          <span className="px-4 text-sm text-slate-500">or continue with</span>
          <div className="flex-1 border-t border-slate-600/50"></div>
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center space-x-2 py-3 px-4 bg-slate-800/60 border border-slate-600/50 rounded-xl text-slate-300 hover:bg-slate-800/80 hover:border-slate-500 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-sm">Google</span>
          </button>
          
          <button type="button" className="flex items-center justify-center space-x-2 py-3 px-4 bg-slate-900/60 border border-slate-600/50 rounded-xl text-slate-300 hover:bg-slate-800/80 hover:border-slate-500 transition-all duration-300 group">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="text-sm font-medium">Facebook</span>
          </button>
        </div>

        {/* Login link */}
        <div className="text-center">
          <p className="text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-400 hover:text-purple-400 font-semibold transition-colors duration-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Signup;