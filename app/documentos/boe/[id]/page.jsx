import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { notFound } from 'next/navigation'
import BOEEntryDetailClient from './BOEEntryDetailClient'
import ShareButton from '@/components/ShareButton'  // Nuevo componente de cliente

export async function generateMetadata({ params }) {
  const { id } = params;
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: entry } = await supabase
    .from('entradas_boe')
    .select('titulo')
    .eq('id', id)
    .single()

  return {
    title: entry?.titulo || 'Entrada BOE no encontrada',
  }
}

export default async function BOEEntryDetail({ params }) {
  const { id } = params;
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: entry, error } = await supabase
    .from('entradas_boe')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !entry) {
    console.error('Error fetching BOE entry:', error)
    notFound()
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/boe/${id}`

  return (
    <div className="container mx-auto p-4 min-h-[80vh]">
      <div className="flex justify-between items-center mb-4">
        <Link href="/documentos/boe" passHref>
          <Button variant="outline">Volver al listado</Button>
        </Link>
        <ShareButton shareUrl={shareUrl} />
      </div>
      <BOEEntryDetailClient entry={entry} />
    </div>
  );
}