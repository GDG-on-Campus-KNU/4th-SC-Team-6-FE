import { useState, useEffect, useRef } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { MdOutlineVibration } from 'react-icons/md';

interface WearableButtonProps {
  bpm: number;
}

function WearableButton({ bpm }: WearableButtonProps) {
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    // TODO: 실제 주소로 교체
    const socket = new (SockJS as unknown as new (url: string) => WebSocket)(
      'http://localhost:8080/ws'
    );
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('WebSocket connected');

        client.subscribe(
          '/api/bpm/wearable/notification',
          (message: IMessage) => {
            const bpmValue = parseInt(message.body);
            console.log('Received from server:', bpmValue);
          }
        );
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      void client.deactivate();
    };
  }, []);

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
