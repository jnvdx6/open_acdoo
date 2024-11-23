import React from 'react';
import AdvancedDataTable from '../(components)/AdvancedDataTable';
import { fetchTableData, fetchFilterOptions } from '../(components)/supabaseService';

// Definición de columnas para la tabla de organizaciones
const columns = [
  { key: 'nombre', label: 'Nombre', type: 'text' },
  { key: 'tipo', label: 'Tipo', type: 'text' },
  { key: 'sector', label: 'Sector', type: 'text' },
  { key: 'sede_principal', label: 'Sede', type: 'text' },
  { key: 'casos_judiciales_abiertos', label: 'Casos Abiertos', type: 'warning' },
  { key: 'kpi_transparencia', label: 'Transparencia', type: 'progress' },
  { key: 'kpi_responsabilidad_social', label: 'Resp. Social', type: 'progress' },
  { key: 'kpi_cumplimiento_legal', label: 'Cumplimiento', type: 'progress' },
  { key: 'ingresos_anuales', label: 'Ingresos Anuales', type: 'money' },
  { key: 'donaciones_politicas', label: 'Donaciones Políticas', type: 'money' },
  { key: 'numero_empleados', label: 'Empleados', type: 'text' },
  { key: 'sentencias_firmes', label: 'Sentencias', type: 'warning' },
  { key: 'fecha_fundacion', label: 'Fundación', type: 'date' }
];

export default async function OrganizacionesPage() {
  // Cargar datos iniciales
  const { data, totalCount, error } = await fetchTableData({
    table: 'organizaciones',
    page: 1,
    pageSize: 10
  });

  // Cargar opciones de filtros
  const tipoOptions = [
    { value: 'empresa', label: 'Empresa' },
    { value: 'partido_politico', label: 'Partido Político' },
    { value: 'ong', label: 'ONG' },
    { value: 'institucion_publica', label: 'Institución Pública' },
    { value: 'otro', label: 'Otro' }
  ];
  const sectorOptions = await fetchFilterOptions('organizaciones', 'sector');
  const sedeOptions = await fetchFilterOptions('organizaciones', 'sede_principal');

  // Definir filtros disponibles para la tabla
  const filters = [
    {
      key: 'tipo',
      label: 'Tipo de Organización',
      options: tipoOptions
    },
    {
      key: 'sector',
      label: 'Sector',
      options: sectorOptions
    },
    {
      key: 'sede_principal',
      label: 'Sede Principal',
      options: sedeOptions
    },
    {
      key: 'casos_judiciales',
      label: 'Casos Judiciales',
      options: [
        { value: 'con_casos', label: 'Con casos abiertos' },
        { value: 'sin_casos', label: 'Sin casos abiertos' }
      ]
    },
    {
      key: 'tamaño',
      label: 'Tamaño',
      options: [
        { value: 'pequeña', label: 'Pequeña (<50 empleados)' },
        { value: 'mediana', label: 'Mediana (50-250 empleados)' },
        { value: 'grande', label: 'Grande (>250 empleados)' }
      ]
    }
  ];

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Explorador de Organizaciones</h1>
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
        title="Explorador de Organizaciones"
        tableName="organizaciones"
        columns={columns}
        initialData={data}
        totalCount={totalCount}
        filters={filters}
      />
    </div>
  );
}