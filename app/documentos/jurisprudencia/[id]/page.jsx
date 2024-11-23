import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { notFound } from 'next/navigation'
import SentenceDetailClient from './SentenceDetailClient'
import ShareButton from '@/components/ShareButton'

export async function generateMetadata({ params }) {
  const { id } = params;
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const { data: sentence } = await supabase
    .from('sentencias_judiciales')
    .select('titulo')
    .eq('id', id)
    .single()
    
  return {
    title: sentence?.titulo || 'Sentencia no encontrada',
    description: `Detalles de la sentencia judicial ${sentence?.titulo}`,
  }
}

export default async function SentenceDetail({ params }) {
  const { id } = params;
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const { data: sentence, error } = await supabase
    .from('sentencias_judiciales')
    .select(`
      *,
      leyes_relacionadas,
      palabras_clave,
      entidades_mencionadas,
      partes_involucradas,
      evidencias_mencionadas,
      jurisprudencia_citada,
      doctrina_aplicada,
      votos_particulares,
      argumentos_principales,
      impacto_precedentes
    `)
    .eq('id', id)
    .single()

  if (error || !sentence) {
    console.error('Error fetching judicial sentence:', error)
    notFound()
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/documentos/jurisprudencia/${id}`

  return (
    <div className="container mx-auto p-4 min-h-[80vh]">
      <div className="flex justify-between items-center mb-4">
        <Link href="/documentos/jurisprudencia" passHref>
          <Button variant="outline">Volver al listado</Button>
        </Link>
        <ShareButton shareUrl={shareUrl} />
      </div>
      <SentenceDetailClient sentence={sentence} />
    </div>
  );
}