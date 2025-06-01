// src/components/Login.js
import React, { useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

function Login({ setUser }) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          avatar: user.photoURL,
          uid: user.uid,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [setUser]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const handleGuestLogin = () => {
    const guestId = 'guest_' + Math.random().toString(36).substring(2, 10);
    setUser({
      name: 'Guest',
      avatar: null, // Will trigger avatar picker
      uid: guestId,
    });
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #e8b33c, #cb4444)',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        textAlign: 'center',
        background: '#fff',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        width: '300px',
      }}>
        <h2 style={{ marginBottom: '30px', color: '#333' }}>Welcome to CodeCollab</h2>
        <button onClick={handleLogin} style={{
        width: '100%',
        padding: '12px',
        background: '#fff',
        border: '2px solid #4285F4',
        color: '#4285F4',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginBottom: '15px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 0 10px #4285F4';
        }}
        onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
        }}>
        Sign in with Google
        </button>
        <div style={{ margin: '10px 0', color: '#aaa' }}>or</div>
        <button onClick={handleGuestLogin} style={{
        width: '100%',
        padding: '12px',
        background: '#c75353',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 0 10px #c75353';
        }}
        onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
        }}>
        Continue as Guest
        </button>
      </div>
    </div>
  );
}

export default Login;
