import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
<<<<<<< HEAD
const PlayButton = ({ to, children = "합주하기", className = "" }) => {
=======
const PlayButton =({to,children})=>{
>>>>>>> a7103de (fix: 충돌해결)
=======
const PlayButton = ({ to, children = "합주하기", className = "" }) => {
>>>>>>> 49217f1 (feat: Add PlayButton component)
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };
<<<<<<< HEAD
<<<<<<< HEAD

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


=======
}

return(
  <button
  onClick={handleClick}
    className="flex justify-center items-center w-[143px] h-[60px] rounded-xl shadow bg-blue-500 text-white hover:bg-blue-600"
   style={{width:'48px',height:'48px' }}
  >
    {children || 연주하기 }
  </button>
)
>>>>>>> a7103de (fix: 충돌해결)
=======

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


>>>>>>> 49217f1 (feat: Add PlayButton component)
