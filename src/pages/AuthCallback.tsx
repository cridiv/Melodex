import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Session error:', error.message);
        return navigate('/signin');
      }

      if (session) {
        console.log('User session:', session);
        navigate('/home');
      } else {
        navigate('/signin');
      }
    };

    checkSession();
  }, [navigate]);

  return <div className="text-white p-8">Redirecting...</div>;
};

export default AuthCallback;
