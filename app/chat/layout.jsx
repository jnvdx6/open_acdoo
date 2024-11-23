"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeView from './WelcomeView';
import SearchResults from './SearchResults';
import ChatInput from './ChatInput';
import LoadingResults from './LoadingResults';

export default function SearchLayout() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const height = window.innerHeight - containerRef.current.offsetTop;
        setContainerHeight(height);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handleSearch = async (searchQuery) => {
    if (searchQuery.trim() === '') return;
    
    try {
      setIsLoading(true);
      const results = await getSearchResults(searchQuery);
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      // Aquí podrías manejar el error mostrando una notificación
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUp = async (followUpQuery) => {
    try {
      setIsLoading(true);
      const newResults = await getSearchResults(followUpQuery);
      setSearchResults(prevResults => [...prevResults, ...newResults]);
    } catch (error) {
      console.error('Error en la búsqueda de seguimiento:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSearchResults = async (query) => {
    // Simulated search and AI response
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { type: 'query', content: query },
      { 
        type: 'ai-response', 
        content: `# Análisis sobre "${query}"\n\n## Resumen\nAquí va un resumen del análisis...\n\n## Detalles\n- Punto 1\n- Punto 2\n- Punto 3\n\n## Conclusión\nEsta es la conclusión del análisis...` 
      },
      { 
        type: 'source', 
        title: 'Fuente 1', 
        url: 'https://ejemplo.com/1', 
        snippet: 'Extracto relevante de la fuente 1...' 
      },
      { 
        type: 'source', 
        title: 'Fuente 2', 
        url: 'https://ejemplo.com/2', 
        snippet: 'Extracto relevante de la fuente 2...' 
      },
      { 
        type: 'entity', 
        name: 'Entidad Ejemplo', 
        type: 'Organización', 
        description: 'Breve descripción de la entidad...', 
        relevance: 'Alta' 
      },
      { 
        type: 'person', 
        name: 'Persona Ejemplo', 
        role: 'CEO', 
        organization: 'Empresa Ejemplo', 
        relevance: 'Media' 
      },
    ];
  };

  return (
    <div 
      ref={containerRef}
      className="flex flex-col relative bg-neutral-50 dark:bg-neutral-900 transition-colors duration-200"
      style={{ height: `${containerHeight}px` }}
    >
      <div className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <LoadingResults />
            </motion.div>
          ) : !showResults ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <WelcomeView
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                showOptions={showOptions}
                setShowOptions={setShowOptions}
              />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <SearchResults
                searchResults={searchResults}
                setShowResults={setShowResults}
                isLoading={isLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {showResults && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ChatInput 
            onSend={handleFollowUp}
            disabled={isLoading}
          />
        </motion.div>
      )}
    </div>
  );
}