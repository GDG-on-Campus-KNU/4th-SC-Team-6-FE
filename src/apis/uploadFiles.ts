import axios from 'axios';
export interface UploadResponse {
  success: boolean;
  fileUrls: {
    audio: string;
    video: string;
  };
}

export async function uploadFiles(
  audioBlob: Blob,
  videoBlob: Blob
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'audio.webm');
  formData.append('video', videoBlob, 'video.webm');

  try {
    const res = await axios.post<UploadResponse>('/api/music', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return res.data;
  } catch (error) {
    console.error('파일 업로드 실패:', error);
    throw new Error('업로드에 실패했습니다.');
  }
}
