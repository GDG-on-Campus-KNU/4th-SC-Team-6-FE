import { useState, useCallback, ChangeEvent } from 'react';
import { MdSearch } from 'react-icons/md';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState<string>('');

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      onSearch(value);
    },
    [onSearch]
  );

  return (
    <div className="flex w-full items-center justify-center px-4 py-4">
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl">
        <input
          type="text"
          placeholder="Please insert search keywords!"
          value={query}
          onChange={handleSearch}
          className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 pr-10 text-sm shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none md:text-base"
        />
        <MdSearch
          size={20}
          className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-600 hover:text-blue-500 sm:size-5 md:size-6"
          onClick={() => onSearch(query)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
