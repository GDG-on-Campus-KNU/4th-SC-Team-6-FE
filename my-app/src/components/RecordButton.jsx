import { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';

const RecordButton = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordClick = () => {
    setIsRecording((prev) => !prev);
  };

  return (
    <button
      onClick={handleRecordClick}
      className={`flex h-[60px] w-[60px] items-center justify-center rounded-full text-white shadow-lg ${isRecording ? 'bg-red-500' : 'bg-blue-500'} transition hover:bg-opacity-80`}
    >
      <FaMicrophone size={24} />
    </button>
  );
};

export default RecordButton;
