import { Link } from 'react-router-dom';
import { RiDiscLine } from 'react-icons/ri';


interface MusicCardProps {
  id: string | number; // 곡 ID (라우팅용)
  title: string; 
  artist: string; 
  offset?: string; 
}

// 곡 정보를 카드 형태로 보여주는 컴포넌트
// 클릭 시 해당 곡의 상세 페이지로 이동
function MusicCard({ id, title, artist, offset = '' }: MusicCardProps) {
  return (
    <Link
      to={`/feedback/${id}`}
      className={`block transform ${offset}`} // offset은 교차정렬된것 처럼 보이기 위함
    >
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white/70 p-4 shadow-md hover:scale-105">
        <RiDiscLine size={60} className="mb-2 text-gray-700" />
        <h3 className="text-lg font-semibold">{title}</h3>
        <hr className="my-2 w-full border-gray-400" />
        <p className="text-sm text-gray-700">by {artist}</p>
      </div>
    </Link>
  );
}

export default MusicCard;
