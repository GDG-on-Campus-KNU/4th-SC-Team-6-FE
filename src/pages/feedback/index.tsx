import { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import MusicCard from './components/MusicCard';
import { fetchFeedbackList, FeedbackSummary } from '../../apis/feedback';

function FeedbackPage() {
  // ✅ UI 확인용 mock 데이터
  const mockData: FeedbackSummary[] = [
    { id: 1, title: 'Live Forever Cover', artist: 'unknown' },
    { id: 2, title: 'Supersonic Cover', artist: 'unknown' },
    { id: 3, title: 'Whatever Cover', artist: 'unknown' },
    { id: 4, title: 'Live Forever Cover', artist: 'unknown' },
  ];

  const [musicList, setMusicList] = useState<FeedbackSummary[]>(mockData);
  const [loading, setLoading] = useState(false);

  /*
  // 실제 API 연동 시 사용
  useEffect(() => {
    const token = localStorage.getItem('token') || '';

    fetchFeedbackList(token)
      .then((res) => setMusicList(res))
      .catch((err) => console.error('피드백 목록 가져오기 실패:', err))
      .finally(() => setLoading(false));
  }, []);
  */

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (musicList.length === 0) {
    return <div className="text-center text-white">No feedback found.</div>;
  }

  return (
    <PageLayout title="Perfect Rhythm">
      <div className="grid grid-cols-2 justify-center gap-4 px-4 py-6">
        {musicList.map((music, index) => (
          <MusicCard
            key={music.id}
            id={music.id}
            title={music.title}
            artist={music.artist}
            offset={index % 2 === 0 ? '-translate-y-2' : 'translate-y-2'}
          />
        ))}
      </div>
    </PageLayout>
  );
}

export default FeedbackPage;
