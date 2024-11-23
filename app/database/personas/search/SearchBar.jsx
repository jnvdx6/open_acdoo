'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';

export function SearchBar({ initialSearch = '', className = '' }) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative group">
          {/* Contenedor principal con efecto de borde */}
          <div className={`
            relative rounded-2xl
            before:absolute before:inset-0
            before:rounded-2xl before:p-[2px]
            before:bg-gradient-to-r before:from-transparent before:via-transparent before:to-transparent
            before:transition-all before:duration-300
            hover:before:from-[#FF6B35]/50 hover:before:via-[#FF8C64]/50 hover:before:to-[#FF6B35]/50
            ${isFocused ? 'before:from-[#FF6B35] before:via-[#FF8C64] before:to-[#FF6B35]' : ''}
          `}>
            <div className="relative bg-white dark:bg-neutral-950 rounded-2xl">
              {/* Icono de búsqueda */}
              <div className={`
                absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none
                transition-colors duration-200
                ${isFocused ? 'text-[#FF6B35]' : 'text-gray-400'}
              `}>
                <Search className="h-5 w-5" />
              </div>
              
              {/* Input de búsqueda */}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Buscar persona por nombre o apellidos..."
                className={`
                  w-full pl-11 pr-36 py-4
                  bg-transparent
                  border-2 border-neutral-200 dark:border-neutral-800
                  rounded-2xl
                  text-lg
                  placeholder:text-neutral-400
                  focus:outline-none 
                  transition-all duration-200
                  ${isFocused ? 'border-[#FF6B35]' : ''}
                  ${className}
                `}
              />

              {/* Botón de búsqueda */}
              <div className="absolute inset-y-2 right-2">
                <Button 
                  type="submit"
                  className={`
                    h-full px-6
                    bg-gradient-to-r from-[#FF6B35] to-[#FF8C64]
                    text-white
                    rounded-xl
                    flex items-center gap-2
                    hover:from-[#FF8C64] hover:to-[#FF6B35]
                    transition-all duration-200
                    shadow-lg shadow-[#FF6B35]/20
                    hover:shadow-xl hover:shadow-[#FF6B35]/30
                    hover:-translate-y-[1px]
                    active:translate-y-0
                    ${!searchTerm.trim() && 'opacity-70 cursor-not-allowed'}
                  `}
                  disabled={!searchTerm.trim()}
                >
                  <span>Buscar</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Texto de ayuda */}
      <div className="mt-2 text-center text-sm text-neutral-500">
        Ejemplo: "Pedro Sánchez" o "María García"
      </div>
    </div>
  );
}