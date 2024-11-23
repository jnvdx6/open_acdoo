'use client';
import { Button } from '@/components/ui/button';

export function SearchButton({ searchTerm }) {
  return (
    <Button 
      className="bg-[#FF6B35] hover:bg-[#ff8555] text-white w-fit"
      onClick={() => {
        // Aquí iría la lógica de investigación
      }}
    >
      Investigar esta persona
    </Button>
  );
}