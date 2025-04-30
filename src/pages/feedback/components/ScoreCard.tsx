import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ScoreCardProps {
  score: number;
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> a2ba2f4 (feature(feedback): 피드백 페이지 및 상세 기능 구현)
}

const messages = [
  { minScore: 95, message: 'Wonderful! You played beautifully 🌟' },
  { minScore: 85, message: 'Amazing! Just a few small tweaks needed 🎶' },
  { minScore: 75, message: 'Great effort! Keep it up 🎵' },
  { minScore: 65, message: "Nice try! You're getting better every time 👍" },
  { minScore: 50, message: 'Good start! Practice will make it even better ✨' },
  { minScore: 30, message: 'Keep going! Every note counts 🎹' },
  { minScore: 10, message: "Don't worry, it's all about learning 🎧" },
  { minScore: 0, message: "Let's try again together 🤗" },
];

function ScoreCard({ score }: ScoreCardProps) {
<<<<<<< HEAD
=======
=======
=======
>>>>>>> 7fc6dbf (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
  message: string;
}

// 점수 카드 UI 컴포넌트
// - CircularProgressbar를 사용해 원형 그래프로 점수 시각화
// - 애니메이션 효과로 점수가 0부터 score까지 올라가도록 구성
function ScoreCard({ score, message }: ScoreCardProps) {
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
>>>>>>> 7fc6dbf (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
>>>>>>> a2ba2f4 (feature(feedback): 피드백 페이지 및 상세 기능 구현)
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedScore((prev) => {
        if (prev < score) return prev + 1;
        clearInterval(interval);
        return score;
      });
<<<<<<< HEAD
    }, 10);
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    }, 10);
=======
    }, 10); // 10ms 간격으로 1씩 증가
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
    }, 10); // 10ms 간격으로 1씩 증가
>>>>>>> 7fc6dbf (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
    }, 10); // 10ms 간격으로 1씩 증가
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
>>>>>>> a2ba2f4 (feature(feedback): 피드백 페이지 및 상세 기능 구현)

    return () => clearInterval(interval);
  }, [score]);

<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> a2ba2f4 (feature(feedback): 피드백 페이지 및 상세 기능 구현)
  const getMessage = () => {
    const found = messages.find((item) => score >= item.minScore);
    return found?.message ?? '';
  };

  return (
    <div className="w-full max-w-xs rounded-3xl bg-white/70 px-6 py-10 text-center shadow-lg md:max-w-md">
<<<<<<< HEAD
=======
=======
  return (
    <div className="w-full max-w-xs rounded-3xl bg-white/70 px-6 py-10 text-center shadow-lg md:max-w-md">
      {/* 원형 점수 그래프 영역 */}
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
  return (
    <div className="w-full max-w-xs rounded-3xl bg-white/70 px-6 py-10 text-center shadow-lg md:max-w-md">
      {/* 원형 점수 그래프 영역 */}
>>>>>>> 7fc6dbf (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
  return (
    <div className="w-full max-w-xs rounded-3xl bg-white/70 px-6 py-10 text-center shadow-lg md:max-w-md">
      {/* 원형 점수 그래프 영역 */}
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
>>>>>>> a2ba2f4 (feature(feedback): 피드백 페이지 및 상세 기능 구현)
      <div className="mx-auto mb-6 h-36 w-36 md:h-44 md:w-44">
        <CircularProgressbar
          value={animatedScore}
          text={`${animatedScore}`}
          styles={buildStyles({
            pathColor: '#3ddad7',
            textColor: '#1f2937',
            trailColor: '#e0e0e0',
            textSize: '30px',
            pathTransitionDuration: 0.5,
            strokeLinecap: 'round',
          })}
        />
      </div>
<<<<<<< HEAD
      <p className="text-xl font-bold md:text-2xl">{getMessage()}</p>
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      <p className="text-xl font-bold md:text-2xl">{getMessage()}</p>
=======
      <p className="text-xl font-bold md:text-2xl">{message}</p>
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
      <p className="text-xl font-bold md:text-2xl">{message}</p>
>>>>>>> 7fc6dbf (feature(feedback): 피드백 페이지 및 상세 기능 구현)
=======
      <p className="text-xl font-bold md:text-2xl">{message}</p>
>>>>>>> 1c69cda (feature(feedback): 피드백 페이지 및 상세 기능 구현)
>>>>>>> a2ba2f4 (feature(feedback): 피드백 페이지 및 상세 기능 구현)
      <p className="text-sm text-gray-800 md:text-base">
        You got {score} points!
      </p>
    </div>
  );
}

export default ScoreCard;
