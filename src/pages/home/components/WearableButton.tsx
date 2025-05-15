import { useState } from 'react';
import axios from 'axios';
import { MdOutlineVibration } from 'react-icons/md';

interface WearableButtonProps {
  bpm: number;
}

function WearableButton({ bpm }: WearableButtonProps) {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    const valueToSend = isConnected ? -1 : bpm;

    try {
      await axios.post('/api/bpm', valueToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsConnected(!isConnected);
      console.log(`Sent BPM: ${valueToSend}`);
    } catch (error) {
      console.error('Failed to send BPM:', error);
    }
  };

  return (
    <button
      onClick={() => void handleConnect()}
      className={`flex h-[60px] w-[60px] items-center justify-center rounded-[20px] shadow-lg ${
        isConnected ? 'bg-[#13c5b3]' : 'bg-gray-300'
      }`}
    >
      <MdOutlineVibration
        size={40}
        color={isConnected ? 'white' : 'black'}
        className="transition-colors duration-300"
      />
    </button>
  );
}

export default WearableButton;
