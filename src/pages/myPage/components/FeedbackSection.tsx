export interface Feedback {
  id: number;
  title: string;
  score: number;
}

export interface FeedbacksSectionProps {
  feedbacks: Feedback[];
}

export default function FeedbacksSection({ feedbacks }: FeedbacksSectionProps) {
  return (
    <section className="rounded-2xl bg-white/30 p-4 backdrop-blur-sm sm:p-6">
      <p className="mb-4 text-lg font-extrabold tracking-wide text-white drop-shadow-lg sm:text-2xl">
        My Feedbacks
      </p>
      <ul className="space-y-2">
        {feedbacks.map((fb) => (
          <li
            key={fb.id}
            className="flex items-center justify-between rounded-full bg-white/80 px-4 py-2 drop-shadow sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-2"
          >
            <span className="text-sm text-gray-800 sm:text-base">
              {fb.title}
            </span>
            <span className="inline-block rounded-full bg-teal-300 px-4 py-2 text-xs font-semibold text-gray-800 transition-colors duration-150 hover:bg-teal-400 hover:shadow-lg sm:text-sm">
              {fb.score}%
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
