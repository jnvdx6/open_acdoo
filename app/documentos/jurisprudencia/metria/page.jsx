"use client"
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import WelcomeView from './WelcomeView';
import AnalysisView from './AnalysisView';

const JuristAnalytics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  // Mock data for testing
  const mockAnalysisData = {
    resolutionTime: [
      { month: 'Ene', time: 45 },
      { month: 'Feb', time: 42 },
      { month: 'Mar', time: 48 },
      { month: 'Abr', time: 39 },
      { month: 'May', time: 41 },
      { month: 'Jun', time: 44 },
    ],
    complexity: [
      { level: 'Alta', value: 35 },
      { level: 'Media', value: 45 },
      { level: 'Baja', value: 20 },
    ],
    impact: [
      { month: 'Ene', citations: 24, impact: 75 },
      { month: 'Feb', citations: 28, impact: 80 },
      { month: 'Mar', citations: 32, impact: 85 },
      { month: 'Abr', citations: 26, impact: 78 },
      { month: 'May', citations: 29, impact: 82 },
      { month: 'Jun', citations: 31, impact: 88 },
    ],
  };

  const handleSearch = async (query) => {
    if (!query) return;
    
    setIsLoading(true);
    setShowResults(false);

    // Simulando llamada a la API
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setAnalysisData(mockAnalysisData);
    setIsLoading(false);
    setShowResults(true);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-neutral-900">
        <div className="space-y-4 text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#FF6B35] mx-auto" />
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
              Analizando datos judiciales
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Procesando métricas y patrones de resolución...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!showResults) {
    return <WelcomeView onSearch={handleSearch} />;
  }

  return <AnalysisView data={analysisData} />;
};

export default JuristAnalytics;