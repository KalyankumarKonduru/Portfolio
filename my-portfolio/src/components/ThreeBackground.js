import React, { useRef, useEffect, useContext } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { ThemeContext } from '../context/ThemeContext';

// Generate random 3D points for stars/particles
function generatePoints(count, radius) {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const angle = Math.random() * Math.PI * 2;
    const z = (Math.random() * 2) - 1;
    const x = Math.cos(angle) * Math.sqrt(1 - z * z) * radius;
    const y = Math.sin(angle) * Math.sqrt(1 - z * z) * radius;
    
    points[i3] = x * (0.5 + Math.random() * 0.5);
    points[i3 + 1] = y * (0.5 + Math.random() * 0.5);
    points[i3 + 2] = z * radius;
  }
  return points;
}

function ParticleField({ count, color }) {
  const points = useRef();
  const sphere = generatePoints(count, 3);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.1;
    points.current.rotation.x = Math.sin(t / 4);
    points.current.rotation.y = Math.sin(t / 4);
    points.current.rotation.z = Math.sin(t / 6);
  });

  return (
    <Points ref={points} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function CameraController() {
  const { camera, mouse } = useThree();
  const initialPosition = useRef([0, 0, 5]);
  
  useEffect(() => {
    camera.position.set(...initialPosition.current);
  }, [camera]);
  
  useFrame(() => {
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

const ThreeBackground = () => {
  const { colors, isDarkMode } = useContext(ThemeContext);
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      opacity: 0.6,
      pointerEvents: 'none',
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <CameraController />
        <ParticleField count={2000} color={colors.highlight} />
        {isDarkMode && (
          <ParticleField count={1000} color={colors.accent} />
        )}
        <fog attach="fog" args={[colors.background, 3.5, 7.5]} />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;