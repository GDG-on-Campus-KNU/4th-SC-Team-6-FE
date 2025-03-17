import { useParams } from 'react-router-dom';

export default function PostDetail() {
  const { id } = useParams();

  return (
    <div className="mx-auto w-[393px] px-4 py-10 text-black">
      <h1 className="mb-4 text-2xl font-bold">게시글 상세 페이지</h1>
      <p>게시글 ID: {id}</p>
      {/* 실제 API 연결되면 이 ID로 fetch해서 내용 보여주기*/}
    </div>
  );
}
