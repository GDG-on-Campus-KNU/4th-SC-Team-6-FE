import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { gsap } from 'gsap';

export async function loadFont(scene: THREE.Scene) {
  const fontLoader = new FontLoader();

  try {
    // 브라우저 기준으로 접근할 수 있는 절대 경로(/)여야
    const font = await fontLoader.loadAsync('/fonts/fontText.json');

    const textGeometry = new TextGeometry('Feel Your Melody', {
      // fontLoader와 비슷하게 개별경로에서 import
      font,
      size: 0.5,
      height: 0.01,
      bevelEnabled: true,
      bevelSegments: 5,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    });
    const textMaterial = new THREE.MeshPhongMaterial();
    const text = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(text);
    text.scale.set(2.3, 2.3, 0.03);

    text.castShadow = true;

    textGeometry.computeBoundingBox(); // text size and position update

    // 가운데 정렬(단순히 가운데 정렬만을 목적으로 하면 textGeometry.center() 사용)
    const bbox = textGeometry.boundingBox;
    if (bbox) {
      textGeometry.translate(
        -(bbox.max.x - bbox.min.x) * 0.5,
        -(bbox.max.y - bbox.min.y) * -4,
        -(bbox.max.z - bbox.min.z) * 0.5
      );
    }
  } catch (error) {
    console.error('폰트 로딩 실패:', error);
  }
}

export async function addNoteText(
  scene: THREE.Scene,
  note: string
): Promise<void> {
  const fontLoader = new FontLoader();

  try {
    const existingText = scene.getObjectByName('noteText') as THREE.Mesh;
    if (existingText) {
      scene.remove(existingText);
      existingText.geometry.dispose();
      if (Array.isArray(existingText.material)) {
        existingText.material.forEach((mat: THREE.Material) => {
          mat.dispose();
        });
      } else {
        existingText.material.dispose();
      }
    }

    const font = await fontLoader.loadAsync('/public/fonts/fontText.json');
    const message = `${note}`;
    const textGeometry = new TextGeometry(message, {
      font,
      size: 0.5,
      height: 0.01,
      bevelEnabled: true,
      bevelSegments: 5,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    });

    const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const text = new THREE.Mesh(textGeometry, textMaterial);

    text.name = 'noteText';

    text.scale.set(6, 6, 0.01);
    text.position.set(-2, -8, 2);

    scene.add(text);

    gsap.fromTo(
      text.scale,
      { x: text.scale.x, y: text.scale.y, z: text.scale.z },
      {
        x: text.scale.x * 1.1,
        y: text.scale.y * 1.1,
        z: text.scale.z * 1.1,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
      }
    );

    gsap.to(textMaterial, {
      opacity: 0,
      duration: 1.5,
      delay: 1,
      onComplete: () => {
        scene.remove(text);
        text.geometry.dispose();
        if (Array.isArray(text.material)) {
          text.material.forEach((mat: THREE.Material) => mat.dispose());
        } else {
          (text.material as THREE.Material).dispose();
        }
      },
    });
  } catch (error) {
    console.error('노트 텍스트 로딩 실패:', error);
  }
}
