// src/components/Header.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './Header.css';

function Header({ user }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1>CodeCollab</h1>

      <nav>
        <ul className="nav-links" style={{ display: 'flex', gap: '15px', alignItems: 'center', margin: 0, padding: 0 }}>
          <li><a href="#editor">Editor</a></li>
          <li><a href="#chat">Chat</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>

      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <span>{user.name}</span>
          <button
            onClick={handleLogout}
            style={{
              marginLeft: '10px',
              padding: '6px 12px',
              background: '#c75353',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
