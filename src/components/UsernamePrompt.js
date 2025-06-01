// src/components/UsernamePrompt.js
import React, { useState } from 'react';

const avatarDescriptions = {
  panda: "You picked the Panda-Bear 🐼 — chill, focused, and always in sync with user experience and design.",
  cow: "You picked the Cow 🐮 — calm, dependable, and excellent at maintaining clean, scalable codebases.",
  jaguar: "You picked the Jaguar 🐆 — fast, fierce, and skilled at optimizing performance and tackling tough bugs.",
  bear: "You picked the Bear 🐻 — strong, reliable, and a master of backend logic and heavy lifting in code.",
  turtle: "You picked the Turtle 🐢 — steady, thoughtful, and unbeatable in long-term projects and testing."
};

function UsernamePrompt({ user, avatar, onComplete }) {
  const isGuest = !user.name;
  const [username, setUsername] = useState(user.name || '');
  const [editing, setEditing] = useState(isGuest);

  // Extract avatar key reliably from the image source URL or path
  const avatarKey = Object.keys(avatarDescriptions).find(key =>
    avatar && avatar.toLowerCase().includes(key)
  ) || 'robot';

  const description = avatarDescriptions[avatarKey] || '';

  const handleContinue = () => {
    if (username.trim()) {
      onComplete({ ...user, name: username.trim() });
      setEditing(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #e8d28b 0%, #b45757 100%)',
        padding: '40px',
        textAlign: 'center',
      }}
    >
      <img
        src={avatar}
        alt="Avatar"
        style={{
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          marginBottom: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          objectFit: 'cover',
        }}
      />
      <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '10px' }}>
        {isGuest ? 'Choose a Username' : `Welcome, ${user.name}`}
      </h2>
      <p
        style={{
          maxWidth: '500px',
          color: '#fff',
          fontStyle: 'italic',
          marginBottom: '20px',
        }}
      >
        {description}
      </p>

      {(isGuest || editing) && (
        <input
          type="text"
          placeholder="Enter a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '12px 20px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px',
            width: '80%',
            maxWidth: '400px',
            marginBottom: '20px',
            outline: 'none',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleContinue();
          }}
          autoFocus
        />
      )}

      {!isGuest && !editing && (
        <button
          onClick={() => setEditing(true)}
          style={{
            marginBottom: '20px',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontStyle: 'italic',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Change username
        </button>
      )}

      <button
        onClick={handleContinue}
        style={{
          background: '#fff',
          color: '#b45757',
          border: 'none',
          padding: '12px 30px',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 0 10px #fff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        Continue
      </button>
    </div>
  );
}

export default UsernamePrompt;
