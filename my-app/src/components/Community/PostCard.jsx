export default function PostCard({ post, onClick }) {
  return (
    <div
      className="mb-4 cursor-pointer rounded-xl bg-white/70 p-4 shadow-md"
      onClick={onClick}
    >
      <h2 className="text-lg font-bold text-black">{post.title}</h2>
      <p className="mt-1 line-clamp-2 text-sm text-gray-700">{post.preview}</p>
    </div>
  );
}
