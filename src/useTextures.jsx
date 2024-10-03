import { useEffect, useState } from "react";
import { TextureLoader } from "three";

const useTextures = (url) => {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(url, (loadedTexture) => {
      setTexture(loadedTexture);
    });

    return () => {
      setTexture(null);
    };
  }, [url]);

  return texture;
};

export default useTextures;
