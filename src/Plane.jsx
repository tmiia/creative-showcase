import React, { useRef, useEffect } from 'react';
import * as THREE from "three";
import { gsap } from "gsap";

function Plane({ texture }) {
  const meshRef = useRef();

  useEffect(() => {
    gsap.to(meshRef.current.position, {
      x: 15,
      y: 10,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 5
    });
  }, []);

  return (
    <mesh
      ref={meshRef}
      rotation={[0, 0, Math.PI / 4]}
      position={[-15, -10, -20]}
    >
      <planeGeometry attach="geometry" args={[7.26 * 10, 10]} />
      <meshStandardMaterial map={texture} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

export default Plane;
