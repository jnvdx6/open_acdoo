import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Settings, Info } from 'lucide-react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger,
  TooltipProvider 
} from "@/components/ui/tooltip";

const SliderWithTooltip = ({ label, value, onChange, tooltip }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium dark:text-neutral-200">
        {label}: {value}%
      </label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-neutral-400 hover:text-neutral-500 dark:text-neutral-500 dark:hover:text-neutral-400 cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm dark:text-neutral-200">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <Slider
      value={[value]}
      onValueChange={(value) => onChange(value[0])}
      max={100}
      step={1}
      className="[&_[role=slider]]:bg-[#FF6B35]"
    />
  </div>
);

export default function AdvancedOptions({ showOptions, setShowOptions }) {
  const [settings, setSettings] = useState({
    target: '',
    creativity: 50,
    detailLevel: 50,
    useHistoricalData: true
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const targetOptions = [
    { value: 'personas', label: 'Personas', description: 'Búsqueda centrada en individuos' },
    { value: 'leyes', label: 'Leyes', description: 'Análisis de legislación' },
    { value: 'entidades', label: 'Entidades', description: 'Organizaciones y empresas' },
    { value: 'partidos', label: 'Partidos Políticos', description: 'Información política' }
  ];

  return (
    <TooltipProvider>
      <Popover open={showOptions} onOpenChange={setShowOptions}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex-shrink-0">
            <Settings className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Opciones Avanzadas</span>
            <span className="sm:hidden">Opciones</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-neutral-200">
                Objetivo de búsqueda
              </label>
              <Select 
                value={settings.target} 
                onValueChange={(value) => updateSetting('target', value)}
              >
                <SelectTrigger className="dark:border-neutral-700 dark:bg-neutral-800">
                  <SelectValue placeholder="Selecciona objetivo" />
                </SelectTrigger>
                <SelectContent className="dark:border-neutral-700 dark:bg-neutral-800">
                  {targetOptions.map(option => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="dark:text-neutral-200 dark:focus:bg-neutral-700"
                    >
                      <div className="flex flex-col">
                        <span>{option.label}</span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {option.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <SliderWithTooltip
              label="Creatividad"
              value={settings.creativity}
              onChange={(value) => updateSetting('creativity', value)}
              tooltip="Ajusta el nivel de creatividad en las respuestas generadas"
            />

            <SliderWithTooltip
              label="Nivel de detalle"
              value={settings.detailLevel}
              onChange={(value) => updateSetting('detailLevel', value)}
              tooltip="Controla la profundidad del análisis y la cantidad de información"
            />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-sm font-medium dark:text-neutral-200">
                  Datos históricos
                </span>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Incluir información de archivo
                </p>
              </div>
              <Switch
                checked={settings.useHistoricalData}
                onCheckedChange={(checked) => updateSetting('useHistoricalData', checked)}
                className="data-[state=checked]:bg-[#FF6B35]"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
}