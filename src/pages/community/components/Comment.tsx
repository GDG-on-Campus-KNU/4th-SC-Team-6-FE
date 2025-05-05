interface CommentProps {
  author: string;
  text: string;
}

function Comment({ author, text }: CommentProps) {
  return (
    <li className="py-2 text-sm text-gray-700 sm:text-sm md:text-base">
      <span className="font-semibold">{author}:</span> {text}
    </li>
  );
}

export default Comment;
