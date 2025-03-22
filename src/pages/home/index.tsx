import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Home() {
  function initCube() {
    const cubeGeometry = new THREE.IcosahedronGeometry(1); // 높이, 깊이, 너비
    const cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0x00ffff, // color: '0xcc99ff' or 'coral' or new THREE.Color(0xcc99ff)
      emissive: 0x111111, // emissive color
    });
    return new THREE.Mesh(cubeGeometry, cubeMaterial);
  }

  function initSkeleton() {
    const skeletonGeometry = new THREE.IcosahedronGeometry(2);
    const skeletonMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      transparent: true,
      opacity: 0.2,
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

    // Scene, Camera, Renderer 생성
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(size.width, size.height);
    mountRef.current.appendChild(renderer.domElement); // DOM에 추가

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      size.width / size.height,
      0.1,
      1000
    );
    camera.position.z = 5; // 카메라 위치 설정

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.enableDamping = true;

    // cube, skeleton 추가
    const cube = initCube();
    const skeleton = initSkeleton();
    scene.add(cube, skeleton);

    // light 추가
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // color, intensity(강도)
    scene.add(directionalLight);

    const clock = new THREE.Clock();

    // 애니메이션 루프
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // elapsed time since the clock was started in seconds
      cube.rotation.x = elapsedTime;
      cube.rotation.y = elapsedTime;

      skeleton.rotation.x = elapsedTime * 1.5;
      skeleton.rotation.y = elapsedTime * 1.5;

      // OrbitControls: autoRotate 사용시시 호출해줘야 결과 반영
      renderer.render(scene, camera);
      controls.update();

      requestAnimationFrame(animate);
    };
    animate();

    // resize
    function handleResize() {
      const reSize = getSize();

      renderer.setSize(reSize.width, reSize.height);
      camera.aspect = reSize.width / reSize.height;
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
