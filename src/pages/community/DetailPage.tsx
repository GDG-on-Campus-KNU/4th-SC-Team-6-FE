import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import CommentList from './components/CommentList';
import { fetchPostDetail, PostDetail } from '../../apis/community';
import { Link } from 'react-router-dom';

//  더미 데이터, const USE_DUMMY 를 true로 바꾸면 더미 사용 false 로 바꾸면 api 사용
const dummyPost: PostDetail = {
  id: 1,
  title: 'Sample Post Title',
  description: 'This is a sample description for the dummy post.',
  author: 'Dummy Author',
  createdAt: '2025-05-05',
  comments: [
    {
      commentId: 1,
      author: 'John',
      content: 'Nice post!',
      createdAt: '2025-05-05',
    },
    {
      commentId: 2,
      author: 'Jane',
      content: 'Thanks for sharing.',
      createdAt: '2025-05-05',
    },
  ],
};

const USE_DUMMY = true;

function CommunityDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<PostDetail | null>(
    USE_DUMMY ? dummyPost : null
  );
  const [loading, setLoading] = useState(!USE_DUMMY);

  useEffect(() => {
    if (USE_DUMMY) return;

    const token = localStorage.getItem('token') || '';

    if (!id) return;

    fetchPostDetail(Number(id), token)
      .then((res) => setPost(res))
      .catch((err) => console.error('게시글 상세 가져오기 실패', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="mx-auto w-full max-w-md p-4">
        <div className="rounded-xl bg-white p-6 text-center shadow-md">
          <h2 className="text-xl font-bold text-red-500">
            게시글을 찾을 수 없습니다.
          </h2>
          <Link
            to="/community"
            className="mt-4 inline-block rounded-md bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
          >
            커뮤니티로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageLayout title="Community Post">
      <div className="mx-auto w-full px-4 sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <div className="mb-6 rounded-xl bg-white/70 p-6 shadow-md drop-shadow-lg sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            {post.title}
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            {post.author} | {post.createdAt}
          </p>
          <p className="text-lg leading-relaxed break-words whitespace-pre-line text-gray-800">
            {post.description}
          </p>
        </div>
        <CommentList
          comments={post.comments.map((c) => ({
            id: c.commentId,
            author: c.author,
            text: c.content,
          }))}
        />
      </div>
    </PageLayout>
  );
}

export default CommunityDetail;
