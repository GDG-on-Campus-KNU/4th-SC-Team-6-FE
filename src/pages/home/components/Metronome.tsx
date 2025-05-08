import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';

interface MetronomeProps {
  particleGroups: THREE.Points[];
}

export default function Metronome({ particleGroups }: MetronomeProps) {
  const metronomeRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [bpm, setBpm] = useState<number>(50);
  let beatCount = 0;

  function ensureAudioContext() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new window.AudioContext();
    }
    if (audioCtxRef.current.state === 'suspended') {
      void audioCtxRef.current.resume();
    }
  }

  function playClick(isAccent: boolean) {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = isAccent ? 1000 : 600;
    gain.gain.setValueAtTime(1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  }

  useEffect(() => {
    if (metronomeRef.current) {
      clearInterval(metronomeRef.current);
    }

    const interval = (60 / bpm) * 1000;

    metronomeRef.current = window.setInterval(() => {
      giveFeedback();
      const isAccent = beatCount % 4 === 0;
      playClick(isAccent);
      beatCount++;
    }, interval);

    function giveFeedback() {
      particleGroups.forEach((points) => {
        gsap.to(points.scale, {
          x: 3,
          y: 3,
          z: 3,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        });
      });
    }

    return () => {
      if (metronomeRef.current) {
        clearInterval(metronomeRef.current);
      }
    };
  }, [bpm, particleGroups]);
  return (
    <input
      type="number"
      min={40}
      max={150}
      value={bpm}
      onChange={(e) => {
        ensureAudioContext();
        const value = Number(e.target.value);
        setBpm(Math.max(40, Math.min(150, value)));
      }}
      className="h-[50px] w-[60px] rounded border p-2 font-bold"
    />
  );
}
