import { useState } from 'react';
import { MdOutlineVibration } from 'react-icons/md';

const WearableButton = () => {
  const [isConnected, setIsConnected] = useState(false);

  function handleConnect() {
    setIsConnected(function (prev) {
      return !prev;
    });
  }

  return (
    <button
      onClick={handleConnect}
      className={`flex h-[60px] w-[60px] items-center justify-center rounded-[20px] shadow-lg ${isConnected ? 'bg-green-500 bg-opacity-60' : 'bg-white bg-opacity-50'} `}
    >
      <MdOutlineVibration
        size={40}
        color="black"
      />
    </button>
  );
};

export default WearableButton;
