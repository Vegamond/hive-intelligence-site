"use client";

import { useEffect, useRef } from "react";
import { LOGO_CONTENT, LOGO_RING } from "@/lib/logo";

// Логотип, видавлений у 3D з металевого золота. Завантажується ліниво; поки його немає — видно плаский SVG.
export function Emblem3D({ onReady }: { onReady?: () => void }) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { SVGLoader } = await import("three/examples/jsm/loaders/SVGLoader.js");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed) return;

      const canvasTest = document.createElement("canvas");
      if (!(canvasTest.getContext("webgl2") || canvasTest.getContext("webgl"))) return;

      const fine = window.matchMedia("(pointer: fine)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, fine ? 2 : 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      el.appendChild(renderer.domElement);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      const camera = new THREE.PerspectiveCamera(30, 1, 1, 5000);
      camera.position.set(0, 0, 900);

      // геометрія з векторного логотипа
      const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="${LOGO_RING} ${LOGO_CONTENT}"/></svg>`;
      const data = new SVGLoader().parse(svg);
      const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p));
      const geo = new THREE.ExtrudeGeometry(shapes, {
        depth: 34,
        bevelEnabled: true,
        bevelThickness: 7,
        bevelSize: 2.6,
        bevelSegments: 4,
        curveSegments: 10,
      });
      geo.center();
      geo.scale(1, -1, 1); // SVG має вісь Y донизу
      geo.computeVertexNormals();

      const gold = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#d9a94a"),
        metalness: 1,
        roughness: 0.26,
        clearcoat: 0.35,
        clearcoatRoughness: 0.3,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, gold);
      const group = new THREE.Group();
      group.add(mesh);
      scene.add(group);

      const key = new THREE.DirectionalLight("#ffd9a0", 2.2);
      key.position.set(-300, 400, 500);
      scene.add(key);
      const rim = new THREE.DirectionalLight("#ffb347", 1.6);
      rim.position.set(400, -200, -300);
      scene.add(rim);
      scene.add(new THREE.AmbientLight("#3a2a10", 0.6));

      const resize = () => {
        const w = el.clientWidth, h = el.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // підбираємо відстань, щоб емблема збігалася за розміром з пласким логотипом
        const target = 389 / 0.54;
        camera.position.z = target / 2 / Math.tan((camera.fov * Math.PI) / 360);
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      let tx = 0, ty = 0, raf = 0, visible = true, t = 0;
      const onMove = (e: PointerEvent) => {
        tx = (e.clientX / window.innerWidth - 0.5) * 2;
        ty = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      if (fine) window.addEventListener("pointermove", onMove, { passive: true });
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(el);

      let last = performance.now();
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (!visible) return;
        const now = performance.now();
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        t += dt;
        const idleY = reduce ? 0.35 : Math.sin(t * 0.6) * 0.45;
        const idleX = reduce ? -0.08 : Math.sin(t * 0.43) * 0.08;
        const targetY = idleY + tx * 0.5;
        const targetX = idleX + ty * 0.3;
        group.rotation.y += (targetY - group.rotation.y) * 0.06;
        group.rotation.x += (targetX - group.rotation.x) * 0.06;
        group.position.y = reduce ? 0 : Math.sin(t * 1.1) * 6;
        // відблиск «пробігає» по металу
        key.position.x = Math.sin(t * 0.5) * 500;
        renderer.render(scene, camera);
      };
      if (reduce) {
        group.rotation.set(-0.08, 0.35, 0);
        renderer.render(scene, camera);
      } else {
        loop();
      }
      onReady?.();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        geo.dispose();
        gold.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [onReady]);

  return <div ref={mount} aria-hidden="true" className="absolute inset-0" />;
}
