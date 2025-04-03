import { Link } from 'react-router-dom';
import { AiFillHome, AiOutlineUser } from 'react-icons/ai';
import { IoMdPeople } from 'react-icons/io';
import { MdFeedback } from 'react-icons/md';

export default function Navigation() {
  const menuItems = [
    {
      label: 'Home',
      icon: <AiFillHome size={24} />,
      path: '/main',
    },
    {
      label: 'Community',
      icon: <IoMdPeople size={24} />,
      path: '/community',
    },
    {
      label: 'Feedback',
      icon: <MdFeedback size={24} />,
      path: '/feedback',
    },
    {
      label: 'My Page',
      icon: <AiOutlineUser size={24} />,
      path: '/mypage',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 flex h-[60px] w-full items-center justify-around border-t border-gray-200 bg-white/80 px-2 sm:px-6 md:px-8">
      {menuItems.map(function (item) {
        return (
          <Link
            to={item.path}
            key={item.label}
            className="flex w-1/4 flex-col items-center justify-center text-black transition-all hover:text-blue-600 active:scale-95"
          >
            {item.icon}
            <span className="mt-1 text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
