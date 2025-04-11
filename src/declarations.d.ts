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
  