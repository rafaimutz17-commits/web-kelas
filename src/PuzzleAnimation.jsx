import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, RoundedBox, Html } from '@react-three/drei'
import * as THREE from 'three'

// 3D Architectural Puzzle Piece
function ArchitecturalBlock({ initialPos, explodedPos, isExploded, color, label, isGlass, index, onHover }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Smooth spring interpolation between assembled and exploded positions
  useFrame((state, delta) => {
    if (!meshRef.current) return
    const target = isExploded ? explodedPos : initialPos
    meshRef.current.position.lerp(new THREE.Vector3(...target), delta * 4)

    // Subtle breathing rotation
    const t = state.clock.elapsedTime + index * 0.4
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      isExploded ? Math.sin(t * 0.5) * 0.4 : 0,
      delta * 3
    )
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      isExploded ? Math.cos(t * 0.4) * 0.4 : 0,
      delta * 3
    )

    if (hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), delta * 8)
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 8)
    }
  })

  return (
    <group
      ref={meshRef}
      position={initialPos}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        if (onHover) onHover(label)
      }}
      onPointerOut={() => {
        setHovered(false)
        if (onHover) onHover(null)
      }}
    >
      <RoundedBox args={[0.9, 0.9, 0.9]} radius={0.12} smoothness={4} castShadow receiveShadow>
        {isGlass ? (
          <meshPhysicalMaterial
            color="#FAFAFA"
            transmission={0.88}
            opacity={1}
            transparent
            roughness={0.1}
            ior={1.45}
            thickness={1.2}
            specularIntensity={1}
            specularColor="#b58b4c"
          />
        ) : (
          <meshStandardMaterial
            color={color}
            roughness={0.2}
            metalness={color === '#8D2927' || color === '#6F2423' ? 0.6 : 0.15}
            emissive={hovered ? color : '#000000'}
            emissiveIntensity={hovered ? 0.3 : 0}
          />
        )}
      </RoundedBox>

      {/* Wireframe CAD edge outline for architectural feel */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.92, 0.92, 0.92)]} />
        <lineBasicMaterial color={hovered ? "#b58b4c" : "#9a8262"} transparent opacity={hovered ? 0.9 : 0.35} />
      </lineSegments>
    </group>
  )
}

// Center Hologram Blueprint Core
function BlueprintCore({ isExploded }) {
  const coreRef = useRef()
  const ringRef = useRef()

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5
      coreRef.current.rotation.x += delta * 0.3
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.6
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3
    }
  })

  return (
    <group scale={isExploded ? 1.3 : 0.75}>
      {/* CAD Wireframe Sphere */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.55, 2]} />
        <meshStandardMaterial
          color="#b58b4c"
          wireframe
          emissive="#872c2b"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Rotating Measurement Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.85, 0.02, 16, 64]} />
        <meshStandardMaterial color="#b58b4c" emissive="#872c2b" emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}

// Ground shadow plane in neumorphic style
function GroundPlane() {
  return (
    <mesh position={[0, -2.4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <shadowMaterial opacity={0.12} />
    </mesh>
  )
}

// Main 3D Canvas Scene
export default function PuzzleAnimation3D({ isExploded: externalExploded, onToggleExplode }) {
  const [internalExploded, setInternalExploded] = useState(false)
  const [activeLabel, setActiveLabel] = useState(null)

  const isExploded = externalExploded !== undefined ? externalExploded : internalExploded
  const toggleExplode = onToggleExplode || (() => setInternalExploded(!internalExploded))

  // 3x3 Architectural Module Blocks
  const blocks = useMemo(() => [
    { initialPos: [-0.98,  0.98, 0], explodedPos: [-2.2,  2.2,  1.5], color: '#FAFAFA', label: 'BIM 3D Model', isGlass: true },
    { initialPos: [ 0.0,   0.98, 0], explodedPos: [ 0.0,   2.5, -1.2], color: '#8D2927', label: 'AutoCAD Drafting', isGlass: false },
    { initialPos: [ 0.98,  0.98, 0], explodedPos: [ 2.2,  2.2,  1.5], color: '#E9EEF2', label: 'Struktur Beton', isGlass: false },
    { initialPos: [-0.98,  0.0,  0], explodedPos: [-2.5,  0.0, -1.5], color: '#B58B4C', label: 'RAB & Estimasi', isGlass: false },
    // Center is the BlueprintCore
    { initialPos: [ 0.98,  0.0,  0], explodedPos: [ 2.5,  0.0, -1.5], color: '#8D2927', label: 'Desain Arsitektur', isGlass: false },
    { initialPos: [-0.98, -0.98, 0], explodedPos: [-2.2, -2.2,  1.5], color: '#E9EEF2', label: 'Lanskap & Interior', isGlass: false },
    { initialPos: [ 0.0,  -0.98, 0], explodedPos: [ 0.0,  -2.5, -1.2], color: '#FAFAFA', label: 'Utilitas MEP', isGlass: true },
    { initialPos: [ 0.98, -0.98, 0], explodedPos: [ 2.2, -2.2,  1.5], color: '#6F2423', label: 'Lumion Visualizer', isGlass: false },
  ], [])

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-3xl overflow-hidden neu-flat p-2 border border-white/60">
      {/* UI Overlay Controls */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <span className="cad-tag">3D CAD PUZZLE XII DPIB 2</span>
        {activeLabel && (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/90 shadow-sm border border-sky-200 text-slate-800 animate-fadeIn">
            🎯 {activeLabel}
          </span>
        )}
      </div>

      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3">
        <button
          onClick={toggleExplode}
          className="neu-button px-4 py-2 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 border border-white/80 active:scale-95"
        >
          <span>{isExploded ? '🧩 Satukan Puzzle' : '💥 Pecah Puzzle (Explode)'}</span>
        </button>
      </div>

      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
        <p className="text-[11px] font-mono text-slate-400">
          ● Drag mouse untuk putar 3D | Hover kubus untuk info modul
        </p>
      </div>

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [3.5, 2.5, 4.5], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[6, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />
        <pointLight position={[-6, 4, -4]} intensity={0.9} color="#7D9BB9" />
        <pointLight position={[4, -3, 3]} intensity={0.6} color="#4589C6" />

        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
          <group position={[0, 0, 0]}>
            {blocks.map((block, idx) => (
              <ArchitecturalBlock
                key={idx}
                index={idx}
                initialPos={block.initialPos}
                explodedPos={block.explodedPos}
                isExploded={isExploded}
                color={block.color}
                label={block.label}
                isGlass={block.isGlass}
                onHover={setActiveLabel}
              />
            ))}
            <BlueprintCore isExploded={isExploded} />
          </group>
        </Float>

        <GroundPlane />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!isExploded}
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}
