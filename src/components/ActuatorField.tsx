import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { readHeroProgress } from '../hooks/scrollStore'
import { prefersReducedMotion } from '../hooks/useSite'

/**
 * The signature: a field of actuators. Every rod reads the same travelling wave
 * and pushes itself up — the same read-decide-actuate loop the rest of the site
 * is about. The cursor is a local disturbance the field absorbs and forgets.
 */

const VERT = /* glsl */ `
  attribute vec3 aOffset;
  attribute float aRand;

  uniform float uTime;
  uniform float uIntro;
  uniform vec2  uPointer;
  uniform float uPointerAmp;

  varying float vH;
  varying vec3  vNrm;
  varying vec3  vWorld;

  float field(vec2 p, float t) {
    float d = length(p);
    float w = sin(d * 0.80 - t * 1.00);
    w += 0.62 * sin(p.x * 0.30 + t * 0.52);
    w += 0.52 * sin(p.y * 0.36 - t * 0.66);
    w += 0.34 * sin((p.x + p.y) * 0.21 + t * 0.30);
    return w * 0.42;
  }

  void main() {
    vec2 p = aOffset.xz;
    float h = 0.55 + 1.05 * field(p, uTime);

    float pd = distance(p, uPointer);
    h += uPointerAmp * 2.30 * exp(-pd * pd / 7.0);

    // settle toward the edges so the field reads as a plate, not a wall
    h *= 1.0 - smoothstep(6.5, 13.0, length(p)) * 0.80;

    float delay = length(p) * 0.030 + aRand * 0.10;
    h = max(h, 0.05) * smoothstep(delay, delay + 0.50, uIntro);

    vH = h;
    vNrm = normalize(normalMatrix * normal);

    vec3 world = vec3(position.x, position.y * h, position.z) + aOffset;
    vWorld = world;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(world, 1.0);
  }
`

const FRAG = /* glsl */ `
  uniform vec3  uLow;
  uniform vec3  uHigh;
  uniform vec3  uPeak;
  uniform vec3  uFog;
  uniform float uFogNear;
  uniform float uFogFar;

  varying float vH;
  varying vec3  vNrm;
  varying vec3  vWorld;

  void main() {
    vec3 L = normalize(vec3(0.30, 0.92, 0.42));
    float lam = 0.30 + 0.70 * max(dot(normalize(vNrm), L), 0.0);

    vec3 col = mix(uLow, uHigh, smoothstep(0.30, 1.75, vH));
    col = mix(col, uPeak, smoothstep(1.60, 2.80, vH));
    col *= lam;
    col += uHigh * 0.28 * smoothstep(1.95, 3.10, vH);

    float fog = smoothstep(uFogNear, uFogFar, length(vWorld - cameraPosition));
    col = mix(col, uFog, fog);

    gl_FragColor = vec4(col, 1.0);
  }
`

function Field() {
  const { size, camera, setDpr } = useThree()
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const reduced = useMemo(prefersReducedMotion, [])

  const dense = size.width > 900
  const cols = dense ? 58 : 34
  const spacing = dense ? 0.40 : 0.62

  const { geometry, offsets, rands, count } = useMemo(() => {
    const g = new THREE.BoxGeometry(0.145, 1, 0.145)
    g.translate(0, 0.5, 0)

    const n = cols * cols
    const off = new Float32Array(n * 3)
    const rnd = new Float32Array(n)
    const half = ((cols - 1) * spacing) / 2

    let i = 0
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < cols; z++) {
        off[i * 3] = x * spacing - half
        off[i * 3 + 1] = 0
        off[i * 3 + 2] = z * spacing - half
        // deterministic jitter — no Math.random, so every load looks the same
        rnd[i] = ((Math.sin(x * 12.9898 + z * 78.233) * 43758.5453) % 1 + 1) % 1
        i++
      }
    }
    return { geometry: g, offsets: off, rands: rnd, count: n }
  }, [cols, spacing])

  useEffect(() => () => geometry.dispose(), [geometry])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, -40) },
      uPointerAmp: { value: 0 },
      uLow: { value: new THREE.Color('#0f2033') },
      uHigh: { value: new THREE.Color('#f2a03c') },
      uPeak: { value: new THREE.Color('#6fe3c4') },
      uFog: { value: new THREE.Color('#06090f') },
      uFogNear: { value: 10 },
      uFogFar: { value: 25 },
    }),
    [],
  )

  // pointer tracked on the window, because the canvas itself is pointer-transparent
  const ndc = useRef(new THREE.Vector2(0, -3))
  const hasPointer = useRef(false)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      // touch drags are scrolling, not pointing — leave the field alone
      if (e.pointerType === 'touch') return
      ndc.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      )
      hasPointer.current = true
    }
    const onLeave = () => {
      hasPointer.current = false
    }
    // pointerleave never fires on window itself; the root element does get it
    const root = document.documentElement
    window.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), [])
  const hit = useMemo(() => new THREE.Vector3(), [])
  const hit2 = useMemo(() => new THREE.Vector2(), [])
  const target = useMemo(() => new THREE.Vector3(0, 1.1, -1), [])

  // Adaptive resolution: sample frame time for ~2s after the intro; if the GPU
  // can't hold ~45fps at high DPR, drop to 1x. Checked once, never flip-flops.
  const perf = useRef({ t: 0, n: 0, decided: false })

  useFrame((state, delta) => {
    const u = matRef.current?.uniforms
    if (!u) return
    const d = Math.min(delta, 0.05)

    const pf = perf.current
    if (!pf.decided && state.clock.elapsedTime > 1.5) {
      pf.t += delta
      pf.n++
      if (pf.t > 2) {
        pf.decided = true
        if (pf.t / pf.n > 1 / 45) setDpr(1)
      }
    }

    u.uTime.value = reduced ? 6.2 : state.clock.elapsedTime
    u.uIntro.value = Math.min(u.uIntro.value + d * 0.62, 1.6)

    if (hasPointer.current && !reduced) {
      raycaster.setFromCamera(ndc.current, camera)
      if (raycaster.ray.intersectPlane(plane, hit)) {
        u.uPointer.value.lerp(hit2.set(hit.x, hit.z), 1 - Math.pow(0.002, d))
      }
      u.uPointerAmp.value += (1 - u.uPointerAmp.value) * (1 - Math.pow(0.01, d))
    } else {
      u.uPointerAmp.value += (0 - u.uPointerAmp.value) * (1 - Math.pow(0.05, d))
    }

    // the camera lifts and levels off as the hero scrolls away
    const p = readHeroProgress()
    const drift = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.11) * 0.5
    // a portrait viewport crops the horizontal field of view, so back the camera off
    const aspect = size.width / Math.max(size.height, 1)
    const pull = aspect < 1 ? 1.34 : aspect < 1.4 ? 1.14 : 1
    camera.position.set(drift, (7.4 + p * 5.4) * pull, (14.4 - p * 2.0) * pull)
    target.set(0, 0.4 - p * 2.4, -3.0)
    camera.lookAt(target)
  })

  return (
    <instancedMesh args={[geometry, undefined, count]} frustumCulled={false}>
      <instancedBufferAttribute attach="geometry-attributes-aOffset" args={[offsets, 3]} />
      <instancedBufferAttribute attach="geometry-attributes-aRand" args={[rands, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
      />
    </instancedMesh>
  )
}

export default function ActuatorField({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ fov: 42, near: 0.1, far: 60, position: [0, 8.2, 15.0] }}
      >
        <color attach="background" args={['#06090f']} />
        <Field />
        <EffectComposer enableNormalPass={false}>
          <Bloom intensity={0.72} luminanceThreshold={0.42} luminanceSmoothing={0.25} mipmapBlur />
          <Vignette offset={0.28} darkness={0.72} />
        </EffectComposer>
      </Canvas>

      {/* scrim: the field is atmosphere, the type has to stay readable over it */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,9,15,0.90) 0%, rgba(6,9,15,0.34) 22%, rgba(6,9,15,0.00) 46%)',
        }}
      />
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(6,9,15,0.72) 0%, rgba(6,9,15,0.14) 42%, transparent 66%), linear-gradient(0deg, rgba(6,9,15,0.60) 0%, rgba(6,9,15,0.20) 14%, transparent 34%)',
        }}
      />
    </div>
  )
}
