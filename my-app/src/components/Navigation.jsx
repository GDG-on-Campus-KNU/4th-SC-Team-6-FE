import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="absolute bottom-0 left-0 flex h-[55px] w-[393px] items-center justify-around bg-white/90 backdrop-blur-[7px]">
      <Link
        to="/"
        className="text-sm font-medium text-black"
      >
        Home
      </Link>
      <Link
        to="/community"
        className="text-sm font-medium text-black"
      >
        Community
      </Link>
      <Link
        to="/feedback"
        className="text-sm font-medium text-black"
      >
        Feedback
      </Link>
      <Link
        to="/myPage"
        className="text-sm font-medium text-black"
      >
        MyPage
      </Link>
    </nav>
  );
}
