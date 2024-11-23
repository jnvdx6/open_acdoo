"use client"
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ChevronDown, ChevronUp, Search, Scale, Brain, Book, Calendar, 
  Filter, Users, GavelIcon, FileText, Lightbulb, History , ChartBar
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

export function AdvancedSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  return (
    <div className="space-y-4 my-4">
      {/* Basic Search */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input 
            placeholder="Búsqueda por texto libre" 
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtros
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90">Buscar</Button>
      </div>

      {/* Advanced Search Panel */}
      {isExpanded && (
        <Card>
          <CardContent className="pt-6">
            <Accordion type="multiple" className="w-full">
              {/* Información Básica */}
              <AccordionItem value="basic">
                <AccordionTrigger className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Información Básica
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    <div className="space-y-2">
                      <Label>N° ROJ</Label>
                      <Input placeholder="Número ROJ" />
                    </div>
                    <div className="space-y-2">
                      <Label>ECLI</Label>
                      <Input placeholder="ECLI:ES:TS:2014:3877" />
                    </div>
                    <div className="space-y-2">
                      <Label>Ponente</Label>
                      <Input placeholder="Nombre del ponente" />
                    </div>
                    <div className="space-y-2">
                      <Label>Jurisdicción</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Todas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="civil">Civil</SelectItem>
                          <SelectItem value="penal">Penal</SelectItem>
                          <SelectItem value="contencioso">Contencioso</SelectItem>
                          <SelectItem value="social">Social</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Tipo</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sentencia">Sentencia</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectItem value="providencia">Providencia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Rango de fechas</Label>
                      <DatePickerWithRange 
                        date={dateRange}
                        setDate={setDateRange}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Análisis IA */}
              <AccordionItem value="ia-analysis">
                <AccordionTrigger className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Análisis IA
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div className="space-y-4">
                      <Label>Probabilidad de Delito</Label>
                      <div className="flex items-center gap-4">
                        <Slider 
                          defaultValue={[0, 100]} 
                          max={100} 
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label>Riesgo de Reincidencia</Label>
                      <div className="flex items-center gap-4">
                        <Slider 
                          defaultValue={[0, 100]} 
                          max={100} 
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label>Índice de Complejidad</Label>
                      <div className="flex items-center gap-4">
                        <Slider 
                          defaultValue={[0, 100]} 
                          max={100} 
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label>Impacto Social</Label>
                      <div className="flex items-center gap-4">
                        <Slider 
                          defaultValue={[0, 100]} 
                          max={100} 
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Métricas y KPIs */}
              <AccordionItem value="metrics">
                <AccordionTrigger className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <ChartBar className="h-4 w-4" />
                    Métricas y KPIs
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                    <div className="space-y-2">
                      <Label>KPI Evidencia</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Cualquiera" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">Alta</SelectItem>
                          <SelectItem value="medium">Media</SelectItem>
                          <SelectItem value="low">Baja</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>KPI Coherencia</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Cualquiera" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">Alta</SelectItem>
                          <SelectItem value="medium">Media</SelectItem>
                          <SelectItem value="low">Baja</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>KPI Fundamentación</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Cualquiera" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">Alta</SelectItem>
                          <SelectItem value="medium">Media</SelectItem>
                          <SelectItem value="low">Baja</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <Checkbox id="precedentes" />
                      <Label htmlFor="precedentes">Solo con precedentes relevantes</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="innovacion" />
                      <Label htmlFor="innovacion">Alto índice de innovación jurídica</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Elementos Específicos */}
              <AccordionItem value="specific">
                <AccordionTrigger className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Elementos Específicos
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div className="space-y-2">
                      <Label>Monto Involucrado</Label>
                      <Input type="number" placeholder="Valor mínimo" />
                    </div>
                    <div className="space-y-2">
                      <Label>Tiempo de Tramitación</Label>
                      <Input type="number" placeholder="Días máximos" />
                    </div>
                    <div className="space-y-2">
                      <Label>Cantidad de Pruebas</Label>
                      <Input type="number" placeholder="Mínimo de pruebas" />
                    </div>
                    <div className="space-y-2">
                      <Label>Recursos Presentados</Label>
                      <Input type="number" placeholder="Número de recursos" />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default AdvancedSearch;