import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative mb-4 flex justify-center">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="w-full max-w-[329px] rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={value}
        onChange={onChange}
      />
      <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-gray-500" />
    </div>
  );
}
