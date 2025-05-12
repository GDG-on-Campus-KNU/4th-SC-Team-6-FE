import { useEffect, useRef } from 'react';
import { YIN } from 'pitchfinder';

interface NoteDetectorProps {
  isRecording: boolean;
  onNoteDetected: (note: string) => void;
}

export default function NoteDetector({
  isRecording,
  onNoteDetected,
}: NoteDetectorProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const intervalRef = useRef<number | null>(null);
  const previousNoteRef = useRef<string | null>(null);

  useEffect(() => {
    if (isRecording) {
      void startRecording();
    } else {
      void stopRecording();
    }

    return () => {
      void stopRecording();
    };
  }, [isRecording]);

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);

    analyser.fftSize = 2048;
    source.connect(analyser);

    const bufferLength = analyser.fftSize;
    const timeDomainData = new Float32Array(bufferLength);
    const detectPitch = YIN({ sampleRate: audioCtx.sampleRate });

    audioCtxRef.current = audioCtx;
    analyserRef.current = analyser;
    sourceRef.current = source;

    intervalRef.current = window.setInterval(() => {
      analyser.getFloatTimeDomainData(timeDomainData);

      const rms = Math.sqrt(
        timeDomainData.reduce((sum, v) => sum + v * v, 0) /
          timeDomainData.length
      );

      if (rms < 0.01) return;

      const pitch = detectPitch(timeDomainData);
      if (pitch && pitch >= 50 && pitch <= 1000) {
        const note = frequencyToNote(pitch);
        if (note !== previousNoteRef.current) {
          previousNoteRef.current = note;
          onNoteDetected(note);
        }
      }
    }, 50);
  }

  async function stopRecording() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      await audioCtxRef.current.close();
    }
    analyserRef.current = null;
    sourceRef.current = null;
    previousNoteRef.current = null; // stop할 때 초기화
  }

  function frequencyToNote(frequency: number): string {
    const noteNames = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
    ];
    const A4 = 440;
    const semitone = 12 * Math.log2(frequency / A4);
    const noteIndex = Math.round(semitone) + 69;
    return noteNames[(noteIndex + 12) % 12];
  }

  return null;
}
