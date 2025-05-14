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

  try {
    const res = await axios.post('/api/music', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      validateStatus: (status) => status === 201,
    });

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
  } catch (error) {
    console.error('파일 업로드 실패:', error);
    throw new Error('업로드에 실패했습니다.');
  }
}
