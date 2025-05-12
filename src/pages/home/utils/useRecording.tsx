import { useRef } from 'react';
import { uploadFiles } from '../../../apis/uploadFiles';

export default function useRecording(
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) {
  const audioChunks = useRef<Blob[]>([]);
  const videoChunks = useRef<Blob[]>([]);
  const audioRecorder = useRef<MediaRecorder | null>(null);
  const videoRecorder = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  if (!canvasRef.current)
    return { startRecording: () => {}, stopRecording: () => {} };

  const startRecording = async () => {
    if (!canvasRef?.current) return;

    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    audioStreamRef.current = audioStream;

    const canvasStream = canvasRef.current.captureStream();

    audioRecorder.current = new MediaRecorder(audioStream);
    videoRecorder.current = new MediaRecorder(
      new MediaStream([...audioStream.getTracks(), ...canvasStream.getTracks()])
    );

    audioRecorder.current.ondataavailable = (e) =>
      audioChunks.current.push(e.data);
    videoRecorder.current.ondataavailable = (e) =>
      videoChunks.current.push(e.data);

    audioRecorder.current.start();
    videoRecorder.current.start();
  };

  const stopRecording = () => {
    if (audioRecorder.current) {
      audioRecorder.current.onstop = handleUpload;
      audioRecorder.current.stop();
    }

    if (videoRecorder.current) {
      videoRecorder.current.onstop = handleUpload;
      videoRecorder.current.stop();
    }
  };

  const handleUpload = async () => {
    const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
    const videoBlob = new Blob(videoChunks.current, { type: 'video/webm' });

    const confirmSave = window.confirm('저장하시겠습니까?');
    if (confirmSave) {
      try {
        const result = await uploadFiles(audioBlob, videoBlob);
        console.log('업로드 성공:', result);
      } catch (err) {
        console.error('업로드 실패:', err);
      }
    }

    audioChunks.current = [];
    videoChunks.current = [];
    audioStreamRef.current?.getTracks().forEach((t) => t.stop());
  };

  return {
    startRecording,
    stopRecording,
  };
}

// import { useRef } from 'react';

// export default function useRecording(
//   canvasRef: React.RefObject<HTMLCanvasElement | null>
// ) {
//   const audioChunks = useRef<Blob[]>([]);
//   const videoChunks = useRef<Blob[]>([]);
//   const audioRecorder = useRef<MediaRecorder | null>(null);
//   const videoRecorder = useRef<MediaRecorder | null>(null);
//   const audioStreamRef = useRef<MediaStream | null>(null);

//   const startRecording = async () => {
//     if (!canvasRef.current) return;

//     const audioStream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//     });
//     audioStreamRef.current = audioStream;
//     const canvasStream = canvasRef.current.captureStream();

//     const audio = new MediaRecorder(audioStream);
//     const video = new MediaRecorder(
//       new MediaStream([
//         ...audioStream.getTracks(),
//         ...canvasStream.getTracks(),
//       ]),
//       { mimeType: 'video/webm;codecs=vp9,opus' }
//     );

//     audioRecorder.current = audio;
//     videoRecorder.current = video;

//     audio.ondataavailable = (e) => {
//       if (e.data.size > 0) audioChunks.current.push(e.data);
//     };
//     video.ondataavailable = (e) => {
//       if (e.data.size > 0) videoChunks.current.push(e.data);
//     };

//     audio.start();
//     video.start();
//   };

//   const stopRecording = () => {
//     if (audioRecorder.current) {
//       audioRecorder.current?.stop();
//       videoRecorder.current?.stop();
//     }
//     if (videoRecorder.current) {
//       audioRecorder.current!.onstop = previewAudio;
//       videoRecorder.current.onstop = previewVideo;
//     }

//     audioStreamRef.current?.getTracks().forEach((track) => track.stop());
//   };

//   const previewAudio = () => {
//     const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
//     const audioUrl = URL.createObjectURL(audioBlob);

//     const audio = document.createElement('audio');
//     audio.src = audioUrl;
//     audio.controls = true;
//     document.body.appendChild(audio);

//     const link = document.createElement('a');
//     link.href = audioUrl;
//     link.download = 'audio.webm';
//     link.textContent = 'Download Audio (webm)';
//     document.body.appendChild(link);
//   };

//   const previewVideo = () => {
//     const videoBlob = new Blob(videoChunks.current, { type: 'video/webm' });
//     const videoUrl = URL.createObjectURL(videoBlob);

//     const video = document.createElement('video');
//     video.src = videoUrl;
//     video.controls = true;
//     video.width = 400;
//     document.body.appendChild(video);

//     const link = document.createElement('a');
//     link.href = videoUrl;
//     link.download = 'video.webm';
//     link.textContent = 'Download Video (webm)';
//     document.body.appendChild(link);
//   };

//   return {
//     startRecording,
//     stopRecording,
//   };
// }
