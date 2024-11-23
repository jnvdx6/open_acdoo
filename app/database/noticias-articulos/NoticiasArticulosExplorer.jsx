// app/database/noticias-articulos/NoticiasArticulosExplorer.js
"use client";

import React from 'react';
import AdvancedDataTable from '../(components)/AdvancedDataTable';
import { ExternalLink, AlertCircle } from "lucide-react";
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

// Componentes de renderizado
const FactCheckScore = ({ value }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            value >= 8 ? 'bg-green-500' :
            value >= 5 ? 'bg-yellow-500' :
            'bg-red-500'
          }`} />
          {value}/10
          {value < 5 && <AlertCircle className="w-4 h-4 text-red-500" />}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Puntuación de verificación: {value}/10</p>
        <p>{
          value >= 8 ? 'Información verificada' :
          value >= 5 ? 'Requiere verificación adicional' :
          'Información poco fiable'
        }</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const ExternalUrlLink = ({ value }) => value ? (
  <Link href={value} target="_blank" className="flex items-center gap-2">
    <ExternalLink className="w-4 h-4" />
    Ver artículo
  </Link>
) : null;

const TopicsList = ({ values }) => (
  <div className="flex flex-wrap gap-1">
    {values?.map((topic, index) => (
      <Badge key={index} variant="secondary">
        {topic}
      </Badge>
    ))}
  </div>
);

// Definición de columnas
const columns = [
  { key: 'titulo', label: 'Título', type: 'text' },
  { 
    key: 'medio_id', 
    label: 'Medio', 
    type: 'text',
    reference: 'medios_comunicacion.nombre'
  },
  { 
    key: 'autor', 
    label: 'Autor', 
    type: 'text',
    reference: 'personas.nombre'
  },
  { key: 'fecha_publicacion', label: 'Fecha', type: 'date' },
  { 
    key: 'temas', 
    label: 'Temas', 
    type: 'custom',
    component: TopicsList
  },
  { 
    key: 'fact_checking_score', 
    label: 'Verificación', 
    type: 'custom',
    component: FactCheckScore
  },
  { 
    key: 'analisis_sesgo', 
    label: 'Sesgo', 
    type: 'text',
    className: 'italic text-gray-600'
  },
  { 
    key: 'entidades_mencionadas', 
    label: 'Entidades', 
    type: 'list'
  },
  { 
    key: 'url', 
    label: 'Enlace', 
    type: 'custom',
    component: ExternalUrlLink
  }
];

export default function NoticiasArticulosExplorer({
  initialData,
  totalCount,
  error,
  mediosOptions,
  temasOptions
}) {
  // Definir filtros disponibles para la tabla
  const filters = [
    {
      key: 'medio_id',
      label: 'Medio',
      options: mediosOptions
    },
    {
      key: 'temas',
      label: 'Tema',
      options: temasOptions
    },
    {
      key: 'fact_checking_score',
      label: 'Fiabilidad',
      options: [
        { value: 'alta', label: 'Alta (8-10)' },
        { value: 'media', label: 'Media (5-7)' },
        { value: 'baja', label: 'Baja (0-4)' }
      ]
    },
    {
      key: 'rango_fecha',
      label: 'Período',
      options: [
        { value: 'hoy', label: 'Hoy' },
        { value: 'semana', label: 'Esta semana' },
        { value: 'mes', label: 'Este mes' },
        { value: 'año', label: 'Este año' }
      ]
    }
  ];

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Explorador de Noticias y Artículos</h1>
        <div className="text-sm text-neutral-600">
          Total: {totalCount} registros
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <AdvancedDataTable
        title="Explorador de Noticias y Artículos"
        tableName="noticias_articulos"
        columns={columns}
        initialData={initialData}
        totalCount={totalCount}
        filters={filters}
      />
    </div>
  );
}