import { Link } from 'react-router-dom';

function FeedbackActions() {
  const buttonClass =
    'w-38 rounded-xl font-bold bg-white/70 px-5 py-3 text-center shadow-md hover:bg-gray-100';

  return (
    <div className="mt-6 flex w-full flex-row justify-center gap-4">
      {/* 피드백 페이지로 이동 */}
      <Link to="/feedback" className={buttonClass}>
        Replay
      </Link>

      {/* 직접 연락하는 기능용 버튼 */}
      <button type="button" className={buttonClass}>
        Contact
      </button>
    </div>
  );
}

export default FeedbackActions;
