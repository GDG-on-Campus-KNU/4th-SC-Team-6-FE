import { Link } from 'react-router-dom';
import { AiFillHome, AiOutlineUser } from 'react-icons/ai';
import { IoMdPeople } from 'react-icons/io';
import { MdFeedback } from 'react-icons/md';

export default function Navigation() {
  const iconSize = 22;
  const menuItems = [
    {
      label: 'Home',
      icon: <AiFillHome size={iconSize} />,
      path: '/',
    },
    {
      label: 'Community',
      icon: <IoMdPeople size={iconSize} />,
      path: '/community',
    },
    {
      label: 'Feedback',
      icon: <MdFeedback size={iconSize} />,
      path: '/feedback',
    },
    {
      label: 'My Page',
      icon: <AiOutlineUser size={iconSize} />,
      path: '/mypage',
    },
  ];

  return (
    <div className="fixed bottom-4 z-[11] h-[55px] w-full px-4">
      <nav className="mx-auto flex h-full max-w-[900px] items-center rounded-[20px] bg-white/10 shadow-md backdrop-blur-[10px]">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex w-[25%] flex-col items-center justify-center"
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
