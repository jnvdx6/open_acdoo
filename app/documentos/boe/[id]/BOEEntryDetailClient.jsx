'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, FileText, File, Loader, BrainCircuit, Search } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { createClient } from '@/utils/supabase/client';

const UnanalyzedContent = ({ entry, onAnalyze, getPdfUrl, getXmlUrl }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);
      const response = await fetch('/api/analyze-boe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigo_boe: entry.codigo_boe }),
      });

      if (!response.ok) throw new Error('Error en el análisis');

      const data = await response.json();
      onAnalyze(data);
    } catch (error) {
      console.error('Error:', error);
      // Handle error appropriately
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-full">
              <BrainCircuit className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Entrada pendiente de análisis
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md">
              Esta entrada del BOE aún no ha sido analizada por nuestro sistema de IA.
              Puede iniciar el análisis para obtener información detallada sobre su contenido.
            </p>
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-[#FF6B35] hover:bg-[#FF8C61] text-white"
            >
              {isAnalyzing ? (
                <>
                  <Loader className="animate-spin mr-2" />
                  Analizando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Iniciar análisis
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                El análisis incluirá
              </h4>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Extracción de palabras clave
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Identificación de entidades
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Análisis de métricas clave
                </li>
              </ul>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                Tiempo estimado
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                El análisis puede tardar entre 30 segundos y 2 minutos, dependiendo de la longitud y complejidad del documento.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Link href={getXmlUrl()} passHref>
          <Button as="a" target="_blank" rel="noopener noreferrer" className="bg-[#FF6B35] hover:bg-[#FF8C61] flex items-center gap-2">
            <FileText size={16} />
            Ver XML
          </Button>
        </Link>
        <Link href={getPdfUrl()} passHref>
          <Button as="a" target="_blank" rel="noopener noreferrer" className="bg-[#FF6B35] hover:bg-[#FF8C61] flex items-center gap-2">
            <File size={16} />
            Ver PDF
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default function BOEEntryDetailClient({ entry }) {
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [analyzedEntry, setAnalyzedEntry] = useState(entry);
  const supabase = createClient();

  const fetchBOEEntry = async (entryId) => {
    try {
      const { data, error } = await supabase
        .from('entradas_boe')
        .select('*')
        .eq('id', entryId)
        .single();

      if (error) throw error;
      if (data) {
        setAnalyzedEntry(data);
      }
    } catch (error) {
      console.error('Error fetching BOE entry:', error);
    }
  };

  useEffect(() => {
    if (isContentOpen) {
      setIsLoading(true);
    }
  }, [isContentOpen]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const getPdfUrl = () => {
    if (!analyzedEntry.codigo_boe || !analyzedEntry.fecha_publicacion) return '';
    const [year, month, day] = analyzedEntry.fecha_publicacion.split('-');
    return `https://www.boe.es/boe/dias/${year}/${month}/${day}/pdfs/${analyzedEntry.codigo_boe}.pdf`;
  };

  const getXmlUrl = () => {
    if (!analyzedEntry.codigo_boe) return '#';
    return `https://www.boe.es/diario_boe/xml.php?id=${analyzedEntry.codigo_boe}`;
  };

  const handleAnalysisComplete = async (analyzedData) => {
    //setAnalyzedEntry({ ...entry, ...analyzedData, analyzed: true });
    await fetchBOEEntry(analyzedEntry.id);
  };

  const renderListOrEmpty = (items, renderItem) => {
    if (!Array.isArray(items) || items.length === 0) {
      return <p className="text-neutral-500">No hay información disponible</p>
    }
    return (
      <ul className="list-disc pl-5">
        {items.map((item, index) => (
          <li key={index}>{renderItem(item)}</li>
        ))}
      </ul>
    )
  }

  if (!analyzedEntry.analyzed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            {entry.titulo || 'Título no disponible'}
          </CardTitle>
          <div className="text-sm text-neutral-500 dark:text-neutral-300">
            Código BOE: {entry.codigo_boe || 'No disponible'} |
            Fecha de publicación: {entry.fecha_publicacion || 'No disponible'}
          </div>
        </CardHeader>
        <CardContent>
          <UnanalyzedContent
            entry={entry}
            onAnalyze={handleAnalysisComplete}
            getPdfUrl={getPdfUrl}
            getXmlUrl={getXmlUrl}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{analyzedEntry.titulo || 'Título no disponible'}</CardTitle>
        <div className="text-sm text-neutral-500 dark:text-neutral-300">
          Código BOE: {analyzedEntry.codigo_boe || 'No disponible'} | Fecha de publicación: {analyzedEntry.fecha_publicacion || 'No disponible'}
        </div>
        <div className="flex gap-2 mt-4">
          <Link href={getXmlUrl()} passHref>
            <Button as="a" target="_blank" rel="noopener noreferrer" className="bg-[#FF6B35] hover:bg-[#FF8C61] flex items-center gap-2 text-xs">
              <FileText size={16} />
              Ver XML
            </Button>
          </Link>
          <Link href={getPdfUrl()} passHref>
            <Button as="a" target="_blank" rel="noopener noreferrer" className="bg-[#FF6B35] hover:bg-[#FF8C61] flex items-center gap-2 text-xs">
              <File size={16} />
              Ver PDF
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Collapsible open={isContentOpen} onOpenChange={setIsContentOpen} className="mb-4">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-neutral-100 dark:bg-neutral-800 rounded">
              <h3 className="text-lg font-semibold text-[#FF6B35]">Contenido</h3>
              {isContentOpen ? <ChevronUp /> : <ChevronDown />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div style={{ height: '700px', position: 'relative' }}>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                    <Loader className="animate-spin mr-2" />
                    <span>Cargando PDF...</span>
                  </div>
                )}
                <iframe
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(getPdfUrl())}&embedded=true`}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  onLoad={handleIframeLoad}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={isContentOpen} onOpenChange={setIsContentOpen} className="mb-4">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-neutral-100 dark:bg-neutral-800 rounded">
              <h3 className="text-lg font-semibold text-[#FF6B35]">Análisis IA</h3>
              {isAnalysisOpen ? <ChevronUp /> : <ChevronDown />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <ReactMarkdown
                className="prose dark:prose-invert max-w-none"
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-[#FF6B35]" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-[#FF6B35]" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-[#FF6B35]" {...props} />,
                  h4: ({ node, ...props }) => <h4 className="text-[#FF6B35]" {...props} />,
                  h5: ({ node, ...props }) => <h5 className="text-[#FF6B35]" {...props} />,
                  h6: ({ node, ...props }) => <h6 className="text-[#FF6B35]" {...props} />
                }}
              >
                {analyzedEntry.analisis_ia || 'Análisis no disponible'}
              </ReactMarkdown>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-[#FF6B35]">Palabras clave</h3>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(analyzedEntry.palabras_clave) && analyzedEntry.palabras_clave.length > 0
              ? analyzedEntry.palabras_clave.map((palabra, index) => (
                <Badge key={index} variant="secondary">{palabra}</Badge>
              ))
              : <p className="text-neutral-500">No hay palabras clave disponibles</p>
            }
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-[#FF6B35]">Entidades mencionadas</h3>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(analyzedEntry.entidades_mencionadas) && analyzedEntry.entidades_mencionadas.length > 0
              ? analyzedEntry.entidades_mencionadas.map((entidad, index) => (
                <Badge key={index} variant="outline">{entidad}</Badge>
              ))
              : <p className="text-neutral-500">No hay entidades mencionadas disponibles</p>
            }
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#FF6B35]">Métrica</TableHead>
              <TableHead className="text-[#FF6B35]">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Probabilidad de corrupción</TableCell>
              <TableCell>{analyzedEntry.probabilidad_corrupcion ? `${(analyzedEntry.probabilidad_corrupcion * 100).toFixed(2)}%` : 'No disponible'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>KPI Transparencia</TableCell>
              <TableCell>{analyzedEntry.kpi_transparencia || 'No disponible'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>KPI Legalidad</TableCell>
              <TableCell>{analyzedEntry.kpi_legalidad || 'No disponible'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>KPI Eficiencia</TableCell>
              <TableCell>{analyzedEntry.kpi_eficiencia || 'No disponible'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Monto involucrado</TableCell>
              <TableCell>{analyzedEntry.monto_involucrado ? entry.monto_involucrado.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) : 'No disponible'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Departamento responsable</TableCell>
              <TableCell>{analyzedEntry.departamento_responsable || 'No disponible'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Categoría</TableCell>
              <TableCell>{analyzedEntry.categoria || 'No disponible'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-[#FF6B35]">Subvenciones mencionadas</h3>
          {renderListOrEmpty(analyzedEntry.subvenciones_mencionadas, (subvencion) => subvencion.descripcion || 'Descripción no disponible')}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-[#FF6B35]">Contratos mencionados</h3>
          {renderListOrEmpty(analyzedEntry.contratos_mencionados, (contrato) => contrato.descripcion || 'Descripción no disponible')}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-[#FF6B35]">Leyes relacionadas</h3>
          {renderListOrEmpty(analyzedEntry.leyes_relacionadas, (ley) => ley)}
        </div>
      </CardContent>
    </Card>
  );
}