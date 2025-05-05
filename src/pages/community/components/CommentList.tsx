import { useState } from 'react';
import CommentItem from './Comment';

interface Comment {
  id: number;
  author: string;
  text: string;
}

interface CommentListProps {
  comments: Comment[];
}

function CommentList({ comments }: CommentListProps) {
  const [newComment, setNewComment] = useState<string>('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    alert(`댓글 작성: ${newComment}`);
    setNewComment('');
  };

  return (
    <div className="rounded-xl bg-white/70 p-4 shadow-md drop-shadow-lg">
      <h3 className="mb-4 text-lg font-semibold sm:text-lg md:text-xl">
        Comments
      </h3>
      <ul>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            author={comment.author}
            text={comment.text}
          />
        ))}
      </ul>

      {/* 댓글 작성 영역 */}
      <div className="flex w-full items-center justify-center px-4 py-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Please insert comment!"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 pr-24 text-sm shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            onClick={handleAddComment}
            className="absolute top-1/2 right-3 -translate-y-1/2 transform rounded-full bg-blue-700/80 px-4 py-1 text-xs text-white hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentList;
