import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ProgressBarProps {
  loadingManager: THREE.LoadingManager;
}
export default function ProgressBar({ loadingManager }: ProgressBarProps) {
  const progressBarRef = useRef<HTMLProgressElement | null>(null);
  const progressContainerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadingManager.onProgress = (_url, loaded, total) => {
      if (progressBarRef.current) {
        progressBarRef.current.value = (loaded / total) * 100;
      }
    };

    loadingManager.onLoad = () => {
      if (progressContainerRef.current) {
        setIsLoading(false);
      }
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div
          ref={progressContainerRef}
          className="absolute inset-0 flex items-center justify-center bg-black/80 text-white"
        >
          <progress
            ref={progressBarRef}
            value={0}
            max={100}
            className="custom-progress h-[2%] w-1/3"
          ></progress>
        </div>
      )}
    </>
  );
}
