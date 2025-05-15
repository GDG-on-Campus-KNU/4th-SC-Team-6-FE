import axios from 'axios';

export interface UploadResponse {
  success: boolean;
  location: string;
}

export async function uploadFiles(
  audioBlob: Blob,
  videoBlob: Blob
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'audio.webm');
  formData.append('video', videoBlob, 'video.webm');
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  try {
    const res = await axios.post(`${apiBaseUrl}/api/music`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      validateStatus: (status) => status === 201,
    });
    console.log('응답 전체:', res);
    let location = res.headers['location'] as string;

    if (!location) {
      throw new Error('Location 헤더가 없습니다.');
    }

    if (location.startsWith('/')) {
      location = new URL(location, window.location.origin).toString();
    }

    return {
      success: true,
      location,
    };
  } catch (error: unknown) {
    // console.error('파일 업로드 실패:', error);
    // throw new Error('업로드에 실패했습니다.');
    if (axios.isAxiosError(error)) {
      console.error('Axios 오류:', error.message);
      if (error.response) {
        console.error('응답 상태:', error.response.status);
        console.error('응답 데이터:', error.response.data);
      } else if (error.request) {
        console.error('요청은 갔지만 응답 없음:', error.request);
      } else {
        console.error('기타 오류:', error.message);
      }
    }
    throw new Error('파일 업로드 중 오류가 발생했습니다.');
  }
}
