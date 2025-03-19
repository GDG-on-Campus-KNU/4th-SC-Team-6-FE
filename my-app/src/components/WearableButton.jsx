import { useState } from 'react';
import { MdOutlineVibration } from 'react-icons/md'; 

const WearableButton = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected((prev) => !prev); 
  };

  return (
    <button
      onClick={handleConnect}
      className={`flex justify-center items-center w-[60px] h-[60px] rounded-full shadow-lg text-white 
        ${isConnected ? 'bg-green-500' : 'bg-blue-500'} hover:bg-opacity-80 transition`}
    >
      <MdOutlineVibration size={24} />
    </button>
  );
};

export default WearableButton;
