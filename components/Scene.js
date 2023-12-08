import * as THREE from "three";
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture, useGLTF } from "@react-three/drei";
import LoadingDisplay from "../components/LoadingDisplay";
import { ViewingRoomModel } from "components/viewingRoomModel";
import { useResourceExists } from "../hooks/api/useResourceExists";

export default (props) => {
  const { activeModel, activeModelColor } = props;
  const [stlExists, stlUrl] = useResourceExists(activeModel);

  const group = useRef();
  const { nodes } = useGLTF("/blender/ethentic_optimize.glb");
  const sceneTexture = useTexture("/blender/scene_texture.jpg");
  sceneTexture.flipY = false;
  sceneTexture.encoding = THREE.sRGBEncoding;
  const bakedMaterial = new THREE.MeshBasicMaterial({ map: sceneTexture });

  return (
    <div>
      {stlExists ? (
        <div style={{ width: `100%`, height: `1080px`, position: `relative` }}>
          <Canvas
            camera={{ position: [1.4, 5, 0], fov: 50, near: 1, far: 80 }}
            onCreated={({ camera }) => camera.lookAt(120, 5, 0)}>
            <group>
              <group ref={group} {...props} dispose={null}>
                <ViewingRoomModel
                  url={stlUrl}
                  scale={0.015}
                  position={[0, 0.59, 0]}
                  activeModelColor={activeModelColor}
                />
                <ambientLight intensity={0.3} color={"#FFF"} />
                <directionalLight
                  intensity={0.3}
                  color={"#FFF"}
                  castshadow
                  shadowMapSizeHeight={512}
                  shadowMapSizeWidtht={512}
                  shadowCameraFar={5}
                  shadowCameraNear={0.1}
                  distance={200}
                />
                <mesh geometry={nodes.optimized.geometry} material={bakedMaterial} />
              </group>
            </group>
            <OrbitControls
              enablePan={false}
              minDistance={2}
              maxDistance={3.6}
              zoomSpeed={0.2}
              maxPolarAngle={1.3079}
              enableDamping={true}
            />
          </Canvas>
        </div>
      ) : (
        <div>
          <LoadingDisplay loadingType="modelRendering" />
        </div>
      )}{" "}
    </div>
  );
};
