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
      className={`flex h-[60px] w-[60px] items-center justify-center rounded-[20px] shadow-lg transition-transform duration-200 active:scale-95 ${
        isConnected ? 'bg-opacity-60 bg-green-500' : 'bg-gray-300'
      }`}
    >
      <MdOutlineVibration
        size={40}
        //연결 상태에 따라 아이콘 색상 변경
        color={isConnected ? 'white' : 'black'}
        //부드러운 색상 전환을 위한 애니메이션
        className="transition-colors duration-300"
      />
    </button>
  );
}

export default WearableButton;
