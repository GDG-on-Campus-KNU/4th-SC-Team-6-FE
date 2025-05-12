import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { loadCharacter } from '../utils/loadCharacter';
import { loadFont } from '../utils/loadFont';
import { loadParticles } from '../utils/loadParticles';
import { loadLight } from '../utils/loadLight';
import { getSize } from '../utils/getSize';
import { getCanvasText } from '../utils/getCanvasText';
import { createNoteBurts, createNoteWave } from '../utils/loadAnimations';
import RecordButton from './RecordButton';
import WearableButton from './WearableButton';
import Metronome from './Metronome';
import ProgressBar from './ProgressBar';
import NoteDetector from './NoteDetector';

export default function Animation3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const particleRef = useRef<THREE.Points | null>(null);
  const [ready, setReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [bpm, setBpm] = useState<number>(50);
  const [isSceneReady, setIsSceneReady] = useState(false);
  const loadingManager = new THREE.LoadingManager();

  const [currentNote, setCurrentNote] = useState<string | null>(null);

  useEffect(() => {
    if (isSceneReady && currentNote && sceneRef.current) {
      requestAnimationFrame(() => {
        void createNoteBurts(sceneRef.current!, currentNote);
        createNoteWave(sceneRef.current!, currentNote);
      });
    }
  }, [currentNote, isSceneReady]);

  useEffect(() => {
    const run = async () => {
      const container = mountRef.current;

      if (!container) return;
      const size = getSize(container);

      // Scene, Camera, Renderer 생성
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!, // 기존 DOM 사용
        antialias: true,
      });
      canvasRef.current = renderer.domElement;
      renderer.setSize(size.width, size.height);
      // container.appendChild(renderer.domElement);

      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const scene = new THREE.Scene();
      sceneRef.current = scene;
      const camera = new THREE.PerspectiveCamera(
        75,
        size.width / size.height,
        1,
        500
      );
      camera.position.set(0, 0, 17);

      /** 요소 불러오기*/
      await loadFont(scene);
      getCanvasText(scene);
      const mixer = await loadCharacter(scene, camera, loadingManager);
      loadLight(scene);
      const points = loadParticles(scene);
      particleRef.current = points;

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
      setIsSceneReady(true);

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
        className="relative h-5/7 w-4/5 overflow-hidden rounded-2xl"
      >
        <ProgressBar loadingManager={loadingManager} />
        <canvas ref={canvasRef} />
      </div>
      <div className="flex items-center justify-center gap-6 pt-2">
        <RecordButton
          isRecording={isRecording}
          onToggle={() => setIsRecording((prev) => !prev)}
          canvasRef={canvasRef}
        />
        <NoteDetector
          isRecording={isRecording}
          onNoteDetected={setCurrentNote}
        />
        <WearableButton bpm={bpm} />
        {ready && (
          <Metronome
            particle={particleRef.current as THREE.Points}
            bpm={bpm}
            onBpmChange={(newBpm) => setBpm(newBpm)}
          />
        )}
      </div>
    </>
  );
}
