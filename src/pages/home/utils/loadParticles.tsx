import * as THREE from 'three';
import particleTexture from '/public/textures/particle.png';

export function loadParticles(scene: THREE.Scene) {
  const particlesGeometry = new THREE.BufferGeometry();

  const count = 2000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2; // t를 균일 분포로
    const r = 1; // 항상 하트 곡선 상에 위치

    const x = 16 * Math.pow(Math.sin(t), 3) * 0.1 * r;
    const y =
      (13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)) *
      0.1 *
      r;
    const z = (Math.random() - 0.5) * 0.5; // 살짝 3D 퍼짐

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random();
    colors[i * 3 + 2] = Math.random();
  }

  particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  );
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0xccaaff,
    size: 3, // point size
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

  return points;
}
