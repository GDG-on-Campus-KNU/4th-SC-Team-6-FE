import { useNavigate } from "react-router-dom";

const PlayButton = ({ to, children = "합주하기", className = "" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <div className={`${className}`}>
      <div
        className="
          relative w-[143px] h-[60px] sm:w-[120px] sm:h-[50px] xs:w-[100px] xs:h-[40px] 
          cursor-pointer"
        onClick={handleClick}
      >
        
        <div className="
          absolute inset-0 rounded-[30px] bg-[#203f9a] shadow-md 
          transition-transform duration-200 active:scale-95
        " />

      
        <p className="
          absolute inset-0 flex items-center justify-center 
          text-[25px] sm:text-[20px] xs:text-[16px] font-bold text-[#f7f2eb]
        ">
          {children}
        </p>
      </div>
    </div>
  );
};

export default PlayButton;


