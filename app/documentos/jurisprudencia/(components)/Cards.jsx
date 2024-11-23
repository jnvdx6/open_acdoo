import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, GavelIcon, Brain, FileText, ChartBar, Users, Percent, AlertTriangle, Database } from 'lucide-react';

export function StatsCard({ uniqueCasesCount }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Estadísticas Generales
        </CardTitle>
        <Brain className="h-4 w-4 text-[#FF6B35]" />
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-4xl font-bold text-[#FF6B35]">9,347,582</p>
              <p className="text-sm text-muted-foreground">
                Documentos jurídicos totales
              </p>
            </div>
            <FileText className="h-8 w-8 text-[#FF6B35]" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-[#FF6B35]" />
                <p className="text-sm font-medium">Análisis IA</p>
              </div>
              <p className="text-2xl font-bold text-[#FF6B35]">87.3%</p>
              <p className="text-xs text-muted-foreground">
                8.2M docs. analizados
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-[#FF6B35]" />
                <p className="text-sm font-medium">Tokens</p>
              </div>
              <p className="text-2xl font-bold text-[#FF6B35]">279B</p>
              <p className="text-xs text-muted-foreground">
                Tokens procesados
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function MetricsCard({ avgProbabilidadDelito, avgComplejidad, avgImpactoSocial }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Métricas de Análisis
        </CardTitle>
        <GavelIcon className="h-4 w-4 text-[#FF6B35]" />
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Civil section based on image data */}
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-[#FF6B35]" />
                <p className="text-sm font-medium">Civil</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#FF6B35] h-2.5 rounded-full" style={{width: '45%'}}></div>
                </div>
                <span className="text-xl font-bold text-[#FF6B35]">2.6M</span>
              </div>
            </div>
          </div>

          {/* Penal section */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <GavelIcon className="h-4 w-4 text-[#FF6B35]" />
                  <p className="text-sm font-medium">Penal</p>
                </div>
                <p className="text-xl font-bold text-[#FF6B35]">1.7M</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#FF6B35] h-2 rounded-full" style={{width: '35%'}}></div>
              </div>
            </div>

            {/* Contencioso section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#FF6B35]" />
                  <p className="text-sm font-medium">Contencioso</p>
                </div>
                <p className="text-xl font-bold text-[#FF6B35]">1.9M</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#FF6B35] h-2 rounded-full" style={{width: '38%'}}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-4 border-t">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Social</p>
              <p className="text-sm font-bold text-[#FF6B35]">1.4M</p>
            </div>
            <div className="text-center border-l">
              <p className="text-xs text-muted-foreground">Militar</p>
              <p className="text-sm font-bold text-[#FF6B35]">14K</p>
            </div>
            <div className="text-center border-l">
              <p className="text-xs text-muted-foreground">Especial</p>
              <p className="text-sm font-bold text-[#FF6B35]">2.2K</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}