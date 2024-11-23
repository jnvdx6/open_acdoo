import React from 'react';
import AdvancedDataTable from '../(components)/AdvancedDataTable';
import { fetchTableData, fetchFilterOptions } from '../(components)/supabaseService';
import Link from "next/link";
import { FileText } from "lucide-react";

// Definición de columnas simplificada
const columns = [
  { key: 'codigo_ley', label: 'Código', type: 'text' },
  { key: 'titulo', label: 'Título', type: 'text' },
  { 
    key: 'proponente', 
    label: 'Proponente', 
    type: 'text',
    reference: 'organizaciones.nombre'
  },
  { key: 'fecha_propuesta', label: 'Fecha Propuesta', type: 'date' },
  { key: 'fecha_votacion', label: 'Fecha Votación', type: 'date' },
  { 
    key: 'resultado', 
    label: 'Resultado', 
    type: 'badge',
    badges: {
      'aprobada': 'success',
      'rechazada': 'destructive',
      'en_proceso': 'warning'
    }
  },
  { 
    key: 'votos_favor', 
    label: 'A Favor', 
    type: 'number',
    className: 'text-green-600 font-semibold'
  },
  { 
    key: 'votos_contra', 
    label: 'En Contra', 
    type: 'number',
    className: 'text-red-600 font-semibold'
  },
  { 
    key: 'abstenciones', 
    label: 'Abstenciones', 
    type: 'number',
    className: 'text-gray-600 font-semibold'
  },
  { 
    key: 'sector_afectado', 
    label: 'Sectores Afectados', 
    type: 'list'
  },
  { key: 'impacto_estimado', label: 'Impacto', type: 'text' },
  { 
    key: 'texto_completo_url', 
    label: 'Documento', 
    type: 'link'  // Simplemente especificamos que es de tipo 'link'
  }
];

export default async function VotacionesLeyesPage() {
  // Cargar datos iniciales
  const { data, totalCount, error } = await fetchTableData({
    table: 'votaciones_leyes',
    page: 1,
    pageSize: 10
  });

  // Cargar opciones de filtros
  const sectorOptions = await fetchFilterOptions('votaciones_leyes', 'sector_afectado');
  const proponenteOptions = await fetchFilterOptions('votaciones_leyes', 'proponente');

  // Definir filtros disponibles para la tabla
  const filters = [
    {
      key: 'resultado',
      label: 'Resultado',
      options: [
        { value: 'aprobada', label: 'Aprobada' },
        { value: 'rechazada', label: 'Rechazada' },
        { value: 'en_proceso', label: 'En Proceso' }
      ]
    },
    {
      key: 'proponente',
      label: 'Proponente',
      options: proponenteOptions
    },
    {
      key: 'sector_afectado',
      label: 'Sector Afectado',
      options: sectorOptions
    },
    {
      key: 'rango_fecha',
      label: 'Período',
      options: [
        { value: 'mes', label: 'Último mes' },
        { value: 'trimestre', label: 'Último trimestre' },
        { value: 'año', label: 'Último año' }
      ]
    },
    {
      key: 'mayoria',
      label: 'Tipo de Mayoría',
      options: [
        { value: 'simple', label: 'Mayoría Simple' },
        { value: 'absoluta', label: 'Mayoría Absoluta' },
        { value: 'cualificada', label: 'Mayoría Cualificada' }
      ]
    }
  ];

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Explorador de Votaciones y Leyes</h1>
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
        title="Explorador de Votaciones y Leyes"
        tableName="votaciones_leyes"
        columns={columns}
        initialData={data}
        totalCount={totalCount}
        filters={filters}
      />
    </div>
  );
}