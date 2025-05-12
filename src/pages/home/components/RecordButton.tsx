import { useEffect } from 'react';
import { GoDotFill } from 'react-icons/go';
import useRecording from '../utils/useRecording';

interface RecordButtonProps {
  isRecording: boolean;
  onToggle: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function RecordButton({
  isRecording,
  onToggle,
  canvasRef,
}: RecordButtonProps) {
  const { startRecording, stopRecording } = useRecording(canvasRef);

  useEffect(() => {
    if (isRecording) {
      void startRecording();
    } else {
      void stopRecording();
    }
  }, [isRecording]);

  return (
    <button
      onClick={onToggle}
      className="bg-opacity-50 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-black shadow-lg"
    >
      <GoDotFill
        size={60}
        color={isRecording ? '#13c5b3' : 'red'}
        className="transition-colors duration-300"
      />
    </button>
  );
}
