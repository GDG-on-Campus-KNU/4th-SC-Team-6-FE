import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ScoreCardProps {
  score: number;
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

// 점수 카드 UI 컴포넌트
// - CircularProgressbar를 사용해 원형 그래프로 점수 시각화
// - 애니메이션 효과로 점수가 0부터 score까지 올라가도록 구성
function ScoreCard({ score }: ScoreCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedScore((prev) => {
        if (prev < score) return prev + 1;
        clearInterval(interval);
        return score;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [score]);

  const getMessage = () => {
    const found = messages.find((item) => score >= item.minScore);
    return found?.message ?? '';
  };

  return (
    <div className="w-full max-w-xs rounded-3xl bg-white/70 px-6 py-10 text-center shadow-lg md:max-w-md">
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
      <p className="text-xl font-bold md:text-2xl">{getMessage()}</p>
      <p className="text-sm text-gray-800 md:text-base">
        You got {score} points!
      </p>
    </div>
  );
}

export default ScoreCard;
