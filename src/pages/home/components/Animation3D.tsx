import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { loadCharacter } from '../utils/loadCharacter';
import { loadFont } from '../utils/loadFont';
import { loadParticles } from '../utils/loadParticles';
import { loadLight } from '../utils/loadLight';
import { getSize } from '../utils/getSize';
import RecordButton from '../../../components/RecordButton';
import WearableButton from '../../../components/WearableButton';
import Metronome from './Metronome';
import ProgressBar from './ProgressBar';

export default function Animation3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const particleGroupsRef = useRef<THREE.Points[]>([]);
  const [ready, setReady] = useState(false);
  const loadingManager = new THREE.LoadingManager();

  useEffect(() => {
    const run = async () => {
      const container = mountRef.current;

      if (!container) return;
      const size = getSize(container);

      // Scene, Camera, Renderer 생성
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(size.width, size.height);
      container.appendChild(renderer.domElement);

      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        size.width / size.height,
        1,
        500
      );
      camera.position.set(0, 0, 17);

      /** 요소 불러오기*/
      await loadFont(scene);
      const mixer = await loadCharacter(scene, camera, loadingManager);
      loadLight(scene);

      const particleGroups: THREE.Points[] = [];
      for (let i = 0; i < 6; i++) {
        const points = loadParticles(scene);
        points.position.set(
          (Math.random() - 0.5) * 23,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 12
        );
        particleGroups.push(points);
      }
      particleGroupsRef.current = particleGroups;
      setReady(true);

      const clock = new THREE.Clock();

      function animate() {
        const delta = clock.getDelta();

        mixer.update(delta);
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
      animate();

      function handleResize(): void {
        const resize = getSize(container);
        renderer.setSize(resize.width, resize.height);
        camera.aspect = resize.width / resize.height;
        camera.updateProjectionMatrix();
      }
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        container.removeChild(renderer.domElement);
        renderer.dispose();
      };
    };
    void run();
  }, []);

  return (
    <>
      <div
        ref={mountRef}
        className="relative z-10 h-5/7 w-4/5 overflow-hidden rounded-2xl"
      >
        <ProgressBar loadingManager={loadingManager} />
      </div>
      <div className="flex items-center justify-center gap-6 pt-2">
        <RecordButton />
        <WearableButton />
        {ready && <Metronome particleGroups={particleGroupsRef.current} />}
      </div>
    </>
  );
}
