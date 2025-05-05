import { Link } from 'react-router-dom';

interface CommunityCardProps {
  id: number | string;
  title: string;
  description: string;
}

function CommunityCard({ id, title, description }: CommunityCardProps) {
  const shortDescription =
    description.length > 20 ? `${description.slice(0, 20)}...` : description;

  return (
    <Link to={`/community/${id}`} className="block w-full">
      <div className="mx-auto my-2 rounded-xl bg-white/70 p-4 shadow-md drop-shadow-lg transition-all sm:p-4 md:p-6 lg:p-8">
        <h2 className="mb-1 text-lg font-semibold text-gray-800 sm:text-lg md:text-xl lg:text-2xl">
          {title}
        </h2>
        <hr className="my-2 border-t border-gray-300" />
        <p className="text-sm text-gray-600 sm:text-sm md:text-base lg:text-lg">
          {shortDescription}
        </p>
      </div>
    </Link>
  );
}

export default CommunityCard;
