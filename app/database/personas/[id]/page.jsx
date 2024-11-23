import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import PersonaDetail from './PersonaDetail';

async function getPersonaData(id) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Query principal para obtener datos de la persona y sus relaciones
    // Query principal para obtener datos de la persona y sus relaciones
    const { data: persona, error } = await supabase
        .from('personas')
        .select(`
      *,
      subvenciones_recibidas:subvenciones(
        id,
        codigo_subvencion,
        monto,
        fecha_concesion,
        objetivo,
        estado,
        entidad_otorgante(
          id,
          nombre
        )
      ),
      cargos_directivos:junta_directiva(
        id,
        cargo,
        fecha_inicio,
        fecha_fin,
        organizacion:organizaciones(
          id,
          nombre,
          tipo,
          sector
        )
      ),
      votaciones:votaciones_politicos(
        id,
        voto,
        justificacion,
        created_at,
        votacion:votaciones_leyes(
          id,
          codigo_ley,
          titulo,
          fecha_votacion,
          resultado,
          votos_favor,
          votos_contra,
          abstenciones
        )
      ),
      redes_sociales(
        id,
        plataforma,
        nombre_usuario,
        url_perfil,
        seguidores,
        fecha_creacion
      ),
      conflictos:conflictos_interes(
        id,
        tipo_conflicto,
        descripcion,
        fecha_inicio,
        fecha_fin,
        estado,
        acciones_tomadas,
        organizacion:organizaciones(
          id,
          nombre,
          tipo
        )
      )
    `)
        .eq('id', id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            return notFound();
        }
        throw error;
    }

    // Obtener estadísticas adicionales
    const promises = [
        // Total de subvenciones
        supabase
            .from('subvenciones')
            .select('monto', { count: 'exact' })
            .eq('beneficiario_persona', id),

        // Total de votaciones
        supabase
            .from('votaciones_politicos')
            .select('*', { count: 'exact' })
            .eq('politico_id', id),

        // Menciones en medios recientes (último mes)
        supabase
            .from('noticias_articulos')
            .select('*', { count: 'exact' })
            .contains('entidades_mencionadas', [id])
            .gte('fecha_publicacion', new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString())
    ];

    const [
        { count: totalSubvenciones, data: subvencionesData },
        { count: totalVotaciones },
        { count: mencionesRecientes }
    ] = await Promise.all(promises);

    // Calcular estadísticas
    const stats = {
        total_subvenciones: totalSubvenciones || 0,
        monto_total_subvenciones: subvencionesData?.reduce((acc, sub) => acc + sub.monto, 0) || 0,
        total_votaciones: totalVotaciones || 0,
        menciones_recientes: mencionesRecientes || 0
    };

    return {
        ...persona,
        stats
    };
}

export default async function PersonaPage({ params: { id } }) {
    const persona = await getPersonaData(id);

    return <PersonaDetail persona={persona} />;
}
