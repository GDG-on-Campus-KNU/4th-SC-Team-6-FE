import * as THREE from 'three';
import { gsap } from 'gsap';
export function createNoteBurts(scene: THREE.Scene, note: string) {
  const colorMap: Record<string, string> = {
    C: '#ff4b4b',
    D: '#ff924b',
    E: '#ffe84b',
    F: '#7bff4b',
    G: '#4bffff',
    A: '#4b7bff',
    B: '#b14bff',
  };

  const color = new THREE.Color(colorMap[note]);

  const geometry = new THREE.SphereGeometry(0.1, 8, 8);
  const material = new THREE.MeshBasicMaterial({ color });
  const particles: THREE.Mesh[] = [];

  for (let i = 0; i < 20; i++) {
    const particle = new THREE.Mesh(geometry, material.clone());
    particle.position.set(0, 0, 0);
    scene.add(particle);
    particles.push(particle);

    const dir = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    );
    gsap.to(particle.position, {
      x: dir.x * 5,
      y: dir.y * 5,
      z: dir.z * 5,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => {
        scene.remove(particle);
        particle.geometry.dispose();
        particle.material.dispose();
      },
    });
  }
}

export function createNoteWave(scene: THREE.Scene, note: string) {
  const radius = 0.5 + 'CDEFGAB'.indexOf(note) * 0.3;
  const geometry = new THREE.RingGeometry(radius, radius + 0.05, 32);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
  });
  const ring = new THREE.Mesh(geometry, material);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = -4;
  scene.add(ring);

  gsap.to(ring.scale, {
    x: 6,
    y: 6,
    duration: 1,
    ease: 'power2.out',
  });
  gsap.to(material, {
    opacity: 0,
    duration: 1,
    delay: 0.5,
    onComplete: () => {
      scene.remove(ring);
      geometry.dispose();
      material.dispose();
    },
  });
}
