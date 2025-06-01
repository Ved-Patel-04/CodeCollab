import React, { useState, useEffect, useRef } from 'react';
import { db } from './firebase';
import { ref, push, onChildAdded, off, set, remove, onValue } from 'firebase/database';


export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [typingUsers, setTypingUsers] = useState([]);

  const typingTimeout = useRef(null);
  const usernameAsked = useRef(false);

  // Load messages from Firebase
  useEffect(() => {
    const messagesRef = ref(db, 'messages');

    const callback = (snapshot) => {
      const message = snapshot.val();
      setMessages(prev => [...prev, message]);
    };
    onChildAdded(messagesRef, callback);

    return () => {
      off(messagesRef, 'child_added', callback);
    };
  }, []);

  // Listen for typing users changes
  useEffect(() => {
    const typingRef = ref(db, 'typing');
    const unsubscribe = onValue(typingRef, (snapshot) => {
      const data = snapshot.val() || {};
      // Show all users typing except current user
      const othersTyping = Object.values(data).filter(name => name !== username);
      setTypingUsers(othersTyping);
    });

    return () => unsubscribe();
  }, [username]);

  // Prompt for username on first input focus
  const handleInputFocus = () => {
    if (!usernameAsked.current) {
      usernameAsked.current = true;
      const name = prompt("Enter a username for chat:");
      if (name && name.trim()) {
        setUsername(name.trim());
      } else {
        setUsername("Anonymous");
      }
    }
  };

  // Handle typing: update input and typing status in Firebase
  const handleTyping = (text) => {
    setInput(text);

    if (!username) return;

    const typingRef = ref(db, `typing/${username}`);

    // Mark as typing
    set(typingRef, username);

    // Clear previous timeout
    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    // Remove typing status after 2 seconds of inactivity
    typingTimeout.current = setTimeout(() => {
      remove(typingRef);
    }, 2000);
  };

  // Send message to Firebase with username & timestamp
  const sendMessage = () => {
    if (input.trim() === '' || !username) return;

    const messagesRef = ref(db, 'messages');
    push(messagesRef, {
      username,
      text: input.trim(),
      timestamp: Date.now(),
    });

    setInput('');

    // Remove typing indicator immediately after sending
    const typingRef = ref(db, `typing/${username}`);
    remove(typingRef);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={{
      border: '1px solid #2a2a2a',
      backgroundColor: '#1e1e1e',
      borderRadius: '8px',
      padding: 10,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      color: '#fff',
      fontFamily: 'monospace',
    }}>
      <div style={{
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#ccc',
      }}>
        Chat
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        border: '1px solid #333',
        backgroundColor: '#2d2d2d',
        padding: 10,
        borderRadius: '4px',
        marginBottom: 10,
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            marginBottom: 8,
            backgroundColor: '#3c3c3c',
            padding: '6px 10px',
            borderRadius: 6,
            fontSize: 14,
          }}>
            <strong>{msg.username}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div style={{ minHeight: 24, marginBottom: 8, color: '#aaa', fontSize: 12 }}>
        {typingUsers.length > 0 && (
          <em>{typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...</em>
        )}
      </div>

      <input
        type="text"
        value={input}
        placeholder={username ? "Type a message..." : "Click here to enter username"}
        onFocus={handleInputFocus}
        onChange={(e) => handleTyping(e.target.value)}
        onKeyDown={handleKeyPress}
        style={{
          padding: 10,
          fontSize: 14,
          border: '1px solid #555',
          borderRadius: 4,
          backgroundColor: '#2a2a2a',
          color: '#fff',
          outline: 'none',
        }}
        disabled={!username && usernameAsked.current}
      />
      <button
        onClick={sendMessage}
        style={{
          marginTop: 8,
          padding: '8px 12px',
          backgroundColor: '#007acc',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
        disabled={!username}
      >
        Send
      </button>
    </div>
  );
}
