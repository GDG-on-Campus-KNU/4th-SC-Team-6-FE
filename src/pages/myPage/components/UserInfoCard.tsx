export interface UserInfoCardProps {
  name: string;
}

export default function UserInfoCard({ name }: UserInfoCardProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-white/30 p-4 drop-shadow backdrop-blur-sm sm:flex-row sm:justify-between sm:p-6">
      <div className="text-center sm:text-left">
        <p className="mb-4 text-lg font-extrabold tracking-wide text-white drop-shadow-lg sm:text-2xl">
          Welcome!
        </p>
        <p className="mt-1 text-3xl font-extrabold tracking-wide text-gray-700 drop-shadow-md sm:text-4xl">
          {name}
        </p>
      </div>
    </div>
  );
}
