import { useState } from 'react';
import { GoDotFill } from 'react-icons/go';

const RecordButton = () => {
  const [isRecording, setIsRecording] = useState(false);

  function handleRecordClick() {
    setIsRecording((prev) => !prev);
  }

  return (
    <button
      onClick={handleRecordClick}
      className={`flex h-[60px] w-[60px] items-center justify-center rounded-full shadow-lg ${isRecording ? 'bg-red-500' : 'bg-opacity-50 bg-black'} `}
    >
      <GoDotFill size={60} color='red' />
    </button>
  );
};

export default RecordButton;
