declare module 'three/examples/jsm/loaders/FontLoader' {
  import { Loader } from 'three';

  export interface Font {
    data: object;
    generateShapes(text: string, size: number): THREE.Shape[];
  }

  export class FontLoader extends Loader {
    loadAsync(url: string): Promise<Font>;
  }
}

declare module 'three/examples/jsm/geometries/TextGeometry' {
  import { Font } from 'three/examples/jsm/loaders/FontLoader';
  import { BufferGeometry } from 'three';

  export interface TextGeometryParameters {
    font: Font;
    size?: number;
    height?: number;
    curveSegments?: number;
    bevelEnabled?: boolean;
    bevelThickness?: number;
    bevelSize?: number;
    bevelOffset?: number;
    bevelSegments?: number;
  }

  export class TextGeometry extends BufferGeometry {
    constructor(text: string, parameters: TextGeometryParameters);
  }
}

declare module 'three/examples/jsm/loaders/GLTFLoader' {
  import * as THREE from 'three';

  export interface GLTF {
    scene: THREE.Group;
    scenes: THREE.Group[];
    cameras: THREE.Camera[];
    animations: THREE.AnimationClip[];
    asset: {
      version: string;
      generator: string;
    };
  }

  export class GLTFLoader extends THREE.Loader {
    constructor(manager?: THREE.LoadingManager);
    load(
      url: string,
      onLoad: (gltf: GLTF) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    loadAsync(
      url: string,
      onProgress?: (event: ProgressEvent<EventTarget>) => void
    ): Promise<GLTF>;
    parse(
      data: ArrayBuffer | string,
      path: string,
      onLoad: (gltf: GLTF) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}
