import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
// import getFont from '../../assets/fonts/fontText.json';
import particleTexture from '../../assets/textures/particle.png';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { loadFont } from './utils/loadFont';

export default function Animation3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const run = async () => {
      const container = mountRef.current;
      if (!container) return;

      // 컨테이너 사이즈 가져오기
      function getSize(): { width: number; height: number } {
        const width = container?.clientWidth ?? window.innerWidth;
        const height = container?.clientHeight ?? window.innerHeight;
        return { width, height };
      }
      const size = getSize();

      // Scene, Camera, Renderer 생성
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(size.width, size.height);
      container.appendChild(renderer.domElement); // DOM에 추가

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        size.width / size.height,
        1,
        500
      );
      camera.position.set(0, 0, 15); // 카메라 위치 설정

      // OrbitControls
      // const controls = new OrbitControls(camera, renderer.domElement);
      // controls.autoRotate = true;
      // controls.enableDamping = true;

      /** font 설정 */

      // await loadFont(scene);

      /** 캐틱터 모델 가져오기 */
      const loadingManager = new THREE.LoadingManager();

      //   GLTFLoader의 로딩 상태를 loadingManager로 관리할 수 있음
      const gltfLoader = new GLTFLoader(loadingManager);
      const gltf = await gltfLoader.loadAsync('/public/models/character.gltf');
      const model = gltf.scene;
      model.scale.set(0.1, 0.1, 0.1);
      // 모델의 그림자를 설정 할 수 있도록
      model.traverse((object) => {
        /** Three.js의 Object3D는 기본적으로 isMesh 같은 속성을 가지고 있지 않다고 타입 시스템이 인식
                    하지만 실제로 런타임에서는 child가 Mesh 타입이면 isMesh === true
                    -> child가 Mesh인지 안전하게 타입 체크: instanceof THREE.Mesh를 사용
                 */
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true; // 필요에 따라
        }
      });
      scene.add(model);
      camera.lookAt(model.position); // 모델의 위치를 바라보도록

      const mixer = new THREE.AnimationMixer(model);
      let currentAction;
      const hasAnimation = gltf.animations.length !== 0;
      if (hasAnimation) {
        // clip으로부터 에니메이션을 제어 할 수 있는 action 객체를 얻을 수 있음
        currentAction = mixer.clipAction(gltf.animations[6]);
        currentAction.play(); // animation 재생 시작
      }

      /** particles 설정 */
      const particlesGeometry = new THREE.BufferGeometry();

      const count = 10000;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        // -0.5 - 0.5 사이 값 반환 randFloatSpread
        positions[i * 3] = THREE.MathUtils.randFloatSpread(1);
        positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(1);
        positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(1);

        colors[i * 3] = Math.random();
        colors[i * 3 + 1] = Math.random();
        colors[i * 3 + 2] = Math.random();
      }

      particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
      particlesGeometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colors, 3)
      );
      const particlesMaterial = new THREE.PointsMaterial({
        color: 0xccaaff,
        size: 2, // point size
        sizeAttenuation: false, // 원근법 무시
        vertexColors: true, // 정점의 색을 사용하겠다는 설정
      });
      // 파티클에 사용 될 텍스쳐 로드
      const TextureLoader = new THREE.TextureLoader();
      const texture = TextureLoader.load(particleTexture);
      particlesMaterial.alphaMap = texture; // map -> alphaMap으로 변경
      particlesMaterial.transparent = true;
      particlesMaterial.depthWrite = false; // depth buffer에서 depth 정보 비활성화

      const points = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(points);

      // light 추가
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // ------------------ for pulse
      // 예시: 사용자가 타이밍에 맞춰 입력했다고 가정하고 피드백 제공
      // 나중에 음의 정확도 인식하는 기능으로 개발 예정정
      // setInterval(() => {
      //   giveFeedback(true);
      // }, 1000); // 1초마다 (BPM 60 기준)

      // 사용자의 타이밍 피드백
      function giveFeedback() {
        gsap.to(points.scale, {
          x: 2,
          y: 2,
          z: 2,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        });
      }

      const clock = new THREE.Clock();
      let previousFeedbackTime = 0;

      // 초기 BPM 설정 (예: 60)
      // 값 변경할 경우 let
      const bpm = 50;
      const feedbackInterval = 60 / bpm;

      // BPM 변경 함수
      // function setBPM(newBPM) {
      //   bpm = newBPM;
      //   feedbackInterval = 60 / bpm;
      // }

      // 애니메이션 루프
      function animate() {
        const elapsedTime = clock.getElapsedTime();

        // BPM에 따라 피드백 간격 다르게 실행
        if (elapsedTime - previousFeedbackTime >= feedbackInterval) {
          giveFeedback();
          previousFeedbackTime = elapsedTime;
        }

        // elapsed time since the clock was started in seconds
        points.rotation.x = elapsedTime;
        points.rotation.y = elapsedTime;

        // OrbitControls: autoRotate 사용시시 호출해줘야 결과 반영
        // controls.update();
        const delta = clock.getDelta();
        mixer.update(delta); // 매 프레임 마다 mixer 업데이트

        renderer.render(scene, camera);

        requestAnimationFrame(animate);
      }
      animate();

      // resize
      function handleResize(): void {
        const resize = getSize();

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
        // controls.dispose();
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
