import React, { forwardRef, useEffect } from 'react';
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";

const Cyl = forwardRef((props, ref) => {
  const texture = useTexture("./projects.png");

  useEffect(() => {
    if (ref.current) {
      gsap.set(ref.current.position, { x: -10, y: 0, z: -4});
      const tl = gsap.timeline({
        onUpdate: () => {
          const x = -4 * Math.cos(tl.progress() * Math.PI * 0.5);
          const z = 5 * Math.sin(tl.progress() * Math.PI * 2);
          ref.current.rotation.y -= (tl.progress() * 0.045);
          ref.current.position.set(x, 0, z);
        },
        onComplete: () => {
          gsap.to(ref.current.scale, { duration: 1, x: 4.6, y: 4.6, z: 4.6 });
        }
      });

      tl.to(ref.current.position, { duration: 2, x: 0, y: 0, z: 0 });
    }
  }, [ref]);


  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta;
    }
  });

  return (
    <mesh ref={ref} rotation={[0.1, 1.1, 0.25]}>
      <cylinderGeometry args={[1, 1, 1, 30, 30, true]} />
      <meshStandardMaterial map={texture} transparent side={THREE.DoubleSide} />
    </mesh>
  );
});

export default Cyl;
