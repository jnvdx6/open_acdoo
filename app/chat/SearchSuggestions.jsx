import React from 'react';
import { Button } from "@/components/ui/button";
import { Building2, Users, Book, Vote } from 'lucide-react';

const suggestions = [
  {
    icon: Building2,
    text: "¿Qué empresas están vinculadas a...?",
    category: "Entidades"
  },
  {
    icon: Users,
    text: "¿Quiénes son los principales responsables de...?",
    category: "Personas"
  },
  {
    icon: Book,
    text: "¿Qué legislación regula...?",
    category: "Leyes"
  },
  {
    icon: Vote,
    text: "¿Cómo se ha votado sobre...?",
    category: "Votaciones"
  }
];

export default function SearchSuggestions({ onSuggestionClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          className="flex items-center justify-start gap-3 h-auto p-4 
            hover:bg-neutral-50 dark:hover:bg-neutral-800
            hover:border-[#FF6B35] 
            transition-all group
            dark:border-neutral-700"
          onClick={() => onSuggestionClick(suggestion.text)}
        >
          <div className="w-8 h-8 rounded-lg 
            bg-neutral-100 dark:bg-neutral-800
            flex items-center justify-center 
            group-hover:bg-[#FF6B35] 
            transition-colors">
            <suggestion.icon className="w-4 h-4 
              text-neutral-500 dark:text-neutral-400
              group-hover:text-white" />
          </div>
          <div className="text-left">
            <p className="font-medium text-sm 
              text-neutral-900 dark:text-neutral-100">
              {suggestion.text}
            </p>
            <span className="text-xs 
              text-neutral-500 dark:text-neutral-400">
              {suggestion.category}
            </span>
          </div>
        </Button>
      ))}
    </div>
  );
}