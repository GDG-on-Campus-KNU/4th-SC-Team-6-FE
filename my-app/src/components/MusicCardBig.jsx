import PlayButton from "./PlayButton"; 

const MusicCardBig = ({
  title = "먼지가 되어 Cover",
  imageSrc = "free-icon-record-player-442981-1.png",
  to = "/play",
}) => {
  return (
    <div className="relative w-full max-w-[170px] aspect-[170/234] bg-[#F2F3F7] rounded-[20px] shadow-md p-4 flex flex-col items-center">
      <p className="text-black font-bold text-base md:text-sm sm:text-xs text-center mt-4">
        {title}
      </p>      
      <div className="flex justify-center items-end w-full pb-4">
        <PlayButton to={to} />
      </div>
    </div>
  );
};

export default MusicCardBig;
