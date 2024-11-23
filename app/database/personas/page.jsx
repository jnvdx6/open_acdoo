import React from 'react';
import AdvancedDataTable from '../(components)/AdvancedDataTable';
import { fetchTableData, fetchFilterOptions } from '../(components)/supabaseService';
import Link from "next/link"

// Definición de columnas para la tabla de personas
const columns = [
    { key: 'nombre', label: 'Nombre', type: 'text' },
    { key: 'apellidos', label: 'Apellidos', type: 'text' },
    { key: 'partido_politico', label: 'Partido Político', type: 'text' },
    { key: 'cargo_actual', label: 'Cargo Actual', type: 'text' },
    { key: 'casos_judiciales_abiertos', label: 'Casos Abiertos', type: 'warning' },
    { key: 'kpi_transparencia', label: 'Transparencia', type: 'progress' },
    { key: 'patrimonio_declarado', label: 'Patrimonio', type: 'money' },
    { key: 'sueldo_anual', label: 'Sueldo Anual', type: 'money' },
    { key: 'kpi_integridad', label: 'Integridad', type: 'progress' },
    { key: 'kpi_eficacia', label: 'Eficacia', type: 'progress' },
    { key: 'sentencias_firmes', label: 'Sentencias', type: 'warning' },
    { key: 'nacionalidad', label: 'Nacionalidad', type: 'text' },
    { key: 'profesion', label: 'Profesión', type: 'text' }
];

export default async function PersonasPage() {
    // Cargar datos iniciales
    const { data, totalCount, error } = await fetchTableData({
        table: 'personas',
        page: 1,
        pageSize: 10
    });

    // Cargar opciones de filtros
    const partidoOptions = await fetchFilterOptions('personas', 'partido_politico');
    const nacionalidadOptions = await fetchFilterOptions('personas', 'nacionalidad');
    const profesionOptions = await fetchFilterOptions('personas', 'profesion');

    // Definir filtros disponibles para la tabla
    const filters = [
        {
            key: 'partido_politico',
            label: 'Partido Político',
            options: partidoOptions
        },
        {
            key: 'es_politico',
            label: 'Tipo',
            options: [
                { value: 'true', label: 'Político' },
                { value: 'false', label: 'No Político' }
            ]
        },
        {
            key: 'nacionalidad',
            label: 'Nacionalidad',
            options: nacionalidadOptions
        },
        {
            key: 'profesion',
            label: 'Profesión',
            options: profesionOptions
        }
    ];

    return (
        <div className="container mx-auto p-4 space-y-4">
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold">Explorador de Personas</h1>
                    <Link
                        href="/database/personas/search"
                        className="text-sm text-[#FF6B35] hover:underline"
                    >
                        Investigar Persona
                    </Link>
                </div>
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
                title="Explorador de Personas"
                tableName="personas"
                columns={columns}
                initialData={data}
                totalCount={totalCount}
                filters={filters}
            />
        </div>
    );
}