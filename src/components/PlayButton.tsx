import { Link } from 'react-router-dom';

interface PlayButtonProps {
  to: string;
  children?: React.ReactNode;
  className?: string;
}

function PlayButton({
  to,
  children = 'Play',
  className = '',
}: PlayButtonProps) {
  return (
    <div className={className}>
      <Link
        to={to}
        className="relative block size-16 w-32 cursor-pointer transition-transform active:scale-95"
      >
        <div className="absolute inset-0 rounded-[30px] bg-white/50 shadow-md" />

        <p className="absolute inset-0 flex items-center justify-center text-base font-bold text-black">
          {children}
        </p>
      </Link>
    </div>
  );
}

export default PlayButton;
