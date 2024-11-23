export class BOEService {
    constructor(supabase) {
      this.supabase = supabase;
    }
  
    async getBOEEntry(codigoBOE) {
      const { data, error } = await this.supabase
        .from('entradas_boe')
        .select('*')
        .eq('codigo_boe', codigoBOE)
        .single();
  
      if (error) throw new Error(`Error fetching BOE entry: ${error.message}`);
      if (!data) throw new Error(`No entry found for BOE code: ${codigoBOE}`);
  
      return data;
    }
  
    async updateBOEAnalysis(codigoBOE, analysisData) {
      const { error } = await this.supabase
        .from('entradas_boe')
        .update({
          analisis_ia: analysisData.analisis_ia,
          palabras_clave: analysisData.palabras_clave,
          entidades_mencionadas: analysisData.entidades_mencionadas,
          probabilidad_corrupcion: analysisData.probabilidad_corrupcion,
          kpi_transparencia: analysisData.kpi_transparencia,
          kpi_legalidad: analysisData.kpi_legalidad,
          kpi_eficiencia: analysisData.kpi_eficiencia,
          monto_involucrado: analysisData.monto_involucrado,
          updated_at: new Date().toISOString(),
          analyzed: true
        })
        .eq('codigo_boe', codigoBOE);
  
      if (error) throw new Error(`Error updating BOE analysis: ${error.message}`);
    }
  }