import { useState } from 'react';
import { MdOutlineVibration } from 'react-icons/md';

function WearableButton() {
  const [isConnected, setIsConnected] = useState(false);

  function handleConnect() {
    setIsConnected((prev) => !prev);
  }

  return (
    <button
      // 클릭시 연결 상태를 변경
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
