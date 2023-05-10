import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useIsMounted } from "../pages/hooks/useIsMounted";
export default function Game() {
  const isMounted = useIsMounted();
  const { unityProvider } = useUnityContext({
    loaderUrl: "build/learningscene.loader.js",
    // loaderUrl: "next.svg",
    dataUrl: "build/learningscene.data",
    frameworkUrl: "build/learningscene.framework.js",
    codeUrl: "build/learningscene.wasm",
  });
 
  return (
    <div>
      {isMounted && <Unity unityProvider={unityProvider} style={{
      width: '60vw',
      
      }}/>}
    </div>
  );
}






