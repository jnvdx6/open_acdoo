// services/databaseStatsService.js
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function fetchTableStats() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const stats = {
    personas: {
      total: 0,
      politicos: 0,
      casos_abiertos: 0
    },
    organizaciones: {
      total: 0,
      empresas: 0,
      ongs: 0
    },
    contrataciones_publicas: {
      total: 0,
      en_proceso: 0,
      ejecutados: 0
    },
    subvenciones: {
      total: 0,
      concedidas: 0,
      justificadas: 0
    },
    votaciones_leyes: {
      votaciones: 0,
      aprobadas: 0,
      en_proceso: 0
    },
    eventos_reuniones: {
      total: 0,
      reuniones: 0,
      conferencias: 0
    },
    medios_comunicacion: {
      total: 0,
      periodicos: 0,
      digitales: 0
    },
    noticias_articulos: {
      total: 0,
      este_mes: 0,
      verificadas: 0
    },
    redes_sociales: {
      total: 0,
      personas: 0,
      organizaciones: 0
    },
    relaciones_entidades: {
      total: 0,
      entre_personas: 0,
      persona_org: 0
    },
    usuarios_privados: {
      total: 0,
      activos: 0,
      administradores: 0
    },
    denuncias: {
      total: 0,
      pendientes: 0,
      verificadas: 0
    },
    documentos_denuncias: {
      total: 0,
      este_mes: 0
    },
    donaciones: {
      total: 0,
      monto_total: 0,
      este_mes: 0
    },
    investigaciones: {
      total: 0,
      en_curso: 0,
      concluidas: 0
    },
    equipo_investigacion: {
      total: 0,
      activos: 0
    },
    conflictos_interes: {
      total: 0,
      activos: 0,
      resueltos: 0
    },
    entradas_boe: {
      total: 0,
      este_mes: 0,
      relevantes: 0
    }
  };

  try {
    // Obtener fecha actual y primer día del mes
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    // Personas stats
    const { data: personasStats } = await supabase
      .from('personas')
      .select('es_politico, casos_judiciales_abiertos', { count: 'exact' });
    
    if (personasStats) {
      stats.personas.total = personasStats.length;
      stats.personas.politicos = personasStats.filter(p => p.es_politico).length;
      stats.personas.casos_abiertos = personasStats.filter(p => p.casos_judiciales_abiertos > 0).length;
    }

    // Organizaciones stats
    const { data: orgStats } = await supabase
      .from('organizaciones')
      .select('tipo', { count: 'exact' });
    
    if (orgStats) {
      stats.organizaciones.total = orgStats.length;
      stats.organizaciones.empresas = orgStats.filter(o => o.tipo === 'empresa').length;
      stats.organizaciones.ongs = orgStats.filter(o => o.tipo === 'ong').length;
    }

    // Contrataciones stats
    const { data: contratosStats } = await supabase
      .from('contrataciones_publicas')
      .select('estado', { count: 'exact' });
    
    if (contratosStats) {
      stats.contrataciones_publicas.total = contratosStats.length;
      stats.contrataciones_publicas.en_proceso = contratosStats.filter(c => c.estado === 'en_proceso').length;
      stats.contrataciones_publicas.ejecutados = contratosStats.filter(c => c.estado === 'ejecutado').length;
    }

    // Subvenciones stats
    const { data: subvencionesStats } = await supabase
      .from('subvenciones')
      .select('estado', { count: 'exact' });
    
    if (subvencionesStats) {
      stats.subvenciones.total = subvencionesStats.length;
      stats.subvenciones.concedidas = subvencionesStats.filter(s => s.estado === 'concedida').length;
      stats.subvenciones.justificadas = subvencionesStats.filter(s => s.estado === 'justificada').length;
    }

    // Votaciones y leyes stats
    const { data: votacionesStats } = await supabase
      .from('votaciones_leyes')
      .select('resultado', { count: 'exact' });
    
    if (votacionesStats) {
      stats.votaciones_leyes.votaciones = votacionesStats.length;
      stats.votaciones_leyes.aprobadas = votacionesStats.filter(v => v.resultado === 'aprobada').length;
      stats.votaciones_leyes.en_proceso = votacionesStats.filter(v => v.resultado === 'en_proceso').length;
    }

    // Eventos y reuniones stats
    const { data: eventosStats } = await supabase
      .from('eventos_reuniones')
      .select('tipo', { count: 'exact' });
    
    if (eventosStats) {
      stats.eventos_reuniones.total = eventosStats.length;
      stats.eventos_reuniones.reuniones = eventosStats.filter(e => e.tipo === 'reunion').length;
      stats.eventos_reuniones.conferencias = eventosStats.filter(e => e.tipo === 'conferencia').length;
    }

    // Medios de comunicación stats
    const { data: mediosStats } = await supabase
      .from('medios_comunicacion')
      .select('tipo', { count: 'exact' });
    
    if (mediosStats) {
      stats.medios_comunicacion.total = mediosStats.length;
      stats.medios_comunicacion.periodicos = mediosStats.filter(m => m.tipo === 'periodico').length;
      stats.medios_comunicacion.digitales = mediosStats.filter(m => m.tipo === 'digital').length;
    }

    // Noticias y artículos stats
    const { data: noticiasStats } = await supabase
      .from('noticias_articulos')
      .select('fecha_publicacion, fact_checking_score', { count: 'exact' });
    
    if (noticiasStats) {
      stats.noticias_articulos.total = noticiasStats.length;
      stats.noticias_articulos.este_mes = noticiasStats.filter(n => n.fecha_publicacion >= firstDayOfMonth).length;
      stats.noticias_articulos.verificadas = noticiasStats.filter(n => n.fact_checking_score > 7).length;
    }

    // Redes sociales stats
    const { data: redesStats } = await supabase
      .from('redes_sociales')
      .select('tipo_entidad', { count: 'exact' });
    
    if (redesStats) {
      stats.redes_sociales.total = redesStats.length;
      stats.redes_sociales.personas = redesStats.filter(r => r.tipo_entidad === 'persona').length;
      stats.redes_sociales.organizaciones = redesStats.filter(r => r.tipo_entidad === 'organizacion').length;
    }

    // Relaciones entre entidades stats
    const { data: relacionesStats } = await supabase
      .from('relaciones_entidades')
      .select('entidad1_tipo, entidad2_tipo', { count: 'exact' });
    
    if (relacionesStats) {
      stats.relaciones_entidades.total = relacionesStats.length;
      stats.relaciones_entidades.entre_personas = relacionesStats.filter(r => 
        r.entidad1_tipo === 'persona' && r.entidad2_tipo === 'persona'
      ).length;
      stats.relaciones_entidades.persona_org = relacionesStats.filter(r =>
        (r.entidad1_tipo === 'persona' && r.entidad2_tipo === 'organizacion') ||
        (r.entidad1_tipo === 'organizacion' && r.entidad2_tipo === 'persona')
      ).length;
    }

    // Usuarios stats
    const { data: usuariosStats } = await supabase
      .from('usuarios_privados')
      .select('rol', { count: 'exact' });
    
    if (usuariosStats) {
      stats.usuarios_privados.total = usuariosStats.length;
      stats.usuarios_privados.activos = usuariosStats.length; // Asumiendo que todos los usuarios en la tabla están activos
      stats.usuarios_privados.administradores = usuariosStats.filter(u => u.rol === 'admin').length;
    }

    // Denuncias stats
    const { data: denunciasStats } = await supabase
      .from('denuncias')
      .select('estado', { count: 'exact' });
    
    if (denunciasStats) {
      stats.denuncias.total = denunciasStats.length;
      stats.denuncias.pendientes = denunciasStats.filter(d => d.estado === 'pendiente').length;
      stats.denuncias.verificadas = denunciasStats.filter(d => d.estado === 'verificada').length;
    }

    // Documentos denuncias stats
    const { data: documentosStats } = await supabase
      .from('documentos_denuncias')
      .select('created_at', { count: 'exact' });
    
    if (documentosStats) {
      stats.documentos_denuncias.total = documentosStats.length;
      stats.documentos_denuncias.este_mes = documentosStats.filter(d => 
        d.created_at >= firstDayOfMonth
      ).length;
    }

    // Donaciones stats
    const { data: donacionesStats } = await supabase
      .from('donaciones')
      .select('monto, fecha_donacion', { count: 'exact' });
    
    if (donacionesStats) {
      stats.donaciones.total = donacionesStats.length;
      stats.donaciones.monto_total = donacionesStats.reduce((acc, d) => acc + d.monto, 0);
      stats.donaciones.este_mes = donacionesStats.filter(d => 
        d.fecha_donacion >= firstDayOfMonth
      ).length;
    }

    // Investigaciones stats
    const { data: investigacionesStats } = await supabase
      .from('investigaciones')
      .select('estado', { count: 'exact' });
    
    if (investigacionesStats) {
      stats.investigaciones.total = investigacionesStats.length;
      stats.investigaciones.en_curso = investigacionesStats.filter(i => i.estado === 'en_curso').length;
      stats.investigaciones.concluidas = investigacionesStats.filter(i => i.estado === 'concluida').length;
    }

    // Equipo investigación stats
    const { data: equipoStats } = await supabase
      .from('equipo_investigacion')
      .select('fecha_fin', { count: 'exact' });
    
    if (equipoStats) {
      stats.equipo_investigacion.total = equipoStats.length;
      stats.equipo_investigacion.activos = equipoStats.filter(e => !e.fecha_fin).length;
    }

    // Conflictos de interés stats
    const { data: conflictosStats } = await supabase
      .from('conflictos_interes')
      .select('estado', { count: 'exact' });
    
    if (conflictosStats) {
      stats.conflictos_interes.total = conflictosStats.length;
      stats.conflictos_interes.activos = conflictosStats.filter(c => 
        ['potencial', 'declarado', 'gestionado'].includes(c.estado)
      ).length;
      stats.conflictos_interes.resueltos = conflictosStats.filter(c => c.estado === 'resuelto').length;
    }

    // Entradas BOE stats
    const { data: boeStats } = await supabase
      .from('entradas_boe')
      .select('fecha_publicacion, probabilidad_corrupcion', { count: 'exact' });
    
    if (boeStats) {
      stats.entradas_boe.total = boeStats.length;
      stats.entradas_boe.este_mes = boeStats.filter(b => 
        b.fecha_publicacion >= firstDayOfMonth
      ).length;
      stats.entradas_boe.relevantes = boeStats.filter(b => b.probabilidad_corrupcion > 50).length;
    }

    return stats;
  } catch (error) {
    console.error('Error fetching database stats:', error);
    return stats;
  }
}