import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// import getFont from '../../assets/fonts/fontText.json';
import particleTexture from '../../assets/textures/particle.png';
export default function Animation3D() {
  function getSize() {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    return { width, height };
  }

  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const size = getSize();

    // Scene, Camera, Renderer 생성
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(size.width, size.height);
    container.appendChild(renderer.domElement); // DOM에 추가

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      size.width / size.height,
      0.1,
      1000
    );
    camera.position.z = (0, 1, 5); // 카메라 위치 설정

    // OrbitControls
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.autoRotate = true;
    // controls.enableDamping = true;

    /** font */
    const fontLoader = new FontLoader();

    const loadFont = async () => {
      try {
        // 브라우저 기준으로 접근할 수 있는 절대 경로(/)여야
        const font = await fontLoader.loadAsync('/assets/fonts/fontText.json');

        const textGeometry = new TextGeometry('Feel Your Melody', {
          // fontLoader와 비슷하게 개별경로에서 import
          font,
          size: 0.3,
          height: 0.1,
          bevelEnabled: true,
          bevelSegments: 5,
          bevelSize: 0.02,
          bevelThickness: 0.02,
        });
        const textMaterial = new THREE.MeshPhongMaterial();
        const text = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(text);
        text.scale.set(1, 1, 0.005);

        text.castShadow = true;
        console.log('font loaded');

        textGeometry.computeBoundingBox(); // text size and position update

        // 가운데 정렬(단순히 가운데 정렬만을 목적으로 하면 textGeometry.center() 사용)
        textGeometry.translate(
          -(textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) *
            0.5,
          -(textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y) *
            -4,
          -(textGeometry.boundingBox.max.z - textGeometry.boundingBox.min.z) *
            0.5
        );
      } catch (error) {
        console.error('폰트 로딩 실패:', error);
      }
    };
    loadFont();

    // particles 추가
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
    function giveFeedback(isCorrect) {
      if (isCorrect) {
        gsap.to(points.scale, {
          x: 2,
          y: 2,
          z: 2,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        });
      }
    }

    const clock = new THREE.Clock();
    let previousFeedbackTime = 0;

    // 초기 BPM 설정 (예: 60)
    let bpm = 50;
    let feedbackInterval = 60 / bpm;

    // BPM 변경 함수
    function setBPM(newBPM) {
      bpm = newBPM;
      feedbackInterval = 60 / bpm;
    }

    // 애니메이션 루프
    function animate() {
      const elapsedTime = clock.getElapsedTime();

      // BPM에 따라 피드백 간격 다르게 실행
      if (elapsedTime - previousFeedbackTime >= feedbackInterval) {
        giveFeedback(true);
        previousFeedbackTime = elapsedTime;
      }

      // elapsed time since the clock was started in seconds
      points.rotation.x = elapsedTime;
      points.rotation.y = elapsedTime;

      // OrbitControls: autoRotate 사용시시 호출해줘야 결과 반영
      // controls.update();
      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    }
    animate();

    // resize
    function handleResize() {
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
