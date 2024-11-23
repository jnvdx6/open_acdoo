import React from 'react';
import AdvancedDataTable from '../(components)/AdvancedDataTable';
import { fetchTableData, fetchFilterOptions } from '../(components)/supabaseService';

// Definición de columnas para la tabla de contrataciones públicas
const columns = [
  { key: 'codigo_contrato', label: 'Código', type: 'text' },
  { 
    key: 'entidad_contratante', 
    label: 'Entidad Contratante', 
    type: 'text',
    // Aquí necesitaríamos hacer un join con la tabla de organizaciones
    reference: 'organizaciones.nombre'
  },
  {
    key: 'proveedor',
    label: 'Proveedor',
    type: 'text',
    // Similar al anterior
    reference: 'organizaciones.nombre'
  },
  { key: 'monto', label: 'Monto', type: 'money' },
  { key: 'fecha_inicio', label: 'Fecha Inicio', type: 'date' },
  { key: 'fecha_fin', label: 'Fecha Fin', type: 'date' },
  { key: 'descripcion', label: 'Descripción', type: 'text' },
  { key: 'tipo_contrato', label: 'Tipo', type: 'text' },
  { key: 'proceso_adjudicacion', label: 'Proceso', type: 'text' },
  { 
    key: 'estado', 
    label: 'Estado', 
    type: 'badge',
    badges: {
      'en_proceso': 'warning',
      'adjudicado': 'success',
      'ejecutado': 'default',
      'cancelado': 'destructive'
    }
  },
  { key: 'kpi_transparencia', label: 'Transparencia', type: 'progress' },
  { key: 'kpi_eficiencia', label: 'Eficiencia', type: 'progress' }
];

export default async function ContratacionesPage() {
  // Cargar datos iniciales
  const { data, totalCount, error } = await fetchTableData({
    table: 'contrataciones_publicas',
    page: 1,
    pageSize: 10
  });

  // Cargar opciones de filtros
  const tipoContratoOptions = await fetchFilterOptions('contrataciones_publicas', 'tipo_contrato');
  const procesoOptions = await fetchFilterOptions('contrataciones_publicas', 'proceso_adjudicacion');
  
  // Definir filtros disponibles para la tabla
  const filters = [
    {
      key: 'estado',
      label: 'Estado',
      options: [
        { value: 'en_proceso', label: 'En Proceso' },
        { value: 'adjudicado', label: 'Adjudicado' },
        { value: 'ejecutado', label: 'Ejecutado' },
        { value: 'cancelado', label: 'Cancelado' }
      ]
    },
    {
      key: 'tipo_contrato',
      label: 'Tipo de Contrato',
      options: tipoContratoOptions
    },
    {
      key: 'proceso_adjudicacion',
      label: 'Proceso de Adjudicación',
      options: procesoOptions
    },
    {
      key: 'rango_monto',
      label: 'Rango de Monto',
      options: [
        { value: 'bajo', label: 'Hasta 50.000€' },
        { value: 'medio', label: '50.000€ - 200.000€' },
        { value: 'alto', label: 'Más de 200.000€' }
      ]
    }
  ];

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Explorador de Contrataciones Públicas</h1>
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
        title="Explorador de Contrataciones Públicas"
        tableName="contrataciones_publicas"
        columns={columns}
        initialData={data}
        totalCount={totalCount}
        filters={filters}
      />
    </div>
  );
}