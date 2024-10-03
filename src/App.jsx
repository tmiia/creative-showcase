import React, { useState, useEffect } from 'react';
import "./style.css";
import Scene from './Scene';
import Music from './Music';
import { useProgress } from "@react-three/drei";
import useTextures from './useTextures';

const Loader = () => {
  const { progress } = useProgress();

  return (
    <div className="loader">
      <div className="loader-text">Loading {Math.round(progress)}%</div>
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const texture = useTextures("./projects.png");
  const { progress } = useProgress();

  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (progress >= 100) {
      const elapsedTime = Date.now() - startTime;

      const timeout = setTimeout(() => {
        setLoading(false);
      }, Math.max(2000 - elapsedTime, 0));

      return () => clearTimeout(timeout);
    }
  }, [progress, startTime]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Scene texture={texture} />
      <Music />
    </>
  );
};

export default App;
