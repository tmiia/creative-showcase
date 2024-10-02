import React, { useEffect, useRef } from 'react';

function Music(props) {
  const audioRef = useRef(null);

  const startAudioHandler = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((error) => {
        console.error("Erreur lors de la lecture de l'audio :", error);
      });
    }
  };

  useEffect(() => {
    window.addEventListener('click', startAudioHandler);
    return () => {
      window.removeEventListener('click', startAudioHandler);
    };
  }, []);

  return (
    <audio ref={audioRef} id="audio" src="/music.mp3" muted></audio>
  );
}

export default Music;
