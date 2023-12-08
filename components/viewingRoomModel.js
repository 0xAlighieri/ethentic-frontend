import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";

export function ViewingRoomModel({ url, position, scale, activeModelColor }) {
  const STLLoader = require("three/examples/jsm/loaders/STLLoader").STLLoader;

  const geom = useLoader(STLLoader, url);

  const ref = useRef();

  return (
    <React.Fragment>
      <mesh ref={ref} scale={scale} rotation={[Math.PI * 1.5, 0, 0]} position={position}>
        <primitive object={geom} attach="geometry" />
        <meshStandardMaterial color={activeModelColor} />
      </mesh>
    </React.Fragment>
  );
}
