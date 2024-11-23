// services/supabaseService.js
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// Mapeo de tablas y sus columnas de búsqueda
export const TABLE_DEFINITIONS = {
    personas: {
        searchColumns: ['nombre', 'apellidos', 'cargo_actual', 'partido_politico', 'nacionalidad', 'profesion'],
        defaultSelect: `
      id,
      nombre,
      apellidos,
      fecha_nacimiento,
      nacionalidad,
      profesion,
      es_politico,
      partido_politico,
      cargo_actual,
      casos_judiciales_abiertos,
      sentencias_firmes,
      kpi_transparencia,
      kpi_integridad,
      kpi_eficacia,
      sueldo_anual,
      patrimonio_declarado
    `,
        filterableColumns: {
            es_politico: 'boolean',
            partido_politico: 'string',
            nacionalidad: 'string',
            profesion: 'string'
        }
    },
    organizaciones: {
        searchColumns: ['nombre', 'tipo', 'sector', 'descripcion', 'sede_principal'],
        defaultSelect: `
      id,
      nombre,
      tipo,
      fecha_fundacion,
      sede_principal,
      sector,
      descripcion,
      website,
      casos_judiciales_abiertos,
      sentencias_firmes,
      kpi_transparencia,
      kpi_responsabilidad_social,
      kpi_cumplimiento_legal,
      ingresos_anuales,
      numero_empleados
    `,
        filterableColumns: {
            tipo: 'enum',
            sector: 'string'
        }
    },
    contrataciones_publicas: {
        searchColumns: ['codigo_contrato', 'descripcion', 'tipo_contrato', 'proceso_adjudicacion'],
        defaultSelect: `
      id,
      codigo_contrato,
      monto,
      fecha_inicio,
      fecha_fin,
      descripcion,
      tipo_contrato,
      proceso_adjudicacion,
      estado,
      kpi_transparencia,
      kpi_eficiencia
    `,
        filterableColumns: {
            estado: 'enum',
            tipo_contrato: 'string',
            proceso_adjudicacion: 'string'
        }
    },
    subvenciones: {
        searchColumns: ['codigo_subvencion', 'objetivo', 'sector', 'condiciones'],
        defaultSelect: `
      id,
      codigo_subvencion,
      tipo_beneficiario,
      monto,
      fecha_concesion,
      fecha_pago,
      objetivo,
      sector,
      estado,
      kpi_impacto,
      kpi_transparencia
    `,
        filterableColumns: {
            estado: 'enum',
            tipo_beneficiario: 'enum',
            sector: 'string'
        }
    },
    votaciones_leyes: {
        searchColumns: ['codigo_ley', 'titulo', 'descripcion', 'impacto_estimado'],
        defaultSelect: `
      id,
      codigo_ley,
      titulo,
      descripcion,
      fecha_propuesta,
      fecha_votacion,
      resultado,
      votos_favor,
      votos_contra,
      abstenciones
    `,
        filterableColumns: {
            resultado: 'enum'
        }
    },
    investigaciones: {
        searchColumns: ['titulo', 'descripcion', 'hallazgos', 'conclusiones'],
        defaultSelect: `
      id,
      titulo,
      descripcion,
      fecha_inicio,
      fecha_fin,
      estado,
      hallazgos,
      conclusiones
    `,
        filterableColumns: {
            estado: 'enum'
        }
    }
};

// Función auxiliar para normalizar texto
function normalizeText(text) {
    return text
        .normalize('NFD')                 // Descompone los caracteres en sus componentes básicos
        .replace(/[\u0300-\u036f]/g, '') // Elimina todos los diacríticos
        .toLowerCase()                    // Convierte a minúsculas
        .trim();                         // Elimina espacios al inicio y final
}

export const fetchTableData = async ({
    table,
    page = 1,
    pageSize = 10,
    searchTerm = '',
    filters = {},
    select = null
}) => {
    try {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const tableDefinition = TABLE_DEFINITIONS[table];
        if (!tableDefinition) {
            throw new Error(`Table ${table} not found in definitions`);
        }

        if (table === 'personas' && searchTerm) {
            // Usar la función de búsqueda personalizada para personas
            const [searchPromise, countPromise] = await Promise.all([
                supabase.rpc('search_personas', {
                    search_term: searchTerm,
                    page_number: page,
                    items_per_page: pageSize
                }),
                supabase.rpc('count_search_personas', {
                    search_term: searchTerm
                })
            ]);

            const { data: searchData, error: searchError } = searchPromise;
            const { data: totalCount, error: countError } = countPromise;

            if (searchError) throw searchError;
            if (countError) throw countError;

            // Aplicar filtros adicionales si es necesario
            let filteredData = searchData;
            if (Object.keys(filters).length > 0) {
                filteredData = searchData.filter(item => {
                    return Object.entries(filters).every(([key, value]) => {
                        if (!value) return true;
                        if (tableDefinition.filterableColumns[key] === 'boolean') {
                            return item[key] === (value === 'true');
                        }
                        return item[key] === value;
                    });
                });
            }

            return {
                data: filteredData,
                totalCount: totalCount,
                error: null
            };
        } else {
            // Comportamiento normal para otras tablas
            let query = supabase
                .from(table)
                .select(select || tableDefinition.defaultSelect, { count: 'exact' });

            // Aplicar filtros
            Object.entries(filters).forEach(([key, value]) => {
                if (value && tableDefinition.filterableColumns[key]) {
                    switch (tableDefinition.filterableColumns[key]) {
                        case 'boolean':
                            query = query.eq(key, value === 'true');
                            break;
                        case 'enum':
                        case 'string':
                            query = query.eq(key, value);
                            break;
                    }
                }
            });

            // Aplicar paginación
            const from = (page - 1) * pageSize;
            const to = from + pageSize - 1;
            query = query.range(from, to);

            const { data, error, count } = await query;

            if (error) throw error;

            return {
                data,
                totalCount: count,
                error: null
            };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            data: [],
            totalCount: 0,
            error: error.message
        };
    }
};

export const fetchFilterOptions = async (table, column) => {
    try {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const tableDefinition = TABLE_DEFINITIONS[table];
        if (!tableDefinition?.filterableColumns[column]) {
            throw new Error(`Column ${column} is not defined as filterable for table ${table}`);
        }

        const { data, error } = await supabase
            .from(table)
            .select(column)
            .not(column, 'is', null)
            .distinct();

        if (error) {
            throw error;
        }

        return data
            .map(item => item[column])
            .filter(Boolean)
            .sort()
            .map(value => ({
                value: String(value),
                label: String(value)
            }));

    } catch (error) {
        console.error('Error fetching filter options:', error);
        return [];
    }
};