import { useState, useEffect, useRef } from 'react';
import { MdOutlineVibration } from 'react-icons/md';

interface WearableButtonProps {
  bpm: number;
}

function WearableButton({ bpm }: WearableButtonProps) {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://your-server-address/ws');
    socketRef.current = socket;

    socket.onopen = () => console.log('WebSocket connected');
    socket.onmessage = (e) => console.log('Message from watch:', e.data);
    socket.onclose = () => console.log('WebSocket disconnected');
    socket.onerror = (e) => console.error('WebSocket error:', e);

    return () => {
      socket.close();
    };
  }, []);

  const handleConnect = () => {
    const newConnectionState = !isConnected;
    setIsConnected(newConnectionState);

    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket is not connected');
      return;
    }

    if (newConnectionState) {
      socketRef.current.send(JSON.stringify({ type: 'start', bpm }));
    } else {
      socketRef.current.send(JSON.stringify({ type: 'stop' }));
    }
  };

  return (
    <button
      onClick={handleConnect}
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
