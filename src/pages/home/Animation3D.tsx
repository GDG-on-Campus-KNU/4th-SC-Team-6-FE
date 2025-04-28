import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { loadCharacter } from './utils/loadCharacter';
import { loadFont } from './utils/loadFont';
import { loadParticles } from './utils/loadParticles';
import { loadLight } from './utils/loadLight';
import { getSize } from './utils/getSize';

export default function Animation3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);

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
      camera.position.set(0, 0, 15);

      /** 요소 불러오기*/
      await loadFont(scene);
      const mixer = await loadCharacter(scene, camera);
      loadLight(scene);

      const particleGroups: THREE.Points[] = [];
      for (let i = 0; i < 6; i++) {
        const points = loadParticles(scene);
        points.position.set(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 5
        );
        particleGroups.push(points);
      }

      // 사용자의 타이밍 피드백
      function giveFeedback() {
        particleGroups.forEach((points) => {
          gsap.to(points.scale, {
            x: 2.5,
            y: 2.5,
            z: 2.5,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
          });
        });
      }

      const clock = new THREE.Clock();
      let elapsedTime = 0;
      let previousFeedbackTime = 0;
      // 초기 BPM 설정 (예: 40), 값 변경할 경우 let
      const bpm = 50;
      const feedbackInterval = 40 / bpm;

      function animate() {
        const delta = clock.getDelta();
        elapsedTime += delta;

        // BPM에 따라 피드백 간격 다르게 실행
        if (elapsedTime - previousFeedbackTime >= feedbackInterval) {
          giveFeedback();
          previousFeedbackTime = elapsedTime;
        }

        mixer.update(delta);
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
      animate();

      // resize
      function handleResize(): void {
        const resize = getSize(container);
        renderer.setSize(resize.width, resize.height);
        camera.aspect = resize.width / resize.height;
        // perspective camera update(카메라의 속성 변경 후 호출해줘야 결과 반영)
        camera.updateProjectionMatrix();
      }
      window.addEventListener('resize', handleResize);

      // Cleanup (컴포넌트 언마운트 시)
      return () => {
        window.removeEventListener('resize', handleResize);
        container.removeChild(renderer.domElement);
        renderer.dispose();
      };
    };
    void run();
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div
        ref={mountRef}
        className="z-10 h-3/5 w-4/5 overflow-hidden rounded-2xl"
      ></div>
    </div>
  );
}
