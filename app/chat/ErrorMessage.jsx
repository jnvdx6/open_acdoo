import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/50">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-red-900 dark:text-red-300">
              Error en la búsqueda
            </h3>
            <p className="text-sm text-red-700 dark:text-red-400">
              {message}
            </p>
          </div>
          {onRetry && (
            <Button 
              variant="outline" 
              onClick={onRetry}
              className="border-red-200 dark:border-red-800 
                text-red-700 dark:text-red-400 
                hover:bg-red-100 dark:hover:bg-red-950
                transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Intentar de nuevo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}