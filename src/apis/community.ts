import axios from 'axios';

// 게시글 기본 타입
export interface Post {
  id: number;
  title: string;
  description: string;
}

// 게시글 목록 (페이징 포함)
export interface PostListResponse {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  posts: Post[];
}

// 게시글 상세 댓글 타입
export interface Comment {
  commentId: number;
  author: string;
  content: string;
  createdAt: string;
}

// 게시글 상세 타입
export interface PostDetail {
  id: number;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  comments: Comment[];
}

// 게시글 목록 불러오기
export async function fetchPosts(token: string): Promise<PostListResponse> {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await axios.get<PostListResponse>(
    `${apiBaseUrl}/api/community/post`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

// 게시글 상세 불러오기
export async function fetchPostDetail(
  id: number,
  token: string
): Promise<PostDetail> {
  const response = await axios.get<PostDetail>(`/api/community/post/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// 게시글 작성
export interface CreatePostPayload {
  title: string;
  content: string;
  author: string;
}

export async function createPost(
  data: CreatePostPayload,
  token: string
): Promise<void> {
  await axios.post('/api/community/post', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
