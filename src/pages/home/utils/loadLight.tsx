import * as THREE from 'three';

export function loadLight(scene: THREE.Scene) {
  const planeGeometry = new THREE.PlaneGeometry(100, 100, 100);
  const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.2,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -Math.PI / 2; // plane이 기본값으로 수직으로 형성 -> 수평으로 만들어줘야야
  plane.position.y = -7.5; // 캐릭터를 자르기 때문에 y값 낮춰주기
  plane.receiveShadow = true;

  scene.add(plane);

  // HemisphereLight 그림자 표현 어려움 -> spotlight 사용, plane 사용해 그림자를 받아 줄 바닥 만들기기
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x333333, 2.5);
  hemisphereLight.position.set(0, 20, 10);
  scene.add(hemisphereLight);

  //   const spotLight = new THREE.SpotLight(
  //     0xffffff,
  //     1.5,
  //     30,
  //     Math.PI * 0.3,
  //     0.5,
  //     0.5
  //   );

  //   spotLight.castShadow = true;
  //   spotLight.shadow.mapSize.width = 1024;
  //   spotLight.shadow.mapSize.height = 1024;
  //   spotLight.shadow.radius = 8;

  //   spotLight.position.set(0, 20, 0);

  //   scene.add(spotLight);
}
