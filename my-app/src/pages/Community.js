import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/community/SearchBar';

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(function () {
    const dummy = [
      { id: 1, title: '기타 구함', preview: 'Oasis 곡 합주자 구해요' },
      { id: 2, title: 'ㅁㅁㅁ', preview: '안녕' },
      { id: 3, title: '하하', preview: 'ㅁㄹㅇ' },
      {
        id: 4,
        title: '안녕하세요',
        preview: '이게맞나',
      },
    ];
    setPosts(dummy);
  }, []);

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  const filteredPosts = posts.filter(function (post) {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className="mx-auto w-[393px] px-5 pb-[30px] pt-[30px]">
        <h1 className="mb-2 text-center text-[40px] font-bold text-white drop-shadow-md">
          Community
        </h1>
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/*게시글 카드 리스트*/}
      <div className="mx-auto w-[393px] space-y-4 px-3">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => navigate(`/community/${post.id}`)}
            className="relative h-[109px] w-full cursor-pointer rounded-[30px] bg-white/50 px-5 py-4 shadow transition hover:bg-white/70"
          >
            <h2 className="break-keep text-xl font-bold text-black">
              {post.title}
            </h2>
            <div className="my-2 h-px w-full bg-black/70" />
            <p className="line-clamp-2 text-base text-black">{post.preview}</p>
          </div>
        ))}
      </div>
    </>
  );
}
