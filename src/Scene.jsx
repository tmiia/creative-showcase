import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import Cyl from "./Cyl"
import Plane from "./Plane"
import { Bloom, EffectComposer } from '@react-three/postprocessing'

function Scene() {
  const [currentScene, setCurrentScene] = useState(0);
  const cylRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  const scenes = [
    {
      content: (
        <>
          <span>This is a sound experience.</span>
          <span>Click to start.</span>
        </>
      ),
      animation: () => {gsap.fromTo(sceneRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });},
      trigger: "click",
    },
    {
      content: <span>Type on your keyboard to continue</span>,
      trigger: "keypress",
    },
    {
      content: <span>W <span className="cursor">|</span></span>,
      trigger: "keypress",
    },
    {
      content: <span>We <span className="cursor">|</span></span>,
      trigger: "keypress",
    },
    {
      content: <span>Wel <span className="cursor">|</span></span>,
      trigger: "keypress",
    },
    {
      content: <span>Welc <span className="cursor">|</span></span>,
      trigger: "keypress",
    },
    {
      content: <span>Welco <span className="cursor">|</span></span>,
      trigger: "keypress",
    },
    {
      content: <span>Welcom <span className="cursor">|</span></span>,
      trigger: "keypress",
    },
    {
      content: <span>Welcome <span className="cursor">|</span></span>,
      trigger: "keypress",
    },
    {
      content: (
        <>
          <Canvas className="scene" flat camera={{ fov: 35 }}>
            <ambientLight />
            <Cyl ref={cylRef} />
            <EffectComposer>
              <Bloom
                mipmapBlur
                intensity={5}
                luminanceThreshold={0}
                luminanceSmoothing={0}
              />
            </EffectComposer>
          </Canvas>
        </>
      ),
      trigger: "special",
      animation: () => {gsap.fromTo(sceneRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });},
    },
    {
      content: (
        <>
          <Canvas className="scene relative" flat camera={{ fov: 35 }}>
            <ambientLight />
            <Plane />
            <EffectComposer>
              <Bloom
                mipmapBlur
                intensity={6}
                luminanceThreshold={0}
                luminanceSmoothing={0}
              />
            </EffectComposer>
          </Canvas>
          <span className="absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2">You've just entered my mind</span>
        </>
      ),
      trigger: "special",
      animation: () => {
        gsap.fromTo(sceneRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
      },
    },
    {
      content: (
        <>
          <div className="folder trigger">
            <span>But who am I ?</span>
          </div>
          <div className="folder">
            <span>a creative developer</span>
          </div>
          <div className="folder">
            <span>and a Gobelins Student</span>
          </div>
          <div className="folder">
            <span>let's keep in touch :)</span>
          </div>
        </>
      ),
      animation: () => {

        gsap.fromTo(sceneRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });

        const container = document.querySelector('.trigger').parentElement;
        container.classList.add('fit-content');


        const panels = gsap.utils.toArray('.scene .folder');
        let tops = panels.map(panel => ScrollTrigger.create({trigger: panel, start: "top top"}));

        panels.forEach((panel, i) => {
          ScrollTrigger.create({
            trigger: panel,
            start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
            pin: true,
            pinSpacing: false,
            onEnter: () => {
              gsap.to(panel, { scale: 1, duration: 0.5 });
            },
          });
        });

      },
    },
  ];

  const sceneRef = useRef(null);

  useEffect(() => {
    const handleTrigger = (event) => {
      if (scenes[currentScene].trigger === "click" && event.type === "click") {
        handleNextScene();
      } else if (scenes[currentScene].trigger === "keypress" && event.type === "keypress") {
        handleNextScene();
      }
    };

    if (sceneRef.current) {
      if (scenes[currentScene].trigger === "click") {
        sceneRef.current.addEventListener("click", handleTrigger);
      } else if (scenes[currentScene].trigger === "keypress") {
        window.addEventListener("keypress", handleTrigger);
      }
      else if (scenes[currentScene].trigger === "special") {
        setTimeout(() => {
          handleNextScene();
        }, 3000);
      }

      if (scenes[currentScene].animation) {
        scenes[currentScene].animation();
      }
    }

    return () => {
      if (sceneRef.current) {
        sceneRef.current.removeEventListener("click", handleTrigger);
      }
      window.removeEventListener("keypress", handleTrigger);
    };
  }, [currentScene]);

  const handleNextScene = () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(currentScene + 1);
    }
  };

  return (
    <div
      className="scene"
      ref={sceneRef}
    >
      {scenes[currentScene].content}
    </div>
  );
}

export default Scene
