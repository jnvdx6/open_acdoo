// lib/services/jurisprudencia-service.js

export class JurisprudenciaService {
    constructor(supabase) {
        this.supabase = supabase;
    }

    async getSentencia(roj) {
        try {
            const { data, error } = await this.supabase
                .from('sentencias_judiciales')
                .select('*')
                .eq('roj', roj)
                .single();

            if (error) throw new Error(`Error fetching sentencia: ${error.message}`);
            if (!data) throw new Error(`No entry found for ROJ: ${roj}`);

            return data;
        } catch (error) {
            console.error('Error in getSentencia:', error);
            throw error;
        }
    }

    // Método para validar y formatear los datos antes de la actualización
    validateAndFormatAnalysisData(analysisData) {
        try {
            return {
                // Campos de texto
                analisis_ia: analysisData.analisis_ia || '',
                contenido: analysisData.contenido || '',
                resumen_automatico: analysisData.resumen_automatico || '',
                patron_delictivo: analysisData.patron_delictivo || '',

                // Arrays
                palabras_clave: Array.isArray(analysisData.palabras_clave) 
                    ? analysisData.palabras_clave 
                    : [],
                entidades_mencionadas: Array.isArray(analysisData.entidades_mencionadas)
                    ? analysisData.entidades_mencionadas
                    : [],
                argumentos_principales: Array.isArray(analysisData.argumentos_principales)
                    ? analysisData.argumentos_principales
                    : [],
                leyes_relacionadas: Array.isArray(analysisData.leyes_relacionadas)
                    ? analysisData.leyes_relacionadas
                    : [],
                doctrina_aplicada: Array.isArray(analysisData.doctrina_aplicada)
                    ? analysisData.doctrina_aplicada
                    : [],
                impacto_precedentes: Array.isArray(analysisData.impacto_precedentes)
                    ? analysisData.impacto_precedentes
                    : [],

                // Números y métricas
                probabilidad_delito: this.validateNumber(analysisData.probabilidad_delito),
                kpi_evidencia: this.validateNumber(analysisData.kpi_evidencia),
                kpi_coherencia: this.validateNumber(analysisData.kpi_coherencia),
                kpi_fundamentacion: this.validateNumber(analysisData.kpi_fundamentacion),
                kpi_complejidad: this.validateNumber(analysisData.kpi_complejidad),
                kpi_precedentes: this.validateNumber(analysisData.kpi_precedentes),
                kpi_impacto_social: this.validateNumber(analysisData.kpi_impacto_social),
                indice_innovacion: this.validateNumber(analysisData.indice_innovacion),
                riesgo_reincidencia: this.validateNumber(analysisData.riesgo_reincidencia),
                tiempo_tramitacion: this.validateNumber(analysisData.tiempo_tramitacion),
                costas_procesales: this.validateNumber(analysisData.costas_procesales),
                recursos_presentados: this.validateNumber(analysisData.recursos_presentados),
                cantidad_pruebas: this.validateNumber(analysisData.cantidad_pruebas),

                // Objetos complejos (JSONB)
                jurisprudencia_citada: this.validateJSONB(analysisData.jurisprudencia_citada),
                evidencias_mencionadas: this.validateJSONB(analysisData.evidencias_mencionadas),
                votos_particulares: this.validateJSONB(analysisData.votos_particulares),
                partes_involucradas: this.validateJSONB(analysisData.partes_involucradas),
                elementos_tecnicos: this.validateJSONB(analysisData.elementos_tecnicos),

                // Fechas
                fecha_hechos: this.validateDate(analysisData.fecha_hechos),
                fecha_denuncia: this.validateDate(analysisData.fecha_denuncia),
                timestamp_analisis: new Date().toISOString(),
                updated_at: new Date().toISOString(),

                // Metadatos
                version_modelo: analysisData.version_modelo || 'llama-3.1-70b-versatile',
                analyzed: true
            };
        } catch (error) {
            console.error('Error validating analysis data:', error);
            throw error;
        }
    }

    // Métodos auxiliares de validación
    validateNumber(value) {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    }

    validateJSONB(value) {
        if (!value) return {};
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            } catch {
                return {};
            }
        }
        return value;
    }

    validateDate(value) {
        if (!value) return null;
        try {
            const date = new Date(value);
            return date.toISOString();
        } catch {
            return null;
        }
    }

    async updateSentenciaAnalysis(roj, analysisData) {
        try {
            // Validar y formatear los datos antes de la actualización
            const validatedData = this.validateAndFormatAnalysisData(analysisData);

            // Realizar la actualización en la base de datos
            const { error } = await this.supabase
                .from('sentencias_judiciales')
                .update(validatedData)
                .eq('roj', roj);

            if (error) {
                console.error('Supabase update error:', error);
                throw new Error(`Error updating sentencia analysis: ${error.message}`);
            }

            // Log de éxito para monitoreo
            console.log(`Successfully updated sentencia analysis for ROJ: ${roj}`);
            return validatedData;

        } catch (error) {
            console.error('Error in updateSentenciaAnalysis:', error);
            throw error;
        }
    }

    // Método para obtener estadísticas de análisis
    async getAnalysisStats() {
        try {
            const { data, error } = await this.supabase
                .from('sentencias_judiciales')
                .select('analyzed, timestamp_analisis')
                .order('timestamp_analisis', { ascending: false });

            if (error) throw error;

            return {
                total_analyzed: data.filter(row => row.analyzed).length,
                last_analysis: data[0]?.timestamp_analisis,
                total_pending: data.filter(row => !row.analyzed).length
            };
        } catch (error) {
            console.error('Error fetching analysis stats:', error);
            throw error;
        }
    }
}