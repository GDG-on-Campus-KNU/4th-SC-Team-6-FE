import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
export default function Animation3D() {
  function initCube() {
    const cubeGeometry = new THREE.IcosahedronGeometry(1); // 높이, 깊이, 너비
    const cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff, // color: '0xcc99ff' or 'coral' or new THREE.Color(0xcc99ff)
      emissive: '#81D8CF', // emissive color
    });
    return new THREE.Mesh(cubeGeometry, cubeMaterial);
  }

  function initSkeleton() {
    const skeletonGeometry = new THREE.IcosahedronGeometry(2);
    const skeletonMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      color: 0xaaaaaa,
    });
    return new THREE.Mesh(skeletonGeometry, skeletonMaterial);
  }

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
    const backgroundColor = { r: 0, g: 0, b: 0 };

    // Scene, Camera, Renderer 생성
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(size.width, size.height);
    mountRef.current.appendChild(renderer.domElement); // DOM에 추가

    // 배경 클리어(초기화)
    renderer.setClearColor(
      new THREE.Color(backgroundColor.r, backgroundColor.g, backgroundColor.b)
    );

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      size.width / size.height,
      0.1,
      1000
    );
    camera.position.z = 5; // 카메라 위치 설정

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.enableDamping = true;

    // cube, skeleton 추가
    const cube = initCube();
    const skeleton = initSkeleton();
    scene.add(cube, skeleton);

    // light 추가
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // color, intensity(강도)
    scene.add(directionalLight);

    // ------------------ for pelse

    // 메트로놈 효과과
    setInterval(() => {
      pulseBackground();
    }, 1000); // 1초마다 (BPM 60 기준)

    // 배경색 반짝이게 하기
    function pulseBackground() {
      gsap.to(backgroundColor, {
        r: 0.1,
        g: 0.6,
        b: 0.7,
        duration: 0.2,
        onUpdate: updateBackgroundColor,
        onComplete: () => {
          gsap.to(backgroundColor, {
            r: 0,
            g: 0,
            b: 0,
            duration: 0.4,
            onUpdate: updateBackgroundColor,
          });
        },
      });
    }

    // 배경색 업데이트
    function updateBackgroundColor() {
      const color = new THREE.Color(
        backgroundColor.r,
        backgroundColor.g,
        backgroundColor.b
      );
      renderer.setClearColor(color);
    }

    // 예시: 사용자가 타이밍에 맞춰 입력했다고 가정하고 피드백 제공
    // 나중에 음의 정확도 인식하는 기능으로 개발 예정정
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        giveFeedback(true); // 정확한 타이밍 입력 시
      }
    });

    // 사용자의 타이밍 피드백
    function giveFeedback(isCorrect) {
      if (isCorrect) {
        gsap.to(cube.scale, {
          x: 1.5,
          y: 1.5,
          z: 1.5,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        });
      }
    }
    // for pelse endpoint

    const clock = new THREE.Clock();

    // 애니메이션 루프
    function animate() {
      const elapsedTime = clock.getElapsedTime();

      // elapsed time since the clock was started in seconds
      cube.rotation.x = elapsedTime;
      cube.rotation.y = elapsedTime;

      skeleton.rotation.x = elapsedTime * 1.5;
      skeleton.rotation.y = elapsedTime * 1.5;

      // OrbitControls: autoRotate 사용시시 호출해줘야 결과 반영
      controls.update();
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
      window.removeEventListener('keydown', giveFeedback);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
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
