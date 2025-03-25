import PostCard from './PostCard';
import { useNavigate } from 'react-router-dom';

export default function PostList({ posts }) {
  const navigate = useNavigate();

  return posts.map(function (post) {
    return (
      <PostCard
        key={post.id}
        post={post}
        onClick={function () {
          navigate(`/community/${post.id}`);
        }}
      />
    );
  });
}
