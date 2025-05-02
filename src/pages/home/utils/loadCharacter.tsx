import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export async function loadCharacter(scene: THREE.Scene, camera: THREE.Camera) {
  const loadingManager = new THREE.LoadingManager();

  // GLTFLoader의 로딩 상태를 loadingManager로 관리할 수 있음
  const gltfLoader = new GLTFLoader(loadingManager);
  const gltf = await gltfLoader.loadAsync('/public/models/character.gltf');
  const model = gltf.scene;
  model.scale.set(0.1, 0.1, 0.1);
  // 모델의 그림자를 설정 할 수 있도록
  /** Three.js의 Object3D는 기본적으로 isMesh 같은 속성을 가지고 있지 않다고 타입 시스템이 인식
  하지만 실제로 런타임에서는 child가 Mesh 타입이면 isMesh === true
  -> child가 Mesh인지 안전하게 타입 체크: instanceof THREE.Mesh를 사용
  */
  model.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.castShadow = true;
      object.receiveShadow = true; // 필요에 따라
    }
  });
  scene.add(model);
  camera.lookAt(model.position); // 모델의 위치를 바라보도록

  const mixer = new THREE.AnimationMixer(model);
  let currentAction;
  if (gltf.animations.length > 0) {
    // clip으로부터 에니메이션을 제어 할 수 있는 action 객체를 얻을 수 있음
    currentAction = mixer.clipAction(gltf.animations[6]);
    currentAction.play(); // animation 재생 시작
  }

  return mixer;
}
