import { useNavigate } from 'react-router-dom';
import PlayButton from './PlayButton';

const MusicCard = ({ title = 'Oasis - Live Forever Cover', to = '/play' }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
  };

  return (
    <div className="xs:h-14 relative flex h-20 w-full max-w-[768px] items-center rounded-[20px] bg-[#f2f3f7] px-4 shadow-md sm:h-16">
      <p className="xs:text-sm flex-grow text-3xl font-bold text-[#203f9a] sm:text-lg md:text-2xl">
        {title}
      </p>
      <div className="flex justify-end">
        <PlayButton to={to} />
      </div>
    </div>
  );
};

export default MusicCard;
