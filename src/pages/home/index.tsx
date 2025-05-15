import Animation3D from './components/Animation3D';

export default function Home() {
  return (
    <div className="mt-[-15px] mb-[40px] flex h-screen w-full flex-col items-center justify-center">
      <h1 className="z-10 mb-2 text-4xl font-bold text-white italic">
        THE FEELODY
      </h1>
      <p className="z-10 mt-[-10px] text-lg font-bold text-white italic">
        Feel your music, Feel it your way
      </p>
      <Animation3D />
    </div>
  );
}
