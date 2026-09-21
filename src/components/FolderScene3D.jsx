import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const NUM = 4;

/* ─── 3D slot positions matching the sketch layout ──────────────
   Slot 0 (Active/Front): invisible in 3D (HTML overlays it)
   Slot 1 (Queue/Left):   left-middle, clearly visible
   Slot 2 (Stack/Top):    top-center, visible
   Slot 3 (Back/Right):   right-top, visible
   ─────────────────────────────────────────────────────────────── */
const SLOTS_DESKTOP = [
  { x: 0, y: -0.2, z: 0, rx: 0, ry: 0, rz: 0, s: 1, op: 0 },
  { x: 6, y: 0.5, z: -2, rx: 0.4, ry: -0.4, rz: 0, s: 0.65, op: 0.4 },
  { x: 0, y: 2.5, z: -6, rx: 0.2, ry: 0, rz: 0, s: 0.45, op: 0.4 },
  { x: -6, y: 0.5, z: -2, rx: 0.4, ry: 0.4, rz: 0, s: 0.65, op: 0.4 }
];

const SLOTS_MOBILE = [
  { x: 0, y: -0.5, z: 0, rx: 0, ry: 0, rz: 0, s: 0.9, op: 0 },
  { x: 3, y: 1, z: -4, rx: 0, ry: -0.3, rz: 0, s: 0.3, op: 0.6 },
  { x: 0, y: 3, z: -6, rx: 0.2, ry: 0, rz: 0, s: 0.2, op: 0.4 },
  { x: -3, y: 1, z: -4, rx: 0, ry: 0.3, rz: 0, s: 0.3, op: 0.6 }
];

function cubicEase(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerpSlot(slots, posIdx) {
  const w = ((posIdx % NUM) + NUM) % NUM;
  const f = Math.floor(w);
  const c = (f + 1) % NUM;
  const t = cubicEase(w - f);
  const a = slots[f], b = slots[c];
  const result = {};
  for (const k of Object.keys(a)) {
    result[k] = a[k] + (b[k] - a[k]) * t;
  }
  return result;
}

/* ─── Individual 3D Folder Mesh ─────────────────────────────────── */
function Folder3D({ color, cardIndex, scrollRef, slots }) {
  const groupRef = useRef();
  const bodyMatRef = useRef();
  const tabMatRef = useRef();
  const accentRef = useRef();
  const glowRef = useRef();
  const edgeMatsRef = useRef([]);

  const edgeColor = useMemo(() => new THREE.Color(color), [color]);
  const bodyColor = useMemo(() => new THREE.Color('#0e1830'), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    const u = Math.min(p / 0.9, 1);
    const shift = u * (NUM - 1);
    const posIdx = ((cardIndex - shift) % NUM + NUM) % NUM;
    const slot = lerpSlot(slots, posIdx);

    // Subtle breathing/floating animation
    const t = state.clock.elapsedTime;
    const breathY = Math.sin(t * 0.6 + cardIndex * 1.7) * 0.07;
    const breathRz = Math.sin(t * 0.45 + cardIndex * 2.3) * 0.007;

    groupRef.current.position.set(slot.x, slot.y + breathY, slot.z);
    groupRef.current.rotation.set(slot.rx, slot.ry, slot.rz + breathRz);
    groupRef.current.scale.setScalar(slot.s);

    // Update opacities
    const op = slot.op;
    if (bodyMatRef.current) bodyMatRef.current.opacity = op * 0.88;
    if (tabMatRef.current) tabMatRef.current.opacity = Math.min(op * 0.8, 1);
    if (accentRef.current) accentRef.current.opacity = Math.min(op * 1.1, 1);
    if (glowRef.current) glowRef.current.opacity = op * 0.045;
    edgeMatsRef.current.forEach(m => { if (m) m.opacity = op * 0.55; });
  });

  const setEdgeRef = (idx) => (ref) => { edgeMatsRef.current[idx] = ref; };

  return (
    <group ref={groupRef}>
      {/* ── Folder Body ─────────────────────────────── */}
      <RoundedBox args={[5.4, 3.5, 0.12]} radius={0.2} smoothness={4}>
        <meshPhysicalMaterial
          ref={bodyMatRef}
          color={bodyColor}
          emissive={edgeColor}
          emissiveIntensity={0.12}
          transparent
          opacity={0.85}
          roughness={0.05}
          metalness={0.45}
          clearcoat={1}
          clearcoatRoughness={0.02}
          side={THREE.DoubleSide}
        />
      </RoundedBox>

      {/* ── Folder Tab ──────────────────────────────── */}
      <RoundedBox
        args={[2.3, 0.5, 0.12]}
        radius={0.14}
        smoothness={4}
        position={[-1.55, 2, 0]}
      >
        <meshPhysicalMaterial
          ref={tabMatRef}
          color={edgeColor}
          emissive={edgeColor}
          emissiveIntensity={0.15}
          transparent
          opacity={0.65}
          roughness={0.08}
          metalness={0.55}
          clearcoat={1}
          clearcoatRoughness={0.04}
        />
      </RoundedBox>

      {/* ── Top border accent ───────────────────────── */}
      <mesh position={[0, 1.75, 0.07]}>
        <planeGeometry args={[5.4, 0.04]} />
        <meshBasicMaterial
          ref={accentRef}
          color={edgeColor}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* ── Decorative content lines (text placeholders) */}
      {[0.8, 0.35, -0.1, -0.55, -1.0].map((y, i) => (
        <mesh key={i} position={[-0.3, y, 0.065]}>
          <planeGeometry args={[3.4 - i * 0.4, 0.025]} />
          <meshBasicMaterial color="#1a2845" transparent opacity={0.22} />
        </mesh>
      ))}

      {/* ── Small icon placeholder circle ───────────── */}
      <mesh position={[-2, 1.1, 0.07]}>
        <circleGeometry args={[0.22, 24]} />
        <meshBasicMaterial color={edgeColor} transparent opacity={0.15} />
      </mesh>

      {/* ── Inner glow plane ────────────────────────── */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[5, 3.1]} />
        <meshBasicMaterial
          ref={glowRef}
          color={edgeColor}
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* ── Edge highlights (wireframe-like) ────────── */}
      {/* Top edge */}
      <mesh position={[0, 1.75, 0]}>
        <boxGeometry args={[5.4, 0.01, 0.13]} />
        <meshBasicMaterial ref={setEdgeRef(0)} color={edgeColor} transparent opacity={0.55} />
      </mesh>
      {/* Bottom edge */}
      <mesh position={[0, -1.75, 0]}>
        <boxGeometry args={[5.4, 0.01, 0.13]} />
        <meshBasicMaterial ref={setEdgeRef(1)} color={edgeColor} transparent opacity={0.2} />
      </mesh>
      {/* Left edge */}
      <mesh position={[-2.7, 0, 0]}>
        <boxGeometry args={[0.01, 3.5, 0.13]} />
        <meshBasicMaterial ref={setEdgeRef(2)} color={edgeColor} transparent opacity={0.2} />
      </mesh>
      {/* Right edge */}
      <mesh position={[2.7, 0, 0]}>
        <boxGeometry args={[0.01, 3.5, 0.13]} />
        <meshBasicMaterial ref={setEdgeRef(3)} color={edgeColor} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

/* ─── Scene with lights and folders ─────────────────────────────── */
function Scene({ scrollRef, projects }) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 11;
  const slots = isMobile ? SLOTS_MOBILE : SLOTS_DESKTOP;

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[7, 5, 8]} intensity={0.9} color="#38BDF8" />
      <directionalLight position={[-7, -4, 5]} intensity={0.4} color="#6166F5" />
      <pointLight position={[0, 0, 8]} intensity={0.6} color="#ffffff" distance={22} />
      <pointLight position={[-5, 3, 2]} intensity={0.3} color="#38BDF8" distance={15} />
      <pointLight position={[5, -2, 2]} intensity={0.2} color="#6166F5" distance={15} />

      {projects.map((project, i) => (
        <Folder3D
          key={project.id}
          color={project.color}
          cardIndex={i}
          scrollRef={scrollRef}
          slots={slots}
        />
      ))}
    </>
  );
}

/* ─── Exported Canvas component ─────────────────────────────────── */
export default function FolderScene3D({ scrollRef, projects }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 5,
      }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <Scene scrollRef={scrollRef} projects={projects} />
    </Canvas>
  );
}
