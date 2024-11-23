import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const ContentOutline = ({ content, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const headers = React.useMemo(() => {
    const result = [];
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      if (line.startsWith('###') || line.startsWith('**')) {
        const level = line.startsWith('###') ? 3 : 1;
        const text = line.replace(/^###\s+|^\*\*|\*\*$/g, '').trim();
        if (text) {
          result.push({ level, text, index });
        }
      }
    });
    
    return result;
  }, [content]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700">
        <span className="font-semibold text-[#2C3E50] dark:text-white">Contenido del Documento</span>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ScrollArea className="h-[300px] mt-2">
          <div className="space-y-1 p-2">
            {headers.map((header, index) => (
              <button
                key={index}
                onClick={() => onNavigate(header.index)}
                className={`flex items-center w-full p-2 rounded-lg text-left hover:bg-[#FF6B35] hover:bg-opacity-10 transition-colors
                  ${header.level === 3 ? 'pl-6 text-sm' : 'font-medium'}`}
              >
                <ChevronRight className="h-4 w-4 mr-2 text-[#FF6B35]" />
                <span>{header.text}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  );
};