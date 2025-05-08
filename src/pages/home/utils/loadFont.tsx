import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

export async function loadFont(scene: THREE.Scene) {
  const fontLoader = new FontLoader();

  try {
    // 브라우저 기준으로 접근할 수 있는 절대 경로(/)여야
    const font = await fontLoader.loadAsync('/public/fonts/fontText.json');

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
    text.scale.set(2.3, 2.3, 0.01);

    text.castShadow = true;
    console.log('font loaded');

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
