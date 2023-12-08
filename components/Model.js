import React, { useRef, useEffect } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Model({ url }) {
  const STLLoader = require("three/examples/jsm/loaders/STLLoader").STLLoader;

  const geom = useLoader(STLLoader, url);

  const ref = useRef();
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(ref.current.position);
  });

  return (
    <React.Fragment>
      <mesh ref={ref} scale={1.2} rotation={[Math.PI / -2.2, 0, 1]}>
        <primitive object={geom} attach="geometry" />
        <meshStandardMaterial color={"#229186"} />
        <ambientLight />
        <pointLight position={[0, -20, -50]} />
        <pointLight position={[0, 10, 100]} />
        <OrbitControls
          enablePan={false}
          minDistance={50.0}
          maxDistance={150.0}
          zoomSpeed={0.2}
          rotateSpeed={0.6}
          autoRotate={true}
          autoRotateSpeed={1.0}
        />
      </mesh>
      <ambientLight />
    </React.Fragment>
  );
}
