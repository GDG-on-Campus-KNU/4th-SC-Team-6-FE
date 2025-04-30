import axios from 'axios';

// 상세 타입
export interface FeedbackDetail {
  id: number;
  title: string;
  artist: string;
  score: number;
<<<<<<< HEAD
=======
  message: string;
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
  createdAt: string;
}

// 요약 리스트 타입
export interface FeedbackSummary {
  id: number;
  title: string;
  artist: string;
}

// 상세 API 호출
export async function fetchFeedbackDetail(
  id: number,
  token: string
): Promise<FeedbackDetail> {
  const response = await axios.get<FeedbackDetail>(`/api/feedback/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// 리스트 API 호출
export async function fetchFeedbackList(
  token: string
): Promise<FeedbackSummary[]> {
  const response = await axios.get<FeedbackSummary[]>(`/api/feedback`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
