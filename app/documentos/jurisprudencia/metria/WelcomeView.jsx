"use client"
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Database, BrainCircuit, Users, Gavel } from 'lucide-react';
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

const WelcomeView = ({ onSearch }) => {
  return (
    <ScrollArea className="h-full">
      <div className="min-h-full p-4 sm:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#FF6B35]">
              Análisis Jurimétrico Avanzado
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Explore métricas detalladas y análisis profundo sobre la actividad judicial
              de magistrados y tribunales en España.
            </p>
          </div>

          {/* Search Card */}
          <Card className="w-full max-w-3xl mx-auto bg-white dark:bg-neutral-800">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Buscar magistrado/a por nombre o tribunal..."
                  className="pl-10 h-12"
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={BrainCircuit}
              title="IA Avanzada"
              description="Análisis inteligente mediante algoritmos de última generación"
              className="bg-[#FF6B35]"
            />
            <FeatureCard
              icon={Database}
              title="Datos Exhaustivos"
              description="Base de datos completa de resoluciones judiciales"
              className="bg-[#FF8C61]"
            />
            <FeatureCard
              icon={Gavel}
              title="Análisis Jurídico"
              description="Evaluación detallada de criterios y fundamentación"
              className="bg-[#FF6B35]"
            />
            <FeatureCard
              icon={Users}
              title="Transparencia"
              description="Contribuyendo a una justicia más transparente"
              className="bg-[#FF8C61]"
            />
          </div>

          {/* Info Section */}
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="p-3 rounded-lg bg-[#FF6B35]/10">
                  <BrainCircuit className="w-6 h-6 text-[#FF6B35]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-[#FF6B35]">
                    ¿Cómo funciona?
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Nuestro sistema analiza miles de resoluciones judiciales para proporcionar
                    métricas precisas sobre el desempeño judicial. Cada análisis incluye
                    estadísticas detalladas, patrones de decisión y tendencias jurisprudenciales.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['Análisis en tiempo real', 'Verificación cruzada', 'Métricas avanzadas'].map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-[#FF6B35]/10 text-[#FF6B35] rounded-full text-sm"
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
    </ScrollArea>
  );
};

export default WelcomeView;