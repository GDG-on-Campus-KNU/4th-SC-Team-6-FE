import { useState, useMemo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import PageLayout from '../../components/PageLayout';
import SearchBar from './components/SearchBar';
import CommunityList from './components/CommunityList';
import { fetchPosts, Post } from '../../apis/community';

//  더미 데이터
const dummyPosts: Post[] = [
  {
    id: 1,
    title: 'Anyone to play the guitar with me',
    description: 'I wanna play songs by Oasis',
  },
  {
    id: 2,
    title: 'Looking for a piano partner',
    description: 'Practice together',
  },
  { id: 3, title: 'Drummer wanted', description: "Let's make a band" },
];

// 더미 데이터 사용할지 여부,const USE_DUMMY 를 true로 바꾸면 더미 사용
const USE_DUMMY = true;

function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>(USE_DUMMY ? dummyPosts : []);
  const [loading, setLoading] = useState(!USE_DUMMY);

  useEffect(() => {
    if (USE_DUMMY) return;

    const token = localStorage.getItem('token') || '';
    setLoading(true);

    fetchPosts(token)
      .then((res) => {
        setPosts(res.posts);
      })
      .catch((err) => console.error('게시글 불러오기 실패', err))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const filteredPosts = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return posts.filter((post) =>
      post.title.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery, posts]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <PageLayout title="Community">
      <SearchBar onSearch={handleSearch} />
      <CommunityList items={filteredPosts} />

      {/*글 작성*/}
      <Link
        to="/community/write"
        className="fixed right-6 bottom-24 flex items-center gap-2 rounded-full bg-blue-500 px-5 py-3 text-sm text-white shadow-lg hover:bg-blue-600/70 sm:right-9 sm:bottom-30 sm:px-6 sm:py-3 sm:text-base"
      >
        <FiEdit size={18} className="sm:size-5" />
        Write
      </Link>
    </PageLayout>
  );
}

export default CommunityPage;
