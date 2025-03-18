import { useNavigate } from "react-router-dom";

const PlayButton =({to,children})=>{
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };
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