import { useNavigate } from 'react-router-dom';

function PlayButton({ to, children = 'Play', className = '' }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(to);
  }

  return (
    <div className={className}>
      <div
        className="relative size-16 w-32 cursor-pointer transition-transform active:scale-95"
        onClick={handleClick}
      >
        <div className="absolute inset-0 rounded-[30px] bg-white/50 shadow-md" />

        <p className="absolute inset-0 flex items-center justify-center text-base font-bold text-black">
          {children}
        </p>
      </div>
    </div>
  );
}

export default PlayButton;
