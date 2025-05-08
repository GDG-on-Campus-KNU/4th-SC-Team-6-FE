import { useMemo } from 'react';
import CommunityCard from './CommunityCard';

interface Post {
  id: number;
  title: string;
  description: string;
}

interface CommunityListProps {
  items: Post[];
}

function CommunityList({ items }: CommunityListProps) {
  const memoizedItems = useMemo(() => items, [items]);

  return (
    <div className="flex w-full flex-col items-center gap-4 px-4 py-4">
      {memoizedItems.map((item) => (
        <div
          key={item.id}
          className="w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl"
        >
          <CommunityCard
            id={item.id}
            title={item.title}
            description={item.description}
          />
        </div>
      ))}
    </div>
  );
}

export default CommunityList;
