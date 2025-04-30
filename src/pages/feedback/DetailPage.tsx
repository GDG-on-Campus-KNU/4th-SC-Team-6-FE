import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import { fetchFeedbackDetail, FeedbackDetail } from '../../apis/feedback';
import ScoreCard from './components/ScoreCard';
import FeedbackActions from './components/FeedbackActions';

function FeedbackDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<FeedbackDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    if (!id) return;

    // ✅ UI 확인용 mock 데이터 적용
    const mockData: FeedbackDetail = {
      id: Number(id),
      title: 'Perfect Rhythm',
      artist: 'Oasis',
      score: 92,
      message: 'Excellent timing and flow!',
      createdAt: '2025-04-01T12:00:00Z',
    };

    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 500);

    /* 실제 API 연동 시 주석 해제
    fetchFeedbackDetail(Number(id), token)
      .then((res) => setData(res))
      .catch((err) => console.error('Failed to fetch feedback detail:', err))
      .finally(() => setLoading(false));
    */
  }, [id]);

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (!data)
    return <div className="text-center text-red-500">Data not found</div>;

  const { title, score, message } = data;

  return (
    <PageLayout title={title}>
      <div className="flex flex-col items-center justify-center gap-8 px-4 pt-4 drop-shadow-lg md:px-0">
        <ScoreCard score={score} message={message} />
        <FeedbackActions />
      </div>
    </PageLayout>
  );
}

export default FeedbackDetailPage;
