import React from 'react';
import { fetchTableData, fetchFilterOptions } from '../(components)/supabaseService';
import NoticiasArticulosExplorer from './NoticiasArticulosExplorer';

export default async function NoticiasArticulosPage() {
  // Cargar datos iniciales
  const { data, totalCount, error } = await fetchTableData({
    table: 'noticias_articulos',
    page: 1,
    pageSize: 10
  });

  // Cargar opciones de filtros
  const mediosOptions = await fetchFilterOptions('medios_comunicacion', 'nombre');
  const temasOptions = await fetchFilterOptions('noticias_articulos', 'temas');

  return (
    <NoticiasArticulosExplorer
      initialData={data}
      totalCount={totalCount}
      error={error}
      mediosOptions={mediosOptions}
      temasOptions={temasOptions}
    />
  );
}