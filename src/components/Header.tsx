import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="relative top-0 left-0 z-[11] h-[44px] w-full px-4 backdrop-blur-[10px]">
      <nav className="mx-auto flex h-full max-w-[850px] items-center">
        <Link to="/" className="mr-auto text-[1.2rem] font-extrabold">
          The Feelody
        </Link>

        <Link to="/aboutUs" className="ml-8 text-[0.8em]">
          About Us
        </Link>
      </nav>
    </div>
  );
}
