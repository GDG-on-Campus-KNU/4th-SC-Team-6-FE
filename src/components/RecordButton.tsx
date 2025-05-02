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
      className={`bg-opacity-50 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-black shadow-lg`}
    >
      <GoDotFill
        size={60}
        color={isRecording ? '#13c5b3' : 'red'}
        className="transition-colors duration-300"
      />
    </button>
  );
};

export default RecordButton;
