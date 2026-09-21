import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Torus, Octahedron, Line } from '@react-three/drei';
import * as THREE from 'three';

// --- Particle Constellation ---
const PARTICLE_COUNT = 120;
const BOUNDARY = 50;
const MAX_DISTANCE = 22;

function Constellation() {
  const pointsRef = useRef();
  const linesRef = useRef();

  // Initialize particles with positions and velocities
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * BOUNDARY * 2,
          (Math.random() - 0.5) * BOUNDARY * 2,
          (Math.random() - 0.5) * BOUNDARY * 2
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.15,
          (Math.random() - 0.5) * 0.15,
          (Math.random() - 0.5) * 0.15
        )
      });
    }
    return temp;
  }, []);

  // Compute buffers for points and lines
  const positions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);
  
  // We'll update the line geometry every frame
  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: '#38BDF8', // Primary Cyan Glow
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  }), []);

  useFrame(() => {
    const linePositions = [];

    // Update positions and handle bounding box bounce
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];
      p.position.add(p.velocity);

      if (Math.abs(p.position.x) > BOUNDARY) p.velocity.x *= -1;
      if (Math.abs(p.position.y) > BOUNDARY) p.velocity.y *= -1;
      if (Math.abs(p.position.z) > BOUNDARY) p.velocity.z *= -1;

      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;

      // Check proximity with other particles
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const p2 = particles[j];
        const dist = p.position.distanceTo(p2.position);
        
        if (dist < MAX_DISTANCE) {
          linePositions.push(
            p.position.x, p.position.y, p.position.z,
            p2.position.x, p2.position.y, p2.position.z
          );
        }
      }
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Update lines
    if (linesRef.current) {
      linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.6} 
          color="#38BDF8" 
          transparent 
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>
      <lineSegments ref={linesRef} material={lineMaterial} geometry={lineGeometry} />
    </group>
  );
}

// --- Central Core Geometry ---
function GeometricCore() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.1;
    groupRef.current.rotation.z = t * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Outer Wireframe Torus */}
      <Torus args={[15, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#6166F5" wireframe transparent opacity={0.15} />
      </Torus>
      
      {/* Inner Wireframe Torus */}
      <Torus args={[10, 0.1, 16, 100]} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.2} />
      </Torus>

      {/* Solid Octahedron Core */}
      <Octahedron args={[3, 0]}>
        <meshStandardMaterial 
          color="#0a0e17" 
          emissive="#6166F5" 
          emissiveIntensity={0.2} 
          wireframe={false} 
          roughness={0.1}
          metalness={0.8}
        />
      </Octahedron>
      
      {/* Wireframe Octahedron Shell */}
      <Octahedron args={[4, 0]}>
        <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.4} />
      </Octahedron>
    </group>
  );
}

// --- Parallax Camera ---
function Rig() {
  const { camera, mouse } = useThree();
  
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 15, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 15, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none bg-[#07090E]">
      <Canvas camera={{ position: [0, 0, 60], fov: 45 }}>
        <fog attach="fog" args={['#07090E', 30, 90]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#38BDF8" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#6166F5" />
        
        <Constellation />
        <GeometricCore />
        <Rig />
      </Canvas>
    </div>
  );
}
