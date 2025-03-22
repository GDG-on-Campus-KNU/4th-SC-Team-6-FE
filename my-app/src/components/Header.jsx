import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  function handleGoMain() {
    navigate('/main');
  }

  function handleGoAbout() {
    navigate('/about');
  }

  return (
    <div className="relative mx-auto h-[55px] w-full max-w-[400px] px-5">
      <div className="absolute h-full w-full bg-transparent" />

      <p
        className="absolute left-5 top-3.5 cursor-pointer text-2xl font-bold text-black/85 transition-colors duration-200 hover:text-[#3058d6] active:scale-95"
        onClick={handleGoMain}
      >
        The Feelody
      </p>

      <p
        className="absolute right-5 top-[22px] cursor-pointer text-sm font-semibold text-black transition-colors duration-200 hover:text-[#3058d6] active:scale-95"
        onClick={handleGoAbout}
      >
        About Us
      </p>
    </div>
  );
}
