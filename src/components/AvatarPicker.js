// src/components/AvatarPicker.js
import React, { useState } from 'react';
import bear from '../assets/avatars/bear.png';
import cow from '../assets/avatars/cow.png';
import jaguar from '../assets/avatars/jaguar.png';
import panda from '../assets/avatars/panda-bear.png';
import turtle from '../assets/avatars/turtle.png';

const avatars = [
  { key: 'bear', src: bear, alt: 'Bear' },
  { key: 'cow', src: cow, alt: 'Cow' },
  { key: 'jaguar', src: jaguar, alt: 'Jaguar' },
  { key: 'panda', src: panda, alt: 'Panda Bear' },
  { key: 'turtle', src: turtle, alt: 'Turtle' },
];

function AvatarPicker({ onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle, #1e1e1e 0%, #121212 100%)',
      color: '#fff',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        position: 'relative',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Center text */}
        <div style={{
        position: 'absolute',
        zIndex: 1,
        color: '#fff',
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        pointerEvents: 'none',
        top: 'calc(50% - 0px)', // moves it a bit higher
        transform: 'translateY(-50%)',
        }}>
        {hovered ? hovered.toUpperCase() : (
            <>
            <div>CHOOSE YOUR</div>
            <div>AVATAR</div>
            </>
        )}
        </div>


        {/* Position avatars in a circle */}
        {avatars.map((avatar, i) => {
          const angle = (2 * Math.PI / avatars.length) * i;
          const radius = 160;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <img
              key={avatar.key}
              src={avatar.src}
              alt={avatar.alt}
              onClick={() => onSelect(avatar.key)}
              onMouseEnter={() => setHovered(avatar.alt)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}px - 50px)`,
                top: `calc(50% + ${y}px - 50px)`,
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: hovered === avatar.alt ? '4px solid #c75353' : '2px solid #888',
                transition: 'transform 0.3s, border 0.3s',
                transform: hovered === avatar.alt ? 'scale(1.2)' : 'scale(1)',
                cursor: 'pointer',
                background: '#222',
                objectFit: 'cover',
                boxShadow: hovered === avatar.alt ? '0 0 15px #c75353' : '0 0 10px #000',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AvatarPicker;
