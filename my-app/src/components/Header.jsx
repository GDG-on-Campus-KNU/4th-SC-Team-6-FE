import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="absolute left-0 top-0 flex h-[55px] w-[393px] items-center justify-between px-4 backdrop-blur-[8px]">
      {/* The Feelody (로고) */}
      <Link
        to="/"
        className="text-[24px] font-extrabold leading-[28px] text-black/85"
      >
        The Feelody
      </Link>

      {/* About Us */}
      <div className="flex gap-4">
        <Link
          to="/aboutUs"
          className="text-[15px] font-semibold leading-[18px] text-black"
        >
          About Us
        </Link>
      </div>
    </nav>
  );
}
