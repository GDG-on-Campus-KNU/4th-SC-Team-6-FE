import { useNavigate } from "react-router-dom";
import PlayButton from "./PlayButton"; 

const MusicCard = ({ title = "Oasis - Live Forever Cover", to = "/play" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <div className="relative w-full max-w-[768px] h-20 sm:h-16 xs:h-14 bg-[#f2f3f7] rounded-[20px] shadow-md flex items-center px-4">
     
      <p className="text-[#203f9a] font-bold text-3xl md:text-2xl sm:text-lg xs:text-sm flex-grow">
        {title}
      </p>

     
      <div className="flex justify-end">
        <PlayButton to={to} />
      </div>
    </div>
  );
};

export default MusicCard;


