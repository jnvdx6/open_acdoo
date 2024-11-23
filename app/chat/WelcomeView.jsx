import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import SearchInput from './SearchInput';
import { motion } from 'framer-motion';
import { Database, BrainCircuit, Search, Users } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

const FeatureCard = ({ icon: Icon, title, description, className }) => (
  <Card className="bg-white dark:bg-neutral-800 transition-colors duration-200">
    <CardContent className="pt-6">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-200 ${className}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
        {title}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
        {description}
      </p>
    </CardContent>
  </Card>
);

export default function WelcomeView({ query, setQuery, handleSearch, showOptions, setShowOptions }) {
  return (
    <ScrollArea className="h-full">
      <div className="min-h-full p-4 sm:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
              Investigación Inteligente y Transparente
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Nuestra tecnología procesa múltiples fuentes de datos para proporcionar información precisa y detallada,
              contribuyendo a una sociedad más transparente.
            </p>
          </div>

          {/* Search Card */}
          <Card className="w-full max-w-3xl mx-auto bg-white dark:bg-neutral-800 transition-colors duration-200">
            <CardContent className="p-4 sm:p-6">
              <SearchInput
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                showOptions={showOptions}
                setShowOptions={setShowOptions}
              />
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <FeatureCard
              icon={BrainCircuit}
              title="IA Avanzada"
              description="Análisis inteligente de datos mediante algoritmos de última generación"
              className="bg-blue-600 dark:bg-blue-500"
            />
            <FeatureCard
              icon={Database}
              title="Base de Datos Creciente"
              description="Cada investigación contribuye a enriquecer nuestra base de datos pública"
              className="bg-green-600 dark:bg-green-500"
            />
            <FeatureCard
              icon={Search}
              title="Búsqueda Profunda"
              description="Exploración exhaustiva de múltiples fuentes de información"
              className="bg-purple-600 dark:bg-purple-500"
            />
            <FeatureCard
              icon={Users}
              title="Impacto Colectivo"
              description="Tu participación ayuda a construir una sociedad más transparente"
              className="bg-orange-500"
            />
          </div>

          {/* Info Card */}
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/20 shrink-0 transition-colors duration-200">
                    <Search className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      ¿Cómo funciona?
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Nuestro sistema utiliza inteligencia artificial para procesar y analizar grandes volúmenes de datos
                      de múltiples fuentes. Cada búsqueda contribuye a mejorar nuestra base de datos, haciéndola más
                      completa y precisa con el tiempo.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {['Análisis en tiempo real', 'Verificación cruzada', 'Actualización continua'].map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 rounded-full text-sm text-neutral-700 dark:text-neutral-300 transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}