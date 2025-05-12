export interface Play {
  id: number;
  title: string;
}

export interface PlaysSectionProps {
  plays: Play[];
}

export default function PlaysSection({ plays }: PlaysSectionProps) {
  return (
    <section className="rounded-2xl bg-white/30 p-4 drop-shadow backdrop-blur-sm sm:p-6">
      <p className="mb-4 text-lg font-extrabold tracking-wide text-white drop-shadow-lg sm:text-2xl">
        My Plays
      </p>
      <ul className="space-y-2">
        {plays.map((play) => (
          <li
            key={play.id}
            className="flex items-center justify-between rounded-full bg-white/80 px-4 py-2 drop-shadow transition-shadow duration-200 hover:shadow-lg sm:px-6 sm:py-2"
          >
            <span className="text-sm font-medium text-gray-800 sm:text-base">
              {play.title}
            </span>
            <button className="inline-block rounded-full bg-teal-300 px-4 py-2 text-xs font-semibold text-gray-800 transition-colors duration-150 hover:bg-teal-400 hover:shadow-lg sm:text-sm">
              PLAY
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
