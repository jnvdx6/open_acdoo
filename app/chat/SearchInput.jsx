import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import AdvancedOptions from './AdvancedOptions';

const vibrantOrange = "#FF6B35";
const darkVibrantOrange = "#ff8555";

export default function SearchInput({ query, setQuery, handleSearch, showOptions, setShowOptions }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative flex items-center">
        <Search 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none z-10" 
          size={20} 
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Haz una pregunta o inicia una investigación..."
          className="w-full pl-10 h-14 text-base sm:text-lg 
            bg-white dark:bg-neutral-800
            text-neutral-900 dark:text-neutral-100
            placeholder:text-neutral-400 dark:placeholder:text-neutral-500
            border-neutral-200 dark:border-neutral-700
            focus-visible:ring-2 focus-visible:ring-[#FF6B35] dark:focus-visible:ring-[#ff8555]
            hover:border-neutral-300 dark:hover:border-neutral-600
            transition-all duration-200"
        />
      </div>
      <div className="flex gap-3">
        <Button 
          onClick={() => handleSearch(query)} 
          size="lg" 
          className="flex-1 text-white 
            bg-[#FF6B35] hover:bg-[#ff8555] 
            dark:bg-[#FF6B35] dark:hover:bg-[#ff8555]
            transition-colors duration-200
            shadow-sm hover:shadow-md"
        >
          <Search className="mr-2 h-5 w-5" />
          Buscar
        </Button>
{/*         <Button
          variant="outline"
          className="border-neutral-200 dark:border-neutral-700
            text-neutral-700 dark:text-neutral-300
            hover:border-[#FF6B35] dark:hover:border-[#ff8555]
            hover:bg-orange-50 dark:hover:bg-orange-900/20
            transition-colors duration-200"
          onClick={() => setShowOptions(prev => !prev)}
        >
          <span className="hidden sm:inline">Opciones Avanzadas</span>
          <span className="sm:hidden">Opciones</span>
        </Button> */}
      </div>
    </div>
  );
}