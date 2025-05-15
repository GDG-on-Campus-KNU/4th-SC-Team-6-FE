import { useState } from 'react';
import PageLayout from '../../../components/PageLayout';
import { createPost } from '../../../apis/community';

function WritePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('제목과 내용을 입력해주세요!');
      return;
    }

    const token = localStorage.getItem('token') || '';

    try {
      await createPost(
        {
          title,
          content: description,
          author: 'John', // TODO: 추후 사용자 닉네임이나 id로 변경 예정
        },
        token
      );
      alert('게시글이 성공적으로 작성되었습니다!');
    } catch (error) {
      console.error('게시글 작성 실패', error);
      alert('게시글 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <PageLayout title="Write Post">
      <form
        onSubmit={(e) => {
          void handleSubmit(e); 
        }}
        className="mx-auto flex w-full max-w-lg flex-col gap-6 p-4 drop-shadow-lg sm:max-w-xl md:max-w-2xl md:p-8"
      >
        <input
          type="text"
          placeholder="Please enter the title."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white/70 px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none md:text-base"
        />

        <textarea
          placeholder="Please enter your details."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-40 w-full resize-none rounded-md border border-gray-300 bg-white/70 px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none md:h-60 md:text-base"
        />

        <button
          type="submit"
          className="rounded-md bg-blue-700/70 px-4 py-2 text-white shadow-md hover:bg-blue-600"
        >
          Post
        </button>
      </form>
    </PageLayout>
  );
}

export default WritePage;
