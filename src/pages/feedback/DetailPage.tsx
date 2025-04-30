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

<<<<<<< HEAD
    // ✅ UI 확인용 mock 데이터 적용
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
    // ✅ UI 확인용 mock 데이터 적용
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
    // ✅ UI 확인용 mock 데이터 적용
>>>>>>> 7fc6dbf (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
    // ✅ UI 확인용 mock 데이터 적용
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
>>>>>>> a2ba2f4 (feature(feedback): 피드백 페이지 및 상세 기능 구현)
    const mockData: FeedbackDetail = {
      id: Number(id),
      title: 'Perfect Rhythm',
      artist: 'Oasis',
      score: 92,
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> a2ba2f4 (feature(feedback): 피드백 페이지 및 상세 기능 구현)
      createdAt: '2025-04-01T12:00:00Z',
    };

    setData(mockData); // ✅ 바로 설정
    setLoading(false);
<<<<<<< HEAD
=======
=======
=======
>>>>>>> 7fc6dbf (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
      message: 'Excellent timing and flow!',
      createdAt: '2025-04-01T12:00:00Z',
    };

    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 500);
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
>>>>>>> 7fc6dbf (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
>>>>>>> a2ba2f4 (feature(feedback): 피드백 페이지 및 상세 기능 구현)

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

<<<<<<< HEAD
  const { title, score } = data;
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const { title, score } = data;
=======
  const { title, score, message } = data;
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
  const { title, score, message } = data;
>>>>>>> 7fc6dbf (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
  const { title, score, message } = data;
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
>>>>>>> a2ba2f4 (feature(feedback): 피드백 페이지 및 상세 기능 구현)

  return (
    <PageLayout title={title}>
      <div className="flex flex-col items-center justify-center gap-8 px-4 pt-4 drop-shadow-lg md:px-0">
<<<<<<< HEAD
        <ScoreCard score={score} />
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <ScoreCard score={score} />
=======
        <ScoreCard score={score} message={message} />
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
        <ScoreCard score={score} message={message} />
>>>>>>> 7fc6dbf (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
        <ScoreCard score={score} message={message} />
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
>>>>>>> a2ba2f4 (feature(feedback): 피드백 페이지 및 상세 기능 구현)
        <FeedbackActions />
      </div>
    </PageLayout>
  );
}

export default FeedbackDetailPage;
