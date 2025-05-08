import { useState, useRef } from 'react';
import { GoDotFill } from 'react-icons/go';
import { YIN } from 'pitchfinder';

interface RecordButtonProps {
  onNoteDetected: (note: string) => void; // ⚡️ 부모로 note 전달할 callback
}

const RecordButton = ({ onNoteDetected }: RecordButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const intervalRef = useRef<number | null>(null);
  const previousNoteRef = useRef<string | null>(null); // 이전 note 저장

  function handleRecordClick() {
    if (!isRecording) {
      void startRecording();
    } else {
      void stopRecording();
    }
    setIsRecording((prev) => !prev);
  }

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

      if (rms < 0.01) return; // silence skip

      const pitch = detectPitch(timeDomainData);
      if (pitch && pitch >= 50 && pitch <= 1000) {
        const note = frequencyToNote(pitch);

        // 이전 note와 비교해서 다를 때만 출력
        if (note !== previousNoteRef.current) {
          // console.log(`Detected note: ${note}`);
          previousNoteRef.current = note; // 현재 note 저장
          onNoteDetected(note);
        }
      }
    }, 50);
  }

  function stopRecording() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    void audioCtxRef.current?.close();
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

  return (
    <button
      onClick={handleRecordClick}
      className="bg-opacity-50 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-black shadow-lg"
    >
      <GoDotFill
        size={60}
        color={isRecording ? '#13c5b3' : 'red'}
        className="transition-colors duration-300"
      />
    </button>
  );
};

export default RecordButton;
