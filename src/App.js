import React, { useState, useEffect } from 'react';
import Chat from './Chat';
import Header from './components/Header';
import Editor from './components/Editor';
import Login from './components/Login';
import AvatarPicker from './components/AvatarPicker';
import UsernamePrompt from './components/UsernamePrompt';
import { db } from './firebase';
import { ref, get, set } from 'firebase/database';
import './styles/App.css';

import bear from './assets/avatars/bear.png';
import cow from './assets/avatars/cow.png';
import jaguar from './assets/avatars/jaguar.png';
import panda from './assets/avatars/panda-bear.png';
import turtle from './assets/avatars/turtle.png';

const avatarMap = {
  bear,
  cow,
  jaguar,
  panda,
  turtle,
};

function App() {
  const [user, setUser] = useState(null);
  const [loadingAvatar, setLoadingAvatar] = useState(true);

  // Store avatar key (string) and avatar image separately
  const [avatarKey, setAvatarKey] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const [usernameConfirmed, setUsernameConfirmed] = useState(false);

  useEffect(() => {
    if (user) {
      const avatarRef = ref(db, 'avatars/' + user.uid);
      get(avatarRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const key = snapshot.val();
            setAvatarKey(key);
            setAvatar(avatarMap[key] || null);
          } else {
            setAvatarKey(null);
            setAvatar(null);
          }
          setLoadingAvatar(false);
        })
        .catch(() => {
          setAvatarKey(null);
          setAvatar(null);
          setLoadingAvatar(false);
        });
    } else {
      setAvatarKey(null);
      setAvatar(null);
      setLoadingAvatar(true);
    }
  }, [user]);

  const handleAvatarSelect = async (key) => {
    if (!user) return;
    const avatarRef = ref(db, 'avatars/' + user.uid);
    await set(avatarRef, key);
    setAvatarKey(key);
    setAvatar(avatarMap[key]);
  };

  if (!user) {
    return <Login setUser={setUser} />;
  }

  if (loadingAvatar) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  if (!avatar) {
    return <AvatarPicker onSelect={handleAvatarSelect} />;
  }

  if (!usernameConfirmed) {
    return (
      <UsernamePrompt
        user={user}
        avatar={avatar}
        avatarKey={avatarKey}  // <-- Pass avatarKey here for description mapping
        onComplete={(updatedUser) => {
          setUser(updatedUser);
          setUsernameConfirmed(true);
        }}
      />
    );
  }

  return (
    <div
      className="App"
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px',
        height: '100vh',
        background: 'linear-gradient(135deg,rgb(239, 231, 116) 0%,rgb(199, 83, 83) 100%)',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header user={{ ...user, avatar }} />
      <main
        style={{
          marginTop: '20px',
          display: 'flex',
          gap: '20px',
          height: '80vh',
        }}
      >
        <div style={{ flex: '0 0 30%', minWidth: '250px', display: 'flex', flexDirection: 'column' }}>
          <Chat user={{ ...user, avatar }} />
        </div>
        <div style={{ flex: '1 1 70%', display: 'flex', flexDirection: 'column' }}>
          <Editor />
        </div>
      </main>
    </div>
  );
}

export default App;
