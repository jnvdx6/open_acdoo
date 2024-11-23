import React from 'react';
import AdvancedDataTable from '../(components)/AdvancedDataTable';
import { fetchTableData, fetchFilterOptions } from '../(components)/supabaseService';

// Definición de columnas para la tabla de subvenciones
const columns = [
  { key: 'codigo_subvencion', label: 'Código', type: 'text' },
  { 
    key: 'entidad_otorgante', 
    label: 'Entidad Otorgante', 
    type: 'text',
    reference: 'organizaciones.nombre'
  },
  { key: 'tipo_beneficiario', label: 'Tipo Beneficiario', type: 'text' },
  {
    key: 'beneficiario',
    label: 'Beneficiario',
    type: 'text',
    reference: {
      persona: 'personas.nombre',
      organizacion: 'organizaciones.nombre'
    }
  },
  { key: 'monto', label: 'Monto', type: 'money' },
  { key: 'fecha_concesion', label: 'Fecha Concesión', type: 'date' },
  { key: 'fecha_pago', label: 'Fecha Pago', type: 'date' },
  { key: 'objetivo', label: 'Objetivo', type: 'text' },
  { key: 'sector', label: 'Sector', type: 'text' },
  { 
    key: 'estado', 
    label: 'Estado', 
    type: 'badge',
    badges: {
      'solicitada': 'warning',
      'concedida': 'success',
      'pagada': 'success',
      'justificada': 'default',
      'reintegrada': 'destructive'
    }
  },
  { key: 'kpi_impacto', label: 'Impacto', type: 'progress' },
  { key: 'kpi_transparencia', label: 'Transparencia', type: 'progress' },
  { 
    key: 'justificacion_requerida', 
    label: 'Req. Justificación', 
    type: 'badge',
    badges: {
      true: 'warning',
      false: 'default'
    }
  }
];

export default async function SubvencionesPage() {
  // Cargar datos iniciales
  const { data, totalCount, error } = await fetchTableData({
    table: 'subvenciones',
    page: 1,
    pageSize: 10
  });

  // Cargar opciones de filtros
  const sectorOptions = await fetchFilterOptions('subvenciones', 'sector');

  // Definir filtros disponibles para la tabla
  const filters = [
    {
      key: 'estado',
      label: 'Estado',
      options: [
        { value: 'solicitada', label: 'Solicitada' },
        { value: 'concedida', label: 'Concedida' },
        { value: 'pagada', label: 'Pagada' },
        { value: 'justificada', label: 'Justificada' },
        { value: 'reintegrada', label: 'Reintegrada' }
      ]
    },
    {
      key: 'tipo_beneficiario',
      label: 'Tipo de Beneficiario',
      options: [
        { value: 'persona', label: 'Persona' },
        { value: 'organizacion', label: 'Organización' }
      ]
    },
    {
      key: 'sector',
      label: 'Sector',
      options: sectorOptions
    },
    {
      key: 'rango_monto',
      label: 'Rango de Monto',
      options: [
        { value: 'bajo', label: 'Hasta 10.000€' },
        { value: 'medio', label: '10.000€ - 50.000€' },
        { value: 'alto', label: 'Más de 50.000€' }
      ]
    },
    {
      key: 'justificacion_requerida',
      label: 'Justificación',
      options: [
        { value: 'true', label: 'Requiere justificación' },
        { value: 'false', label: 'No requiere justificación' }
      ]
    }
  ];

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Explorador de Subvenciones</h1>
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
        title="Explorador de Subvenciones"
        tableName="subvenciones"
        columns={columns}
        initialData={data}
        totalCount={totalCount}
        filters={filters}
      />
    </div>
  );
}