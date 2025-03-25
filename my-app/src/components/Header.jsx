import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="relative mx-auto h-[55px] w-full max-w-[400px] px-5">
      <div className="absolute h-full w-full bg-transparent" />

      <Link
        to="/main"
        className="absolute left-5 top-3.5 cursor-pointer text-2xl font-bold text-black/85 transition-colors duration-200 hover:text-[#3058d6] active:scale-95"
      >
        The Feelody
      </Link>

      <Link
        to="/about"
        className="absolute right-5 top-[22px] cursor-pointer text-sm font-semibold text-black transition-colors duration-200 hover:text-[#3058d6] active:scale-95"
      >
        About Us
      </Link>
    </div>
  );
}
