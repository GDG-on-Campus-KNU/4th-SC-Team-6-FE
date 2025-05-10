import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export async function loadCharacter(
  scene: THREE.Scene,
  camera: THREE.Camera,
  loadingManager: THREE.LoadingManager
): Promise<THREE.AnimationMixer> {
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
  let currentAction: THREE.AnimationAction | null = null;
  if (gltf.animations.length > 0) {
    // clip으로부터 에니메이션을 제어 할 수 있는 action 객체를 얻을 수 있음
    currentAction = mixer.clipAction(gltf.animations[16]);
    currentAction.play(); // animation 재생 시작
  }

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const dancingAnimations = gltf.animations;
  console.log(dancingAnimations.length);

  function handlePointerDown(e: PointerEvent) {
    pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(scene.children);
    const object = intersects[0]?.object;

    if (object?.name === 'Ch09') {
      const previousAction = currentAction;
      const index = Math.round(Math.random() * (dancingAnimations.length - 1));
      currentAction = mixer.clipAction(dancingAnimations[index]);

      // currentAction.loop = THREE.LoopOnce;
      currentAction.clampWhenFinished = true;

      if (previousAction !== currentAction) {
        previousAction?.fadeOut(0.5);
        currentAction.reset().fadeIn(0.5).play();
      }
    }
  }
  window.addEventListener('pointerdown', handlePointerDown);

  return mixer;
}
