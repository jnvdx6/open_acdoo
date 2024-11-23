import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchResultItem from './SearchResultItem';
import { Badge } from "@/components/ui/badge";

export default function SearchResults({ searchResults, setShowResults }) {
  const getResultsStats = () => {
    const stats = {
      total: searchResults.length,
      sources: searchResults.filter(r => r.type === 'source').length,
      entities: searchResults.filter(r => r.type === 'entity').length,
      persons: searchResults.filter(r => r.type === 'person').length
    };
    return stats;
  };

  const stats = getResultsStats();

  return (
    <div className="h-full overflow-hidden bg-neutral-50 dark:bg-neutral-900">
      <div className="sticky top-0 z-10 bg-white dark:bg-neutral-900 border-b dark:border-neutral-800">
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-3 px-4">
            <Button 
              variant="ghost" 
              onClick={() => setShowResults(false)} 
              className="flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:text-neutral-100"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Nueva búsqueda</span>
            </Button>
            <div className="flex items-center gap-2">
              <Badge 
                variant="secondary" 
                className="bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100"
              >
                {stats.total} resultados
              </Badge>
              <div className="hidden sm:flex gap-2">
                <Badge 
                  variant="outline" 
                  className="border-blue-200 text-blue-700 dark:border-blue-900 dark:text-blue-400"
                >
                  {stats.sources} fuentes
                </Badge>
                <Badge 
                  variant="outline" 
                  className="border-green-200 text-green-700 dark:border-green-900 dark:text-green-400"
                >
                  {stats.entities} entidades
                </Badge>
                <Badge 
                  variant="outline" 
                  className="border-purple-200 text-purple-700 dark:border-purple-900 dark:text-purple-400"
                >
                  {stats.persons} personas
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="container mx-auto px-4 py-6">
          <AnimatePresence initial={false}>
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <SearchResultItem result={result} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </ScrollArea>
    </div>
  );
}