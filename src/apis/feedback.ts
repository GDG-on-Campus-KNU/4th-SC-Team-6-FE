import axios from 'axios';

// 상세 타입
export interface FeedbackDetail {
  id: number;
  title: string;
  artist: string;
  score: number;
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
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await axios.get<FeedbackSummary[]>(
    `${apiBaseUrl}/api/feedback`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
