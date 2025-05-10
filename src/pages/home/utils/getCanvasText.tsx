import * as THREE from 'three';
import gsap from 'gsap';
export function getCanvasText(scene: THREE.Scene) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px "Pixelify Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Click me!', canvas.width / 2, canvas.height / 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
  });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(3, 1, 1);
  sprite.position.set(0, 0, 10);
  scene.add(sprite);

  function heartbeat() {
    gsap.fromTo(
      sprite.scale,
      { x: sprite.scale.x, y: sprite.scale.y },
      {
        x: sprite.scale.x * 1.3,
        y: sprite.scale.y * 1.3,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          setTimeout(heartbeat, 5000);
        },
      }
    );
  }
  heartbeat();
}
