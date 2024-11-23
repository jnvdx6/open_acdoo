import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

export default function LoadingResults() {
  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardContent className="p-6 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-neutral-200 dark:border-neutral-700 animate-pulse" />
              <Loader2 className="w-6 h-6 text-[#FF6B35] animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="text-center">
              <p className="font-medium text-neutral-800 dark:text-neutral-100">
                Analizando información
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Esto puede tomar unos segundos...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-full animate-pulse" />
                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6 animate-pulse" />
                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-4/6 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}